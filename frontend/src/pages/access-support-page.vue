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

const site = ref({
  access: {}
})
const program = ref(null)
const loading = ref(true)

const { toWithExperience } = useExperienceVariant()

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
const programLink = computed(() => toWithExperience('/programme'))
const financeLink = computed(() => toWithExperience('/financement'))
const contactLink = computed(() => toWithExperience('/contact'))

const hero = computed(() => accessCopy.value.hero ?? {})
const checklist = computed(() => accessCopy.value.fitChecklist ?? {})
const supportSection = computed(() => accessCopy.value.supportSection ?? {})
const processSection = computed(() => accessCopy.value.processSection ?? {})
const ctaBand = computed(() => accessCopy.value.ctaBand ?? {})

const trustStripItems = computed(() => [
  program.value?.rncpCode ?? 'RNCP38575',
  program.value?.levelLabel ?? 'Niveau 5 / Bac+2',
  program.value?.formatLabel ?? '100 % distanciel',
  program.value?.supportLabel ?? 'Accompagnement pédagogique'
])
</script>

<template>
  <div class="space-y-10 sm:space-y-11 lg:space-y-12">
    <p v-if="loading" class="text-sm text-muted-foreground">Actualisation du contenu…</p>

    <template v-else>
      <section
        class="page-hero grid gap-6 p-5 sm:p-6 lg:grid-cols-[1.04fr,0.96fr] lg:p-8"
        v-motion
        :initial="motionVariants.block.initial"
        :enter="motionVariants.block.enter"
      >
        <div class="space-y-6">
          <div class="space-y-4">
            <p class="kicker">{{ hero.eyebrow }}</p>
            <h1 class="editorial-title max-w-4xl text-[clamp(1.75rem,3vw,2.6rem)] text-foreground">
              {{ hero.title }}
            </h1>
            <p class="max-w-3xl text-base leading-8 text-muted-foreground sm:text-[1.02rem]">
              {{ hero.description }}
            </p>
          </div>

          <p class="max-w-2xl text-base font-medium leading-7 text-foreground sm:text-[1rem]">
            {{ hero.fitLine }}
          </p>

          <TrustStrip :items="trustStripItems" />
        </div>

        <aside class="trust-panel page-cut p-5 sm:p-6">
          <p class="kicker">{{ supportSection.eyebrow }}</p>
          <h2 class="mt-4 text-[clamp(1.25rem,2vw,1.7rem)] font-semibold tracking-[-0.04em] text-foreground">
            {{ supportSection.title }}
          </h2>
          <p class="mt-4 text-sm leading-7 text-muted-foreground">
            {{ supportSection.description }}
          </p>

          <div class="mt-6 grid gap-3">
            <article
              v-for="(point, index) in supportSection.points ?? []"
              :key="point"
              class="elevated-item rounded-[1rem] p-4"
              v-motion
              :initial="motionVariants.pop.initial"
              :enter="staggerEnter(index, 48, 24)"
            >
              <div class="flex items-start gap-3">
                <span class="finance-line" aria-hidden="true"></span>
                <p class="text-sm leading-6 text-foreground">{{ point }}</p>
              </div>
            </article>
          </div>
        </aside>
      </section>

      <section class="space-y-6">
        <SectionTitle
          :eyebrow="checklist.eyebrow"
          :title="checklist.title"
          :description="checklist.description"
        />

        <div class="grid gap-4 xl:grid-cols-3">
          <article
            v-for="(item, index) in checklist.items ?? []"
            :key="item"
            class="decision-card p-4 sm:p-5"
            v-motion
            :initial="motionVariants.block.initial"
            :enter="staggerEnter(index, 48, 24)"
          >
            <p class="detail-key">Vérification {{ index + 1 }}</p>
            <p class="mt-3 text-sm leading-7 text-muted-foreground">
              {{ item }}
            </p>
          </article>
        </div>
      </section>

      <section class="grid gap-6 lg:grid-cols-[1fr,1fr]">
        <article class="page-cut p-5 sm:p-6">
          <SectionTitle
            :eyebrow="processSection.eyebrow"
            :title="processSection.title"
            :description="processSection.description"
          />

          <div class="mt-6 grid gap-3">
            <article
              v-for="(step, index) in processSection.steps ?? []"
              :key="step"
              class="elevated-item rounded-[1rem] p-4"
              v-motion
              :initial="motionVariants.pop.initial"
              :enter="staggerEnter(index, 48, 24)"
            >
              <div class="flex items-start gap-3">
                <span class="finance-badge">{{ index + 1 }}</span>
                <p class="text-sm leading-6 text-foreground">{{ step }}</p>
              </div>
            </article>
          </div>
        </article>

        <article class="page-cut p-5 sm:p-6">
          <p class="kicker">Parcours conseillé</p>
          <h2 class="mt-4 text-[clamp(1.25rem,2vw,1.7rem)] font-semibold tracking-[-0.04em] text-foreground">
            Programme, financement, puis échange si nécessaire.
          </h2>
          <p class="mt-4 text-sm leading-7 text-muted-foreground">
            Prenez d'abord le temps de parcourir le programme et le financement. Si vous souhaitez ensuite valider votre projet, le rappel vous permet d'obtenir une réponse adaptée.
          </p>

          <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button :as="RouterLink" :to="programLink" size="lg">
              Voir le programme
              <ArrowRight class="ml-2 h-4 w-4" />
            </Button>
            <Button :as="RouterLink" :to="contactLink" size="lg" variant="outline">
              Être rappelé
            </Button>
          </div>

          <RouterLink
            :to="financeLink"
            class="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:text-secondary hover:underline"
          >
            Consulter le financement
          </RouterLink>
        </article>
      </section>

      <section class="arch-cta p-5 sm:p-6 lg:p-8">
        <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div class="space-y-3">
            <p class="kicker">{{ ctaBand.eyebrow }}</p>
            <h2 class="editorial-title max-w-3xl text-[clamp(1.55rem,2.3vw,2.1rem)] text-foreground">
              {{ ctaBand.title }}
            </h2>
            <p class="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-[1rem]">
              {{ ctaBand.description }}
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
  </div>
</template>
