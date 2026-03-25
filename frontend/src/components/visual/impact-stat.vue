<script setup>
defineProps({
  value: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  note: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <article class="impact-stat">
    <p class="impact-stat-value">{{ value }}</p>
    <p class="impact-stat-label">{{ label }}</p>
    <p v-if="note" class="impact-stat-note">{{ note }}</p>
  </article>
</template>
