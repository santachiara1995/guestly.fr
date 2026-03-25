<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { PhoneCall, ShieldCheck } from 'lucide-vue-next'

import SectionTitle from '@/components/section-title.vue'
import TrustStrip from '@/components/visual/trust-strip.vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
const expectations = computed(() => accessCopy.value.expectations ?? [])
const supportPoints = computed(() => accessCopy.value.supportPoints ?? [])
const processSteps = computed(() => accessCopy.value.processSteps ?? [])
const trustStripItems = computed(() => [
  program.value?.rncpCode ?? 'RNCP38575',
  program.value?.levelLabel ?? 'Niveau 5 (Bac+2)',
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
  <div class="space-y-10 sm:space-y-12">
    <section class="page-hero grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.05fr,0.95fr] lg:items-start lg:p-10">
      <div class="space-y-5">
        <SectionTitle
          eyebrow="Accès et accompagnement"
          title="Vérifier le cadre du RPMS avant d'aller plus loin"
          description="Cette page sert à vérifier le titre, la modalité à distance et l'accompagnement pédagogique avant de poursuivre."
        />
        <p class="max-w-3xl text-base font-semibold leading-relaxed text-foreground sm:text-lg">
          {{ accessIntro }}
        </p>
        <p class="max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {{ reassuranceLine }}
        </p>
        <trust-strip :items="trustStripItems" />
      </div>

      <div class="space-y-4">
        <div class="page-cut rounded-[1.45rem] p-5 sm:p-6">
          <CardHeader class="p-0">
            <CardTitle>Repères du parcours</CardTitle>
          </CardHeader>
          <CardContent class="p-0 pt-4">
            <div class="grid gap-3 sm:grid-cols-2">
              <div
                v-for="(item, index) in quickFacts"
                :key="item.label"
                class="elevated-item rounded-xl px-4 py-4"
                v-motion
                :initial="motionVariants.pop.initial"
                :enter="staggerEnter(index, 60, 70)"
              >
                <p class="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {{ item.label }}
                </p>
                <p class="mt-2 text-lg font-semibold text-foreground">{{ item.value }}</p>
              </div>
            </div>
          </CardContent>
        </div>

        <Card class="page-cut">
          <CardHeader>
            <div class="flex items-center gap-2">
              <ShieldCheck class="h-5 w-5 text-primary" />
              <CardTitle>Appui pédagogique</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul class="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <li v-for="item in supportPoints" :key="item" class="flex gap-3">
                <span class="mt-1 h-2.5 w-2.5 rounded-full bg-secondary"></span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>

    <section class="space-y-8">
      <SectionTitle
        eyebrow="Avant de demander un rappel"
        title="Les points à vérifier avant de vous engager"
        description="L'objectif est de vérifier l'adéquation du cadre avec votre situation, sans détour inutile."
      />

      <div class="grid gap-4 md:grid-cols-3">
        <Card
          v-for="(item, index) in expectations"
          :key="item"
          class="page-cut"
          v-motion
          :initial="motionVariants.block.initial"
          :enter="staggerEnter(index, 80, 70)"
        >
          <CardContent class="pt-1 text-sm leading-relaxed text-muted-foreground">
            {{ item }}
          </CardContent>
        </Card>
      </div>
    </section>

    <section class="space-y-8">
      <SectionTitle
        eyebrow="Prise de contact"
        title="Des repères utiles avant le premier échange"
        description="Le rappel sert à clarifier le cadre du titre sans transformer votre décision en étape supplémentaire."
      />

      <div class="grid gap-4 md:grid-cols-3">
        <Card
          v-for="(step, index) in processSteps"
          :key="step"
          class="page-cut"
          v-motion
          :initial="motionVariants.block.initial"
          :enter="staggerEnter(index, 80, 80)"
        >
          <CardHeader>
            <div class="flex items-center gap-2">
              <span
                class="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground"
              >
                {{ index + 1 }}
              </span>
              <CardTitle class="text-lg">Étape {{ index + 1 }}</CardTitle>
            </div>
          </CardHeader>
          <CardContent class="text-sm leading-relaxed text-muted-foreground">
            {{ step }}
          </CardContent>
        </Card>
      </div>
    </section>

    <section class="arch-cta rounded-[1.5rem] p-6 sm:p-8 lg:p-10">
      <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div class="space-y-3">
          <p class="kicker">Contact</p>
          <h2 class="editorial-title text-[clamp(1.8rem,3vw,2.65rem)] text-foreground">
            Demander un rappel pour vérifier si le RPMS vous convient
          </h2>
          <p class="max-w-2xl text-base leading-relaxed text-muted-foreground">
            {{ accessContactBand }}
          </p>
        </div>

        <div class="flex flex-wrap gap-3">
          <RouterLink to="/contact">
            <Button size="lg">
              <PhoneCall class="mr-2 h-4 w-4" />
              Être rappelé
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
