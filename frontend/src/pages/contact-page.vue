<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

import { useExperienceVariant } from '@/composables/use-experience-variant'
import LeadForm from '@/components/lead-form.vue'
import TrustStrip from '@/components/visual/trust-strip.vue'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'
import { motionVariants, staggerEnter } from '@/lib/motion'

const site = ref({
  brand: {
    descriptor: 'Organisme de formation certifié Qualiopi'
  },
  contact: {
    phone: '09 77 21 51 61',
    address: '110 Esplanade du General de Gaulle, 92400 Courbevoie',
    website: 'www.cityzfrance.fr'
  },
  organizationProfile: {
    headquartersAddress: '110 Esplanade du General de Gaulle, 92400 Courbevoie',
    certification: 'Organisme de formation certifié Qualiopi',
    website: 'www.cityzfrance.fr'
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

const { experienceVariant, toWithExperience } = useExperienceVariant()

const pickText = (...values) =>
  values.find((value) => typeof value === 'string' && value.trim().length > 0) ?? ''

const pickList = (...values) =>
  values.find((value) => Array.isArray(value) && value.length > 0) ?? []

onMounted(async () => {
  try {
    const [sitePayload, programPayload] = await Promise.all([api.getSite(), api.getProgram('rpms')])
    site.value = sitePayload
    program.value = programPayload
  } finally {
    loading.value = false
  }
})

const activeVariant = computed(() => experienceVariant.value ?? 'orientation-hub')
const contactCopy = computed(() => site.value.contact ?? {})

const heroEyebrow = computed(() => contactCopy.value.heroEyebrow ?? 'Être rappelé')
const trustStripItems = computed(() => [
  program.value?.rncpCode ?? 'RNCP38575',
  program.value?.levelLabel ?? 'Niveau 5 / Bac+2',
  program.value?.formatLabel ?? '100 % distanciel',
  program.value?.supportLabel ?? 'Accompagnement pédagogique'
])
const supportFacts = computed(() =>
  [
    { label: 'Titre', value: program.value?.title },
    { label: 'Niveau', value: program.value?.levelLabel },
    { label: 'Code RNCP', value: program.value?.rncpCode },
    { label: 'Modalité', value: program.value?.formatLabel },
    { label: 'Cadre', value: program.value?.rhythmLabel },
    { label: 'Appui', value: program.value?.supportLabel }
  ].filter((item) => item.value)
)

const displayPhone = computed(() => site.value.contact?.phone?.trim() ?? null)
const displayAddress = computed(
  () =>
    site.value.contact?.address?.trim() ??
    site.value.organizationProfile?.headquartersAddress?.trim() ??
    null
)
const displayWebsite = computed(
  () =>
    site.value.contact?.website?.trim() ??
    site.value.organizationProfile?.website?.trim() ??
    null
)

const programLink = computed(() => toWithExperience('/programme'))
const faqLink = computed(() => toWithExperience('/faq'))
const formLink = computed(() => toWithExperience({ path: '/contact', hash: '#formulaire-rappel' }))

const orientationContent = computed(() => ({
  heroTitle:
    contactCopy.value.heroTitle ??
    'Le rappel sert à vérifier si le RPMS correspond vraiment à votre projet.',
  heroSupport:
    contactCopy.value.heroSupport ??
    'Décrivez en quelques lignes votre situation, ce que vous cherchez à clarifier et les responsabilités vers lesquelles vous souhaitez évoluer.',
  heroLead:
    contactCopy.value.formIntro ??
    "Le formulaire sert à préparer un échange utile, pas à tout formaliser.",
  asideTitle: contactCopy.value.factsTitle ?? 'Repères utiles',
  formTitle:
    contactCopy.value.formTitle ?? 'Décrire votre situation en quelques lignes',
  formSupport:
    contactCopy.value.formSupport ??
    "L'essentiel est de préciser votre projet, vos questions et le cadre que vous voulez vérifier.",
  guidanceTitle:
    contactCopy.value.guidanceTitle ?? "Ce que vous pouvez clarifier pendant l'échange",
  guidancePoints: pickList(contactCopy.value.guidancePoints, [
    'Le rôle ou les responsabilités vers lesquels vous souhaitez progresser.',
    "L'adéquation du format 100 % distanciel avec votre rythme.",
    'Les compétences que vous voulez renforcer : activité, équipe, organisation, territoire, production et reporting.'
  ]),
  nextStepNote: {
    title: contactCopy.value.nextStepNote?.title ?? 'Ce qui se passe après votre demande',
    points: pickList(contactCopy.value.nextStepNote?.points, [
      "Votre demande est prise en compte par CITYZ'France.",
      "L'échange sert à comprendre votre projet et à répondre à vos premières questions.",
      'Les informations demandées restent limitées à ce qui est utile pour vous recontacter.'
    ])
  },
  footerBand: {
    eyebrow: contactCopy.value.footerBand?.eyebrow ?? "Avant d'envoyer votre demande",
    title:
      contactCopy.value.footerBand?.title ??
      'Vous pouvez encore relire le programme ou revenir au formulaire',
    description:
      contactCopy.value.footerBand?.description ??
      'Le programme et la FAQ restent accessibles si vous souhaitez reprendre les repères avant de finaliser votre demande.'
  }
}))

const careerJourneyContent = computed(() => ({
  heroTitle: 'Demandez un rappel une fois votre lecture du RPMS déjà cadrée.',
  heroSupport:
    "Ici, le formulaire arrive à la fin d'un petit parcours : clarifier votre projet, confirmer le format à distance, puis préciser ce qu'il reste à vérifier.",
  heroLead:
    "L'objectif n'est pas d'écrire beaucoup, mais d'arriver avec une question utile et située.",
  asideTitle: 'Avant le formulaire',
  chapters: [
    {
      label: 'Chapitre 1',
      title: 'Nommer votre projet',
      text: 'Expliquez vers quelles responsabilités de pilotage, de coordination ou de management vous voulez progresser.'
    },
    {
      label: 'Chapitre 2',
      title: 'Vérifier votre compatibilité de format',
      text: "Confirmez ce que le 100 % distanciel, l'e-learning et l'accompagnement pédagogique impliquent pour vous."
    },
    {
      label: 'Chapitre 3',
      title: 'Préparer le point de clarification',
      text: 'Gardez le rappel pour la dernière question qui dépend de votre situation.'
    }
  ],
  prepTitle: 'Ce que vous pouvez préparer',
  prepDescription:
    "Le formulaire sert à donner un point d'appui à l'échange, pas à reconstituer tout votre parcours.",
  prepCards: [
    {
      title: 'Votre trajectoire',
      text: "Le poste, l'activité ou le niveau de responsabilité vers lequel vous voulez évoluer."
    },
    {
      title: 'Votre contrainte de format',
      text: "Ce que le distanciel et l'e-learning doivent vous permettre concrètement."
    },
    {
      title: 'Votre question de fin de parcours',
      text: 'Le point du programme ou du cadre officiel que vous souhaitez remettre dans votre contexte.'
    }
  ],
  formTitle: 'Poser votre point de clarification',
  formSupport:
    "Décrivez brièvement ce que vous avez déjà compris du RPMS et ce qui mérite encore un échange.",
  guidanceTitle: "Ce que l'échange peut remettre en perspective",
  guidancePoints: [
    'Votre projet de progression vers des fonctions de pilotage ou de management.',
    'La manière dont le format 100 % distanciel peut s’inscrire dans votre rythme.',
    "Le point du programme qui vous semble le plus décisif pour la suite."
  ],
  nextStepNote: {
    title: 'Après votre demande',
    points: [
      "CITYZ'France reprend votre point de situation et votre question prioritaire.",
      "L'échange sert à replacer votre projet dans le cadre du titre, sans ajouter de promesse hors source.",
      'Vous repartez avec une lecture plus nette de la suite à donner.'
    ]
  },
  footerBand: {
    eyebrow: 'Reprendre le parcours',
    title: 'Vous pouvez encore revenir au programme ou à la FAQ avant de demander un rappel',
    description:
      "Le rappel est plus utile quand votre lecture est déjà avancée et que votre question est précise."
  }
}))

const marketplaceContent = computed(() => ({
  heroTitle: 'Demande de rappel RPMS : la fiche de confirmation finale.',
  heroSupport:
    "Lisez cette page comme un dernier filtre : ce que vous confirmez, ce que vous demandez et ce que l'échange doit encore contextualiser.",
  heroLead:
    'Le formulaire intervient ici comme une confirmation ciblée, pas comme une découverte du titre.',
  asideTitle: 'Filtres rapides',
  filters: [
    'Titre RPMS, RNCP38575 et niveau 5 / Bac+2',
    '100 % distanciel, e-learning et accompagnement pédagogique',
    'Question finale liée à votre projet'
  ],
  specTitle: 'Ce que votre demande doit déjà cadrer',
  specDescription:
    "Le plus utile est de transformer votre demande en fiche courte : situation, compatibilité de format et point à confirmer.",
  specCards: [
    {
      title: 'Situation actuelle',
      text: 'Votre activité, votre rôle ou la progression visée.'
    },
    {
      title: 'Compatibilité de format',
      text: "Ce que vous devez vérifier sur le 100 % distanciel et l'e-learning."
    },
    {
      title: 'Point à confirmer',
      text: 'La question du programme, du cadre officiel ou des responsabilités travaillées.'
    }
  ],
  formTitle: 'Envoyer une demande de confirmation ciblée',
  formSupport:
    "Quelques lignes suffisent si elles permettent d'identifier ce qui reste à confirmer.",
  guidanceTitle: "Ce que le rappel doit encore lever",
  guidancePoints: [
    'Le décalage éventuel entre votre situation actuelle et les responsabilités visées.',
    "Le point précis du format ou de l'accompagnement qui demande encore un éclairage.",
    'La partie du programme que vous voulez confirmer avant de poursuivre.'
  ],
  nextStepNote: {
    title: 'Traitement de votre demande',
    points: [
      "CITYZ'France reçoit une demande déjà filtrée par les repères du site.",
      "L'échange sert à contextualiser ce qui manque, pas à remplacer la lecture du programme.",
      'Le cadre reste celui du RPMS, de son format et de son accompagnement pédagogique.'
    ]
  },
  footerBand: {
    eyebrow: 'Avant envoi',
    title: 'Relisez la fiche programme ou la base de réponses si un point reste ouvert',
    description:
      'Le programme et la FAQ restent les deux meilleurs relais avant la prise de contact.'
  }
}))

const contactContent = computed(() => {
  if (activeVariant.value === 'career-journey') {
    return careerJourneyContent.value
  }

  if (activeVariant.value === 'program-first-marketplace') {
    return marketplaceContent.value
  }

  return orientationContent.value
})
</script>

<template>
  <div class="space-y-12 sm:space-y-14 lg:space-y-16">
    <section
      class="page-hero grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.04fr,0.96fr] lg:p-10"
      v-motion
      :initial="motionVariants.block.initial"
      :enter="motionVariants.block.enter"
    >
      <div class="space-y-6">
        <div class="space-y-4">
          <p class="kicker">{{ heroEyebrow }}</p>
          <h1 class="editorial-title max-w-4xl text-[clamp(2.3rem,4.8vw,4rem)] text-foreground">
            {{ contactContent.heroTitle }}
          </h1>
          <p class="max-w-3xl text-base leading-8 text-muted-foreground sm:text-[1.05rem]">
            {{ contactContent.heroSupport }}
          </p>
        </div>

        <p class="max-w-2xl text-base font-medium leading-7 text-foreground sm:text-[1.02rem]">
          {{ contactContent.heroLead }}
        </p>

        <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button :as="RouterLink" :to="formLink" size="lg">
            Être rappelé
          </Button>
          <Button :as="RouterLink" :to="programLink" size="lg" variant="outline">
            Voir le programme
          </Button>
        </div>

        <TrustStrip :items="trustStripItems" />
      </div>

      <aside class="page-cut p-6 sm:p-7">
        <template v-if="activeVariant === 'career-journey'">
          <p class="kicker">{{ contactContent.asideTitle }}</p>
          <div class="mt-5 grid gap-3">
            <article
              v-for="(chapter, index) in contactContent.chapters"
              :key="chapter.label"
              class="elevated-item rounded-[1rem] p-4"
              v-motion
              :initial="motionVariants.pop.initial"
              :enter="staggerEnter(index, 55, 40)"
            >
              <p class="detail-key">{{ chapter.label }}</p>
              <h2 class="mt-2 text-base font-semibold leading-tight text-foreground">
                {{ chapter.title }}
              </h2>
              <p class="mt-2 text-sm leading-6 text-muted-foreground">
                {{ chapter.text }}
              </p>
            </article>
          </div>
        </template>

        <template v-else-if="activeVariant === 'program-first-marketplace'">
          <p class="kicker">{{ contactContent.asideTitle }}</p>
          <div class="mt-5 grid gap-3">
            <div
              v-for="filter in contactContent.filters"
              :key="filter"
              class="elevated-item rounded-[1rem] px-4 py-4 text-sm leading-6 text-foreground"
            >
              {{ filter }}
            </div>
          </div>

          <div class="mt-6 grid gap-3 sm:grid-cols-2">
            <div
              v-for="(item, index) in supportFacts.slice(0, 4)"
              :key="item.label"
              class="rounded-[1rem] border border-border/70 px-4 py-3"
              v-motion
              :initial="motionVariants.pop.initial"
              :enter="staggerEnter(index, 50, 35)"
            >
              <p class="detail-key">{{ item.label }}</p>
              <p class="mt-2 text-sm font-semibold leading-6 text-foreground">
                {{ item.value }}
              </p>
            </div>
          </div>
        </template>

        <template v-else>
          <p class="kicker">{{ contactContent.asideTitle }}</p>
          <div class="mt-5 grid gap-3 sm:grid-cols-2">
            <div
              v-for="(item, index) in supportFacts.slice(0, 4)"
              :key="item.label"
              class="elevated-item rounded-[1rem] p-4"
              v-motion
              :initial="motionVariants.pop.initial"
              :enter="staggerEnter(index, 50, 35)"
            >
              <p class="detail-key">{{ item.label }}</p>
              <p class="mt-2 text-sm font-semibold leading-6 text-foreground">
                {{ item.value }}
              </p>
            </div>
          </div>
        </template>

        <div class="mt-6 border-t border-border/80 pt-5 text-sm leading-7 text-muted-foreground">
          <p v-if="displayPhone">
            <strong class="text-foreground">Téléphone :</strong>
            <a class="ml-1 text-primary underline-offset-4 hover:underline" :href="`tel:${displayPhone.replace(/\s+/g, '')}`">
              {{ displayPhone }}
            </a>
          </p>
          <p v-if="displayWebsite" class="mt-2">
            <strong class="text-foreground">Site :</strong>
            <a
              class="ml-1 text-primary underline-offset-4 hover:underline"
              :href="`https://${displayWebsite.replace(/^https?:\/\//, '')}`"
              rel="noreferrer"
              target="_blank"
            >
              {{ displayWebsite }}
            </a>
          </p>
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

    <template v-if="activeVariant === 'career-journey'">
      <section class="space-y-6">
        <div class="grid gap-6 lg:grid-cols-[0.92fr,1.08fr] lg:items-start">
          <div class="space-y-6">
            <h2 class="editorial-title max-w-3xl text-[clamp(1.55rem,2.8vw,2.2rem)] text-foreground">
              {{ contactContent.prepTitle }}
            </h2>
            <p class="max-w-2xl text-sm leading-7 text-muted-foreground">
              {{ contactContent.prepDescription }}
            </p>

            <div class="grid gap-4">
              <article
                v-for="(card, index) in contactContent.prepCards"
                :key="card.title"
                class="page-cut p-5 sm:p-6"
                v-motion
                :initial="motionVariants.block.initial"
                :enter="staggerEnter(index, 55, 35)"
              >
                <p class="detail-key">Repère {{ index + 1 }}</p>
                <h3 class="mt-3 text-[1.08rem] font-semibold leading-tight text-foreground">
                  {{ card.title }}
                </h3>
                <p class="mt-3 text-sm leading-7 text-muted-foreground">
                  {{ card.text }}
                </p>
              </article>
            </div>
          </div>

          <section id="formulaire-rappel" class="page-cut p-6 sm:p-8">
            <div class="space-y-3">
              <p class="kicker">Formulaire</p>
              <h2 class="text-[clamp(1.7rem,3vw,2.35rem)] font-semibold leading-tight tracking-[-0.04em] text-foreground">
                {{ contactContent.formTitle }}
              </h2>
              <p class="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-[1rem]">
                {{ contactContent.formSupport }}
              </p>
            </div>

            <div class="mt-6">
              <LeadForm source-page="/contact" />
            </div>
          </section>
        </div>
      </section>
    </template>

    <template v-else-if="activeVariant === 'program-first-marketplace'">
      <section class="grid gap-6 lg:grid-cols-[1.02fr,0.98fr] lg:items-start">
        <div class="space-y-6">
          <h2 class="editorial-title max-w-3xl text-[clamp(1.55rem,2.8vw,2.2rem)] text-foreground">
            {{ contactContent.specTitle }}
          </h2>
          <p class="max-w-2xl text-sm leading-7 text-muted-foreground">
            {{ contactContent.specDescription }}
          </p>

          <div class="grid gap-4 md:grid-cols-3">
            <article
              v-for="(card, index) in contactContent.specCards"
              :key="card.title"
              class="page-cut p-5 sm:p-6"
              v-motion
              :initial="motionVariants.block.initial"
              :enter="staggerEnter(index, 55, 35)"
            >
              <p class="detail-key">Filtre {{ index + 1 }}</p>
              <h3 class="mt-3 text-[1.08rem] font-semibold leading-tight text-foreground">
                {{ card.title }}
              </h3>
              <p class="mt-3 text-sm leading-7 text-muted-foreground">
                {{ card.text }}
              </p>
            </article>
          </div>
        </div>

        <section id="formulaire-rappel" class="page-cut p-6 sm:p-8">
          <div class="space-y-3">
            <p class="kicker">Formulaire</p>
            <h2 class="text-[clamp(1.7rem,3vw,2.35rem)] font-semibold leading-tight tracking-[-0.04em] text-foreground">
              {{ contactContent.formTitle }}
            </h2>
            <p class="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-[1rem]">
              {{ contactContent.formSupport }}
            </p>
          </div>

          <div class="mt-6">
            <LeadForm source-page="/contact" />
          </div>
        </section>
      </section>
    </template>

    <template v-else>
      <div class="grid gap-6 lg:grid-cols-[1.16fr,0.84fr] lg:items-start">
        <section id="formulaire-rappel" class="page-cut p-6 sm:p-8">
          <div class="space-y-3">
            <p class="kicker">Formulaire</p>
            <h2 class="text-[clamp(1.7rem,3vw,2.35rem)] font-semibold leading-tight tracking-[-0.04em] text-foreground">
              {{ contactContent.formTitle }}
            </h2>
            <p class="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-[1rem]">
              {{ contactContent.formSupport }}
            </p>
          </div>

          <div class="mt-6">
            <LeadForm source-page="/contact" />
          </div>
        </section>

        <div class="space-y-4">
          <article class="page-cut p-6 sm:p-7">
            <p class="kicker">{{ contactContent.guidanceTitle }}</p>
            <div class="mt-5 space-y-3">
              <div
                v-for="point in contactContent.guidancePoints"
                :key="point"
                class="elevated-item rounded-[1rem] px-4 py-4 text-sm leading-6 text-foreground"
              >
                {{ point }}
              </div>
            </div>
          </article>

          <article class="page-cut p-6 sm:p-7">
            <p class="kicker">{{ contactContent.nextStepNote.title }}</p>
            <div class="mt-5 space-y-3 text-sm leading-7 text-muted-foreground">
              <p v-for="point in contactContent.nextStepNote.points" :key="point">{{ point }}</p>
            </div>
          </article>
        </div>
      </div>
    </template>

    <div v-if="activeVariant !== 'orientation-hub'" class="grid gap-6 lg:grid-cols-[0.92fr,1.08fr]">
      <article class="page-cut p-6 sm:p-7">
        <p class="kicker">{{ contactContent.guidanceTitle }}</p>
        <div class="mt-5 space-y-3">
          <div
            v-for="point in contactContent.guidancePoints"
            :key="point"
            class="elevated-item rounded-[1rem] px-4 py-4 text-sm leading-6 text-foreground"
          >
            {{ point }}
          </div>
        </div>
      </article>

      <article class="page-cut p-6 sm:p-7">
        <p class="kicker">{{ contactContent.nextStepNote.title }}</p>
        <div class="mt-5 space-y-3 text-sm leading-7 text-muted-foreground">
          <p v-for="point in contactContent.nextStepNote.points" :key="point">{{ point }}</p>
        </div>
      </article>
    </div>

    <section class="arch-cta p-6 sm:p-8 lg:p-10">
      <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div class="space-y-3">
          <p class="kicker">{{ contactContent.footerBand.eyebrow }}</p>
          <h2 class="editorial-title max-w-3xl text-[clamp(1.95rem,3vw,2.8rem)] text-foreground">
            {{ contactContent.footerBand.title }}
          </h2>
          <p class="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-[1rem]">
            {{ contactContent.footerBand.description }}
          </p>
        </div>

        <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button :as="RouterLink" :to="formLink" size="lg">
            Être rappelé
          </Button>
          <Button :as="RouterLink" :to="programLink" size="lg" variant="outline">
            Voir le programme
          </Button>
          <Button :as="RouterLink" :to="faqLink" size="lg" variant="ghost">
            Voir la FAQ
          </Button>
        </div>
      </div>
    </section>
  </div>
</template>
