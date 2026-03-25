<script setup>
import { RouterLink } from 'vue-router'

import BrandLogo from '@/components/layout/brand-logo.vue'
import { footerNavigation } from '@/data/navigation'
</script>

<template>
  <footer class="relative overflow-hidden border-t border-border/75 bg-white/84">
    <div class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
    <div class="mx-auto grid w-full max-w-[1180px] gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[0.9fr,1.1fr] lg:px-8">
      <div class="space-y-3">
        <brand-logo compact />
        <p class="max-w-md text-sm leading-relaxed text-muted-foreground">
          Site public consacré au titre professionnel Responsable petite et moyenne structure (RPMS)
          présenté par CITYZ'France.
        </p>
        <div class="space-y-1 text-sm text-muted-foreground">
          <p>09 77 21 51 61</p>
          <p>110 Esplanade du General de Gaulle, 92400 Courbevoie</p>
          <p>www.cityzfrance.fr</p>
        </div>
      </div>

      <div class="flex flex-wrap items-start gap-3 lg:justify-end">
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
  </footer>
</template>

<style scoped>
.footer-link {
  border-radius: 999px;
  border: 1px solid color-mix(in oklab, var(--primary) 18%, var(--border));
  background: color-mix(in oklab, var(--white) 90%, var(--blue-france));
  padding: 0.38rem 0.82rem;
  color: var(--primary);
  font-size: 0.9rem;
  transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
}

.footer-link:hover {
  transform: translateY(-1px);
  border-color: color-mix(in oklab, var(--primary) 38%, var(--secondary));
  background: color-mix(in oklab, var(--primary) 8%, white);
}
</style>
