<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  ChevronDown,
  Clock3,
  FileText,
  Landmark,
  RefreshCcw,
  Rocket,
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
  Users,
  WalletCards
} from 'lucide-vue-next'

import BrochureCapture from '@/components/brochure-capture.vue'
import EligibilityQuiz from '@/components/eligibility-quiz.vue'
import FinanceSolutionsSection from '@/components/shared/finance-solutions-section.vue'
import { Button } from '@/components/ui/button'
import { useExperienceVariant } from '@/composables/use-experience-variant'
import { api } from '@/lib/api'
import { motionVariants, staggerEnter } from '@/lib/motion'

const site = ref({
  home: {},
  finance: {},
  faq: {}
})
const faqItems = ref([])
const loading = ref(true)
const errorMessage = ref('')
const quizOpen = ref(false)

const { toWithExperience } = useExperienceVariant()

const homeHeroImage = '/hero-office-gemini.jpg'
const painIcons = [TrendingUp, ShieldAlert, Landmark]
const personaIcons = [BriefcaseBusiness, RefreshCcw, ShieldCheck, Building2, Rocket]
const rpmsIcons = [TrendingUp, Users, WalletCards]
const cityzIcons = [Clock3, Users, ShieldCheck, Building2, WalletCards]
const zeroPaperIcon = FileText
const quickStartText =
  'Démarrage de votre formation sous 10 jours · Places limitées pour garantir un suivi personnalisé'
const testimonials = [
  {
    stat: 'Pilotage industrialisé',
    quote:
      "Je gérais la partie technique au feeling. Le RPMS m'a donné le cadre : indicateurs, analyse et management d'équipe.",
    name: 'Anna-Ketsia P.',
    role: 'Co-fondatrice & Directrice technique',
    company: 'Ma Petite Maison Verte',
    sector: 'Construction éco-responsable'
  },
  {
    stat: '2 nouvelles subventions obtenues',
    quote:
      "Diriger sans diplôme de gestion, c'est tenir sur la bonne volonté. Avec le RPMS, j'ai structuré notre pilotage financier.",
    name: '[Prénom]',
    role: 'Directeur',
    company: 'Association MJS',
    sector: 'Jeunesse & action sociale'
  },
  {
    stat: 'Financement bancaire débloqué',
    quote:
      "Le RPMS valide l'expérience terrain et ouvre des portes quand il faut négocier avec une banque ou un investisseur.",
    name: '[Prénom]',
    role: 'Dirigeant',
    company: 'Gobuse',
    sector: 'Services aux entreprises'
  }
]

onMounted(async () => {
  try {
    const [sitePayload, faqPayload] = await Promise.all([api.getSite(), api.getFaq()])
    site.value = sitePayload
    faqItems.value = staticFaqItems.length ? staticFaqItems : faqPayload
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Contenu indisponible.'
  } finally {
    loading.value = false
  }
})

const homeCopy = computed(() => site.value.home ?? {})
const financeCopy = computed(() => site.value.finance ?? {})
const faqCopy = computed(() => site.value.faq ?? {})
const staticFaqItems = [
  { question: 'Peut-on vraiment obtenir un Bac+2 sans avoir le Bac ?', answer: 'Oui. Le Titre Professionnel RPMS est délivré par le Ministère du Travail et ne nécessite pas le Baccalauréat.' },
  { question: 'Puis-je suivre la formation tout en gardant mon emploi ?', answer: 'Oui. Le format est 100 % à distance, en asynchrone.' },
  { question: "Comment se déroule l'examen final ?", answer: "L'examen dure 1h35 au total : présentation, entretien technique, entretien final." },
  { question: 'Quelle différence entre le RPMS et un BTS Management ?', answer: 'Les deux délivrent un Bac+2, mais le RPMS est plus court, professionnel et accessible sans Bac.' },
  { question: 'Combien de temps entre mon inscription et le démarrage ?', answer: 'Paiement comptant ou acompte + échéancier : démarrage sous 10 jours.' },
  { question: "Que se passe-t-il si je rate l'examen ?", answer: 'Vous pouvez repasser les blocs non validés lors d’une session suivante.' },
  { question: 'Puis-je utiliser mon CPF ?', answer: 'Oui, le RPMS est éligible au CPF.' },
  { question: 'Y a-t-il un stage obligatoire ?', answer: "Pour les candidats en emploi, non. Pour les demandeurs d'emploi, un stage peut être requis." },
  { question: "Combien d'heures par semaine dois-je y consacrer ?", answer: 'Entre 8 et 12 heures par semaine sur 6 à 12 mois.' },
  { question: "Compatible avec le RSA ou l'ARE ?", answer: 'Oui, selon votre situation et votre dossier.' },
  { question: 'Quel est le niveau de salaire après obtention du titre ?', answer: 'Selon la fiche ROME M1302, la rémunération observée est entre 35 000 et 55 000 € brut annuels.' },
  { question: 'Est-ce que CITYZ est certifié Qualiopi ?', answer: 'Oui, CITYZ Formation est certifié Qualiopi.' }
]

const diagnosticLink = computed(() =>
  toWithExperience({
    path: '/inscription',
    query: { payment: 'state' },
    hash: '#formulaire-inscription'
  })
)
const signupLink = computed(() => toWithExperience('/inscription'))
const faqLink = computed(() => toWithExperience('/faq'))

function openQuiz() {
  quizOpen.value = true
}

function closeQuiz() {
  quizOpen.value = false
}

const financeLinks = computed(() => ({
  cash: toWithExperience({
    path: '/inscription',
    query: { payment: 'cash' },
    hash: '#formulaire-inscription'
  }),
  installments: toWithExperience({
    path: '/inscription',
    query: { payment: 'installments' },
    hash: '#formulaire-inscription'
  }),
  state: toWithExperience({
    path: '/inscription',
    query: { payment: 'state' },
    hash: '#formulaire-inscription'
  })
}))

const homeFaqItems = computed(() => faqItems.value.slice(0, 4))

const heroHookLines = computed(() =>
  (hero.value.hookLines ?? []).map((line) => {
    const targets = ["par l'Etat", 'par l’État']

    for (const target of targets) {
      const accentIndex = line.indexOf(target)
      if (accentIndex !== -1) {
        return {
          raw: line,
          baseStart: line.slice(0, accentIndex),
          accent: target,
          baseEnd: line.slice(accentIndex + target.length)
        }
      }
    }

    return {
      raw: line,
      baseStart: line,
      accent: '',
      baseEnd: ''
    }
  })
)

const sourceMap = computed(() =>
  Object.fromEntries((homeCopy.value.sources ?? []).map((item) => [item.id, item]))
)

function resolveSources(refs = []) {
  return refs.map((ref) => sourceMap.value[ref]).filter(Boolean)
}

const hero = computed(() => homeCopy.value.hero ?? {})
const painPointSection = computed(() => homeCopy.value.painPointSection ?? {})
const proofItems = computed(() => homeCopy.value.proofItems ?? [])
const personasSection = computed(() => ({
  ...(homeCopy.value.personasSection ?? {}),
  items: (homeCopy.value.personasSection?.items ?? []).map((item) => ({
    ...item,
    sources: resolveSources(item.sourceRefs)
  }))
}))
const rpmsSection = computed(() => homeCopy.value.rpmsCityzSection ?? {})
const cityzSection = computed(() => homeCopy.value.cityzSection ?? {})
const zeroPaperSection = computed(() => homeCopy.value.zeroPaperSection ?? {})
const finalCta = computed(() => homeCopy.value.finalCta ?? {})
const financeHero = computed(() => financeCopy.value.hero ?? {})
const pricing = computed(() => financeCopy.value.pricing ?? {})
const paymentSection = computed(() => financeCopy.value.paymentSection ?? {})
const paymentLinks = computed(() => ({
  cashUrl: financeCopy.value.paymentLinks?.cashUrl ?? '',
  installmentsUrl: financeCopy.value.paymentLinks?.installmentsUrl ?? ''
}))
const faqHero = computed(() => faqCopy.value.hero ?? {})
</script>

<template>
  <div class="page-stack -mx-4 sm:-mx-6 lg:-mx-8">
    <p v-if="loading" class="px-4 py-6 text-sm text-muted-foreground sm:px-6 lg:px-8">
      Actualisation du contenu…
    </p>

    <p
      v-else-if="errorMessage"
      class="mx-4 rounded-[1rem] border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive sm:mx-6 lg:mx-8"
    >
      {{ errorMessage }}
    </p>

    <template v-else>
      <section
        class="page-shell px-4 py-6 sm:px-6 lg:px-8 lg:py-8"
        v-motion
        :initial="motionVariants.block.initial"
        :enter="motionVariants.block.enter"
      >
        <div class="home-hero-grid">
          <article class="home-hero-card page-hero p-5 sm:p-6 lg:p-8">
            <div class="flex flex-wrap gap-3">
              <span class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
                🛡️ Titre d'État · RNCP 38575
              </span>
              <span class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
                💻 100 % à distance
              </span>
              <span class="inline-flex items-center gap-2 rounded-full border border-red-600/25 bg-red-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-red-600">
                🎓 Accessible sans le Bac
              </span>
            </div>

            <h1 class="editorial-title home-hook-title">
              <span class="home-hook-line">Décrochez votre BAC+2,</span>
              <span class="home-hook-line">Certifié par l'Etat,</span>
              <span class="home-hook-line">100 % à distance,</span>
              <span class="home-hook-line">En 364 heures.</span>
            </h1>

            <p class="home-hero-copy">
              {{ hero.lead }}
            </p>

            <ul class="home-hero-list" aria-label="Compétences clés du titre professionnel RPMS">
              <li v-for="item in hero.capabilities ?? []" :key="item">
                {{ item }}
              </li>
            </ul>

            <div class="home-hero-actions">
              <Button
                size="lg"
                class="home-hero-actions__button w-full justify-center whitespace-normal px-4 text-center leading-snug bg-red-600 text-white"
                @click="openQuiz"
              >
                Demandez votre diagnostic gratuit →
                <ArrowRight class="ml-2 h-4 w-4" />
              </Button>
            </div>
          </article>

          <article class="home-visual-card page-cut p-3 sm:p-4">
            <img
              :src="homeHeroImage"
              alt="Professionnelle en environnement de travail"
              class="home-visual-card__image"
            >
          </article>
        </div>
      </section>

      <section class="page-shell px-4 py-0 sm:px-6 lg:px-8">
        <article class="page-cut p-5 sm:p-6 lg:p-8">
          <div class="mx-auto max-w-3xl text-center">
            <p class="kicker home-section-title">
              {{ painPointSection.title }}
            </p>
            <h2 class="home-section-heading mt-3">
              {{ painPointSection.subtitle ?? painPointSection.title }}
            </h2>
            <p class="mt-4 text-lg leading-8 text-muted-foreground sm:text-[1.08rem]">
              {{ painPointSection.description }}
            </p>
          </div>

          <div class="home-pain-grid mt-8">
            <article
              v-for="(item, index) in painPointSection.items ?? []"
              :key="item.title"
              class="decision-card home-pain-card"
              v-motion
              :initial="motionVariants.pop.initial"
              :enter="staggerEnter(index, 46, 22)"
            >
              <span class="paper-card__icon" aria-hidden="true">
                <component :is="painIcons[index] ?? TrendingUp" class="h-4 w-4" />
              </span>
              <h3 class="mt-4 text-[1.08rem] font-semibold leading-tight tracking-[-0.03em] text-foreground">
                {{ item.title }}
              </h3>
              <p class="mt-3 text-sm leading-7 text-muted-foreground">
                {{ item.text }}
              </p>
            </article>
          </div>
        </article>
      </section>

      <section class="page-shell px-4 py-0 sm:px-6 lg:px-8">
        <article class="page-cut bg-primary px-5 py-6 text-white sm:px-6 lg:px-8">
          <div class="mx-auto max-w-3xl text-center">
            <p class="kicker text-red-600">Le rachat de temps</p>
            <h2 class="home-section-heading mt-4 text-white">
              Pourquoi sacrifier 6 ans quand vous pouvez décrocher votre Bac+2 d'État en 6 mois ?
            </h2>
            <p class="mx-auto mt-4 max-w-3xl text-base leading-8 text-slate-300 sm:text-[1.02rem]">
              Le Titre Pro RPMS est le seul Bac+2 accessible <span class="underline decoration-red-600 decoration-2">sans le Baccalauréat</span>. L'accélérateur officiel des parcours atypiques.
            </p>
          </div>

          <div class="mt-8 grid gap-5 lg:grid-cols-2">
            <article class="rounded-3xl border border-white/10 bg-white/5 p-6 opacity-70">
              <h3 class="text-xl font-bold text-white">⏱ Parcours classique — Le long chemin</h3>
              <div class="mt-8 space-y-8">
                <div v-for="step in [
                  { year: 'Année 1-2', title: 'Reprise d\'études ou VAE', desc: 'Démarches administratives interminables pour décrocher une équivalence Bac.' },
                  { year: 'Année 3-4', title: 'BTS ou DUT', desc: 'Deux ans de théorie en présentiel, difficile à concilier avec un emploi.' },
                  { year: 'Année 5-6', title: 'Bachelor ou Licence pro', desc: 'Vous atteignez enfin le niveau visé, après avoir sacrifié 6 ans de salaire et de carrière.' }
                ]" :key="step.title" class="relative pl-10">
                  <span class="absolute left-0 top-1.5 h-4 w-4 rounded-full bg-slate-500"></span>
                  <p class="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">{{ step.year }}</p>
                  <h4 class="mt-1 text-xl font-bold text-white/90">{{ step.title }}</h4>
                  <p class="mt-2 text-sm leading-7 text-slate-300">{{ step.desc }}</p>
                </div>
              </div>
              <p class="mt-10 border-t border-white/8 pt-5 text-center text-sm font-semibold text-slate-300">~ 6 ans · parcours scolaire contraint</p>
            </article>

            <article class="relative rounded-3xl border-2 border-red-600/35 bg-gradient-to-br from-[#001a3b] to-primary p-6 shadow-2xl">
              <div class="absolute right-6 top-[-0.9rem] rounded-full bg-red-600 px-4 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-white">
                Le raccourci officiel
              </div>
              <h3 class="text-xl font-bold text-white">⚡ Parcours CITYZ — La voie directe</h3>
              <div class="mt-8 space-y-8">
                <div v-for="step in [
                  { time: 'Mois 0', title: 'Diagnostic gratuit', desc: 'On valide votre projet en 15 min. Votre expérience pèse plus qu\'un diplôme.' },
                  { time: 'Mois 1-6', title: 'Titre Pro RPMS immersif', desc: '364 heures 100 % distanciel. Vous apprenez à piloter une structure, pas à réciter des cours.' },
                  { time: 'Mois 7+', title: 'Poste de direction ou cycle supérieur', desc: 'Avec votre Bac+2 d\'État, vous visez les postes de management ou poursuivez en Bachelor / Master.' }
                ]" :key="step.title" class="relative pl-10">
                  <span class="absolute left-0 top-1.5 h-4 w-4 rounded-full bg-red-600 shadow-lg shadow-red-600/40"></span>
                  <p class="text-[11px] font-bold uppercase tracking-[0.18em] text-red-500">{{ step.time }}</p>
                  <h4 class="mt-1 text-xl font-bold text-white">{{ step.title }}</h4>
                  <p class="mt-2 text-sm leading-7 text-slate-300">{{ step.desc }}</p>
                </div>
              </div>
              <p class="mt-10 border-t border-white/10 pt-5 text-center text-lg font-black text-red-500">6 mois pour racheter 5 ans</p>
            </article>
          </div>

          <div class="mt-8 rounded-3xl border border-white/10 bg-white/5 px-6 py-6 text-center text-lg italic text-slate-100">
            « Un diplôme d'État, pensé pour les profils qui veulent agir, pas attendre. »
          </div>
        </article>
      </section>

      <section class="page-shell px-4 py-0 sm:px-6 lg:px-8">
        <article class="rounded-[1.2rem] bg-red-600 px-4 py-3 text-center text-sm font-bold text-white">
          {{ quickStartText }}
        </article>
      </section>

      <section class="page-shell px-4 py-0 sm:px-6 lg:px-8">
        <article class="page-cut p-5 sm:p-6 lg:p-8">
          <div class="mx-auto max-w-3xl text-center">
            <p class="kicker">POUR QUI ?</p>
            <h2 class="home-section-heading mt-4">
              {{ personasSection.title }}
            </h2>
            <p
              v-if="personasSection.description"
              class="mt-4 text-lg leading-8 text-muted-foreground sm:text-[1.08rem]"
            >
              {{ personasSection.description }}
            </p>
          </div>

          <div class="home-persona-grid mt-8">
            <article
              v-for="(item, index) in personasSection.items"
              :key="item.title"
              class="home-persona-card page-cut p-5 sm:p-6"
              v-motion
              :initial="motionVariants.block.initial"
              :enter="staggerEnter(index, 46, 22)"
            >
              <div class="home-persona-card__body">
                <span class="paper-card__icon home-persona-card__icon" aria-hidden="true">
                  <component :is="personaIcons[index] ?? BriefcaseBusiness" class="h-4 w-4" />
                </span>
                <h3 class="text-[1.08rem] font-semibold leading-tight tracking-[-0.03em] text-foreground">
                  {{ item.title }}
                </h3>
                <p class="text-sm leading-7 text-muted-foreground" v-html="item.detailsHtml"></p>
              </div>
            </article>
          </div>
        </article>
      </section>

      <section class="page-shell px-4 py-0 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-3xl text-center">
          <p class="kicker text-red-600">Ils nous ont fait confiance</p>
          <h2 class="home-section-heading mt-4">Des dirigeants réels, des parcours réels.</h2>
        </div>
        <div class="mt-8 grid gap-5 lg:grid-cols-3">
          <article v-for="item in testimonials" :key="item.stat" class="page-cut p-5 sm:p-6">
            <p class="inline-flex rounded-full bg-red-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-red-600">{{ item.stat }}</p>
            <p class="mt-5 text-sm leading-7 text-slate-600">"{{ item.quote }}"</p>
            <div class="mt-6 border-t border-slate-200 pt-5">
              <p class="font-semibold text-slate-900">{{ item.name }}</p>
              <p class="text-xs text-slate-500">{{ item.role }}</p>
              <p class="text-xs font-semibold text-red-600">{{ item.company }} · {{ item.sector }}</p>
            </div>
          </article>
        </div>
      </section>

      <section class="page-shell px-4 py-0 sm:px-6 lg:px-8">
        <div class="home-dual-grid">
          <article class="page-cut p-5 sm:p-6 lg:p-8">
            <div class="text-center">
              <p class="kicker">LE TITRE RPMS</p>
              <h2 class="home-section-heading mt-4">Pourquoi sacrifier 6 ans quand vous pouvez décrocher votre Bac+2 d'État en 6 mois ?</h2>
              <p class="mx-auto mt-4 max-w-3xl text-base leading-8 text-muted-foreground sm:text-[1.02rem]">
                Le Titre Pro RPMS est le seul Bac+2 accessible sans le Baccalauréat. L'accélérateur officiel des parcours atypiques.
              </p>
            </div>

            <ul class="home-feature-list mt-8">
              <li v-for="(item, index) in rpmsSection.items ?? []" :key="item.title" class="home-feature-row">
                <span class="home-feature-row__icon" aria-hidden="true">
                  <component :is="rpmsIcons[index] ?? TrendingUp" class="h-5 w-5" />
                </span>
                <div>
                  <h3 class="text-[1.04rem] font-semibold leading-tight tracking-[-0.03em] text-foreground">
                    {{ item.title }}
                  </h3>
                  <p class="mt-2 text-sm leading-7 text-muted-foreground">
                    {{ item.description }}
                  </p>
                </div>
              </li>
            </ul>
          </article>

          <article class="home-cityz-card page-cut p-5 sm:p-6 lg:p-8">
            <div class="text-center">
              <p class="kicker text-red-600">POURQUOI CITYZ FORMATION ?</p>
              <h2 class="home-section-heading mt-4 home-cityz-card__title">
                {{ cityzSection.title }}
              </h2>
            </div>

            <ul class="home-cityz-list mt-8">
              <li
                v-for="(item, index) in cityzSection.items ?? []"
                :key="item.label"
                class="home-cityz-row"
              >
                <span class="home-cityz-row__icon" aria-hidden="true">
                  <component :is="cityzIcons[index] ?? ShieldCheck" class="h-5 w-5" />
                </span>
                <div>
                  <p class="home-cityz-row__label">{{ item.label }}</p>
                  <p v-if="item.description" class="home-cityz-row__description">
                    {{ item.description }}
                  </p>
                  <p v-else class="home-cityz-row__description" v-html="item.descriptionHtml"></p>
                </div>
              </li>
            </ul>
          </article>
        </div>
      </section>

      <section class="page-shell px-4 py-0 sm:px-6 lg:px-8">
        <article class="page-cut p-5 sm:p-6 lg:p-8">
          <FinanceSolutionsSection
            :hero="financeHero"
            :internal-links="financeLinks"
            :payment-links="paymentLinks"
            :payment-section="paymentSection"
            :pricing="pricing"
            section-id="financement-rpms"
          />
        </article>
      </section>

      <BrochureCapture />

      <section class="page-shell px-4 py-0 sm:px-6 lg:px-8">
        <article class="page-cut p-5 sm:p-6 lg:p-8">
          <div class="home-zero-grid">
            <div class="space-y-6">
              <span class="home-zero-icon" aria-hidden="true">
                <component :is="zeroPaperIcon" class="h-6 w-6" />
              </span>
              <div class="space-y-4">
                <p class="kicker">SERVICE ADMINISTRATIF</p>
                <h2 class="home-section-heading">
                  {{ zeroPaperSection.title }}
                </h2>
                <p class="text-lg leading-8 text-muted-foreground sm:text-[1.08rem]">
                  {{ zeroPaperSection.description }}
                </p>
              </div>

              <div class="home-zero-stats">
                <article v-for="stat in zeroPaperSection.stats ?? []" :key="stat.label" class="home-zero-stat-card">
                  <p class="home-zero-stat-card__value">{{ stat.value }}</p>
                  <p class="detail-key mt-2">{{ stat.label }}</p>
                </article>
              </div>
            </div>

            <div class="home-zero-steps">
              <article
                v-for="(step, index) in zeroPaperSection.steps ?? []"
                :key="step.number"
                class="home-zero-step-card"
                v-motion
                :initial="motionVariants.block.initial"
                :enter="staggerEnter(index, 44, 20)"
              >
                <span class="home-zero-step-card__number">{{ step.number }}</span>
                <div>
                  <h3 class="text-[1.04rem] font-semibold leading-tight tracking-[-0.03em] text-foreground">
                    {{ step.title }}
                  </h3>
                  <p class="mt-2 text-sm leading-7 text-muted-foreground">
                    {{ step.description }}
                  </p>
                </div>
              </article>
            </div>
          </div>
        </article>
      </section>

      <section class="page-shell px-4 py-0 sm:px-6 lg:px-8">
        <article class="page-cut p-5 sm:p-6 lg:p-8">
          <div class="mx-auto max-w-3xl text-center">
            <p class="kicker">{{ faqHero.eyebrow ?? 'QUESTIONS FRÉQUENTES' }}</p>
            <h2 class="home-section-heading mt-4">
              {{ faqHero.title ?? 'Tout ce que vous devez savoir avant de vous lancer' }}
            </h2>
            <p class="mt-4 text-lg leading-8 text-muted-foreground sm:text-[1.08rem]">
              {{ faqHero.description }}
            </p>
          </div>

          <div class="mx-auto mt-8 grid max-w-5xl gap-4">
            <details
              v-for="(item, index) in homeFaqItems"
              :key="item.question"
              class="accordion-card page-cut px-5 py-4 sm:px-6 sm:py-5"
              v-motion
              :initial="motionVariants.block.initial"
              :enter="staggerEnter(index, 38, 16)"
            >
              <summary class="faq-summary accordion-summary">
                <span class="text-base font-semibold leading-6 text-foreground">{{ item.question }}</span>
                <ChevronDown class="accordion-summary__icon mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              </summary>
              <p class="accordion-panel">{{ item.answer }}</p>
            </details>
          </div>

          <div class="mt-6 text-center">
            <RouterLink :to="faqLink" class="home-inline-link">
              Ouvrir la FAQ dédiée
              <ArrowRight class="h-4 w-4" />
            </RouterLink>
          </div>
        </article>
      </section>

      <section class="page-shell px-4 pb-6 pt-0 sm:px-6 lg:px-8 lg:pb-8">
        <article class="home-final-panel page-cut p-6 sm:p-8 lg:p-10">
          <div class="home-final-shell">
            <h2 class="editorial-title home-final-shell__title">
              {{ finalCta.title }}
            </h2>
            <p class="home-final-shell__description">
              {{ finalCta.description }}
            </p>
            <Button
              :as="RouterLink"
              :to="diagnosticLink"
              size="lg"
              class="home-final-shell__button justify-center whitespace-normal text-center"
            >
              Demander mon diagnostic gratuit
              <Clock3 class="ml-2 h-4 w-4" />
            </Button>
            <p class="home-final-shell__note">
              {{ finalCta.note }}
            </p>
          </div>
        </article>
      </section>

      <EligibilityQuiz v-if="quizOpen" @close="closeQuiz" />
    </template>
  </div>
</template>

<style scoped>
.home-hero-grid,
.home-dual-grid,
.home-zero-grid {
  display: grid;
  gap: 1rem;
}

.home-hero-card {
  display: grid;
  gap: 1.25rem;
  align-content: center;
}

.home-hook-stack {
  display: grid;
  gap: 0.25rem;
}

.home-section-title,
.home-section-heading {
  color: var(--primary);
  letter-spacing: -0.05em;
}

.home-section-title {
  font-size: 0.78rem;
  font-weight: 800;
  line-height: 1.2;
  color: var(--muted-foreground);
}

.home-section-heading {
  font-size: clamp(1.9rem, 3vw, 2.65rem);
  font-weight: 800;
  line-height: 1.05;
}

.home-hook-title {
  font-size: clamp(2.2rem, 4vw, 3.65rem);
  line-height: 0.98;
  color: var(--primary);
}

.home-hook-line {
  display: block;
}

.home-hook-line__base {
  color: inherit;
}

.home-hook-line__accent {
  color: var(--tricolor-red);
}

.home-hero-copy {
  max-width: 42rem;
  font-size: 1rem;
  line-height: 1.75;
  font-weight: 700;
  color: var(--foreground);
}

.home-hero-list {
  display: grid;
  gap: 0.7rem;
}

.home-hero-list li {
  position: relative;
  padding-left: 1.15rem;
  font-size: 0.98rem;
  font-weight: 600;
  line-height: 1.65;
  color: var(--foreground);
}

.home-hero-list li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.72rem;
  height: 0.42rem;
  width: 0.42rem;
  border-radius: 999px;
  background: var(--primary);
}

.home-hero-actions {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.85rem;
  align-items: stretch;
}

.home-hero-actions__button {
  min-height: 4.1rem;
}

.home-visual-card {
  min-height: 100%;
}

.home-visual-card__image {
  display: block;
  min-height: 20rem;
  height: 100%;
  width: 100%;
  border-radius: 1.1rem;
  object-fit: cover;
  object-position: center 20%;
}

.home-pain-grid,
.home-proof-grid,
.home-zero-stats {
  display: grid;
  gap: 1rem;
}

.home-pain-card {
  padding: 1.15rem;
  display: grid;
  justify-items: center;
  text-align: center;
}

.home-pain-card :deep(.paper-card__icon) {
  height: 3.25rem;
  width: 3.25rem;
}

.home-pain-card h3 {
  color: var(--primary);
  font-size: 1.2rem;
}

.home-pain-card p {
  font-size: 1rem;
}

.home-proof-card {
  min-height: 100%;
}

.home-proof-card .detail-key {
  font-size: 0.84rem;
}

.home-proof-card p:nth-of-type(2) {
  color: var(--primary);
}

.home-proof-card p:last-child {
  font-size: 0.98rem;
}

.home-persona-card {
  min-height: 100%;
  display: flex;
  flex: 1 1 20rem;
  max-width: 22.5rem;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
}

.home-persona-grid {
  justify-content: center;
  justify-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.home-persona-card__body {
  display: grid;
  justify-items: center;
  gap: 0.9rem;
}

.home-persona-card__icon {
  height: 3.25rem;
  width: 3.25rem;
}

.home-persona-card h3 {
  color: var(--primary);
  font-size: 1.18rem;
}

.home-persona-card p {
  font-size: 1rem;
}

.home-hero-card :deep(strong),
.home-persona-card :deep(strong),
.home-final-shell :deep(strong),
.home-proof-card :deep(strong),
.home-zero-grid :deep(strong) {
  color: var(--primary);
  font-size: 1.08em;
  font-weight: 800;
}

.home-feature-list,
.home-cityz-list,
.home-zero-steps {
  display: grid;
  gap: 1rem;
}

.home-feature-row {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  align-items: start;
}

.home-feature-row h3,
.home-cityz-row__label {
  color: var(--primary);
  font-size: 1.15rem;
}

.home-feature-row p,
.home-cityz-row__description {
  font-size: 1rem;
  line-height: 1.8;
}

.home-feature-row__icon,
.home-zero-icon,
.home-cityz-row__icon {
  display: inline-flex;
  height: 3.4rem;
  width: 3.4rem;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  background: color-mix(in oklab, var(--paper-tint) 84%, white);
  color: var(--blue-eclipse);
}

.home-cityz-card {
  border-color: color-mix(in oklab, var(--navy-deep) 56%, black);
  background:
    radial-gradient(circle at top right, rgb(255 255 255 / 0.08), transparent 36%),
    linear-gradient(160deg, #0d1a35 0%, #13284f 62%, #0b1630 100%);
}

.home-cityz-row {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.8rem;
  align-items: start;
  color: #ffffff;
}

.home-cityz-card__kicker {
  color: rgb(255 255 255 / 0.82);
}

.home-cityz-card__title,
.home-cityz-card .home-cityz-row__label {
  color: #ffffff;
}

.home-cityz-card .home-cityz-row__description {
  color: rgb(255 255 255 / 0.88);
}

.home-cityz-card :deep(strong) {
  color: #ffffff;
  font-size: 1.06em;
  font-weight: 800;
}

.home-zero-grid {
  align-items: start;
}

.home-zero-stats {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.home-zero-stat-card,
.home-zero-step-card {
  border-radius: 1.1rem;
  border: 1px solid color-mix(in oklab, var(--line) 78%, white);
  background: color-mix(in oklab, var(--paper) 86%, var(--paper-tint));
  padding: 1rem;
}

.home-zero-stat-card__value {
  font-size: clamp(1.8rem, 3.4vw, 2.5rem);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.05em;
  color: var(--blue-eclipse);
}

.home-zero-step-card {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  align-items: start;
}

.home-zero-step-card__number {
  font-size: clamp(2rem, 4vw, 3.2rem);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.06em;
  color: color-mix(in oklab, var(--line) 86%, white);
}

.home-final-panel {
  border-color: color-mix(in oklab, var(--primary) 24%, white);
  background:
    radial-gradient(circle at top right, rgb(225 0 15 / 0.08), transparent 28%),
    linear-gradient(180deg, white 0%, color-mix(in oklab, white 92%, var(--paper-tint)) 100%);
  box-shadow: 0 18px 36px rgb(17 39 65 / 0.1);
}

.home-final-shell {
  margin-inline: auto;
  width: min(100%, 60rem);
  display: grid;
  justify-items: center;
  gap: 1.2rem;
  text-align: center;
}

.home-final-shell__title {
  font-size: clamp(2rem, 4vw, 3.35rem);
  color: var(--primary);
}

.home-final-shell__description {
  max-width: 42rem;
  font-size: 1.08rem;
  line-height: 1.75;
  color: var(--muted-foreground);
}

.home-final-shell__button {
  width: min(100%, 36rem);
  min-height: 4.1rem;
  border-radius: 1rem;
  background: var(--primary);
  border-color: var(--primary);
  color: #ffffff;
  box-shadow: 0 20px 44px rgb(0 0 107 / 0.18);
}

.home-final-shell__button:hover {
  background: color-mix(in oklab, var(--primary) 88%, black);
  border-color: color-mix(in oklab, var(--primary) 88%, black);
  color: #ffffff;
}

.home-final-shell__note {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: color-mix(in oklab, var(--tricolor-red) 86%, var(--navy-deep));
}

@media (min-width: 640px) {
  .home-pain-grid,
  .home-proof-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .home-hero-grid {
    grid-template-columns: minmax(0, 1.02fr) minmax(24rem, 0.82fr);
    align-items: stretch;
  }

  .home-dual-grid,
  .home-zero-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
