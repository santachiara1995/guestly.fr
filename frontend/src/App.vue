<template>
  <div class="relative min-h-screen">
    <div class="shell-rail fixed inset-x-0 top-0 z-40 h-[0.25rem]"></div>
    <div class="pointer-events-none fixed inset-0 -z-10 bg-brand-haze"></div>

    <site-header />

    <main class="mx-auto w-full max-w-[1180px] px-4 pb-20 pt-6 sm:px-6 lg:px-8 lg:pt-8">
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
