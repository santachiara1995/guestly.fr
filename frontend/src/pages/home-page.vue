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

const homeHeroImage = '/hero-office-gemini.jpg'

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

const homeCopy = computed(() => site.value.home ?? {})
const programLink = computed(() => toWithExperience('/programme'))
const financeLink = computed(() => toWithExperience('/financement'))
const contactLink = computed(() => toWithExperience('/contact'))

const hero = computed(() => {
  const value = homeCopy.value.hero ?? {}
  return {
    eyebrow: value.eyebrow ?? "Bac+2 certifié par l'État · 100 % à distance · 300 h",
    title: value.title ?? "Un Bac+2 certifié par l'État,",
    subtitleLines: Array.isArray(value.subtitleLines)
      ? value.subtitleLines
      : ['100 % à distance,', 'En 300 heures.'],
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
  const pillars = homeCopy.value.orientationSection?.pillars

  if (Array.isArray(pillars) && pillars.length) {
    return pillars.map((pillar, index) => ({
      code: pillar.code ?? `Bloc ${index + 1}`,
      title: pillar.title ?? '',
      text: pillar.text ?? ''
    }))
  }

  const blocks = program.value?.blocks ?? []
  return blocks.map((block, index) => ({
    code: block.code,
    title: block.title,
    text: firstLine(block.details)
  }))
})

const orientationSection = computed(() => {
  const section = homeCopy.value.orientationSection ?? {}
  return {
    eyebrow: section.eyebrow ?? 'Programme de formation',
    title:
      section.title ??
      'Trois blocs de compétences essentielles pour piloter une structure avec méthode.',
    description: section.description ?? ''
  }
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
            text: 'Accédez au détail de chaque bloc et de chaque compétence pour découvrir ce que couvre le titre professionnel RPMS.'
          },
          {
            title: 'Consulter le financement',
            text: "Retrouvez le prix, les modalités de paiement et les principales conditions de l'offre."
          },
          {
            title: "S'inscrire",
            text: 'Passez directement à l’inscription.'
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
        <div class="home-shell shell-track">
          <div class="home-hero grid gap-6 lg:grid-cols-[minmax(0,1.04fr)_minmax(24rem,0.82fr)] lg:items-stretch lg:gap-6">
            <div class="home-hero__content">
              <div class="home-hero__title-stack">
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
                <p
                  v-for="line in hero.subtitleLines"
                  :key="line"
                  class="home-hero__subtitle"
                >
                  {{ line }}
                </p>
              </div>
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

      <section class="home-section home-section--program px-4 pb-6 sm:px-6 lg:px-8 lg:pb-8">
        <div class="shell-track">
          <div class="mx-auto mb-6 max-w-3xl py-1 text-center lg:mb-8">
            <p class="kicker">{{ orientationSection.eyebrow }}</p>
            <h2 class="text-[clamp(1.7rem,3vw,2.35rem)] font-extrabold tracking-[-0.05em] text-primary">
              {{ orientationSection.title }}
            </h2>
            <p v-if="orientationSection.description" class="mt-4 text-base leading-8 text-muted-foreground sm:text-[1.02rem]">
              {{ orientationSection.description }}
            </p>
          </div>

          <div class="home-program-ladder">
            <article
              v-for="(block, index) in programPreview"
              :key="block.code"
              class="home-program-block"
              v-motion
              :initial="motionVariants.block.initial"
              :enter="staggerEnter(index, 56, 28)"
            >
              <span class="home-program-block__number">{{ index + 1 }}</span>
              <div class="home-program-block__body">
                <p class="home-program-block__code">{{ block.code }}</p>
                <h3 class="home-program-block__title">{{ block.title }}</h3>
                <p v-if="block.text" class="home-program-block__text">
                  <strong>Thématiques abordées :</strong> {{ block.text }}
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section class="home-section px-4 pb-6 pt-0 sm:px-6 lg:px-8 lg:pb-8 lg:pt-0">
        <div
          class="home-final-band shell-track"
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
