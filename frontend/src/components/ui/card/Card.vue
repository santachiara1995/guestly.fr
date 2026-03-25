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
        'monument-panel surface-cut rounded-[1.35rem] p-6 transition-all',
        attrs.class
      )
    "
  >
    <slot />
  </article>
</template>
