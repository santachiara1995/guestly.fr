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
  <header class="sticky top-0 z-50 border-b border-border/75 bg-background/84 backdrop-blur-xl">
    <div class="mx-auto flex w-full max-w-[1180px] flex-col gap-3 px-4 py-4 sm:px-6 lg:px-8">
      <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <RouterLink class="transition-transform hover:-translate-y-0.5" to="/">
          <brand-logo />
        </RouterLink>

        <div class="flex flex-wrap items-center gap-2">
          <span class="rounded-full border border-border/70 bg-card/88 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            RNCP38575 · Niveau 5
          </span>
          <RouterLink to="/contact">
            <Button size="sm">Être rappelé</Button>
          </RouterLink>
        </div>
      </div>

      <nav aria-label="Navigation principale" class="flex justify-center">
        <ul class="inline-flex max-w-full flex-wrap items-center justify-center gap-2">
          <li v-for="item in primaryNavigation" :key="item.to">
            <RouterLink
              :to="item.to"
              :aria-current="isActive(item.to) ? 'page' : undefined"
              :class="
                cn(
                  'inline-flex h-10 items-center justify-center rounded-full border px-4 text-center text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70',
                  isActive(item.to)
                    ? 'border-primary/55 bg-primary text-primary-foreground shadow-md shadow-primary/20'
                    : 'border-border/70 bg-card/85 text-foreground shadow-sm hover:-translate-y-0.5 hover:border-secondary/30 hover:bg-background/90'
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
