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
    class="grid gap-3 border-t border-border/65 pt-4 sm:gap-4 sm:pt-5 lg:grid-cols-[minmax(0,10rem)_minmax(0,1fr)] lg:items-start"
    v-motion
    :initial="motionVariants.block.initial"
    :enter="motionVariants.block.enter"
  >
    <div class="space-y-2">
      <p v-if="eyebrow" class="kicker">
        {{ eyebrow }}
      </p>
      <div class="h-px w-16 bg-border/80"></div>
    </div>

    <div class="space-y-2.5">
      <h2 class="editorial-title max-w-4xl text-[clamp(1.65rem,3.1vw,2.5rem)] leading-[1.04] text-foreground">
        {{ title }}
      </h2>
      <p v-if="description" class="max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-[0.98rem]">
        {{ description }}
      </p>
    </div>
  </div>
</template>
