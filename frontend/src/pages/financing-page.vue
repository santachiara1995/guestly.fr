<script setup>
import { computed, onMounted, ref } from 'vue'
import { BadgeCheck, CircleDollarSign, Clock3, ShieldCheck } from 'lucide-vue-next'

import PrefooterCtaPanel from '@/components/shared/prefooter-cta-panel.vue'
import { api } from '@/lib/api'
import { motionVariants, staggerEnter } from '@/lib/motion'

const site = ref({
  finance: {}
})
const program = ref(null)
const loading = ref(true)
const errorMessage = ref('')

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

const trustChips = computed(() => [
  program.value?.rncpCode ?? 'RNCP38575',
  program.value?.levelLabel ?? 'Niveau 5 / Bac+2',
  program.value?.formatLabel ?? '100 % distanciel',
  program.value?.supportLabel ?? 'Accompagnement pédagogique'
])

const pricingHighlights = computed(() => [
  {
    label: financeCopy.value.pricing?.eyebrow ?? 'Prix de la formation',
    value: financeCopy.value.pricing?.amount ?? '3 500 € TTC',
    note:
      financeCopy.value.pricing?.description ??
      "Le tarif présenté correspond à l'offre RPMS de CITYZ'France.",
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
    note: 'Passage de l’examen du titre professionnel RPMS.',
    icon: Clock3
  }
])
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
          <div class="space-y-4">
            <h1 class="editorial-title max-w-3xl text-[clamp(1.95rem,3.4vw,3rem)] text-foreground">
              {{
                financeCopy.hero?.title ??
                'Le financement du RPMS, présenté de manière claire et directe.'
              }}
            </h1>
            <p class="hero-lead max-w-3xl text-base leading-7 text-muted-foreground sm:text-[1rem]">
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

          <div class="grid gap-3 lg:grid-cols-4">
            <article
              v-for="(item, index) in pricingHighlights"
              :key="item.label"
              class="paper-card paper-card--compact h-full"
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
        </article>
      </section>

      <section class="page-shell px-4 py-0 sm:px-6 lg:px-8">
        <PrefooterCtaPanel />
      </section>
    </template>
  </div>
</template>
