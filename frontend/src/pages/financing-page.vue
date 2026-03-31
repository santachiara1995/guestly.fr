<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowRight, CircleDollarSign, Clock3 } from 'lucide-vue-next'

import PrefooterCtaPanel from '@/components/shared/prefooter-cta-panel.vue'
import { Button } from '@/components/ui/button'
import { useExperienceVariant } from '@/composables/use-experience-variant'
import { api } from '@/lib/api'
import { motionVariants, staggerEnter } from '@/lib/motion'

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
const conditionsSection = computed(() => financeCopy.value.conditionsSection ?? {})
const paymentLinks = computed(() => ({
  cashUrl: financeCopy.value.paymentLinks?.cashUrl ?? '',
  installmentsUrl: financeCopy.value.paymentLinks?.installmentsUrl ?? ''
}))
const hasPaymentLinks = computed(
  () => Boolean(paymentLinks.value.cashUrl || paymentLinks.value.installmentsUrl)
)

const cashContactLink = computed(() =>
  toWithExperience({
    path: '/contact',
    query: { payment: 'cash' }
  })
)
const installmentsContactLink = computed(() =>
  toWithExperience({
    path: '/contact',
    query: { payment: 'installments' }
  })
)

const pricingFootnote = computed(
  () =>
    pricing.value.footnote ??
    "L'accès au paiement puis à la formation est conditionné à la validation de votre inscription."
)

const paymentOptions = computed(() => {
  const rawOptions = Array.isArray(paymentSection.value.options) ? paymentSection.value.options : []

  return [
    {
      id: 'cash',
      eyebrow: 'Solution 01',
      title: 'Paiement comptant',
      support: 'Règlement en une seule fois.',
      details: [rawOptions[0] ?? 'Paiement comptant en une seule fois.'],
      icon: CircleDollarSign,
      contactTo: cashContactLink.value,
      paymentUrl: paymentLinks.value.cashUrl,
      paymentLabel: 'Payer comptant via Stripe'
    },
    {
      id: 'installments',
      eyebrow: 'Solution 02',
      title: 'Paiement en plusieurs fois',
      support: '3x ou 4x sans frais.',
      details:
        rawOptions.slice(1).length > 0
          ? rawOptions.slice(1)
          : [
              'Paiement en plusieurs fois sans frais.',
              'En 3 fois ou en 4 fois selon votre choix.'
            ],
      icon: Clock3,
      contactTo: installmentsContactLink.value,
      paymentUrl: paymentLinks.value.installmentsUrl,
      paymentLabel: 'Payer en plusieurs fois'
    }
  ]
})
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
        <article class="page-hero space-y-6 p-5 sm:p-6 lg:space-y-7 lg:p-7">
          <div class="space-y-3">
            <p class="kicker text-center">
              {{ hero.eyebrow ?? 'Financement RPMS' }}
            </p>
            <h1 class="editorial-title mx-auto max-w-4xl text-center text-[clamp(1.95rem,3.4vw,3rem)] text-foreground">
              {{ hero.title ?? 'Financez votre formation' }}
            </h1>
            <p
              class="mx-auto max-w-3xl text-center text-base leading-7 text-muted-foreground sm:text-[1rem]"
            >
              {{
                hero.description ??
                "Retrouvez le prix de la formation, choisissez votre modalité de règlement et poursuivez vers l'inscription."
              }}
            </p>
          </div>

          <div class="finance-flow">
            <div class="space-y-3 text-center">
              <p class="kicker">{{ paymentSection.eyebrow ?? 'Accès au paiement' }}</p>
              <h2 class="mx-auto max-w-3xl text-[clamp(1.45rem,2.3vw,1.95rem)] font-semibold tracking-[-0.04em] text-foreground">
                {{ paymentSection.title ?? 'Choisissez votre solution de règlement' }}
              </h2>
            </div>

            <article class="finance-flow__root page-cut p-5 sm:p-6">
              <div class="flex flex-col items-center gap-3 text-center">
                <span class="paper-card__icon" aria-hidden="true">
                  <CircleDollarSign class="h-4 w-4" />
                </span>
                <p class="detail-key">
                  {{ pricing.eyebrow ?? 'Prix de la formation' }}
                </p>
                <p class="finance-flow__amount">
                  {{ pricing.amount ?? '3 500 € TTC' }}
                </p>
                <p class="max-w-2xl text-sm leading-6 text-muted-foreground">
                  {{
                    pricing.description ??
                    "Préparation à l’examen et accès aux formateurs inclus."
                  }}
                </p>
              </div>
            </article>

            <div class="finance-flow__branches">
              <article
                v-for="(option, index) in paymentOptions"
                :key="option.id"
                class="finance-flow__branch page-cut p-5 sm:p-6"
                v-motion
                :initial="motionVariants.pop.initial"
                :enter="staggerEnter(index, 48, 24)"
              >
                <div class="space-y-4">
                  <div class="flex items-start gap-3">
                    <span class="paper-card__icon mt-0.5" aria-hidden="true">
                      <component :is="option.icon" class="h-4 w-4" />
                    </span>
                    <div class="space-y-2">
                      <p class="detail-key">{{ option.eyebrow }}</p>
                      <h3 class="text-[1.28rem] font-semibold tracking-[-0.03em] text-foreground">
                        {{ option.title }}
                      </h3>
                      <p class="text-sm leading-6 text-muted-foreground">
                        {{ option.support }}
                      </p>
                    </div>
                  </div>

                  <div class="finance-solution__details">
                    <p
                      v-for="detail in option.details"
                      :key="detail"
                      class="finance-solution__detail"
                    >
                      {{ detail }}
                    </p>
                  </div>

                  <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <Button
                      :as="RouterLink"
                      :to="option.contactTo"
                      size="lg"
                      class="w-full justify-center sm:w-auto"
                    >
                      S'inscrire
                      <ArrowRight class="ml-2 h-4 w-4" />
                    </Button>
                    <Button
                      :as="option.paymentUrl ? 'a' : 'button'"
                      :disabled="!option.paymentUrl"
                      :href="option.paymentUrl || undefined"
                      class="w-full justify-center sm:w-auto"
                      rel="noreferrer"
                      size="lg"
                      target="_blank"
                      variant="outline"
                    >
                      {{ option.paymentUrl ? option.paymentLabel : 'Lien Stripe à renseigner' }}
                    </Button>
                  </div>
                </div>
              </article>
            </div>

            <p class="finance-footnote mx-auto max-w-3xl text-center text-sm leading-6 text-muted-foreground">
              {{ pricingFootnote }}
            </p>

            <p
              v-if="!hasPaymentLinks"
              class="mx-auto max-w-3xl text-center text-sm leading-6 text-muted-foreground"
            >
              Les liens de paiement Stripe ne sont pas encore renseignés dans la configuration.
            </p>
          </div>
        </article>
      </section>

      <section class="page-shell px-4 py-0 sm:px-6 lg:px-8">
        <article class="page-cut space-y-6 p-5 sm:p-6 lg:p-7">
          <div class="space-y-3 text-center">
            <p class="kicker">
              {{ conditionsSection.eyebrow ?? 'Conditions à connaître' }}
            </p>
            <h2 class="mx-auto max-w-3xl text-[clamp(1.4rem,2.2vw,1.9rem)] font-semibold tracking-[-0.04em] text-foreground">
              {{ conditionsSection.title ?? "Les conditions principales de l'offre" }}
            </h2>
          </div>

          <div class="grid gap-3 md:grid-cols-3">
            <article
              v-for="(item, index) in conditionsSection.items ?? []"
              :key="item"
              class="finance-condition-card paper-card paper-card--soft p-4"
              v-motion
              :initial="motionVariants.pop.initial"
              :enter="staggerEnter(index, 44, 20)"
            >
              <div class="flex items-start gap-3">
                <span class="finance-badge">{{ index + 1 }}</span>
                <p class="text-sm leading-6 text-foreground">
                  {{ item }}
                </p>
              </div>
            </article>
          </div>
        </article>
      </section>

      <section class="page-shell px-4 py-0 sm:px-6 lg:px-8">
        <PrefooterCtaPanel />
      </section>
    </template>
  </div>
</template>

<style scoped>
.finance-flow {
  display: grid;
  gap: 1.35rem;
}

.finance-flow__root {
  position: relative;
  width: min(100%, 34rem);
  margin: 0 auto;
}

.finance-flow__amount {
  font-size: clamp(1.75rem, 4vw, 2.7rem);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.05em;
  color: var(--foreground);
}

.finance-flow__branches {
  position: relative;
  display: grid;
  gap: 1rem;
}

.finance-flow__branch {
  position: relative;
}

.finance-solution__details {
  display: grid;
  gap: 0.7rem;
}

.finance-solution__detail {
  border-radius: 0.9rem;
  border: 1px solid color-mix(in oklab, var(--line) 72%, white);
  background: color-mix(in oklab, var(--paper) 82%, var(--paper-tint));
  padding: 0.8rem 0.9rem;
  color: var(--foreground);
  font-size: 0.94rem;
  line-height: 1.6;
}

@media (min-width: 768px) {
  .finance-flow__branches {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 767px) {
  .finance-flow__branches {
    gap: 1rem;
  }
}
</style>
