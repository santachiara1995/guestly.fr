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
const signupLink = computed(() => toWithExperience('/inscription'))
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
        class="header-shell shell-track grid grid-cols-[2.35rem_minmax(0,_1fr)_4.9rem] items-center gap-2 px-2.5 py-[0.5rem] sm:grid-cols-[auto_minmax(0,_1fr)_auto] sm:gap-3 sm:px-3.5 sm:py-[0.64rem]"
      >
        <brand-logo
          :to="homeLink"
          compact
          mobile-wordmark-hidden
          class="header-brand justify-self-start shrink-0"
        />

        <nav
          aria-label="Navigation principale"
          class="header-nav min-w-0 justify-self-stretch overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <ul class="header-nav__list mx-auto flex min-w-max items-center gap-2 sm:gap-3">
            <li v-for="item in navigationItems" :key="item.to" class="header-nav__item shrink-0">
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
            :to="signupLink"
            size="sm"
            class="h-10 min-h-10 w-[4.9rem] justify-center rounded-full px-2 text-[0.68rem] font-semibold tracking-[0.01em] sm:h-11 sm:min-h-11 sm:w-auto sm:px-4 sm:text-[0.78rem]"
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
  justify-content: stretch;
}

.header-nav__list {
  justify-content: flex-start;
}

.header-nav__item {
  scroll-snap-align: center;
}

:deep(.nav-link--header-active) {
  color: var(--primary);
  border-bottom-color: var(--primary);
}

:deep(.nav-link--header-item) {
  min-height: 2.45rem;
  font-size: 0.8rem;
  padding-inline: 0.45rem;
  white-space: nowrap;
}

@media (min-width: 640px) {
  .header-nav {
    justify-content: center;
  }

  .header-nav__list {
    justify-content: center;
  }

  :deep(.nav-link--header-item) {
    min-height: 2.75rem;
    font-size: 0.92rem;
    padding-inline: 0.58rem;
  }
}

@media (max-width: 639px) {
  .header-brand {
    min-width: 2.4rem;
  }

  .header-nav {
    scroll-snap-type: x proximity;
  }
}
</style>
