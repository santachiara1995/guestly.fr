<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowRight, Building2, Check, Download, LineChart, Rocket, ShieldCheck, Users } from 'lucide-vue-next'

import FinalDiagnosticCtaPanel from '@/components/shared/final-diagnostic-cta-panel.vue'
import { Button } from '@/components/ui/button'
import { useExperienceVariant } from '@/composables/use-experience-variant'
import { api } from '@/lib/api'
import { motionVariants, staggerEnter } from '@/lib/motion'

const program = ref(null)
const site = ref({ program: {} })
const loading = ref(true)
const errorMessage = ref('')
const { toWithExperience } = useExperienceVariant()

onMounted(async () => {
  try {
    const [programPayload, sitePayload] = await Promise.all([api.getProgram('rpms'), api.getSite()])
    program.value = programPayload
    site.value = sitePayload
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Programme introuvable.'
  } finally {
    loading.value = false
  }
})

function splitLines(value) {
  return String(value ?? '').split('\n').map((item) => item.trim()).filter(Boolean)
}

function firstLine(value) {
  return splitLines(value)[0] ?? ''
}

const pageCopy = computed(() => site.value.program ?? {})
const homeFinalCta = computed(() => site.value.home?.finalCta ?? {})

const hero = computed(() => {
  const value = pageCopy.value.hero ?? {}
  return {
    eyebrow: value.eyebrow ?? 'Programme du titre professionnel Responsable de petite et moyenne structure',
    title: value.title ?? 'Passez de l’Expertise Technique au Pilotage de PME — Certifié d’État.',
    description:
      value.description ?? 'Accessible sans le Bac. 100 % à distance en 364 h. Le sésame pour briser votre plafond de verre salarial.',
    note: value.note ?? 'Formation 100 % distanciel, en e-learning, avec accompagnement pédagogique.'
  }
})

const objectivesPanel = computed(() => pageCopy.value.objectivesPanel ?? {})
const evaluationSection = computed(() => pageCopy.value.evaluationSection ?? {})
const blocksSection = computed(() => pageCopy.value.blocksSection ?? {})
const blocks = computed(() =>
  (program.value?.blocks ?? []).map((block) => ({
    ...block,
    summary: firstLine(block.details),
    skills: splitLines(block.details)
  }))
)

const overviewCards = [
  { label: "Diplôme certifié par l'État", value: 'RPMS · RNCP38575 · Niveau 5 / Bac+2', note: 'Diplôme certifié par l’État français pour valoriser vos compétences et renforcer votre crédibilité.' },
  { label: 'Format distanciel', value: '100 % distanciel', note: 'E-learning souple pour apprendre où vous voulez, à votre rythme.' },
  { label: 'Accompagnement', value: 'Avec un formateur', note: 'Rendez-vous individuel et suivi régulier pour augmenter vos chances de réussite.' },
  { label: 'Financement', value: 'Comptant, plusieurs fois sans frais ou État', note: 'Trois solutions de financement pour lancer votre projet sans bloquer votre trésorerie.' }
]

const whyCards = [
  { icon: ShieldCheck, emoji: '🛡️', title: 'Leadership à 360°', description: 'Sortez du cadre opérationnel pour piloter une organisation dans toute sa complexité stratégique.' },
  { icon: LineChart, emoji: '📈', title: 'Performance ROI', description: 'Transformez chaque action en résultat mesurable. Apprenez le pilotage par les indicateurs clés.' },
  { icon: Users, emoji: '👥', title: "Management d'Élite", description: 'Recrutez, fédérez et animez une équipe qui produit des résultats, même sans votre présence constante.' },
  { icon: Building2, emoji: '🤝', title: 'Business Networking', description: 'Maîtrisez l’art des partenariats stratégiques pour verrouiller la croissance de votre PME.' },
  { icon: Rocket, emoji: '🚀', title: 'Domination Locale', description: 'Comprenez les enjeux de votre territoire pour installer une présence imbattable sur votre secteur.' },
  { icon: Check, emoji: '✅', title: 'Décision Exécutive', description: 'Éliminez l’hésitation. Prenez des décisions basées sur des faits, pas des intuitions.' }
]

const transformSteps = [
  { number: '01', label: 'E-LEARNING IMMERSIF', title: 'Théorie Connectée', description: 'Accédez 24/7 à des modules interactifs. Maîtrisez les concepts à votre rythme avant la pratique.' },
  { number: '02', label: 'CLASSES VIRTUELLES', title: 'Impact en Direct', description: 'Challengez vos connaissances avec des experts du secteur. Études de cas réels et échanges collectifs.' },
  { number: '03', label: 'MENTORAT INDIVIDUEL', title: 'Focus Résultat', description: 'Votre coach dédié valide vos acquis et vous aide à adapter le RPMS à votre projet spécifique.' },
  { number: '04', label: 'CERTIFICATION D’ÉTAT', title: 'Consécration', description: 'Sortez diplômé Bac+2 après un examen final en conditions réelles devant un jury professionnel.' }
]

const financeSkillCards = [
  {
    title: 'Décryptage de bilan',
    description: 'Comprenez enfin ce que vos chiffres disent de la santé réelle de votre structure.'
  },
  {
    title: 'Optimisation du résultat',
    description: 'Traquez les fuites de rentabilité dans votre compte de résultat.'
  },
  {
    title: 'Reporting de direction',
    description: "Sachez présenter un rapport d'activité qui convainc banquiers et actionnaires."
  }
]

const transformationStats = [
  { emoji: '⏱', colorClass: 'bg-blue-100 text-blue-700', label: 'Durée', value: '364 heures intensives' },
  { emoji: '🎓', colorClass: 'bg-red-100 text-red-600', label: 'Niveau', value: "Bac+2 reconnu par l'État" },
  { emoji: '💻', colorClass: 'bg-indigo-100 text-indigo-700', label: 'Format', value: '100 % distanciel (accès 24/7)' },
  { emoji: '🤝', colorClass: 'bg-emerald-100 text-emerald-700', label: 'Accompagnement', value: 'Mentor individuel dédié' }
]
</script>

<template>
  <div class="program-reference -mx-4 grid gap-0 sm:-mx-6 lg:-mx-8">
    <p v-if="loading" class="px-4 py-6 text-sm text-muted-foreground sm:px-6 lg:px-8">Chargement du programme…</p>
    <p v-else-if="errorMessage" class="mx-4 rounded-[1rem] border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive sm:mx-6 lg:mx-8">{{ errorMessage }}</p>

    <template v-else-if="program">
      <section class="program-section program-section--hero px-4 py-6 sm:px-6 lg:px-8 lg:py-8" v-motion :initial="motionVariants.block.initial" :enter="motionVariants.block.enter">
        <div class="shell-track">
          <article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
            <div class="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
              <div class="space-y-5">
                <span class="inline-flex rounded-full border border-red-600/20 bg-red-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-red-600">⚡ Attention · uniquement pour les profils ambitieux</span>
                <h1 class="editorial-title text-[clamp(2.1rem,4vw,3.7rem)] leading-[0.95] text-primary">
                  Passez de l’Expertise Technique<br>
                  au <span class="text-red-600">Pilotage de PME</span><br>
                  — Certifié d’État.
                </h1>
                <p class="max-w-3xl text-base leading-7 text-slate-600 sm:text-[1.05rem]">{{ hero.eyebrow ?? 'Titre professionnel RPMS, RNCP38575, niveau 5 / Bac+2.' }}</p>
                <div class="flex flex-wrap gap-3">
                  <Button :as="RouterLink" :to="toWithExperience('/inscription')" size="lg" class="bg-red-600 text-white px-6 py-5 text-xl">
                    Demander mon diagnostic gratuit →
                    <ArrowRight class="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <a href="/plaquette-titre-pro-rpms.pdf" target="_blank" rel="noreferrer" class="inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:text-red-600 hover:decoration-red-600/40">
                  <Download class="h-4 w-4" />
                  Télécharger la brochure
                </a>
              </div>
              <aside class="grid gap-3 sm:grid-cols-2">
                <article v-for="(card, index) in overviewCards" :key="card.label" class="rounded-3xl border border-slate-200 bg-white p-4 text-center shadow-sm" v-motion :initial="motionVariants.pop.initial" :enter="staggerEnter(index, 40, 18)">
                  <p class="text-[10px] font-bold uppercase tracking-[0.18em] text-red-600">{{ card.label }}</p>
                  <p class="mt-2 text-base font-bold text-primary">{{ card.value }}</p>
                  <p class="mt-2 text-sm leading-6 text-slate-600">{{ card.note }}</p>
                </article>
              </aside>
            </div>
          </article>
        </div>
      </section>

      <section class="program-section px-4 py-0 sm:px-6 lg:px-8">
        <div class="shell-track space-y-6 rounded-3xl border border-primary/40 bg-primary p-5 text-white shadow-sm sm:p-6 lg:p-8">
          <div class="mx-auto max-w-3xl text-center">
            <p class="kicker text-red-600">POURQUOI LE RPMS ?</p>
            <h2 class="editorial-title text-[clamp(1.75rem,3vw,2.55rem)] text-white">Le fossé entre « Bien faire son travail »<br>et « Diriger une entreprise ».</h2>
            <p class="mt-4 text-base leading-8 text-slate-200 sm:text-[1.02rem]">La plupart des managers échouent parce qu'ils gèrent des tâches, pas des organisations. Notre programme comble ce manque en 364 h d'immersion totale, 100 % à distance.</p>
          </div>
          <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <article v-for="card in whyCards" :key="card.title" class="rounded-3xl border border-white/10 bg-white/8 p-5 text-center shadow-sm">
              <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/14 text-2xl shadow-sm">
                <span aria-hidden="true">{{ card.emoji }}</span>
              </div>
              <h3 class="mt-4 text-[1.08rem] font-bold tracking-[-0.03em] text-white">{{ card.title }}</h3>
              <p class="mt-3 text-sm leading-7 text-slate-200">{{ card.description }}</p>
            </article>
          </div>
        </div>
      </section>

      <section class="program-section px-4 py-8 sm:px-6 lg:px-8">
        <article class="shell-track space-y-6 rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm sm:p-6 lg:p-8">
          <div class="mx-auto max-w-3xl text-center">
            <p class="kicker text-red-600">LE PARCOURS DE TRANSFORMATION</p>
            <h2 class="editorial-title text-[clamp(1.75rem,3vw,2.45rem)] text-primary">Comment nous allons forger votre posture de dirigeant.</h2>
          </div>
          <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <article v-for="(step, index) in transformSteps" :key="step.number" class="rounded-3xl border border-slate-200 bg-white p-5 text-center">
              <div class="flex justify-center">
                <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white font-black">{{ step.number }}</div>
              </div>
              <p class="mt-4 text-[11px] font-bold uppercase tracking-[0.18em] text-red-600">{{ step.label }}</p>
              <h3 class="mt-2 text-[1.08rem] font-bold tracking-[-0.03em] text-primary">{{ step.title }}</h3>
              <p class="mt-3 text-sm leading-7 text-slate-600">{{ step.description }}</p>
            </article>
          </div>
        </article>
      </section>

      <section class="program-section px-4 py-8 sm:px-6 lg:px-8">
        <article class="shell-track grid gap-8 rounded-3xl border border-slate-200 bg-primary p-5 text-white shadow-sm sm:p-6 lg:grid-cols-[1fr_0.9fr] lg:items-start lg:p-8">
          <div class="space-y-5">
            <p class="kicker text-red-600">VOTRE FUTUR ARSENAL FINANCIER</p>
            <h2 class="editorial-title text-[clamp(1.85rem,3vw,2.7rem)] text-white">Ne subissez plus vos bilans, <span class="text-red-600">pilotez votre rentabilité</span>.</h2>
            <p class="max-w-3xl text-base leading-8 text-slate-300">Le Bloc 3 (RNCP38575BC03) n'est pas qu'une liste de tableaux comptables. C'est le centre de contrôle de votre future réussite.</p>
            <div class="grid gap-3">
              <article v-for="item in financeSkillCards" :key="item.title" class="rounded-2xl border border-white/10 bg-white/8 p-4">
                <div class="flex items-start gap-3">
                  <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-600/18 text-red-500">
                    <Check class="h-4 w-4" />
                  </span>
                  <div>
                    <h3 class="text-base font-black tracking-[-0.03em] text-white">{{ item.title }}</h3>
                    <p class="mt-1 text-sm leading-7 text-slate-300">{{ item.description }}</p>
                  </div>
                </div>
              </article>
            </div>
          </div>
          <article class="rounded-3xl border border-white/10 bg-white p-5 text-slate-900">
            <h3 class="text-xl font-bold text-primary">Transformation garantie</h3>
            <div class="mt-5 grid gap-4">
              <div v-for="item in transformationStats" :key="item.label" class="flex items-center gap-3">
                <span :class="['flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg', item.colorClass]">{{ item.emoji }}</span>
                <div>
                  <p class="text-[10px] font-bold uppercase tracking-[0.18em] text-red-600">{{ item.label }}</p>
                  <p class="font-bold text-primary">{{ item.value }}</p>
                </div>
              </div>
            </div>
          </article>
        </article>
      </section>

      <section class="program-section px-4 py-8 sm:px-6 lg:px-8">
        <div class="shell-track space-y-6">
          <div class="mx-auto max-w-3xl text-center">
            <p v-if="blocksSection.eyebrow" class="kicker text-red-600">{{ blocksSection.eyebrow }}</p>
            <h2 class="editorial-title text-[clamp(1.75rem,3vw,2.45rem)] text-primary">{{ blocksSection.title ?? 'Programme détaillé' }}</h2>
            <p v-if="blocksSection.description" class="mt-4 text-base leading-8 text-slate-600">{{ blocksSection.description }}</p>
          </div>

          <div class="grid gap-4 lg:grid-cols-3">
            <article v-for="(block, index) in blocks" :key="block.code" class="rounded-3xl border border-slate-200 bg-white p-5 text-center" v-motion :initial="motionVariants.block.initial" :enter="staggerEnter(index, 56, 28)">
              <p class="mx-auto text-[11px] font-bold uppercase tracking-[0.18em] text-red-600">{{ block.code }}</p>
              <h3 class="mt-2 text-[1.08rem] font-bold tracking-[-0.03em] text-primary">{{ block.title }}</h3>
              <p class="mt-3 text-sm leading-7 text-slate-600">{{ block.summary }}</p>
              <ul class="mt-4 space-y-2 text-sm leading-6 text-slate-600">
                <li v-for="skill in block.skills" :key="skill">• {{ skill }}</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section class="program-section px-4 py-8 sm:px-6 lg:px-8">
        <article class="rounded-[1.25rem] border border-slate-200 bg-white p-5 sm:p-6 lg:p-8">
          <div class="mx-auto max-w-3xl text-center">
            <p class="kicker text-red-600">{{ objectivesPanel.eyebrow ?? 'Objectifs pédagogiques' }}</p>
            <h2 class="editorial-title mt-4 text-[clamp(1.5rem,2.5vw,2rem)] text-primary">{{ objectivesPanel.title ?? 'À l’issue de la formation, les apprenants seront capables de :' }}</h2>
            <p class="mt-4 text-base leading-8 text-slate-600">{{ objectivesPanel.description ?? "Le parcours se suit entièrement à distance, en e-learning, avec une organisation souple pensée pour progresser sans interrompre votre activité professionnelle." }}</p>
          </div>

          <div class="mt-6 grid gap-3 sm:grid-cols-2">
            <article v-for="(item, index) in objectivesPanel.items ?? []" :key="item" class="rounded-[1rem] border border-slate-200 bg-slate-50 p-4 text-center">
              <div class="flex h-full flex-col items-center justify-start gap-3">
                <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">{{ index + 1 }}</span>
                <p class="text-center text-sm font-semibold leading-6 text-slate-700">{{ item }}</p>
              </div>
            </article>
          </div>

          <div class="mt-8 mx-auto max-w-3xl text-center">
            <h2 class="editorial-title text-[clamp(1.45rem,2.2vw,1.9rem)] text-primary">{{ evaluationSection.title ?? '364 heures de formation, Examen de 1 h 35.' }}</h2>
            <p class="mt-4 text-sm leading-7 text-slate-600">{{ evaluationSection.description ?? "La fiche RNCP38575 précise le déroulé de l'épreuve finale." }}</p>
          </div>
        </article>
      </section>

      <section class="program-section px-4 pb-0 pt-6 sm:px-6 lg:px-8 lg:pb-0 lg:pt-8">
        <div class="shell-track">
          <FinalDiagnosticCtaPanel :copy="homeFinalCta" />
        </div>
      </section>
    </template>
  </div>
</template>
