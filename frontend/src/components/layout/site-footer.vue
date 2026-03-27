<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

import BrandLogo from '@/components/layout/brand-logo.vue'
import { useExperienceVariant } from '@/composables/use-experience-variant'
import { footerNavigation } from '@/data/navigation'

const { toWithExperience } = useExperienceVariant()

const homeLink = computed(() => toWithExperience('/'))
const legalItems = computed(() =>
  footerNavigation
    .filter(
      (item) =>
        item.to === '/mentions-legales' || item.to === '/politique-confidentialite'
    )
    .map((item) => ({
      ...item,
      to: toWithExperience(item.to)
    }))
)
</script>

<template>
  <footer class="mt-10 border-t border-border/70 bg-background/75 sm:mt-12">
    <div class="mx-auto px-4 py-6 sm:px-6 sm:py-7 lg:px-8">
      <div
        class="footer-shell mx-auto grid w-full max-w-[1120px] gap-4 px-4 py-4 sm:px-5 sm:py-5 lg:grid-cols-[1.12fr_0.88fr] lg:px-6"
      >
        <div class="space-y-2.5">
          <brand-logo :to="homeLink" />
          <p class="max-w-md text-sm leading-relaxed text-muted-foreground">
            Titre professionnel RPMS, niveau 5 / Bac+2, en 100 % distanciel avec accompagnement
            pédagogique.
          </p>
          <div class="grid gap-0.5 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
            <p>RNCP38575 · Qualiopi · E-learning</p>
            <p>SIRET 992 448 936 00011 · NDA 11923039192</p>
          </div>
        </div>

        <div class="grid gap-4 lg:justify-end">
          <div class="space-y-2.5">
            <p class="footer-heading">Coordonnées</p>
            <div class="space-y-1.5 text-sm leading-relaxed text-muted-foreground">
              <p>
                <a class="footer-link" href="tel:+33977215161">09 77 21 51 61</a>
              </p>
              <p>
                <a
                  class="footer-link"
                  href="https://www.cityzfrance.fr"
                  rel="noreferrer"
                  target="_blank"
                >
                  www.cityzfrance.fr
                </a>
              </p>
              <p class="max-w-xs">110 Esplanade du General de Gaulle, 92400 Courbevoie</p>
            </div>
          </div>

          <div class="space-y-2">
            <p class="footer-heading">Légal</p>
            <div class="flex flex-wrap gap-x-4 gap-y-2">
              <RouterLink
                v-for="item in legalItems"
                :key="item.to"
                class="footer-link"
                :to="item.to"
              >
                {{ item.label }}
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-link {
  display: inline-flex;
  min-height: 2rem;
  align-items: center;
  justify-content: flex-start;
  padding: 0;
  color: var(--ink);
  font-size: 0.92rem;
  font-weight: 500;
  line-height: 1.2;
  text-decoration: none;
  transition: color 0.15s ease, text-decoration-color 0.15s ease;
  border-bottom: 1px solid transparent;
}

.footer-link:hover {
  color: var(--primary);
  text-decoration: underline;
  text-decoration-color: color-mix(in oklab, var(--primary) 32%, white);
  text-underline-offset: 0.24em;
}

.footer-link:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 3px;
  border-radius: 0.375rem;
}
</style>
