<template>
  <div class="relative min-h-screen">
    <div
      class="pointer-events-none fixed inset-x-0 top-0 z-50 h-1 bg-gradient-to-r from-primary via-white to-destructive"
      aria-hidden="true"
    ></div>

    <site-header />

    <main class="mx-auto w-full max-w-[1240px] flex-1 px-4 pb-24 pt-8 sm:px-6 lg:px-8">
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
