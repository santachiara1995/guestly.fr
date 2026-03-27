<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowRight } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import { useExperienceVariant } from '@/composables/use-experience-variant'
import { api } from '@/lib/api'
import { motionVariants, staggerEnter } from '@/lib/motion'

const program = ref(null)
const site = ref({
  program: {}
})
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
  return String(value ?? '')
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean)
}

function firstLine(value) {
  return splitLines(value)[0] ?? ''
}

const pageCopy = computed(() => site.value.program ?? {})
const contactLink = computed(() => toWithExperience('/contact'))
const financeLink = computed(() => toWithExperience('/financement'))

const hero = computed(() => {
  const value = pageCopy.value.hero ?? {}
  return {
    eyebrow: value.eyebrow ?? 'Programme RPMS',
    title: value.title ?? '3 blocs pour apprendre à piloter une structure.',
    description:
      value.description ?? 'Compétences, durée et évaluation : les repères utiles sont ici.',
    note: value.note ?? '300 h de formation. Évaluation finale en fin de parcours.'
  }
})

const competencySection = computed(() => pageCopy.value.competencySection ?? {})
const evaluationSection = computed(() => pageCopy.value.evaluationSection ?? {})
const blocksSection = computed(() => pageCopy.value.blocksSection ?? {})
const ctaBand = computed(() => pageCopy.value.ctaBand ?? {})
const roleSummary = computed(
  () =>
    competencySection.value.title ??
    'Le programme reste relié à un rôle de pilotage, d’organisation et de suivi.'
)

const blocks = computed(() =>
  (program.value?.blocks ?? []).map((block) => ({
    ...block,
    summary: firstLine(block.details),
    skills: splitLines(block.details)
  }))
)

const infoChips = computed(() => [
  {
    label: 'Niveau',
    value: program.value?.levelLabel ?? 'Niveau 5 / Bac+2'
  },
  {
    label: 'Format',
    value: program.value?.formatLabel ?? '100 % distanciel'
  },
  {
    label: 'Volume',
    value: '300 h'
  },
  {
    label: 'Évaluation',
    value: '1 h 35'
  }
])

const objectivePoints = computed(() => program.value?.objectiveSummary ?? [])
const scopePoints = computed(() => program.value?.professionalScope ?? [])
const evaluationCards = computed(() => evaluationSection.value.summaryCards ?? [])
const evaluationSteps = computed(() => evaluationSection.value.steps ?? [])
</script>

<template>
  <div class="program-reference -mx-4 grid gap-0 sm:-mx-6 lg:-mx-8">
    <p v-if="loading" class="px-4 py-6 text-sm text-muted-foreground sm:px-6 lg:px-8">
      Chargement du programme…
    </p>
    <p
      v-else-if="errorMessage"
      class="mx-4 rounded-[1rem] border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive sm:mx-6 lg:mx-8"
    >
      {{ errorMessage }}
    </p>

    <template v-else-if="program">
      <section
        class="program-section program-section--hero px-4 py-6 sm:px-6 lg:px-8 lg:py-8"
        v-motion
        :initial="motionVariants.block.initial"
        :enter="motionVariants.block.enter"
      >
        <div class="page-shell">
          <div class="program-hero-shell grid gap-5 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
            <article class="program-hero-card page-hero p-5 sm:p-6 lg:p-7">
              <div class="space-y-4">
                <h1 class="editorial-title max-w-4xl text-[clamp(1.95rem,3.5vw,3.2rem)] text-foreground">
                  {{ hero.title }}
                </h1>
                <p class="hero-lead max-w-3xl text-base leading-7 text-muted-foreground sm:text-[1rem]">
                  {{ hero.description }}
                </p>
                <p class="hero-support-line max-w-2xl text-sm leading-6 text-foreground sm:text-[0.95rem]">
                  {{ hero.note }}
                </p>
              </div>

              <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <article
                  v-for="item in infoChips"
                  :key="item.label"
                  class="info-chip rounded-[1rem] border border-border/80 bg-[color:var(--paper-soft)] px-4 py-3 shadow-sm"
                >
                  <p class="detail-key">{{ item.label }}</p>
                  <p class="mt-2 text-sm font-semibold leading-6 text-foreground">
                    {{ item.value }}
                  </p>
                </article>
              </div>

              <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button :as="RouterLink" :to="contactLink" size="lg">
                  Être rappelé
                  <ArrowRight class="ml-2 h-4 w-4" />
                </Button>
                <Button :as="RouterLink" :to="financeLink" size="lg" variant="outline">
                  Voir le financement
                </Button>
              </div>
            </article>

            <aside class="program-hero-aside p-5 sm:p-6 lg:p-7">
              <div class="grid gap-3">
                <article
                  v-for="card in evaluationCards"
                  :key="card.label"
                  class="program-note-card p-4"
                >
                  <p class="detail-key">{{ card.label }}</p>
                  <p class="mt-2 text-base font-semibold leading-6 text-foreground">
                    {{ card.value }}
                  </p>
                  <p class="mt-2 text-sm leading-6 text-muted-foreground">
                    {{ card.note }}
                  </p>
                </article>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section class="program-section px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div class="page-shell">
          <div class="grid gap-6 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]">
            <article class="program-eval-card p-5 sm:p-6">
              <p class="kicker">{{ evaluationSection.eyebrow ?? 'Durée et évaluation' }}</p>
              <h2 class="mt-4 text-[clamp(1.4rem,2.2vw,1.9rem)] font-semibold tracking-[-0.04em] text-foreground">
                {{ evaluationSection.title ?? '300 h de formation, puis une évaluation finale.' }}
              </h2>
              <p class="mt-4 text-sm leading-7 text-muted-foreground">
                {{ evaluationSection.description ?? "La fiche RNCP38575 précise le déroulé de l'épreuve finale." }}
              </p>
            </article>

            <article class="program-eval-card p-5 sm:p-6">
              <p class="kicker">Modalités d’évaluation</p>
              <div class="mt-4 grid gap-3">
                <article
                  v-for="(step, index) in evaluationSteps"
                  :key="step"
                  class="program-note-card p-4"
                  v-motion
                  :initial="motionVariants.pop.initial"
                  :enter="staggerEnter(index, 40, 18)"
                >
                  <div class="flex items-start gap-3">
                    <span class="finance-badge">{{ index + 1 }}</span>
                    <p class="text-sm leading-6 text-foreground">
                      {{ step }}
                    </p>
                  </div>
                </article>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section class="program-section px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div class="page-shell">
          <div class="mx-auto mb-10 max-w-3xl text-center">
            <p class="kicker">{{ competencySection.eyebrow ?? 'Ce que le titre prépare' }}</p>
            <h2 class="editorial-title mt-4 text-[clamp(1.7rem,3vw,2.35rem)] text-primary">
              {{ competencySection.title ?? "Le RPMS prépare à piloter, mettre en oeuvre et suivre l'activité." }}
            </h2>
            <p class="mt-4 text-base leading-8 text-muted-foreground sm:text-[1.02rem]">
              {{ competencySection.description ?? 'Voici les repères utiles avant le détail des compétences.' }}
            </p>
          </div>

          <div class="grid gap-6 lg:grid-cols-2">
            <article class="page-cut paper-card p-5 sm:p-6">
              <p class="detail-key">Pourquoi ce programme</p>
              <h3 class="mt-4 text-[clamp(1.2rem,2vw,1.6rem)] font-semibold tracking-[-0.04em] text-foreground">
                Trois bénéfices concrets du RPMS.
              </h3>

              <div class="mt-6 grid gap-3">
                <article
                  v-for="(item, index) in objectivePoints"
                  :key="item"
                  class="decision-card"
                  v-motion
                  :initial="motionVariants.block.initial"
                  :enter="staggerEnter(index, 48, 24)"
                >
                  <p class="detail-key">Bénéfice {{ index + 1 }}</p>
                  <p class="mt-3 text-sm leading-7 text-muted-foreground">
                    {{ item }}
                  </p>
                </article>
              </div>
            </article>

            <article class="page-cut paper-card p-5 sm:p-6">
              <p class="detail-key">Ce que vous saurez faire</p>
              <h3 class="mt-4 text-[clamp(1.2rem,2vw,1.6rem)] font-semibold tracking-[-0.04em] text-foreground">
                {{ roleSummary }}
              </h3>

              <div class="mt-6 grid gap-3">
                <article
                  v-for="(scope, index) in scopePoints"
                  :key="scope"
                  class="elevated-item rounded-[1rem] p-4"
                  v-motion
                  :initial="motionVariants.pop.initial"
                  :enter="staggerEnter(index, 48, 24)"
                >
                  <div class="flex items-start gap-3">
                    <span class="finance-badge">{{ index + 1 }}</span>
                    <p class="text-sm leading-6 text-foreground">
                      {{ scope }}
                    </p>
                  </div>
                </article>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section class="program-section px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div class="page-shell">
          <div class="mb-10 text-center">
            <p class="kicker">{{ blocksSection.eyebrow ?? 'Compétences détaillées' }}</p>
            <h2 class="editorial-title mt-4 text-[clamp(1.7rem,3vw,2.35rem)] text-primary">
              {{ blocksSection.title ?? 'Le détail des compétences, bloc par bloc.' }}
            </h2>
            <p class="mt-4 text-base leading-8 text-muted-foreground sm:text-[1.02rem]">
              {{ blocksSection.description ?? 'Chaque compétence est reprise selon la fiche RNCP38575.' }}
            </p>
          </div>

          <div class="block-ladder programme-ladder">
            <article
              v-for="(block, index) in blocks"
              :key="block.code"
              class="block-row programme-block"
              v-motion
              :initial="motionVariants.block.initial"
              :enter="staggerEnter(index, 56, 28)"
            >
              <span class="programme-block__badge">{{ index + 1 }}</span>
              <p class="programme-block__code">{{ block.code }}</p>
              <h3 class="mt-2 text-[1.08rem] font-semibold leading-tight tracking-[-0.03em] text-foreground">
                {{ block.title }}
              </h3>
              <ul class="programme-skills mt-4">
                <li v-for="skill in block.skills" :key="skill">
                  {{ skill }}
                </li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section class="program-section px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div class="program-cta-shell page-shell p-5 sm:p-6 lg:p-8">
          <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div class="space-y-3">
              <p class="kicker">{{ ctaBand.eyebrow ?? 'Une question sur le programme ?' }}</p>
              <h2 class="editorial-title max-w-3xl text-[clamp(1.6rem,2.4vw,2.2rem)] text-foreground">
                {{ ctaBand.title ?? 'Contactez-nous.' }}
              </h2>
              <p class="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-[1rem]">
                {{ ctaBand.description ?? 'Un échange rapide permet de vérifier si le RPMS correspond à votre projet.' }}
              </p>
            </div>

            <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button :as="RouterLink" :to="contactLink" size="lg">
                Être rappelé
                <ArrowRight class="ml-2 h-4 w-4" />
              </Button>
              <Button :as="RouterLink" :to="financeLink" size="lg" variant="outline">
                Voir le financement
              </Button>
            </div>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>
