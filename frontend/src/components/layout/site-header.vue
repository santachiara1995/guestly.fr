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
    <div class="mx-auto w-full max-w-[70rem] px-4 pt-1.5 sm:px-6 lg:px-8">
      <div
        class="header-shell mx-auto grid w-full grid-cols-[auto_minmax(0,_1fr)_auto] items-center gap-2.5 px-2.5 py-1.5 sm:px-3"
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
                :class="['nav-link', isActive(item.to) ? 'nav-link--header-active' : null]"
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
            class="h-9 min-h-9 rounded-full px-3.25 text-[0.74rem] font-semibold tracking-[0.01em]"
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
