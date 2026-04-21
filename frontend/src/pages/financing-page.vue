<script setup>
import { computed, onMounted, ref } from 'vue'

import FinanceSolutionsSection from '@/components/shared/finance-solutions-section.vue'
import PrefooterCtaPanel from '@/components/shared/prefooter-cta-panel.vue'
import { useExperienceVariant } from '@/composables/use-experience-variant'
import { api } from '@/lib/api'
import { motionVariants } from '@/lib/motion'

const site = ref({
  finance: {}
})
const loading = ref(true)
const errorMessage = ref('')

const { toWithExperience } = useExperienceVariant()

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
const hero = computed(() => financeCopy.value.hero ?? {})
const pricing = computed(() => financeCopy.value.pricing ?? {})
const paymentSection = computed(() => financeCopy.value.paymentSection ?? {})
const paymentLinks = computed(() => ({
  cashUrl: financeCopy.value.paymentLinks?.cashUrl ?? '',
  installmentsUrl: financeCopy.value.paymentLinks?.installmentsUrl ?? ''
}))

const internalLinks = computed(() => ({
  cash: toWithExperience({
    path: '/inscription',
    query: { payment: 'cash' },
    hash: '#formulaire-inscription'
  }),
  installments: toWithExperience({
    path: '/inscription',
    query: { payment: 'installments' },
    hash: '#formulaire-inscription'
  }),
  state: toWithExperience({
    path: '/inscription',
    query: { payment: 'state' },
    hash: '#formulaire-inscription'
  })
}))
</script>

<template>
  <div class="page-stack -mx-4 sm:-mx-6 lg:-mx-8">
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
        <article class="page-hero p-5 sm:p-6 lg:p-8">
          <FinanceSolutionsSection
            :hero="hero"
            :internal-links="internalLinks"
            :payment-links="paymentLinks"
            :payment-section="paymentSection"
            :pricing="pricing"
            prefer-payment-links
            section-id="financement"
            show-secondary-links
          />
        </article>
      </section>

      <section class="page-shell px-4 py-0 sm:px-6 lg:px-8">
        <PrefooterCtaPanel />
      </section>
    </template>
  </div>
</template>
