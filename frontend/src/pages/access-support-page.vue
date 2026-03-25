<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { PhoneCall, ShieldCheck } from 'lucide-vue-next'

import SectionTitle from '@/components/section-title.vue'
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
    "Le format à distance, l'accompagnement pédagogique et les compétences visées sont pensés pour vous aider à vérifier si le titre professionnel RPMS correspond à votre projet."
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
const quickFacts = computed(() =>
  [
    { label: 'Titre', value: program.value?.title },
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
    <section class="grid gap-8 lg:grid-cols-[1.05fr,0.95fr] lg:items-start">
      <div class="space-y-5">
        <SectionTitle
          eyebrow="Titre professionnel RPMS"
          title="Accès et accompagnement pédagogique"
          description="Vérifiez le cadre du titre professionnel RPMS: RNCP38575, niveau 5 / Bac+2, 100 % distanciel, e-learning et accompagnement pédagogique."
        />
        <p class="max-w-3xl text-base font-semibold leading-relaxed text-foreground/90 sm:text-lg">
          {{ accessIntro }}
        </p>
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
                class="rounded-xl border border-border bg-white px-4 py-4"
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
        title="Les points qui comptent vraiment"
        description="L'objectif est de vérifier l'adéquation du parcours avec votre situation, sans détour inutile."
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
        title="Du repère utile au premier échange"
        description="Le parcours reste court pour que la demande de rappel ne devienne pas une étape supplémentaire."
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

    <section class="page-cut rounded-[1.5rem] p-6 sm:p-8 lg:p-10">
      <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div class="space-y-3">
          <p class="kicker">Contact</p>
          <h2 class="editorial-title text-[clamp(2rem,3.3vw,3.2rem)] text-foreground">
            Demander un rappel pour situer le titre professionnel RPMS dans votre projet
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
