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

const RPMS_VARIANTS = ['orientation-hub', 'career-journey', 'program-first-marketplace']

const ACCESS_VARIANT_DEFAULTS = {
  'orientation-hub': {
    hero: {
      eyebrow: 'Accès et accompagnement',
      title: "Voici ce qu'il faut comprendre avant d'aller plus loin.",
      description:
        'Le RPMS se suit en 100 % distanciel, en e-learning, avec accompagnement pédagogique.',
      fitLine:
        "Cette page aide à vérifier le format, l'appui pédagogique et les points utiles avant une demande de rappel."
    },
    checklist: {
      eyebrow: 'Vérifier votre point de départ',
      title: 'Trois questions simples avant de poursuivre.',
      description:
        "L'objectif n'est pas de vous convaincre, mais de vous aider à voir si le cadre du titre vous convient.",
      items: [
        "Cherchez-vous un titre pour piloter une activité, encadrer une équipe ou organiser une structure ?",
        'Pouvez-vous avancer dans un parcours 100 % distanciel, en e-learning ?',
        "Souhaitez-vous d'abord vérifier le cadre officiel avant d'aller plus loin ?"
      ]
    },
    supportSection: {
      eyebrow: 'Ce que le cadre prévoit',
      title: 'Un format à distance avec un accompagnement pédagogique lisible.',
      description:
        "Le parcours reste sobre dans sa promesse : un titre officiel, un format à distance et un appui pédagogique pour avancer avec plus de clarté.",
      points: ['100 % distanciel', 'E-learning', 'Accompagnement pédagogique', 'Niveau 5 / Bac+2']
    },
    processSection: {
      eyebrow: 'Si vous demandez un rappel',
      title: 'Le rappel suit un parcours court et concret.',
      description:
        "L'échange sert à clarifier votre projet, pas à ajouter une étape commerciale de plus.",
      steps: [
        'Lire les blocs de compétences et les repères officiels du titre.',
        "Vérifier si le format 100 % distanciel et l'accompagnement pédagogique vous conviennent.",
        'Demander un rappel si vous voulez faire le point sur votre situation.'
      ]
    },
    ctaBand: {
      eyebrow: 'Aller plus loin',
      title: 'Demander un rappel pour vérifier votre projet',
      description:
        "Si le cadre vous semble pertinent, l'échange permet de clarifier vos questions avant toute décision."
    }
  },
  'career-journey': {
    hero: {
      eyebrow: 'Accès et accompagnement',
      title: 'Le RPMS se vérifie ici comme un trajet en trois chapitres avant le rappel.',
      description:
        'Le cadre reste factuel : titre officiel, 100 % distanciel, e-learning et accompagnement pédagogique.',
      fitLine:
        "L'idée n'est pas de passer directement au formulaire, mais de savoir à quel moment de lecture vous en êtes."
    },
    heroPanel: {
      kicker: 'Trois chapitres',
      title: 'Un trajet court pour clarifier votre projet.',
      description:
        "Chaque chapitre enlève un doute avant de transformer votre lecture en prise de contact.",
      chapters: [
        {
          label: 'Chapitre 1',
          title: 'Lire le cadre officiel',
          text: 'Commencez par le titre, le RNCP38575, le niveau 5 / Bac+2 et le format.'
        },
        {
          label: 'Chapitre 2',
          title: "Mesurer l'accompagnement",
          text: "Vérifiez ce que le distanciel, l'e-learning et l'appui pédagogique impliquent pour vous."
        },
        {
          label: 'Chapitre 3',
          title: "Préparer le point d'étape",
          text: 'Arrivez au rappel avec une question précise, pas avec une lecture à peine commencée.'
        }
      ]
    },
    journeySection: {
      eyebrow: 'Progression',
      title: 'Trois chapitres suffisent pour savoir si vous continuez.',
      description:
        "L'accès n'est pas une formalité séparée : c'est le passage entre la lecture du titre et l'échange.",
      chapters: [
        {
          label: 'Départ',
          title: 'Identifier le cadre',
          text: "Lire d'abord les repères institutionnels qui structurent le RPMS."
        },
        {
          label: 'Passage',
          title: 'Mesurer votre compatibilité de format',
          text: "Revenir sur le 100 % distanciel, l'e-learning et l'accompagnement pédagogique."
        },
        {
          label: 'Arrivée',
          title: "Formuler le point à confirmer",
          text: 'Utiliser ensuite le rappel pour remettre votre situation dans ce cadre.'
        }
      ]
    },
    supportSection: {
      eyebrow: "Points d'appui du parcours",
      title: 'Le trajet reste balisé par des repères concrets.',
      description:
        'Le RPMS garde les mêmes appuis tout au long du parcours : cadre officiel, format, accompagnement et lecture du rôle.',
      cards: [
        {
          title: 'Cadre officiel',
          text: 'Titre RPMS, RNCP38575 et niveau 5 / Bac+2.'
        },
        {
          title: 'Modalité',
          text: '100 % distanciel, en e-learning.'
        },
        {
          title: 'Appui',
          text: 'Accompagnement pédagogique pour avancer avec plus de clarté.'
        }
      ]
    },
    checkpointSection: {
      eyebrow: "Point d'étape",
      title: "Le rappel arrive à la fin du chapitre, pas au début.",
      description:
        "Vous arrivez à l'échange avec un cadre déjà lu et une demande plus précise.",
      steps: [
        {
          title: 'Ce que vous avez déjà lu',
          text: 'Le titre, ses repères officiels et les premières responsabilités travaillées.'
        },
        {
          title: 'Ce que vous vérifiez encore',
          text: "L'adéquation du format à distance et de l'accompagnement avec votre rythme."
        },
        {
          title: 'Ce que le rappel clarifie',
          text: 'La manière dont ce cadre se relie à votre projet de pilotage, de coordination ou de management.'
        }
      ]
    },
    ctaBand: {
      eyebrow: 'Suite du parcours',
      title: 'Demander un rappel quand votre lecture est déjà cadrée',
      description:
        "Si vous avez franchi ces chapitres, l'échange sert à remettre votre projet dans le cadre du RPMS."
    }
  },
  'program-first-marketplace': {
    hero: {
      eyebrow: 'Accès et accompagnement',
      title: "Accès et accompagnement du RPMS : la fiche à filtrer avant contact.",
      description:
        "Lisez cette page comme une fiche de confirmation : repères officiels, modalité, appui pédagogique et usage du rappel.",
      fitLine:
        'Le but est de filtrer rapidement les points à valider, sans sortir du cadre source.'
    },
    heroPanel: {
      kicker: 'Fiche rapide',
      title: 'Les spécifications à confirmer avant la demande.',
      description:
        "Passez du titre au formulaire comme sur une fiche marché : critères, preuves et dernier point à vérifier.",
      filters: [
        'RNCP38575 et niveau 5 / Bac+2',
        '100 % distanciel et e-learning',
        'Accompagnement pédagogique'
      ]
    },
    filterSection: {
      eyebrow: 'Filtres de décision',
      title: 'Trois filtres suffisent avant de demander un rappel.',
      description:
        'Chaque filtre élimine un doute fréquent sur le cadre du RPMS.',
      cards: [
        {
          title: 'Titre et niveau',
          text: "Validez d'abord l'intitulé officiel, le code RNCP et la lecture Bac+2 / niveau 5."
        },
        {
          title: 'Format',
          text: "Confirmez le 100 % distanciel, l'e-learning et la place de l'accompagnement pédagogique."
        },
        {
          title: 'Usage du rappel',
          text: 'Gardez le rappel pour la confirmation liée à votre projet, pas pour découvrir le titre depuis zéro.'
        }
      ]
    },
    specSection: {
      eyebrow: 'Fiche technique',
      title: 'Les spécifications utiles restent simples à relire.',
      description:
        'Le programme détaillé complète ensuite ces lignes avec les blocs de compétences.',
      notes: [
        'Le titre RPMS garde une lecture institutionnelle et factuelle.',
        "Le parcours se suit à distance, en e-learning, avec accompagnement pédagogique.",
        "Le rappel sert à confirmer l'adéquation de ce cadre avec votre situation."
      ]
    },
    confirmationSection: {
      eyebrow: 'Confirmation utile',
      title: 'Le rappel sert à lever les écarts restants.',
      description:
        "Une fois les filtres passés, il ne reste que les confirmations liées à votre contexte.",
      steps: [
        {
          title: 'Votre situation actuelle',
          text: 'Le rôle ou les responsabilités vers lesquels vous voulez progresser.'
        },
        {
          title: 'Votre compatibilité de format',
          text: "La manière dont le 100 % distanciel et l'e-learning s'inscrivent dans votre rythme."
        },
        {
          title: 'Votre besoin de précision',
          text: 'Le point du programme ou du cadre qui mérite encore un échange.'
        }
      ]
    },
    ctaBand: {
      eyebrow: 'Après filtrage',
      title: 'Demander un rappel pour confirmer les derniers points',
      description:
        "Si la fiche vous semble cohérente, l'échange sert à confirmer ce qu'il reste à contextualiser."
    }
  }
}

const pickText = (...values) =>
  values.find((value) => typeof value === 'string' && value.trim().length > 0) ?? ''

const pickList = (...values) =>
  values.find((value) => Array.isArray(value) && value.length > 0) ?? []

const site = ref({
  access: {}
})
const program = ref(null)
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

const accessCopy = computed(() => site.value.access ?? {})
const { experienceVariant: currentExperienceVariant, toWithExperience } = useExperienceVariant()
const experienceVariant = computed(() => currentExperienceVariant.value ?? 'orientation-hub')
const routeWithVariant = (path) => toWithExperience(path)
const accessVariantCopy = computed(() => accessCopy.value.variants?.[experienceVariant.value] ?? {})

const trustStripItems = computed(() => [
  program.value?.rncpCode ?? 'RNCP38575',
  program.value?.levelLabel ?? 'Niveau 5 / Bac+2',
  program.value?.formatLabel ?? '100 % distanciel',
  program.value?.supportLabel ?? 'Accompagnement pédagogique'
])

const quickFacts = computed(() =>
  [
    { label: 'Référence', value: program.value?.rncpCode },
    { label: 'Niveau', value: program.value?.levelLabel },
    { label: 'Modalité', value: program.value?.formatLabel },
    { label: 'Cadre', value: program.value?.rhythmLabel },
    { label: 'Appui', value: program.value?.supportLabel }
  ].filter((item) => item.value)
)

const accessContent = computed(() => {
  const defaults = ACCESS_VARIANT_DEFAULTS[experienceVariant.value]
  const variantCopy = accessVariantCopy.value

  if (experienceVariant.value === 'career-journey') {
    return {
      hero: {
        eyebrow: pickText(variantCopy.hero?.eyebrow, defaults.hero.eyebrow),
        title: pickText(variantCopy.hero?.title, defaults.hero.title),
        description: pickText(variantCopy.hero?.description, defaults.hero.description),
        fitLine: pickText(variantCopy.hero?.fitLine, defaults.hero.fitLine)
      },
      heroPanel: {
        kicker: pickText(variantCopy.heroPanel?.kicker, defaults.heroPanel.kicker),
        title: pickText(variantCopy.heroPanel?.title, defaults.heroPanel.title),
        description: pickText(variantCopy.heroPanel?.description, defaults.heroPanel.description),
        chapters: pickList(variantCopy.heroPanel?.chapters, defaults.heroPanel.chapters)
      },
      journeySection: {
        eyebrow: pickText(variantCopy.journeySection?.eyebrow, defaults.journeySection.eyebrow),
        title: pickText(variantCopy.journeySection?.title, defaults.journeySection.title),
        description: pickText(
          variantCopy.journeySection?.description,
          defaults.journeySection.description
        ),
        chapters: pickList(variantCopy.journeySection?.chapters, defaults.journeySection.chapters)
      },
      supportSection: {
        eyebrow: pickText(variantCopy.supportSection?.eyebrow, defaults.supportSection.eyebrow),
        title: pickText(variantCopy.supportSection?.title, defaults.supportSection.title),
        description: pickText(
          variantCopy.supportSection?.description,
          defaults.supportSection.description
        ),
        cards: pickList(variantCopy.supportSection?.cards, defaults.supportSection.cards)
      },
      checkpointSection: {
        eyebrow: pickText(
          variantCopy.checkpointSection?.eyebrow,
          defaults.checkpointSection.eyebrow
        ),
        title: pickText(variantCopy.checkpointSection?.title, defaults.checkpointSection.title),
        description: pickText(
          variantCopy.checkpointSection?.description,
          defaults.checkpointSection.description
        ),
        steps: pickList(variantCopy.checkpointSection?.steps, defaults.checkpointSection.steps)
      },
      ctaBand: {
        eyebrow: pickText(variantCopy.ctaBand?.eyebrow, defaults.ctaBand.eyebrow),
        title: pickText(variantCopy.ctaBand?.title, defaults.ctaBand.title),
        description: pickText(variantCopy.ctaBand?.description, defaults.ctaBand.description)
      }
    }
  }

  if (experienceVariant.value === 'program-first-marketplace') {
    return {
      hero: {
        eyebrow: pickText(variantCopy.hero?.eyebrow, defaults.hero.eyebrow),
        title: pickText(variantCopy.hero?.title, defaults.hero.title),
        description: pickText(variantCopy.hero?.description, defaults.hero.description),
        fitLine: pickText(variantCopy.hero?.fitLine, defaults.hero.fitLine)
      },
      heroPanel: {
        kicker: pickText(variantCopy.heroPanel?.kicker, defaults.heroPanel.kicker),
        title: pickText(variantCopy.heroPanel?.title, defaults.heroPanel.title),
        description: pickText(variantCopy.heroPanel?.description, defaults.heroPanel.description),
        filters: pickList(variantCopy.heroPanel?.filters, defaults.heroPanel.filters)
      },
      filterSection: {
        eyebrow: pickText(variantCopy.filterSection?.eyebrow, defaults.filterSection.eyebrow),
        title: pickText(variantCopy.filterSection?.title, defaults.filterSection.title),
        description: pickText(
          variantCopy.filterSection?.description,
          defaults.filterSection.description
        ),
        cards: pickList(variantCopy.filterSection?.cards, defaults.filterSection.cards)
      },
      specSection: {
        eyebrow: pickText(variantCopy.specSection?.eyebrow, defaults.specSection.eyebrow),
        title: pickText(variantCopy.specSection?.title, defaults.specSection.title),
        description: pickText(variantCopy.specSection?.description, defaults.specSection.description),
        notes: pickList(variantCopy.specSection?.notes, defaults.specSection.notes)
      },
      confirmationSection: {
        eyebrow: pickText(
          variantCopy.confirmationSection?.eyebrow,
          defaults.confirmationSection.eyebrow
        ),
        title: pickText(
          variantCopy.confirmationSection?.title,
          defaults.confirmationSection.title
        ),
        description: pickText(
          variantCopy.confirmationSection?.description,
          defaults.confirmationSection.description
        ),
        steps: pickList(
          variantCopy.confirmationSection?.steps,
          defaults.confirmationSection.steps
        )
      },
      ctaBand: {
        eyebrow: pickText(variantCopy.ctaBand?.eyebrow, defaults.ctaBand.eyebrow),
        title: pickText(variantCopy.ctaBand?.title, defaults.ctaBand.title),
        description: pickText(variantCopy.ctaBand?.description, defaults.ctaBand.description)
      }
    }
  }

  const hero = accessCopy.value.hero ?? {}
  const checklist = accessCopy.value.fitChecklist ?? {}
  const supportSection = accessCopy.value.supportSection ?? {}
  const processSection = accessCopy.value.processSection ?? {}
  const ctaBand = accessCopy.value.ctaBand ?? {}

  return {
    hero: {
      eyebrow: pickText(variantCopy.hero?.eyebrow, hero.eyebrow, defaults.hero.eyebrow),
      title: pickText(variantCopy.hero?.title, hero.title, defaults.hero.title),
      description: pickText(variantCopy.hero?.description, hero.description, defaults.hero.description),
      fitLine: pickText(variantCopy.hero?.fitLine, hero.fitLine, defaults.hero.fitLine)
    },
    checklist: {
      eyebrow: pickText(
        variantCopy.checklist?.eyebrow,
        checklist.eyebrow,
        defaults.checklist.eyebrow
      ),
      title: pickText(variantCopy.checklist?.title, checklist.title, defaults.checklist.title),
      description: pickText(
        variantCopy.checklist?.description,
        checklist.description,
        defaults.checklist.description
      ),
      items: pickList(variantCopy.checklist?.items, checklist.items, defaults.checklist.items)
    },
    supportSection: {
      eyebrow: pickText(
        variantCopy.supportSection?.eyebrow,
        supportSection.eyebrow,
        defaults.supportSection.eyebrow
      ),
      title: pickText(
        variantCopy.supportSection?.title,
        supportSection.title,
        defaults.supportSection.title
      ),
      description: pickText(
        variantCopy.supportSection?.description,
        supportSection.description,
        defaults.supportSection.description
      ),
      points: pickList(
        variantCopy.supportSection?.points,
        supportSection.points,
        defaults.supportSection.points
      )
    },
    processSection: {
      eyebrow: pickText(
        variantCopy.processSection?.eyebrow,
        processSection.eyebrow,
        defaults.processSection.eyebrow
      ),
      title: pickText(
        variantCopy.processSection?.title,
        processSection.title,
        defaults.processSection.title
      ),
      description: pickText(
        variantCopy.processSection?.description,
        processSection.description,
        defaults.processSection.description
      ),
      steps: pickList(variantCopy.processSection?.steps, processSection.steps, defaults.processSection.steps)
    },
    ctaBand: {
      eyebrow: pickText(variantCopy.ctaBand?.eyebrow, ctaBand.eyebrow, defaults.ctaBand.eyebrow),
      title: pickText(variantCopy.ctaBand?.title, ctaBand.title, defaults.ctaBand.title),
      description: pickText(
        variantCopy.ctaBand?.description,
        ctaBand.description,
        defaults.ctaBand.description
      )
    }
  }
})
</script>

<template>
  <div class="space-y-12 sm:space-y-14 lg:space-y-16">
    <section
      class="page-hero grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.02fr,0.98fr] lg:p-10"
      v-motion
      :initial="motionVariants.block.initial"
      :enter="motionVariants.block.enter"
    >
      <div class="space-y-6">
        <div class="space-y-4">
          <p class="kicker">{{ accessContent.hero.eyebrow }}</p>
          <h1 class="editorial-title max-w-4xl text-[clamp(2.3rem,4.8vw,4rem)] text-foreground">
            {{ accessContent.hero.title }}
          </h1>
          <p class="max-w-3xl text-base leading-8 text-muted-foreground sm:text-[1.05rem]">
            {{ accessContent.hero.description }}
          </p>
        </div>

        <p class="max-w-2xl text-base font-medium leading-7 text-foreground sm:text-[1.02rem]">
          {{ accessContent.hero.fitLine }}
        </p>

        <TrustStrip :items="trustStripItems" />
      </div>

      <aside class="page-cut p-6 sm:p-7">
        <template v-if="experienceVariant === 'career-journey'">
          <p class="kicker">{{ accessContent.heroPanel.kicker }}</p>
          <h2 class="mt-4 text-[clamp(1.65rem,2.9vw,2.3rem)] font-semibold leading-tight tracking-[-0.04em] text-foreground">
            {{ accessContent.heroPanel.title }}
          </h2>
          <p class="mt-4 text-sm leading-7 text-muted-foreground">
            {{ accessContent.heroPanel.description }}
          </p>

          <div class="mt-5 grid gap-3">
            <article
              v-for="chapter in accessContent.heroPanel.chapters"
              :key="chapter.label"
              class="elevated-item rounded-[1rem] p-4"
            >
              <p class="detail-key">{{ chapter.label }}</p>
              <p class="mt-2 text-sm font-semibold leading-6 text-foreground">
                {{ chapter.title }}
              </p>
              <p class="mt-2 text-sm leading-6 text-muted-foreground">
                {{ chapter.text }}
              </p>
            </article>
          </div>
        </template>

        <template v-else-if="experienceVariant === 'program-first-marketplace'">
          <p class="kicker">{{ accessContent.heroPanel.kicker }}</p>
          <h2 class="mt-4 text-[clamp(1.65rem,2.9vw,2.3rem)] font-semibold leading-tight tracking-[-0.04em] text-foreground">
            {{ accessContent.heroPanel.title }}
          </h2>
          <p class="mt-4 text-sm leading-7 text-muted-foreground">
            {{ accessContent.heroPanel.description }}
          </p>

          <div class="mt-5 grid gap-3">
            <div
              v-for="filter in accessContent.heroPanel.filters"
              :key="filter"
              class="elevated-item rounded-[1rem] px-4 py-4 text-sm leading-6 text-foreground"
            >
              {{ filter }}
            </div>
          </div>

          <div class="mt-6 grid gap-3 sm:grid-cols-2">
            <div
              v-for="item in quickFacts.slice(0, 4)"
              :key="item.label"
              class="rounded-[1rem] border border-border/70 px-4 py-3"
            >
              <p class="detail-key">{{ item.label }}</p>
              <p class="mt-2 text-sm font-semibold leading-6 text-foreground">
                {{ item.value }}
              </p>
            </div>
          </div>
        </template>

        <template v-else>
          <p class="kicker">Repères du titre</p>
          <div class="mt-5 grid gap-3 sm:grid-cols-2">
            <div
              v-for="(item, index) in quickFacts"
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
        </template>
      </aside>
    </section>

    <template v-if="experienceVariant === 'career-journey'">
      <section class="space-y-6">
        <SectionTitle
          :description="accessContent.journeySection.description"
          :eyebrow="accessContent.journeySection.eyebrow"
          :title="accessContent.journeySection.title"
        />

        <div class="grid gap-4 md:grid-cols-3">
          <article
            v-for="(chapter, index) in accessContent.journeySection.chapters"
            :key="chapter.title"
            class="page-cut p-5 sm:p-6"
            v-motion
            :initial="motionVariants.block.initial"
            :enter="staggerEnter(index, 55, 40)"
          >
            <p class="detail-key">{{ chapter.label }}</p>
            <h3 class="mt-3 text-[1.08rem] font-semibold leading-tight text-foreground">
              {{ chapter.title }}
            </h3>
            <p class="mt-3 text-sm leading-7 text-muted-foreground">
              {{ chapter.text }}
            </p>
          </article>
        </div>
      </section>

      <section class="grid gap-6 lg:grid-cols-[0.96fr,1.04fr]">
        <div class="space-y-6">
          <SectionTitle
            :description="accessContent.supportSection.description"
            :eyebrow="accessContent.supportSection.eyebrow"
            :title="accessContent.supportSection.title"
          />

          <div class="grid gap-4">
            <article
              v-for="card in accessContent.supportSection.cards"
              :key="card.title"
              class="page-cut p-5"
            >
              <h3 class="text-base font-semibold text-foreground">{{ card.title }}</h3>
              <p class="mt-3 text-sm leading-7 text-muted-foreground">
                {{ card.text }}
              </p>
            </article>
          </div>
        </div>

        <div class="space-y-6">
          <SectionTitle
            :description="accessContent.checkpointSection.description"
            :eyebrow="accessContent.checkpointSection.eyebrow"
            :title="accessContent.checkpointSection.title"
          />

          <div class="grid gap-4">
            <article
              v-for="(step, index) in accessContent.checkpointSection.steps"
              :key="step.title"
              class="page-cut p-5 sm:p-6"
            >
              <div class="flex items-center gap-3">
                <span class="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-semibold text-secondary">
                  {{ index + 1 }}
                </span>
                <h3 class="text-base font-semibold text-foreground">
                  {{ step.title }}
                </h3>
              </div>
              <p class="mt-4 text-sm leading-7 text-muted-foreground">
                {{ step.text }}
              </p>
            </article>
          </div>
        </div>
      </section>
    </template>

    <template v-else-if="experienceVariant === 'program-first-marketplace'">
      <section class="space-y-6">
        <SectionTitle
          :description="accessContent.filterSection.description"
          :eyebrow="accessContent.filterSection.eyebrow"
          :title="accessContent.filterSection.title"
        />

        <div class="grid gap-4 md:grid-cols-3">
          <article
            v-for="card in accessContent.filterSection.cards"
            :key="card.title"
            class="page-cut p-5 sm:p-6"
          >
            <h3 class="text-[1.08rem] font-semibold leading-tight text-foreground">
              {{ card.title }}
            </h3>
            <p class="mt-3 text-sm leading-7 text-muted-foreground">
              {{ card.text }}
            </p>
          </article>
        </div>
      </section>

      <section class="grid gap-6 lg:grid-cols-[1.08fr,0.92fr]">
        <div class="space-y-6">
          <SectionTitle
            :description="accessContent.specSection.description"
            :eyebrow="accessContent.specSection.eyebrow"
            :title="accessContent.specSection.title"
          />

          <article class="page-cut overflow-hidden">
            <dl class="divide-y divide-border/80">
              <div
                v-for="item in quickFacts"
                :key="item.label"
                class="grid gap-2 px-5 py-4 sm:grid-cols-[0.72fr,1.28fr] sm:px-6"
              >
                <dt class="detail-key">{{ item.label }}</dt>
                <dd class="text-sm leading-7 text-foreground">{{ item.value }}</dd>
              </div>
            </dl>
          </article>
        </div>

        <article class="page-cut p-6 sm:p-7">
          <p class="kicker">Notes de confirmation</p>
          <div class="mt-5 space-y-3">
            <div
              v-for="note in accessContent.specSection.notes"
              :key="note"
              class="elevated-item rounded-[1rem] px-4 py-4 text-sm leading-6 text-foreground"
            >
              {{ note }}
            </div>
          </div>
        </article>
      </section>

      <section class="space-y-6">
        <SectionTitle
          :description="accessContent.confirmationSection.description"
          :eyebrow="accessContent.confirmationSection.eyebrow"
          :title="accessContent.confirmationSection.title"
        />

        <div class="grid gap-4 md:grid-cols-3">
          <article
            v-for="step in accessContent.confirmationSection.steps"
            :key="step.title"
            class="page-cut p-5 sm:p-6"
          >
            <h3 class="text-[1.05rem] font-semibold leading-tight text-foreground">
              {{ step.title }}
            </h3>
            <p class="mt-3 text-sm leading-7 text-muted-foreground">
              {{ step.text }}
            </p>
          </article>
        </div>
      </section>
    </template>

    <template v-else>
      <section class="space-y-6">
        <SectionTitle
          :description="accessContent.checklist.description"
          :eyebrow="accessContent.checklist.eyebrow"
          :title="accessContent.checklist.title"
        />

        <div class="grid gap-4 md:grid-cols-3">
          <article
            v-for="(item, index) in accessContent.checklist.items"
            :key="item"
            class="page-cut p-5"
            v-motion
            :initial="motionVariants.block.initial"
            :enter="staggerEnter(index, 55, 40)"
          >
            <div class="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-semibold text-secondary">
              {{ index + 1 }}
            </div>
            <p class="mt-4 text-sm leading-7 text-foreground">
              {{ item }}
            </p>
          </article>
        </div>
      </section>

      <section class="grid gap-6 lg:grid-cols-[0.94fr,1.06fr]">
        <div class="space-y-6">
          <SectionTitle
            :description="accessContent.supportSection.description"
            :eyebrow="accessContent.supportSection.eyebrow"
            :title="accessContent.supportSection.title"
          />

          <article class="page-cut p-6 sm:p-7">
            <TrustStrip :items="trustStripItems" />
            <ul class="mt-5 grid gap-3 sm:grid-cols-2">
              <li
                v-for="item in accessContent.supportSection.points"
                :key="item"
                class="elevated-item rounded-[1rem] px-4 py-4 text-sm leading-6 text-foreground"
              >
                {{ item }}
              </li>
            </ul>
          </article>
        </div>

        <div class="space-y-6">
          <SectionTitle
            :description="accessContent.processSection.description"
            :eyebrow="accessContent.processSection.eyebrow"
            :title="accessContent.processSection.title"
          />

          <div class="grid gap-4">
            <article
              v-for="(step, index) in accessContent.processSection.steps"
              :key="step"
              class="page-cut p-5 sm:p-6"
              v-motion
              :initial="motionVariants.block.initial"
              :enter="staggerEnter(index, 55, 45)"
            >
              <div class="flex items-center gap-3">
                <span class="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-semibold text-secondary">
                  {{ index + 1 }}
                </span>
                <h3 class="text-base font-semibold text-foreground">Étape {{ index + 1 }}</h3>
              </div>
              <p class="mt-4 text-sm leading-7 text-muted-foreground">
                {{ step }}
              </p>
            </article>
          </div>
        </div>
      </section>
    </template>

    <section class="arch-cta p-6 sm:p-8 lg:p-10">
      <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div class="space-y-3">
          <p class="kicker">{{ accessContent.ctaBand.eyebrow }}</p>
          <h2 class="editorial-title max-w-3xl text-[clamp(1.95rem,3vw,2.8rem)] text-foreground">
            {{ accessContent.ctaBand.title }}
          </h2>
          <p class="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-[1rem]">
            {{ accessContent.ctaBand.description }}
          </p>
        </div>

        <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button :as="RouterLink" :to="routeWithVariant('/contact')" size="lg">
            Être rappelé
            <ArrowRight class="ml-2 h-4 w-4" />
          </Button>
          <Button :as="RouterLink" :to="routeWithVariant('/programme')" size="lg" variant="outline">
            Voir le programme
          </Button>
        </div>
      </div>
    </section>

    <p v-if="loading" class="text-sm text-muted-foreground">Chargement du contenu...</p>
  </div>
</template>
