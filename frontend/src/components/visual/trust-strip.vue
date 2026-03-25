<script setup>
defineProps({
  items: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <span
      v-for="item in items"
      :key="item"
      class="trust-chip px-2.5 py-1 text-[0.64rem] tracking-[0.11em] sm:text-[0.66rem]"
    >
      {{ item }}
    </span>
  </div>
</template>
