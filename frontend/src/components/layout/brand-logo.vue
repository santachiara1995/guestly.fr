<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  compact: {
    type: Boolean,
    default: false
  },
  to: {
    type: String,
    default: '/'
  }
})
</script>

<template>
  <RouterLink
    :to="to"
    class="inline-flex items-center gap-2.5 rounded-[0.9rem] text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
    aria-label="Retour à l'accueil CITYZ'France"
  >
    <span class="brand-symbol relative inline-flex h-9 w-9 items-center justify-center rounded-[0.82rem] sm:h-10 sm:w-10 sm:rounded-[0.9rem]">
      <svg viewBox="0 0 56 56" class="h-6 w-6" aria-hidden="true">
        <path d="M20 38V18h16v20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" />
        <path d="M18 22h20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" />
        <path d="M24 14h8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="3" />
        <path d="M22 38h12" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="3" />
      </svg>
    </span>

    <div class="leading-[1.02]">
      <p class="font-heading text-[0.92rem] font-semibold tracking-[0.01em] text-foreground sm:text-[1rem]">
        CITYZ'France
      </p>
      <p
        v-if="!compact"
        class="mt-0.5 text-[0.6rem] font-medium uppercase tracking-[0.15em] text-muted-foreground sm:text-[0.62rem]"
      >
        Pilotage · management · organisation
      </p>
    </div>
  </RouterLink>
</template>
