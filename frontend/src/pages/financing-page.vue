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
  finance: {}
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

const financeCopy = computed(() => site.value.finance ?? {})
const programLink = computed(() => toWithExperience('/programme'))
const contactLink = computed(() => toWithExperience('/contact'))
const trustStripItems = computed(() => [
  program.value?.rncpCode ?? 'RNCP38575',
  program.value?.levelLabel ?? 'Niveau 5 / Bac+2',
  program.value?.formatLabel ?? '100 % distanciel',
  program.value?.supportLabel ?? 'Accompagnement pédagogique'
])

const paymentOptions = computed(() => financeCopy.value.paymentSection?.options ?? [])
const financeConditions = computed(() => financeCopy.value.conditionsSection?.items ?? [])
</script>

<template>
  <div class="space-y-12 sm:space-y-14 lg:space-y-16">
    <p v-if="loading" class="text-sm text-muted-foreground">Chargement des informations…</p>

    <template v-else>
      <section
        class="page-hero grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.04fr,0.96fr] lg:p-10"
        v-motion
        :initial="motionVariants.block.initial"
        :enter="motionVariants.block.enter"
      >
        <div class="space-y-6">
          <div class="space-y-4">
            <p class="kicker">{{ financeCopy.hero?.eyebrow ?? 'Financement RPMS' }}</p>
            <h1 class="editorial-title max-w-4xl text-[clamp(2.1rem,4.3vw,3.8rem)] text-foreground">
              {{ financeCopy.hero?.title }}
            </h1>
            <p class="max-w-3xl text-base leading-8 text-muted-foreground sm:text-[1.02rem]">
              {{ financeCopy.hero?.description }}
            </p>
          </div>

          <TrustStrip :items="trustStripItems" />
        </div>

        <aside class="page-cut grid gap-4 p-6 sm:p-7">
          <p class="kicker">{{ financeCopy.pricing?.eyebrow ?? 'Prix de la formation' }}</p>
          <div class="space-y-2">
            <h2 class="text-[clamp(1.55rem,3vw,2.25rem)] font-semibold tracking-[-0.04em] text-foreground">
              {{ financeCopy.pricing?.title ?? 'Tarif de référence' }}
            </h2>
            <p class="text-[clamp(2rem,4vw,3.2rem)] font-semibold tracking-[-0.05em] text-primary">
              {{ financeCopy.pricing?.amount ?? '3 500 € TTC' }}
            </p>
            <p class="text-sm leading-7 text-muted-foreground">
              {{ financeCopy.pricing?.description }}
            </p>
          </div>
        </aside>
      </section>

      <section class="grid gap-6 lg:grid-cols-[1.05fr,0.95fr]">
        <article class="page-cut p-6 sm:p-7">
          <SectionTitle
            :eyebrow="financeCopy.paymentSection?.eyebrow ?? 'Modalités de paiement'"
            :title="financeCopy.paymentSection?.title ?? 'Des solutions de règlement clairement établies'"
          />

          <div class="mt-6 grid gap-3">
            <article
              v-for="(option, index) in paymentOptions"
              :key="option"
              class="elevated-item rounded-[1rem] p-4"
              v-motion
              :initial="motionVariants.pop.initial"
              :enter="staggerEnter(index, 48, 28)"
            >
              <div class="flex items-start gap-3">
                <span class="finance-badge">{{ index + 1 }}</span>
                <p class="text-sm leading-6 text-foreground">{{ option }}</p>
              </div>
            </article>
          </div>
        </article>

        <article class="page-cut p-6 sm:p-7">
          <SectionTitle
            :eyebrow="financeCopy.conditionsSection?.eyebrow ?? 'Conditions mentionnées'"
            :title="financeCopy.conditionsSection?.title ?? 'Les conditions principales liées à l’offre'"
          />

          <div class="mt-6 grid gap-3">
            <article
              v-for="(item, index) in financeConditions"
              :key="item"
              class="elevated-item rounded-[1rem] p-4"
              v-motion
              :initial="motionVariants.pop.initial"
              :enter="staggerEnter(index, 48, 28)"
            >
              <div class="flex items-start gap-3">
                <span class="finance-line" aria-hidden="true"></span>
                <p class="text-sm leading-6 text-foreground">{{ item }}</p>
              </div>
            </article>
          </div>
        </article>
      </section>

      <section class="arch-cta p-6 sm:p-8 lg:p-10">
        <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div class="space-y-3">
            <p class="kicker">{{ financeCopy.ctaBand?.eyebrow ?? 'Besoin d’aller plus loin ?' }}</p>
            <h2 class="editorial-title max-w-3xl text-[clamp(1.9rem,3vw,2.8rem)] text-foreground">
              {{ financeCopy.ctaBand?.title ?? 'Voir le programme ou demander un rappel' }}
            </h2>
            <p class="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-[1rem]">
              {{ financeCopy.ctaBand?.description }}
            </p>
          </div>

          <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button :as="RouterLink" :to="programLink" size="lg">
              Voir le programme
              <ArrowRight class="ml-2 h-4 w-4" />
            </Button>
            <Button :as="RouterLink" :to="contactLink" size="lg" variant="outline">
              Être rappelé
            </Button>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>
