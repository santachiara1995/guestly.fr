<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

import LeadForm from '@/components/lead-form.vue'
import SectionTitle from '@/components/section-title.vue'
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
const heroEyebrow = computed(() => 'Titre professionnel RPMS')
const heroTitle = computed(() => "Faire le point sur le titre professionnel RPMS et votre projet")
const heroSupport = computed(
  () =>
    "Le rappel sert à relier votre situation, le niveau Bac+2 et le format 100 % distanciel."
)
const formTitle = computed(() => contactCopy.value.formTitle ?? 'Présentez votre situation')
const formIntro = computed(
  () =>
    contactCopy.value.formIntro ??
    'Décrivez brièvement votre situation, les points utiles pour l’échange et ce que vous souhaitez vérifier à propos du titre professionnel RPMS.'
)
const formSupport = computed(
  () =>
    contactCopy.value.formSupport ??
    "Quelques informations suffisent pour permettre à CITYZ'France de revenir vers vous dans de bonnes conditions."
)
const guidanceTitle = computed(
  () => contactCopy.value.guidanceTitle ?? "Points que vous pouvez aborder pendant l'échange"
)
const guidancePoints = computed(() => {
  const points = contactCopy.value.guidancePoints
  if (Array.isArray(points) && points.length > 0) {
    return points
  }

  return [
    'La place du titre professionnel RPMS dans votre projet et le niveau visé.',
    "Le cadre 100 % distanciel, l'e-learning et l'accompagnement pédagogique.",
    'Les compétences travaillées en pilotage, management, organisation, territoire et reporting.'
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
const factsTitle = computed(() => contactCopy.value.factsTitle ?? 'Repères du titre')
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
    { label: 'Titre', value: program.value?.title },
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
    <section class="grid gap-8 lg:grid-cols-[1.08fr,0.92fr] lg:items-start">
      <div class="space-y-5">
        <SectionTitle
          :eyebrow="heroEyebrow"
          :title="heroTitle"
          :description="formIntro"
        />
        <p class="max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {{ heroSupport }}
        </p>
      </div>

      <div class="space-y-4">
        <div class="flex flex-wrap gap-2">
          <span class="trust-chip">{{ program.title }}</span>
          <span class="trust-chip">{{ program.rncpCode }}</span>
          <span class="trust-chip">{{ program.levelLabel }}</span>
          <span class="trust-chip">{{ program.formatLabel }}</span>
        </div>

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
