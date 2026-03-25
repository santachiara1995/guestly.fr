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
import RibbonMarquee from '@/components/visual/ribbon-marquee.vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { api } from '@/lib/api'
import { motionVariants, staggerEnter } from '@/lib/motion'

const program = ref(null)
const site = ref({
  positioning: {
    eyebrow: 'Titre professionnel à distance',
    subtitle:
      "CITYZ'France présente le titre professionnel Responsable petite et moyenne structure (RPMS) pour des particuliers recherchant un cadre sérieux, lisible et entièrement orienté vers l'information utile."
  },
  home: {
    proofItems: [
      {
        value: 'RNCP38575',
        label: 'Référentiel visible',
        note: "Titre professionnel reconnu par l'État"
      },
      {
        value: 'Niveau 5',
        label: 'Positionnement',
        note: 'Équivalent Bac+2'
      },
      {
        value: '100 % distanciel',
        label: 'Modalité',
        note: 'E-learning'
      }
    ],
    journey: [
      {
        title: 'Comprendre le programme',
        text: 'Identifier le niveau, le référentiel, la modalité pédagogique et la logique des blocs de compétences.'
      },
      {
        title: 'Évaluer le cadre d’accompagnement',
        text: 'Lire le fonctionnement distanciel, le suivi pédagogique et les repères pratiques donnés avant la prise de contact.'
      },
      {
        title: 'Être rappelé',
        text: "Déposer une demande de rappel pour être recontacté avec une réponse adaptée au projet et au niveau d'information recherché."
      }
    ],
    competencyClusters: [
      'Piloter une activité et sa performance',
      'Manager et animer une équipe',
      'Organiser les opérations et la qualité',
      'Développer l’offre, la communication et le reporting'
    ]
  }
})
const loading = ref(true)
const errorMessage = ref('')

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

program.value = {
  levelLabel: 'Niveau 5 (Bac+2)',
  formatLabel: '100 % distanciel',
  rhythmLabel: 'E-learning',
  supportLabel: 'Accompagnement pédagogique',
  blocks: []
}

const proofItems = computed(() => site.value.home?.proofItems ?? [])
const highlights = computed(() => [
  {
    icon: ShieldCheck,
    title: 'Une lecture réglementaire stable',
    description:
      'Le site public s’en tient aux informations pédagogiques, juridiques et institutionnelles confirmées dans les sources disponibles.'
  },
  {
    icon: BookOpenCheck,
    title: 'Un parcours présenté sans dispersion',
    description:
      'Un seul programme, une seule audience, une seule trajectoire de prise de contact pour éviter l’effet catalogue.'
  },
  {
    icon: Building2,
    title: 'Un cadre pensé pour le pilotage',
    description:
      'Le contenu met en avant les logiques de management, d’organisation, de coordination et de reporting attendues dans le RPMS.'
  }
])
const journey = computed(() => site.value.home?.journey ?? [])
const competencyClusters = computed(() => site.value.home?.competencyClusters ?? [])
const marqueeItems = computed(() => [
  'Titre professionnel RPMS',
  'RNCP38575',
  'Niveau 5',
  'Bac+2',
  '100 % distanciel',
  'E-learning',
  'Accompagnement pédagogique'
])
const summaryCards = computed(() => [
  { label: 'Niveau', value: program.value?.levelLabel },
  { label: 'Modalité', value: program.value?.formatLabel },
  { label: 'Format', value: program.value?.rhythmLabel },
  { label: 'Accompagnement', value: program.value?.supportLabel }
].filter((item) => item.value))
</script>

<template>
  <div class="space-y-16">
    <section
      class="diamond-panel surface-cut relative grid gap-8 overflow-hidden rounded-[2rem] p-8 lg:grid-cols-[1.18fr,0.82fr] lg:p-12"
      v-motion
      :initial="motionVariants.block.initial"
      :enter="motionVariants.block.enter"
    >
      <div class="space-y-6">
        <p class="kicker">{{ site.positioning?.eyebrow ?? 'Titre professionnel à distance' }}</p>
        <h1 class="editorial-title text-4xl text-foreground sm:text-5xl lg:text-6xl">
          Titre professionnel Responsable petite et moyenne structure (RPMS)
        </h1>
        <p class="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {{ site.positioning?.subtitle }}
        </p>

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

        <p class="text-sm text-muted-foreground">
          RNCP38575 · Niveau 5 / Bac+2 · 100 % distanciel
        </p>

        <p
          v-if="errorMessage"
          class="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          {{ errorMessage }}
        </p>
      </div>

      <div
        class="grid gap-3"
        v-motion
        :initial="motionVariants.block.initial"
        :enter="{ ...motionVariants.block.enter, transition: { ...motionVariants.block.enter.transition, delay: 130 } }"
      >
        <div
          v-for="(item, index) in proofItems"
          :key="item.label"
          v-motion
          :initial="motionVariants.pop.initial"
          :enter="staggerEnter(index, 95, 140)"
        >
          <ImpactStat :value="item.value" :label="item.label" :note="item.note" />
        </div>
      </div>
    </section>

    <RibbonMarquee
      :items="marqueeItems"
      v-motion
      :initial="motionVariants.revealLeft.initial"
      :enter="motionVariants.revealLeft.enter"
    />

    <section class="space-y-8">
      <SectionTitle
        eyebrow="Le programme"
        title="Un seul parcours public, présenté sans effet catalogue"
        description="La page d’accueil pose les repères indispensables avant toute prise de contact : nature du titre, niveau, modalité, logique de compétences et cadre d’accompagnement."
      />

      <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card
          v-for="(item, index) in summaryCards"
          :key="item.label"
          class="diamond-panel surface-cut"
          v-motion
          :initial="{ opacity: 0, y: 16 }"
          :enter="staggerEnter(index, 90, 80)"
        >
          <CardHeader>
            <CardTitle class="text-base">{{ item.label }}</CardTitle>
          </CardHeader>
          <CardContent class="text-sm leading-relaxed text-muted-foreground">
            {{ item.value }}
          </CardContent>
        </Card>
      </div>
    </section>

    <section class="space-y-8">
      <SectionTitle
        eyebrow="Repères"
        title="Un site construit pour informer, pas pour surpromettre"
        description="Le contenu public reste volontairement resserré sur des faits sourcés et sur ce qu’un particulier doit comprendre avant d’aller plus loin."
      />

      <div class="grid gap-4 md:grid-cols-3">
        <Card
          v-for="(item, index) in highlights"
          :key="item.title"
          class="diamond-panel surface-cut"
          v-motion
          :initial="{ opacity: 0, y: 16 }"
          :enter="staggerEnter(index)"
        >
          <CardHeader>
            <component :is="item.icon" class="mb-2 h-6 w-6 text-primary" />
            <CardTitle>{{ item.title }}</CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-sm leading-relaxed text-muted-foreground">
              {{ item.description }}
            </p>
          </CardContent>
        </Card>
      </div>
    </section>

    <section class="grid gap-6 lg:grid-cols-[0.9fr,1.1fr]">
      <div class="space-y-6">
        <SectionTitle
          eyebrow="Compétences"
          title="Le cœur du RPMS : pilotage, organisation, management"
          description="Les blocs du programme sont orientés vers la conduite d’une activité, l’animation d’équipe et la structuration d’une petite ou moyenne organisation."
        />

        <div class="grid gap-3">
          <article
            v-for="cluster in competencyClusters"
            :key="cluster"
            class="surface-cut rounded-[1.35rem] px-5 py-4 text-sm font-medium text-foreground"
          >
            {{ cluster }}
          </article>
        </div>
      </div>

      <div class="space-y-4">
        <article
          v-for="block in program?.blocks ?? []"
          :key="block.code"
          class="diamond-panel surface-cut rounded-[1.6rem] p-5"
        >
          <p class="kicker">{{ block.code }}</p>
          <h3 class="mt-3 text-xl font-semibold text-foreground">{{ block.title }}</h3>
          <p class="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
            {{ block.details }}
          </p>
        </article>
      </div>
    </section>

    <section class="space-y-8">
      <SectionTitle
        eyebrow="Parcours"
        title="Trois temps pour comprendre le cadre avant d’entrer en relation"
        description="Le site public n’essaie pas de tout résoudre dès l’accueil : il pose le programme, le cadre pédagogique et le point d’entrée unique."
      />

      <div class="grid gap-4 md:grid-cols-3">
        <Card
          v-for="(step, index) in journey"
          :key="step.title"
          class="diamond-panel surface-cut"
          v-motion
          :initial="{ opacity: 0, y: 16 }"
          :enter="staggerEnter(index, 105, 100)"
        >
          <CardHeader>
            <component
              :is="[GraduationCap, Waypoints, BookOpenCheck][index] ?? GraduationCap"
              class="mb-2 h-6 w-6 text-primary"
            />
            <CardTitle>{{ step.title }}</CardTitle>
          </CardHeader>
          <CardContent class="text-sm leading-relaxed text-muted-foreground">
            {{ step.text }}
          </CardContent>
        </Card>
      </div>
    </section>

    <section class="diamond-panel surface-cut rounded-[2rem] p-8 text-center lg:p-12">
      <p class="kicker">Prise de contact</p>
      <h2 class="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">
        Un seul point d’entrée pour obtenir les bonnes informations
      </h2>
      <p class="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
        Si vous souhaitez clarifier le contenu du programme, son cadre pédagogique ou sa logique
        d’accompagnement, la demande de rappel est le point d’accès unique du site.
      </p>
      <div class="mt-6 flex flex-wrap justify-center gap-3">
        <RouterLink to="/contact">
          <Button size="lg">Être rappelé</Button>
        </RouterLink>
        <RouterLink to="/programme">
          <Button size="lg" variant="outline">Voir le programme</Button>
        </RouterLink>
      </div>
    </section>

    <p v-if="loading" class="text-sm text-muted-foreground">Actualisation du contenu…</p>
  </div>
</template>
