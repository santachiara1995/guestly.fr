<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import BrandLogo from '@/components/layout/brand-logo.vue'
import { Button } from '@/components/ui/button'
import { primaryNavigation } from '@/data/navigation'
import { cn } from '@/lib/utils'

const route = useRoute()

const isActive = computed(() => (target) => {
  if (target === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(target)
})
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-border/70 bg-white/90 backdrop-blur-xl">
    <div class="mx-auto w-full max-w-[1240px] px-4 py-4 sm:px-6 lg:px-8">
      <div class="flex flex-col gap-4">
        <div class="flex items-start justify-between gap-4">
          <RouterLink class="transition-transform hover:-translate-y-0.5" to="/">
            <brand-logo />
          </RouterLink>

          <div class="hidden items-end gap-3 md:flex md:flex-col">
            <div class="flex flex-wrap justify-end gap-2">
              <span class="trust-chip">RPMS</span>
              <span class="trust-chip">RNCP38575</span>
              <span class="trust-chip">Niveau 5 / Bac+2</span>
            </div>
            <RouterLink to="/contact">
              <Button size="sm">Être rappelé</Button>
            </RouterLink>
          </div>
        </div>

        <div class="flex flex-col gap-3 border-t border-border/60 pt-3 md:flex-row md:items-center md:justify-between">
          <div class="flex flex-wrap gap-2 md:hidden">
            <span class="trust-chip">RPMS</span>
            <span class="trust-chip">RNCP38575</span>
            <span class="trust-chip">Niveau 5 / Bac+2</span>
          </div>

          <nav aria-label="Navigation principale" class="flex flex-wrap items-center gap-1 md:gap-2">
            <RouterLink
              v-for="item in primaryNavigation"
              :key="item.to"
              :to="item.to"
              :aria-current="isActive(item.to) ? 'page' : undefined"
              class="nav-link"
            >
              {{ item.label }}
            </RouterLink>
          </nav>

          <RouterLink class="md:hidden" to="/contact">
            <Button size="sm">Être rappelé</Button>
          </RouterLink>
        </div>
      </div>
    </div>
  </header>
</template>
