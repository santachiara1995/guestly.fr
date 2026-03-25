<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

import LeadForm from '@/components/lead-form.vue'
import TrustStrip from '@/components/visual/trust-strip.vue'
import { Button } from '@/components/ui/button'
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
  levelLabel: 'Niveau 5 / Bac+2',
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
    contactCopy.value.heroTitle ?? 'Vous voulez vérifier l’adéquation du RPMS à votre projet ?'
)
const heroSupport = computed(
  () =>
    contactCopy.value.heroSupport ??
    "Expliquez en quelques lignes où vous en êtes et ce que vous cherchez à clarifier. Le rappel sert à vérifier l'adéquation du parcours avant toute décision."
)
const formTitle = computed(
  () => contactCopy.value.formTitle ?? 'Décrivez en quelques lignes où vous en êtes'
)
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
    "Les compétences que vous voulez renforcer: activité, équipe, organisation, offre, territoire, production et reporting."
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
const footerBand = computed(() => {
  const band = contactCopy.value.footerBand
  if (band && typeof band === 'object') {
    return {
      eyebrow: band.eyebrow ?? 'Avant de laisser vos coordonnées',
      title: band.title ?? 'Vous pouvez encore relire le programme avant de revenir au formulaire',
      description:
        band.description ??
        "Si vous préférez prendre un peu de recul, le programme reste accessible avant de revenir vers le formulaire."
    }
  }

  return {
    eyebrow: 'Avant de laisser vos coordonnées',
    title: 'Vous pouvez encore relire le programme avant de revenir au formulaire',
    description:
      "Si vous préférez prendre un peu de recul, le programme reste accessible avant de revenir vers le formulaire."
  }
})
const trustStripItems = computed(() => [
  program.value?.rncpCode ?? 'RNCP38575',
  program.value?.levelLabel ?? 'Niveau 5 / Bac+2',
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
  <div class="space-y-12 sm:space-y-14 lg:space-y-16">
    <section class="page-hero grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.02fr,0.98fr] lg:p-10">
      <div class="space-y-6">
        <div class="space-y-4">
          <p class="kicker">{{ heroEyebrow }}</p>
          <h1 class="editorial-title max-w-4xl text-[clamp(2.3rem,4.8vw,4rem)] text-foreground">
            {{ heroTitle }}
          </h1>
          <p class="max-w-3xl text-base leading-8 text-muted-foreground sm:text-[1.05rem]">
            {{ heroSupport }}
          </p>
        </div>

        <p class="max-w-2xl text-base font-medium leading-7 text-foreground sm:text-[1.02rem]">
          {{ formIntro }}
        </p>

        <TrustStrip :items="trustStripItems" />
      </div>

      <aside class="page-cut p-6 sm:p-7">
        <p class="kicker">Repères utiles</p>
        <div class="mt-5 grid gap-3 sm:grid-cols-2">
          <div
            v-for="item in supportFacts.slice(0, 4)"
            :key="item.label"
            class="elevated-item rounded-[1rem] p-4"
          >
            <p class="detail-key">{{ item.label }}</p>
            <p class="mt-2 text-sm font-semibold leading-6 text-foreground">
              {{ item.value }}
            </p>
          </div>
        </div>

        <div class="mt-6 border-t border-border/80 pt-5 text-sm leading-7 text-muted-foreground">
          <p v-if="displayPhone"><strong class="text-foreground">Téléphone :</strong> {{ displayPhone }}</p>
          <p v-if="displayAddress" class="mt-2">
            <strong class="text-foreground">Adresse :</strong> {{ displayAddress }}
          </p>
          <p v-if="site.organizationProfile?.certification" class="mt-2">
            <strong class="text-foreground">Certification :</strong>
            {{ site.organizationProfile.certification }}
          </p>
          <p v-if="loading" class="mt-2">Chargement des coordonnées...</p>
        </div>
      </aside>
    </section>

    <div class="grid gap-6 lg:grid-cols-[1.04fr,0.96fr] lg:items-start">
      <section id="formulaire-rappel" class="page-cut p-6 sm:p-8">
        <div class="space-y-3">
          <p class="kicker">Formulaire</p>
          <h2 class="text-[clamp(1.7rem,3vw,2.35rem)] font-semibold leading-tight tracking-[-0.04em] text-foreground">
            {{ formTitle }}
          </h2>
          <p class="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-[1rem]">
            {{ formSupport }}
          </p>
        </div>

        <div class="mt-6">
          <LeadForm source-page="/contact" />
        </div>
      </section>

      <div class="space-y-4">
        <article class="page-cut p-6 sm:p-7">
          <p class="kicker">{{ guidanceTitle }}</p>
          <div class="mt-5 space-y-3">
            <div
              v-for="point in guidancePoints"
              :key="point"
              class="elevated-item rounded-[1rem] px-4 py-4 text-sm leading-6 text-foreground"
            >
              {{ point }}
            </div>
          </div>
        </article>

        <article class="page-cut p-6 sm:p-7">
          <p class="kicker">{{ nextStepNote.title }}</p>
          <div class="mt-5 space-y-3 text-sm leading-7 text-muted-foreground">
            <p v-for="point in nextStepNote.points" :key="point">{{ point }}</p>
          </div>
        </article>
      </div>
    </div>

    <section class="arch-cta p-6 sm:p-8 lg:p-10">
      <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div class="space-y-3">
          <p class="kicker">{{ footerBand.eyebrow }}</p>
          <h2 class="editorial-title max-w-3xl text-[clamp(1.95rem,3vw,2.8rem)] text-foreground">
            {{ footerBand.title }}
          </h2>
          <p class="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-[1rem]">
            {{ footerBand.description }}
          </p>
        </div>

        <div class="flex flex-col gap-3 sm:flex-row">
          <a href="#formulaire-rappel">
            <Button size="lg">Être rappelé</Button>
          </a>
          <RouterLink to="/programme">
            <Button size="lg" variant="outline">Voir le programme</Button>
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>
