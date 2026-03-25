<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

import LeadForm from '@/components/lead-form.vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { api } from '@/lib/api'

const site = ref({
  brand: {
    descriptor: 'Organisme de formation certifié Qualiopi'
  },
  positioning: {},
  contact: {
    phone: '09 77 21 51 61',
    address: '110 Esplanade du General de Gaulle, 92400 Courbevoie'
  },
  organizationProfile: {
    headquartersAddress: '110 Esplanade du General de Gaulle, 92400 Courbevoie',
    certification: 'Organisme de formation certifié Qualiopi'
  }
})
const program = ref({
  title: 'Titre professionnel Responsable petite et moyenne structure (RPMS)',
  rncpCode: 'RNCP38575',
  levelLabel: 'Niveau 5 (Bac+2)',
  formatLabel: '100 % distanciel',
  rhythmLabel: 'E-learning',
  supportLabel: 'Accompagnement pédagogique'
})
const loading = ref(true)

onMounted(async () => {
  try {
    const [sitePayload, programPayload] = await Promise.all([api.getSite(), api.getProgram('rpms')])
    site.value = sitePayload
    program.value = programPayload
  } finally {
    loading.value = false
  }
})

const contactCopy = computed(() => site.value.contact ?? {})
const brandDescriptor = computed(
  () => site.value.brand?.descriptor ?? 'Organisme de formation certifié Qualiopi'
)
const heroEyebrow = computed(() => contactCopy.value.heroEyebrow ?? 'Être rappelé')
const heroTitle = computed(
  () => contactCopy.value.heroTitle ?? "Parlons de votre projet de formation avec CITYZ'France"
)
const heroSupport = computed(
  () =>
    contactCopy.value.heroSupport ??
    "Le rappel sert à faire le lien entre votre projet, le cadre du RPMS et le niveau 5 (Bac+2) visé."
)
const formTitle = computed(() => contactCopy.value.formTitle ?? 'Présentez votre situation')
const formIntro = computed(
  () =>
    contactCopy.value.formIntro ??
    'Décrivez brièvement votre situation, ce que vous cherchez à clarifier et les questions que vous souhaitez aborder pendant l’échange.'
)
const formSupport = computed(
  () =>
    contactCopy.value.formSupport ??
    "Quelques informations suffisent pour permettre à CITYZ'France de revenir vers vous dans de bonnes conditions."
)
const guidanceTitle = computed(
  () => contactCopy.value.guidanceTitle ?? "Ce que vous pouvez clarifier pendant l'échange"
)
const guidancePoints = computed(() => {
  const points = contactCopy.value.guidancePoints
  if (Array.isArray(points) && points.length > 0) {
    return points
  }

  return [
    "La place du RPMS dans votre projet d'évolution ou de reconversion.",
    "Le cadre 100 % distanciel, l'e-learning et l'accompagnement pédagogique.",
    'Les compétences travaillées en pilotage, management, organisation et reporting.'
  ]
})
const nextStepNote = computed(() => {
  const note = contactCopy.value.nextStepNote
  if (note && typeof note === 'object') {
    return {
      title: note.title ?? 'Ce qui se passe après votre demande',
      points: Array.isArray(note.points)
        ? note.points
        : ['Nous revenons vers vous pour préciser votre projet et répondre à vos questions.']
    }
  }

  return {
    title: 'Ce qui se passe après votre demande',
    points: [
      typeof note === 'string' && note
        ? note
        : 'Nous revenons vers vous pour préciser votre projet et répondre à vos questions.'
    ]
  }
})
const factsTitle = computed(() => contactCopy.value.factsTitle ?? 'Points utiles')
const footerBand = computed(() => {
  const band = contactCopy.value.footerBand
  if (band && typeof band === 'object') {
    return {
      eyebrow: band.eyebrow ?? 'Avant de valider',
      title: band.title ?? 'Vous pouvez relire le programme ou la FAQ avant de demander un rappel',
      description:
        band.description ??
        'Si vous préférez prendre un peu de recul, ces pages restent accessibles avant de revenir vers le formulaire.'
    }
  }

  return {
    eyebrow: 'Avant de valider',
    title: 'Vous pouvez relire le programme ou la FAQ avant de demander un rappel',
    description:
      'Si vous préférez prendre un peu de recul, ces pages restent accessibles avant de revenir vers le formulaire.'
  }
})

const displayPhone = computed(() => site.value.contact?.phone?.trim() ?? null)
const displayAddress = computed(
  () =>
    site.value.contact?.address?.trim() ??
    site.value.organizationProfile?.headquartersAddress?.trim() ??
    null
)

const supportFacts = computed(() =>
  [
    { label: 'Niveau visé', value: program.value?.levelLabel },
    { label: 'Code RNCP', value: program.value?.rncpCode },
    { label: 'Modalité', value: program.value?.formatLabel },
    { label: 'Format', value: program.value?.rhythmLabel },
    { label: 'Accompagnement', value: program.value?.supportLabel }
  ].filter((item) => item.value)
)
</script>

<template>
  <div class="space-y-12 sm:space-y-14">
    <section class="page-cut rounded-[1.6rem] p-6 sm:p-8 lg:p-10">
      <div class="space-y-5">
        <div class="flex flex-wrap items-center gap-3">
          <p class="kicker">{{ heroEyebrow }}</p>
          <span class="trust-chip">{{ brandDescriptor }}</span>
        </div>

        <div class="grid gap-5 lg:grid-cols-[1.08fr,0.92fr] lg:items-end">
          <div class="space-y-4">
            <h1 class="editorial-title max-w-3xl text-[clamp(2.45rem,5vw,4.6rem)] text-foreground">
              {{ heroTitle }}
            </h1>
            <p class="max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {{ formIntro }}
            </p>
            <p class="max-w-3xl text-sm leading-relaxed text-foreground/80 sm:text-base">
              {{ heroSupport }}
            </p>
          </div>

          <div class="flex flex-wrap gap-2 lg:justify-end">
            <span class="trust-chip">{{ program.levelLabel }}</span>
            <span class="trust-chip">{{ program.formatLabel }}</span>
            <span class="trust-chip">{{ program.supportLabel }}</span>
          </div>
        </div>
      </div>
    </section>

    <div class="grid gap-5 lg:grid-cols-[1.08fr,0.92fr] lg:items-start">
      <Card class="page-cut">
        <CardHeader class="space-y-3">
          <CardTitle class="text-2xl sm:text-[1.45rem]">{{ formTitle }}</CardTitle>
          <p class="text-sm leading-relaxed text-muted-foreground">
            {{ formSupport }}
          </p>
        </CardHeader>
        <CardContent class="space-y-5">
          <LeadForm source-page="/contact" />
        </CardContent>
      </Card>

      <div class="space-y-4 lg:pt-1">
        <Card class="page-cut">
          <CardHeader>
            <CardTitle>{{ guidanceTitle }}</CardTitle>
          </CardHeader>
          <CardContent class="space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p v-for="point in guidancePoints" :key="point">{{ point }}</p>
          </CardContent>
        </Card>

        <Card class="page-cut">
          <CardHeader>
            <CardTitle>{{ nextStepNote.title }}</CardTitle>
          </CardHeader>
          <CardContent class="space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p v-for="point in nextStepNote.points" :key="point">{{ point }}</p>
          </CardContent>
        </Card>

        <Card class="page-cut">
          <CardHeader>
            <CardTitle>{{ factsTitle }}</CardTitle>
          </CardHeader>
          <CardContent class="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <div class="space-y-3">
              <p v-for="item in supportFacts" :key="item.label">
                <strong class="text-foreground">{{ item.label }} :</strong> {{ item.value }}
              </p>
            </div>

            <div class="space-y-3 border-t border-border/70 pt-4">
              <p v-if="displayPhone">
                <strong class="text-foreground">Téléphone :</strong> {{ displayPhone }}
              </p>
              <p v-if="displayAddress">
                <strong class="text-foreground">Adresse :</strong> {{ displayAddress }}
              </p>
              <p v-if="site.organizationProfile?.certification">
                <strong class="text-foreground">Certification :</strong>
                {{ site.organizationProfile.certification }}
              </p>
              <p v-if="loading">Chargement des coordonnées...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

    <section class="page-cut rounded-[1.5rem] p-6 sm:p-8 lg:p-10">
      <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div class="space-y-3">
          <p class="kicker">{{ footerBand.eyebrow }}</p>
          <h2 class="editorial-title max-w-3xl text-[clamp(2rem,3.3vw,3.2rem)] text-foreground">
            {{ footerBand.title }}
          </h2>
          <p class="max-w-2xl text-base leading-relaxed text-muted-foreground">
            {{ footerBand.description }}
          </p>
        </div>

        <div class="flex flex-wrap gap-3">
          <RouterLink to="/programme">
            <Button size="lg" variant="outline">Voir le programme</Button>
          </RouterLink>
          <RouterLink to="/faq">
            <Button size="lg" variant="outline">Voir la FAQ</Button>
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>
