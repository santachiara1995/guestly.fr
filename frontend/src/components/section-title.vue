<script setup>
import { motionVariants } from '@/lib/motion'

defineProps({
  eyebrow: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div
    class="grid gap-4 border-t border-border/70 pt-5 sm:gap-5 sm:pt-6 lg:grid-cols-[minmax(0,11rem)_minmax(0,1fr)] lg:items-start"
    v-motion
    :initial="motionVariants.block.initial"
    :enter="motionVariants.block.enter"
  >
    <div class="space-y-3">
      <p v-if="eyebrow" class="kicker">
        {{ eyebrow }}
      </p>
      <div class="h-px w-20 bg-gradient-to-r from-primary via-primary/60 to-transparent"></div>
    </div>

    <div class="space-y-3">
      <h2 class="editorial-title max-w-4xl text-3xl text-foreground sm:text-4xl lg:text-[2.8rem]">
        {{ title }}
      </h2>
      <p v-if="description" class="max-w-3xl text-base leading-relaxed text-muted-foreground">
        {{ description }}
      </p>
    </div>
  </div>
</template>
