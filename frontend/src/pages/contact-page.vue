<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowRight } from 'lucide-vue-next'

import LeadForm from '@/components/lead-form.vue'
import { Button } from '@/components/ui/button'
import { useExperienceVariant } from '@/composables/use-experience-variant'
import { api } from '@/lib/api'
import { motionVariants } from '@/lib/motion'

const site = ref({
  contact: {}
})
const loading = ref(true)

const { toWithExperience } = useExperienceVariant()

onMounted(async () => {
  try {
    const sitePayload = await api.getSite()
    site.value = sitePayload
  } finally {
    loading.value = false
  }
})

const contactCopy = computed(() => site.value.contact ?? {})
const programLink = computed(() => toWithExperience('/programme'))
const financeLink = computed(() => toWithExperience('/financement'))

const hero = computed(() => ({
  eyebrow: contactCopy.value.heroEyebrow ?? 'Inscription RPMS',
  title: contactCopy.value.heroTitle ?? 'Inscrivez-vous au RPMS.',
  support:
    contactCopy.value.heroSupport ??
    "Complétez le formulaire pour lancer votre demande et préciser le point que vous souhaitez encore clarifier.",
  intro:
    contactCopy.value.formIntro ??
    "Quelques informations suffisent pour démarrer votre demande d'inscription.",
  formTitle: contactCopy.value.formTitle ?? "Lancez votre inscription",
  formSupport:
    contactCopy.value.formSupport ??
    "Renseignez simplement vos coordonnées et le point utile pour finaliser votre projet."
}))
</script>

<template>
  <div class="page-stack">
    <p v-if="loading" class="text-sm text-muted-foreground">Chargement de l’inscription…</p>

    <template v-else>
      <section
        id="formulaire-inscription"
        class="page-shell"
        v-motion
        :initial="motionVariants.block.initial"
        :enter="motionVariants.block.enter"
      >
        <article class="page-hero p-5 sm:p-6 lg:p-7">
          <div class="space-y-4">
            <p class="kicker">{{ hero.eyebrow }}</p>
            <h1 class="editorial-title max-w-4xl text-[clamp(1.75rem,3vw,2.6rem)] text-foreground">
              {{ hero.title }}
            </h1>
            <p class="max-w-3xl text-base leading-8 text-muted-foreground sm:text-[1.02rem]">
              {{ hero.support }}
            </p>
          </div>

          <div class="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button :as="RouterLink" :to="programLink" size="lg" variant="outline">
              Voir le programme
            </Button>
            <Button :as="RouterLink" :to="financeLink" size="lg" variant="outline">
              Voir le financement
            </Button>
            <Button as="a" href="#formulaire-inscription" size="lg">
              S'inscrire
              <ArrowRight class="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div class="mt-5 border-t border-border/70 pt-5">
            <div class="space-y-3">
              <p class="kicker">{{ hero.formTitle }}</p>
              <h2 class="editorial-title max-w-4xl text-[clamp(1.5rem,2.35vw,2.15rem)] text-foreground">
                {{ hero.formSupport }}
              </h2>
              <p class="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-[0.98rem]">
                {{ hero.intro }}
              </p>
            </div>

            <div class="mt-5">
              <LeadForm source-page="/contact" />
            </div>
          </div>
        </article>
      </section>

      <section class="page-shell prefooter-panel p-5 sm:p-6 lg:p-8">
        <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div class="space-y-3">
            <p class="kicker">{{ contactCopy.footerBand?.eyebrow ?? 'Avant de valider' }}</p>
            <h2 class="editorial-title max-w-3xl text-[clamp(1.55rem,2.3vw,2.1rem)] text-foreground">
              {{
                contactCopy.footerBand?.title ??
                'Programme et financement restent accessibles à tout moment'
              }}
            </h2>
            <p class="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-[1rem]">
              {{
                contactCopy.footerBand?.description ??
                "Relisez-les si besoin, ou passez directement à l'inscription."
              }}
            </p>
          </div>

          <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button :as="RouterLink" :to="programLink" size="lg" variant="outline">
              Voir le programme
            </Button>
            <Button :as="RouterLink" :to="financeLink" size="lg" variant="outline">
              Voir le financement
            </Button>
            <Button as="a" href="#formulaire-inscription" size="lg">
              S'inscrire
            </Button>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>
