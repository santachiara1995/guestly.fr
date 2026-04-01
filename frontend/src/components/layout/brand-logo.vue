<script setup>
import { RouterLink } from 'vue-router'

const logoSrc = '/CITYZ%20FRANCE%20(1).png'

defineProps({
  compact: {
    type: Boolean,
    default: false
  },
  mobileWordmarkHidden: {
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
        compact ? 'h-9 w-9 sm:h-10 sm:w-10' : 'h-12 w-12 sm:h-14 sm:w-14'
      ]"
    >
      <img
        :src="logoSrc"
        alt="CITYZ FRANCE"
        class="block h-full w-full scale-[1.18] object-contain object-center mix-blend-multiply"
      />
    </span>

    <div
      :class="[
        'leading-[0.96]',
        mobileWordmarkHidden ? 'hidden sm:block' : '',
        compact ? 'ml-2.5' : 'ml-3'
      ]"
    >
      <p
        :class="[
          'brand-wordmark font-heading font-extrabold tracking-[-0.04em]',
          compact ? 'text-[0.98rem] sm:text-[1.04rem]' : 'text-[1.1rem] sm:text-[1.2rem]'
        ]"
      >
        CITYZ
      </p>
      <p
        :class="[
          'brand-wordmark brand-wordmark--accent mt-0.5 font-semibold tracking-[-0.02em]',
          compact ? 'text-[0.84rem] sm:text-[0.88rem]' : 'text-[0.94rem] sm:text-[0.98rem]'
        ]"
      >
        France
      </p>
    </div>
  </RouterLink>
</template>

<style scoped>
.brand-wordmark {
  color: var(--primary);
}

.brand-wordmark--accent {
  color: var(--tricolor-red);
}
</style>
