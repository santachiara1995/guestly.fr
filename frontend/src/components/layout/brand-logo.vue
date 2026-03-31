<script setup>
import { RouterLink } from 'vue-router'

const logoSrc = '/CITYZ%20FRANCE.png'

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
        'relative block overflow-hidden rounded-lg',
        compact ? 'h-9 w-[5.8rem] sm:h-10 sm:w-[6.6rem]' : 'h-12 w-[7.6rem] sm:h-14 sm:w-[8.8rem]'
      ]"
    >
      <img
        :src="logoSrc"
        alt="CITYZ FRANCE"
        class="block h-full w-full object-cover object-center"
      />
    </span>
  </RouterLink>
</template>
