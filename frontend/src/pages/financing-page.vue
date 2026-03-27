<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowRight, BadgeCheck, CircleDollarSign, Clock3, ShieldCheck } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import { useExperienceVariant } from '@/composables/use-experience-variant'
import { api } from '@/lib/api'
import { motionVariants, staggerEnter } from '@/lib/motion'

const site = ref({
  finance: {}
})
const program = ref(null)
const loading = ref(true)
const errorMessage = ref('')

const { toWithExperience } = useExperienceVariant()

onMounted(async () => {
  try {
    const [sitePayload, programPayload] = await Promise.all([api.getSite(), api.getProgram('rpms')])
    site.value = sitePayload
    program.value = programPayload
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Contenu indisponible.'
  } finally {
    loading.value = false
  }
})

const financeCopy = computed(() => site.value.finance ?? {})
const programLink = computed(() => toWithExperience('/programme'))
const contactLink = computed(() => toWithExperience('/contact'))

const trustChips = computed(() => [
  program.value?.rncpCode ?? 'RNCP38575',
  program.value?.levelLabel ?? 'Niveau 5 / Bac+2',
  program.value?.formatLabel ?? '100 % distanciel',
  program.value?.supportLabel ?? 'Accompagnement pédagogique'
])

const pricingHighlights = computed(() => [
  {
    label: financeCopy.value.pricing?.eyebrow ?? 'Tarif',
    value: financeCopy.value.pricing?.amount ?? '3 500 € TTC',
    note: financeCopy.value.pricing?.description ?? "Tarif présenté pour l'offre RPMS.",
    icon: CircleDollarSign
  },
  {
    label: 'Paiement',
    value: 'Comptant ou plusieurs fois sans frais',
    note: 'Partenariat COFIDIS',
    icon: BadgeCheck
  },
  {
    label: 'Accès',
    value: 'Conditionné au paiement',
    note: 'Le parcours reste lié au règlement.',
    icon: ShieldCheck
  },
  {
    label: 'Examen',
    value: 'Entre le 6ème et le 12ème mois',
    note: 'Passage de l’examen mentionné dans le projet RMPS.',
    icon: Clock3
  }
])

const paymentOptions = computed(() => financeCopy.value.paymentSection?.options ?? [])
const financeConditions = computed(() => financeCopy.value.conditionsSection?.items ?? [])
</script>

<template>
  <div class="financing-page -mx-4 space-y-10 sm:-mx-6 sm:space-y-12 lg:-mx-8 lg:space-y-14">
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
        class="hero-split mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14"
        v-motion
        :initial="motionVariants.block.initial"
        :enter="motionVariants.block.enter"
      >
        <div class="grid gap-8 lg:grid-cols-[1.06fr,0.94fr] lg:items-start">
          <div class="space-y-6 lg:space-y-7">
            <div class="hero-badge">
              <span class="hero-badge__dot hero-badge__dot--red"></span>
              <span>Financement RPMS</span>
            </div>

            <div class="space-y-4">
              <h1 class="hero-gradient-title max-w-3xl text-[clamp(2.4rem,5vw,4.85rem)] text-foreground">
                {{
                  financeCopy.hero?.title ??
                  'Le financement du RPMS, présenté de manière claire et directe.'
                }}
              </h1>
              <p class="hero-lead max-w-2xl text-base leading-8 text-muted-foreground sm:text-[1.02rem]">
                {{
                  financeCopy.hero?.description ??
                  "Prix, modalités de paiement et conditions de l'offre sont réunis ici pour vous permettre d'avancer en connaissance de cause."
                }}
              </p>
            </div>

            <div class="flex flex-wrap gap-2">
              <span v-for="chip in trustChips" :key="chip" class="info-chip info-chip--soft">
                {{ chip }}
              </span>
            </div>

            <p class="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-[0.98rem]">
              Le détail ci-dessous reprend uniquement les informations publiées pour cette offre
              RPMS.
            </p>
          </div>

          <aside class="sidebar-panel">
            <div class="space-y-3">
              <span class="info-chip info-chip--soft">Prix de la formation</span>
              <div>
                <p class="detail-key">
                  Tarif annoncé
                </p>
                <p class="mt-2 text-[clamp(2.35rem,4.6vw,3.8rem)] font-extrabold tracking-[-0.06em] text-primary">
                  {{ financeCopy.pricing?.amount ?? '3 500 € TTC' }}
                </p>
                <p class="mt-3 text-sm leading-7 text-muted-foreground">
                  {{
                    financeCopy.pricing?.description ??
                    "Le tarif présenté correspond à l'offre RPMS de CITYZ'France."
                  }}
                </p>
              </div>
            </div>

            <div class="grid gap-3">
              <article
                v-for="(item, index) in pricingHighlights"
                :key="item.label"
                class="paper-card paper-card--compact"
                v-motion
                :initial="motionVariants.pop.initial"
                :enter="staggerEnter(index, 44, 20)"
              >
                <div class="flex items-start gap-3">
                  <span class="paper-card__icon" aria-hidden="true">
                    <component :is="item.icon" class="h-4 w-4" />
                  </span>
                  <div class="space-y-1">
                    <p class="detail-key">{{ item.label }}</p>
                    <p class="text-sm font-semibold leading-6 text-foreground">{{ item.value }}</p>
                    <p v-if="item.note" class="text-sm leading-6 text-muted-foreground">
                      {{ item.note }}
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </aside>
        </div>
      </section>

      <section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="support-grid lg:grid-cols-2">
          <article
            class="paper-card p-6 sm:p-7"
            v-motion
            :initial="motionVariants.block.initial"
            :enter="motionVariants.block.enter"
          >
            <p class="kicker">{{ financeCopy.paymentSection?.eyebrow ?? 'Modalités de paiement' }}</p>
            <h2 class="mt-3 text-[clamp(1.65rem,2.9vw,2.4rem)] font-extrabold tracking-[-0.05em] text-primary">
              {{
                financeCopy.paymentSection?.title ??
                'Des solutions de règlement clairement établies'
              }}
            </h2>

            <div class="mt-6 grid gap-3">
              <article
                v-for="(option, index) in paymentOptions"
                :key="option"
                class="paper-card paper-card--soft"
                v-motion
                :initial="motionVariants.pop.initial"
                :enter="staggerEnter(index, 40, 20)"
              >
                <div class="flex items-start gap-3">
                  <span class="finance-badge">{{ index + 1 }}</span>
                  <p class="text-sm leading-6 text-foreground">
                    {{ option }}
                  </p>
                </div>
              </article>
            </div>
          </article>

          <article
            class="paper-card p-6 sm:p-7"
            v-motion
            :initial="motionVariants.block.initial"
            :enter="motionVariants.block.enter"
          >
            <p class="kicker">{{ financeCopy.conditionsSection?.eyebrow ?? 'Conditions à connaître' }}</p>
            <h2 class="mt-3 text-[clamp(1.65rem,2.9vw,2.4rem)] font-extrabold tracking-[-0.05em] text-primary">
              {{
                financeCopy.conditionsSection?.title ??
                "Les conditions principales liées à l'offre"
              }}
            </h2>

            <div class="mt-6 grid gap-3">
              <article
                v-for="(item, index) in financeConditions"
                :key="item"
                class="paper-card paper-card--soft"
                v-motion
                :initial="motionVariants.pop.initial"
                :enter="staggerEnter(index, 40, 20)"
              >
                <div class="flex items-start gap-3">
                  <span class="finance-line" aria-hidden="true"></span>
                  <p class="text-sm leading-6 text-foreground">
                    {{ item }}
                  </p>
                </div>
              </article>
            </div>
          </article>
        </div>
      </section>

      <section class="mx-auto max-w-7xl px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4">
        <div
          class="cta-band"
          v-motion
          :initial="motionVariants.block.initial"
          :enter="motionVariants.block.enter"
        >
          <div class="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div class="space-y-2">
              <p class="kicker">{{ financeCopy.ctaBand?.eyebrow ?? 'Besoin d’aller plus loin ?' }}</p>
              <h2 class="editorial-title max-w-3xl text-[clamp(1.6rem,2.8vw,2.35rem)] text-foreground">
                {{
                  financeCopy.ctaBand?.title ?? 'Revenez au programme ou demandez un rappel'
                }}
              </h2>
              <p class="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-[1rem]">
                {{
                  financeCopy.ctaBand?.description ??
                  'Le financement complète naturellement la lecture du programme.'
                }}
              </p>
            </div>

            <div class="flex flex-col gap-3 sm:flex-row">
              <Button :as="RouterLink" :to="programLink" size="default">
                Voir le programme
                <ArrowRight class="ml-2 h-4 w-4" />
              </Button>
              <Button :as="RouterLink" :to="contactLink" size="default" variant="outline">
                Être rappelé
              </Button>
            </div>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<style scoped>
.hero-split,
.paper-card,
.sidebar-panel,
.cta-band {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--border);
  box-shadow: var(--surface-shadow-soft);
}

.hero-split {
  border-radius: 1.7rem;
  background:
    radial-gradient(circle at 88% 16%, rgb(29 95 210 / 0.08), transparent 22%),
    radial-gradient(circle at 6% 8%, rgb(216 74 83 / 0.06), transparent 16%),
    linear-gradient(180deg, rgb(255 255 255 / 0.98) 0%, rgb(247 249 253 / 0.98) 100%);
}

.hero-split::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(90deg, rgb(255 255 255 / 0.18), transparent 36%),
    linear-gradient(180deg, rgb(255 255 255 / 0.22), transparent 58%);
}

.hero-split > *,
.cta-band > * {
  position: relative;
  z-index: 1;
}

.info-chip {
  display: inline-flex;
  min-height: 2.2rem;
  align-items: center;
  border-radius: 999px;
  border: 1px solid color-mix(in oklab, var(--line) 78%, var(--primary));
  background: color-mix(in oklab, var(--paper-tint) 70%, white);
  padding: 0.42rem 0.9rem;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  color: var(--blue-eclipse);
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.9);
}

.info-chip--soft {
  background: color-mix(in oklab, var(--harbor-haze) 68%, white);
}

.sidebar-panel {
  display: grid;
  gap: 1rem;
  border-radius: 1.45rem;
  background:
    linear-gradient(180deg, rgb(255 255 255 / 0.98) 0%, rgb(240 245 255 / 0.96) 100%);
  padding: 1.25rem;
}

.sidebar-panel::before,
.paper-card::before,
.cta-band::before {
  content: '';
  position: absolute;
  inset: 0 auto 0 0;
  width: 3px;
  background: linear-gradient(
    180deg,
    var(--primary) 0%,
    color-mix(in oklab, var(--tricolor-red) 54%, var(--primary)) 100%
  );
}

.paper-card {
  position: relative;
  border-radius: 1.15rem;
  background: var(--paper);
}

.paper-card--compact {
  padding: 0.95rem 0.95rem 0.95rem 1rem;
  background: var(--paper-soft);
}

.paper-card--soft {
  background: var(--paper-soft);
  box-shadow: none;
  padding: 1rem 1.05rem;
}

.paper-card__icon {
  display: inline-flex;
  height: 2.25rem;
  width: 2.25rem;
  flex: none;
  align-items: center;
  justify-content: center;
  border-radius: 0.8rem;
  background: color-mix(in oklab, var(--paper-tint) 76%, white);
  color: var(--blue-eclipse);
}

.support-grid {
  display: grid;
  gap: 1rem;
}

.cta-band {
  border-radius: 1.35rem;
  background: linear-gradient(180deg, rgb(255 255 255 / 0.98) 0%, rgb(237 243 255 / 0.94) 100%);
  padding: 1.25rem;
}

@media (min-width: 640px) {
  .sidebar-panel {
    padding: 1.4rem;
  }
}

@media (min-width: 1024px) {
  .support-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.25rem;
  }

  .cta-band {
    padding: 1.45rem 1.5rem;
  }
}
</style>
