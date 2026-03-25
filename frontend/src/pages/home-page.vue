<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowRight, BookOpenCheck, ShieldCheck, Waypoints } from 'lucide-vue-next'

import SectionTitle from '@/components/section-title.vue'
import { Button } from '@/components/ui/button'
import ImpactStat from '@/components/visual/impact-stat.vue'
import TrustStrip from '@/components/visual/trust-strip.vue'
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
      'Titre professionnel Responsable petite et moyenne structure (RPMS), niveau 5 (Bac+2).',
    subtitle:
      'Le parcours structure les compétences de pilotage, management, organisation, territoire, partenariats, production, performance et reporting.',
    fitLine:
      "Avant de laisser vos coordonnées, vérifiez si ce titre professionnel correspond à ce que vous cherchez à structurer dans votre projet."
  },
  home: {
    proofItems: [],
    highlights: [],
    competencyClusters: [],
    journey: [],
    valueSection: {
      eyebrow: 'Ce que le RPMS structure',
      title: 'Piloter une petite ou moyenne structure avec des repères concrets.',
      description:
        "Le RPMS relie le cadre officiel du titre à ce que vous voulez réellement mieux organiser, coordonner et suivre dans une structure.",
      items: []
    },
    contactBand: {
      eyebrow: 'Parler de votre projet',
      title: 'Demandez un rappel pour vérifier l’adéquation du RPMS à votre projet',
      description:
        'En quelques minutes, vous pouvez clarifier le titre, le niveau visé, le format à distance et les compétences travaillées.',
      supportLine:
        "Vous repartez avec une vision plus nette du programme et de son cadre officiel."
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
    'Titre professionnel Responsable petite et moyenne structure (RPMS), niveau 5 (Bac+2).'
)
const heroSubtitle = computed(
  () =>
    site.value.positioning?.subtitle ??
    "Le parcours structure les compétences de pilotage, management, organisation, territoire, partenariats, production, performance et reporting."
)
const heroFitLine = computed(
  () =>
    site.value.positioning?.fitLine ??
    "Avant de laisser vos coordonnées, vérifiez si ce titre professionnel correspond à votre projet de pilotage ou de management."
)
const trustStripItems = computed(() => [
  program.value?.rncpCode ?? 'RNCP38575',
  program.value?.levelLabel ?? 'Niveau 5 / Bac+2',
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
      value: 'Responsable petite et moyenne structure (RPMS)',
      label: 'Titre',
      note: 'Intitulé officiel'
    },
    {
      value: program.value?.rncpCode ?? 'RNCP38575',
      label: 'Référence',
      note: 'Code RNCP'
    },
    {
      value: program.value?.levelLabel ?? 'Niveau 5 / Bac+2',
      label: 'Niveau',
      note: 'Titre professionnel de niveau 5'
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
      title: "Piloter l'activité avec méthode",
      text: "Le parcours relie performance, priorités et pilotage opérationnel."
    },
    {
      title: 'Coordonner une équipe',
      text: "Vous travaillez l'animation d'équipe, l'organisation du travail et les arbitrages du quotidien."
    },
    {
      title: 'Structurer les opérations',
      text: 'Organisation, qualité, communication et reporting soutiennent une action plus solide.'
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
    'Organiser la production et les ressources',
    "Développer l'offre, les partenariats et le reporting"
  ]
})

const valueSection = computed(() => {
  const section = site.value.home?.valueSection
  if (section && typeof section === 'object') {
    return {
      eyebrow: section.eyebrow ?? 'Ce que le RPMS structure',
      title:
        section.title ??
        'Piloter une petite ou moyenne structure avec des repères concrets.',
      description:
        section.description ??
        "Le RPMS relie le cadre officiel du titre à ce que vous voulez réellement mieux organiser, coordonner et suivre dans une structure.",
      items: Array.isArray(section.items) ? section.items : []
    }
  }

  return {
    eyebrow: 'Ce que le RPMS structure',
    title: 'Piloter une petite ou moyenne structure avec des repères concrets.',
    description:
      "Le RPMS relie le cadre officiel du titre à ce que vous voulez réellement mieux organiser, coordonner et suivre dans une structure.",
    items: [
      "Diriger une structure dans ses dimensions stratégiques, administratives, humaines et territoriales.",
      "Animer une équipe et organiser le travail au quotidien.",
      "Développer l'offre, les partenariats, la production et le reporting."
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
      title: band.title ?? 'Demandez un rappel pour vérifier l’adéquation du RPMS à votre projet',
      description:
        band.description ??
        'En quelques minutes, vous pouvez clarifier le titre, le niveau visé, le format 100 % distanciel et les compétences travaillées.',
      supportLine:
        band.supportLine ??
        "Vous repartez avec une vision plus nette du programme et de son cadre officiel."
    }
  }

  return {
    eyebrow: 'Parler de votre projet',
    title: 'Demandez un rappel pour vérifier l’adéquation du RPMS à votre projet',
    description:
      'En quelques minutes, vous pouvez clarifier le titre, le niveau visé, le format 100 % distanciel et les compétences travaillées.',
    supportLine: "Vous repartez avec une vision plus nette du programme et de son cadre officiel."
  }
})

const featuredBlocks = computed(() => (program.value?.blocks ?? []).slice(0, 3))
</script>

<template>
  <div class="space-y-12 sm:space-y-14 lg:space-y-16">
    <p v-if="loading" class="text-sm text-muted-foreground">Actualisation du contenu...</p>
    <p
      v-else-if="errorMessage"
      class="rounded-[1rem] border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive"
    >
      {{ errorMessage }}
    </p>

    <template v-else>
      <section
        class="page-hero grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.08fr,0.92fr] lg:p-10"
        v-motion
        :initial="motionVariants.block.initial"
        :enter="motionVariants.block.enter"
      >
        <div class="space-y-6">
          <div class="space-y-4">
            <p class="kicker">{{ heroEyebrow }}</p>
            <h1 class="editorial-title max-w-4xl text-[clamp(2.45rem,5vw,4.3rem)] text-foreground">
              {{ heroTitle }}
            </h1>
            <p class="max-w-3xl text-base leading-8 text-muted-foreground sm:text-[1.05rem]">
              {{ heroSubtitle }}
            </p>
          </div>

          <p class="max-w-2xl text-base font-medium leading-7 text-foreground sm:text-[1.02rem]">
            {{ heroFitLine }}
          </p>

          <div class="flex flex-col gap-3 sm:flex-row">
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

          <TrustStrip :items="trustStripItems" />
        </div>

        <aside class="page-cut p-6 sm:p-7">
          <div class="space-y-4">
            <p class="kicker">Lecture rapide</p>
            <h2 class="text-[clamp(1.7rem,3vw,2.4rem)] font-semibold leading-tight tracking-[-0.04em] text-foreground">
              Le RPMS articule activité, équipe, structure et résultats.
            </h2>
            <p class="text-sm leading-7 text-muted-foreground sm:text-[0.98rem]">
              Le site ne cherche pas à dramatiser le titre. Il donne un cadre lisible pour voir ce
              que le RPMS prépare réellement à piloter.
            </p>
          </div>

          <div class="mt-6 grid gap-3">
            <article
              v-for="(item, index) in highlights"
              :key="item.title"
              class="elevated-item rounded-[1rem] p-4"
              v-motion
              :initial="motionVariants.pop.initial"
              :enter="staggerEnter(index, 60, 50)"
            >
              <component :is="highlightIcons[index % highlightIcons.length]" class="h-5 w-5 text-primary" />
              <h3 class="mt-3 text-base font-semibold leading-tight text-foreground">
                {{ item.title }}
              </h3>
              <p class="mt-2 text-sm leading-6 text-muted-foreground">
                {{ item.text }}
              </p>
            </article>
          </div>
        </aside>
      </section>

      <section class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div
          v-for="(item, index) in proofItems"
          :key="item.label"
          v-motion
          :initial="motionVariants.pop.initial"
          :enter="staggerEnter(index, 60, 40)"
        >
          <ImpactStat :value="item.value" :label="item.label" :note="item.note" />
        </div>
      </section>

      <section class="grid gap-6 lg:grid-cols-[0.94fr,1.06fr]">
        <div class="space-y-6">
          <SectionTitle
            eyebrow="Ce que le RPMS prépare"
            title="Le titre met en cohérence management, organisation et performance."
            description="La lecture du programme devient plus simple quand on regarde d'abord ce qu'il structure dans le rôle."
          />

          <article class="page-cut p-6 sm:p-7">
            <p class="kicker">{{ valueSection.eyebrow }}</p>
            <h2 class="mt-4 text-[clamp(1.75rem,3vw,2.45rem)] font-semibold leading-tight tracking-[-0.04em] text-foreground">
              {{ valueSection.title }}
            </h2>
            <p class="mt-4 text-sm leading-7 text-muted-foreground sm:text-[1rem]">
              {{ valueSection.description }}
            </p>

            <div class="mt-6 space-y-3">
              <div
                v-for="item in valueSection.items"
                :key="item"
                class="elevated-item flex items-start gap-3 rounded-[1rem] p-4"
              >
                <span class="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-primary"></span>
                <span class="text-sm leading-6 text-foreground">{{ item }}</span>
              </div>
            </div>
          </article>
        </div>

        <div class="space-y-6">
          <SectionTitle
            eyebrow="Compétences"
            title="Quatre familles suffisent pour lire la portée du RPMS."
            description="Ces repères donnent une vue plus nette du rôle visé avant d'entrer dans le détail des blocs."
          />

          <div class="grid gap-4 sm:grid-cols-2">
            <article
              v-for="(cluster, index) in competencyClusters"
              :key="cluster"
              class="page-cut p-5"
              v-motion
              :initial="motionVariants.block.initial"
              :enter="staggerEnter(index, 60, 40)"
            >
              <div class="flex items-center gap-3">
                <span class="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-sm font-semibold text-secondary">
                  {{ index + 1 }}
                </span>
                <h3 class="text-base font-semibold leading-tight text-foreground">
                  {{ cluster }}
                </h3>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section class="grid gap-6 lg:grid-cols-[0.9fr,1.1fr]">
        <div class="space-y-5">
          <SectionTitle
            eyebrow="Blocs de compétences"
            title="Trois blocs suffisent pour comprendre la logique du programme."
            description="Le détail complet du programme précise ensuite l'écosystème, le territoire, l'équipe, l'offre, la production et le reporting."
          />

          <p class="text-sm leading-7 text-muted-foreground sm:text-[1rem]">
            Le programme complet conserve tous les blocs et leurs contenus. Cette première lecture
            sert surtout à comprendre comment le titre organise les responsabilités.
          </p>

          <RouterLink to="/programme" class="inline-flex">
            <Button variant="outline">
              Voir le programme
              <ArrowRight class="ml-2 h-4 w-4" />
            </Button>
          </RouterLink>
        </div>

        <div class="grid gap-4">
          <article
            v-for="(block, index) in featuredBlocks"
            :key="block.code"
            class="page-cut p-5 sm:p-6"
            v-motion
            :initial="motionVariants.block.initial"
            :enter="staggerEnter(index, 60, 60)"
          >
            <p class="kicker">{{ block.code }}</p>
            <h3 class="mt-3 text-[1.12rem] font-semibold leading-tight tracking-[-0.03em] text-foreground">
              {{ block.title }}
            </h3>
            <p class="mt-3 whitespace-pre-line text-sm leading-7 text-muted-foreground">
              {{ block.details }}
            </p>
          </article>
        </div>
      </section>

      <section class="grid gap-6 lg:grid-cols-[0.92fr,1.08fr]">
        <div class="space-y-5">
          <SectionTitle
            eyebrow="Avant de vous décider"
            title="Un échange utile sert surtout à cadrer votre situation."
            description="Le rappel ne remplace pas la lecture du programme. Il aide à vérifier si le titre, le format et les responsabilités travaillées correspondent vraiment à votre projet."
          />
        </div>

        <div class="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
          <article
            v-for="(item, index) in journey"
            :key="item.title"
            class="page-cut p-5"
            v-motion
            :initial="motionVariants.block.initial"
            :enter="staggerEnter(index, 60, 50)"
          >
            <div class="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-semibold text-secondary">
              {{ index + 1 }}
            </div>
            <h3 class="mt-4 text-[1.06rem] font-semibold leading-tight text-foreground">
              {{ item.title }}
            </h3>
            <p class="mt-3 text-sm leading-7 text-muted-foreground">
              {{ item.text }}
            </p>
          </article>
        </div>
      </section>

      <section class="arch-cta p-6 sm:p-8 lg:p-10">
        <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div class="space-y-3">
            <p class="kicker">{{ contactBand.eyebrow }}</p>
            <h2 class="editorial-title max-w-3xl text-[clamp(1.95rem,3vw,2.85rem)] text-foreground">
              {{ contactBand.title }}
            </h2>
            <p class="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-[1rem]">
              {{ contactBand.description }}
            </p>
            <p class="max-w-2xl text-sm leading-7 text-muted-foreground">
              {{ contactBand.supportLine }}
            </p>
          </div>

          <div class="flex flex-col gap-3 sm:flex-row">
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
    </template>
  </div>
</template>
