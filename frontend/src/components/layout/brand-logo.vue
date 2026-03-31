<script setup>
import { RouterLink } from 'vue-router'

const logoSrc = '/CITYZ%20FRANCE%20(1).png'

defineProps({
  compact: {
    type: Boolean,
    default: false
  },
  to: {
    type: String,
    default: '/'
  }
})
</script>

<template>
  <RouterLink
    :to="to"
    :class="[
      'inline-flex items-center rounded-lg text-left leading-none transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/65 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
      compact ? 'py-0' : 'py-1'
    ]"
    aria-label="Retour à l'accueil CITYZ'France"
  >
    <span
      :class="[
        'relative block overflow-hidden rounded-lg bg-white p-1.5 shadow-sm ring-1 ring-black/5',
        compact ? 'h-9 w-9 sm:h-10 sm:w-10' : 'h-12 w-12 sm:h-14 sm:w-14'
      ]"
    >
      <img
        :src="logoSrc"
        alt="CITYZ FRANCE"
        class="block h-full w-full object-contain object-center"
      />
    </span>
  </RouterLink>
</template>
