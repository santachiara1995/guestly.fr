<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowRight } from 'lucide-vue-next'

import { useExperienceVariant } from '@/composables/use-experience-variant'
import SectionTitle from '@/components/section-title.vue'
import TrustStrip from '@/components/visual/trust-strip.vue'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'
import { motionVariants, staggerEnter } from '@/lib/motion'

const program = ref(null)
const site = ref({
  program: {}
})
const loading = ref(true)
const errorMessage = ref('')

const { experienceVariant, toWithExperience } = useExperienceVariant()

onMounted(async () => {
  try {
    const [programPayload, sitePayload] = await Promise.all([api.getProgram('rpms'), api.getSite()])
    program.value = programPayload
    site.value = sitePayload
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Programme introuvable.'
  } finally {
    loading.value = false
  }
})

const pageCopy = computed(() => site.value.program ?? {})
const activeVariant = computed(() => experienceVariant.value ?? 'orientation-hub')

const contactLink = computed(() => toWithExperience('/contact'))
const accessLink = computed(() => toWithExperience('/acces-et-accompagnement'))
const faqLink = computed(() => toWithExperience('/faq'))

const trustStripItems = computed(() => [
  program.value?.rncpCode ?? 'RNCP38575',
  program.value?.levelLabel ?? 'Niveau 5 / Bac+2',
  program.value?.formatLabel ?? '100 % distanciel',
  program.value?.supportLabel ?? 'Accompagnement pédagogique'
])

const atAGlance = computed(() => [
  { label: 'Référence', value: program.value?.rncpCode ?? 'RNCP38575' },
  { label: 'Niveau', value: program.value?.levelLabel ?? 'Niveau 5 / Bac+2' },
  { label: 'Modalité', value: program.value?.formatLabel ?? '100 % distanciel' },
  { label: 'Cadre', value: program.value?.rhythmLabel ?? 'E-learning' }
])

const objectiveCards = computed(() => program.value?.objectiveSummary ?? [])
const professionalScope = computed(() => program.value?.professionalScope ?? [])
const blocks = computed(() => program.value?.blocks ?? [])
const featuredBlocks = computed(() => blocks.value.slice(0, 3))

const orientationContent = computed(() => {
  const hero = pageCopy.value.hero ?? {}
  const summarySection = pageCopy.value.summarySection ?? {}
  const competencySection = pageCopy.value.competencySection ?? {}
  const blocksSection = pageCopy.value.blocksSection ?? {}
  const ctaBand = pageCopy.value.ctaBand ?? {}

  return {
    hero: {
      eyebrow: hero.eyebrow ?? 'Programme RPMS',
      title: hero.title ?? 'Le programme comme carte de lecture du titre, du rôle et des blocs.',
      description:
        hero.description ??
        "Cette page donne une lecture factuelle du RPMS : repères officiels, responsabilités travaillées et blocs de compétences.",
      note:
        hero.note ??
        "Commencez par les repères du titre, puis utilisez les blocs pour comprendre ce que le RPMS prépare concrètement."
    },
    summarySection: {
      eyebrow: summarySection.eyebrow ?? "Vue d'ensemble",
      title: summarySection.title ?? 'Les points à regarder avant de parcourir chaque bloc.',
      description:
        summarySection.description ??
        "Le titre, le niveau, le format et les objectifs résument déjà la logique du parcours avant d'entrer dans le détail."
    },
    competencySection: {
      eyebrow: competencySection.eyebrow ?? 'Ce que cela veut dire en pratique',
      title:
        competencySection.title ??
        "Le RPMS prépare un rôle polyvalent de pilotage, d'organisation et de reporting.",
      description:
        competencySection.description ??
        "Ces repères donnent une traduction concrète du rôle visé avant la lecture détaillée du programme."
    },
    blocksSection: {
      eyebrow: blocksSection.eyebrow ?? 'Blocs de compétences',
      title: blocksSection.title ?? 'Le détail du programme, bloc par bloc.',
      description:
        blocksSection.description ??
        "Chaque bloc éclaire une partie du rôle : structure, territoire, équipe, offre, production et résultats."
    },
    ctaBand: {
      eyebrow: ctaBand.eyebrow ?? 'Après la lecture du programme',
      title: ctaBand.title ?? 'Vérifier si ce cadre correspond à votre projet',
      description:
        ctaBand.description ??
        "Si cette lecture correspond à ce que vous cherchez, vous pouvez demander un rappel pour faire le point sur votre situation."
    }
  }
})

const careerJourneyContent = computed(() => ({
  hero: {
    eyebrow: 'Programme RPMS',
    title: 'Lisez le programme comme le chapitre où le RPMS devient concret.',
    description:
      'Cette version suit un fil simple : repères du titre, responsabilités travaillées, puis blocs de compétences.',
    note:
      "Le but est d'avancer dans le programme sans perdre le cadre officiel qui donne sens à chaque bloc."
  },
  panel: {
    kicker: 'Le programme en trois chapitres',
    title: 'Une progression qui garde le fil entre cadre, rôle et contenu.',
    chapters: [
      {
        label: 'Chapitre 1',
        title: 'Relire le cadre officiel',
        text: 'RNCP38575, niveau 5 / Bac+2, 100 % distanciel, e-learning et accompagnement pédagogique.'
      },
      {
        label: 'Chapitre 2',
        title: 'Nommer le rôle préparé',
        text: "Pilotage d'activité, management, organisation, territoire, production et reporting."
      },
      {
        label: 'Chapitre 3',
        title: 'Entrer dans les blocs',
        text: 'Lire ensuite comment ces responsabilités se traduisent dans le programme.'
      }
    ]
  },
  factsSection: {
    eyebrow: 'Chapitre 1',
    title: 'Reprendre les repères avant le détail du programme.',
    description:
      'Le programme se lit mieux quand son cadre institutionnel est posé avant les blocs.'
  },
  roleSection: {
    eyebrow: 'Chapitre 2',
    title: 'Le rôle préparé donne un fil de lecture aux objectifs et aux blocs.',
    description:
      "Les objectifs résument la progression attendue avant d'entrer dans chaque partie du programme."
  },
  blockSection: {
    eyebrow: 'Chapitre 3',
    title: 'Les blocs détaillent ensuite la traduction concrète du RPMS.',
    description:
      'Chaque bloc éclaire une partie du rôle sans rompre la continuité de lecture.'
  },
  ctaBand: {
    eyebrow: 'Après le chapitre programme',
    title: 'Passez ensuite au point de situation ou aux modalités d’accès.',
    description:
      "Vous pouvez prolonger cette lecture par les modalités d'accès ou demander un rappel pour remettre ce cadre dans votre projet."
  }
}))

const marketplaceContent = computed(() => ({
  hero: {
    eyebrow: 'Programme RPMS',
    title: 'Programme RPMS : lecture rapide par fiche, rôle et blocs.',
    description:
      "Cette version met les repères comparables au premier plan : cadre officiel, lecture du rôle et aperçu des blocs.",
    note:
      "Si vous cherchez une lecture plus directe, commencez par les fiches, puis revenez au détail bloc par bloc."
  },
  panel: {
    kicker: 'Entrées rapides',
    title: "Trois portes d'entrée pour relire le programme sans parcours linéaire.",
    entries: [
      {
        title: 'Cadre officiel',
        text: 'Titre, niveau, RNCP, modalité et accompagnement.'
      },
      {
        title: 'Rôle visé',
        text: "Pilotage, management, organisation, territoire, production et reporting."
      },
      {
        title: 'Blocs repères',
        text: 'Un aperçu immédiat des premiers blocs pour qualifier la suite.'
      }
    ]
  },
  boardSection: {
    eyebrow: 'Lecture par fiche',
    title: 'Trois vues suffisent pour qualifier rapidement le programme.',
    description:
      'Vous pouvez entrer par les repères, par le rôle ou par les blocs selon votre manière de décider.'
  },
  detailSection: {
    eyebrow: 'Détail bloc par bloc',
    title: 'Revenir ensuite au détail complet du programme.',
    description:
      'Les fiches rapides donnent la tonalité, puis les blocs apportent la lecture complète.'
  },
  actionSection: {
    eyebrow: 'Sorties utiles',
    title: 'Choisissez ensuite le relais le plus utile pour votre projet.',
    description:
      'Le programme détaillé mène soit aux modalités d’accès, soit à une demande de rappel contextualisée.'
  },
  ctaBand: {
    eyebrow: 'Après la fiche programme',
    title: 'Conservez le même cadre pour la suite du parcours.',
    description:
      "Le programme reste lié au titre, à son format et à son accompagnement pédagogique jusque dans l'échange."
  }
}))

const marketplaceBoards = computed(() => [
  {
    eyebrow: 'Cadre officiel',
    title: 'Comparer les repères utiles.',
    description: "Le programme garde d'abord une lecture institutionnelle et factuelle.",
    items: atAGlance.value.map((item) => `${item.label} : ${item.value}`)
  },
  {
    eyebrow: 'Rôle préparé',
    title: 'Voir ce que le programme travaille.',
    description:
      "Les responsabilités donnent une lecture directe du niveau de polyvalence visé.",
    items: professionalScope.value
  },
  {
    eyebrow: 'Blocs repères',
    title: 'Commencer par les premiers blocs.',
    description:
      "Trois blocs suffisent pour comprendre la logique d'ensemble avant la lecture complète.",
    items: featuredBlocks.value.map((block) => `${block.code} · ${block.title}`)
  }
])
</script>

<template>
  <div class="space-y-12 sm:space-y-14 lg:space-y-16">
    <p v-if="loading" class="text-sm text-muted-foreground">Chargement du programme...</p>
    <p
      v-else-if="errorMessage"
      class="rounded-[1rem] border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive"
    >
      {{ errorMessage }}
    </p>

    <template v-else-if="program">
      <template v-if="activeVariant === 'career-journey'">
        <section
          class="page-hero grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.02fr,0.98fr] lg:p-10"
          v-motion
          :initial="motionVariants.block.initial"
          :enter="motionVariants.block.enter"
        >
          <div class="space-y-6">
            <div class="space-y-4">
              <p class="kicker">{{ careerJourneyContent.hero.eyebrow }}</p>
              <h1 class="editorial-title max-w-4xl text-[clamp(2.3rem,4.8vw,4rem)] text-foreground">
                {{ careerJourneyContent.hero.title }}
              </h1>
              <p class="max-w-3xl text-base leading-8 text-muted-foreground sm:text-[1.05rem]">
                {{ careerJourneyContent.hero.description }}
              </p>
            </div>

            <p class="max-w-2xl text-base font-medium leading-7 text-foreground sm:text-[1.02rem]">
              {{ careerJourneyContent.hero.note }}
            </p>

            <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button :as="RouterLink" :to="contactLink" size="lg">
                Être rappelé
                <ArrowRight class="ml-2 h-4 w-4" />
              </Button>
              <Button :as="RouterLink" :to="accessLink" size="lg" variant="outline">
                Voir les modalités d'accès
              </Button>
            </div>

            <TrustStrip :items="trustStripItems" />
          </div>

          <aside class="page-cut p-6 sm:p-7">
            <p class="kicker">{{ careerJourneyContent.panel.kicker }}</p>
            <h2 class="mt-4 text-[clamp(1.7rem,3vw,2.35rem)] font-semibold leading-tight tracking-[-0.04em] text-foreground">
              {{ careerJourneyContent.panel.title }}
            </h2>

            <div class="mt-6 grid gap-3">
              <article
                v-for="(chapter, index) in careerJourneyContent.panel.chapters"
                :key="chapter.label"
                class="elevated-item rounded-[1rem] p-4"
                v-motion
                :initial="motionVariants.pop.initial"
                :enter="staggerEnter(index, 55, 40)"
              >
                <p class="detail-key">{{ chapter.label }}</p>
                <h3 class="mt-2 text-base font-semibold leading-tight text-foreground">
                  {{ chapter.title }}
                </h3>
                <p class="mt-2 text-sm leading-6 text-muted-foreground">
                  {{ chapter.text }}
                </p>
              </article>
            </div>
          </aside>
        </section>

        <section class="space-y-6">
          <SectionTitle
            :description="careerJourneyContent.factsSection.description"
            :eyebrow="careerJourneyContent.factsSection.eyebrow"
            :title="careerJourneyContent.factsSection.title"
          />

          <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div
              v-for="(item, index) in atAGlance"
              :key="item.label"
              class="elevated-item rounded-[1rem] p-4"
              v-motion
              :initial="motionVariants.pop.initial"
              :enter="staggerEnter(index, 55, 35)"
            >
              <p class="detail-key">{{ item.label }}</p>
              <p class="mt-2 text-sm font-semibold leading-6 text-foreground">
                {{ item.value }}
              </p>
            </div>
          </div>
        </section>

        <section class="grid gap-6 lg:grid-cols-[0.98fr,1.02fr]">
          <div class="space-y-6">
            <SectionTitle
              :description="careerJourneyContent.roleSection.description"
              :eyebrow="careerJourneyContent.roleSection.eyebrow"
              :title="careerJourneyContent.roleSection.title"
            />

            <div class="grid gap-4">
              <article
                v-for="(item, index) in objectiveCards"
                :key="item"
                class="page-cut p-5 sm:p-6"
                v-motion
                :initial="motionVariants.block.initial"
                :enter="staggerEnter(index, 55, 40)"
              >
                <p class="detail-key">Point {{ index + 1 }}</p>
                <p class="mt-3 text-sm leading-7 text-foreground">
                  {{ item }}
                </p>
              </article>
            </div>
          </div>

          <article class="page-cut p-6 sm:p-7">
            <p class="kicker">Le rôle préparé</p>
            <h2 class="mt-4 text-[clamp(1.7rem,3vw,2.25rem)] font-semibold leading-tight tracking-[-0.04em] text-foreground">
              Les responsabilités restent visibles avant les blocs.
            </h2>

            <div class="mt-6 grid gap-3">
              <article
                v-for="(scope, index) in professionalScope"
                :key="scope"
                class="elevated-item rounded-[1rem] p-4"
                v-motion
                :initial="motionVariants.pop.initial"
                :enter="staggerEnter(index, 55, 35)"
              >
                <div class="flex items-start gap-3">
                  <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold text-secondary">
                    {{ index + 1 }}
                  </span>
                  <p class="text-sm leading-6 text-foreground">
                    {{ scope }}
                  </p>
                </div>
              </article>
            </div>
          </article>
        </section>

        <section class="space-y-6">
          <SectionTitle
            :description="careerJourneyContent.blockSection.description"
            :eyebrow="careerJourneyContent.blockSection.eyebrow"
            :title="careerJourneyContent.blockSection.title"
          />

          <div class="grid gap-4 xl:grid-cols-2">
            <article
              v-for="(block, index) in blocks"
              :key="block.code"
              class="page-cut p-5 sm:p-6"
              v-motion
              :initial="motionVariants.block.initial"
              :enter="staggerEnter(index, 55, 35)"
            >
              <p class="kicker">{{ block.code }}</p>
              <h3 class="mt-3 text-[1.08rem] font-semibold leading-tight tracking-[-0.03em] text-foreground">
                {{ block.title }}
              </h3>
              <p class="mt-3 whitespace-pre-line text-sm leading-7 text-muted-foreground">
                {{ block.details }}
              </p>
            </article>
          </div>
        </section>

        <section class="arch-cta p-6 sm:p-8 lg:p-10">
          <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div class="space-y-3">
              <p class="kicker">{{ careerJourneyContent.ctaBand.eyebrow }}</p>
              <h2 class="editorial-title max-w-3xl text-[clamp(1.95rem,3vw,2.8rem)] text-foreground">
                {{ careerJourneyContent.ctaBand.title }}
              </h2>
              <p class="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-[1rem]">
                {{ careerJourneyContent.ctaBand.description }}
              </p>
            </div>

            <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button :as="RouterLink" :to="contactLink" size="lg">
                Être rappelé
                <ArrowRight class="ml-2 h-4 w-4" />
              </Button>
              <Button :as="RouterLink" :to="accessLink" size="lg" variant="outline">
                Voir les modalités d'accès
              </Button>
            </div>
          </div>
        </section>
      </template>

      <template v-else-if="activeVariant === 'program-first-marketplace'">
        <section
          class="page-hero grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.04fr,0.96fr] lg:p-10"
          v-motion
          :initial="motionVariants.block.initial"
          :enter="motionVariants.block.enter"
        >
          <div class="space-y-6">
            <div class="space-y-4">
              <p class="kicker">{{ marketplaceContent.hero.eyebrow }}</p>
              <h1 class="editorial-title max-w-4xl text-[clamp(2.3rem,4.8vw,4rem)] text-foreground">
                {{ marketplaceContent.hero.title }}
              </h1>
              <p class="max-w-3xl text-base leading-8 text-muted-foreground sm:text-[1.05rem]">
                {{ marketplaceContent.hero.description }}
              </p>
            </div>

            <p class="max-w-2xl text-base font-medium leading-7 text-foreground sm:text-[1.02rem]">
              {{ marketplaceContent.hero.note }}
            </p>

            <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button :as="RouterLink" :to="contactLink" size="lg">
                Être rappelé
                <ArrowRight class="ml-2 h-4 w-4" />
              </Button>
              <Button :as="RouterLink" :to="accessLink" size="lg" variant="outline">
                Voir les modalités d'accès
              </Button>
            </div>

            <TrustStrip :items="trustStripItems" />
          </div>

          <aside class="page-cut p-6 sm:p-7">
            <p class="kicker">{{ marketplaceContent.panel.kicker }}</p>
            <h2 class="mt-4 text-[clamp(1.7rem,3vw,2.35rem)] font-semibold leading-tight tracking-[-0.04em] text-foreground">
              {{ marketplaceContent.panel.title }}
            </h2>

            <div class="mt-6 grid gap-3">
              <article
                v-for="(entry, index) in marketplaceContent.panel.entries"
                :key="entry.title"
                class="elevated-item rounded-[1rem] p-4"
                v-motion
                :initial="motionVariants.pop.initial"
                :enter="staggerEnter(index, 55, 40)"
              >
                <h3 class="text-base font-semibold leading-tight text-foreground">
                  {{ entry.title }}
                </h3>
                <p class="mt-2 text-sm leading-6 text-muted-foreground">
                  {{ entry.text }}
                </p>
              </article>
            </div>
          </aside>
        </section>

        <section class="space-y-6">
          <SectionTitle
            :description="marketplaceContent.boardSection.description"
            :eyebrow="marketplaceContent.boardSection.eyebrow"
            :title="marketplaceContent.boardSection.title"
          />

          <div class="grid gap-4 xl:grid-cols-3">
            <article
              v-for="(board, index) in marketplaceBoards"
              :key="board.title"
              class="page-cut p-6 sm:p-7"
              v-motion
              :initial="motionVariants.block.initial"
              :enter="staggerEnter(index, 55, 35)"
            >
              <p class="kicker">{{ board.eyebrow }}</p>
              <h2 class="mt-4 text-[clamp(1.45rem,2.6vw,1.95rem)] font-semibold leading-tight tracking-[-0.04em] text-foreground">
                {{ board.title }}
              </h2>
              <p class="mt-3 text-sm leading-7 text-muted-foreground">
                {{ board.description }}
              </p>

              <ul class="mt-5 grid gap-3">
                <li
                  v-for="item in board.items"
                  :key="item"
                  class="rounded-[1rem] border border-border/70 bg-background/80 px-4 py-3 text-sm leading-6 text-foreground"
                >
                  {{ item }}
                </li>
              </ul>
            </article>
          </div>
        </section>

        <section class="space-y-6">
          <SectionTitle
            :description="marketplaceContent.detailSection.description"
            :eyebrow="marketplaceContent.detailSection.eyebrow"
            :title="marketplaceContent.detailSection.title"
          />

          <div class="grid gap-4 xl:grid-cols-2">
            <article
              v-for="(block, index) in blocks"
              :key="block.code"
              class="page-cut p-5 sm:p-6"
              v-motion
              :initial="motionVariants.block.initial"
              :enter="staggerEnter(index, 55, 35)"
            >
              <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p class="kicker">{{ block.code }}</p>
                  <h3 class="mt-3 text-[1.08rem] font-semibold leading-tight tracking-[-0.03em] text-foreground">
                    {{ block.title }}
                  </h3>
                </div>
                <span class="inline-flex w-fit rounded-full border border-border bg-background px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  Détail
                </span>
              </div>
              <p class="mt-3 whitespace-pre-line text-sm leading-7 text-muted-foreground">
                {{ block.details }}
              </p>
            </article>
          </div>
        </section>

        <section class="grid gap-4 md:grid-cols-3">
          <article class="page-cut p-5 sm:p-6">
            <p class="detail-key">Relais 1</p>
            <h2 class="mt-3 text-[1.08rem] font-semibold leading-tight text-foreground">
              Vérifier les modalités d'accès
            </h2>
            <p class="mt-3 text-sm leading-7 text-muted-foreground">
              Poursuivez par le cadre d'accès et d'accompagnement si vous voulez confirmer le format.
            </p>
          </article>
          <article class="page-cut p-5 sm:p-6">
            <p class="detail-key">Relais 2</p>
            <h2 class="mt-3 text-[1.08rem] font-semibold leading-tight text-foreground">
              Poser une question ciblée
            </h2>
            <p class="mt-3 text-sm leading-7 text-muted-foreground">
              Demandez un rappel si le programme est déjà clair et qu’il reste un point à contextualiser.
            </p>
          </article>
          <article class="page-cut p-5 sm:p-6">
            <p class="detail-key">Relais 3</p>
            <h2 class="mt-3 text-[1.08rem] font-semibold leading-tight text-foreground">
              Revenir à la FAQ
            </h2>
            <p class="mt-3 text-sm leading-7 text-muted-foreground">
              Utilisez la FAQ pour lever une question simple avant de passer au contact.
            </p>
          </article>
        </section>

        <section class="arch-cta p-6 sm:p-8 lg:p-10">
          <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div class="space-y-3">
              <p class="kicker">{{ marketplaceContent.ctaBand.eyebrow }}</p>
              <h2 class="editorial-title max-w-3xl text-[clamp(1.95rem,3vw,2.8rem)] text-foreground">
                {{ marketplaceContent.ctaBand.title }}
              </h2>
              <p class="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-[1rem]">
                {{ marketplaceContent.ctaBand.description }}
              </p>
            </div>

            <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button :as="RouterLink" :to="contactLink" size="lg">
                Être rappelé
                <ArrowRight class="ml-2 h-4 w-4" />
              </Button>
              <Button :as="RouterLink" :to="accessLink" size="lg" variant="outline">
                Voir les modalités d'accès
              </Button>
              <Button :as="RouterLink" :to="faqLink" size="lg" variant="ghost">
                Voir la FAQ
              </Button>
            </div>
          </div>
        </section>
      </template>

      <template v-else>
        <section
          class="page-hero grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.02fr,0.98fr] lg:p-10"
          v-motion
          :initial="motionVariants.block.initial"
          :enter="motionVariants.block.enter"
        >
          <div class="space-y-6">
            <div class="space-y-4">
              <p class="kicker">{{ orientationContent.hero.eyebrow }}</p>
              <h1 class="editorial-title max-w-4xl text-[clamp(2.35rem,4.8vw,4.1rem)] text-foreground">
                {{ program.title }}
              </h1>
              <p class="max-w-3xl text-base leading-8 text-muted-foreground sm:text-[1.05rem]">
                {{ orientationContent.hero.description }}
              </p>
            </div>

            <p class="max-w-2xl text-base font-medium leading-7 text-foreground sm:text-[1.02rem]">
              {{ orientationContent.hero.note }}
            </p>

            <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button :as="RouterLink" :to="contactLink" size="lg">
                Être rappelé
                <ArrowRight class="ml-2 h-4 w-4" />
              </Button>
              <Button :as="RouterLink" :to="accessLink" size="lg" variant="outline">
                Voir les modalités d'accès
              </Button>
            </div>

            <TrustStrip :items="trustStripItems" />
          </div>

          <aside class="page-cut p-6 sm:p-7">
            <p class="kicker">{{ orientationContent.summarySection.eyebrow }}</p>
            <h2 class="mt-4 text-[clamp(1.7rem,3vw,2.35rem)] font-semibold leading-tight tracking-[-0.04em] text-foreground">
              {{ orientationContent.summarySection.title }}
            </h2>
            <p class="mt-4 text-sm leading-7 text-muted-foreground">
              {{ orientationContent.summarySection.description }}
            </p>

            <div class="mt-6 grid gap-3 sm:grid-cols-2">
              <div
                v-for="(item, index) in atAGlance"
                :key="item.label"
                class="elevated-item rounded-[1rem] p-4"
                v-motion
                :initial="motionVariants.pop.initial"
                :enter="staggerEnter(index, 55, 40)"
              >
                <p class="detail-key">{{ item.label }}</p>
                <p class="mt-2 text-sm font-semibold leading-6 text-foreground">
                  {{ item.value }}
                </p>
              </div>
            </div>
          </aside>
        </section>

        <section class="space-y-6">
          <SectionTitle
            :description="orientationContent.summarySection.description"
            :eyebrow="orientationContent.summarySection.eyebrow"
            :title="orientationContent.summarySection.title"
          />

          <div class="grid gap-4 md:grid-cols-2">
            <article
              v-for="(item, index) in objectiveCards"
              :key="item"
              class="page-cut p-5 sm:p-6"
              v-motion
              :initial="motionVariants.block.initial"
              :enter="staggerEnter(index, 55, 40)"
            >
              <p class="kicker">Point {{ index + 1 }}</p>
              <p class="mt-3 text-sm leading-7 text-foreground">
                {{ item }}
              </p>
            </article>
          </div>
        </section>

        <section class="space-y-6">
          <SectionTitle
            :description="orientationContent.competencySection.description"
            :eyebrow="orientationContent.competencySection.eyebrow"
            :title="orientationContent.competencySection.title"
          />

          <div class="grid gap-4 sm:grid-cols-2">
            <article
              v-for="(scope, index) in professionalScope"
              :key="scope"
              class="page-cut p-5"
              v-motion
              :initial="motionVariants.block.initial"
              :enter="staggerEnter(index, 55, 40)"
            >
              <div class="flex items-center gap-3">
                <span class="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-sm font-semibold text-secondary">
                  {{ index + 1 }}
                </span>
                <h3 class="text-base font-semibold leading-tight text-foreground">
                  {{ scope }}
                </h3>
              </div>
            </article>
          </div>
        </section>

        <section class="space-y-6">
          <SectionTitle
            :description="orientationContent.blocksSection.description"
            :eyebrow="orientationContent.blocksSection.eyebrow"
            :title="orientationContent.blocksSection.title"
          />

          <div class="grid gap-4 xl:grid-cols-2">
            <article
              v-for="(block, index) in blocks"
              :key="block.code"
              class="page-cut p-5 sm:p-6"
              v-motion
              :initial="motionVariants.block.initial"
              :enter="staggerEnter(index, 55, 45)"
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

        <section class="arch-cta p-6 sm:p-8 lg:p-10">
          <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div class="space-y-3">
              <p class="kicker">{{ orientationContent.ctaBand.eyebrow }}</p>
              <h2 class="editorial-title max-w-3xl text-[clamp(1.95rem,3vw,2.8rem)] text-foreground">
                {{ orientationContent.ctaBand.title }}
              </h2>
              <p class="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-[1rem]">
                {{ orientationContent.ctaBand.description }}
              </p>
            </div>

            <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button :as="RouterLink" :to="contactLink" size="lg">
                Être rappelé
                <ArrowRight class="ml-2 h-4 w-4" />
              </Button>
              <Button :as="RouterLink" :to="accessLink" size="lg" variant="outline">
                Voir les modalités d'accès
              </Button>
            </div>
          </div>
        </section>
      </template>
    </template>
  </div>
</template>
