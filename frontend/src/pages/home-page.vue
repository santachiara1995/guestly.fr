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
    title: value.title ?? "Devenez Manager avec un Bac+2 certifié par l'État.",
    intro:
      value.lead ??
      'Le titre professionnel RPMS (RNCP38575) forme des managers polyvalents capables de :',
    capabilities: Array.isArray(value.capabilities)
      ? value.capabilities
      : [
          'piloter une activité',
          'encadrer une équipe',
          'gérer une structure (entreprise, association, organisation publique)'
        ],
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

const heroTitleParts = computed(() => {
  const title = hero.value.title ?? ''
  const match = title.match(/^(.*?)(par l['’](?:É|E)tat)(.*)$/u)

  if (!match) {
    return {
      before: title,
      accent: '',
      after: ''
    }
  }

  return {
    before: match[1],
    accent: match[2],
    after: match[3]
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
      'Programme, financement, inscription : allez droit à l’essentiel.',
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
            title: "S'inscrire",
            text: 'Passez directement à l’inscription dès que le programme et le financement vous conviennent.'
          }
        ]
  }
})

const contactBand = computed(() => {
  const band = homeCopy.value.contactBand ?? {}
  return {
    eyebrow: band.eyebrow ?? 'Prêt à aller plus loin ?',
    title: band.title ?? 'Développez vos compétences !',
    description: band.description ?? ''
  }
})

const journeyCards = computed(() => {
  const links = [programLink.value, financeLink.value, contactLink.value]
  return journeySection.value.steps.map((step, index) => ({
    ...step,
    to: links[index] ?? contactLink.value
  }))
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
          <div class="home-hero grid gap-6 lg:grid-cols-[minmax(0,1.04fr)_minmax(24rem,0.82fr)] lg:items-stretch lg:gap-6">
            <div class="home-hero__content">
              <h1 class="home-hero__title">
                <template v-if="heroTitleParts.accent">
                  <span>{{ heroTitleParts.before }}</span>
                  <span class="home-hero__title-accent">{{ heroTitleParts.accent }}</span>
                  <span>{{ heroTitleParts.after }}</span>
                </template>
                <template v-else>
                  {{ hero.title }}
                </template>
              </h1>
              <p class="home-hero__lead">
                {{ hero.intro }}
              </p>
              <ul class="home-hero__list" aria-label="Compétences clés du titre professionnel RPMS">
                <li v-for="item in hero.capabilities" :key="item" class="home-hero__list-item">
                  {{ item }}
                </li>
              </ul>

              <div class="home-hero__actions">
                <Button :as="RouterLink" :to="programLink" size="lg" variant="outline" class="w-full justify-center">
                  Voir le programme
                </Button>
                <Button :as="RouterLink" :to="contactLink" size="lg" variant="outline" class="w-full justify-center">
                  Être rappelé
                </Button>
                <Button :as="RouterLink" :to="contactLink" size="lg" class="home-hero__cta w-full justify-center">
                  S'inscrire
                  <ArrowRight class="ml-2 h-4 w-4" />
                </Button>
              </div>
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
          <div class="mx-auto mb-8 max-w-3xl py-1 text-center">
            <h2 class="text-[clamp(1.7rem,3vw,2.35rem)] font-extrabold tracking-[-0.05em] text-primary">
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
            <p class="kicker">{{ contactBand.eyebrow }}</p>
            <h2 class="home-final-band__title">{{ contactBand.title }}</h2>
            <p v-if="contactBand.description" class="home-final-band__description">
              {{ contactBand.description }}
            </p>

            <div class="home-final-band__steps">
              <RouterLink
                v-for="(step, index) in journeyCards"
                :key="step.title"
                :to="step.to"
                class="decision-card home-final-band__step-card"
                v-motion
                :initial="motionVariants.pop.initial"
                :enter="staggerEnter(index, 44, 22)"
              >
                <div>
                  <p class="detail-key">{{ step.title }}</p>
                  <p class="mt-3 text-sm leading-7 text-muted-foreground">
                    {{ step.text }}
                  </p>
                </div>
              </RouterLink>
            </div>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>
