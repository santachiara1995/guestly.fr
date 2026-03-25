<script setup>
defineProps({
  compact: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="flex items-center gap-3">
    <span class="brand-symbol grid h-11 w-11 grid-cols-3 rounded-[0.95rem]">
      <span class="brand-symbol-bar bg-primary"></span>
      <span class="brand-symbol-bar border-x border-border bg-white"></span>
      <span class="brand-symbol-bar bg-secondary"></span>
    </span>

    <div class="leading-tight">
      <p class="font-heading text-[1.05rem] font-semibold tracking-[0.01em] text-foreground">
        CITYZ'France
      </p>
      <p
        v-if="!compact"
        class="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground"
      >
        RPMS · RNCP38575
      </p>
    </div>
  </div>
</template>
