<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowRight, BadgeCheck, CircleDollarSign } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'

const emit = defineEmits(['request-callback'])

const props = defineProps({
  hero: { type: Object, default: () => ({}) },
  pricing: { type: Object, default: () => ({}) },
  paymentSection: { type: Object, default: () => ({}) },
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
  sectionId: { type: String, default: '' }
})

const cashHref = computed(() => props.internalLinks?.cash ?? '/inscription')
const installmentsHref = computed(() => props.internalLinks?.installments ?? '/inscription')
const stateHref = computed(() => props.internalLinks?.state ?? '/inscription')
</script>

<template>
  <section :id="sectionId || undefined" class="finance-section">
    <div class="space-y-3 text-center">
      <p class="kicker text-red-600">{{ hero.eyebrow ?? 'FINANCEMENT RPMS' }}</p>
      <h2 class="editorial-title finance-section__title text-primary">
        {{ hero.title ?? '3 solutions. Zéro compromis.' }}
      </h2>
      <p class="finance-section__description">
        {{ hero.description ?? 'Choisissez la formule qui correspond à votre situation.' }}
      </p>
    </div>

    <div class="finance-solution-grid">
      <article class="finance-card finance-card--light">
        <p class="finance-card__label">OPTION 01</p>
        <h3 class="finance-card__title">Paiement Comptant</h3>
        <p class="finance-card__subtitle">Réglez la totalité et consacrez-vous à 100 % à votre réussite.</p>
        <div class="finance-card__price-row">
          <span class="finance-card__price">3 500 €</span>
          <span class="finance-card__price-note">règlement unique</span>
        </div>
        <ul class="finance-card__points">
          <li><BadgeCheck class="h-4 w-4 shrink-0 text-red-600" /> Satisfait ou remboursé 14 jours</li>
          <li><BadgeCheck class="h-4 w-4 shrink-0 text-red-600" /> Règlement par carte sécurisé</li>
          <li><BadgeCheck class="h-4 w-4 shrink-0 text-red-600" /> Zéro gestion mensuelle</li>
          <li><BadgeCheck class="h-4 w-4 shrink-0 text-red-600" /> Support prioritaire</li>
        </ul>
        <Button :as="RouterLink" :to="cashHref" size="lg" class="w-full justify-center bg-red-600 text-white">
          S'inscrire en 2 minutes →
          <ArrowRight class="ml-2 h-4 w-4" />
        </Button>
      </article>

      <article class="finance-card finance-card--featured">
        <div class="finance-card__chip">LE PLUS CHOISI</div>
        <p class="finance-card__label finance-card__label--light">OPTION 02 — FLEXIBILITÉ</p>
        <h3 class="finance-card__title finance-card__title--light">Plusieurs fois sans frais</h3>
        <p class="finance-card__subtitle finance-card__subtitle--light">Démarrez maintenant sans alourdir votre trésorerie.</p>

        <div class="finance-card__installment-box">
          <p class="finance-card__label finance-card__label--light">Acompte à l'inscription</p>
          <div class="finance-card__installment-amount">1 000 €</div>
          <p class="text-sm text-slate-100">puis au choix :</p>
          <div class="finance-card__mini-grid">
            <div class="finance-card__mini-card">5 fois · 500 € / mois</div>
            <div class="finance-card__mini-card">6 fois · 417 € / mois</div>
          </div>
        </div>

        <ul class="finance-card__points finance-card__points--light">
          <li><BadgeCheck class="h-4 w-4 shrink-0 text-red-600" /> Satisfait ou remboursé 14 jours</li>
          <li><BadgeCheck class="h-4 w-4 shrink-0 text-red-600" /> Prélèvement SEPA automatique</li>
          <li><BadgeCheck class="h-4 w-4 shrink-0 text-red-600" /> 0 € d'intérêts · 0 € de frais</li>
          <li><BadgeCheck class="h-4 w-4 shrink-0 text-red-600" /> Accès immédiat après acompte</li>
          <li><BadgeCheck class="h-4 w-4 shrink-0 text-red-600" /> Soldable à tout moment</li>
        </ul>

        <Button :as="RouterLink" :to="installmentsHref" size="lg" class="w-full justify-center bg-red-600 text-white">
          S'inscrire en 2 minutes
          <ArrowRight class="ml-2 h-4 w-4" />
        </Button>
      </article>

      <article class="finance-card finance-card--light">
        <p class="finance-card__label">OPTION 03</p>
        <h3 class="finance-card__title">Dossier OPCO / AIF</h3>
        <p class="finance-card__subtitle">Idéal pour les salariés ou demandeurs d'emploi. Prise en charge totale par les organismes publics ou votre entreprise.</p>
        <div class="finance-card__price-row">
          <span class="finance-card__price">0 €</span>
          <span class="finance-card__price-note">de reste à charge possible</span>
        </div>
        <ul class="finance-card__points">
          <li><BadgeCheck class="h-4 w-4 shrink-0 text-red-600" /> 0 € de reste à charge</li>
          <li><BadgeCheck class="h-4 w-4 shrink-0 text-red-600" /> Maintien de vos aides</li>
          <li><BadgeCheck class="h-4 w-4 shrink-0 text-red-600" /> CITYZ gère le montage</li>
        </ul>
        <Button size="lg" variant="outline" class="w-full justify-center border-primary text-primary" @click="emit('request-callback')">
          Être rappelé par un conseiller →
          <ArrowRight class="ml-2 h-4 w-4" />
        </Button>
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
  color: var(--primary);
}

.finance-section__description {
  margin-inline: auto;
  max-width: 38rem;
  font-size: 0.98rem;
  line-height: 1.75;
  color: var(--muted-foreground);
}

.finance-solution-grid {
  display: grid;
  gap: 1rem;
}

.finance-card {
  display: grid;
  gap: 1rem;
  align-content: start;
  padding: 1.25rem;
  border-radius: 1.4rem;
  border: 1px solid var(--border);
  background: white;
}

.finance-card--featured {
  background: var(--primary);
  color: white;
  border-color: color-mix(in oklab, var(--tricolor-red) 35%, white);
}

.finance-card__chip {
  justify-self: end;
  border-radius: 999px;
  background: var(--tricolor-red);
  padding: 0.38rem 0.75rem;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: white;
}

.finance-card__label {
  display: inline-flex;
  width: fit-content;
  align-items: center;
  border-radius: 999px;
  padding: 0.38rem 0.75rem;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--tricolor-red);
  background: color-mix(in oklab, var(--tricolor-red-soft) 90%, white);
}

.finance-card__label--light {
  color: white;
  background: color-mix(in oklab, white 12%, var(--primary));
}

.finance-card__title {
  font-size: 1.18rem;
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.04em;
  color: var(--primary);
}

.finance-card__title--light {
  color: white;
}

.finance-card__subtitle {
  font-size: 0.97rem;
  line-height: 1.72;
  color: var(--muted-foreground);
}

.finance-card__subtitle--light,
.finance-card--featured .finance-card__price-note,
.finance-card--featured .finance-card__points li {
  color: rgb(255 255 255 / 0.85);
}

.finance-card__price-row {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  padding: 1rem 0;
  border-block: 1px dashed color-mix(in oklab, var(--border) 76%, white);
}

.finance-card--featured .finance-card__price-row {
  border-color: rgb(255 255 255 / 0.14);
}

.finance-card__price {
  font-size: clamp(2rem, 4vw, 2.85rem);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.06em;
  color: var(--primary);
}

.finance-card--featured .finance-card__price {
  color: white;
}

.finance-card__price-note {
  font-size: 0.9rem;
  color: var(--muted-foreground);
}

.finance-card__installment-box {
  display: grid;
  gap: 0.85rem;
  border-radius: 1.2rem;
  border: 1px solid rgb(255 255 255 / 0.1);
  background: rgb(255 255 255 / 0.06);
  padding: 1rem;
}

.finance-card__installment-amount {
  font-size: clamp(2rem, 4vw, 2.7rem);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.06em;
  color: white;
}

.finance-card__mini-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.6rem;
}

.finance-card__mini-card {
  border-radius: 1rem;
  border: 1px solid rgb(255 255 255 / 0.1);
  background: rgb(255 255 255 / 0.05);
  padding: 0.8rem;
  text-align: center;
  font-size: 0.9rem;
  font-weight: 800;
  line-height: 1.45;
  color: white;
}

.finance-card__points {
  display: grid;
  gap: 0.68rem;
}

.finance-card__points li {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.65rem;
  align-items: start;
  font-size: 0.94rem;
  line-height: 1.65;
  color: var(--muted-foreground);
}

@media (min-width: 1024px) {
  .finance-solution-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .finance-card--featured {
    transform: scale(1.04);
  }
}
</style>
