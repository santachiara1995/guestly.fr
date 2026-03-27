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

const homeCopy = computed(() => site.value.home ?? {})
const programLink = computed(() => toWithExperience('/programme'))
const financeLink = computed(() => toWithExperience('/financement'))
const contactLink = computed(() => toWithExperience('/contact'))

const hero = computed(() => {
  const value = homeCopy.value.hero ?? {}
  return {
    eyebrow: value.eyebrow ?? 'Titre professionnel RPMS - RNCP38575',
    title: value.title ?? "Le RPMS s'articule autour de trois grands blocs de compétences.",
    lead:
      value.lead ??
      'Titre professionnel Responsable petite et moyenne structure (RPMS), niveau 5 / Bac+2, en 100 % distanciel, en e-learning, avec accompagnement pédagogique.',
    fitLine:
      value.fitLine ??
      "Commencez par lire le titre, son rôle et sa structure avant d'entrer dans le détail du programme.",
    decisionTitle: value.decisionTitle ?? 'Pourquoi commencer ici',
    decisionText:
      value.decisionText ??
      "En quelques minutes, vous visualisez l'architecture du titre et vous savez vers quelle étape poursuivre.",
    decisionPoints: Array.isArray(value.decisionPoints)
      ? value.decisionPoints
      : [
          'Repérez immédiatement le titre, le code RNCP38575, le niveau 5 / Bac+2 et le format à distance.',
          "Découvrez les trois grands blocs qui structurent le référentiel avant d'entrer dans le détail.",
          'Choisissez ensuite entre le programme détaillé, le financement ou une demande de rappel.'
        ]
  }
})

const programPreview = computed(() => {
  const blocks = program.value?.blocks ?? []
  return blocks.map((block) => ({
    code: block.code,
    title: block.title,
    text: firstLine(block.details)
  }))
})

const journeySection = computed(() => {
  const section = homeCopy.value.journeySection ?? {}
  return {
    eyebrow: section.eyebrow ?? 'La suite, en toute clarté',
    title: section.title ?? 'Trois étapes pour avancer sereinement.',
    description:
      section.description ??
      "Vous pouvez approfondir le contenu, consulter le financement ou demander un échange selon votre besoin du moment.",
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
    title:
      band.title ?? 'Vous avez maintenant les repères essentiels pour décider de la suite.',
    description:
      band.description ??
      'Programme, financement et rappel suivent une même logique : vous donner une information claire pour avancer avec confiance.',
    supportLine:
      band.supportLine ??
      'RNCP38575, niveau 5 / Bac+2, 100 % distanciel, e-learning et accompagnement pédagogique.'
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
        class="home-section home-section--hero px-4 py-8 sm:px-6 lg:px-8 lg:py-10"
        v-motion
        :initial="motionVariants.block.initial"
        :enter="motionVariants.block.enter"
      >
        <div class="home-shell page-shell">
          <div class="home-hero grid gap-10 lg:grid-cols-[minmax(0,1.04fr)_minmax(24rem,0.82fr)] lg:items-start lg:gap-14">
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
                v-for="(point, index) in hero.decisionPoints"
                :key="point"
                class="home-hero__point"
                v-motion
                :initial="motionVariants.pop.initial"
                :enter="staggerEnter(index, 42, 20)"
              >
                <p class="detail-key">Étape {{ index + 1 }}</p>
                <p class="mt-2 text-sm leading-7 text-muted-foreground">
                  {{ point }}
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section class="home-section home-section--program px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div class="page-shell">
          <div class="mb-8 text-center">
            <p class="kicker">Les trois blocs du référentiel</p>
            <h2 class="mt-4 text-[clamp(1.7rem,3vw,2.35rem)] font-extrabold tracking-[-0.05em] text-primary">
              Une structure lisible avant d’entrer dans le détail du programme.
            </h2>
            <div class="mt-6 inline-flex rounded-full border border-primary/10 bg-[color:var(--paper-tint)] px-5 py-2 text-sm font-bold tracking-[0.03em] text-primary">
              RNCP38575 · 3 grands blocs de compétences
            </div>
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

      <section class="home-section px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
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
                  <h3 class="text-sm font-semibold text-white">{{ step.title }}</h3>
                  <p class="mt-1 text-sm leading-6 text-white/72">{{ step.text }}</p>
                </div>
              </article>
            </div>
          </div>

          <aside class="home-final-band__card">
            <p class="detail-key">Choisir la suite</p>
            <h3 class="mt-3 text-[clamp(1.15rem,1.7vw,1.45rem)] font-semibold tracking-[-0.04em] text-foreground">
              Continuez avec l’étape qui répond à votre question du moment.
            </h3>
            <p class="mt-3 text-sm leading-7 text-muted-foreground">
              Le programme détaille les compétences, le financement clarifie les conditions, et le rappel permet de faire le point avec un conseiller.
            </p>

            <div class="mt-6 flex flex-col gap-3">
              <Button :as="RouterLink" :to="programLink" size="lg">
                Voir le programme
                <ArrowRight class="ml-2 h-4 w-4" />
              </Button>
              <Button :as="RouterLink" :to="contactLink" size="lg" variant="outline">
                Être rappelé
              </Button>
            </div>

            <RouterLink :to="financeLink" class="home-inline-link mt-4">
              Consulter le financement
            </RouterLink>

            <p class="mt-4 text-sm leading-7 text-muted-foreground">
              {{ contactBand.supportLine }}
            </p>
          </aside>
        </div>
      </section>
    </template>
  </div>
</template>
