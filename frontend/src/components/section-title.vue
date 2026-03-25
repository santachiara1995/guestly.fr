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
    class="grid gap-2 border-t border-border/60 pt-3 sm:gap-3 sm:pt-4 lg:grid-cols-[minmax(0,10rem)_minmax(0,1fr)] lg:items-start lg:gap-4"
    v-motion
    :initial="motionVariants.block.initial"
    :enter="motionVariants.block.enter"
  >
    <div class="space-y-2">
      <p v-if="eyebrow" class="kicker">
        {{ eyebrow }}
      </p>
      <div class="h-px w-12 bg-border/80"></div>
    </div>

    <div class="space-y-2">
      <h2 class="editorial-title max-w-3xl text-[clamp(1.45rem,2.6vw,2.15rem)] text-foreground">
        {{ title }}
      </h2>
      <p v-if="description" class="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-[0.96rem]">
        {{ description }}
      </p>
    </div>
  </div>
</template>
