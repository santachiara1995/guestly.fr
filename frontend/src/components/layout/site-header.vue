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
    <div class="mx-auto w-full max-w-[1200px] px-4 pt-2 sm:px-6 lg:px-8">
      <div class="header-shell mx-auto grid max-w-[1080px] grid-cols-[auto,minmax(0,1fr),auto] items-center gap-4 px-4 py-2 sm:px-5 sm:py-2.5">
        <brand-logo :to="homeLink" compact class="shrink-0" />

        <nav
          aria-label="Navigation principale"
          class="header-nav min-w-0 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <ul class="mx-auto flex min-w-max items-center justify-center gap-1.5 sm:gap-2.5">
            <li v-for="item in navigationItems" :key="item.to" class="shrink-0">
              <RouterLink
                :to="item.href"
                :aria-current="isActive(item.to) ? 'page' : undefined"
                :class="['nav-link', isActive(item.to) ? 'nav-link--header-active' : null]"
              >
                {{ item.label }}
              </RouterLink>
            </li>
          </ul>
        </nav>

        <div class="flex shrink-0 items-center justify-end">
          <Button
            :as="RouterLink"
            :to="contactLink"
            size="sm"
            class="h-10 min-h-10 rounded-full px-4.5 text-[0.84rem]"
          >
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

:deep(.nav-link--header-active) {
  color: var(--primary);
  border-bottom-color: var(--primary);
}
</style>
