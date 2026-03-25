<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowRight } from 'lucide-vue-next'

import { useExperienceVariant } from '@/composables/use-experience-variant'
import SectionTitle from '@/components/section-title.vue'
import { Button } from '@/components/ui/button'
import ImpactStat from '@/components/visual/impact-stat.vue'
import TrustStrip from '@/components/visual/trust-strip.vue'
import { api } from '@/lib/api'
import { motionVariants, staggerEnter } from '@/lib/motion'
const { experienceVariant, toWithExperience } = useExperienceVariant()
const program = ref(null)
const site = ref({
  home: {}
})
const loading = ref(true)
const errorMessage = ref('')

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

const activeVariant = computed(() => experienceVariant.value ?? 'orientation-hub')
const programLink = computed(() => toWithExperience('/programme'))
const contactLink = computed(() => toWithExperience('/contact'))

const homeCopy = computed(() => site.value.home ?? {})

const hero = computed(() => {
  const value = homeCopy.value.hero ?? {}
  return {
    eyebrow: value.eyebrow ?? 'Titre professionnel RPMS - RNCP38575',
    title:
      value.title ??
      'Vérifiez si le RPMS correspond à votre projet de pilotage ou de management.',
    lead:
      value.lead ??
      'Titre professionnel Responsable petite et moyenne structure (RPMS), niveau 5 (Bac+2), en 100 % distanciel avec accompagnement pédagogique.',
    fitLine:
      value.fitLine ??
      "Cette première lecture sert à comprendre ce que le titre prépare réellement : activité, équipe, organisation, territoire, production et reporting.",
    decisionTitle: value.decisionTitle ?? 'Ce que vous allez vérifier ici',
    decisionText:
      value.decisionText ??
      "Lire le titre, comprendre les responsabilités travaillées, puis décider si le format et l'accompagnement correspondent à votre projet.",
    decisionPoints: Array.isArray(value.decisionPoints)
      ? value.decisionPoints
      : [
          'Commencer par les repères officiels du titre.',
          'Relier ces repères aux responsabilités visées.',
          'Choisir ensuite entre la lecture détaillée du programme et une demande de rappel.'
        ]
  }
})

const proofItems = computed(() => {
  const items = homeCopy.value.proofItems
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
      note: "Titre professionnel reconnu par l'État"
    },
    {
      value: program.value?.formatLabel ?? '100 % distanciel',
      label: 'Modalité',
      note: 'E-learning avec accompagnement pédagogique'
    }
  ]
})

const orientationSection = computed(() => {
  const section = homeCopy.value.orientationSection ?? {}
  return {
    eyebrow: section.eyebrow ?? 'Ce que le titre structure',
    title:
      section.title ??
      "Une lecture claire du rôle visé avant d'entrer dans le détail du programme.",
    description:
      section.description ??
      "Le RPMS relie le pilotage quotidien à des responsabilités plus larges de management, d'organisation, de territoire et de performance.",
    pillars: Array.isArray(section.pillars)
      ? section.pillars
      : [
          {
            title: 'Piloter une activité',
            text: 'Priorités, performance, arbitrages, suivi et reporting.'
          },
          {
            title: 'Encadrer une équipe',
            text: 'Organisation du travail, animation, communication et coordination.'
          },
          {
            title: 'Inscrire la structure dans son environnement',
            text: "Territoire, partenariats, diffusion de l'offre et résultats."
          }
        ]
  }
})

const featuredBlocksIntro = computed(() => {
  const section = homeCopy.value.featuredBlocksIntro ?? {}
  return {
    eyebrow: section.eyebrow ?? 'Ce que vous retrouverez dans le programme',
    title: section.title ?? 'Trois blocs suffisent pour comprendre la logique du parcours.',
    description:
      section.description ??
      "Le programme complet précise ensuite l'écosystème, le territoire, l'équipe, l'offre, la production et le reporting."
  }
})

const journeySection = computed(() => {
  const section = homeCopy.value.journeySection ?? {}
  return {
    eyebrow: section.eyebrow ?? 'Comment décider',
    title:
      section.title ??
      "Trois repères suffisent pour voir si le RPMS mérite d'aller plus loin dans votre projet.",
    description:
      section.description ??
      "Le site vous aide d'abord à lire le titre, puis à comprendre les responsabilités travaillées, avant de passer à un échange si nécessaire.",
    steps: Array.isArray(section.steps)
      ? section.steps
      : [
          {
            title: 'Lire les repères officiels',
            text: 'Titre, RNCP, niveau, format et accompagnement pédagogique.'
          },
          {
            title: 'Comprendre le rôle préparé',
            text: "Pilotage d'activité, management d'équipe, organisation, territoire et reporting."
          },
          {
            title: 'Choisir votre prochaine étape',
            text: 'Poursuivre avec le programme ou demander un rappel pour clarifier votre projet.'
          }
        ]
  }
})

const contactBand = computed(() => {
  const band = homeCopy.value.contactBand ?? {}
  return {
    eyebrow: band.eyebrow ?? 'Parler de votre projet',
    title:
      band.title ??
      'Demandez un rappel si vous voulez vérifier ce cadre avec votre situation.',
    description:
      band.description ??
      "Le rappel sert à clarifier le titre, le format et les responsabilités travaillées avant toute décision.",
    supportLine:
      band.supportLine ??
      "Vous repartez avec une lecture plus nette du programme, de son cadre officiel et de son adéquation avec votre projet."
  }
})

const trustStripItems = computed(() => [
  program.value?.rncpCode ?? 'RNCP38575',
  program.value?.levelLabel ?? 'Niveau 5 / Bac+2',
  program.value?.formatLabel ?? '100 % distanciel',
  program.value?.supportLabel ?? 'Accompagnement pédagogique'
])

const featuredBlocks = computed(() => (program.value?.blocks ?? []).slice(0, 3))
const objectiveCards = computed(() => program.value?.objectiveSummary ?? [])
const professionalScope = computed(() => program.value?.professionalScope ?? [])

const careerJourneyHero = computed(() => ({
  eyebrow: hero.value.eyebrow,
  title: "Suivez le fil du RPMS du cadre officiel jusqu'au rôle préparé.",
  lead:
    'Cette lecture avance en trois chapitres : les repères du titre, les responsabilités travaillées, puis une première entrée dans le programme.',
  fitLine:
    "L'objectif est de comprendre comment le RPMS relie activité, équipe, organisation, territoire, production et reporting avant de choisir la suite.",
  chapterTitle: 'Le parcours en trois chapitres',
  chapterText:
    'Chaque étape ajoute un niveau de lecture avant de passer au programme détaillé ou à une demande de rappel.',
  chapters: [
    {
      title: 'Prendre les repères officiels',
      text: 'Titre, RNCP38575, niveau 5 / Bac+2, format à distance et accompagnement pédagogique.'
    },
    {
      title: 'Lire le rôle préparé',
      text: "Pilotage d'activité, management d'équipe, organisation, territoire, production et reporting."
    },
    {
      title: 'Entrer dans le programme',
      text: 'Commencer par quelques blocs repères avant la lecture détaillée.'
    }
  ]
}))

const careerJourneyBand = computed(() => ({
  eyebrow: 'Après les trois chapitres',
  title: 'Choisissez la suite si le RPMS correspond à votre projet.',
  description:
    "Vous pouvez poursuivre avec le programme détaillé ou demander un rappel pour remettre ce cadre dans votre situation.",
  supportLine:
    "L'échange sert à confirmer le titre, le format et les responsabilités travaillées, sans sortir du cadre officiel."
}))

const marketplaceHero = computed(() => ({
  eyebrow: hero.value.eyebrow,
  title: 'Entrez dans le RPMS par ses repères, ses responsabilités et ses blocs.',
  lead:
    "Cette version met d'abord les éléments comparables côte à côte : cadre officiel, rôle visé et aperçu du programme.",
  fitLine:
    "Si vous savez déjà que vous cherchez un Bac+2 reconnu à distance, vous pouvez commencer par les repères les plus concrets.",
  entryTitle: "Choisir votre point d'entrée",
  entryText:
    "Le titre reste unique, mais la lecture peut commencer par le repère qui compte le plus pour votre projet.",
  entries: [
    {
      title: 'Cadre officiel',
      text: 'RNCP, niveau, modalité et accompagnement pédagogique.'
    },
    {
      title: 'Responsabilités',
      text: "Pilotage, équipe, organisation, territoire, production et reporting."
    },
    {
      title: 'Programme',
      text: 'Un aperçu immédiat des premiers blocs pour entrer par le contenu.'
    }
  ]
}))

const marketplaceBoards = computed(() => [
  {
    eyebrow: 'Cadre officiel',
    title: 'Comparer les repères utiles.',
    description: "Le titre reste lisible par quelques faits stables avant tout le reste.",
    items: proofItems.value.map((item) => `${item.label} : ${item.value}`)
  },
  {
    eyebrow: 'Responsabilités',
    title: 'Lire le rôle visé en accès direct.',
    description:
      "Le RPMS relie pilotage, organisation, équipe, territoire, production et reporting.",
    items: professionalScope.value
  },
  {
    eyebrow: 'Programme',
    title: 'Commencer par des blocs repères.',
    description: featuredBlocksIntro.value.description,
    items: featuredBlocks.value.map((block) => `${block.code} · ${block.title}`)
  }
])

const marketplacePreview = computed(() => ({
  eyebrow: 'Entrer par le programme',
  title: "Les premiers blocs donnent tout de suite la tonalité de la lecture.",
  description:
    "Vous pouvez commencer par ces repères, puis revenir aux responsabilités et à la décision si nécessaire."
}))

const marketplaceDecision = computed(() => ({
  eyebrow: 'Décider ensuite',
  title: 'Une fois les repères posés, choisissez votre prochaine étape.',
  description:
    "Le programme détaillé et la demande de rappel restent les deux sorties utiles après cette lecture rapide."
}))

const marketplaceBand = computed(() => ({
  eyebrow: "Passer du repérage à l'action",
  title: 'Gardez le même cadre de lecture pour la suite.',
  description:
    "Si les repères, les responsabilités et les premiers blocs correspondent à votre projet, vous pouvez continuer ou demander un rappel.",
  supportLine:
    "Le rappel sert à vérifier votre situation à partir du titre, du format et du programme, sans ajouter de promesse non soutenue."
}))
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
      <template v-if="activeVariant === 'career-journey'">
        <section
          class="page-hero grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.02fr,0.98fr] lg:p-10"
          v-motion
          :initial="motionVariants.block.initial"
          :enter="motionVariants.block.enter"
        >
          <div class="space-y-6">
            <div class="space-y-4">
              <p class="kicker">{{ careerJourneyHero.eyebrow }}</p>
              <h1 class="editorial-title max-w-4xl text-[clamp(2.4rem,5vw,4.2rem)] text-foreground">
                {{ careerJourneyHero.title }}
              </h1>
              <p class="max-w-3xl text-base leading-8 text-muted-foreground sm:text-[1.05rem]">
                {{ careerJourneyHero.lead }}
              </p>
            </div>

            <p class="max-w-2xl text-base font-medium leading-7 text-foreground sm:text-[1.02rem]">
              {{ careerJourneyHero.fitLine }}
            </p>

            <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button :as="RouterLink" :to="programLink" size="lg">
                Voir le programme
                <ArrowRight class="ml-2 h-4 w-4" />
              </Button>
              <Button :as="RouterLink" :to="contactLink" size="lg" variant="outline">
                Être rappelé
              </Button>
            </div>

            <TrustStrip :items="trustStripItems" />
          </div>

          <aside class="page-cut p-6 sm:p-7">
            <p class="kicker">{{ careerJourneyHero.chapterTitle }}</p>
            <h2
              class="mt-4 text-[clamp(1.7rem,3vw,2.35rem)] font-semibold leading-tight tracking-[-0.04em] text-foreground"
            >
              {{ careerJourneyHero.chapterText }}
            </h2>

            <div class="mt-6 grid gap-3">
              <article
                v-for="(chapter, index) in careerJourneyHero.chapters"
                :key="chapter.title"
                class="elevated-item rounded-[1rem] p-4"
                v-motion
                :initial="motionVariants.pop.initial"
                :enter="staggerEnter(index, 55, 45)"
              >
                <p class="detail-key">Chapitre {{ index + 1 }}</p>
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
            description="Le parcours commence par les faits qui fixent le cadre institutionnel du titre."
            eyebrow="Chapitre 1"
            title="Prendre les repères officiels du RPMS."
          />

          <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div
              v-for="(item, index) in proofItems"
              :key="`${item.label}-${index}`"
              v-motion
              :initial="motionVariants.pop.initial"
              :enter="staggerEnter(index, 60, 40)"
            >
              <ImpactStat :label="item.label" :note="item.note" :value="item.value" />
            </div>
          </div>
        </section>

        <section class="grid gap-6 lg:grid-cols-[0.98fr,1.02fr]">
          <div class="space-y-6">
            <SectionTitle
              description="Le deuxième chapitre relie le cadre officiel aux responsabilités que le titre prépare réellement."
              eyebrow="Chapitre 2"
              title="Lire le rôle préparé avant d'entrer dans le programme."
            />

            <div class="grid gap-4">
              <article
                v-for="(pillar, index) in orientationSection.pillars"
                :key="pillar.title"
                class="page-cut p-5 sm:p-6"
                v-motion
                :initial="motionVariants.block.initial"
                :enter="staggerEnter(index, 55, 40)"
              >
                <h3 class="text-base font-semibold leading-tight text-foreground">
                  {{ pillar.title }}
                </h3>
                <p class="mt-3 text-sm leading-7 text-muted-foreground">
                  {{ pillar.text }}
                </p>
              </article>
            </div>
          </div>

          <article class="page-cut p-6 sm:p-7">
            <p class="kicker">Ce que cela recouvre</p>
            <h2
              class="mt-4 text-[clamp(1.7rem,3vw,2.25rem)] font-semibold leading-tight tracking-[-0.04em] text-foreground"
            >
              Les responsabilités se lisent comme une progression cohérente.
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
                  <span
                    class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold text-secondary"
                  >
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
            :description="featuredBlocksIntro.description"
            eyebrow="Chapitre 3"
            title="Entrer ensuite dans les premiers blocs du programme."
          />

          <div class="grid gap-4 xl:grid-cols-3">
            <article
              v-for="(block, index) in featuredBlocks"
              :key="block.code"
              class="page-cut p-5 sm:p-6"
              v-motion
              :initial="motionVariants.block.initial"
              :enter="staggerEnter(index, 60, 45)"
            >
              <p class="kicker">{{ block.code }}</p>
              <h3
                class="mt-3 text-[1.08rem] font-semibold leading-tight tracking-[-0.03em] text-foreground"
              >
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
              <p class="kicker">{{ careerJourneyBand.eyebrow }}</p>
              <h2
                class="editorial-title max-w-3xl text-[clamp(1.95rem,3vw,2.85rem)] text-foreground"
              >
                {{ careerJourneyBand.title }}
              </h2>
              <p class="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-[1rem]">
                {{ careerJourneyBand.description }}
              </p>
              <p class="max-w-2xl text-sm leading-7 text-muted-foreground">
                {{ careerJourneyBand.supportLine }}
              </p>
            </div>

            <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button :as="RouterLink" :to="contactLink" size="lg">
                Être rappelé
                <ArrowRight class="ml-2 h-4 w-4" />
              </Button>
              <Button :as="RouterLink" :to="programLink" size="lg" variant="outline">
                Voir le programme
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
              <p class="kicker">{{ marketplaceHero.eyebrow }}</p>
              <h1 class="editorial-title max-w-4xl text-[clamp(2.4rem,5vw,4.15rem)] text-foreground">
                {{ marketplaceHero.title }}
              </h1>
              <p class="max-w-3xl text-base leading-8 text-muted-foreground sm:text-[1.05rem]">
                {{ marketplaceHero.lead }}
              </p>
            </div>

            <p class="max-w-2xl text-base font-medium leading-7 text-foreground sm:text-[1.02rem]">
              {{ marketplaceHero.fitLine }}
            </p>

            <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button :as="RouterLink" :to="programLink" size="lg">
                Voir le programme
                <ArrowRight class="ml-2 h-4 w-4" />
              </Button>
              <Button :as="RouterLink" :to="contactLink" size="lg" variant="outline">
                Être rappelé
              </Button>
            </div>

            <TrustStrip :items="trustStripItems" />
          </div>

          <aside class="page-cut p-6 sm:p-7">
            <p class="kicker">{{ marketplaceHero.entryTitle }}</p>
            <h2
              class="mt-4 text-[clamp(1.7rem,3vw,2.35rem)] font-semibold leading-tight tracking-[-0.04em] text-foreground"
            >
              {{ marketplaceHero.entryText }}
            </h2>

            <div class="mt-6 grid gap-3">
              <article
                v-for="(entry, index) in marketplaceHero.entries"
                :key="entry.title"
                class="elevated-item rounded-[1rem] p-4"
                v-motion
                :initial="motionVariants.pop.initial"
                :enter="staggerEnter(index, 55, 45)"
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

        <section class="grid gap-4 xl:grid-cols-3">
          <article
            v-for="(board, index) in marketplaceBoards"
            :key="board.title"
            class="page-cut p-6 sm:p-7"
            v-motion
            :initial="motionVariants.block.initial"
            :enter="staggerEnter(index, 55, 35)"
          >
            <p class="kicker">{{ board.eyebrow }}</p>
            <h2
              class="mt-4 text-[clamp(1.45rem,2.6vw,1.95rem)] font-semibold leading-tight tracking-[-0.04em] text-foreground"
            >
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
        </section>

        <section class="grid gap-6 lg:grid-cols-[1.02fr,0.98fr]">
          <div class="space-y-6">
            <SectionTitle
              :description="marketplacePreview.description"
              :eyebrow="marketplacePreview.eyebrow"
              :title="marketplacePreview.title"
            />

            <div class="grid gap-4">
              <article
                v-for="(block, index) in featuredBlocks"
                :key="block.code"
                class="page-cut p-5 sm:p-6"
                v-motion
                :initial="motionVariants.block.initial"
                :enter="staggerEnter(index, 60, 40)"
              >
                <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p class="kicker">{{ block.code }}</p>
                    <h3
                      class="mt-3 text-[1.08rem] font-semibold leading-tight tracking-[-0.03em] text-foreground"
                    >
                      {{ block.title }}
                    </h3>
                  </div>
                  <span
                    class="inline-flex w-fit rounded-full border border-border bg-background px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground"
                  >
                    Aperçu
                  </span>
                </div>
                <p class="mt-3 whitespace-pre-line text-sm leading-7 text-muted-foreground">
                  {{ block.details }}
                </p>
              </article>
            </div>
          </div>

          <article class="page-cut p-6 sm:p-7">
            <p class="kicker">Ce que le programme travaille</p>
            <h2
              class="mt-4 text-[clamp(1.7rem,3vw,2.25rem)] font-semibold leading-tight tracking-[-0.04em] text-foreground"
            >
              Les responsabilités restent visibles sans passer par une lecture linéaire.
            </h2>

            <div class="mt-6 grid gap-3">
              <article
                v-for="(item, index) in objectiveCards"
                :key="item"
                class="elevated-item rounded-[1rem] p-4"
                v-motion
                :initial="motionVariants.pop.initial"
                :enter="staggerEnter(index, 55, 35)"
              >
                <div class="flex items-start gap-3">
                  <span
                    class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold text-secondary"
                  >
                    {{ index + 1 }}
                  </span>
                  <p class="text-sm leading-6 text-foreground">
                    {{ item }}
                  </p>
                </div>
              </article>
            </div>
          </article>
        </section>

        <section class="space-y-6">
          <SectionTitle
            :description="marketplaceDecision.description"
            :eyebrow="marketplaceDecision.eyebrow"
            :title="marketplaceDecision.title"
          />

          <div class="grid gap-4 md:grid-cols-3">
            <article
              v-for="(step, index) in journeySection.steps"
              :key="step.title"
              class="page-cut p-5 sm:p-6"
              v-motion
              :initial="motionVariants.block.initial"
              :enter="staggerEnter(index, 60, 45)"
            >
              <div
                class="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-semibold text-secondary"
              >
                {{ index + 1 }}
              </div>
              <h3 class="mt-4 text-[1.05rem] font-semibold leading-tight text-foreground">
                {{ step.title }}
              </h3>
              <p class="mt-3 text-sm leading-7 text-muted-foreground">
                {{ step.text }}
              </p>
            </article>
          </div>
        </section>

        <section class="arch-cta p-6 sm:p-8 lg:p-10">
          <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div class="space-y-3">
              <p class="kicker">{{ marketplaceBand.eyebrow }}</p>
              <h2
                class="editorial-title max-w-3xl text-[clamp(1.95rem,3vw,2.85rem)] text-foreground"
              >
                {{ marketplaceBand.title }}
              </h2>
              <p class="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-[1rem]">
                {{ marketplaceBand.description }}
              </p>
              <p class="max-w-2xl text-sm leading-7 text-muted-foreground">
                {{ marketplaceBand.supportLine }}
              </p>
            </div>

            <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button :as="RouterLink" :to="contactLink" size="lg">
                Être rappelé
                <ArrowRight class="ml-2 h-4 w-4" />
              </Button>
              <Button :as="RouterLink" :to="programLink" size="lg" variant="outline">
                Voir le programme
              </Button>
            </div>
          </div>
        </section>
      </template>

      <template v-else>
        <section
          class="page-hero grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.08fr,0.92fr] lg:p-10"
          v-motion
          :initial="motionVariants.block.initial"
          :enter="motionVariants.block.enter"
        >
          <div class="space-y-6">
            <div class="space-y-4">
              <p class="kicker">{{ hero.eyebrow }}</p>
              <h1 class="editorial-title max-w-4xl text-[clamp(2.45rem,5vw,4.25rem)] text-foreground">
                {{ hero.title }}
              </h1>
              <p class="max-w-3xl text-base leading-8 text-muted-foreground sm:text-[1.05rem]">
                {{ hero.lead }}
              </p>
            </div>

            <p class="max-w-2xl text-base font-medium leading-7 text-foreground sm:text-[1.02rem]">
              {{ hero.fitLine }}
            </p>

            <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button :as="RouterLink" :to="programLink" size="lg">
                Voir le programme
                <ArrowRight class="ml-2 h-4 w-4" />
              </Button>
              <Button :as="RouterLink" :to="contactLink" size="lg" variant="outline">
                Être rappelé
              </Button>
            </div>

            <TrustStrip :items="trustStripItems" />
          </div>

          <aside class="page-cut p-6 sm:p-7">
            <p class="kicker">{{ hero.decisionTitle }}</p>
            <h2
              class="mt-4 text-[clamp(1.7rem,3vw,2.35rem)] font-semibold leading-tight tracking-[-0.04em] text-foreground"
            >
              {{ hero.decisionText }}
            </h2>

            <div class="mt-6 grid gap-3">
              <article
                v-for="(item, index) in hero.decisionPoints"
                :key="item"
                class="elevated-item rounded-[1rem] p-4"
                v-motion
                :initial="motionVariants.pop.initial"
                :enter="staggerEnter(index, 55, 45)"
              >
                <div class="flex items-center gap-3">
                  <span
                    class="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-sm font-semibold text-secondary"
                  >
                    {{ index + 1 }}
                  </span>
                  <p class="text-sm leading-6 text-foreground">
                    {{ item }}
                  </p>
                </div>
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
            <ImpactStat :label="item.label" :note="item.note" :value="item.value" />
          </div>
        </section>

        <section class="grid gap-6 lg:grid-cols-[0.95fr,1.05fr]">
          <div class="space-y-6">
            <SectionTitle
              :description="orientationSection.description"
              :eyebrow="orientationSection.eyebrow"
              :title="orientationSection.title"
            />

            <article class="page-cut p-6 sm:p-7">
              <div class="grid gap-3">
                <article
                  v-for="(pillar, index) in orientationSection.pillars"
                  :key="pillar.title"
                  class="elevated-item rounded-[1rem] p-4"
                  v-motion
                  :initial="motionVariants.block.initial"
                  :enter="staggerEnter(index, 55, 40)"
                >
                  <h3 class="text-base font-semibold leading-tight text-foreground">
                    {{ pillar.title }}
                  </h3>
                  <p class="mt-2 text-sm leading-6 text-muted-foreground">
                    {{ pillar.text }}
                  </p>
                </article>
              </div>
            </article>
          </div>

          <div class="space-y-6">
            <SectionTitle
              :description="featuredBlocksIntro.description"
              :eyebrow="featuredBlocksIntro.eyebrow"
              :title="featuredBlocksIntro.title"
            />

            <div class="grid gap-4">
              <article
                v-for="(block, index) in featuredBlocks"
                :key="block.code"
                class="page-cut p-5 sm:p-6"
                v-motion
                :initial="motionVariants.block.initial"
                :enter="staggerEnter(index, 60, 45)"
              >
                <p class="kicker">{{ block.code }}</p>
                <h3
                  class="mt-3 text-[1.08rem] font-semibold leading-tight tracking-[-0.03em] text-foreground"
                >
                  {{ block.title }}
                </h3>
                <p class="mt-3 whitespace-pre-line text-sm leading-7 text-muted-foreground">
                  {{ block.details }}
                </p>
              </article>
            </div>
          </div>
        </section>

        <section class="space-y-6">
          <SectionTitle
            :description="journeySection.description"
            :eyebrow="journeySection.eyebrow"
            :title="journeySection.title"
          />

          <div class="grid gap-4 md:grid-cols-3">
            <article
              v-for="(item, index) in journeySection.steps"
              :key="item.title"
              class="page-cut p-5 sm:p-6"
              v-motion
              :initial="motionVariants.block.initial"
              :enter="staggerEnter(index, 60, 45)"
            >
              <div
                class="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-semibold text-secondary"
              >
                {{ index + 1 }}
              </div>
              <h3 class="mt-4 text-[1.05rem] font-semibold leading-tight text-foreground">
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
              <h2
                class="editorial-title max-w-3xl text-[clamp(1.95rem,3vw,2.85rem)] text-foreground"
              >
                {{ contactBand.title }}
              </h2>
              <p class="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-[1rem]">
                {{ contactBand.description }}
              </p>
              <p class="max-w-2xl text-sm leading-7 text-muted-foreground">
                {{ contactBand.supportLine }}
              </p>
            </div>

            <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button :as="RouterLink" :to="contactLink" size="lg">
                Être rappelé
                <ArrowRight class="ml-2 h-4 w-4" />
              </Button>
              <Button :as="RouterLink" :to="programLink" size="lg" variant="outline">
                Voir le programme
              </Button>
            </div>
          </div>
        </section>
      </template>
    </template>
  </div>
</template>
