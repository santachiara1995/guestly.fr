<script setup>
import { RouterLink } from 'vue-router'

import BrandLogo from '@/components/layout/brand-logo.vue'
import { footerNavigation } from '@/data/navigation'
</script>

<template>
  <footer class="border-t border-border/70 bg-background/60">
    <div class="mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <div class="footer-shell grid w-full max-w-[1200px] gap-8 px-5 py-6 sm:px-6 sm:py-7 lg:grid-cols-[1.05fr,0.95fr] lg:px-8">
        <div class="space-y-4">
          <brand-logo />
          <p class="max-w-md text-sm leading-relaxed text-muted-foreground">
            Titre professionnel RPMS, niveau 5 / Bac+2, en 100 % distanciel avec accompagnement
            pédagogique.
          </p>
          <p class="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
            RNCP38575 · E-learning · Accompagnement pédagogique
          </p>
        </div>

        <div class="grid gap-6 sm:grid-cols-[minmax(0,1fr)_auto] lg:justify-end">
          <div class="space-y-3">
            <p class="footer-heading">Navigation</p>
            <div class="flex flex-wrap gap-x-4 gap-y-2">
              <RouterLink
                v-for="item in footerNavigation"
                :key="item.to"
                class="footer-link"
                :to="item.to"
              >
                {{ item.label }}
              </RouterLink>
            </div>
          </div>

          <div class="space-y-3">
            <p class="footer-heading">Coordonnées</p>
            <div class="space-y-1.5 text-sm leading-relaxed text-muted-foreground">
              <p>09 77 21 51 61</p>
              <p>www.cityzfrance.fr</p>
              <p class="max-w-xs">
                110 Esplanade du General de Gaulle, 92400 Courbevoie
              </p>
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
  min-height: 2.75rem;
  min-width: 2.75rem;
  align-items: center;
  justify-content: center;
  padding: 0 0.375rem;
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
