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
    :class="[
      'inline-flex items-center rounded-lg text-left leading-none transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/65 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
      compact ? 'h-7 gap-1 py-0' : 'min-h-11 gap-2.5 py-1'
    ]"
    aria-label="Retour à l'accueil CITYZ'France"
  >
    <span
      :class="[
        'brand-symbol relative inline-flex items-center justify-center',
        compact ? 'h-6 w-6 rounded-[0.68rem]' : 'h-9 w-9 rounded-[0.95rem] sm:h-10 sm:w-10'
      ]"
    >
      <svg :class="compact ? 'h-[0.82rem] w-[0.82rem]' : 'h-5.5 w-5.5'" viewBox="0 0 56 56" aria-hidden="true">
        <path d="M20 38V18h16v20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" />
        <path d="M18 22h20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" />
        <path d="M24 14h8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="3" />
        <path d="M22 38h12" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="3" />
      </svg>
    </span>

    <div class="leading-[1.01]">
      <p
        :class="[
          'font-heading font-extrabold tracking-[-0.03em] text-foreground',
          compact ? 'text-[0.74rem] sm:text-[0.78rem]' : 'text-[0.96rem] sm:text-[1rem]'
        ]"
      >
        CITYZ'France
      </p>
      <p
        v-if="!compact"
        class="mt-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground sm:text-[0.66rem]"
      >
        RPMS · RNCP38575
      </p>
    </div>
  </RouterLink>
</template>
