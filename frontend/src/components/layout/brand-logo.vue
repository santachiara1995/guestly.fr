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
    <span class="brand-symbol relative inline-flex h-11 w-11 items-center justify-center rounded-[1.05rem]">
      <svg viewBox="0 0 56 56" class="h-7 w-7" aria-hidden="true">
        <path d="M20 38V18h16v20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" />
        <path d="M18 22h20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" />
        <path d="M24 14h8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="3" />
        <path d="M22 38h12" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="3" />
      </svg>
    </span>

    <div class="leading-tight">
      <p class="font-heading text-[1.05rem] font-semibold tracking-[0.02em] text-foreground">
        CITYZ'France
      </p>
      <p v-if="!compact" class="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        RPMS · Particuliers
      </p>
    </div>
  </div>
</template>
