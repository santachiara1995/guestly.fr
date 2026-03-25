<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { CheckCircle2, PhoneCall, ShieldCheck } from 'lucide-vue-next'

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
const positioningCopy = computed(() => site.value.positioning ?? {})
const heroFitLine = computed(
  () =>
    positioningCopy.value.fitLine ??
    'Le RPMS peut vous convenir si vous cherchez un cadre à distance pour renforcer vos compétences de pilotage, d’organisation et de management.'
)
const accessIntro = computed(
  () =>
    accessCopy.value.fitLine ??
    accessCopy.value.intro ??
    "Le format à distance, l'accompagnement pédagogique et les compétences visées sont pensés pour vous aider à vérifier si le RPMS correspond à votre projet."
)
const accessReassurance = computed(
  () =>
    accessCopy.value.reassuranceLine ??
    'Le but est de vous aider à décider avec des points concrets, pas de vous noyer dans une liste de champs.'
)
const accessContactBand = computed(
  () => {
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
  }
)
const expectations = computed(() => accessCopy.value.expectations ?? [])
const supportPoints = computed(() => accessCopy.value.supportPoints ?? [])
const processSteps = computed(() => accessCopy.value.processSteps ?? [])
const quickFacts = computed(() =>
  [
    { label: 'Titre', value: program.value?.title },
    { label: 'Niveau', value: program.value?.levelLabel },
    { label: 'Modalité', value: program.value?.formatLabel },
    { label: 'Format', value: program.value?.rhythmLabel },
    { label: 'Accompagnement', value: program.value?.supportLabel }
  ].filter((item) => item.value)
)
</script>

<template>
  <div class="space-y-10 sm:space-y-12">
    <section class="page-cut rounded-[1.6rem] p-6 sm:p-8 lg:p-10">
      <div class="grid gap-6 lg:grid-cols-[1.05fr,0.95fr] lg:items-start">
        <div class="space-y-5">
          <p class="kicker">Accès et accompagnement</p>
          <h1 class="editorial-title max-w-3xl text-[clamp(2.45rem,5vw,4.6rem)] text-foreground">
            Vérifier si le RPMS correspond à votre projet
          </h1>
          <p class="max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {{ heroFitLine }}
          </p>
          <p class="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {{ accessIntro }}
          </p>
          <p class="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {{ accessReassurance }}
          </p>
        </div>

        <div class="grid gap-3">
          <Card class="page-cut">
            <CardHeader>
              <div class="flex items-center gap-2">
                <CheckCircle2 class="h-5 w-5 text-primary" />
                <CardTitle>Points du parcours</CardTitle>
              </div>
            </CardHeader>
            <CardContent class="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p v-for="item in quickFacts" :key="item.label">
                <strong class="text-foreground">{{ item.label }} :</strong> {{ item.value }}
              </p>
            </CardContent>
          </Card>

          <Card class="page-cut">
            <CardHeader>
              <div class="flex items-center gap-2">
                <ShieldCheck class="h-5 w-5 text-primary" />
                <CardTitle>Ce qui rassure</CardTitle>
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
            Demander un rappel pour faire le point
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
