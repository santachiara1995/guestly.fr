<script setup>
import { computed, onMounted, ref } from 'vue'
import { BadgeCheck, CircleDollarSign, Clock3 } from 'lucide-vue-next'

import PrefooterCtaPanel from '@/components/shared/prefooter-cta-panel.vue'
import { api } from '@/lib/api'
import { motionVariants, staggerEnter } from '@/lib/motion'

const site = ref({
  finance: {}
})
const loading = ref(true)
const errorMessage = ref('')

onMounted(async () => {
  try {
    site.value = await api.getSite()
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Contenu indisponible.'
  } finally {
    loading.value = false
  }
})

const financeCopy = computed(() => site.value.finance ?? {})

const pricingHighlights = computed(() => [
  {
    label: financeCopy.value.pricing?.eyebrow ?? 'Prix de la formation',
    value: financeCopy.value.pricing?.amount ?? '3 500 € TTC',
    note:
      financeCopy.value.pricing?.description ??
      'Préparation à l’examen et accès aux formateurs inclus.',
    icon: CircleDollarSign,
    noteClass: 'finance-summary-card__note finance-summary-card__note--italic'
  },
  {
    label: 'Paiement comptant',
    value: 'Payez en une fois',
    note: '',
    icon: BadgeCheck
  },
  {
    label: 'Paiement en plusieurs fois',
    value: '3x ou 4x',
    note: '',
    accent: 'Sans frais',
    icon: Clock3
  }
])

const pricingFootnote = computed(
  () =>
    financeCopy.value.pricing?.footnote ??
    "Retrouvez ici le prix de la formation. L'accès à la formation est conditionné au paiement."
)
</script>

<template>
  <div class="financing-page page-stack -mx-4 sm:-mx-6 lg:-mx-8">
    <p v-if="loading" class="px-4 py-6 text-sm text-muted-foreground sm:px-6 lg:px-8">
      Chargement des informations…
    </p>

    <p
      v-else-if="errorMessage"
      class="mx-4 rounded-[1rem] border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive sm:mx-6 lg:mx-8"
    >
      {{ errorMessage }}
    </p>

    <template v-else>
      <section
        class="page-shell px-4 py-6 sm:px-6 lg:px-8 lg:py-8"
        v-motion
        :initial="motionVariants.block.initial"
        :enter="motionVariants.block.enter"
      >
        <article class="page-hero space-y-5 p-5 sm:p-6 lg:space-y-6 lg:p-7">
          <div class="space-y-3">
            <h1 class="editorial-title max-w-3xl text-[clamp(1.95rem,3.4vw,3rem)] text-foreground">
              {{
                financeCopy.hero?.title ??
                'Le financement du RPMS, présenté de manière claire et directe.'
              }}
            </h1>
            <p
              v-if="financeCopy.hero?.description"
              class="hero-lead max-w-3xl text-base leading-7 text-muted-foreground sm:text-[1rem]"
            >
              {{
                financeCopy.hero?.description ??
                "Prix, modalités de paiement et conditions de l'offre sont réunis ici pour vous permettre d'avancer en connaissance de cause."
              }}
            </p>
          </div>

          <div class="grid gap-4 md:auto-rows-fr md:grid-cols-3">
            <article
              v-for="(item, index) in pricingHighlights"
              :key="item.label"
              class="paper-card finance-summary-card h-full"
              v-motion
              :initial="motionVariants.pop.initial"
              :enter="staggerEnter(index, 44, 20)"
            >
              <div class="flex items-start gap-3">
                <span class="paper-card__icon" aria-hidden="true">
                  <component :is="item.icon" class="h-4 w-4" />
                </span>
                <div class="finance-summary-card__content">
                  <p class="detail-key">{{ item.label }}</p>
                  <p class="finance-summary-card__value">{{ item.value }}</p>
                  <p v-if="item.accent" class="finance-summary-card__accent">
                    {{ item.accent }}
                  </p>
                  <p v-if="item.note" :class="item.noteClass ?? 'finance-summary-card__note'">
                    {{ item.note }}
                  </p>
                </div>
              </div>
            </article>
          </div>

          <p class="finance-footnote">
            {{ pricingFootnote }}
          </p>
        </article>
      </section>

      <section class="page-shell px-4 py-0 sm:px-6 lg:px-8">
        <PrefooterCtaPanel />
      </section>
    </template>
  </div>
</template>
