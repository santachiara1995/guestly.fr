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
    class="grid gap-3 sm:gap-4 lg:grid-cols-[minmax(0,11rem)_minmax(0,1fr)] lg:items-start lg:gap-8"
    v-motion
    :initial="motionVariants.block.initial"
    :enter="motionVariants.block.enter"
  >
    <div class="space-y-2">
      <p v-if="eyebrow" class="kicker">
        {{ eyebrow }}
      </p>
      <div class="shell-rail w-14"></div>
    </div>

    <div class="space-y-2">
      <h2 class="editorial-title max-w-3xl text-[clamp(1.4rem,2.45vw,2.1rem)] text-foreground">
        {{ title }}
      </h2>
      <p v-if="description" class="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-[0.96rem]">
        {{ description }}
      </p>
    </div>
  </div>
</template>
