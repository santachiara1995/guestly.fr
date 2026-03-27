<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowRight } from 'lucide-vue-next'

import LeadForm from '@/components/lead-form.vue'
import TrustStrip from '@/components/visual/trust-strip.vue'
import { Button } from '@/components/ui/button'
import { useExperienceVariant } from '@/composables/use-experience-variant'
import { api } from '@/lib/api'
import { motionVariants, staggerEnter } from '@/lib/motion'

const site = ref({
  contact: {},
  organizationProfile: {}
})
const program = ref({
  title: 'Titre professionnel Responsable petite et moyenne structure (RPMS)',
  rncpCode: 'RNCP38575',
  levelLabel: 'Niveau 5 / Bac+2',
  formatLabel: '100 % distanciel',
  rhythmLabel: 'E-learning',
  supportLabel: 'Accompagnement pédagogique'
})
const loading = ref(true)

const { toWithExperience } = useExperienceVariant()

onMounted(async () => {
  try {
    const [sitePayload, programPayload] = await Promise.all([api.getSite(), api.getProgram('rpms')])
    site.value = sitePayload
    program.value = programPayload
  } finally {
    loading.value = false
  }
})

const contactCopy = computed(() => site.value.contact ?? {})
const displayPhone = computed(() => site.value.contact?.phone?.trim() ?? null)
const displayAddress = computed(
  () =>
    site.value.contact?.address?.trim() ??
    site.value.organizationProfile?.headquartersAddress?.trim() ??
    null
)
const displayWebsite = computed(
  () =>
    site.value.contact?.website?.trim() ??
    site.value.organizationProfile?.website?.trim() ??
    null
)

const programLink = computed(() => toWithExperience('/programme'))
const financeLink = computed(() => toWithExperience('/financement'))

const trustStripItems = computed(() => [
  program.value?.rncpCode ?? 'RNCP38575',
  program.value?.levelLabel ?? 'Niveau 5 / Bac+2',
  program.value?.formatLabel ?? '100 % distanciel',
  program.value?.supportLabel ?? 'Accompagnement pédagogique'
])

const supportFacts = computed(() =>
  [
    { label: 'Titre', value: program.value?.title },
    { label: 'Niveau', value: program.value?.levelLabel },
    { label: 'Code RNCP', value: program.value?.rncpCode },
    { label: 'Modalité', value: program.value?.formatLabel },
    { label: 'Cadre', value: program.value?.rhythmLabel },
    { label: 'Appui', value: program.value?.supportLabel }
  ].filter((item) => item.value)
)
</script>

<template>
  <div class="space-y-12 sm:space-y-14 lg:space-y-16">
    <p v-if="loading" class="text-sm text-muted-foreground">Chargement du contact…</p>

    <template v-else>
      <section
        class="page-hero grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.04fr,0.96fr] lg:p-10"
        v-motion
        :initial="motionVariants.block.initial"
        :enter="motionVariants.block.enter"
      >
        <div class="space-y-6">
          <div class="space-y-4">
            <p class="kicker">{{ contactCopy.heroEyebrow }}</p>
            <h1 class="editorial-title max-w-4xl text-[clamp(2rem,4vw,3.55rem)] text-foreground">
              {{ contactCopy.heroTitle }}
            </h1>
            <p class="max-w-3xl text-base leading-8 text-muted-foreground sm:text-[1.02rem]">
              {{ contactCopy.heroSupport }}
            </p>
          </div>

          <p class="max-w-2xl text-base font-medium leading-7 text-foreground sm:text-[1rem]">
            {{ contactCopy.formIntro }}
          </p>

          <TrustStrip :items="trustStripItems" />
        </div>

        <aside class="trust-panel page-cut p-6 sm:p-7">
          <p class="kicker">{{ contactCopy.factsTitle }}</p>
          <h2 class="mt-4 text-[clamp(1.5rem,3vw,2.05rem)] font-semibold tracking-[-0.04em] text-foreground">
            Repères avant la prise de contact
          </h2>

          <div class="mt-6 grid gap-3">
            <article
              v-for="(item, index) in supportFacts"
              :key="item.label"
              class="elevated-item rounded-[1rem] p-4"
              v-motion
              :initial="motionVariants.pop.initial"
              :enter="staggerEnter(index, 44, 24)"
            >
              <p class="detail-key">{{ item.label }}</p>
              <p class="mt-2 text-sm leading-6 text-foreground">{{ item.value }}</p>
            </article>
          </div>
        </aside>
      </section>

      <section class="grid gap-6 lg:grid-cols-[1.02fr,0.98fr]" id="formulaire-rappel">
        <article class="page-cut p-6 sm:p-7">
          <p class="kicker">{{ contactCopy.formTitle }}</p>
          <h2 class="mt-4 text-[clamp(1.55rem,3vw,2.1rem)] font-semibold tracking-[-0.04em] text-foreground">
            {{ contactCopy.formSupport }}
          </h2>

          <div class="mt-6">
            <LeadForm source-page="/contact" />
          </div>
        </article>

        <aside class="page-cut p-6 sm:p-7">
          <p class="kicker">{{ contactCopy.guidanceTitle }}</p>
          <h2 class="mt-4 text-[clamp(1.55rem,3vw,2.1rem)] font-semibold tracking-[-0.04em] text-foreground">
            Préparez votre demande autour d’un point précis.
          </h2>

          <div class="mt-6 grid gap-3">
            <article
              v-for="(point, index) in contactCopy.guidancePoints ?? []"
              :key="point"
              class="decision-card"
              v-motion
              :initial="motionVariants.pop.initial"
              :enter="staggerEnter(index, 44, 24)"
            >
              <p class="detail-key">Point {{ index + 1 }}</p>
              <p class="mt-3 text-sm leading-7 text-muted-foreground">
                {{ point }}
              </p>
            </article>
          </div>

          <div class="mt-6 space-y-3 text-sm leading-7 text-muted-foreground">
            <p v-if="displayPhone">
              Téléphone :
              <a class="font-semibold text-foreground underline-offset-4 hover:underline" :href="`tel:+33${displayPhone.replace(/\\D/g, '').replace(/^0/, '')}`">
                {{ displayPhone }}
              </a>
            </p>
            <p v-if="displayWebsite">
              Site : {{ displayWebsite }}
            </p>
            <p v-if="displayAddress">
              Adresse : {{ displayAddress }}
            </p>
            <p v-if="site.organizationProfile?.certification">
              {{ site.organizationProfile.certification }}
            </p>
          </div>
        </aside>
      </section>

      <section class="space-y-6">
        <SectionTitle
          :eyebrow="contactCopy.nextStepNote?.title"
          title="Ce qui se passe après votre demande"
          :description="contactCopy.footerBand?.description"
        />

        <div class="grid gap-4 xl:grid-cols-3">
          <article
            v-for="(point, index) in contactCopy.nextStepNote?.points ?? []"
            :key="point"
            class="feature-tile"
            v-motion
            :initial="motionVariants.block.initial"
            :enter="staggerEnter(index, 44, 24)"
          >
            <p class="detail-key">Étape {{ index + 1 }}</p>
            <p class="mt-3 text-sm leading-7 text-muted-foreground">
              {{ point }}
            </p>
          </article>
        </div>
      </section>

      <section class="arch-cta p-6 sm:p-8 lg:p-10">
        <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div class="space-y-3">
            <p class="kicker">{{ contactCopy.footerBand?.eyebrow }}</p>
            <h2 class="editorial-title max-w-3xl text-[clamp(1.9rem,3vw,2.75rem)] text-foreground">
              {{ contactCopy.footerBand?.title }}
            </h2>
            <p class="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-[1rem]">
              {{ contactCopy.footerBand?.description }}
            </p>
          </div>

          <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button :as="RouterLink" :to="programLink" size="lg">
              Voir le programme
              <ArrowRight class="ml-2 h-4 w-4" />
            </Button>
            <Button :as="RouterLink" :to="financeLink" size="lg" variant="outline">
              Voir le financement
            </Button>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>
