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
  brand: {
    descriptor: 'Organisme de formation certifié Qualiopi'
  },
  positioning: {
    eyebrow: "CITYZ'France",
    title:
      "Avec CITYZ'France, avancez vers des fonctions de pilotage, de management et d'organisation.",
    subtitle:
      "Le RPMS est une formation de niveau 5 (Bac+2) conçue pour développer des bases concrètes en pilotage, management et organisation, dans un cadre 100 % distanciel avec accompagnement pédagogique.",
    fitLine:
      "Si vous cherchez un parcours lisible pour clarifier votre projet et renforcer des responsabilités concrètes, CITYZ'France vous aide à comprendre ce que cette progression peut réellement vous apporter."
  },
  home: {
    proofItems: [],
    highlights: [],
    competencyClusters: [],
    journey: [],
    valueSection: {
      eyebrow: "Pourquoi CITYZ'France",
      title: 'Un cadre clair pour relier votre projet, le niveau visé et la réalité du parcours',
      description:
        "Avant de vous engager, l'enjeu est d'identifier ce que le RPMS peut structurer dans votre projet et la manière dont CITYZ'France vous accompagne.",
      items: []
    },
    contactBand: {
      eyebrow: 'Prochaine étape',
      title: 'Demandez un rappel pour vérifier si le RPMS correspond à votre projet',
      description:
        "L'échange avec CITYZ'France permet de faire le point sur votre situation, de clarifier les questions utiles et de voir comment avancer.",
      supportLine:
        'Vous repartez avec une vision plus claire du parcours, du niveau visé et des prochaines étapes possibles.'
    }
  }
})
const loading = ref(true)
const errorMessage = ref('')

const highlightIcons = [ShieldCheck, Waypoints, BookOpenCheck]

onMounted(async () => {
  try {
    const [programPayload, sitePayload] = await Promise.all([api.getProgram('rpms'), api.getSite()])
    program.value = programPayload
    site.value = sitePayload
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Contenu indisponible.'
  } finally {
    loading.value = false
  }
})

const brandDescriptor = computed(
  () => site.value.brand?.descriptor ?? 'Organisme de formation certifié Qualiopi'
)
const heroEyebrow = computed(() => site.value.positioning?.eyebrow ?? "CITYZ'France")
const heroTitle = computed(
  () =>
    site.value.positioning?.title ??
    "Avec CITYZ'France, avancez vers des fonctions de pilotage, de management et d'organisation."
)
const heroSubtitle = computed(
  () =>
    site.value.positioning?.subtitle ??
    "Le RPMS est une formation de niveau 5 (Bac+2) conçue pour développer des bases concrètes en pilotage, management et organisation, dans un cadre 100 % distanciel avec accompagnement pédagogique."
)
const heroFitLine = computed(
  () =>
    site.value.positioning?.fitLine ??
    "Si vous cherchez un parcours lisible pour clarifier votre projet et renforcer des responsabilités concrètes, CITYZ'France vous aide à comprendre ce que cette progression peut réellement vous apporter."
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
      note: 'Titre professionnel RPMS'
    },
    {
      value: program.value?.levelLabel ?? 'Niveau 5 (Bac+2)',
      label: 'Niveau visé',
      note: 'Bac+2'
    },
    {
      value: program.value?.formatLabel ?? '100 % distanciel',
      label: 'Modalité',
      note: 'E-learning avec accompagnement pédagogique'
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
      title: 'Piloter une activité avec davantage de recul',
      text: 'Le parcours aide à mieux suivre la performance, structurer les priorités et poser un cadre de décision plus lisible.'
    },
    {
      title: 'Manager et coordonner plus sereinement',
      text: "Le RPMS aborde l'animation d'équipe, l'organisation du travail et la coordination quotidienne avec une logique concrète."
    },
    {
      title: 'Organiser les opérations avec méthode',
      text: "Organisation, qualité, communication et reporting s'articulent pour donner une lecture plus complète des responsabilités visées."
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
      eyebrow: section.eyebrow ?? "Pourquoi CITYZ'France",
      title: section.title ?? 'Un cadre clair pour relier votre projet, le niveau visé et la réalité du parcours',
      description:
        section.description ??
        "Avant de vous engager, l'enjeu est d'identifier ce que le RPMS peut structurer dans votre projet et la manière dont CITYZ'France vous accompagne.",
      items: Array.isArray(section.items) ? section.items : []
    }
  }

  return {
    eyebrow: "Pourquoi CITYZ'France",
    title: 'Un cadre clair pour relier votre projet, le niveau visé et la réalité du parcours',
    description:
      "Avant de vous engager, l'enjeu est d'identifier ce que le RPMS peut structurer dans votre projet et la manière dont CITYZ'France vous accompagne.",
    items: [
      'Situer le niveau 5 (Bac+2) dans une progression vers des fonctions de pilotage et de management.',
      "Comprendre le format 100 % distanciel, l'e-learning et la place de l'accompagnement pédagogique.",
      'Vérifier si les compétences travaillées correspondent à votre contexte, vos questions et votre rythme.'
    ]
  }
})

const journey = computed(() => {
  const items = site.value.home?.journey
  if (Array.isArray(items) && items.length > 0) {
    return items
  }

  return [
    {
      title: 'Faire le point sur votre projet',
      text: 'Le rappel part de votre contexte, de vos questions et de ce que vous cherchez à structurer avant toute décision.'
    },
    {
      title: 'Comprendre le cadre du parcours',
      text: "Vous pouvez clarifier le format 100 % distanciel, l'e-learning et l'accompagnement pédagogique avant d'aller plus loin."
    },
    {
      title: 'Décider avec plus de visibilité',
      text: "L'objectif est de vous donner des éléments utiles sur le RPMS, le niveau visé et la suite possible, sans vous brusquer."
    }
  ]
})

const contactBand = computed(() => {
  const band = site.value.home?.contactBand
  if (band && typeof band === 'object') {
    return {
      eyebrow: band.eyebrow ?? 'Prochaine étape',
      title: band.title ?? 'Demandez un rappel pour vérifier si le RPMS correspond à votre projet',
      description:
        band.description ??
        "L'échange avec CITYZ'France permet de faire le point sur votre situation, de clarifier les questions utiles et de voir comment avancer.",
      supportLine:
        band.supportLine ??
        'Vous repartez avec une vision plus claire du parcours, du niveau visé et des prochaines étapes possibles.'
    }
  }

  return {
    eyebrow: 'Prochaine étape',
    title: 'Demandez un rappel pour vérifier si le RPMS correspond à votre projet',
    description:
      "L'échange avec CITYZ'France permet de faire le point sur votre situation, de clarifier les questions utiles et de voir comment avancer.",
    supportLine:
      'Vous repartez avec une vision plus claire du parcours, du niveau visé et des prochaines étapes possibles.'
  }
})

const featuredBlocks = computed(() => (program.value?.blocks ?? []).slice(0, 3))
</script>

<template>
  <div class="space-y-14 sm:space-y-16 lg:space-y-20">
    <section
      class="grid gap-8 lg:grid-cols-[1.08fr,0.92fr] lg:items-start"
      v-motion
      :initial="motionVariants.block.initial"
      :enter="motionVariants.block.enter"
    >
      <div class="space-y-6">
        <div class="flex flex-wrap items-center gap-3">
          <p class="kicker">{{ heroEyebrow }}</p>
          <span class="trust-chip">{{ brandDescriptor }}</span>
        </div>

        <div class="space-y-4">
          <h1 class="editorial-title max-w-4xl text-[clamp(2.8rem,5.8vw,5.15rem)] text-foreground">
            {{ heroTitle }}
          </h1>
          <p class="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {{ heroSubtitle }}
          </p>
          <p class="max-w-2xl text-base font-semibold leading-relaxed text-foreground/90 sm:text-lg">
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

        <p
          v-if="errorMessage"
          class="rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          {{ errorMessage }}
        </p>
      </div>

      <div class="space-y-4 lg:pt-4">
        <div class="page-cut rounded-[1.45rem] p-5 sm:p-6">
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

        <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-3">
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
    </section>

    <section class="space-y-8">
      <SectionTitle
        eyebrow="Ce que le parcours développe"
        title="Des compétences qui renforcent votre capacité à piloter, organiser et manager."
        description="Le niveau Bac+2 reste un repère utile, mais la valeur du RPMS se joue aussi dans la manière dont il structure des responsabilités très concrètes."
      />

      <div class="grid gap-6 lg:grid-cols-[0.96fr,1.04fr]">
        <Card class="page-cut h-fit">
          <CardHeader class="space-y-3">
            <CardTitle>Compétences au coeur du parcours</CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <p class="text-sm leading-relaxed text-muted-foreground">
              Le RPMS aide à relier des enjeux de pilotage, de management et d'organisation à des
              situations de travail plus lisibles au quotidien.
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
          eyebrow="Progression"
          title="Le programme donne une lecture concrète du chemin à parcourir."
          description="Trois blocs suffisent pour saisir la logique du RPMS avant d'aller consulter le détail complet du programme."
        />

        <div class="space-y-3">
          <p class="text-sm leading-relaxed text-muted-foreground">
            Vous pouvez consulter le programme pour retrouver l'ensemble des blocs de compétences
            et la progression complète du titre professionnel.
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

    <section class="space-y-8">
      <SectionTitle
        eyebrow="Avant de vous décider"
        title="Un échange pour clarifier votre projet, pas pour vous précipiter."
        description="Le rappel sert à vérifier l'adéquation du parcours, comprendre le cadre à distance et repartir avec des éléments utiles."
      />

      <div class="grid gap-4 md:grid-cols-3">
        <Card
          v-for="(item, index) in journey"
          :key="item.title"
          class="page-cut"
          v-motion
          :initial="motionVariants.block.initial"
          :enter="staggerEnter(index, 75, 70)"
        >
          <CardHeader class="space-y-3">
            <CardTitle>{{ item.title }}</CardTitle>
          </CardHeader>
          <CardContent class="text-sm leading-relaxed text-muted-foreground">
            {{ item.text }}
          </CardContent>
        </Card>
      </div>
    </section>

    <section class="page-cut rounded-[1.6rem] p-6 sm:p-8 lg:p-10">
      <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div class="space-y-3">
          <p class="kicker">{{ contactBand.eyebrow }}</p>
          <h2 class="editorial-title max-w-3xl text-[clamp(2rem,3.4vw,3.35rem)] text-foreground">
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
