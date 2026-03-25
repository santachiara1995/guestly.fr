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

const program = ref({
  levelLabel: 'Niveau 5 (Bac+2)',
  formatLabel: '100 % distanciel',
  rhythmLabel: 'E-learning',
  supportLabel: 'Accompagnement pédagogique',
  blocks: []
})
const site = ref({
  positioning: {
    eyebrow: 'Titre professionnel RPMS'
  },
  home: {
    proofItems: [],
    journey: [],
    competencyClusters: []
  }
})
const loading = ref(true)
const errorMessage = ref('')

const heroSubtitle =
  "CITYZ'France présente le titre professionnel Responsable petite et moyenne structure (RPMS) avec les repères utiles pour lire le niveau, la modalité, le format pédagogique et les compétences centrales."

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
const journey = computed(() => site.value.home?.journey ?? [])
const competencyClusters = computed(() => site.value.home?.competencyClusters ?? [])
const summaryCards = computed(() =>
  [
    { label: 'Niveau', value: program.value?.levelLabel },
    { label: 'Modalité', value: program.value?.formatLabel },
    { label: 'Format', value: program.value?.rhythmLabel },
    { label: 'Accompagnement', value: program.value?.supportLabel }
  ].filter((item) => item.value)
)
const highlights = computed(() => [
  {
    icon: ShieldCheck,
    title: 'Repères stables',
    description:
      "Le titre, le code RNCP, le niveau et la modalité restent visibles dès l'entrée du site."
  },
  {
    icon: BookOpenCheck,
    title: 'Lecture directe',
    description:
      'La hiérarchie des pages va du repère essentiel vers le détail, sans multiplier les blocs équivalents.'
  },
  {
    icon: Building2,
    title: 'Cœur métier',
    description:
      "Pilotage, management, organisation, communication et reporting structurent l'ensemble du parcours public."
  }
])
const heroFacts = computed(() => [
  {
    label: 'Code RNCP',
    value: 'RNCP38575',
    note: "Titre professionnel visible dans les repères publics."
  },
  {
    label: 'Niveau',
    value: 'Niveau 5',
    note: 'Positionnement Bac+2.'
  },
  {
    label: 'Modalité',
    value: '100 % distanciel',
    note: 'Lecture à distance.'
  },
  {
    label: 'Format',
    value: 'E-learning',
    note: 'Support pédagogique numérique.'
  }
])
const compactBlocks = computed(() => (program.value?.blocks ?? []).slice(0, 3))
const journeyIcons = [GraduationCap, Waypoints, BookOpenCheck]
</script>

<template>
  <div class="space-y-12 sm:space-y-14">
    <section class="grid gap-6 lg:grid-cols-[1.08fr,0.92fr]">
      <div class="space-y-5">
        <p class="kicker">{{ site.positioning?.eyebrow ?? 'Titre professionnel RPMS' }}</p>

        <div class="space-y-4">
          <h1 class="editorial-title max-w-3xl text-[clamp(2.75rem,6.4vw,5rem)] text-foreground">
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

        <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <div
            v-for="fact in heroFacts"
            :key="fact.label"
            class="page-cut rounded-xl px-4 py-4"
          >
            <p class="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {{ fact.label }}
            </p>
            <p class="mt-2 text-lg font-semibold text-foreground">{{ fact.value }}</p>
            <p class="mt-1 text-sm leading-relaxed text-muted-foreground">{{ fact.note }}</p>
          </div>
        </div>

        <p
          v-if="errorMessage"
          class="rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          {{ errorMessage }}
        </p>
      </div>

      <div class="space-y-4">
        <div class="page-cut rounded-[1.25rem] p-5 sm:p-6">
          <div class="flex items-center justify-between gap-3">
            <p class="kicker">Repères clés</p>
            <span class="rounded-full border border-border bg-white px-3 py-1 text-xs font-semibold text-muted-foreground">
              Synthèse
            </span>
          </div>

          <div class="grid gap-3 sm:grid-cols-2 mt-4">
            <div v-for="(item, index) in proofItems" :key="item.label">
              <ImpactStat
                v-motion
                :initial="motionVariants.pop.initial"
                :enter="staggerEnter(index, 70, 90)"
                :value="item.value"
                :label="item.label"
                :note="item.note"
              />
            </div>
          </div>
        </div>

        <div class="page-cut rounded-[1.25rem] p-5 sm:p-6">
          <p class="kicker">Compétences centrales</p>
          <div class="dense-list mt-4">
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
        title="Les quatre repères qui structurent la lecture publique"
        description="Le résumé met en avant les faits stables avant d'aller vers le détail des blocs."
      />

      <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card
          v-for="(item, index) in summaryCards"
          :key="item.label"
          class="page-cut"
          v-motion
          :initial="{ opacity: 0, y: 12 }"
          :enter="staggerEnter(index, 80, 70)"
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

    <section class="grid gap-6 lg:grid-cols-[0.95fr,1.05fr]">
      <div class="space-y-6">
        <SectionTitle
          eyebrow="Points d'appui"
          title="Une hiérarchie courte pour aller vite à l'essentiel"
          description="Le site commence par les repères clés, puis détaille le programme, puis propose le contact."
        />

        <div class="grid gap-4 md:grid-cols-3">
          <Card
            v-for="(item, index) in highlights"
            :key="item.title"
            class="page-cut"
            v-motion
            :initial="{ opacity: 0, y: 12 }"
            :enter="staggerEnter(index, 85, 70)"
          >
            <CardHeader>
              <component :is="item.icon" class="mb-1.5 h-6 w-6 text-primary" />
              <CardTitle>{{ item.title }}</CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-sm leading-relaxed text-muted-foreground">
                {{ item.description }}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div class="space-y-6">
        <SectionTitle
          eyebrow="Blocs"
          title="Aperçu de la structure"
          description="Trois blocs suffisent ici pour donner le ton sans dupliquer toute la fiche."
        />

        <div class="grid gap-4">
          <Card
            v-for="block in compactBlocks"
            :key="block.code"
            class="page-cut"
          >
            <CardHeader class="space-y-3">
              <div class="flex flex-wrap items-center gap-2">
                <span class="rounded-full border border-border bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {{ block.code }}
                </span>
              </div>
              <CardTitle class="text-xl">{{ block.title }}</CardTitle>
            </CardHeader>
            <CardContent class="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
              {{ block.details }}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <section class="grid gap-6 lg:grid-cols-[0.95fr,1.05fr]">
      <div class="space-y-6">
        <SectionTitle
          eyebrow="Parcours"
          title="Trois étapes simples"
          description="La lecture va du repère au détail puis au point de contact."
        />

        <div class="grid gap-3">
          <article
            v-for="(step, index) in journey"
            :key="step.title"
            class="flex gap-4 rounded-xl border border-border bg-white px-4 py-4"
            v-motion
            :initial="{ opacity: 0, y: 12 }"
            :enter="staggerEnter(index, 85, 70)"
          >
            <span
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground"
            >
              {{ index + 1 }}
            </span>
            <div class="space-y-1">
              <h3 class="text-base font-semibold text-foreground">{{ step.title }}</h3>
              <p class="text-sm leading-relaxed text-muted-foreground">
                {{ step.text }}
              </p>
            </div>
          </article>
        </div>
      </div>

      <section class="page-cut rounded-[1.25rem] p-6 sm:p-8">
        <p class="kicker">Contact</p>
        <h2 class="editorial-title mt-3 text-[clamp(2rem,3vw,3.1rem)] text-foreground">
          Demander un rappel pour avancer
        </h2>
        <p class="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Le formulaire centralise la demande sur un seul point de contact.
        </p>

        <div class="mt-6 flex flex-wrap gap-3">
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
      </section>
    </section>
  </div>
</template>
