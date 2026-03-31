<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowRight } from 'lucide-vue-next'

import PrefooterCtaPanel from '@/components/shared/prefooter-cta-panel.vue'
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
const signupLink = computed(() => toWithExperience('/inscription'))
const financeLink = computed(() => toWithExperience('/financement'))
const programDownloadHref = '/plaquette-titre-pro-rpms.pdf'

const hero = computed(() => {
  const value = pageCopy.value.hero ?? {}
  return {
    eyebrow:
      value.eyebrow ??
      'Programme du titre professionnel Responsable de petite et moyenne structure',
    title: value.title ?? 'Préparez un Bac+2 certifié pour piloter une structure.',
    description:
      value.description ?? 'Titre professionnel RPMS, RNCP38575, niveau 5 / Bac+2.',
    note:
      value.note ?? 'Formation 100 % distanciel, en e-learning, avec accompagnement pédagogique.'
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

const overviewCards = computed(() => [
  {
    label: "Diplôme certifié par l'État",
    value: `RPMS · ${program.value?.rncpCode ?? 'RNCP38575'} · ${program.value?.levelLabel ?? 'Niveau 5 / Bac+2'}`,
    note:
      "Diplôme certifié par l'État français pour valoriser vos compétences et renforcer votre crédibilité professionnelle."
  },
  {
    label: 'Format distanciel',
    value: program.value?.formatLabel ?? '100 % distanciel',
    note:
      'E-learning souple pour apprendre où vous voulez, à votre rythme, sans interrompre votre activité.'
  },
  {
    label: 'Accompagnement',
    value: 'Avec un formateur',
    note:
      "Rendez-vous individuel, accompagnement pédagogique d'experts et suivi régulier pour augmenter vos chances de réussite."
  },
  {
    label: 'Paiement',
    value: '3 fois sans frais possible',
    note: 'Une solution de règlement plus souple pour engager votre projet sereinement.'
  }
])
const evaluationSteps = computed(() => evaluationSection.value.steps ?? [])
const mainEvaluationSteps = computed(() => evaluationSteps.value.slice(0, 3))
const evaluationFootnote = computed(() => evaluationSteps.value[3] ?? '')
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
        <div class="shell-track space-y-6">
          <article class="program-hero-card page-hero p-5 sm:p-6 lg:p-7">
            <div class="grid gap-6 lg:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)] lg:items-start">
              <div class="space-y-5">
                <div class="space-y-4">
                  <p class="kicker">{{ hero.eyebrow }}</p>
                  <h1 class="editorial-title max-w-4xl text-[clamp(2rem,3.35vw,3.1rem)] text-foreground">
                    {{ hero.title }}
                  </h1>
                  <p class="hero-lead max-w-3xl text-base leading-7 text-muted-foreground sm:text-[1rem]">
                    {{ hero.description }}
                  </p>
                  <p class="hero-support-line max-w-3xl text-sm leading-6 text-foreground sm:text-[0.96rem]">
                    <strong>{{ hero.note }}</strong>
                  </p>
                </div>

                <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-start">
                  <Button :as="RouterLink" :to="signupLink" size="lg" class="w-full justify-center sm:w-auto">
                    S'inscrire
                    <ArrowRight class="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    :as="RouterLink"
                    :to="financeLink"
                    size="lg"
                    variant="outline"
                    class="w-full justify-center sm:w-auto"
                  >
                    Voir le financement
                  </Button>
                  <Button
                    as="a"
                    :href="programDownloadHref"
                    download
                    size="lg"
                    variant="outline"
                    class="w-full justify-center sm:w-auto"
                  >
                    Télécharger le programme
                  </Button>
                </div>
              </div>

              <aside class="space-y-4">
                <div class="grid gap-3 sm:grid-cols-2">
                  <article
                    v-for="(card, index) in overviewCards"
                    :key="card.label"
                    class="program-note-card program-overview-card p-4"
                    v-motion
                    :initial="motionVariants.pop.initial"
                    :enter="staggerEnter(index, 40, 18)"
                  >
                    <p class="detail-key">{{ card.label }}</p>
                    <p class="mt-2 text-base font-semibold leading-6 text-foreground">
                      {{ card.value }}
                    </p>
                    <p v-if="card.note" class="mt-2 text-sm leading-6 text-muted-foreground">
                      {{ card.note }}
                    </p>
                  </article>
                </div>
              </aside>
            </div>
          </article>

          <article class="page-cut paper-card space-y-6 p-5 sm:p-6 lg:p-7">
            <div>
              <p class="kicker text-center">{{ objectivesPanel.eyebrow ?? 'Objectifs pédagogiques' }}</p>
              <h2 class="mt-4 text-center text-[clamp(1.45rem,2.3vw,1.95rem)] font-semibold tracking-[-0.04em] text-foreground">
                {{
                  objectivesPanel.title ??
                  'À l’issue de la formation, les apprenants seront capables de :'
                }}
              </h2>
              <p class="mx-auto mt-4 max-w-4xl text-center text-sm leading-7 text-muted-foreground sm:text-[0.98rem]">
                {{
                  objectivesPanel.description ??
                  "Le parcours se suit entièrement à distance, en e-learning, avec une organisation souple pensée pour progresser sans interrompre votre activité professionnelle."
                }}
              </p>

              <div class="mt-6 grid gap-3 sm:grid-cols-2">
                <article
                  v-for="(item, index) in objectivesPanel.items ?? []"
                  :key="item"
                  class="paper-card paper-card--soft objective-mini-card"
                  v-motion
                  :initial="motionVariants.pop.initial"
                  :enter="staggerEnter(index, 42, 20)"
                >
                  <div class="flex items-start gap-3">
                    <span class="finance-badge">{{ index + 1 }}</span>
                    <p class="text-sm leading-6 text-foreground">
                      {{ item }}
                    </p>
                  </div>
                </article>
              </div>
            </div>

            <article class="program-eval-card p-5 sm:p-6">
              <p class="kicker text-center">{{ evaluationSection.eyebrow ?? 'Durée et évaluation' }}</p>
              <h2 class="mt-4 whitespace-pre-line text-center text-[clamp(1.4rem,2.2vw,1.9rem)] font-semibold tracking-[-0.04em] text-foreground">
                {{ evaluationSection.title ?? '300h de formation,\nExamen de 1h35.' }}
              </h2>
              <p class="mx-auto mt-4 max-w-4xl text-center text-sm leading-7 text-muted-foreground">
                {{ evaluationSection.description ?? "La fiche RNCP38575 précise le déroulé de l'épreuve finale." }}
              </p>

              <div class="mt-5 grid gap-3">
                <article
                  v-for="(step, index) in mainEvaluationSteps"
                  :key="step"
                  class="program-note-card p-4"
                  v-motion
                  :initial="motionVariants.pop.initial"
                  :enter="staggerEnter(index, 40, 18)"
                >
                  <div class="flex flex-col items-center gap-3 text-center">
                    <span class="finance-badge">{{ index + 1 }}</span>
                    <p class="text-sm leading-6 text-foreground">
                      {{ step }}
                    </p>
                  </div>
                </article>
              </div>

              <p
                v-if="evaluationFootnote"
                class="program-eval-footnote mt-4 text-center text-sm leading-6 text-muted-foreground"
              >
                {{ evaluationFootnote }}
              </p>
            </article>
          </article>
        </div>
      </section>

      <section class="program-section px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div class="shell-track">
          <div class="mx-auto mb-6 max-w-3xl py-1 text-center lg:mb-8">
            <p v-if="blocksSection.eyebrow" class="kicker">{{ blocksSection.eyebrow }}</p>
            <h2
              class="editorial-title text-[clamp(1.7rem,3vw,2.35rem)] text-primary"
              :class="blocksSection.eyebrow ? 'mt-4' : ''"
            >
              {{
                blocksSection.title ??
                'Trois blocs de compétences essentielles pour piloter une structure avec méthode.'
              }}
            </h2>
            <p
              v-if="blocksSection.description"
              class="mt-4 text-base leading-8 text-muted-foreground sm:text-[1.02rem]"
            >
              {{ blocksSection.description }}
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
              <h3 class="text-[1.08rem] font-semibold leading-tight tracking-[-0.03em] text-foreground">
                {{ block.title }}
              </h3>
              <ul class="programme-skills">
                <li v-for="skill in block.skills" :key="skill">
                  {{ skill }}
                </li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section class="program-section px-4 pb-0 pt-6 sm:px-6 lg:px-8 lg:pb-0 lg:pt-8">
        <div class="shell-track">
          <PrefooterCtaPanel />
        </div>
      </section>
    </template>
  </div>
</template>
