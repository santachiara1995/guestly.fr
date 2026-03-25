<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowRight } from 'lucide-vue-next'

import SectionTitle from '@/components/section-title.vue'
import TrustStrip from '@/components/visual/trust-strip.vue'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'
import { motionVariants, staggerEnter } from '@/lib/motion'

const program = ref(null)
const loading = ref(true)
const errorMessage = ref('')

onMounted(async () => {
  try {
    program.value = await api.getProgram('rpms')
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Programme introuvable.'
  } finally {
    loading.value = false
  }
})

const heroTitle = computed(
  () =>
    program.value?.title ?? 'Titre professionnel Responsable petite et moyenne structure (RPMS)'
)
const heroSubtitle = computed(
  () =>
    program.value?.intro ??
    'Titre professionnel de niveau 5 / Bac+2 pour diriger une petite ou moyenne structure dans ses dimensions stratégiques, administratives, humaines et territoriales.'
)
const heroNote =
  "Le programme détaille les responsabilités que le RPMS vous prépare à tenir en activité, équipe, territoire, production et reporting."
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

const objectiveCards = computed(() =>
  (program.value?.objectiveSummary ?? []).map((text, index) => ({
    eyebrow: `Objectif ${index + 1}`,
    text
  }))
)
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
      <section
        class="page-hero grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.04fr,0.96fr] lg:p-10"
        v-motion
        :initial="motionVariants.block.initial"
        :enter="motionVariants.block.enter"
      >
        <div class="space-y-6">
          <div class="space-y-4">
            <p class="kicker">Programme RPMS</p>
            <h1 class="editorial-title max-w-4xl text-[clamp(2.35rem,4.8vw,4.15rem)] text-foreground">
              {{ heroTitle }}
            </h1>
            <p class="max-w-3xl text-base leading-8 text-muted-foreground sm:text-[1.05rem]">
              {{ heroSubtitle }}
            </p>
          </div>

          <p class="max-w-2xl text-base font-medium leading-7 text-foreground sm:text-[1.02rem]">
            {{ heroNote }}
          </p>

          <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
            <RouterLink to="/contact">
              <Button size="lg">
                Être rappelé
                <ArrowRight class="ml-2 h-4 w-4" />
              </Button>
            </RouterLink>
            <RouterLink
              to="/acces-et-accompagnement"
              class="inline-flex min-h-11 items-center text-sm font-semibold text-primary transition-colors hover:text-secondary"
            >
              Voir les modalités d'accès
            </RouterLink>
          </div>

          <TrustStrip :items="trustStripItems" />
        </div>

        <aside class="page-cut p-6 sm:p-7">
          <p class="kicker">Repères officiels</p>
          <h2 class="mt-4 text-[clamp(1.7rem,3vw,2.35rem)] font-semibold leading-tight tracking-[-0.04em] text-foreground">
            Une lecture directe du titre, du niveau et du format.
          </h2>
          <p class="mt-4 text-sm leading-7 text-muted-foreground">
            Le programme sert à lire la logique du titre sans brouiller l'essentiel: repères
            officiels, compétences, modalités et responsabilités travaillées.
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

      <section class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article
          v-for="(item, index) in objectiveCards"
          :key="item.text"
          class="page-cut p-5"
          v-motion
          :initial="motionVariants.block.initial"
          :enter="staggerEnter(index, 55, 40)"
        >
          <p class="kicker">{{ item.eyebrow }}</p>
          <p class="mt-3 text-sm leading-7 text-foreground">
            {{ item.text }}
          </p>
        </article>
      </section>

      <section class="grid gap-6 lg:grid-cols-[0.92fr,1.08fr]">
        <div class="space-y-6">
          <SectionTitle
            eyebrow="Compétences mobilisées"
            title="Le RPMS relie le pilotage quotidien à une vision plus large de la structure."
            description="Les compétences ci-dessous donnent une lecture concrète des responsabilités couvertes par le programme."
          />

          <article class="page-cut p-6 sm:p-7">
            <ul class="grid gap-3 sm:grid-cols-2">
              <li
                v-for="scope in program.professionalScope"
                :key="scope"
                class="elevated-item rounded-[1rem] px-4 py-4 text-sm leading-6 text-foreground"
              >
                {{ scope }}
              </li>
            </ul>
          </article>
        </div>

        <div class="space-y-6">
          <SectionTitle
            eyebrow="Cadre du parcours"
            title="Le programme reste lisible même avant d'entrer dans chaque bloc."
            description="Le titre, la modalité à distance et l'accompagnement pédagogique donnent le contexte. Les blocs détaillent ensuite le contenu."
          />

          <article class="page-cut p-6 sm:p-7">
            <TrustStrip :items="trustStripItems" />
            <p class="mt-5 text-sm leading-7 text-muted-foreground sm:text-[1rem]">
              Le parcours s'appuie sur un titre professionnel de niveau 5 / Bac+2. La page programme
              sert à voir comment ce cadre se décline en blocs de compétences.
            </p>
          </article>
        </div>
      </section>

      <section id="blocs" class="space-y-6">
        <SectionTitle
          eyebrow="Blocs de compétences"
          title="Le détail des grands blocs du programme"
          description="Chaque bloc éclaire un pan concret du rôle: structure, territoire, équipe, offre, production et résultats."
        />

        <div class="grid gap-4 xl:grid-cols-2">
          <article
            v-for="(block, index) in program.blocks"
            :key="block.code"
            class="page-cut p-5 sm:p-6"
            v-motion
            :initial="motionVariants.block.initial"
            :enter="staggerEnter(index, 55, 50)"
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
            <p class="kicker">Contact</p>
            <h2 class="editorial-title max-w-3xl text-[clamp(1.95rem,3vw,2.8rem)] text-foreground">
              Vérifier si le programme correspond à votre projet
            </h2>
            <p class="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-[1rem]">
              Si vous souhaitez aller plus loin après cette lecture, vous pouvez demander un rappel
              pour faire le point sur votre projet, le titre et vos questions.
            </p>
          </div>

          <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
            <RouterLink to="/contact">
              <Button size="lg">
                Être rappelé
                <ArrowRight class="ml-2 h-4 w-4" />
              </Button>
            </RouterLink>
            <RouterLink
              to="/acces-et-accompagnement"
              class="inline-flex min-h-11 items-center text-sm font-semibold text-primary transition-colors hover:text-secondary"
            >
              Voir les modalités d'accès
            </RouterLink>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>
