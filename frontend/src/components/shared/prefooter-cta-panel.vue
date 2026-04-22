<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

import { Button } from '@/components/ui/button'
import { useExperienceVariant } from '@/composables/use-experience-variant'

const { toWithExperience } = useExperienceVariant()

const diagnosticLink = computed(() =>
  toWithExperience({
    path: '/inscription',
    query: { payment: 'state' },
    hash: '#formulaire-inscription'
  })
)
const signupLink = computed(() => toWithExperience('/inscription'))
</script>

<template>
  <div class="prefooter-panel prefooter-panel--minimal p-5 sm:p-6 lg:p-8">
    <div class="space-y-6 text-center">
      <div class="space-y-3">
        <p class="kicker">PRÊT À PASSER À L'ACTION ?</p>
        <h2 class="editorial-title prefooter-panel__title text-primary">
          Donnez un nouvel élan à votre carrière.
        </h2>
      </div>

      <div class="prefooter-panel__actions">
        <Button
          :as="RouterLink"
          :to="diagnosticLink"
          size="lg"
          variant="outline"
          class="w-full justify-center sm:w-auto"
        >
          Je réserve mon diagnostic gratuit
        </Button>
        <Button
          :as="RouterLink"
          :to="signupLink"
          size="lg"
          class="prefooter-panel__primary w-full justify-center sm:w-auto"
        >
          Je m'inscris maintenant
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.prefooter-panel--minimal {
  border-top: 1px solid color-mix(in oklab, var(--line) 76%, white);
  border-bottom: 1px solid color-mix(in oklab, var(--line) 76%, white);
  background: color-mix(in oklab, var(--paper) 84%, var(--paper-tint));
  box-shadow: var(--surface-shadow-soft);
}

.prefooter-panel__title {
  font-size: clamp(1.8rem, 3vw, 2.55rem);
}

.prefooter-panel__actions {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.prefooter-panel__primary {
  order: -1;
}

@media (min-width: 640px) {
  .prefooter-panel__actions {
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
  }

  .prefooter-panel__primary {
    order: 0;
  }
}
</style>
