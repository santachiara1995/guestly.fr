<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  ChevronDown,
  Clock3,
  FileText,
  Landmark,
  RefreshCcw,
  Rocket,
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
  Users,
  WalletCards
} from 'lucide-vue-next'

import FinanceSolutionsSection from '@/components/shared/finance-solutions-section.vue'
import { Button } from '@/components/ui/button'
import { useExperienceVariant } from '@/composables/use-experience-variant'
import { api } from '@/lib/api'
import { motionVariants, staggerEnter } from '@/lib/motion'

const site = ref({
  home: {},
  finance: {},
  faq: {}
})
const faqItems = ref([])
const loading = ref(true)
const errorMessage = ref('')

const { toWithExperience } = useExperienceVariant()

const homeHeroImage = '/hero-office-gemini.jpg'
const painIcons = [TrendingUp, ShieldAlert, Landmark]
const personaIcons = [BriefcaseBusiness, RefreshCcw, ShieldCheck, Building2, Rocket]
const rpmsIcons = [TrendingUp, Users, WalletCards]
const zeroPaperIcon = FileText

onMounted(async () => {
  try {
    const [sitePayload, faqPayload] = await Promise.all([api.getSite(), api.getFaq()])
    site.value = sitePayload
    faqItems.value = faqPayload
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Contenu indisponible.'
  } finally {
    loading.value = false
  }
})

const homeCopy = computed(() => site.value.home ?? {})
const financeCopy = computed(() => site.value.finance ?? {})
const faqCopy = computed(() => site.value.faq ?? {})

const diagnosticLink = computed(() =>
  toWithExperience({
    path: '/inscription',
    query: { payment: 'state' },
    hash: '#formulaire-inscription'
  })
)
const signupLink = computed(() => toWithExperience('/inscription'))
const faqLink = computed(() => toWithExperience('/faq'))

const financeLinks = computed(() => ({
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

const sourceMap = computed(() =>
  Object.fromEntries((homeCopy.value.sources ?? []).map((item) => [item.id, item]))
)

function resolveSources(refs = []) {
  return refs.map((ref) => sourceMap.value[ref]).filter(Boolean)
}

const hero = computed(() => homeCopy.value.hero ?? {})
const painPointSection = computed(() => homeCopy.value.painPointSection ?? {})
const proofItems = computed(() => homeCopy.value.proofItems ?? [])
const personasSection = computed(() => ({
  ...(homeCopy.value.personasSection ?? {}),
  items: (homeCopy.value.personasSection?.items ?? []).map((item) => ({
    ...item,
    sources: resolveSources(item.sourceRefs)
  }))
}))
const rpmsSection = computed(() => homeCopy.value.rpmsCityzSection ?? {})
const cityzSection = computed(() => homeCopy.value.cityzSection ?? {})
const zeroPaperSection = computed(() => homeCopy.value.zeroPaperSection ?? {})
const finalCta = computed(() => homeCopy.value.finalCta ?? {})
const financeHero = computed(() => financeCopy.value.hero ?? {})
const pricing = computed(() => financeCopy.value.pricing ?? {})
const paymentSection = computed(() => financeCopy.value.paymentSection ?? {})
const paymentLinks = computed(() => ({
  cashUrl: financeCopy.value.paymentLinks?.cashUrl ?? '',
  installmentsUrl: financeCopy.value.paymentLinks?.installmentsUrl ?? ''
}))
const faqHero = computed(() => faqCopy.value.hero ?? {})
</script>

<template>
  <div class="page-stack -mx-4 sm:-mx-6 lg:-mx-8">
    <p v-if="loading" class="px-4 py-6 text-sm text-muted-foreground sm:px-6 lg:px-8">
      Actualisation du contenu…
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
        <div class="home-hero-grid">
          <article class="home-hero-card page-hero p-5 sm:p-6 lg:p-8">
            <p class="kicker">RNCP 38575 · Bac+2 · 100 % distanciel</p>

            <div class="home-hook-stack">
              <h1 class="editorial-title home-hook-title text-foreground">
                <span v-for="line in hero.hookLines ?? []" :key="line" class="home-hook-line">
                  {{ line }}
                </span>
              </h1>
            </div>

            <p class="home-hero-copy">
              {{ hero.lead }}
            </p>

            <ul class="home-hero-list" aria-label="Compétences clés du titre professionnel RPMS">
              <li v-for="item in hero.capabilities ?? []" :key="item">
                {{ item }}
              </li>
            </ul>

            <div class="home-hero-actions">
              <Button
                :as="RouterLink"
                :to="diagnosticLink"
                size="lg"
                variant="outline"
                class="w-full justify-center sm:w-auto"
              >
                Demander mon diagnostic gratuit
              </Button>
              <Button
                :as="RouterLink"
                :to="signupLink"
                size="lg"
                class="w-full justify-center sm:w-auto"
              >
                Commencer ma formation
                <ArrowRight class="ml-2 h-4 w-4" />
              </Button>
            </div>
          </article>

          <article class="home-visual-card page-cut p-3 sm:p-4">
            <img
              :src="homeHeroImage"
              alt="Professionnelle en environnement de travail"
              class="home-visual-card__image"
            >
          </article>
        </div>
      </section>

      <section class="page-shell px-4 py-0 sm:px-6 lg:px-8">
        <article class="page-cut p-5 sm:p-6 lg:p-8">
          <div class="mx-auto max-w-3xl text-center">
            <p class="kicker">LE COÛT DE L'IMMOBILISME</p>
            <h2 class="mt-4 text-[clamp(1.8rem,3vw,2.6rem)] font-extrabold tracking-[-0.05em] text-primary">
              {{ painPointSection.title }}
            </h2>
            <p class="mt-2 text-lg font-semibold leading-8 text-foreground">
              {{ painPointSection.subtitle }}
            </p>
            <p class="mt-4 text-base leading-8 text-muted-foreground sm:text-[1.02rem]">
              {{ painPointSection.description }}
            </p>
          </div>

          <div class="home-pain-grid mt-8">
            <article
              v-for="(item, index) in painPointSection.items ?? []"
              :key="item.title"
              class="decision-card home-pain-card"
              v-motion
              :initial="motionVariants.pop.initial"
              :enter="staggerEnter(index, 46, 22)"
            >
              <span class="paper-card__icon" aria-hidden="true">
                <component :is="painIcons[index] ?? TrendingUp" class="h-4 w-4" />
              </span>
              <h3 class="mt-4 text-[1.08rem] font-semibold leading-tight tracking-[-0.03em] text-foreground">
                {{ item.title }}
              </h3>
              <p class="mt-3 text-sm leading-7 text-muted-foreground">
                {{ item.text }}
              </p>
            </article>
          </div>
        </article>
      </section>

      <section class="page-shell px-4 py-0 sm:px-6 lg:px-8">
        <div class="home-proof-grid">
          <article
            v-for="(item, index) in proofItems"
            :key="item.label"
            class="home-proof-card page-cut p-5 text-center sm:p-6"
            v-motion
            :initial="motionVariants.pop.initial"
            :enter="staggerEnter(index, 42, 18)"
          >
            <p class="detail-key">{{ item.label }}</p>
            <p class="mt-3 text-[1.4rem] font-extrabold tracking-[-0.04em] text-foreground">
              {{ item.value }}
            </p>
            <p class="mt-3 text-sm leading-7 text-muted-foreground">
              {{ item.note }}
            </p>
          </article>
        </div>
      </section>

      <section class="page-shell px-4 py-0 sm:px-6 lg:px-8">
        <article class="page-cut p-5 sm:p-6 lg:p-8">
          <div class="mx-auto max-w-3xl text-center">
            <p class="kicker">POUR QUI ?</p>
            <h2 class="mt-4 text-[clamp(1.75rem,3vw,2.45rem)] font-extrabold tracking-[-0.05em] text-foreground">
              {{ personasSection.title }}
            </h2>
            <p class="mt-4 text-base leading-8 text-muted-foreground sm:text-[1.02rem]">
              {{ personasSection.description }}
            </p>
          </div>

          <div class="home-persona-grid mt-8">
            <article
              v-for="(item, index) in personasSection.items"
              :key="item.title"
              class="home-persona-card page-cut p-5 sm:p-6"
              v-motion
              :initial="motionVariants.block.initial"
              :enter="staggerEnter(index, 46, 22)"
            >
              <div class="flex items-start gap-3">
                <span class="paper-card__icon" aria-hidden="true">
                  <component :is="personaIcons[index] ?? BriefcaseBusiness" class="h-4 w-4" />
                </span>
                <div>
                  <h3 class="text-[1.08rem] font-semibold leading-tight tracking-[-0.03em] text-foreground">
                    {{ item.title }}
                  </h3>
                  <p class="mt-3 text-sm leading-7 text-muted-foreground" v-html="item.detailsHtml"></p>
                </div>
              </div>
            </article>
          </div>

          <div class="home-sources mt-8">
            <p class="detail-key">Sources & méthodologie</p>
            <p class="mt-3 text-sm leading-7 text-muted-foreground">
              Les indicateurs réglementaires et d’insertion renvoient aux sources officielles. Les fourchettes salariales restent indicatives et dépendent du poste, du secteur et de la localisation.
            </p>
            <ul class="home-source-list mt-4">
              <li v-for="source in homeCopy.sources ?? []" :key="source.id">
                <a :href="source.url" rel="noreferrer" target="_blank">
                  {{ source.label }}
                </a>
              </li>
            </ul>
          </div>
        </article>
      </section>

      <section class="page-shell px-4 py-0 sm:px-6 lg:px-8">
        <div class="home-dual-grid">
          <article class="page-cut p-5 sm:p-6 lg:p-8">
            <p class="kicker">LE TITRE RPMS</p>
            <h2 class="mt-4 text-[clamp(1.7rem,2.75vw,2.35rem)] font-extrabold tracking-[-0.05em] text-foreground">
              {{ rpmsSection.title }}
            </h2>

            <ul class="home-feature-list mt-8">
              <li v-for="(item, index) in rpmsSection.items ?? []" :key="item.title" class="home-feature-row">
                <span class="home-feature-row__icon" aria-hidden="true">
                  <component :is="rpmsIcons[index] ?? TrendingUp" class="h-5 w-5" />
                </span>
                <div>
                  <h3 class="text-[1.04rem] font-semibold leading-tight tracking-[-0.03em] text-foreground">
                    {{ item.title }}
                  </h3>
                  <p class="mt-2 text-sm leading-7 text-muted-foreground">
                    {{ item.description }}
                  </p>
                </div>
              </li>
            </ul>
          </article>

          <article class="home-cityz-card page-cut p-5 sm:p-6 lg:p-8">
            <p class="kicker text-white/80">POURQUOI CITYZ FORMATION ?</p>
            <h2 class="mt-4 text-[clamp(1.7rem,2.75vw,2.35rem)] font-extrabold tracking-[-0.05em] text-white">
              {{ cityzSection.title }}
            </h2>

            <ul class="home-cityz-list mt-8">
              <li v-for="item in cityzSection.items ?? []" :key="item.label" class="home-cityz-row">
                <ShieldCheck class="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
                <p class="text-sm leading-7 text-white/86">
                  <strong class="font-semibold text-white">{{ item.label }} :</strong>
                  <span v-if="item.description">{{ item.description }}</span>
                  <span v-else v-html="item.descriptionHtml"></span>
                </p>
              </li>
            </ul>
          </article>
        </div>
      </section>

      <section class="page-shell px-4 py-0 sm:px-6 lg:px-8">
        <article class="page-cut p-5 sm:p-6 lg:p-8">
          <FinanceSolutionsSection
            :hero="financeHero"
            :internal-links="financeLinks"
            :payment-links="paymentLinks"
            :payment-section="paymentSection"
            :pricing="pricing"
            section-id="financement-rpms"
          />
        </article>
      </section>

      <section class="page-shell px-4 py-0 sm:px-6 lg:px-8">
        <article class="page-cut p-5 sm:p-6 lg:p-8">
          <div class="home-zero-grid">
            <div class="space-y-6">
              <span class="home-zero-icon" aria-hidden="true">
                <component :is="zeroPaperIcon" class="h-6 w-6" />
              </span>
              <div class="space-y-4">
                <p class="kicker">SERVICE ADMINISTRATIF</p>
                <h2 class="text-[clamp(1.85rem,3vw,2.55rem)] font-extrabold tracking-[-0.05em] text-foreground">
                  {{ zeroPaperSection.title }}
                </h2>
                <p class="text-base leading-8 text-muted-foreground sm:text-[1.02rem]">
                  {{ zeroPaperSection.description }}
                </p>
              </div>

              <div class="home-zero-stats">
                <article v-for="stat in zeroPaperSection.stats ?? []" :key="stat.label" class="home-zero-stat-card">
                  <p class="home-zero-stat-card__value">{{ stat.value }}</p>
                  <p class="detail-key mt-2">{{ stat.label }}</p>
                </article>
              </div>
            </div>

            <div class="home-zero-steps">
              <article
                v-for="(step, index) in zeroPaperSection.steps ?? []"
                :key="step.number"
                class="home-zero-step-card"
                v-motion
                :initial="motionVariants.block.initial"
                :enter="staggerEnter(index, 44, 20)"
              >
                <span class="home-zero-step-card__number">{{ step.number }}</span>
                <div>
                  <h3 class="text-[1.04rem] font-semibold leading-tight tracking-[-0.03em] text-foreground">
                    {{ step.title }}
                  </h3>
                  <p class="mt-2 text-sm leading-7 text-muted-foreground">
                    {{ step.description }}
                  </p>
                </div>
              </article>
            </div>
          </div>
        </article>
      </section>

      <section class="page-shell px-4 py-0 sm:px-6 lg:px-8">
        <article class="page-cut p-5 sm:p-6 lg:p-8">
          <div class="mx-auto max-w-3xl text-center">
            <p class="kicker">{{ faqHero.eyebrow ?? 'QUESTIONS FRÉQUENTES' }}</p>
            <h2 class="mt-4 text-[clamp(1.8rem,3vw,2.55rem)] font-extrabold tracking-[-0.05em] text-foreground">
              {{ faqHero.title ?? 'Tout ce que vous devez savoir avant de vous lancer' }}
            </h2>
            <p class="mt-4 text-base leading-8 text-muted-foreground sm:text-[1.02rem]">
              {{ faqHero.description }}
            </p>
          </div>

          <div class="mx-auto mt-8 grid max-w-5xl gap-4">
            <details
              v-for="(item, index) in faqItems"
              :key="item.question"
              class="accordion-card page-cut px-5 py-4 sm:px-6 sm:py-5"
              v-motion
              :initial="motionVariants.block.initial"
              :enter="staggerEnter(index, 38, 16)"
            >
              <summary class="faq-summary accordion-summary">
                <span class="text-base font-semibold leading-6 text-foreground">{{ item.question }}</span>
                <ChevronDown class="accordion-summary__icon mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              </summary>
              <p class="accordion-panel">{{ item.answer }}</p>
            </details>
          </div>

          <div class="mt-6 text-center">
            <RouterLink :to="faqLink" class="home-inline-link">
              Ouvrir la FAQ dédiée
              <ArrowRight class="h-4 w-4" />
            </RouterLink>
          </div>
        </article>
      </section>

      <section class="home-final-section mt-2 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div class="home-final-shell">
          <p class="kicker text-[color:#5d4700]">DIAGNOSTIC DE FINANCEMENT</p>
          <h2 class="editorial-title home-final-shell__title text-[#13284f]">
            {{ finalCta.title }}
          </h2>
          <p class="home-final-shell__description">
            {{ finalCta.description }}
          </p>
          <Button
            :as="RouterLink"
            :to="diagnosticLink"
            size="lg"
            class="home-final-shell__button justify-center"
          >
            Demander mon diagnostic de financement gratuit
            <Clock3 class="ml-2 h-4 w-4" />
          </Button>
          <p class="home-final-shell__note">
            {{ finalCta.note }}
          </p>
        </div>
      </section>
    </template>
  </div>
</template>

<style scoped>
.home-hero-grid,
.home-dual-grid,
.home-zero-grid {
  display: grid;
  gap: 1rem;
}

.home-hero-card {
  display: grid;
  gap: 1.25rem;
  align-content: center;
}

.home-hook-stack {
  display: grid;
  gap: 0.25rem;
}

.home-hook-title {
  font-size: clamp(2.2rem, 4vw, 3.65rem);
  line-height: 0.98;
}

.home-hook-line {
  display: block;
}

.home-hero-copy {
  max-width: 42rem;
  font-size: 1rem;
  line-height: 1.75;
  color: var(--muted-foreground);
}

.home-hero-list {
  display: grid;
  gap: 0.7rem;
}

.home-hero-list li {
  position: relative;
  padding-left: 1.15rem;
  font-size: 0.98rem;
  font-weight: 600;
  line-height: 1.65;
  color: var(--foreground);
}

.home-hero-list li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.72rem;
  height: 0.42rem;
  width: 0.42rem;
  border-radius: 999px;
  background: var(--primary);
}

.home-hero-actions {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.home-visual-card {
  min-height: 100%;
}

.home-visual-card__image {
  display: block;
  min-height: 20rem;
  height: 100%;
  width: 100%;
  border-radius: 1.1rem;
  object-fit: cover;
}

.home-pain-grid,
.home-proof-grid,
.home-persona-grid,
.home-zero-stats {
  display: grid;
  gap: 1rem;
}

.home-pain-card {
  padding: 1.15rem;
}

.home-proof-card {
  min-height: 100%;
}

.home-persona-card {
  min-height: 100%;
}

.home-source-list {
  display: grid;
  gap: 0.75rem;
}

.home-source-list a {
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--primary);
  text-decoration: underline;
  text-underline-offset: 0.24em;
}

.home-feature-list,
.home-cityz-list,
.home-zero-steps {
  display: grid;
  gap: 1rem;
}

.home-feature-row {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  align-items: start;
}

.home-feature-row__icon,
.home-zero-icon {
  display: inline-flex;
  height: 3.4rem;
  width: 3.4rem;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  background: color-mix(in oklab, var(--paper-tint) 84%, white);
  color: var(--blue-eclipse);
}

.home-cityz-card {
  border-color: color-mix(in oklab, var(--navy-deep) 56%, black);
  background:
    radial-gradient(circle at top right, rgb(255 255 255 / 0.08), transparent 36%),
    linear-gradient(160deg, #0d1a35 0%, #13284f 62%, #0b1630 100%);
}

.home-cityz-row {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.8rem;
  align-items: start;
  color: #ffffff;
}

.home-zero-grid {
  align-items: start;
}

.home-zero-stats {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.home-zero-stat-card,
.home-zero-step-card {
  border-radius: 1.1rem;
  border: 1px solid color-mix(in oklab, var(--line) 78%, white);
  background: color-mix(in oklab, var(--paper) 86%, var(--paper-tint));
  padding: 1rem;
}

.home-zero-stat-card__value {
  font-size: clamp(1.8rem, 3.4vw, 2.5rem);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.05em;
  color: var(--foreground);
}

.home-zero-step-card {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  align-items: start;
}

.home-zero-step-card__number {
  font-size: clamp(2rem, 4vw, 3.2rem);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.06em;
  color: color-mix(in oklab, var(--line) 86%, white);
}

.home-final-section {
  background:
    linear-gradient(180deg, transparent 0%, transparent 10%),
    linear-gradient(135deg, #ffe17c 0%, #ffd34a 52%, #f7c500 100%);
  border-bottom: 1px solid rgb(19 40 79 / 0.18);
}

.home-final-shell {
  margin-inline: auto;
  width: min(100%, 62rem);
  display: grid;
  justify-items: center;
  gap: 1.2rem;
  text-align: center;
}

.home-final-shell__title {
  font-size: clamp(2rem, 4vw, 3.35rem);
}

.home-final-shell__description {
  max-width: 42rem;
  font-size: 1rem;
  line-height: 1.75;
  color: rgb(19 40 79 / 0.9);
}

.home-final-shell__button {
  width: min(100%, 36rem);
  background: #13284f;
  border-color: #13284f;
  color: white;
  box-shadow: 0 20px 44px rgb(19 40 79 / 0.22);
}

.home-final-shell__button:hover {
  background: #0e1d39;
  border-color: #0e1d39;
}

.home-final-shell__note {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgb(19 40 79 / 0.78);
}

@media (min-width: 640px) {
  .home-hero-actions {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .home-pain-grid,
  .home-proof-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (min-width: 768px) {
  .home-persona-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .home-hero-grid {
    grid-template-columns: minmax(0, 1.02fr) minmax(24rem, 0.82fr);
    align-items: stretch;
  }

  .home-dual-grid,
  .home-zero-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .home-persona-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
