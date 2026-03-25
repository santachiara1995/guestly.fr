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
        'rounded-[1.35rem] border border-border/75 bg-card/88 p-6 shadow-sm backdrop-blur-sm transition-all',
        attrs.class
      )
    "
  >
    <slot />
  </article>
</template>
