<script setup>
import { RouterLink, useRoute } from 'vue-router'

import BrandLogo from '@/components/layout/brand-logo.vue'
import TrustStrip from '@/components/visual/trust-strip.vue'
import { Button } from '@/components/ui/button'
import { primaryNavigation } from '@/data/navigation'

const route = useRoute()

const isActive = (target) => {
  if (target === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(target)
}
</script>

<template>
  <header class="sticky top-0 z-50 bg-background/60 backdrop-blur-xl">
    <div class="mx-auto w-full max-w-[1180px] px-4 py-2.5 sm:px-6 sm:py-3 lg:px-8">
      <div class="header-shell px-4 py-3 sm:px-5">
        <div class="flex flex-col gap-3 lg:grid lg:grid-cols-[auto,minmax(0,1fr),auto] lg:items-center lg:gap-4">
          <brand-logo compact class="shrink-0" />

          <nav
            aria-label="Navigation principale"
            class="order-2 -mx-1 overflow-x-auto pb-0 lg:order-2 lg:mx-0 lg:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <ul class="inline-flex min-w-max items-center gap-1.5 lg:min-w-0 lg:flex-wrap lg:justify-center">
              <li v-for="item in primaryNavigation" :key="item.to" class="shrink-0">
                <RouterLink
                  :to="item.to"
                  :aria-current="isActive(item.to) ? 'page' : undefined"
                  class="nav-link"
                >
                  {{ item.label }}
                </RouterLink>
              </li>
            </ul>
          </nav>

          <div class="order-3 flex items-center justify-start gap-3 lg:order-3 lg:justify-end">
            <TrustStrip
              class="hidden lg:flex"
              :items="['100 % distanciel', 'E-learning']"
            />
            <RouterLink to="/contact" class="inline-flex shrink-0">
              <Button as="span" size="sm" class="min-w-[8.75rem]">
                Être rappelé
              </Button>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
