<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

import LeadForm from '@/components/lead-form.vue'
import TrustStrip from '@/components/visual/trust-strip.vue'
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
const heroEyebrow = computed(() => contactCopy.value.heroEyebrow ?? 'Être rappelé')
const heroTitle = computed(
  () =>
    contactCopy.value.heroTitle ?? 'Vous voulez savoir si ce parcours correspond à votre projet ?'
)
const heroSupport = computed(
  () =>
    contactCopy.value.heroSupport ??
    "Expliquez en quelques lignes où vous en êtes et ce que vous cherchez à clarifier. Le rappel sert à vérifier l'adéquation du parcours avant toute décision."
)
const formTitle = computed(() => contactCopy.value.formTitle ?? 'Décrivez en quelques lignes où vous en êtes')
const formIntro = computed(
  () =>
    contactCopy.value.formIntro ??
    "Vous pouvez simplement préciser votre situation, les responsabilités que vous visez et les points que vous voulez éclaircir."
)
const formSupport = computed(
  () =>
    contactCopy.value.formSupport ??
    "Vous n'avez pas besoin de tout formaliser: quelques informations suffisent pour permettre à CITYZ'France de revenir vers vous dans de bonnes conditions."
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
    'Le rôle ou les responsabilités vers lesquels vous voulez progresser.',
    "L'adéquation du format 100 % distanciel avec votre rythme.",
    "Les compétences que vous voulez renforcer: activité, équipe, organisation, offre, territoire et reporting."
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
const factsTitle = computed(() => contactCopy.value.factsTitle ?? 'Repères utiles')
const footerBand = computed(() => {
  const band = contactCopy.value.footerBand
  if (band && typeof band === 'object') {
    return {
      eyebrow: band.eyebrow ?? 'Avant de laisser vos coordonnées',
      title: band.title ?? 'Vous pouvez encore relire le programme ou la FAQ',
      description:
        band.description ??
        "Si vous préférez prendre un peu de recul, ces pages restent accessibles avant de revenir vers le formulaire."
    }
  }

  return {
    eyebrow: 'Avant de laisser vos coordonnées',
    title: 'Vous pouvez encore relire le programme ou la FAQ',
    description:
      "Si vous préférez prendre un peu de recul, ces pages restent accessibles avant de revenir vers le formulaire."
  }
})
const trustStripItems = computed(() => [
  program.value?.rncpCode ?? 'RNCP38575',
  program.value?.levelLabel ?? 'Niveau 5 (Bac+2)',
  program.value?.formatLabel ?? '100 % distanciel',
  program.value?.supportLabel ?? 'Accompagnement pédagogique'
])

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
    <section class="page-hero space-y-5 p-6 sm:p-8 lg:p-10">
      <div class="space-y-4">
        <p class="kicker">{{ heroEyebrow }}</p>
        <h1 class="editorial-title max-w-4xl text-[clamp(2.05rem,4vw,3.35rem)] text-foreground">
          {{ heroTitle }}
        </h1>
        <p class="max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-[1.05rem]">
          {{ heroSupport }}
        </p>
      </div>

      <p class="max-w-3xl text-base font-semibold leading-relaxed text-foreground sm:text-[1.02rem]">
        {{ formIntro }}
      </p>

      <trust-strip :items="trustStripItems" />
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

            <div class="space-y-3 border-t border-border/70 pt-4">
              <p class="font-semibold text-foreground">{{ factsTitle }}</p>
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

    <section class="arch-cta rounded-[1.5rem] p-6 sm:p-8 lg:p-10">
      <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div class="space-y-3">
          <p class="kicker">{{ footerBand.eyebrow }}</p>
          <h2 class="editorial-title max-w-3xl text-[clamp(1.8rem,3vw,2.65rem)] text-foreground">
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
