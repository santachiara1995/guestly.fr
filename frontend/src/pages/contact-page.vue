<script setup>
import { computed, onMounted, ref } from 'vue'

import LeadForm from '@/components/lead-form.vue'
import { api } from '@/lib/api'
import { motionVariants } from '@/lib/motion'

const site = ref({
  contact: {}
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
  eyebrow: contactCopy.value.heroEyebrow ?? 'Contact',
  title: contactCopy.value.heroTitle ?? 'Demandez à être rappelé.',
  support:
    contactCopy.value.heroSupport ??
    "Laissez simplement vos coordonnées pour que l'équipe CITYZ'France puisse vous recontacter.",
  intro:
    contactCopy.value.formIntro ??
    "Indiquez vos coordonnées principales et nous reviendrons vers vous pour répondre à vos questions."
}))
</script>

<template>
  <div class="page-stack sm:-mx-6 lg:-mx-8">
    <p v-if="loading" class="text-sm text-muted-foreground">Chargement du contact…</p>

    <template v-else>
      <section
        id="formulaire-contact"
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
                :show-date-of-birth="false"
                show-appointment-picker
                :show-payment-section="false"
                appointment-support="Indiquez si vous le souhaitez une date et une heure de rappel pour être recontacté plus facilement."
                appointment-title="Créneau de rappel"
                consent-label="J’accepte que CITYZ'France utilise ces informations pour me recontacter."
                submission-message="Demande de rappel via formulaire de contact."
                submit-label="Être rappelé"
              />
            </div>
          </article>
        </div>
      </section>
    </template>
  </div>
</template>
