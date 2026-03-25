<script setup>
import { computed, useAttrs } from 'vue'

import { cn } from '@/lib/utils'
import { buttonVariants } from './index'

const props = defineProps({
  as: {
    type: String,
    default: 'button'
  },
  variant: {
    type: String,
    default: 'default'
  },
  size: {
    type: String,
    default: 'default'
  }
})

const attrs = useAttrs()

const forwardedAttrs = computed(() => {
  const nextAttrs = {}
  for (const [key, value] of Object.entries(attrs)) {
    if (key !== 'class') {
      nextAttrs[key] = value
    }
  }

  if (props.as === 'button' && !('type' in nextAttrs)) {
    nextAttrs.type = 'button'
  }

  return nextAttrs
})

const className = computed(() =>
  cn(buttonVariants({ variant: props.variant, size: props.size }), attrs.class)
)
</script>

<template>
  <component :is="as" v-bind="forwardedAttrs" :class="className">
    <slot />
  </component>
</template>
