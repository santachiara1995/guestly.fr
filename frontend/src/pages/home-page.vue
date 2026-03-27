<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowRight } from 'lucide-vue-next'

import SectionTitle from '@/components/section-title.vue'
import { Button } from '@/components/ui/button'
import ImpactStat from '@/components/visual/impact-stat.vue'
import TrustStrip from '@/components/visual/trust-strip.vue'
import { useExperienceVariant } from '@/composables/use-experience-variant'
import { api } from '@/lib/api'
import { motionVariants, staggerEnter } from '@/lib/motion'

const program = ref(null)
const site = ref({
  home: {}
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
    title:
      value.title ??
      "Le RPMS s'articule autour de trois grands blocs de compétences.",
    lead:
      value.lead ??
      'Titre professionnel Responsable petite et moyenne structure (RPMS), niveau 5 (Bac+2), en 100 % distanciel avec accompagnement pédagogique.',
    fitLine:
      value.fitLine ??
      "Avant d'aller plus loin, visualisez clairement ce que couvre le titre et la manière dont il peut servir votre projet.",
    decisionTitle: value.decisionTitle ?? 'Pourquoi commencer ici',
    decisionText:
      value.decisionText ??
      "En quelques minutes, vous visualisez l'architecture du titre et vous savez vers quelle étape poursuivre.",
    decisionPoints: Array.isArray(value.decisionPoints)
      ? value.decisionPoints
      : [
          'Identifier le titre, le code RNCP38575, le niveau 5 / Bac+2 et le format à distance.',
          'Découvrir les trois grands blocs avant d’entrer dans le détail des compétences.',
          'Choisir ensuite entre le programme détaillé, le financement ou une demande de rappel.'
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

const homeBlocks = computed(() => {
  const blocks = program.value?.blocks ?? []
  const sourcePillars = homeCopy.value.orientationSection?.pillars ?? []
  return blocks.map((block, index) => ({
    code: block.code,
    title: block.title,
    text: sourcePillars[index]?.text ?? firstLine(block.details)
  }))
})

const orientationSection = computed(() => {
  const section = homeCopy.value.orientationSection ?? {}
  return {
    eyebrow: section.eyebrow ?? 'Trois grands blocs',
    title:
      section.title ??
      'Une lecture claire du référentiel dès le premier regard.',
    description:
      section.description ??
      "Ces trois blocs donnent une vision immédiate du titre avant la lecture détaillée."
  }
})

const journeySection = computed(() => {
  const section = homeCopy.value.journeySection ?? {}
  return {
    eyebrow: section.eyebrow ?? 'La suite, en toute clarté',
    title:
      section.title ??
      'Trois étapes pour avancer sereinement.',
    description:
      section.description ??
      "Approfondissez le contenu, consultez le financement ou demandez un échange selon votre besoin.",
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
      band.title ??
      'Vous avez maintenant les repères essentiels pour décider de la suite.',
    description:
      band.description ??
      "Programme, financement et rappel suivent une même logique : vous donner une information claire pour avancer avec confiance.",
    supportLine:
      band.supportLine ??
      'RNCP38575, niveau 5 / Bac+2, 100 % distanciel, e-learning et accompagnement pédagogique.'
  }
})

const trustStripItems = computed(() => [
  program.value?.rncpCode ?? 'RNCP38575',
  program.value?.levelLabel ?? 'Niveau 5 / Bac+2',
  program.value?.formatLabel ?? '100 % distanciel',
  program.value?.supportLabel ?? 'Accompagnement pédagogique'
])
</script>

<template>
  <div class="space-y-12 sm:space-y-14 lg:space-y-16">
    <p v-if="loading" class="text-sm text-muted-foreground">Actualisation du contenu…</p>
    <p
      v-else-if="errorMessage"
      class="rounded-[1rem] border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive"
    >
      {{ errorMessage }}
    </p>

    <template v-else-if="program">
      <section
        class="page-hero grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.04fr,0.96fr] lg:p-10"
        v-motion
        :initial="motionVariants.block.initial"
        :enter="motionVariants.block.enter"
      >
        <div class="space-y-6">
          <div class="space-y-4">
            <p class="kicker">{{ hero.eyebrow }}</p>
            <h1 class="editorial-title max-w-4xl text-[clamp(2.3rem,4.6vw,4.15rem)] text-foreground">
              {{ hero.title }}
            </h1>
            <p class="max-w-3xl text-base leading-8 text-muted-foreground sm:text-[1.03rem]">
              {{ hero.lead }}
            </p>
          </div>

          <p class="max-w-2xl text-base font-medium leading-7 text-foreground sm:text-[1rem]">
            {{ hero.fitLine }}
          </p>

          <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button :as="RouterLink" :to="programLink" size="lg">
              Voir le programme
              <ArrowRight class="ml-2 h-4 w-4" />
            </Button>
            <Button :as="RouterLink" :to="contactLink" size="lg" variant="outline">
              Être rappelé
            </Button>
          </div>

          <RouterLink
            :to="financeLink"
            class="inline-flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:text-secondary hover:underline"
          >
            Consulter le financement
          </RouterLink>

          <TrustStrip :items="trustStripItems" />
        </div>

        <aside class="trust-panel page-cut p-6 sm:p-7">
          <p class="kicker">{{ hero.decisionTitle }}</p>
          <h2 class="mt-4 text-[clamp(1.55rem,3vw,2.15rem)] font-semibold tracking-[-0.04em] text-foreground">
            {{ hero.decisionText }}
          </h2>

          <div class="mt-6 grid gap-3">
            <article
              v-for="(point, index) in hero.decisionPoints"
              :key="point"
              class="decision-card"
              v-motion
              :initial="motionVariants.pop.initial"
              :enter="staggerEnter(index, 52, 28)"
            >
              <p class="detail-key">Étape {{ index + 1 }}</p>
              <p class="mt-2 text-sm leading-7 text-muted-foreground">
                {{ point }}
              </p>
            </article>
          </div>
        </aside>
      </section>

      <section class="space-y-6">
        <SectionTitle
          :eyebrow="orientationSection.eyebrow"
          :title="orientationSection.title"
          :description="orientationSection.description"
        />

        <div class="grid gap-4 xl:grid-cols-3">
          <article
            v-for="(block, index) in homeBlocks"
            :key="block.code"
            class="feature-tile"
            v-motion
            :initial="motionVariants.block.initial"
            :enter="staggerEnter(index, 54, 30)"
          >
            <p class="programme-block__code">{{ block.code }}</p>
            <h3 class="mt-3 text-[1.08rem] font-semibold leading-tight tracking-[-0.03em] text-foreground">
              {{ block.title }}
            </h3>
            <p class="mt-3 text-sm leading-7 text-muted-foreground">
              {{ block.text }}
            </p>
          </article>
        </div>
      </section>

      <section class="space-y-6">
        <SectionTitle
          eyebrow="Repères du titre"
          title="Les points de référence qui structurent la lecture."
          description="Ces repères permettent de situer le titre avant d’entrer dans le détail de chaque bloc."
        />

        <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div
            v-for="(item, index) in proofItems"
            :key="`${item.label}-${index}`"
            v-motion
            :initial="motionVariants.pop.initial"
            :enter="staggerEnter(index, 48, 24)"
          >
            <ImpactStat :label="item.label" :note="item.note" :value="item.value" />
          </div>
        </div>
      </section>

      <section class="space-y-6">
        <SectionTitle
          :eyebrow="journeySection.eyebrow"
          :title="journeySection.title"
          :description="journeySection.description"
        />

        <div class="grid gap-4 xl:grid-cols-3">
          <article
            v-for="(step, index) in journeySection.steps"
            :key="step.title"
            class="decision-card p-4 sm:p-5"
            v-motion
            :initial="motionVariants.block.initial"
            :enter="staggerEnter(index, 48, 24)"
          >
            <p class="detail-key">Suite {{ index + 1 }}</p>
            <h3 class="mt-3 text-base font-semibold leading-tight text-foreground">
              {{ step.title }}
            </h3>
            <p class="mt-3 text-sm leading-7 text-muted-foreground">
              {{ step.text }}
            </p>
          </article>
        </div>
      </section>

      <section class="arch-cta p-6 sm:p-8 lg:p-10">
        <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div class="space-y-3">
            <p class="kicker">{{ contactBand.eyebrow }}</p>
            <h2 class="editorial-title max-w-3xl text-[clamp(1.95rem,3vw,2.85rem)] text-foreground">
              {{ contactBand.title }}
            </h2>
            <p class="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-[1rem]">
              {{ contactBand.description }}
            </p>
            <p class="max-w-2xl text-sm leading-7 text-muted-foreground">
              {{ contactBand.supportLine }}
            </p>
          </div>

          <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button :as="RouterLink" :to="contactLink" size="lg">
              Être rappelé
              <ArrowRight class="ml-2 h-4 w-4" />
            </Button>
            <Button :as="RouterLink" :to="programLink" size="lg" variant="outline">
              Voir le programme
            </Button>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>
