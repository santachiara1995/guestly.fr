<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import LeadForm from '@/components/lead-form.vue'
import { useExperienceVariant } from '@/composables/use-experience-variant'
import { api } from '@/lib/api'
import { motionVariants } from '@/lib/motion'

const route = useRoute()
const { toWithExperience } = useExperienceVariant()
const site = ref({
  signup: {},
  finance: {}
})
const loading = ref(true)

onMounted(async () => {
  try {
    const sitePayload = await api.getSite()
    site.value = sitePayload
  } finally {
    loading.value = false
  }
})

const signupCopy = computed(() => site.value.signup ?? {})
const hero = computed(() => ({
  eyebrow: signupCopy.value.heroEyebrow ?? 'Inscription RPMS',
  title: signupCopy.value.heroTitle ?? 'Inscrivez-vous à la formation RPMS.',
  support:
    signupCopy.value.heroSupport ??
    "Complétez le formulaire pour lancer votre demande d'inscription et accéder ensuite au bon mode de règlement.",
  intro:
    signupCopy.value.formIntro ??
    "Quelques informations suffisent pour démarrer votre demande d'inscription."
}))

const selectedPayment = computed(() =>
  route.query.payment === 'installments' ? 'installments' : 'cash'
)

const paymentLinks = computed(() => ({
  cashUrl: site.value.finance?.paymentLinks?.cashUrl ?? '',
  installmentsUrl: site.value.finance?.paymentLinks?.installmentsUrl ?? ''
}))

const termsLink = computed(() => toWithExperience('/cgv-cgu'))
</script>

<template>
  <div class="page-stack sm:-mx-6 lg:-mx-8">
    <p v-if="loading" class="text-sm text-muted-foreground">Chargement de l’inscription…</p>

    <template v-else>
      <section
        id="formulaire-inscription"
        class="px-4 py-6 sm:px-6 lg:px-8 lg:py-8"
        v-motion
        :initial="motionVariants.block.initial"
        :enter="motionVariants.block.enter"
      >
        <div class="shell-track">
          <article class="page-hero p-5 sm:p-6 lg:p-7">
            <div class="space-y-3">
              <p class="kicker">{{ hero.eyebrow }}</p>
              <h1 class="editorial-title max-w-4xl text-[clamp(1.5rem,2.35vw,2.15rem)] text-foreground">
                {{ hero.title }}
              </h1>
              <p class="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-[0.98rem]">
                {{ hero.support }}
              </p>
              <p class="max-w-3xl text-sm leading-7 text-foreground sm:text-[0.98rem]">
                {{ hero.intro }}
              </p>
            </div>

            <div class="mt-5 border-t border-border/70 pt-5">
              <LeadForm
                source-page="/inscription"
                appointment-support="Choisissez si vous le souhaitez un créneau de rappel ou d'échange pour finaliser votre inscription."
                appointment-title="Calendrier de rappel"
                :payment-links="paymentLinks"
                :payment-support="signupCopy.paymentSupport"
                :payment-title="signupCopy.paymentTitle"
                :selected-payment="selectedPayment"
                show-appointment-picker
                submit-label="S'inscrire"
              />
            </div>

            <div class="mt-6 border-t border-border/70 pt-4 text-sm leading-6 text-muted-foreground">
              En poursuivant votre inscription, vous reconnaissez avoir pris connaissance des
              <RouterLink :to="termsLink" class="font-semibold text-primary underline-offset-4 hover:text-secondary hover:underline">
                CGV / CGU
              </RouterLink>
              applicables au site et à la formation.
            </div>
          </article>
        </div>
      </section>
    </template>
  </div>
</template>
