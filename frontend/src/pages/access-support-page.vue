<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowRight } from 'lucide-vue-next'

import SectionTitle from '@/components/section-title.vue'
import TrustStrip from '@/components/visual/trust-strip.vue'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'
import { motionVariants, staggerEnter } from '@/lib/motion'

const site = ref({
  access: {
    intro:
      "Consultez le cadre du parcours, le format à distance et les points utiles à vérifier avant votre demande de rappel."
  }
})
const program = ref(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const [sitePayload, programPayload] = await Promise.all([
      api.getSite(),
      api.getProgram('rpms')
    ])
    site.value = sitePayload
    program.value = programPayload
  } finally {
    loading.value = false
  }
})

const accessCopy = computed(() => site.value.access ?? {})
const accessIntro = computed(
  () =>
    accessCopy.value.fitLine ??
    accessCopy.value.intro ??
    "Le format à distance, l'accompagnement pédagogique et les compétences visées sont pensés pour vous aider à vérifier si le parcours correspond à votre projet."
)
const reassuranceLine = computed(
  () =>
    accessCopy.value.reassuranceLine ??
    "L'essentiel est de vérifier l'adéquation du cadre avant de poursuivre."
)
const accessContactBand = computed(() => {
  const band = site.value.home?.contactBand ?? accessCopy.value.contactBand
  if (band && typeof band === 'object') {
    return (
      band.description ??
      "Si vous avez un doute, un rappel permet de vérifier rapidement si le parcours correspond à votre situation."
    )
  }

  return (
    band ??
    "Si vous avez un doute, un rappel permet de vérifier rapidement si le parcours correspond à votre situation."
  )
})
const expectations = computed(() => {
  const items = accessCopy.value.expectations
  if (Array.isArray(items) && items.length > 0) {
    return items
  }

  return [
    'Vouloir évoluer vers plus de pilotage, de coordination ou de management.',
    'Pouvoir avancer régulièrement dans un parcours à distance.',
    "Chercher un cadre clair avant d'aller plus loin."
  ]
})
const supportPoints = computed(() => {
  const items = accessCopy.value.supportPoints
  if (Array.isArray(items) && items.length > 0) {
    return items
  }

  return ['100 % distanciel', 'E-learning', 'Accompagnement pédagogique']
})
const processSteps = computed(() => {
  const items = accessCopy.value.processSteps
  if (Array.isArray(items) && items.length > 0) {
    return items
  }

  return [
    'Lisez les blocs de compétences et les repères officiels.',
    "Vérifiez si le format 100 % distanciel et l'accompagnement pédagogique vous conviennent.",
    "Demandez un rappel si vous voulez faire le point sur votre projet."
  ]
})
const trustStripItems = computed(() => [
  program.value?.rncpCode ?? 'RNCP38575',
  program.value?.levelLabel ?? 'Niveau 5 / Bac+2',
  program.value?.formatLabel ?? '100 % distanciel',
  program.value?.supportLabel ?? 'Accompagnement pédagogique'
])
const quickFacts = computed(() =>
  [
    { label: 'Référence', value: program.value?.rncpCode },
    { label: 'Niveau', value: program.value?.levelLabel },
    { label: 'Modalité', value: program.value?.formatLabel },
    { label: 'Cadre', value: program.value?.rhythmLabel },
    { label: 'Appui', value: program.value?.supportLabel }
  ].filter((item) => item.value)
)
</script>

<template>
  <div class="space-y-12 sm:space-y-14 lg:space-y-16">
    <section
      class="page-hero grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.04fr,0.96fr] lg:p-10"
      v-motion
      :initial="motionVariants.block.initial"
      :enter="motionVariants.block.enter"
    >
      <div class="space-y-6">
        <div class="space-y-4">
          <p class="kicker">Accès et accompagnement</p>
          <h1 class="editorial-title max-w-4xl text-[clamp(2.3rem,4.8vw,4rem)] text-foreground">
            Vérifier le cadre du RPMS avant d'aller plus loin
          </h1>
          <p class="max-w-3xl text-base leading-8 text-muted-foreground sm:text-[1.05rem]">
            Cette page sert à vérifier le titre, la modalité à distance et l'accompagnement
            pédagogique avant de poursuivre.
          </p>
        </div>

        <p class="max-w-2xl text-base font-medium leading-7 text-foreground sm:text-[1.02rem]">
          {{ accessIntro }}
        </p>
        <p class="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-[1rem]">
          {{ reassuranceLine }}
        </p>

        <TrustStrip :items="trustStripItems" />
      </div>

      <aside class="page-cut p-6 sm:p-7">
        <p class="kicker">Repères du parcours</p>
        <div class="mt-5 grid gap-3 sm:grid-cols-2">
          <div
            v-for="(item, index) in quickFacts"
            :key="item.label"
            class="elevated-item rounded-[1rem] p-4"
            v-motion
            :initial="motionVariants.pop.initial"
            :enter="staggerEnter(index, 55, 40)"
          >
            <p class="detail-key">{{ item.label }}</p>
            <p class="mt-2 text-sm font-semibold leading-6 text-foreground">
              {{ item.value }}
            </p>
          </div>
        </div>

        <div class="mt-6 border-t border-border/80 pt-5">
          <p class="kicker">Appui pédagogique</p>
          <ul class="mt-4 space-y-3">
            <li
              v-for="item in supportPoints"
              :key="item"
              class="flex items-start gap-3 text-sm leading-6 text-muted-foreground"
            >
              <span class="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-primary"></span>
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
      </aside>
    </section>

    <section class="grid gap-6 lg:grid-cols-[0.92fr,1.08fr]">
      <div class="space-y-5">
        <SectionTitle
          eyebrow="Avant de demander un rappel"
          title="Les points à vérifier avant de vous engager"
          description="L'objectif est de vérifier l'adéquation du cadre avec votre situation, sans détour inutile."
        />
      </div>

      <div class="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
        <article
          v-for="(item, index) in expectations"
          :key="item"
          class="page-cut p-5"
          v-motion
          :initial="motionVariants.block.initial"
          :enter="staggerEnter(index, 55, 40)"
        >
          <div class="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-semibold text-secondary">
            {{ index + 1 }}
          </div>
          <p class="mt-4 text-sm leading-7 text-foreground">
            {{ item }}
          </p>
        </article>
      </div>
    </section>

    <section class="grid gap-6 lg:grid-cols-[0.92fr,1.08fr]">
      <div class="space-y-5">
        <SectionTitle
          eyebrow="Prise de contact"
          title="Des repères utiles avant le premier échange"
          description="Le rappel sert à clarifier le cadre du titre sans transformer votre décision en étape supplémentaire."
        />
      </div>

      <div class="grid gap-4">
        <article
          v-for="(step, index) in processSteps"
          :key="step"
          class="page-cut p-5 sm:p-6"
          v-motion
          :initial="motionVariants.block.initial"
          :enter="staggerEnter(index, 55, 50)"
        >
          <div class="flex items-center gap-3">
            <span class="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-semibold text-secondary">
              {{ index + 1 }}
            </span>
            <h3 class="text-base font-semibold text-foreground">Étape {{ index + 1 }}</h3>
          </div>
          <p class="mt-4 text-sm leading-7 text-muted-foreground">
            {{ step }}
          </p>
        </article>
      </div>
    </section>

    <section class="arch-cta p-6 sm:p-8 lg:p-10">
      <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div class="space-y-3">
          <p class="kicker">Contact</p>
          <h2 class="editorial-title max-w-3xl text-[clamp(1.95rem,3vw,2.8rem)] text-foreground">
            Demander un rappel pour vérifier si le RPMS vous convient
          </h2>
          <p class="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-[1rem]">
            {{ accessContactBand }}
          </p>
        </div>

        <div class="flex flex-col gap-3 sm:flex-row">
          <RouterLink to="/contact">
            <Button size="lg">
              Être rappelé
              <ArrowRight class="ml-2 h-4 w-4" />
            </Button>
          </RouterLink>
          <RouterLink to="/programme">
            <Button size="lg" variant="outline">Voir le programme</Button>
          </RouterLink>
        </div>
      </div>
    </section>

    <p v-if="loading" class="text-sm text-muted-foreground">Chargement du contenu...</p>
  </div>
</template>
