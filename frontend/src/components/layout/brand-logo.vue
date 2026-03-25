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
    class="inline-flex items-center gap-3 rounded-[1rem] text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
    aria-label="Retour à l'accueil CITYZ'France"
  >
    <span class="brand-symbol relative inline-flex h-10 w-10 items-center justify-center rounded-[0.95rem] sm:h-11 sm:w-11">
      <svg viewBox="0 0 56 56" class="h-7 w-7" aria-hidden="true">
        <path d="M20 38V18h16v20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" />
        <path d="M18 22h20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" />
        <path d="M24 14h8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="3" />
        <path d="M22 38h12" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="3" />
      </svg>
    </span>

    <div class="leading-tight">
      <p class="font-heading text-[0.98rem] font-semibold tracking-[0.01em] text-foreground sm:text-[1.08rem]">
        CITYZ'France
      </p>
      <p
        v-if="!compact"
        class="mt-1 text-[0.64rem] font-medium uppercase tracking-[0.16em] text-muted-foreground sm:text-[0.66rem]"
      >
        RNCP38575 · Bac+2 / Niveau 5
      </p>
    </div>
  </RouterLink>
</template>
