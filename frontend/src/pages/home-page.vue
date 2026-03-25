<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowRight, BookOpenCheck, ShieldCheck, Waypoints } from 'lucide-vue-next'

import SectionTitle from '@/components/section-title.vue'
import ImpactStat from '@/components/visual/impact-stat.vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { api } from '@/lib/api'
import { motionVariants, staggerEnter } from '@/lib/motion'

const program = ref(null)
const site = ref({
  positioning: {
    eyebrow: 'Titre professionnel RPMS',
    subtitle:
      "Découvrez le titre professionnel Responsable petite et moyenne structure (RPMS), un diplôme de niveau Bac+2 référencé au RNCP, son format à distance et l'accompagnement pédagogique prévu pour avancer avec méthode.",
    fitLine:
      "Vous cherchez une formation à distance pour viser un diplôme de niveau Bac+2 tout en développant des compétences concrètes de pilotage, de management et d'organisation."
  },
  home: {
    proofItems: [],
    highlights: [],
    competencyClusters: [],
    valueSection: {
      eyebrow: 'Avant le contact',
      title: 'Un parcours pour viser un niveau Bac+2 utile à votre projet',
      description:
        "Le RPMS rassemble les repères utiles pour comprendre le niveau Bac+2 visé, le format de travail et les compétences mobilisées avant de demander un rappel.",
      items: []
    },
    contactBand: {
      eyebrow: 'Échange',
      title: 'Faire le point sur votre projet avec CITYZ’France',
      description:
        'Si vous souhaitez vérifier si le RPMS correspond à votre situation, vous pouvez demander un rappel depuis le site.',
      supportLine:
        "Le rappel permet de préciser votre projet et les questions à clarifier avant d'aller plus loin."
    }
  }
})
const loading = ref(true)
const errorMessage = ref('')

const highlightIcons = [ShieldCheck, Waypoints, BookOpenCheck]

onMounted(async () => {
  try {
    const [programPayload, sitePayload] = await Promise.all([
      api.getProgram('rpms'),
      api.getSite()
    ])
    program.value = programPayload
    site.value = sitePayload
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Contenu indisponible.'
  } finally {
    loading.value = false
  }
})

const heroEyebrow = computed(() => site.value.positioning?.eyebrow ?? 'Titre professionnel RPMS')
const heroSubtitle = computed(
  () =>
    site.value.positioning?.subtitle ??
    "Découvrez le titre professionnel Responsable petite et moyenne structure (RPMS), un diplôme de niveau Bac+2 référencé au RNCP, son format à distance et l'accompagnement pédagogique prévu pour avancer avec méthode."
)
const heroFitLine = computed(
  () =>
    site.value.positioning?.fitLine ??
    "Vous cherchez une formation à distance pour viser un diplôme de niveau Bac+2 tout en développant des compétences concrètes de pilotage, de management et d'organisation."
)

const proofItems = computed(() => {
  const items = site.value.home?.proofItems
  if (Array.isArray(items) && items.length > 0) {
    return items
  }

  return [
    {
      value: program.value?.rncpCode ?? 'RNCP38575',
      label: 'Code RNCP',
      note: 'Titre professionnel reconnu'
    },
    {
      value: program.value?.levelLabel ?? 'Niveau 5 (Bac+2)',
      label: 'Niveau',
      note: 'Diplôme Bac+2'
    },
    {
      value: program.value?.formatLabel ?? '100 % distanciel',
      label: 'Modalité',
      note: 'E-learning et accompagnement pédagogique'
    }
  ]
})

const highlights = computed(() => {
  const items = site.value.home?.highlights
  if (Array.isArray(items) && items.length > 0) {
    return items
  }

  return [
    {
      title: 'Un diplôme de niveau Bac+2',
      text: "Le RPMS s'appuie sur le code RNCP38575 et un niveau 5 / Bac+2 reconnu."
    },
    {
      title: 'Un cadre de travail à distance',
      text: 'La formation se déroule en 100 % distanciel, en e-learning, avec accompagnement pédagogique.'
    },
    {
      title: 'Des compétences utiles au quotidien',
      text: 'Pilotage, management, organisation, communication et reporting forment le socle du programme.'
    }
  ]
})

const competencyClusters = computed(() => {
  const items = site.value.home?.competencyClusters
  if (Array.isArray(items) && items.length > 0) {
    return items
  }

  return [
    'Piloter une activité et sa performance',
    'Manager et animer une équipe',
    "Organiser les opérations et la qualité",
    "Développer l'offre, la communication et le reporting"
  ]
})

const valueSection = computed(() => {
  const section = site.value.home?.valueSection
  if (section && typeof section === 'object') {
    return {
      eyebrow: section.eyebrow ?? 'Avant le contact',
      title: section.title ?? 'Un parcours pour viser un niveau Bac+2 utile à votre projet',
      description:
        section.description ??
        "Le RPMS rassemble les repères utiles pour comprendre le niveau Bac+2 visé, le format de travail et les compétences mobilisées avant de demander un rappel.",
      items: Array.isArray(section.items) ? section.items : []
    }
  }

  return {
    eyebrow: 'Avant le contact',
    title: 'Un parcours pour viser un niveau Bac+2 utile à votre projet',
    description:
      "Le RPMS rassemble les repères utiles pour comprendre le niveau Bac+2 visé, le format de travail et les compétences mobilisées avant de demander un rappel.",
    items: [
      'Identifier le niveau Bac+2 visé et le code RNCP du titre.',
      "Comprendre le format 100 % distanciel et la place de l'e-learning.",
      'Situer les compétences de pilotage, de management et d’organisation qui soutiennent cette progression.'
    ]
  }
})

const contactBand = computed(() => {
  const band = site.value.home?.contactBand
  if (band && typeof band === 'object') {
    return {
      eyebrow: band.eyebrow ?? 'Échange',
      title: band.title ?? 'Faire le point sur votre projet avec CITYZ’France',
      description:
        band.description ??
        'Si vous souhaitez vérifier si le RPMS correspond à votre situation, vous pouvez demander un rappel depuis le site.',
      supportLine:
        band.supportLine ??
        "Le rappel permet de préciser votre projet et les questions à clarifier avant d'aller plus loin."
    }
  }

  return {
    eyebrow: 'Échange',
    title: 'Faire le point sur votre projet avec CITYZ’France',
    description:
      'Si vous souhaitez vérifier si le RPMS correspond à votre situation, vous pouvez demander un rappel depuis le site.',
    supportLine:
      "Le rappel permet de préciser votre projet et les questions à clarifier avant d'aller plus loin."
  }
})

const featuredBlocks = computed(() => (program.value?.blocks ?? []).slice(0, 3))
const factChips = ['RNCP38575', 'Niveau 5 / Bac+2', '100 % distanciel', 'E-learning', 'Qualiopi']
</script>

<template>
  <div class="space-y-12 sm:space-y-14 lg:space-y-16">
    <section
      class="grid gap-6 lg:grid-cols-[1.04fr,0.96fr] lg:items-start"
      v-motion
      :initial="motionVariants.block.initial"
      :enter="motionVariants.block.enter"
    >
      <div class="space-y-6">
        <p class="kicker">{{ heroEyebrow }}</p>

        <div class="space-y-4">
          <h1 class="editorial-title max-w-4xl text-[clamp(2.85rem,6vw,5.25rem)] text-foreground">
            Titre professionnel Responsable petite et moyenne structure (RPMS)
          </h1>
          <p class="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {{ heroSubtitle }}
          </p>
          <p class="max-w-2xl text-base font-semibold leading-relaxed text-foreground sm:text-lg">
            {{ heroFitLine }}
          </p>
        </div>

        <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <RouterLink to="/contact" class="sm:flex-none">
            <Button size="lg" class="w-full sm:w-auto">
              Être rappelé
              <ArrowRight class="ml-2 h-4 w-4" />
            </Button>
          </RouterLink>
          <RouterLink to="/programme" class="sm:flex-none">
            <Button size="lg" variant="outline" class="w-full sm:w-auto">Voir le programme</Button>
          </RouterLink>
        </div>

        <p class="text-sm leading-relaxed text-muted-foreground">
          Pour vérifier si le RPMS correspond à votre projet et clarifier les points utiles avant
          d'aller plus loin.
        </p>

        <div class="flex flex-wrap gap-2">
          <span
            v-for="item in factChips"
            :key="item"
            class="rounded-full border border-border bg-white px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground"
          >
            {{ item }}
          </span>
        </div>

        <p
          v-if="errorMessage"
          class="rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          {{ errorMessage }}
        </p>
      </div>

      <div class="space-y-4">
        <div class="page-cut rounded-[1.4rem] p-5 sm:p-6">
          <div class="flex items-center justify-between gap-3">
            <p class="kicker">Points clés</p>
            <span
              class="rounded-full border border-border bg-white px-3 py-1 text-xs font-semibold text-muted-foreground"
            >
              RPMS
            </span>
          </div>

          <div class="mt-4 grid gap-3 sm:grid-cols-2">
            <div
              v-for="(item, index) in proofItems"
              :key="item.label"
              v-motion
              :initial="motionVariants.pop.initial"
              :enter="staggerEnter(index, 70, 80)"
            >
              <ImpactStat :value="item.value" :label="item.label" :note="item.note" />
            </div>
          </div>
        </div>

        <div class="page-cut rounded-[1.4rem] p-5 sm:p-6">
          <p class="kicker">{{ valueSection.eyebrow }}</p>
          <h2 class="mt-3 text-2xl font-semibold text-foreground sm:text-[2rem]">
            {{ valueSection.title }}
          </h2>
          <p class="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {{ valueSection.description }}
          </p>

          <div class="mt-5 grid gap-3">
            <div
              v-for="item in valueSection.items"
              :key="item"
              class="flex items-start gap-3 rounded-xl border border-border bg-white px-4 py-3 text-sm font-medium text-foreground"
            >
              <span class="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-secondary"></span>
              <span>{{ item }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="space-y-8">
      <SectionTitle
        eyebrow="Pourquoi le RPMS"
        title="Des repères concrets pour situer votre projet"
        description="Le niveau, le format et les compétences travaillées prennent ici le rôle d'aide à la décision, pas de simple fiche descriptive."
      />

      <div class="grid gap-6 lg:grid-cols-[0.96fr,1.04fr]">
        <Card class="page-cut h-fit">
          <CardHeader class="space-y-3">
            <CardTitle>Compétences au coeur du parcours</CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <p class="text-sm leading-relaxed text-muted-foreground">
              Le RPMS s'appuie sur des compétences de pilotage, de management et d'organisation
              qui servent à lire plus clairement votre projet avant un échange.
            </p>
            <ul class="grid gap-3 text-sm leading-relaxed text-muted-foreground sm:grid-cols-2">
              <li
                v-for="cluster in competencyClusters"
                :key="cluster"
                class="rounded-xl border border-border bg-white px-4 py-3 font-medium text-foreground"
              >
                {{ cluster }}
              </li>
            </ul>
          </CardContent>
        </Card>

        <div class="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
          <Card
            v-for="(item, index) in highlights"
            :key="item.title"
            class="page-cut"
            v-motion
            :initial="motionVariants.block.initial"
            :enter="staggerEnter(index, 75, 70)"
          >
            <CardHeader class="space-y-3">
              <component
                :is="highlightIcons[index % highlightIcons.length]"
                class="h-6 w-6 text-primary"
              />
              <CardTitle>{{ item.title }}</CardTitle>
            </CardHeader>
            <CardContent class="text-sm leading-relaxed text-muted-foreground">
              {{ item.text }}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <section class="grid gap-6 lg:grid-cols-[0.9fr,1.1fr]">
      <div class="space-y-6">
        <SectionTitle
          eyebrow="Programme"
          title="Une progression claire sur les compétences clés"
          description="Le programme se structure en blocs qui vont du pilotage et du management à l'organisation, au développement et au reporting."
        />

        <div class="space-y-3">
          <p class="text-sm leading-relaxed text-muted-foreground">
            Vous pouvez consulter le détail du programme pour retrouver l'ensemble des blocs de
            compétences et la logique de progression du titre.
          </p>
          <RouterLink
            to="/programme"
            class="inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            Voir le programme
            <ArrowRight class="h-4 w-4" />
          </RouterLink>
        </div>
      </div>

      <div class="grid gap-4">
        <article
          v-for="(block, index) in featuredBlocks"
          :key="block.code"
          class="page-cut rounded-[1.35rem] px-5 py-5 sm:px-6"
          v-motion
          :initial="motionVariants.block.initial"
          :enter="staggerEnter(index, 60, 80)"
        >
          <div class="flex flex-wrap items-center gap-2">
            <span class="kicker">{{ block.code }}</span>
          </div>
          <h3 class="mt-3 text-xl font-semibold text-foreground">{{ block.title }}</h3>
          <p class="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
            {{ block.details }}
          </p>
        </article>
      </div>
    </section>

    <section class="page-cut rounded-[1.6rem] p-6 sm:p-8 lg:p-10">
      <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div class="space-y-3">
          <p class="kicker">{{ contactBand.eyebrow }}</p>
          <h2 class="editorial-title text-[clamp(2rem,3.4vw,3.35rem)] text-foreground">
            {{ contactBand.title }}
          </h2>
          <p class="max-w-2xl text-base leading-relaxed text-muted-foreground">
            {{ contactBand.description }}
          </p>
          <p class="max-w-2xl text-sm leading-relaxed text-foreground/78">
            {{ contactBand.supportLine }}
          </p>
        </div>

        <div class="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
          <RouterLink to="/contact" class="sm:flex-none">
            <Button size="lg" class="w-full sm:w-auto">
              Être rappelé
              <ArrowRight class="ml-2 h-4 w-4" />
            </Button>
          </RouterLink>
          <RouterLink to="/programme" class="sm:flex-none">
            <Button size="lg" variant="outline" class="w-full sm:w-auto">Voir le programme</Button>
          </RouterLink>
        </div>
      </div>
    </section>

    <p v-if="loading" class="text-sm text-muted-foreground">Actualisation du contenu...</p>
  </div>
</template>
