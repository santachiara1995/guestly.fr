<script setup>
import { RouterLink } from 'vue-router'

import BrandLogo from '@/components/layout/brand-logo.vue'
import { footerNavigation } from '@/data/navigation'
</script>

<template>
  <footer class="border-t border-border/70 bg-white/90">
    <div class="mx-auto grid w-full max-w-[1240px] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr,1fr] lg:px-8">
      <div class="space-y-4">
        <brand-logo compact />
        <p class="max-w-md text-sm leading-relaxed text-muted-foreground">
          Site public consacré au titre professionnel Responsable petite et moyenne structure
          (RPMS), présenté par CITYZ'France.
        </p>
        <div class="flex flex-wrap gap-2">
          <span class="trust-chip">RNCP38575</span>
          <span class="trust-chip">Niveau 5 / Bac+2</span>
          <span class="trust-chip">100 % distanciel</span>
          <span class="trust-chip">E-learning</span>
        </div>
      </div>

      <div class="grid gap-5 sm:grid-cols-2">
        <div class="space-y-3">
          <p class="footer-heading">Pages</p>
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
          <p class="footer-heading">Repères</p>
          <p class="text-sm leading-relaxed text-muted-foreground">
            RPMS · RNCP38575 · Niveau 5 / Bac+2 · 100 % distanciel · e-learning · accompagnement
            pédagogique.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-link {
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--primary) 12%, var(--border));
  background: white;
  padding: 0.38rem 0.82rem;
  color: var(--primary);
  font-size: 0.9rem;
  transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
}

.footer-link:hover {
  transform: translateY(-1px);
  border-color: color-mix(in srgb, var(--primary) 28%, var(--secondary));
  background: color-mix(in srgb, var(--primary) 8%, white);
}
</style>
