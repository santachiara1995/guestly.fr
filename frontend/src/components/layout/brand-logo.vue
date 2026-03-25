<script setup>
defineProps({
  compact: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="flex items-center gap-3.5">
    <span class="brand-symbol relative inline-flex h-11 w-11 items-center justify-center rounded-[1.05rem] sm:h-12 sm:w-12">
      <svg viewBox="0 0 56 56" class="h-7 w-7" aria-hidden="true">
        <path d="M20 38V18h16v20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" />
        <path d="M18 22h20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" />
        <path d="M24 14h8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="3" />
        <path d="M22 38h12" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="3" />
      </svg>
    </span>

    <div class="leading-tight">
      <p class="font-heading text-[1.1rem] font-semibold tracking-[0.02em] text-foreground sm:text-[1.18rem]">
        CITYZ'France
      </p>
      <p
        v-if="!compact"
        class="mt-1 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-muted-foreground"
      >
        RNCP38575 · Bac+2
      </p>
    </div>
  </div>
</template>
