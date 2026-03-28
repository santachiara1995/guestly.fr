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
    <div class="w-full px-4 pt-6 sm:px-6 sm:pt-7 lg:px-8 lg:pt-6">
      <div
        class="header-shell shell-track grid grid-cols-[auto_minmax(0,_1fr)_auto] items-center gap-3 px-3 py-[0.58rem] sm:px-3.5 sm:py-[0.64rem]"
      >
        <brand-logo :to="homeLink" compact class="justify-self-start shrink-0" />

        <nav
          aria-label="Navigation principale"
          class="header-nav min-w-0 justify-self-center overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <ul class="mx-auto flex min-w-max items-center justify-center gap-2.5 sm:gap-3">
            <li v-for="item in navigationItems" :key="item.to" class="shrink-0">
              <RouterLink
                :to="item.href"
                :aria-current="isActive(item.to) ? 'page' : undefined"
                :class="['nav-link nav-link--header-item', isActive(item.to) ? 'nav-link--header-active' : null]"
              >
                {{ item.label }}
              </RouterLink>
            </li>
          </ul>
        </nav>

        <div class="flex justify-self-end shrink-0 items-center justify-end">
          <Button
            :as="RouterLink"
            :to="contactLink"
            size="sm"
            class="h-11 min-h-11 rounded-full px-4 text-[0.78rem] font-semibold tracking-[0.01em]"
          >
            S'inscrire
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

:deep(.nav-link--header-item) {
  min-height: 2.75rem;
}
</style>
