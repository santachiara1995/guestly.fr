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
  brand: {},
  home: {}
})
const loading = ref(true)
const errorMessage = ref('')

const { toWithExperience } = useExperienceVariant()

const homeHeroImage =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAxek11yBm6DhC2ca_TKbFajPNC53QzMylReij6MYOswA4bcLzRdZAiFRLO6FBggrkw1bJ4nWTf6ZhXWmjuOY7gQqQrgOBIUw8ZW9e2_Ea2QR-9jH8sf6FkxdakH56425QdIo6kPwv9Lg9ImbEi8i8PDuX1_OAAZg6Va8o-ZDnEgeID23iRuklhF7JYCUGzDqcIJaBPeee_PRWbYXWSFP4GH1V9lAeAYeaHJ1hutHAs9nNC5z7dDYon9zhBiB3IhKmCSxEJIlpMX6o'

onMounted(async () => {
  try {
    const [programPayload, sitePayload] = await Promise.all([api.getProgram('rpms'), api.getSite()])
    program.value = programPayload
    site.value = sitePayload
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Contenu indisponible.'
  } finally {
    loading.value = false
  }
})

function firstLine(value) {
  return String(value ?? '')
    .split('\n')
    .map((item) => item.trim())
    .find(Boolean)
}

const homeBlockSummaries = [
  {
    title: 'Diriger la structure et l’équipe',
    text: 'Prenez de la hauteur sur la structure, son territoire et votre management.'
  },
  {
    title: "Déployer l'activité et l'offre",
    text: "Adaptez l'offre, organisez la diffusion et structurez la production."
  },
  {
    title: 'Piloter les résultats',
    text: "Analysez le bilan, le résultat et présentez l'activité avec clarté."
  }
]

const homeCopy = computed(() => site.value.home ?? {})
const programLink = computed(() => toWithExperience('/programme'))
const financeLink = computed(() => toWithExperience('/financement'))
const contactLink = computed(() => toWithExperience('/contact'))

const hero = computed(() => {
  const value = homeCopy.value.hero ?? {}
  return {
    eyebrow: value.eyebrow ?? "Bac+2 certifié par l'État · 100 % à distance · 300 h",
    title: value.title ?? "Préparez un Bac+2 certifié par l'État, 100 % à distance en 300 h.",
    lead:
      value.lead ??
      "Le RPMS vous aide à gagner en crédibilité pour piloter une structure, encadrer une équipe et suivre l'activité.",
    fitLine:
      value.fitLine ??
      "Bac+2, diplôme certifié par l'État, 300 h à distance : un cadre clair pour accélérer votre progression.",
    decisionText:
      value.decisionText ??
      "Vérifiez ce que vous allez maîtriser, puis demandez un rappel si le titre correspond à votre objectif.",
    proofs: Array.isArray(homeCopy.value.proofItems)
      ? homeCopy.value.proofItems
      : [
          {
            label: 'Diplôme reconnu',
            value: 'Bac+2 / niveau 5',
            note: "Titre professionnel certifié par l'État"
          },
          {
            label: 'Format souple',
            value: '100 % à distance',
            note: 'E-learning avec accompagnement pédagogique'
          },
          {
            label: 'Durée du parcours',
            value: '300 h',
            note: 'Un format structuré pour avancer avec méthode'
          }
        ]
  }
})

const programPreview = computed(() => {
  const blocks = program.value?.blocks ?? []
  return blocks.map((block, index) => ({
    code: block.code,
    title: homeBlockSummaries[index]?.title ?? block.title,
    text: homeBlockSummaries[index]?.text ?? firstLine(block.details)
  }))
})

const journeySection = computed(() => {
  const section = homeCopy.value.journeySection ?? {}
  return {
    eyebrow: section.eyebrow ?? 'La suite, en toute clarté',
    title: section.title ?? "Trois leviers pour passer à l'action.",
    description:
      section.description ??
      'Programme, financement, contact : allez droit à ce qui vous décide.',
    steps: Array.isArray(section.steps)
      ? section.steps
      : [
          {
            title: 'Approfondir le programme',
            text: 'Accédez au détail de chaque bloc et de chaque compétence pour mesurer précisément ce que couvre le RPMS.'
          },
          {
            title: 'Consulter le financement',
            text: "Retrouvez le prix, les modalités de paiement et les principales conditions de l'offre."
          },
          {
            title: 'Demander un rappel',
            text: 'Faites le point sur votre situation et obtenez une réponse claire à vos questions.'
          }
        ]
  }
})

const contactBand = computed(() => {
  const band = homeCopy.value.contactBand ?? {}
  return {
    eyebrow: band.eyebrow ?? 'Prêt à aller plus loin ?',
    title: band.title ?? "Passez à l'étape suivante.",
    description:
      band.description ??
      'Regardez le programme, vérifiez le financement, puis contactez-nous pour valider votre projet.'
  }
})
</script>

<template>
  <div class="home-reference -mx-4 sm:-mx-6 lg:-mx-8">
    <p v-if="loading" class="px-4 py-6 text-sm text-muted-foreground sm:px-6 lg:px-8">
      Actualisation du contenu…
    </p>
    <p
      v-else-if="errorMessage"
      class="mx-4 rounded-[1rem] border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive sm:mx-6 lg:mx-8"
    >
      {{ errorMessage }}
    </p>

    <template v-else-if="program">
      <section
        class="home-section home-section--hero px-4 py-6 sm:px-6 lg:px-8 lg:py-8"
        v-motion
        :initial="motionVariants.block.initial"
        :enter="motionVariants.block.enter"
      >
        <div class="home-shell page-shell">
          <div class="home-hero grid gap-6 lg:grid-cols-[minmax(0,1.04fr)_minmax(24rem,0.82fr)] lg:items-start lg:gap-6">
            <div class="home-hero__content">
              <h1 class="home-hero__title">
                {{ hero.title }}
              </h1>
              <p class="home-hero__lead">
                {{ hero.lead }}
              </p>
              <p class="home-hero__fit">
                {{ hero.fitLine }}
              </p>

              <p class="home-hero__decision">
                {{ hero.decisionText }}
              </p>

              <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button :as="RouterLink" :to="contactLink" size="lg" class="home-hero__cta">
                  Être rappelé
                  <ArrowRight class="ml-2 h-4 w-4" />
                </Button>
                <Button :as="RouterLink" :to="programLink" size="lg" variant="outline">
                  Voir le programme
                </Button>
              </div>

              <RouterLink :to="financeLink" class="home-inline-link">
                Consulter le financement
              </RouterLink>
            </div>

            <div class="home-hero__panel lg:justify-self-end lg:w-full lg:max-w-[33rem]">
              <div class="home-hero__visual">
                <div class="home-hero__visual-backdrop"></div>
                <img
                  :src="homeHeroImage"
                  alt="Professionnelle dans un environnement de travail lumineux"
                  class="home-hero__image"
                />
              </div>
            </div>

            <div class="home-hero__points lg:col-span-2 lg:grid lg:grid-cols-3">
              <article
                v-for="(point, index) in hero.proofs"
                :key="point.label"
                class="home-hero__point"
                v-motion
                :initial="motionVariants.pop.initial"
                :enter="staggerEnter(index, 42, 20)"
              >
                <p class="detail-key">{{ point.label }}</p>
                <p class="mt-2 text-base font-semibold leading-6 text-foreground">
                  {{ point.value }}
                </p>
                <p class="mt-2 text-sm leading-7 text-muted-foreground">
                  {{ point.note }}
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section class="home-section home-section--program px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div class="page-shell">
          <div class="mb-8 text-center">
            <p class="kicker">Ce que vous allez maîtriser</p>
            <h2 class="mt-4 text-[clamp(1.7rem,3vw,2.35rem)] font-extrabold tracking-[-0.05em] text-primary">
              Trois blocs pour piloter une structure avec méthode.
            </h2>
          </div>

          <div class="home-program-ladder">
            <article
              v-for="(block, index) in programPreview"
              :key="block.code"
              class="home-program-block"
              :class="{ 'home-program-block--accent': index === 1 }"
              v-motion
              :initial="motionVariants.block.initial"
              :enter="staggerEnter(index, 56, 28)"
            >
              <span class="home-program-block__number">{{ index + 1 }}</span>
              <div>
                <p class="home-program-block__code">{{ block.code }}</p>
                <h3 class="home-program-block__title">{{ block.title }}</h3>
                <p class="home-program-block__text">{{ block.text }}</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section class="home-section px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div
          class="home-final-band page-shell"
          v-motion
          :initial="motionVariants.block.initial"
          :enter="motionVariants.block.enter"
        >
          <div class="home-final-band__content">
            <p class="kicker text-white/78">{{ contactBand.eyebrow }}</p>
            <h2 class="home-final-band__title">{{ contactBand.title }}</h2>
            <p class="home-final-band__description">{{ contactBand.description }}</p>

            <div class="home-final-band__steps">
              <article
                v-for="(step, index) in journeySection.steps"
                :key="step.title"
                class="home-final-band__step"
                v-motion
                :initial="motionVariants.pop.initial"
                :enter="staggerEnter(index, 44, 22)"
              >
                <span class="home-final-band__step-index">{{ index + 1 }}</span>
                <div>
                  <p class="detail-key">Étape {{ index + 1 }}</p>
                  <h3 class="mt-2 text-sm font-semibold text-foreground">{{ step.title }}</h3>
                  <p class="mt-2 text-sm leading-6 text-muted-foreground">{{ step.text }}</p>
                </div>
              </article>
            </div>

            <div class="mt-2 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button :as="RouterLink" :to="programLink" size="lg" variant="secondary">
                Voir le programme
                <ArrowRight class="ml-2 h-4 w-4" />
              </Button>
              <Button :as="RouterLink" :to="financeLink" size="lg" variant="outline">
                Voir le financement
              </Button>
              <Button :as="RouterLink" :to="contactLink" size="lg">
                Être rappelé
              </Button>
            </div>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>
