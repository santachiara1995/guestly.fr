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
    class="grid gap-4 border-l-4 border-primary/90 pl-4 sm:gap-5 sm:pl-5 lg:grid-cols-[minmax(0,11rem)_minmax(0,1fr)] lg:items-start"
    v-motion
    :initial="motionVariants.block.initial"
    :enter="motionVariants.block.enter"
  >
    <div class="space-y-2">
      <p v-if="eyebrow" class="kicker">
        {{ eyebrow }}
      </p>
      <div class="h-px w-14 bg-primary/60"></div>
    </div>

    <div class="space-y-3">
      <h2 class="editorial-title max-w-4xl text-[clamp(1.95rem,3.1vw,3rem)] text-foreground">
        {{ title }}
      </h2>
      <p v-if="description" class="max-w-3xl text-base leading-relaxed text-muted-foreground">
        {{ description }}
      </p>
    </div>
  </div>
</template>
