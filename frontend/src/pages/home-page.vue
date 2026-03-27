<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowRight, BadgeCheck } from 'lucide-vue-next'

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
      "Commencez par lire le cadre du titre, sa structure et les données publiées avant d'entrer dans le détail du programme.",
    decisionTitle: value.decisionTitle ?? 'Pourquoi commencer ici',
    decisionText:
      value.decisionText ??
      'Vous disposez ici des repères utiles pour lire le titre avant de poursuivre.',
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

  return blocks.map((block, index) => ({
    code: block.code,
    title: block.title,
    text:
      sourcePillars[index]?.text ??
      firstLine(block.details) ??
      'Lecture du référentiel et du rôle préparé.'
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
    title: section.title ?? 'Trois repères pour décider de la suite.',
    description:
      section.description ??
      "Vous pouvez approfondir le contenu, consulter le financement ou situer votre demande selon votre besoin du moment.",
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
      band.title ?? 'Vous avez maintenant les repères essentiels pour situer la suite.',
    description:
      band.description ??
      "Programme, financement et rappel prolongent ici une même lecture: cadre du titre, structure du référentiel et données publiées de l'offre.",
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
        class="home-section home-section--hero px-4 py-6 sm:px-6 lg:px-8 lg:py-10"
        v-motion
        :initial="motionVariants.block.initial"
        :enter="motionVariants.block.enter"
      >
        <div class="home-shell mx-auto max-w-[1120px]">
          <div class="home-hero grid gap-8 lg:grid-cols-[minmax(0,1.08fr),minmax(21rem,0.78fr)] lg:items-center lg:gap-11">
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

            <div class="home-hero__panel lg:justify-self-end lg:w-full lg:max-w-[29rem]">
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
                    v-for="item in proofItems.slice(1, 3)"
                    :key="item.label"
                    class="home-hero__metric"
                  >
                    <span class="home-hero__metric-label">{{ item.label }}</span>
                    <span class="home-hero__metric-value">{{ item.value }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="lg:col-span-2 grid gap-3 lg:grid-cols-[1.08fr,0.92fr]">
              <article class="rounded-[0.96rem] border border-border/80 bg-white/84 p-4 shadow-sm sm:p-5">
                <p class="detail-key">Cadre du titre</p>
                <div class="mt-4 grid gap-3 sm:grid-cols-2">
                  <article
                    v-for="(item, index) in proofItems"
                    :key="item.label"
                    class="rounded-[0.9rem] border border-border/70 bg-[color:var(--paper-soft)] px-3.5 py-3"
                    v-motion
                    :initial="motionVariants.pop.initial"
                    :enter="staggerEnter(index, 40, 18)"
                  >
                    <p class="detail-key">{{ item.label }}</p>
                    <p class="mt-2 text-sm font-semibold leading-6 text-foreground">{{ item.value }}</p>
                    <p v-if="item.note" class="mt-1 text-sm leading-6 text-muted-foreground">
                      {{ item.note }}
                    </p>
                  </article>
                </div>
              </article>

              <article class="rounded-[0.96rem] border border-border/80 bg-white/84 p-4 shadow-sm sm:p-5">
                <p class="detail-key">Avant de poursuivre</p>
                <p class="mt-3 text-sm leading-7 text-muted-foreground">
                  Lisez d'abord la structure du titre, puis le détail du programme, avant de revenir vers le financement ou le rappel.
                </p>
                <div class="mt-4 grid gap-3">
                  <article
                    v-for="(point, index) in hero.decisionPoints"
                    :key="point"
                    class="rounded-[0.9rem] border border-border/70 bg-[color:var(--paper-soft)] px-3.5 py-3"
                    v-motion
                    :initial="motionVariants.pop.initial"
                    :enter="staggerEnter(index, 40, 18)"
                  >
                    <p class="detail-key">Repère {{ index + 1 }}</p>
                    <p class="mt-2 text-sm leading-7 text-muted-foreground">
                      {{ point }}
                    </p>
                  </article>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section class="home-section home-section--trust border-y border-border/60 bg-white/70 px-4 py-6 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-[1120px]">
          <p class="home-trust-strip__eyebrow">Cadre et repères publics</p>
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

      <section class="home-section px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <div class="mx-auto max-w-[1120px]">
          <div class="mx-auto mb-10 max-w-3xl text-center">
            <p class="kicker">{{ homeCopy.orientationSection?.eyebrow ?? 'Trois grands blocs' }}</p>
            <h2 class="mt-4 text-[clamp(1.7rem,3vw,2.35rem)] font-extrabold tracking-[-0.05em] text-primary">
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
              v-motion
              :initial="motionVariants.block.initial"
              :enter="staggerEnter(index, 54, 28)"
            >
              <p class="detail-key">Structure du titre</p>
              <p class="home-feature-card__code">{{ item.code }}</p>
              <h3 class="home-feature-card__title">{{ item.title }}</h3>
              <p class="home-feature-card__text">{{ item.text }}</p>
            </article>
          </div>
        </div>
      </section>

      <section class="home-section home-section--program px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <div class="mx-auto max-w-5xl">
          <div class="mb-12 text-center">
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
              class="home-program-block home-program-block--flat"
              v-motion
              :initial="motionVariants.block.initial"
              :enter="staggerEnter(index, 56, 28)"
            >
              <div>
                <p class="home-program-block__code">{{ block.code }}</p>
                <h3 class="home-program-block__title">{{ block.title }}</h3>
                <p class="home-program-block__text">{{ block.text }}</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section class="home-section px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <div
          class="cta-band arch-cta mx-auto max-w-[1120px] p-5 sm:p-6 lg:p-7"
          v-motion
          :initial="motionVariants.block.initial"
          :enter="motionVariants.block.enter"
        >
          <div class="grid gap-6 lg:grid-cols-[1.05fr,0.95fr] lg:items-start">
            <div class="space-y-4">
              <p class="kicker">{{ contactBand.eyebrow }}</p>
              <h2 class="editorial-title max-w-3xl text-[clamp(1.45rem,2.15vw,1.92rem)] text-foreground">
                {{ journeySection.title }}
              </h2>
              <p class="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-[1rem]">
                {{ contactBand.description }}
              </p>

              <div class="grid gap-3">
                <article
                  v-for="(step, index) in journeySection.steps"
                  :key="step.title"
                  class="rounded-[0.94rem] border border-border/75 bg-white/78 px-4 py-3"
                  v-motion
                  :initial="motionVariants.pop.initial"
                  :enter="staggerEnter(index, 42, 18)"
                >
                  <p class="detail-key">Repère {{ index + 1 }}</p>
                  <h3 class="mt-2 text-sm font-semibold text-foreground">{{ step.title }}</h3>
                  <p class="mt-1 text-sm leading-6 text-muted-foreground">{{ step.text }}</p>
                </article>
              </div>

              <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button :as="RouterLink" :to="programLink" size="lg">
                  Voir le programme
                  <ArrowRight class="ml-2 h-4 w-4" />
                </Button>
                <Button :as="RouterLink" :to="contactLink" size="lg" variant="outline">
                  Être rappelé
                </Button>
              </div>

              <RouterLink :to="financeLink" class="home-inline-link">
                Consulter le financement
              </RouterLink>
            </div>

            <aside class="paper-card paper-card--soft p-5 sm:p-6">
              <p class="detail-key">Repères publics</p>
              <div class="mt-4 grid gap-3">
                <article
                  v-for="(item, index) in proofItems"
                  :key="item.label"
                  class="rounded-[0.92rem] border border-border/75 bg-white/86 px-4 py-3"
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

              <p class="mt-5 text-sm leading-7 text-muted-foreground">
                {{ contactBand.supportLine }}
              </p>
            </aside>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>
