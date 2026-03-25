<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowRight, BookOpenCheck, ShieldCheck, Waypoints } from 'lucide-vue-next'

import SectionTitle from '@/components/section-title.vue'
import ImpactStat from '@/components/visual/impact-stat.vue'
import TrustStrip from '@/components/visual/trust-strip.vue'
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
    eyebrow: 'Titre professionnel RPMS',
    title:
      'Vous cherchez à prendre plus de responsabilités dans une petite ou moyenne structure ?',
    subtitle:
      "Ce parcours vous aide à renforcer votre pilotage, votre management et votre organisation avec des repères concrets en activité, équipe, offre, territoire et reporting.",
    fitLine:
      "Avant de laisser vos coordonnées, voyez rapidement si ce parcours correspond à ce que vous cherchez à structurer dans votre projet."
  },
  home: {
    proofItems: [],
    highlights: [],
    competencyClusters: [],
    journey: [],
    valueSection: {
      eyebrow: 'Ce que ce parcours peut vous aider à structurer',
      title: 'Un cadre plus clair pour tenir un rôle plus complet au quotidien.',
      description:
        "L'enjeu n'est pas seulement d'identifier un titre, mais de voir si le parcours répond à ce que vous voulez vraiment mieux piloter, coordonner et organiser.",
      items: []
    },
    contactBand: {
      eyebrow: 'Parler de votre projet',
      title: 'Demandez un rappel pour savoir rapidement si ce parcours correspond à votre projet',
      description:
        "En quelques minutes, vous pouvez clarifier le contenu, le niveau visé, le format à distance et les compétences travaillées.",
      supportLine:
        "Vous repartez avec une vision plus nette du programme et de la place qu'il peut prendre dans votre projet."
    }
  }
})
const loading = ref(true)
const errorMessage = ref('')

const highlightIcons = [ShieldCheck, Waypoints, BookOpenCheck]

const heroEyebrow = computed(() => site.value.positioning?.eyebrow ?? 'Titre professionnel RPMS')
const heroTitle = computed(
  () =>
    site.value.positioning?.title ??
    'Vous cherchez à prendre plus de responsabilités dans une petite ou moyenne structure ?'
)
const heroSubtitle = computed(
  () =>
    site.value.positioning?.subtitle ??
    "Ce parcours vous aide à renforcer votre pilotage, votre management et votre organisation avec des repères concrets en activité, équipe, offre, territoire et reporting."
)
const heroFitLine = computed(
  () =>
    site.value.positioning?.fitLine ??
    "Avant de laisser vos coordonnées, voyez rapidement si ce parcours correspond à ce que vous cherchez à structurer dans votre projet."
)
const trustStripItems = computed(() => [
  program.value?.rncpCode ?? 'RNCP38575',
  program.value?.levelLabel ?? 'Niveau 5 (Bac+2)',
  program.value?.formatLabel ?? '100 % distanciel',
  program.value?.supportLabel ?? 'Accompagnement pédagogique'
])

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

const proofItems = computed(() => {
  const items = site.value.home?.proofItems
  if (Array.isArray(items) && items.length > 0) {
    return items
  }

  return [
    {
      value: 'Titre reconnu',
      label: 'Titre',
      note: 'Titre professionnel RPMS'
    },
    {
      value: program.value?.rncpCode ?? 'RNCP38575',
      label: 'Référence',
      note: 'Code RNCP'
    },
    {
      value: program.value?.levelLabel ?? 'Niveau 5 / Bac+2',
      label: 'Niveau',
      note: 'Titre de niveau 5'
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
      title: "Prendre plus de recul sur l'activité",
      text: "Le parcours vous aide à suivre la performance, structurer les priorités et garder une lecture plus claire de l'activité."
    },
    {
      title: 'Mieux coordonner une équipe',
      text: "Vous travaillez l'animation d'équipe, l'organisation du travail et la coordination quotidienne dans une logique concrète."
    },
    {
      title: 'Structurer les opérations avec méthode',
      text: "Organisation, qualité, communication et reporting s'articulent pour vous donner un cadre d'action plus solide."
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
    'Organiser les opérations, la qualité et les ressources',
    "Développer l'offre, la communication et le reporting"
  ]
})

const valueSection = computed(() => {
  const section = site.value.home?.valueSection
  if (section && typeof section === 'object') {
    return {
      eyebrow: section.eyebrow ?? 'Ce que ce parcours peut vous aider à structurer',
      title: section.title ?? 'Un cadre plus clair pour tenir un rôle plus complet au quotidien.',
      description:
        section.description ??
        "L'enjeu n'est pas seulement d'identifier un titre, mais de voir si le parcours répond à ce que vous voulez vraiment mieux piloter, coordonner et organiser.",
      items: Array.isArray(section.items) ? section.items : []
    }
  }

  return {
    eyebrow: 'Ce que ce parcours peut vous aider à structurer',
    title: 'Un cadre plus clair pour tenir un rôle plus complet au quotidien.',
    description:
      "L'enjeu n'est pas seulement d'identifier un titre, mais de voir si le parcours répond à ce que vous voulez vraiment mieux piloter, coordonner et organiser.",
    items: [
      "Prendre plus de recul sur l'activité et les priorités.",
      "Mieux coordonner une équipe et organiser le travail.",
      "Structurer l'offre, le territoire, les partenariats et le reporting avec plus de méthode."
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
      title: 'Partir de votre situation',
      text: "Vous commencez par ce que vous cherchez à débloquer, clarifier ou mieux organiser dans votre quotidien."
    },
    {
      title: "Vérifier l'adéquation du parcours",
      text: "Vous revenez sur le contenu, le format à distance, l'accompagnement et les repères officiels du parcours."
    },
    {
      title: 'Décider avec une vision claire',
      text: "L'objectif est de vous aider à voir rapidement si ce parcours mérite d'aller plus loin dans votre projet."
    }
  ]
})

const contactBand = computed(() => {
  const band = site.value.home?.contactBand
  if (band && typeof band === 'object') {
    return {
      eyebrow: band.eyebrow ?? 'Parler de votre projet',
      title: band.title ?? 'Demandez un rappel pour savoir rapidement si ce parcours correspond à votre projet',
      description:
        band.description ??
        "En quelques minutes, vous pouvez clarifier le contenu, le niveau visé, le format à distance et les compétences travaillées.",
      supportLine:
        band.supportLine ??
        "Vous repartez avec une vision plus nette du programme et de la place qu'il peut prendre dans votre projet."
    }
  }

  return {
    eyebrow: 'Parler de votre projet',
    title: 'Demandez un rappel pour savoir rapidement si ce parcours correspond à votre projet',
    description:
      "En quelques minutes, vous pouvez clarifier le contenu, le niveau visé, le format à distance et les compétences travaillées.",
    supportLine:
      "Vous repartez avec une vision plus nette du programme, du cadre du titre et de la place qu'il peut prendre dans votre projet."
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
      <div class="space-y-5">
        <div class="space-y-4">
          <p class="kicker">{{ heroEyebrow }}</p>
          <h1 class="editorial-title max-w-4xl text-[clamp(2.35rem,5vw,4.55rem)] text-foreground">
            {{ heroTitle }}
          </h1>
          <p class="max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {{ heroSubtitle }}
          </p>
        </div>

        <p class="max-w-2xl text-base font-semibold leading-relaxed text-foreground/90 sm:text-lg">
          {{ heroFitLine }}
        </p>

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

        <trust-strip :items="trustStripItems" />
      </div>

      <div class="space-y-4 lg:pt-2">
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

        <div class="grid gap-3 sm:grid-cols-2">
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
        eyebrow="Ce que vous allez réellement renforcer"
        title="Un parcours pensé pour vous aider à mieux piloter, coordonner et organiser."
        description="Le niveau du titre reste un repère utile, mais ce qui doit retenir votre attention est la manière dont le parcours travaille des responsabilités très concrètes."
      />

      <div class="grid gap-6 lg:grid-cols-[0.96fr,1.04fr]">
        <Card class="page-cut h-fit">
          <CardHeader class="space-y-3">
            <CardTitle>Compétences au coeur du parcours</CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <p class="text-sm leading-relaxed text-muted-foreground">
              Vous retrouvez ici les dimensions concrètes du parcours pour voir si elles
              répondent vraiment à votre quotidien et à vos objectifs.
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
          title="Un programme qui montre clairement ce que vous allez travailler."
          description="Trois blocs suffisent pour comprendre la logique du parcours avant d'aller consulter le détail complet du programme."
        />

        <div class="space-y-3">
          <p class="text-sm leading-relaxed text-muted-foreground">
            Vous pouvez consulter le programme pour retrouver l'ensemble des blocs de compétences
            et la progression complète du parcours.
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
          eyebrow="Décider sans perdre de temps"
          title="Un échange utile pour vérifier le fit avant d'aller plus loin."
          description="Le rappel sert à revenir sur votre projet et le format à distance sans transformer votre décision en parcours compliqué."
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
