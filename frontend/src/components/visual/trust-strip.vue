<script setup>
defineProps({
  items: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <ul class="status-rail">
    <li
      v-for="(item, index) in items"
      :key="`${item}-${index}`"
      class="status-rail__item"
    >
      <span aria-hidden="true" class="status-rail__dot"></span>
      <span>{{ item }}</span>
    </li>
  </ul>
</template>
