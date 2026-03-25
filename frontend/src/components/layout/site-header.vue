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
  <header class="sticky top-0 z-50 border-b border-border/80 bg-white/96 backdrop-blur-lg">
    <div class="shell-rail h-1 w-full"></div>
    <div class="mx-auto flex w-full max-w-[1180px] flex-col gap-3 px-4 py-4 sm:px-6 lg:px-8">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <RouterLink class="transition-transform hover:-translate-y-0.5" to="/">
          <brand-logo />
        </RouterLink>

        <div class="flex flex-wrap items-center gap-2 sm:justify-end">
          <span class="rounded-full border border-border bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            RNCP38575 · Niveau 5
          </span>
          <RouterLink to="/contact">
            <Button size="sm">Être rappelé</Button>
          </RouterLink>
        </div>
      </div>

      <nav aria-label="Navigation principale" class="-mx-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
        <ul class="inline-flex min-w-max items-center gap-2 sm:min-w-0 sm:flex-wrap sm:justify-center">
          <li v-for="item in primaryNavigation" :key="item.to">
            <RouterLink
              :to="item.to"
              :aria-current="isActive(item.to) ? 'page' : undefined"
              :class="
                cn(
                  'inline-flex h-10 items-center justify-center rounded-full border px-4 text-center text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70',
                  isActive(item.to)
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-white text-foreground hover:-translate-y-0.5 hover:border-primary/30 hover:bg-white'
                )
              "
            >
              {{ item.label }}
            </RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
