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
    class="grid gap-4 border-t border-border/75 pt-5 sm:gap-5 sm:pt-6 lg:grid-cols-[minmax(0,10.5rem)_minmax(0,1fr)] lg:items-start"
    v-motion
    :initial="motionVariants.block.initial"
    :enter="motionVariants.block.enter"
  >
    <div class="space-y-3">
      <p v-if="eyebrow" class="kicker">
        {{ eyebrow }}
      </p>
      <div class="h-px w-24 bg-gradient-to-r from-primary via-secondary/65 to-transparent"></div>
    </div>

    <div class="space-y-3">
      <h2 class="editorial-title max-w-4xl text-[clamp(2rem,4.8vw,3.25rem)] text-foreground">
        {{ title }}
      </h2>
      <p v-if="description" class="max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-[1.02rem]">
        {{ description }}
      </p>
    </div>
  </div>
</template>
