<script setup>
import { computed, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import BrandLogo from '@/components/layout/brand-logo.vue'
import { useExperienceVariant } from '@/composables/use-experience-variant'
import { Button } from '@/components/ui/button'
import { primaryNavigation } from '@/data/navigation'

const route = useRoute()
const { toWithExperience } = useExperienceVariant()

const homeLink = computed(() => toWithExperience('/'))
const signupLink = computed(() => toWithExperience('/inscription'))
const desktopNavigationItems = computed(() =>
  primaryNavigation.map((item) => ({
    ...item,
    href: toWithExperience(item.to)
  })).filter((item) => ['/programme', '/financement', '/faq'].includes(item.to))
)
const mobileMenuRef = ref(null)
const mobileMenuItems = computed(() =>
  primaryNavigation
    .filter((item) => ['/programme', '/financement', '/faq'].includes(item.to))
    .map((item) => ({
      ...item,
      href: toWithExperience(item.to)
    }))
)
const mobileMenuActive = computed(() =>
  mobileMenuItems.value.some((item) => isActive(item.to))
)

const isActive = (target) => {
  if (target === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(target)
}

watch(
  () => route.fullPath,
  () => {
    if (mobileMenuRef.value) {
      mobileMenuRef.value.open = false
    }
  }
)
</script>

<template>
  <header class="sticky top-0 z-50">
    <div class="w-full px-4 pt-6 sm:px-6 sm:pt-7 lg:px-8 lg:pt-6">
      <div
        class="header-shell shell-track flex items-center gap-2 px-2.5 py-[0.5rem] sm:grid sm:grid-cols-[auto_minmax(0,_1fr)_auto] sm:gap-3 sm:px-3.5 sm:py-[0.64rem]"
      >
        <brand-logo
          :to="homeLink"
          compact
          mobile-wordmark-hidden
          class="header-brand justify-self-start shrink-0"
        />

        <div class="header-mobile-nav min-w-0 flex-1 items-center justify-center gap-1.5 sm:hidden">
          <RouterLink
            :to="homeLink"
            :aria-current="isActive('/') ? 'page' : undefined"
            :class="[
              'nav-link nav-link--header-item nav-link--header-home',
              isActive('/') ? 'nav-link--header-active' : null
            ]"
          >
            Accueil
          </RouterLink>

          <details ref="mobileMenuRef" class="header-menu-details">
            <summary
              :class="[
                'header-menu-summary',
                mobileMenuActive ? 'header-menu-summary--active' : null
              ]"
              aria-label="Ouvrir le menu mobile"
            >
              <span class="sr-only">Ouvrir le menu</span>
              <span class="header-menu-icon" aria-hidden="true">
                <span class="header-menu-icon-bar" />
                <span class="header-menu-icon-bar" />
                <span class="header-menu-icon-bar" />
              </span>
            </summary>

            <div class="header-menu-panel">
              <RouterLink
                v-for="item in mobileMenuItems"
                :key="item.to"
                :to="item.href"
                :aria-current="isActive(item.to) ? 'page' : undefined"
                class="header-menu-link"
              >
                {{ item.label }}
              </RouterLink>
            </div>
          </details>
        </div>

        <nav
          aria-label="Navigation principale"
          class="header-nav hidden min-w-0 justify-self-stretch sm:flex"
        >
          <ul class="header-nav__list mx-auto flex min-w-max items-center gap-5 lg:gap-7">
            <li
              v-for="item in desktopNavigationItems"
              :key="item.to"
              class="header-nav__item shrink-0"
            >
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
  display: none;
  align-items: center;
  justify-content: stretch;
}

.header-nav__list {
  justify-content: flex-start;
}

.header-nav__item {
  scroll-snap-align: center;
}

.header-mobile-nav {
  display: flex;
}

.header-menu-details {
  position: relative;
  flex-shrink: 0;
}

.header-menu-summary {
  display: inline-flex;
  height: 2.45rem;
  width: 2.45rem;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  border: 1px solid color-mix(in oklab, var(--border) 78%, white);
  background: color-mix(in oklab, white 94%, var(--paper-soft));
  color: var(--muted-ink);
  cursor: pointer;
  list-style: none;
  transition:
    color 150ms ease,
    border-color 150ms ease,
    box-shadow 150ms ease;
}

.header-menu-summary::-webkit-details-marker {
  display: none;
}

.header-menu-summary--active,
.header-menu-details[open] .header-menu-summary {
  color: var(--primary);
  border-color: color-mix(in oklab, var(--primary) 42%, white);
  box-shadow: 0 8px 22px rgb(15 31 58 / 0.12);
}

.header-menu-icon {
  display: grid;
  gap: 0.17rem;
  width: 0.95rem;
}

.header-menu-icon-bar {
  display: block;
  height: 2px;
  width: 100%;
  border-radius: 999px;
  background: currentColor;
}

.header-menu-panel {
  position: absolute;
  left: 50%;
  top: calc(100% + 0.5rem);
  z-index: 30;
  display: grid;
  min-width: 11.5rem;
  gap: 0.2rem;
  transform: translateX(-50%);
  border-radius: 1rem;
  border: 1px solid color-mix(in oklab, var(--border) 78%, white);
  background: rgb(255 255 255 / 0.98);
  padding: 0.55rem;
  box-shadow: 0 18px 40px rgb(15 31 58 / 0.14);
}

.header-menu-link {
  display: inline-flex;
  min-height: 2.45rem;
  align-items: center;
  border-radius: 0.8rem;
  padding-inline: 0.75rem;
  font-size: 0.84rem;
  font-weight: 600;
  color: var(--ink);
  transition:
    background-color 150ms ease,
    color 150ms ease;
}

.header-menu-link:hover,
.header-menu-link[aria-current="page"] {
  background: color-mix(in oklab, var(--primary) 10%, white);
  color: var(--primary);
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
  .header-mobile-nav {
    display: none;
  }

  .header-nav {
    display: flex;
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
  .header-shell {
    overflow: visible;
  }

  .header-brand {
    min-width: 2.4rem;
  }

  :deep(.nav-link--header-home) {
    min-height: 2.35rem;
    padding-inline: 0.42rem;
    font-size: 0.77rem;
  }
}
</style>
