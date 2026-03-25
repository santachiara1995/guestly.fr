<script setup>
import { RouterLink } from 'vue-router'

import BrandLogo from '@/components/layout/brand-logo.vue'
import TrustStrip from '@/components/visual/trust-strip.vue'
import { footerNavigation } from '@/data/navigation'

const footerTrustItems = ['RNCP38575', 'Bac+2 / Niveau 5', '100 % distanciel', 'E-learning']
</script>

<template>
  <footer class="border-t border-border/60 bg-transparent">
    <div class="mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <div class="footer-shell grid w-full max-w-[1180px] gap-8 px-5 py-6 sm:px-6 sm:py-7 lg:grid-cols-[1.05fr,0.95fr] lg:px-8">
        <div class="space-y-4">
          <brand-logo />
          <p class="max-w-md text-sm leading-relaxed text-muted-foreground">
            Pour vous aider à mieux piloter une activité, coordonner une équipe et organiser une
            structure avec un cadre à distance et un accompagnement pédagogique.
          </p>
          <trust-strip :items="footerTrustItems" />
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
  color: var(--foreground);
  font-size: 0.92rem;
  font-weight: 500;
  line-height: 1.2;
  text-decoration: none;
  transition: color 0.15s ease, border-color 0.15s ease, text-decoration-color 0.15s ease;
  border-bottom: 1px solid transparent;
}

.footer-link:hover {
  color: var(--primary);
  border-bottom-color: color-mix(in oklab, var(--primary) 28%, var(--border));
}

.footer-link:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 3px;
  border-radius: 0.375rem;
}
</style>
