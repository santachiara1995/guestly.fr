import { Database } from 'bun:sqlite'
import { constants as fsConstants } from 'node:fs'
import { access, mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { cors } from '@elysiajs/cors'
import { Elysia, t } from 'elysia'

import { faqSeed, programsSeed, siteContent } from './content'

const port = Number(process.env.PORT ?? 3000)
const backendDir = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(backendDir, '../..')
const requestedDbPath = process.env.DB_PATH ?? resolve(repoRoot, 'data/app.db')
const fallbackDbPath = process.env.DB_FALLBACK_PATH ?? resolve(repoRoot, 'app.local.db')
const dbPath = await resolveWritableDbPath(requestedDbPath, fallbackDbPath)

if (dbPath !== requestedDbPath) {
  console.warn(
    `DB path fallback active: using ${dbPath} because ${requestedDbPath} is not writable`
  )
}

await mkdir(dirname(dbPath), { recursive: true })

const db = new Database(dbPath)
db.run('pragma foreign_keys = on')
db.run('pragma journal_mode = wal')
db.run('pragma busy_timeout = 5000')

const TABLES = {
  programs: 'rpms_programs',
  programBlocks: 'rpms_program_blocks',
  faqItems: 'rpms_faq_items',
  leadRequests: 'rpms_lead_requests',
  siteSettings: 'rpms_site_settings'
}

db.run(
  `create table if not exists ${TABLES.programs} (id integer primary key autoincrement, slug text not null unique, category text not null, title text not null, rncp_code text not null, level_label text not null, format_label text not null, rhythm_label text not null, support_label text not null, objective_summary text not null, professional_scope text not null, intro text not null, sort_order integer not null default 0, active integer not null default 1, created_at text not null default (datetime('now')))`
)
db.run(
  `create table if not exists ${TABLES.programBlocks} (id integer primary key autoincrement, program_id integer not null, code text not null, title text not null, details text not null, sort_order integer not null default 0, foreign key(program_id) references ${TABLES.programs}(id) on delete cascade)`
)
db.run(
  `create table if not exists ${TABLES.faqItems} (id integer primary key autoincrement, question text not null, answer text not null, audience text not null default 'particulier', sort_order integer not null default 0, active integer not null default 1)`
)
db.run(
  `create table if not exists ${TABLES.leadRequests} (id integer primary key autoincrement, profile text not null, first_name text not null, last_name text not null, email text not null, phone text, date_of_birth text, payment_preference text, target_program_slug text not null, message text not null, consent_rgpd integer not null, source_page text, status text not null default 'new', created_at text not null default (datetime('now')))`
)
db.run(
  `create table if not exists ${TABLES.siteSettings} (key text primary key, value text not null)`
)

ensureTableColumn(TABLES.leadRequests, 'date_of_birth', 'text')
ensureTableColumn(TABLES.leadRequests, 'payment_preference', 'text')

const upsertProgram = db.query(
  `insert into ${TABLES.programs} (slug, category, title, rncp_code, level_label, format_label, rhythm_label, support_label, objective_summary, professional_scope, intro, sort_order, active) values ($slug, $category, $title, $rncpCode, $levelLabel, $formatLabel, $rhythmLabel, $supportLabel, $objectiveSummary, $professionalScope, $intro, $sortOrder, 1) on conflict(slug) do update set category=excluded.category, title=excluded.title, rncp_code=excluded.rncp_code, level_label=excluded.level_label, format_label=excluded.format_label, rhythm_label=excluded.rhythm_label, support_label=excluded.support_label, objective_summary=excluded.objective_summary, professional_scope=excluded.professional_scope, intro=excluded.intro, sort_order=excluded.sort_order, active=1`
)
const getProgramId = db.query(`select id from ${TABLES.programs} where slug = $slug`)
const clearProgramBlocks = db.query(`delete from ${TABLES.programBlocks} where program_id = $programId`)
const insertProgramBlock = db.query(
  `insert into ${TABLES.programBlocks} (program_id, code, title, details, sort_order) values ($programId, $code, $title, $details, $sortOrder)`
)
const clearFaq = db.query(`delete from ${TABLES.faqItems}`)
const insertFaq = db.query(
  `insert into ${TABLES.faqItems} (question, answer, audience, sort_order, active) values ($question, $answer, $audience, $sortOrder, 1)`
)
const upsertSiteSetting = db.query(
  `insert into ${TABLES.siteSettings} (key, value) values ($key, $value) on conflict(key) do update set value = excluded.value`
)
const listPrograms = db.query(
  `select id, slug, category, title, rncp_code as rncpCode, level_label as levelLabel, format_label as formatLabel, rhythm_label as rhythmLabel, support_label as supportLabel, objective_summary as objectiveSummary, professional_scope as professionalScope, intro, sort_order as sortOrder from ${TABLES.programs} where active = 1 order by sort_order asc, id asc`
)
const findProgramBySlug = db.query(
  `select id, slug, category, title, rncp_code as rncpCode, level_label as levelLabel, format_label as formatLabel, rhythm_label as rhythmLabel, support_label as supportLabel, objective_summary as objectiveSummary, professional_scope as professionalScope, intro, sort_order as sortOrder from ${TABLES.programs} where slug = $slug and active = 1`
)
const listProgramBlocks = db.query(
  `select code, title, details, sort_order as sortOrder from ${TABLES.programBlocks} where program_id = $programId order by sort_order asc, id asc`
)
const listFaq = db.query(
  `select question, answer, audience, sort_order as sortOrder from ${TABLES.faqItems} where active = 1 order by sort_order asc, id asc`
)
const listSiteSettings = db.query(`select key, value from ${TABLES.siteSettings}`)
const createLead = db.query(
  `insert into ${TABLES.leadRequests} (profile, first_name, last_name, email, phone, date_of_birth, payment_preference, target_program_slug, message, consent_rgpd, source_page, status) values ($profile, $firstName, $lastName, $email, $phone, $dateOfBirth, $paymentPreference, $targetProgramSlug, $message, $consentRgpd, $sourcePage, $status) returning id, status, created_at as createdAt`
)

function safeJsonParse(value, fallback) {
  try {
    return JSON.parse(value)
  } catch {
    return fallback
  }
}

function normalizeText(value) {
  return String(value ?? '')
    .trim()
    .replace(/\s+/g, ' ')
}

function normalizeEmail(value) {
  return normalizeText(value).toLowerCase()
}

function normalizePaymentPreference(value) {
  const normalized = normalizeText(value).toLowerCase()
  if (normalized === 'cash' || normalized === 'installments') {
    return normalized
  }
  return ''
}

function ensureTableColumn(tableName, columnName, definition) {
  const existingColumns = db
    .query(`pragma table_info(${tableName})`)
    .all()
    .map((column) => String(column.name ?? ''))

  if (existingColumns.includes(columnName)) {
    return
  }

  db.run(`alter table ${tableName} add column ${columnName} ${definition}`)
}

async function pathExists(path) {
  try {
    await access(path, fsConstants.F_OK)
    return true
  } catch {
    return false
  }
}

async function canWritePath(path) {
  if (await pathExists(path)) {
    try {
      await access(path, fsConstants.W_OK)
      return true
    } catch {
      return false
    }
  }

  try {
    await mkdir(dirname(path), { recursive: true })
    await access(dirname(path), fsConstants.W_OK)
    return true
  } catch {
    return false
  }
}

async function resolveWritableDbPath(primary, fallback) {
  if (await canWritePath(primary)) {
    return primary
  }

  if (await canWritePath(fallback)) {
    return fallback
  }

  return primary
}

function mapProgramRow(row) {
  return {
    id: Number(row.id ?? 0),
    slug: String(row.slug ?? ''),
    category: String(row.category ?? ''),
    title: String(row.title ?? ''),
    rncpCode: String(row.rncpCode ?? ''),
    levelLabel: String(row.levelLabel ?? ''),
    formatLabel: String(row.formatLabel ?? ''),
    rhythmLabel: String(row.rhythmLabel ?? ''),
    supportLabel: String(row.supportLabel ?? ''),
    objectiveSummary: safeJsonParse(String(row.objectiveSummary ?? '[]'), []),
    professionalScope: safeJsonParse(String(row.professionalScope ?? '[]'), []),
    intro: String(row.intro ?? ''),
    sortOrder: Number(row.sortOrder ?? 0)
  }
}

function getSitePayload() {
  const settings = listSiteSettings.all()
  const rawPayload = settings.find((item) => item.key === 'site_payload')
  return safeJsonParse(rawPayload?.value ?? '{}', {})
}

function seedData() {
  for (const program of programsSeed) {
    upsertProgram.run({
      $slug: program.slug,
      $category: program.category,
      $title: program.title,
      $rncpCode: program.rncpCode,
      $levelLabel: program.levelLabel,
      $formatLabel: program.formatLabel,
      $rhythmLabel: program.rhythmLabel,
      $supportLabel: program.supportLabel,
      $objectiveSummary: JSON.stringify(program.objectiveSummary),
      $professionalScope: JSON.stringify(program.professionalScope),
      $intro: program.intro,
      $sortOrder: program.sortOrder
    })

    const programRow = getProgramId.get({ $slug: program.slug })
    if (!programRow) {
      continue
    }

    clearProgramBlocks.run({ $programId: programRow.id })
    program.blocks.forEach((block, index) => {
      insertProgramBlock.run({
        $programId: programRow.id,
        $code: block.code,
        $title: block.title,
        $details: block.details,
        $sortOrder: index + 1
      })
    })
  }

  clearFaq.run()
  faqSeed.forEach((item) => {
    insertFaq.run({
      $question: item.question,
      $answer: item.answer,
      $audience: item.audience,
      $sortOrder: item.sortOrder
    })
  })

  upsertSiteSetting.run({
    $key: 'site_payload',
    $value: JSON.stringify(siteContent)
  })
}

seedData()

const leadAttemptsByIp = new Map()
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000
const RATE_LIMIT_MAX = 6

function isRateLimited(ip) {
  const now = Date.now()
  const recent = (leadAttemptsByIp.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  )
  recent.push(now)
  leadAttemptsByIp.set(ip, recent)
  return recent.length > RATE_LIMIT_MAX
}

function getRequestIp(request) {
  const forwarded = request.headers.get('x-forwarded-for')
  return normalizeText(forwarded?.split(',')[0]) || 'unknown'
}

const app = new Elysia()
  .use(cors())
  .get('/api/health', () => ({
    ok: true,
    dbPath,
    requestedDbPath
  }))
  .get('/api/site', () => ({ item: getSitePayload() }))
  .get('/api/faq', () => ({ items: listFaq.all() }))
  .get('/api/programs', () => {
    const rows = listPrograms.all()
    return {
      items: rows.map(mapProgramRow)
    }
  })
  .get(
    '/api/programs/:slug',
    ({ params, set }) => {
      const row = findProgramBySlug.get({
        $slug: normalizeText(params.slug)
      })

      if (!row) {
        set.status = 404
        return { error: 'Programme introuvable' }
      }

      const program = mapProgramRow(row)
      return {
        item: {
          ...program,
          blocks: listProgramBlocks.all({ $programId: program.id })
        }
      }
    },
    {
      params: t.Object({
        slug: t.String({ minLength: 2, maxLength: 120 })
      })
    }
  )
  .post(
    '/api/leads',
    ({ body, request, set }) => {
      if (normalizeText(body.honeypot)) {
        return { ok: true }
      }

      if (!body.consentRgpd) {
        set.status = 400
        return { error: 'Consentement RGPD obligatoire' }
      }

      const ip = getRequestIp(request)
      if (isRateLimited(ip)) {
        set.status = 429
        return { error: 'Trop de tentatives, merci de reessayer plus tard' }
      }

      const firstName = normalizeText(body.firstName)
      const lastName = normalizeText(body.lastName)
      const email = normalizeEmail(body.email)
      const message = normalizeText(body.message) || 'Inscription RPMS'
      const dateOfBirth = normalizeText(body.dateOfBirth)
      const paymentPreference = normalizePaymentPreference(body.paymentPreference)

      if (!firstName || !lastName || !email || !dateOfBirth) {
        set.status = 400
        return { error: 'Champs obligatoires manquants' }
      }

      const saved = createLead.get({
        $profile: 'particulier',
        $firstName: firstName,
        $lastName: lastName,
        $email: email,
        $phone: normalizeText(body.phone) || null,
        $dateOfBirth: dateOfBirth,
        $paymentPreference: paymentPreference || null,
        $targetProgramSlug: 'rpms',
        $message: message,
        $consentRgpd: body.consentRgpd ? 1 : 0,
        $sourcePage: normalizeText(body.sourcePage) || null,
        $status: 'new'
      })

      return {
        ok: true,
        leadId: saved?.id ?? null,
        status: saved?.status ?? 'new',
        createdAt: saved?.createdAt ?? null
      }
    },
    {
      body: t.Object({
        firstName: t.String({ minLength: 2, maxLength: 80 }),
        lastName: t.String({ minLength: 2, maxLength: 80 }),
        email: t.String({ format: 'email', maxLength: 160 }),
        phone: t.Optional(t.String({ maxLength: 40 })),
        dateOfBirth: t.String({ minLength: 10, maxLength: 10 }),
        paymentPreference: t.Optional(t.String({ maxLength: 32 })),
        message: t.Optional(t.String({ maxLength: 2000 })),
        consentRgpd: t.Boolean(),
        sourcePage: t.Optional(t.String({ maxLength: 160 })),
        honeypot: t.Optional(t.String({ maxLength: 120 }))
      })
    }
  )
  .listen({ port, hostname: '0.0.0.0' })

console.log(`API ready on http://localhost:${app.server?.port}`)
