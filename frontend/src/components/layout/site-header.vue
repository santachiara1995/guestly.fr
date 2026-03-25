<script setup>
import { RouterLink, useRoute } from 'vue-router'

import BrandLogo from '@/components/layout/brand-logo.vue'
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
  <header class="sticky top-0 z-50">
    <div class="mx-auto w-full max-w-[1200px] px-4 pt-3 sm:px-6 lg:px-8">
      <div class="header-shell flex items-center gap-4 px-4 py-3 sm:px-5">
        <brand-logo compact class="shrink-0" />

        <nav
          aria-label="Navigation principale"
          class="min-w-0 flex-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <ul class="inline-flex min-w-max items-center gap-2 sm:gap-3 lg:min-w-0 lg:justify-center">
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

        <div class="flex shrink-0 items-center gap-3">
          <RouterLink to="/contact" class="inline-flex shrink-0">
            <Button as="span" size="sm" class="min-w-[8.75rem]">
              Être rappelé
            </Button>
          </RouterLink>
        </div>
      </div>
    </div>
  </header>
</template>
