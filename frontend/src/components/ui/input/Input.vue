<script setup>
import { computed, useAttrs } from 'vue'

import { cn } from '@/lib/utils'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])
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

function onInput(event) {
  emit('update:modelValue', event.target.value)
}
</script>

<template>
  <input
    v-bind="forwardedAttrs"
    :value="props.modelValue"
    :class="
      cn(
        'min-h-12 w-full rounded-[0.9rem] border border-input bg-white px-3.5 text-sm text-foreground shadow-[inset_0_1px_0_rgb(255_255_255_/_0.8)] transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/65 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
        attrs.class
      )
    "
    @input="onInput"
  />
</template>
