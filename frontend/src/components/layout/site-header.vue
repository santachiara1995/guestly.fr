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
  <header class="sticky top-0 z-50 border-b border-primary/14 bg-white/92 backdrop-blur-xl">
    <div class="shell-rail h-1 w-full"></div>

    <div class="mx-auto w-full max-w-[1180px] px-4 py-4 sm:px-6 lg:px-8">
      <div class="flex flex-col gap-3">
        <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <RouterLink class="transition-transform hover:-translate-y-0.5" to="/">
            <brand-logo />
          </RouterLink>

          <div class="flex flex-wrap items-center gap-2 sm:justify-end">
            <span class="trust-chip">RNCP38575</span>
            <span class="trust-chip hidden sm:inline-flex">Bac+2</span>
            <RouterLink to="/contact">
              <Button size="sm">Être rappelé</Button>
            </RouterLink>
          </div>
        </div>

        <div class="flex flex-col gap-3 border-t border-primary/12 pt-3 lg:flex-row lg:items-center lg:justify-between">
          <div class="flex flex-wrap gap-2 lg:hidden">
            <span class="trust-chip">100 % distanciel</span>
            <span class="trust-chip">E-learning</span>
          </div>

          <nav
            aria-label="Navigation principale"
            class="-mx-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0"
          >
            <ul class="inline-flex min-w-max items-center gap-2 sm:min-w-0 sm:flex-wrap">
              <li v-for="item in primaryNavigation" :key="item.to">
                <RouterLink
                  :to="item.to"
                  :aria-current="isActive(item.to) ? 'page' : undefined"
                  :class="
                    cn(
                      'nav-link h-10',
                      isActive(item.to)
                        ? 'border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/15'
                        : ''
                    )
                  "
                >
                  {{ item.label }}
                </RouterLink>
              </li>
            </ul>
          </nav>

          <div class="hidden flex-wrap justify-end gap-2 lg:flex">
            <span class="trust-chip">100 % distanciel</span>
            <span class="trust-chip">E-learning</span>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
