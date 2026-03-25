<script setup>
defineProps({
  items: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <ul class="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.72rem] font-medium text-muted-foreground">
    <li
      v-for="(item, index) in items"
      :key="`${item}-${index}`"
      class="inline-flex items-center gap-2"
    >
      <span>{{ item }}</span>
      <span v-if="index < items.length - 1" aria-hidden="true" class="text-border">•</span>
    </li>
  </ul>
</template>
