<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowRight, BadgeCheck, CircleDollarSign } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'

defineEmits(['request-callback'])

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
  sectionId: { type: String, default: '' },
  blueInstallmentLabel: { type: Boolean, default: false }
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
      <article class="finance-card finance-card--light finance-card--balanced">
        <p class="finance-card__label">OPTION 01</p>
        <h3 class="finance-card__title">Paiement Comptant</h3>
        <p class="finance-card__subtitle">Réglez la totalité et consacrez-vous à 100 % à votre réussite.</p>
        <div class="finance-card__price-row">
          <span class="finance-card__price">3 500 €</span>
          <span class="finance-card__price-note">règlement unique</span>
        </div>
        <ul class="finance-card__points">
          <li><BadgeCheck class="finance-card__check h-4 w-4 shrink-0" /> Satisfait ou remboursé 14 jours</li>
          <li><BadgeCheck class="finance-card__check h-4 w-4 shrink-0" /> Règlement par carte sécurisé</li>
          <li><BadgeCheck class="finance-card__check h-4 w-4 shrink-0" /> Zéro gestion mensuelle</li>
          <li><BadgeCheck class="finance-card__check h-4 w-4 shrink-0" /> Support prioritaire</li>
        </ul>
        <div class="finance-card__bonus">
          <p class="finance-card__bonus-label">EXCLUSIF COMPTANT</p>
          <ul class="finance-card__points finance-card__points--bonus">
            <li><BadgeCheck class="finance-card__check h-4 w-4 shrink-0" /> Support prioritaire 24h</li>
            <li><BadgeCheck class="finance-card__check h-4 w-4 shrink-0" /> Accompagnement 3 mois supplémentaires post-formation</li>
            <li><BadgeCheck class="finance-card__check h-4 w-4 shrink-0" /> Priorité sur le choix de dates d'examen</li>
          </ul>
        </div>
        <Button :as="RouterLink" :to="cashHref" size="lg" class="finance-card__cta finance-card__cta--classic w-full justify-center">
          S'inscrire en 2 minutes →
          <ArrowRight class="ml-2 h-4 w-4" />
        </Button>
      </article>

      <article class="finance-card finance-card--featured finance-card--balanced">
        <p class="finance-card__label">OPTION 02 — FLEXIBILITÉ</p>
        <h3 class="finance-card__title">Plusieurs fois sans frais</h3>
        <p class="finance-card__subtitle">Démarrez maintenant sans alourdir votre trésorerie.</p>

        <div class="finance-card__installment-box">
          <p :class="['finance-card__label', { 'finance-card__label--blue': blueInstallmentLabel }]">Acompte à l'inscription</p>
          <div class="finance-card__installment-amount">1 000 €</div>
          <p class="text-sm text-slate-600">puis au choix :</p>
          <div class="finance-card__mini-grid">
            <div class="finance-card__mini-card">5 fois · 500 € / mois</div>
            <div class="finance-card__mini-card">6 fois · 417 € / mois</div>
          </div>
        </div>

        <ul class="finance-card__points">
          <li><BadgeCheck class="finance-card__check h-4 w-4 shrink-0" /> Satisfait ou remboursé 14 jours</li>
          <li><BadgeCheck class="finance-card__check h-4 w-4 shrink-0" /> Prélèvement SEPA automatique</li>
          <li><BadgeCheck class="finance-card__check h-4 w-4 shrink-0" /> 0 € d'intérêts · 0 € de frais</li>
          <li><BadgeCheck class="finance-card__check h-4 w-4 shrink-0" /> Accès immédiat après acompte</li>
          <li><BadgeCheck class="finance-card__check h-4 w-4 shrink-0" /> Soldable à tout moment</li>
        </ul>

        <Button :as="RouterLink" :to="installmentsHref" size="lg" class="finance-card__cta finance-card__cta--featured w-full justify-center">
          S'inscrire en 2 minutes
          <ArrowRight class="ml-2 h-4 w-4" />
        </Button>
      </article>

      <article class="finance-card finance-card--light finance-card--balanced">
        <p class="finance-card__label">OPTION 03</p>
        <h3 class="finance-card__title">Dossier OPCO / AIF</h3>
        <p class="finance-card__subtitle">Idéal pour les salariés ou demandeurs d'emploi. Prise en charge totale par les organismes publics ou votre entreprise.</p>
        <div class="finance-card__price-row">
          <span class="finance-card__price">0 €</span>
          <span class="finance-card__price-note">de reste à charge possible</span>
        </div>
        <ul class="finance-card__points">
          <li><BadgeCheck class="finance-card__check h-4 w-4 shrink-0" /> 0 € de reste à charge</li>
          <li><BadgeCheck class="finance-card__check h-4 w-4 shrink-0" /> Maintien de vos aides</li>
          <li><BadgeCheck class="finance-card__check h-4 w-4 shrink-0" /> CITYZ gère le montage</li>
        </ul>
        <Button :as="RouterLink" :to="stateHref" size="lg" class="finance-card__cta finance-card__cta--classic w-full justify-center">
          Vérifier mon éligibilité →
          <ArrowRight class="ml-2 h-4 w-4" />
        </Button>
      </article>
    </div>

    <div class="finance-start-note">
      <CircleDollarSign class="h-4 w-4 shrink-0" />
      <p>Démarrage de votre formation sous 10 jours · Places limitées pour garantir un suivi personnalisé</p>
    </div>
  </section>
</template>

<style scoped>
.finance-section {
  display: grid;
  gap: 1.5rem;
  min-width: 0;
}

.finance-section__title {
  font-size: clamp(1.9rem, 3.3vw, 2.9rem);
  color: var(--primary);
  overflow-wrap: anywhere;
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
  min-width: 0;
}

.finance-card {
  display: grid;
  gap: 1rem;
  align-content: start;
  padding: 1.25rem;
  border-radius: 1.4rem;
  border: 1px solid var(--border);
  background: white;
  min-width: 0;
  overflow: hidden;
}

.finance-card--balanced {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.finance-card--light {
  background: white;
  box-shadow: 0 18px 42px rgb(17 39 65 / 0.11);
}

.finance-card--featured {
  background: var(--primary);
  color: white;
  border-color: color-mix(in oklab, var(--tricolor-red) 35%, white);
  box-shadow: 0 22px 48px rgb(0 0 145 / 0.2);
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

.finance-card--featured .finance-card__label {
  border: 1px solid rgb(255 255 255 / 0.18);
  background: rgb(255 255 255 / 0.12);
  color: white;
}

.finance-card__label--blue {
  color: var(--primary);
  background: color-mix(in oklab, var(--primary) 10%, white);
}

.finance-card__title {
  font-size: 1.18rem;
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.04em;
  color: var(--primary);
  overflow-wrap: anywhere;
}

.finance-card--featured .finance-card__title {
  color: white;
}

.finance-card__subtitle {
  font-size: 0.97rem;
  line-height: 1.72;
  color: var(--muted-foreground);
  overflow-wrap: anywhere;
}

.finance-card--featured .finance-card__subtitle,
.finance-card--featured .finance-card__price-note,
.finance-card--featured .finance-card__points li {
  color: rgb(255 255 255 / 0.85);
}

.finance-card__price-row {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.75rem;
  padding: 1rem 0;
  border-block: 1px dashed color-mix(in oklab, var(--border) 76%, white);
}

.finance-card__price-row > * {
  min-width: 0;
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
  border: 1px solid color-mix(in oklab, var(--primary) 18%, white);
  background: color-mix(in oklab, var(--paper-tint) 58%, white);
  padding: 1rem;
}

.finance-card__installment-amount {
  font-size: clamp(2rem, 4vw, 2.7rem);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.06em;
  color: var(--primary);
}

.finance-card__mini-grid {
  display: grid;
  gap: 0.6rem;
}

.finance-card__mini-card {
  border-radius: 1rem;
  border: 1px solid color-mix(in oklab, var(--primary) 16%, white);
  background: white;
  padding: 0.8rem;
  text-align: center;
  font-size: 0.9rem;
  font-weight: 800;
  line-height: 1.45;
  color: var(--primary);
  overflow-wrap: anywhere;
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
  min-width: 0;
  font-size: 0.94rem;
  line-height: 1.65;
  color: var(--muted-foreground);
}

.finance-card__points li > * {
  min-width: 0;
}

.finance-card__check {
  color: var(--tricolor-red);
}

.finance-card--featured .finance-card__check {
  color: white;
}

.finance-card__bonus {
  display: grid;
  gap: 0.65rem;
  border-top: 1px solid color-mix(in oklab, var(--border) 90%, white);
  padding-top: 0.9rem;
}

.finance-card--featured .finance-card__bonus {
  border-color: rgb(255 255 255 / 0.16);
}

.finance-card__bonus-label {
  width: fit-content;
  border-radius: 999px;
  background: color-mix(in oklab, var(--tricolor-red-soft) 88%, white);
  color: var(--tricolor-red);
  padding: 0.34rem 0.7rem;
  font-size: 0.66rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.finance-card--featured .finance-card__bonus-label {
  background: white;
  color: var(--tricolor-red);
}

.finance-card__cta {
  min-height: 3.35rem;
  white-space: normal;
  text-align: center;
}

.finance-card__cta--classic {
  border-color: var(--tricolor-red);
  background: var(--tricolor-red);
  color: white;
  box-shadow: 0 18px 34px rgb(225 0 15 / 0.14);
}

.finance-card__cta--classic:hover {
  border-color: color-mix(in oklab, var(--tricolor-red) 88%, black);
  background: color-mix(in oklab, var(--tricolor-red) 88%, black);
  color: white;
}

.finance-card__cta--featured {
  border-color: white;
  background: white;
  color: var(--primary);
  box-shadow: 0 18px 34px rgb(0 0 0 / 0.14);
}

.finance-card__cta--featured:hover {
  border-color: white;
  background: color-mix(in oklab, white 90%, var(--paper-tint));
  color: var(--primary);
}

.finance-card__cta--featured:active,
.finance-card__cta--classic:active {
  color: white;
}

.finance-card__points--bonus {
  gap: 0.55rem;
}

@media (min-width: 1024px) {
  .finance-solution-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .finance-card--featured {
    transform: scale(1.025);
  }
}

@media (min-width: 640px) {
  .finance-card__mini-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 639px) {
  .finance-section {
    gap: 1.15rem;
  }

  .finance-section__title {
    font-size: clamp(1.55rem, 8vw, 2.2rem);
    line-height: 1.02;
  }

  .finance-card {
    padding: 1rem;
  }

  .finance-card__label,
  .finance-card__bonus-label {
    letter-spacing: 0.12em;
  }

  .finance-card__price {
    font-size: clamp(1.9rem, 9vw, 2.35rem);
  }

  .finance-card__points li {
    font-size: 0.88rem;
  }

  .finance-card__cta {
    padding-inline: 0.85rem;
    font-size: 0.92rem;
  }

  .finance-start-note {
    align-items: flex-start;
    border-radius: 1rem;
    text-align: left;
  }
}

.finance-start-note {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  border-radius: 999px;
  border: 1px solid color-mix(in oklab, var(--primary) 20%, white);
  background: white;
  padding: 0.85rem 1rem;
  text-align: center;
  font-size: 0.9rem;
  font-weight: 800;
  line-height: 1.45;
  color: var(--primary);
  box-shadow: 0 14px 30px rgb(17 39 65 / 0.09);
}

.finance-start-note svg {
  color: var(--tricolor-red);
}
</style>
