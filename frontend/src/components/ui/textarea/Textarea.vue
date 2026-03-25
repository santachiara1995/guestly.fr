<script setup>
import { computed, useAttrs } from 'vue'

import { cn } from '@/lib/utils'

const attrs = useAttrs()

const forwardedAttrs = computed(() => {
  const nextAttrs = {}
  for (const [key, value] of Object.entries(attrs)) {
    if (key !== 'class') {
      nextAttrs[key] = value
    }
  }
  return nextAttrs
})
</script>

<template>
  <textarea
    v-bind="forwardedAttrs"
    :class="
      cn(
        'min-h-28 w-full rounded-2xl border border-input bg-white px-3.5 py-2.5 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 disabled:cursor-not-allowed disabled:opacity-50',
        attrs.class
      )
    "
  />
</template>
