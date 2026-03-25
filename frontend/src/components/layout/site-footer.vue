<script setup>
import { RouterLink } from 'vue-router'

import BrandLogo from '@/components/layout/brand-logo.vue'
import { footerNavigation } from '@/data/navigation'
</script>

<template>
  <footer class="border-t border-border/80 bg-white/94">
    <div class="mx-auto grid w-full max-w-[1180px] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr,0.9fr] lg:px-8">
      <div class="space-y-4">
        <brand-logo compact />
        <p class="max-w-md text-sm leading-relaxed text-muted-foreground">
          Titre professionnel Responsable petite et moyenne structure (RPMS), en 100 %
          distanciel avec accompagnement pédagogique.
        </p>
        <div class="flex flex-wrap gap-2">
          <span class="trust-chip">RNCP38575</span>
          <span class="trust-chip">Niveau 5</span>
          <span class="trust-chip">100 % distanciel</span>
          <span class="trust-chip">E-learning</span>
        </div>
      </div>

      <div class="grid gap-6 sm:grid-cols-[minmax(0,1fr)_auto] lg:justify-end">
        <div class="space-y-3">
          <p class="footer-heading">Navigation</p>
          <div class="flex flex-wrap gap-2">
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
  </footer>
</template>

<style scoped>
.footer-link {
  border-radius: 999px;
  border: 1px solid color-mix(in oklab, var(--primary) 18%, var(--border));
  background: rgb(255 255 255 / 0.9);
  padding: 0.38rem 0.82rem;
  color: var(--foreground);
  font-size: 0.9rem;
  transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
}

.footer-link:hover {
  transform: translateY(-1px);
  border-color: color-mix(in oklab, var(--primary) 34%, var(--secondary));
  background: color-mix(in oklab, var(--primary) 6%, white);
}
</style>
