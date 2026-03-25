<script setup>
import { computed, useAttrs } from 'vue'

import { cn } from '@/lib/utils'
import { badgeVariants } from './index'

const props = defineProps({
  variant: {
    type: String,
    default: 'default'
  }
})

const attrs = useAttrs()

const className = computed(() =>
  cn(badgeVariants({ variant: props.variant }), attrs.class)
)
</script>

<template>
  <span :class="className">
    <slot />
  </span>
</template>
