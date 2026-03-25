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
  <article
    v-bind="forwardedAttrs"
    :class="
      cn(
        'rounded-[1rem] border border-border/80 bg-card p-5 shadow-none transition-all sm:p-6',
        attrs.class
      )
    "
  >
    <slot />
  </article>
</template>
