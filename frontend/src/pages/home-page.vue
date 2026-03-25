<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import {
  ArrowRight,
  BookOpenCheck,
  Building2,
  GraduationCap,
  ShieldCheck,
  Waypoints
} from 'lucide-vue-next'

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
      "Découvrez le titre professionnel Responsable petite et moyenne structure (RPMS), son niveau, son format à distance et les compétences qu'il permet de développer."
  },
  home: {
    proofItems: [],
    highlights: [],
    journey: [],
    competencyClusters: []
  }
})
const loading = ref(true)
const errorMessage = ref('')

const highlightIcons = [ShieldCheck, BookOpenCheck, Building2]
const journeyIcons = [BookOpenCheck, GraduationCap, Waypoints]

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
    "Découvrez le titre professionnel Responsable petite et moyenne structure (RPMS), son niveau, son format à distance et les compétences qu'il permet de développer."
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
      note: 'Titre professionnel'
    },
    {
      value: program.value?.levelLabel ?? 'Niveau 5 (Bac+2)',
      label: 'Niveau',
      note: 'Positionnement de la certification'
    },
    {
      value: program.value?.formatLabel ?? '100 % distanciel',
      label: 'Modalité',
      note: program.value?.rhythmLabel ?? 'E-learning'
    }
  ]
})

const summaryCards = computed(() =>
  [
    { label: 'Niveau', value: program.value?.levelLabel ?? 'Niveau 5 (Bac+2)' },
    { label: 'Modalité', value: program.value?.formatLabel ?? '100 % distanciel' },
    { label: 'Format', value: program.value?.rhythmLabel ?? 'E-learning' },
    {
      label: 'Accompagnement',
      value: program.value?.supportLabel ?? 'Accompagnement pédagogique'
    }
  ].filter((item) => item.value)
)

const highlights = computed(() => {
  const items = site.value.home?.highlights
  if (Array.isArray(items) && items.length > 0) {
    return items
  }

  return [
    {
      title: 'Un programme clair',
      text: "Vous retrouvez d'emblée le titre, le code RNCP, le niveau et le format du parcours."
    },
    {
      title: 'Un parcours à distance',
      text: "La formation est proposée en 100 % distanciel, avec une organisation en e-learning et un accompagnement pédagogique."
    },
    {
      title: 'Un projet à qualifier',
      text: 'Le rappel permet de vérifier si le RPMS correspond à votre situation et à vos objectifs.'
    }
  ]
})

const journey = computed(() => {
  const items = site.value.home?.journey
  if (Array.isArray(items) && items.length > 0) {
    return items
  }

  return [
    {
      title: 'Comprendre le programme',
      text: 'Consultez les informations clés avant de rentrer dans le détail des blocs de compétences.'
    },
    {
      title: 'Vérifier le format',
      text: "Regardez comment le parcours s'organise à distance et quel accompagnement pédagogique est annoncé."
    },
    {
      title: 'Demander un rappel',
      text: 'Expliquez votre projet pour obtenir un échange adapté à vos questions.'
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

const featuredBlocks = computed(() => (program.value?.blocks ?? []).slice(0, 3))
const factChips = [
  'RNCP38575',
  'Niveau 5 / Bac+2',
  '100 % distanciel',
  'E-learning',
  'Accompagnement pédagogique'
]
</script>

<template>
  <div class="space-y-12 sm:space-y-14 lg:space-y-16">
    <section
      class="grid gap-6 lg:grid-cols-[1.05fr,0.95fr] lg:items-start"
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
        </div>

        <div class="flex flex-wrap gap-3">
          <RouterLink to="/contact">
            <Button size="lg">
              Être rappelé
              <ArrowRight class="ml-2 h-4 w-4" />
            </Button>
          </RouterLink>
          <RouterLink to="/programme">
            <Button size="lg" variant="outline">Voir le programme</Button>
          </RouterLink>
        </div>

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
            <p class="kicker">Informations clés</p>
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
          <p class="kicker">Compétences centrales</p>
          <div class="mt-4 grid gap-3">
            <div
              v-for="cluster in competencyClusters"
              :key="cluster"
              class="flex items-start gap-3 rounded-xl border border-border bg-white px-4 py-3 text-sm font-medium text-foreground"
            >
              <span class="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-secondary"></span>
              <span>{{ cluster }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="space-y-6">
      <SectionTitle
        eyebrow="Programme"
        title="Les informations essentielles avant d'aller plus loin"
        description="Le site met en avant les points utiles pour comprendre le RPMS avant une demande de rappel."
      />

      <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card
          v-for="(item, index) in summaryCards"
          :key="item.label"
          class="page-cut"
          v-motion
          :initial="motionVariants.block.initial"
          :enter="staggerEnter(index, 75, 70)"
        >
          <CardHeader class="space-y-2">
            <CardTitle class="text-base">{{ item.label }}</CardTitle>
          </CardHeader>
          <CardContent class="text-sm leading-relaxed text-muted-foreground">
            {{ item.value }}
          </CardContent>
        </Card>
      </div>
    </section>

    <section class="grid gap-6 lg:grid-cols-[0.92fr,1.08fr]">
      <div class="space-y-6">
        <SectionTitle
          eyebrow="Pourquoi consulter ces pages"
          title="Une lecture simple pour avancer dans votre réflexion"
          description="Chaque page répond à une question concrète avant une demande de rappel."
        />

        <div class="grid gap-4">
          <Card
            v-for="(item, index) in highlights"
            :key="item.title"
            class="page-cut"
            v-motion
            :initial="motionVariants.block.initial"
            :enter="staggerEnter(index, 80, 70)"
          >
            <CardHeader class="space-y-3">
              <component :is="highlightIcons[index % highlightIcons.length]" class="h-6 w-6 text-primary" />
              <CardTitle>{{ item.title }}</CardTitle>
            </CardHeader>
            <CardContent class="text-sm leading-relaxed text-muted-foreground">
              {{ item.text }}
            </CardContent>
          </Card>
        </div>
      </div>

      <div class="space-y-6">
        <SectionTitle
          eyebrow="Parcours de visite"
          title="Du programme à l'échange"
          description="Commencez par les informations clés, approfondissez le contenu, puis demandez un rappel si vous souhaitez en parler."
        />

        <div class="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
          <Card
            v-for="(item, index) in journey"
            :key="item.title"
            class="page-cut"
            v-motion
            :initial="motionVariants.block.initial"
            :enter="staggerEnter(index, 80, 90)"
          >
            <CardHeader class="space-y-3">
              <component :is="journeyIcons[index % journeyIcons.length]" class="h-6 w-6 text-primary" />
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
          eyebrow="Blocs de compétences"
          title="Un aperçu du contenu travaillé"
          description="Le programme couvre le pilotage, le management, l'organisation et le développement de l'activité."
        />

        <div class="space-y-3">
          <p class="text-sm leading-relaxed text-muted-foreground">
            Vous pouvez consulter l'ensemble du programme pour retrouver tous les blocs de
            compétences et leurs thèmes de travail.
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
          <p class="kicker">Contact</p>
          <h2 class="editorial-title text-[clamp(2rem,3.4vw,3.35rem)] text-foreground">
            Demander un rappel pour parler de votre projet
          </h2>
          <p class="max-w-2xl text-base leading-relaxed text-muted-foreground">
            Si vous souhaitez vérifier l'adéquation du RPMS à votre situation, laissez vos
            coordonnées et votre question.
          </p>
        </div>

        <div class="flex flex-wrap gap-3">
          <RouterLink to="/contact">
            <Button size="lg">
              Être rappelé
              <ArrowRight class="ml-2 h-4 w-4" />
            </Button>
          </RouterLink>
          <RouterLink to="/programme">
            <Button size="lg" variant="outline">Voir le programme</Button>
          </RouterLink>
        </div>
      </div>
    </section>

    <p v-if="loading" class="text-sm text-muted-foreground">Actualisation du contenu...</p>
  </div>
</template>
