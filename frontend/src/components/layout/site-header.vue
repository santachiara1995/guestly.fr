<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import BrandLogo from '@/components/layout/brand-logo.vue'
import { useExperienceVariant } from '@/composables/use-experience-variant'
import { Button } from '@/components/ui/button'
import { primaryNavigation } from '@/data/navigation'

const route = useRoute()
const { toWithExperience } = useExperienceVariant()

const homeLink = computed(() => toWithExperience('/'))
const contactLink = computed(() => toWithExperience('/contact'))
const navigationItems = computed(() =>
  primaryNavigation.map((item) => ({
    ...item,
    href: toWithExperience(item.to)
  }))
)

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
      <div class="header-shell grid grid-cols-[auto,minmax(0,1fr),auto] items-center gap-3 px-4 py-3 sm:gap-4 sm:px-5">
        <div class="flex items-center justify-start">
          <brand-logo :to="homeLink" compact class="shrink-0" />
        </div>

        <nav
          aria-label="Navigation principale"
          class="header-nav min-w-0 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <ul class="mx-auto flex min-w-max items-center justify-center gap-2 sm:gap-3">
            <li v-for="item in navigationItems" :key="item.to" class="shrink-0">
              <RouterLink
                :to="item.href"
                :aria-current="isActive(item.to) ? 'page' : undefined"
                class="nav-link"
              >
                {{ item.label }}
              </RouterLink>
            </li>
          </ul>
        </nav>

        <div class="flex shrink-0 items-center justify-end gap-3">
          <Button :as="RouterLink" :to="contactLink" size="sm" class="min-w-[8.75rem] shrink-0">
            Être rappelé
          </Button>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header-nav {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
