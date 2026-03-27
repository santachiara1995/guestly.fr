<script setup>
import { computed, markRaw, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  FileText,
  Megaphone
} from 'lucide-vue-next'

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

const proofItems = computed(() => {
  const items = homeCopy.value.proofItems
  if (Array.isArray(items) && items.length > 0) {
    return items
  }

  return [
    { value: program.value?.rncpCode ?? 'RNCP38575', label: 'Référence', note: 'Code RNCP' },
    {
      value: program.value?.levelLabel ?? 'Niveau 5 / Bac+2',
      label: 'Niveau',
      note: "Titre professionnel reconnu par l'État"
    },
    {
      value: program.value?.formatLabel ?? '100 % distanciel',
      label: 'Modalité',
      note: 'Parcours en e-learning'
    },
    {
      value: program.value?.supportLabel ?? 'Accompagnement pédagogique',
      label: 'Appui',
      note: 'Suivi du parcours'
    }
  ]
})

const trustMarks = computed(() => [
  {
    label: 'Qualiopi',
    note: site.value.brand?.descriptor ?? 'Centre de formation certifié'
  },
  {
    label: program.value?.rncpCode ?? 'RNCP38575',
    note: 'Référence du titre'
  },
  {
    label: program.value?.levelLabel ?? 'Niveau 5 / Bac+2',
    note: 'Titre professionnel'
  },
  {
    label: program.value?.formatLabel ?? '100 % distanciel',
    note: program.value?.supportLabel ?? 'Accompagnement pédagogique'
  }
])

const featureCards = computed(() => {
  const blocks = program.value?.blocks ?? []
  const sourcePillars = homeCopy.value.orientationSection?.pillars ?? []
  const icons = [markRaw(Building2), markRaw(Megaphone), markRaw(FileText)]
  const tones = ['default', 'warm', 'default']

  return blocks.map((block, index) => ({
    code: block.code,
    title: block.title,
    text:
      sourcePillars[index]?.text ??
      firstLine(block.details) ??
      'Lecture du référentiel et du rôle préparé.',
    icon: icons[index] ?? markRaw(BadgeCheck),
    tone: tones[index] ?? 'default'
  }))
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
        class="home-section home-section--hero px-4 py-10 sm:px-6 lg:px-8 lg:py-16"
        v-motion
        :initial="motionVariants.block.initial"
        :enter="motionVariants.block.enter"
      >
        <div class="home-shell mx-auto max-w-7xl">
          <div class="home-hero grid gap-10 lg:grid-cols-[minmax(0,1.04fr),minmax(24rem,0.82fr)] lg:items-start lg:gap-14">
            <div class="home-hero__content">
              <span class="home-pill">{{ hero.eyebrow }}</span>
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

                <div class="home-hero__badge home-hero__badge--top">
                  <BadgeCheck class="h-4 w-4" />
                  <span>{{ site.brand?.descriptor ?? 'Centre de formation certifié Qualiopi' }}</span>
                </div>

                <div class="home-hero__badge home-hero__badge--bottom">
                  <div
                    v-for="item in proofItems.slice(1)"
                    :key="item.label"
                    class="home-hero__metric"
                  >
                    <span class="home-hero__metric-label">{{ item.label }}</span>
                    <span class="home-hero__metric-value">{{ item.value }}</span>
                  </div>
                </div>
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

      <section class="home-section home-section--trust border-y border-border/60 bg-white/70 px-4 py-8 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-7xl">
          <p class="home-trust-strip__eyebrow">Repères et certifications</p>
          <div class="home-trust-strip">
            <article
              v-for="(item, index) in trustMarks"
              :key="item.label"
              class="home-trust-strip__item"
              v-motion
              :initial="motionVariants.pop.initial"
              :enter="staggerEnter(index, 34, 18)"
            >
              <span class="home-trust-strip__title">{{ item.label }}</span>
              <span class="home-trust-strip__note">{{ item.note }}</span>
            </article>
          </div>
        </div>
      </section>

      <section class="home-section px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div class="mx-auto max-w-7xl">
          <div class="mx-auto mb-10 max-w-3xl text-center">
            <p class="kicker">{{ homeCopy.orientationSection?.eyebrow ?? 'Trois grands blocs' }}</p>
            <h2 class="mt-4 text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-[-0.05em] text-primary">
              {{ homeCopy.orientationSection?.title ?? 'Une lecture claire du référentiel dès le premier regard.' }}
            </h2>
            <p class="mt-4 text-base leading-8 text-muted-foreground sm:text-[1.02rem]">
              {{ homeCopy.orientationSection?.description ?? "Ces trois blocs donnent la structure complète du titre avant le détail du programme." }}
            </p>
          </div>

          <div class="home-feature-grid">
            <article
              v-for="(item, index) in featureCards"
              :key="item.code"
              class="home-feature-card"
              :class="{ 'home-feature-card--warm': item.tone === 'warm' }"
              v-motion
              :initial="motionVariants.block.initial"
              :enter="staggerEnter(index, 54, 28)"
            >
              <div class="home-feature-card__icon">
                <component :is="item.icon" class="h-7 w-7" />
              </div>
              <p class="home-feature-card__code">{{ item.code }}</p>
              <h3 class="home-feature-card__title">{{ item.title }}</h3>
              <p class="home-feature-card__text">{{ item.text }}</p>
            </article>
          </div>
        </div>
      </section>

      <section class="home-section home-section--program px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div class="mx-auto max-w-5xl">
          <div class="mb-12 text-center">
            <p class="kicker">Les trois blocs du référentiel</p>
            <h2 class="mt-4 text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-[-0.05em] text-primary">
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

      <section class="home-section px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div
          class="home-final-band mx-auto max-w-7xl"
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
            <p class="detail-key">Repères clés</p>
            <div class="mt-5 grid gap-3">
              <article
                v-for="(item, index) in proofItems"
                :key="item.label"
                class="home-final-band__fact"
                v-motion
                :initial="motionVariants.pop.initial"
                :enter="staggerEnter(index, 38, 18)"
              >
                <p class="detail-key">{{ item.label }}</p>
                <p class="mt-2 text-base font-semibold leading-6 text-foreground">{{ item.value }}</p>
                <p v-if="item.note" class="mt-1 text-sm leading-6 text-muted-foreground">
                  {{ item.note }}
                </p>
              </article>
            </div>

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
