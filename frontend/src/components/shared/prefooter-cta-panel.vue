<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import { Button } from '@/components/ui/button'
import { useExperienceVariant } from '@/composables/use-experience-variant'

const route = useRoute()
const { toWithExperience } = useExperienceVariant()

const programLink = computed(() => toWithExperience('/programme'))
const financeLink = computed(() => toWithExperience('/financement'))
const contactLink = computed(() => toWithExperience('/contact'))
const signupLink = computed(() => toWithExperience('/inscription'))
const primaryAction = computed(() => {
  if (route.path.startsWith('/programme')) {
    return {
      label: 'Financer la formation',
      to: financeLink.value
    }
  }

  return {
    label: 'Voir le programme',
    to: programLink.value
  }
})
</script>

<template>
  <div class="prefooter-panel p-5 sm:p-6 lg:p-8">
    <div class="flex flex-col items-center gap-5">
      <div class="space-y-3 text-center">
        <p class="kicker">Prêt à aller plus loin ?</p>
        <h2 class="editorial-title max-w-3xl text-[clamp(1.55rem,2.3vw,2.1rem)] text-foreground">
          Développez vos compétences.
        </h2>
      </div>

      <div class="flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
        <Button :as="RouterLink" :to="primaryAction.to" size="lg" variant="outline" class="w-full justify-center sm:w-auto">
          {{ primaryAction.label }}
        </Button>
        <Button :as="RouterLink" :to="contactLink" size="lg" variant="outline" class="w-full justify-center sm:w-auto">
          Être rappelé
        </Button>
        <Button :as="RouterLink" :to="signupLink" size="lg" class="w-full justify-center sm:w-auto">
          S'inscrire
        </Button>
      </div>
    </div>
  </div>
</template>
