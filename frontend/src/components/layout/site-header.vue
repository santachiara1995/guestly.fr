<script setup>
import { RouterLink, useRoute } from 'vue-router'

import BrandLogo from '@/components/layout/brand-logo.vue'
import { Button } from '@/components/ui/button'
import { primaryNavigation } from '@/data/navigation'
import { cn } from '@/lib/utils'

const route = useRoute()

const isActive = (target) => {
  if (target === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(target)
}
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-primary/10 bg-white/88 backdrop-blur-xl">
    <div class="mx-auto w-full max-w-[1180px] px-4 py-4 sm:px-6 lg:px-8">
      <div class="page-cut rounded-[1.35rem] px-4 py-4 sm:px-5 sm:py-4">
        <div class="flex flex-col gap-4 lg:grid lg:grid-cols-[auto,minmax(0,1fr),auto] lg:items-center lg:gap-4">
          <brand-logo class="shrink-0" />

          <div class="order-2 flex flex-wrap items-center gap-2 lg:order-3 lg:justify-end">
            <span class="trust-chip">100 % distanciel</span>
            <span class="trust-chip hidden sm:inline-flex">E-learning</span>
            <RouterLink to="/contact" class="inline-flex shrink-0">
              <Button as="span" size="sm" class="!shadow-none hover:!translate-y-0">
                Être rappelé
              </Button>
            </RouterLink>
          </div>

          <nav
            aria-label="Navigation principale"
            class="order-3 -mx-1 overflow-x-auto pb-1 lg:order-2 lg:mx-0 lg:overflow-visible lg:pb-0"
          >
            <ul class="inline-flex min-w-max items-center gap-2 lg:min-w-0 lg:flex-wrap lg:justify-center">
              <li v-for="item in primaryNavigation" :key="item.to" class="shrink-0">
                <RouterLink
                  :to="item.to"
                  :aria-current="isActive(item.to) ? 'page' : undefined"
                  :class="
                    cn(
                      'nav-link',
                      isActive(item.to)
                        ? 'border-primary bg-primary text-primary-foreground shadow-[0_8px_18px_rgb(20_63_143_/_0.14)]'
                        : ''
                    )
                  "
                >
                  {{ item.label }}
                </RouterLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>
