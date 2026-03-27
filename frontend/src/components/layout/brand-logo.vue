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
      'inline-flex items-center rounded-lg text-left transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/65 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
      compact ? 'h-11 gap-2 py-0' : 'min-h-12 gap-3 py-1'
    ]"
    aria-label="Retour à l'accueil CITYZ'France"
  >
    <span
      :class="[
        'brand-symbol relative inline-flex items-center justify-center',
        compact ? 'h-8 w-8 rounded-[0.9rem]' : 'h-10 w-10 rounded-[1rem] sm:h-11 sm:w-11'
      ]"
    >
      <svg :class="compact ? 'h-[1.05rem] w-[1.05rem]' : 'h-6 w-6'" viewBox="0 0 56 56" aria-hidden="true">
        <path d="M20 38V18h16v20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" />
        <path d="M18 22h20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" />
        <path d="M24 14h8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="3" />
        <path d="M22 38h12" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="3" />
      </svg>
    </span>

    <div class="leading-[1.02]">
      <p
        :class="[
          'font-heading font-extrabold tracking-[-0.03em] text-foreground',
          compact ? 'text-[0.88rem] sm:text-[0.92rem]' : 'text-[1.02rem] sm:text-[1.08rem]'
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
