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
    <div class="mx-auto w-full max-w-[1180px] px-4 py-2.5 sm:px-6 sm:py-3 lg:px-8">
      <div class="page-cut rounded-[1.08rem] px-3 py-2.5 sm:px-4 sm:py-3">
        <div class="flex flex-col gap-2.5 lg:grid lg:grid-cols-[auto,minmax(0,1fr),auto] lg:items-center lg:gap-3">
          <brand-logo class="shrink-0" />

          <div class="order-2 flex flex-wrap items-center gap-1.5 lg:order-3 lg:justify-end">
            <span class="trust-chip hidden px-2.5 py-1 text-[0.61rem] tracking-[0.11em] md:inline-flex">
              100 % distanciel
            </span>
            <span class="trust-chip hidden px-2.5 py-1 text-[0.61rem] tracking-[0.11em] lg:inline-flex">
              E-learning
            </span>
            <RouterLink to="/contact" class="inline-flex shrink-0">
              <Button
                as="span"
                size="sm"
                class="h-8 rounded-lg px-3 text-[0.8rem] !shadow-none hover:!translate-y-0"
              >
                Être rappelé
              </Button>
            </RouterLink>
          </div>

          <nav
            aria-label="Navigation principale"
            class="order-3 -mx-1 overflow-x-auto pb-0 lg:order-2 lg:mx-0 lg:overflow-visible"
          >
            <ul class="inline-flex min-w-max items-center gap-1 lg:min-w-0 lg:flex-wrap lg:justify-center">
              <li v-for="item in primaryNavigation" :key="item.to" class="shrink-0">
                <RouterLink
                  :to="item.to"
                  :aria-current="isActive(item.to) ? 'page' : undefined"
                  :class="
                    cn(
                      'nav-link h-8 px-2.5 py-1 text-[0.79rem] sm:h-[2.15rem] sm:px-3 sm:text-[0.81rem]',
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
