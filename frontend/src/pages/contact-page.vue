<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

import LeadForm from '@/components/lead-form.vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { api } from '@/lib/api'

const site = ref({
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

const contactCopy = computed(() => site.value.contact ?? {})
const positioningCopy = computed(() => site.value.positioning ?? {})
const formIntro = computed(
  () =>
    contactCopy.value.formIntro ??
    positioningCopy.value.fitLine ??
    'Dites-nous où vous en êtes, ce que vous voulez vérifier et ce qui compte pour votre projet.'
)
const nextStepNote = computed(
  () => {
    const note = contactCopy.value.nextStepNote
    if (note && typeof note === 'object') {
      return {
        title: note.title ?? "Ce qui se passe après l'envoi",
        points: Array.isArray(note.points)
          ? note.points
          : ['Nous revenons vers vous pour préciser votre projet et répondre à vos questions.']
      }
    }

    return {
      title: "Ce qui se passe après l'envoi",
      points: [
        typeof note === 'string' && note
          ? note
          : 'Nous revenons vers vous pour préciser votre projet et répondre à vos questions.'
      ]
    }
  }
)
const contactBand = computed(
  () => {
    const band = site.value.home?.contactBand
    if (band && typeof band === 'object') {
      return {
        title: band.title ?? "Après l'envoi, la suite reste simple",
        description:
          band.supportLine ??
          band.description ??
          'Pour faire le point sur votre projet, vous pouvez garder le cap sur les points clés du programme si besoin.'
      }
    }

    return {
      title: "Après l'envoi, la suite reste simple",
      description:
        band ??
        'Pour faire le point sur votre projet, vous pouvez garder le cap sur les points clés du programme si besoin.'
    }
  }
)

const displayPhone = computed(() => site.value.contact?.phone?.trim() ?? null)
const displayAddress = computed(
  () =>
    site.value.contact?.address?.trim() ??
    site.value.organizationProfile?.headquartersAddress?.trim() ??
    null
)

const programFacts = computed(() =>
  [
    { label: 'Titre', value: program.value?.title },
    { label: 'RNCP', value: program.value?.rncpCode },
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
      <div class="space-y-5">
        <p class="kicker">Contact</p>
        <div class="grid gap-4 lg:grid-cols-[1.08fr,0.92fr] lg:items-end">
          <div class="space-y-4">
            <h1 class="editorial-title max-w-3xl text-[clamp(2.45rem,5vw,4.6rem)] text-foreground">
              Faire le point avec un rappel
            </h1>
            <p class="max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {{ formIntro }}
            </p>
          </div>

          <div class="flex flex-wrap gap-2 lg:justify-end">
            <Badge variant="outline">RNCP38575</Badge>
            <Badge variant="outline">Niveau 5 / Bac+2</Badge>
            <Badge variant="outline">100 % distanciel</Badge>
            <Badge variant="outline">Accompagnement pédagogique</Badge>
          </div>
        </div>
      </div>
    </section>

    <div class="grid gap-5 lg:grid-cols-[1.08fr,0.92fr] lg:items-start">
      <Card class="page-cut">
        <CardHeader class="space-y-3">
          <CardTitle class="text-2xl sm:text-[1.45rem]">Présentez votre situation</CardTitle>
          <p class="text-sm leading-relaxed text-muted-foreground">
            Indiquez votre contexte, vos questions et ce que vous souhaitez vérifier avant d'aller
            plus loin.
          </p>
        </CardHeader>
        <CardContent class="space-y-5">
          <LeadForm source-page="/contact" />
        </CardContent>
      </Card>

      <div class="space-y-4 lg:pt-1">
        <Card class="page-cut">
          <CardHeader>
            <CardTitle>Programme concerné</CardTitle>
          </CardHeader>
          <CardContent class="space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p v-for="item in programFacts" :key="item.label">
              <strong class="text-foreground">{{ item.label }} :</strong> {{ item.value }}
            </p>
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
            <CardTitle>Coordonnées utiles</CardTitle>
          </CardHeader>
          <CardContent class="space-y-3 text-sm leading-relaxed text-muted-foreground">
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
          </CardContent>
        </Card>
      </div>
    </div>

    <section class="page-cut rounded-[1.5rem] p-6 sm:p-8 lg:p-10">
      <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div class="space-y-3">
          <p class="kicker">Suite</p>
          <h2 class="editorial-title text-[clamp(2rem,3.3vw,3.2rem)] text-foreground">
            {{ contactBand.title }}
          </h2>
          <p class="max-w-2xl text-base leading-relaxed text-muted-foreground">
            {{ contactBand.description }}
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
