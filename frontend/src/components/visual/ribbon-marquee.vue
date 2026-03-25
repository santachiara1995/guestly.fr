<script setup>
import { computed } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

const repeatedItems = computed(() => props.items ?? [])
</script>

<template>
  <div class="ribbon-shell" aria-hidden="true">
    <div class="ribbon-track">
      <span v-for="(item, index) in repeatedItems" :key="`${item}-${index}`" class="ribbon-item">
        {{ item }}
      </span>
    </div>
  </div>
</template>
