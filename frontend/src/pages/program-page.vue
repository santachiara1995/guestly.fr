<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowRight } from 'lucide-vue-next'

import SectionTitle from '@/components/section-title.vue'
import TrustStrip from '@/components/visual/trust-strip.vue'
import { Button } from '@/components/ui/button'
import { useExperienceVariant } from '@/composables/use-experience-variant'
import { api } from '@/lib/api'
import { motionVariants, staggerEnter } from '@/lib/motion'

const program = ref(null)
const site = ref({
  program: {}
})
const loading = ref(true)
const errorMessage = ref('')

const { toWithExperience } = useExperienceVariant()

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

function splitSkills(value) {
  return String(value ?? '')
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean)
}

const pageCopy = computed(() => site.value.program ?? {})
const contactLink = computed(() => toWithExperience('/contact'))
const accessLink = computed(() => toWithExperience('/acces-et-accompagnement'))
const financeLink = computed(() => toWithExperience('/financement'))

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

const blocks = computed(() =>
  (program.value?.blocks ?? []).map((block) => ({
    ...block,
    skills: splitSkills(block.details)
  }))
)

const hero = computed(() => {
  const value = pageCopy.value.hero ?? {}
  return {
    eyebrow: value.eyebrow ?? 'Programme RPMS',
    title:
      value.title ??
      'Le programme détaille les compétences contenues dans les trois grands blocs du référentiel.',
    description:
      value.description ??
      'Chaque bloc est présenté avec sa liste de compétences associées, sans ajout hors référentiel.',
    note:
      value.note ??
      "Vous passez ici d'une vue d'ensemble à une lecture précise des compétences qui structurent le titre."
  }
})

const summarySection = computed(() => pageCopy.value.summarySection ?? {})
const competencySection = computed(() => pageCopy.value.competencySection ?? {})
const blocksSection = computed(() => pageCopy.value.blocksSection ?? {})
const ctaBand = computed(() => pageCopy.value.ctaBand ?? {})
</script>

<template>
  <div class="space-y-12 sm:space-y-14 lg:space-y-16">
    <p v-if="loading" class="text-sm text-muted-foreground">Chargement du programme…</p>
    <p
      v-else-if="errorMessage"
      class="rounded-[1rem] border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive"
    >
      {{ errorMessage }}
    </p>

    <template v-else-if="program">
      <section
        class="page-hero grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.02fr,0.98fr] lg:p-10"
        v-motion
        :initial="motionVariants.block.initial"
        :enter="motionVariants.block.enter"
      >
        <div class="space-y-6">
          <div class="space-y-4">
            <p class="kicker">{{ hero.eyebrow }}</p>
            <h1 class="editorial-title max-w-4xl text-[clamp(2.15rem,4.2vw,3.95rem)] text-foreground">
              {{ hero.title }}
            </h1>
            <p class="max-w-3xl text-base leading-8 text-muted-foreground sm:text-[1.02rem]">
              {{ hero.description }}
            </p>
          </div>

          <p class="max-w-2xl text-base font-medium leading-7 text-foreground sm:text-[1rem]">
            {{ hero.note }}
          </p>

          <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button :as="RouterLink" :to="contactLink" size="lg">
              Être rappelé
              <ArrowRight class="ml-2 h-4 w-4" />
            </Button>
            <Button :as="RouterLink" :to="financeLink" size="lg" variant="outline">
              Voir le financement
            </Button>
          </div>

          <TrustStrip :items="trustStripItems" />
        </div>

        <aside class="trust-panel page-cut p-6 sm:p-7">
          <p class="kicker">Bloc par bloc</p>
          <h2 class="mt-4 text-[clamp(1.55rem,3vw,2.15rem)] font-semibold tracking-[-0.04em] text-foreground">
            Trois blocs structurent le titre.
          </h2>

          <div class="mt-6 grid gap-3">
            <article
              v-for="(block, index) in blocks"
              :key="block.code"
              class="decision-card"
              v-motion
              :initial="motionVariants.pop.initial"
              :enter="staggerEnter(index, 52, 28)"
            >
              <p class="programme-block__code">{{ block.code }}</p>
              <h3 class="mt-2 text-base font-semibold leading-tight text-foreground">
                {{ block.title }}
              </h3>
            </article>
          </div>
        </aside>
      </section>

      <section class="space-y-6">
        <SectionTitle
          :eyebrow="summarySection.eyebrow ?? 'Vue d’ensemble'"
          :title="summarySection.title ?? 'Trois blocs structurent le programme.'"
          :description="summarySection.description ?? 'Le titre s’organise autour de trois blocs qui couvrent la direction de la structure, la mise en oeuvre de son objet social et le rapport d’activité.'"
        />

        <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <article
            v-for="(item, index) in atAGlance"
            :key="item.label"
            class="feature-tile"
            v-motion
            :initial="motionVariants.pop.initial"
            :enter="staggerEnter(index, 48, 24)"
          >
            <p class="detail-key">{{ item.label }}</p>
            <p class="mt-3 text-sm font-semibold leading-6 text-foreground">
              {{ item.value }}
            </p>
          </article>
        </div>
      </section>

      <section class="grid gap-6 lg:grid-cols-[0.98fr,1.02fr]">
        <article class="page-cut p-6 sm:p-7">
          <SectionTitle
            :eyebrow="competencySection.eyebrow ?? 'Lecture du rôle'"
            :title="competencySection.title ?? 'Chaque bloc correspond à une responsabilité claire dans la conduite d’une structure.'"
            :description="competencySection.description ?? 'Cette lecture vous aide à évaluer concrètement la portée du titre avant toute prise de décision.'"
          />

          <div class="mt-6 grid gap-3">
            <article
              v-for="(item, index) in program.objectiveSummary"
              :key="item"
              class="decision-card"
              v-motion
              :initial="motionVariants.block.initial"
              :enter="staggerEnter(index, 48, 24)"
            >
              <p class="detail-key">Point {{ index + 1 }}</p>
              <p class="mt-3 text-sm leading-7 text-muted-foreground">
                {{ item }}
              </p>
            </article>
          </div>
        </article>

        <article class="page-cut p-6 sm:p-7">
          <p class="kicker">Responsabilités travaillées</p>
          <h2 class="mt-4 text-[clamp(1.55rem,3vw,2.15rem)] font-semibold tracking-[-0.04em] text-foreground">
            Le programme reste relié à un rôle de pilotage, de management et de suivi.
          </h2>

          <div class="mt-6 grid gap-3">
            <article
              v-for="(scope, index) in program.professionalScope"
              :key="scope"
              class="elevated-item rounded-[1rem] p-4"
              v-motion
              :initial="motionVariants.pop.initial"
              :enter="staggerEnter(index, 48, 24)"
            >
              <div class="flex items-start gap-3">
                <span class="finance-badge">{{ index + 1 }}</span>
                <p class="text-sm leading-6 text-foreground">{{ scope }}</p>
              </div>
            </article>
          </div>
        </article>
      </section>

      <section class="space-y-6">
        <SectionTitle
          :eyebrow="blocksSection.eyebrow ?? 'Compétences détaillées'"
          :title="blocksSection.title ?? 'Chaque bloc est présenté avec la liste de compétences qui le compose.'"
          :description="blocksSection.description ?? 'Vous retrouvez ici le détail de RNCP38575BC01, RNCP38575BC02 et RNCP38575BC03.'"
        />

        <div class="programme-ladder">
          <article
            v-for="(block, index) in blocks"
            :key="block.code"
            class="programme-block"
            v-motion
            :initial="motionVariants.block.initial"
            :enter="staggerEnter(index, 56, 28)"
          >
            <span class="programme-block__badge">{{ index + 1 }}</span>
            <p class="programme-block__code">{{ block.code }}</p>
            <h3 class="mt-2 text-[1.08rem] font-semibold leading-tight tracking-[-0.03em] text-foreground">
              {{ block.title }}
            </h3>
            <ul class="programme-skills mt-4">
              <li v-for="skill in block.skills" :key="skill">
                {{ skill }}
              </li>
            </ul>
          </article>
        </div>
      </section>

      <section class="arch-cta p-6 sm:p-8 lg:p-10">
        <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div class="space-y-3">
            <p class="kicker">{{ ctaBand.eyebrow ?? 'Après la lecture du programme' }}</p>
            <h2 class="editorial-title max-w-3xl text-[clamp(1.95rem,3vw,2.85rem)] text-foreground">
              {{ ctaBand.title ?? 'Consulter le financement ou demander un rappel' }}
            </h2>
            <p class="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-[1rem]">
              {{ ctaBand.description ?? 'Une fois le programme parcouru, vous pouvez vérifier les modalités financières ou faire le point sur votre projet.' }}
            </p>
          </div>

          <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button :as="RouterLink" :to="contactLink" size="lg">
              Être rappelé
              <ArrowRight class="ml-2 h-4 w-4" />
            </Button>
            <Button :as="RouterLink" :to="financeLink" size="lg" variant="outline">
              Voir le financement
            </Button>
            <Button :as="RouterLink" :to="accessLink" size="lg" variant="ghost">
              Accès et accompagnement
            </Button>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>
