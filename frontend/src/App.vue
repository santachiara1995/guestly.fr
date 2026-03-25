<template>
  <div class="relative min-h-screen">
    <site-header />

    <main class="mx-auto w-full max-w-[1140px] px-4 pb-16 pt-6 sm:px-6 sm:pt-7 lg:px-8 lg:pt-8">
      <router-view v-slot="{ Component }">
        <component
          :is="Component"
          :key="pageKey"
          v-motion
          :initial="motionVariants.page.initial"
          :enter="motionVariants.page.enter"
        />
      </router-view>
    </main>

    <site-footer />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import SiteFooter from '@/components/layout/site-footer.vue'
import SiteHeader from '@/components/layout/site-header.vue'
import { motionVariants } from '@/lib/motion'

const route = useRoute()
const pageKey = computed(() => route.fullPath)
</script>
