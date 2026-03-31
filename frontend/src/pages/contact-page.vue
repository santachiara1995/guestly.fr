<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import LeadForm from '@/components/lead-form.vue'
import { api } from '@/lib/api'
import { motionVariants } from '@/lib/motion'

const route = useRoute()
const site = ref({
  contact: {},
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

const contactCopy = computed(() => site.value.contact ?? {})
const hero = computed(() => ({
  eyebrow: contactCopy.value.heroEyebrow ?? 'Inscription RPMS',
  title: contactCopy.value.heroTitle ?? 'Inscrivez-vous au RPMS.',
  support:
    contactCopy.value.heroSupport ??
    "Complétez le formulaire pour lancer votre demande et préciser le point que vous souhaitez encore clarifier.",
  intro:
    contactCopy.value.formIntro ??
    "Quelques informations suffisent pour démarrer votre demande d'inscription.",
  formTitle: contactCopy.value.formTitle ?? "Lancez votre inscription"
}))

const selectedPayment = computed(() =>
  route.query.payment === 'installments' ? 'installments' : 'cash'
)

const paymentLinks = computed(() => ({
  cashUrl: site.value.finance?.paymentLinks?.cashUrl ?? '',
  installmentsUrl: site.value.finance?.paymentLinks?.installmentsUrl ?? ''
}))
</script>

<template>
  <div class="page-stack -mx-4 sm:-mx-6 lg:-mx-8">
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
                source-page="/contact"
                :payment-links="paymentLinks"
                :payment-support="contactCopy.paymentSupport"
                :payment-title="contactCopy.paymentTitle"
                :selected-payment="selectedPayment"
              />
            </div>
          </article>
        </div>
      </section>
    </template>
  </div>
</template>
