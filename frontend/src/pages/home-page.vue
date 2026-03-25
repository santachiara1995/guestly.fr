<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import {
  ArrowRight,
  BookOpenCheck,
  GraduationCap,
  ShieldCheck,
  Waypoints
} from 'lucide-vue-next'

import SectionTitle from '@/components/section-title.vue'
import ImpactStat from '@/components/visual/impact-stat.vue'
import RibbonMarquee from '@/components/visual/ribbon-marquee.vue'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'
import { motionVariants, staggerEnter } from '@/lib/motion'

const program = ref(null)
const site = ref({
  positioning: {
    eyebrow: 'Titre professionnel à distance',
    subtitle:
      "CITYZ'France présente le titre professionnel Responsable petite et moyenne structure (RPMS) pour des particuliers qui recherchent un cadre clair, sérieux et centré sur les repères essentiels."
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
        title: 'Lire le cadre d’accompagnement',
        text: 'Consulter les repères distanciels, le suivi pédagogique et les indications données avant la prise de contact.'
      },
      {
        title: 'Être rappelé',
        text: "Déposer une demande de rappel pour être recontacté avec une réponse adaptée au projet et au niveau d’information recherché."
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

const fallbackProgram = {
  levelLabel: 'Niveau 5 (Bac+2)',
  formatLabel: '100 % distanciel',
  rhythmLabel: 'E-learning',
  supportLabel: 'Accompagnement pédagogique',
  blocks: []
}

program.value = fallbackProgram

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

const proofItems = computed(() => site.value.home?.proofItems ?? [])
const heroFacts = computed(() => [
  { label: 'Niveau', value: program.value?.levelLabel },
  { label: 'Modalité', value: program.value?.formatLabel },
  { label: 'Format', value: program.value?.rhythmLabel },
  { label: 'Accompagnement', value: program.value?.supportLabel }
].filter((item) => item.value))
const highlights = computed(() => [
  {
    icon: ShieldCheck,
    title: 'Repère officiel',
    description:
      'Le contenu public se limite aux informations stabilisées qui cadrent le RPMS pour particuliers.'
  },
  {
    icon: BookOpenCheck,
    title: 'Lecture structurée',
    description:
      'Les éléments essentiels restent regroupés pour montrer le périmètre du programme d’un seul regard.'
  },
  {
    icon: Waypoints,
    title: 'Organisation du parcours',
    description:
      'Le site donne un chemin simple: comprendre le programme, lire le cadre, puis demander un rappel.'
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
</script>

<template>
  <div class="space-y-14">
    <section
      class="architectural-band grid gap-8 p-8 lg:grid-cols-[1.05fr,0.95fr] lg:p-12"
      v-motion
      :initial="motionVariants.block.initial"
      :enter="motionVariants.block.enter"
    >
      <div class="space-y-6">
        <p class="kicker">{{ site.positioning?.eyebrow ?? 'Titre professionnel à distance' }}</p>
        <h1 class="editorial-title max-w-2xl text-4xl text-foreground sm:text-5xl lg:text-6xl">
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

        <p class="text-sm text-muted-foreground">RNCP38575 · Niveau 5 / Bac+2 · 100 % distanciel</p>

        <p
          v-if="errorMessage"
          class="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          {{ errorMessage }}
        </p>
      </div>

      <div class="space-y-4">
        <article class="monument-panel surface-cut p-5">
          <p class="kicker">Dossier public</p>
          <div class="mt-3 flex items-center justify-between gap-4">
            <h2 class="text-2xl font-semibold text-foreground">Repères essentiels</h2>
            <span class="rounded-full border border-primary/20 bg-white/85 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              RPMS
            </span>
          </div>

          <div class="fact-grid mt-5">
            <div v-for="item in proofItems" :key="item.label" class="fact-item">
              <p class="fact-label">{{ item.label }}</p>
              <p class="fact-value">{{ item.value }}</p>
              <p class="fact-note">{{ item.note }}</p>
            </div>
          </div>
        </article>

        <article class="monument-panel surface-cut p-5">
          <div class="detail-grid">
            <div v-for="item in heroFacts" :key="item.label" class="detail-row">
              <p class="detail-key">{{ item.label }}</p>
              <p class="detail-value">{{ item.value }}</p>
            </div>
          </div>
        </article>
      </div>
    </section>

    <RibbonMarquee
      :items="marqueeItems"
      v-motion
      :initial="motionVariants.revealLeft.initial"
      :enter="motionVariants.revealLeft.enter"
    />

    <section class="section-shell space-y-8">
      <SectionTitle
        eyebrow="Repères"
        title="Une lecture directe du RPMS, sans surcharge visuelle"
        description="Le site reste concentré sur les informations utiles pour comprendre le cadre du programme avant d’entrer en relation."
      />

      <div class="grid gap-4 lg:grid-cols-[1.02fr,0.98fr]">
        <article class="monument-panel surface-cut p-6">
          <div class="flex items-center justify-between gap-4">
            <p class="kicker">Ce qui ressort</p>
            <span class="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Lecture publique
            </span>
          </div>

          <div class="mt-5 grid gap-0">
            <div
              v-for="(item, index) in highlights"
              :key="item.title"
              class="grid gap-4 border-t border-border/70 py-4 first:border-t-0 first:pt-0 sm:grid-cols-[auto,1fr]"
              v-motion
              :initial="{ opacity: 0, y: 12 }"
              :enter="staggerEnter(index, 90, 70)"
            >
              <component :is="item.icon" class="h-6 w-6 text-primary" />
              <div class="space-y-1">
                <h3 class="text-lg font-semibold text-foreground">{{ item.title }}</h3>
                <p class="text-sm leading-relaxed text-muted-foreground">
                  {{ item.description }}
                </p>
              </div>
            </div>
          </div>
        </article>

        <article class="monument-panel surface-cut p-6">
          <div class="flex items-center justify-between gap-4">
            <p class="kicker">Compétences</p>
            <span class="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              4 axes
            </span>
          </div>

          <div class="mt-5 grid gap-0">
            <div
              v-for="(cluster, index) in competencyClusters"
              :key="cluster"
              class="timeline-row px-0"
              v-motion
              :initial="{ opacity: 0, y: 12 }"
              :enter="staggerEnter(index, 80, 90)"
            >
              <span class="timeline-index">{{ String(index + 1).padStart(2, '0') }}</span>
              <div>
                <p class="timeline-title">{{ cluster }}</p>
                <p class="timeline-text">
                  Une lecture resserrée du pilotage, de l’organisation et du management dans une petite ou moyenne structure.
                </p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section class="section-shell space-y-8">
      <SectionTitle
        eyebrow="Programme"
        title="Le contenu du RPMS reste lisible d’un seul bloc"
        description="Les blocs de compétences sont présentés dans un format continu pour éviter l’empilement de vignettes sur mobile."
      />

      <div class="grid gap-6 lg:grid-cols-[0.92fr,1.08fr]">
        <article class="monument-panel surface-cut p-6">
          <p class="kicker">Structure</p>
          <div class="detail-grid mt-4">
            <div class="detail-row">
              <p class="detail-key">Niveau</p>
              <p class="detail-value">{{ program?.levelLabel }}</p>
            </div>
            <div class="detail-row">
              <p class="detail-key">Modalité</p>
              <p class="detail-value">{{ program?.formatLabel }}</p>
            </div>
            <div class="detail-row">
              <p class="detail-key">Format</p>
              <p class="detail-value">{{ program?.rhythmLabel }}</p>
            </div>
            <div class="detail-row">
              <p class="detail-key">Accompagnement</p>
              <p class="detail-value">{{ program?.supportLabel }}</p>
            </div>
          </div>
        </article>

        <article class="monument-panel surface-cut p-0">
          <div class="border-b border-border/70 px-6 py-5">
            <p class="kicker">Blocs de compétences</p>
            <h2 class="mt-3 text-2xl font-semibold text-foreground">Structure du programme</h2>
          </div>

          <div class="divide-y divide-border/70">
            <div
              v-for="block in program?.blocks ?? []"
              :key="block.code"
              class="space-y-3 px-6 py-5"
            >
              <p class="kicker">{{ block.code }}</p>
              <h3 class="text-xl font-semibold text-foreground">{{ block.title }}</h3>
              <p class="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                {{ block.details }}
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section class="section-shell space-y-8">
      <SectionTitle
        eyebrow="Parcours"
        title="Trois temps pour comprendre le cadre avant de demander un rappel"
        description="La progression reste simple: lire, situer le programme, puis entrer en relation si le cadre vous convient."
      />

      <div class="timeline-shell">
        <div
          v-for="(step, index) in journey"
          :key="step.title"
          class="timeline-row"
          v-motion
          :initial="motionVariants.block.initial"
          :enter="staggerEnter(index, 90, 80)"
        >
          <span class="timeline-index">{{ String(index + 1).padStart(2, '0') }}</span>
          <div>
            <h3 class="timeline-title">{{ step.title }}</h3>
            <p class="timeline-text">{{ step.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="arch-cta p-8 text-center lg:p-12">
      <p class="kicker">Prise de contact</p>
      <h2 class="mt-3 text-3xl font-semibold sm:text-4xl">
        Un point d’entrée unique pour demander un rappel
      </h2>
      <p class="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
        Si vous souhaitez avancer, le formulaire de contact concentre la demande et permet de
        poursuivre l’échange à partir du cadre RPMS présenté sur le site.
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
