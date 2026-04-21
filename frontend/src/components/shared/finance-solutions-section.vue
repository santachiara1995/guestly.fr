<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import {
  ArrowRight,
  BadgeCheck,
  CircleDollarSign,
  Clock3,
  ShieldCheck
} from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import { motionVariants, staggerEnter } from '@/lib/motion'

const props = defineProps({
  hero: {
    type: Object,
    default: () => ({})
  },
  pricing: {
    type: Object,
    default: () => ({})
  },
  paymentSection: {
    type: Object,
    default: () => ({})
  },
  paymentLinks: {
    type: Object,
    default: () => ({
      cashUrl: '',
      installmentsUrl: ''
    })
  },
  internalLinks: {
    type: Object,
    default: () => ({
      cash: '/inscription',
      installments: '/inscription?payment=installments',
      state: '/inscription?payment=state'
    })
  },
  preferPaymentLinks: {
    type: Boolean,
    default: false
  },
  showSecondaryLinks: {
    type: Boolean,
    default: false
  },
  sectionId: {
    type: String,
    default: ''
  }
})

const iconMap = {
  cash: CircleDollarSign,
  installments: Clock3,
  state: ShieldCheck
}

const solutions = computed(() =>
  (props.paymentSection?.solutions ?? []).map((solution) => {
    const paymentUrl =
      solution.id === 'cash'
        ? props.paymentLinks?.cashUrl ?? ''
        : solution.id === 'installments'
          ? props.paymentLinks?.installmentsUrl ?? ''
          : ''
    const primaryExternal = props.preferPaymentLinks && Boolean(paymentUrl) && solution.id !== 'state'

    return {
      ...solution,
      icon: iconMap[solution.id] ?? CircleDollarSign,
      paymentUrl,
      primaryTag: primaryExternal ? 'a' : RouterLink,
      primaryProps: primaryExternal
        ? {
            href: paymentUrl,
            rel: 'noreferrer',
            target: '_blank'
          }
        : {
            to: props.internalLinks?.[solution.id] ?? props.internalLinks?.state ?? '/inscription'
          }
    }
  })
)
</script>

<template>
  <section :id="sectionId || undefined" class="finance-section">
    <div class="space-y-4 text-center">
      <p class="kicker">{{ hero.eyebrow ?? 'FINANCEMENT RPMS' }}</p>
      <h2 class="editorial-title finance-section__title text-foreground">
        {{ hero.title ?? 'Financez votre formation sans compromis' }}
      </h2>
      <p class="finance-section__description">
        {{
          hero.description ??
          'Choisissez la modalité de règlement la plus adaptée à votre situation.'
        }}
      </p>
    </div>

    <article class="finance-price-card page-cut p-5 text-center sm:p-6 lg:p-8">
      <span class="finance-price-card__icon" aria-hidden="true">
        <CircleDollarSign class="h-5 w-5" />
      </span>
      <p class="detail-key mt-4">{{ pricing.eyebrow ?? 'PRIX DE LA FORMATION' }}</p>
      <p class="finance-price-card__amount">{{ pricing.amount ?? '3 500 € TTC' }}</p>
      <p class="finance-price-card__description">
        {{
          pricing.description ??
          "Tout est inclus : préparation à l'examen, passage du jury, accompagnement et accès aux modules."
        }}
      </p>
    </article>

    <div class="space-y-3 text-center">
      <p class="kicker">{{ paymentSection.eyebrow ?? '3 SOLUTIONS DE PAIEMENT' }}</p>
      <h3 class="finance-section__subtitle">
        {{ paymentSection.title ?? 'Choisissez la formule qui vous correspond' }}
      </h3>
    </div>

    <div class="finance-solution-grid">
      <article
        v-for="(solution, index) in solutions"
        :key="solution.id"
        :class="[
          'finance-solution-card page-cut p-5 sm:p-6',
          `finance-solution-card--${solution.id}`
        ]"
        v-motion
        :initial="motionVariants.block.initial"
        :enter="staggerEnter(index, 52, 22)"
      >
        <p v-if="solution.badge" :class="[
          'finance-solution-card__badge',
          solution.id === 'state' ? 'finance-solution-card__badge--accent' : ''
        ]">
          {{ solution.badge }}
        </p>

        <div class="finance-solution-card__content">
          <div class="space-y-4">
            <div class="finance-solution-card__header">
              <span :class="[
                'finance-price-card__icon',
                solution.id === 'state' ? 'finance-price-card__icon--dark' : ''
              ]" aria-hidden="true">
                <component :is="solution.icon" class="h-5 w-5" />
              </span>
              <div class="space-y-2">
                <p class="detail-key">{{ solution.eyebrow }}</p>
                <h3 class="finance-solution-card__title">
                  {{ solution.title }}
                </h3>
                <p class="finance-solution-card__description">
                  {{ solution.description }}
                </p>
              </div>
            </div>

            <div v-if="solution.detail" class="finance-solution-card__detail">
              {{ solution.detail }}
            </div>

            <div
              v-if="solution.extraDetail"
              class="finance-solution-card__detail finance-solution-card__detail--soft"
            >
              {{ solution.extraDetail }}
            </div>

            <ul
              v-if="solution.points?.length"
              class="finance-solution-card__points"
              aria-label="Bénéfices de la solution"
            >
              <li v-for="point in solution.points" :key="point">
                <BadgeCheck class="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{{ point }}</span>
              </li>
            </ul>

            <p v-if="solution.note" class="finance-solution-card__note">
              {{ solution.note }}
            </p>
          </div>

          <div class="finance-solution-card__actions">
            <Button
              :as="solution.primaryTag"
              v-bind="solution.primaryProps"
              size="lg"
              class="w-full justify-center"
            >
              {{ solution.ctaLabel ?? "S'inscrire" }}
              <ArrowRight class="ml-2 h-4 w-4" />
            </Button>

            <a
              v-if="showSecondaryLinks && solution.id !== 'state'"
              :class="[
                'finance-solution-card__secondary placeholder-link',
                solution.paymentUrl ? 'finance-solution-card__secondary--active' : ''
              ]"
              :href="solution.paymentUrl || '#'"
              :aria-disabled="solution.paymentUrl ? undefined : 'true'"
              :tabindex="solution.paymentUrl ? undefined : -1"
              rel="noreferrer"
              target="_blank"
            >
              {{ solution.paymentUrl ? 'Ouvrir le lien de paiement' : solution.secondaryLabel }}
            </a>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.finance-section {
  display: grid;
  gap: 1.5rem;
}

.finance-section__title {
  font-size: clamp(1.9rem, 3.3vw, 2.9rem);
  color: var(--navy-deep);
}

.finance-section__subtitle {
  font-size: clamp(1.35rem, 2.2vw, 1.8rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  color: var(--navy-deep);
}

.finance-section__description {
  margin-inline: auto;
  max-width: 38rem;
  font-size: 0.98rem;
  line-height: 1.75;
  color: var(--muted-foreground);
}

.finance-price-card {
  width: min(100%, 36rem);
  margin-inline: auto;
}

.finance-price-card__icon {
  display: inline-flex;
  height: 3.1rem;
  width: 3.1rem;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: color-mix(in oklab, var(--paper-tint) 88%, white);
  color: var(--blue-eclipse);
}

.finance-price-card__icon--dark {
  background: color-mix(in oklab, var(--tricolor-red) 18%, white);
  color: #fff4f5;
}

.finance-price-card__amount {
  margin-top: 0.8rem;
  font-size: clamp(2rem, 4.2vw, 3rem);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.06em;
  color: var(--navy-deep);
}

.finance-price-card__description {
  margin: 0.9rem auto 0;
  max-width: 30rem;
  font-size: 0.95rem;
  line-height: 1.75;
  color: var(--muted-foreground);
}

.finance-solution-grid {
  display: grid;
  gap: 1rem;
}

.finance-solution-card {
  position: relative;
  overflow: hidden;
}

.finance-solution-card__content {
  display: flex;
  min-height: 100%;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.4rem;
}

.finance-solution-card__header {
  display: grid;
  justify-items: center;
  gap: 0.9rem;
  text-align: center;
}

.finance-solution-card__badge {
  position: absolute;
  right: 1.15rem;
  top: 1rem;
  display: inline-flex;
  min-height: 1.9rem;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: color-mix(in oklab, var(--paper-tint) 85%, white);
  padding: 0.35rem 0.8rem;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  color: var(--blue-eclipse);
}

.finance-solution-card__badge--accent {
  background: var(--tricolor-red);
  color: #ffffff;
}

.finance-solution-card__title {
  font-size: 1.35rem;
  font-weight: 800;
  line-height: 1.12;
  letter-spacing: -0.04em;
  color: var(--navy-deep);
}

.finance-solution-card__description,
.finance-solution-card__note {
  font-size: 0.94rem;
  line-height: 1.7;
  color: var(--muted-foreground);
  text-align: center;
}

.finance-solution-card__detail {
  border-radius: 1rem;
  border: 1px solid color-mix(in oklab, var(--line) 80%, white);
  background: color-mix(in oklab, var(--paper) 82%, var(--paper-tint));
  padding: 0.95rem 1rem;
  font-size: 0.93rem;
  line-height: 1.65;
  color: var(--foreground);
  text-align: center;
}

.finance-solution-card__detail--soft {
  background: color-mix(in oklab, var(--paper-soft) 92%, white);
}

.finance-solution-card__points {
  display: grid;
  gap: 0.85rem;
  justify-items: center;
}

.finance-solution-card__points li {
  display: flex;
  align-items: flex-start;
  gap: 0.7rem;
  font-size: 0.94rem;
  line-height: 1.65;
  color: var(--foreground);
  text-align: center;
}

.finance-solution-card__actions {
  display: grid;
  gap: 0.75rem;
}

.finance-solution-card__secondary {
  text-align: center;
  font-size: 0.84rem;
  font-weight: 600;
  line-height: 1.5;
  color: var(--muted-foreground);
  text-decoration: none;
}

.finance-solution-card__secondary--active {
  color: var(--primary);
  text-decoration: underline;
  text-underline-offset: 0.24em;
}

.finance-solution-card--state .finance-price-card__icon {
  background: color-mix(in oklab, var(--tricolor-red) 10%, white);
  color: var(--tricolor-red);
}

@media (min-width: 768px) {
  .finance-solution-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .finance-solution-card--state {
    grid-column: 1 / -1;
  }
}
</style>
