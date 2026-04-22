<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { Clock3 } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import { useExperienceVariant } from '@/composables/use-experience-variant'

const props = defineProps({
  copy: {
    type: Object,
    default: () => ({})
  }
})

const { toWithExperience } = useExperienceVariant()

const diagnosticLink = computed(() =>
  toWithExperience({
    path: '/inscription',
    query: { payment: 'state' },
    hash: '#formulaire-inscription'
  })
)

const title = computed(() => props.copy?.title ?? 'Prêt à briser votre plafond de verre ?')
const description = computed(
  () =>
    props.copy?.description ??
    "Nos experts répondent à vos questions sur la formation, le financement et votre éligibilité, sans engagement. Réservez ensuite votre appel de 15 minutes."
)
const note = computed(() => props.copy?.note ?? 'NOMBRE DE PLACES LIMITÉ POUR CHAQUE SESSION')
</script>

<template>
  <article class="final-diagnostic-panel page-cut p-6 sm:p-8 lg:p-10">
    <div class="final-diagnostic-shell">
      <h2 class="editorial-title final-diagnostic-shell__title">
        {{ title }}
      </h2>
      <p class="final-diagnostic-shell__description">
        {{ description }}
      </p>
      <Button
        :as="RouterLink"
        :to="diagnosticLink"
        size="lg"
        class="final-diagnostic-shell__button justify-center whitespace-normal text-center"
      >
        Demander mon diagnostic gratuit
        <Clock3 class="ml-2 h-4 w-4" />
      </Button>
      <p class="final-diagnostic-shell__note">
        {{ note }}
      </p>
    </div>
  </article>
</template>

<style scoped>
.final-diagnostic-panel {
  border-color: color-mix(in oklab, var(--primary) 24%, white);
  background:
    radial-gradient(circle at top right, rgb(225 0 15 / 0.08), transparent 28%),
    linear-gradient(180deg, white 0%, color-mix(in oklab, white 92%, var(--paper-tint)) 100%);
  box-shadow: 0 18px 36px rgb(17 39 65 / 0.1);
}

.final-diagnostic-shell {
  margin-inline: auto;
  width: min(100%, 60rem);
  display: grid;
  justify-items: center;
  gap: 1.2rem;
  text-align: center;
}

.final-diagnostic-shell__title {
  font-size: clamp(2rem, 4vw, 3.35rem);
  color: var(--primary);
}

.final-diagnostic-shell__description {
  max-width: 42rem;
  font-size: 1.08rem;
  line-height: 1.75;
  color: var(--muted-foreground);
}

.final-diagnostic-shell__button {
  width: min(100%, 36rem);
  min-height: 4.1rem;
  border-radius: 1rem;
  background: var(--primary);
  border-color: var(--primary);
  color: #ffffff;
  box-shadow: 0 20px 44px rgb(0 0 107 / 0.18);
}

.final-diagnostic-shell__button:hover {
  background: color-mix(in oklab, var(--primary) 88%, black);
  border-color: color-mix(in oklab, var(--primary) 88%, black);
  color: #ffffff;
}

.final-diagnostic-shell__note {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: color-mix(in oklab, var(--tricolor-red) 86%, var(--primary));
}
</style>
