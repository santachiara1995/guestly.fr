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
  <div class="financing-page -mx-4 space-y-9 sm:-mx-6 sm:space-y-10 lg:-mx-8 lg:space-y-12">
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
        class="hero-split mx-auto max-w-[1120px] px-4 py-6 sm:px-6 lg:px-8 lg:py-10"
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
              <h1 class="hero-gradient-title max-w-3xl text-foreground">
                {{
                  financeCopy.hero?.title ??
                  'Le financement du RPMS, présenté de manière claire et directe.'
                }}
              </h1>
              <p class="hero-lead max-w-2xl text-base leading-7 text-muted-foreground sm:text-[1rem]">
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
                <p class="mt-2 text-[clamp(2rem,3.8vw,3rem)] font-extrabold tracking-[-0.06em] text-primary">
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

      <section class="mx-auto max-w-[1120px] px-4 py-1 sm:px-6 lg:px-8">
        <div class="support-grid lg:grid-cols-2">
          <article
            class="paper-card p-5 sm:p-6"
            v-motion
            :initial="motionVariants.block.initial"
            :enter="motionVariants.block.enter"
          >
            <p class="kicker">{{ financeCopy.paymentSection?.eyebrow ?? 'Modalités de paiement' }}</p>
            <h2 class="mt-3 text-[clamp(1.35rem,2vw,1.8rem)] font-extrabold tracking-[-0.05em] text-primary">
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
            class="paper-card p-5 sm:p-6"
            v-motion
            :initial="motionVariants.block.initial"
            :enter="motionVariants.block.enter"
          >
            <p class="kicker">{{ financeCopy.conditionsSection?.eyebrow ?? 'Conditions à connaître' }}</p>
            <h2 class="mt-3 text-[clamp(1.35rem,2vw,1.8rem)] font-extrabold tracking-[-0.05em] text-primary">
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

      <section class="mx-auto max-w-[1120px] px-4 py-1 sm:px-6 sm:py-2 lg:px-8 lg:py-3">
        <div
          class="cta-band"
          v-motion
          :initial="motionVariants.block.initial"
          :enter="motionVariants.block.enter"
        >
          <div class="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div class="space-y-2">
              <p class="kicker">{{ financeCopy.ctaBand?.eyebrow ?? 'Besoin d’aller plus loin ?' }}</p>
              <h2 class="editorial-title max-w-3xl text-[clamp(1.45rem,2.1vw,1.95rem)] text-foreground">
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
