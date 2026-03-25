<script setup>
import { RouterLink } from 'vue-router'

import BrandLogo from '@/components/layout/brand-logo.vue'
import { footerNavigation } from '@/data/navigation'
</script>

<template>
  <footer class="border-t border-border/80 bg-white/95">
    <div class="mx-auto grid w-full max-w-[1180px] gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1fr,auto] lg:items-start lg:px-8">
      <div class="space-y-4">
        <brand-logo compact />
        <p class="max-w-md text-sm leading-relaxed text-muted-foreground">
          Site public consacré au titre professionnel Responsable petite et moyenne structure (RPMS)
          présenté par CITYZ'France.
        </p>
        <div class="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          <span class="rounded-full border border-border bg-white px-3 py-1">RNCP38575</span>
          <span class="rounded-full border border-border bg-white px-3 py-1">Niveau 5</span>
          <span class="rounded-full border border-border bg-white px-3 py-1">100 % distanciel</span>
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
  background: white;
  padding: 0.38rem 0.82rem;
  color: var(--foreground);
  font-size: 0.9rem;
  transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
}

.footer-link:hover {
  transform: translateY(-1px);
  border-color: color-mix(in oklab, var(--primary) 38%, var(--secondary));
  background: color-mix(in oklab, var(--primary) 5%, white);
}
</style>
