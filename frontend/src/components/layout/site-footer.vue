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
  <footer class="mt-0 bg-background/75">
    <div class="px-4 pb-6 pt-0 sm:px-6 sm:pb-7 sm:pt-0 lg:px-8 lg:pb-6 lg:pt-0">
      <div
        class="footer-shell shell-track grid gap-4 px-4 py-4 sm:px-5 sm:py-5 lg:grid-cols-[1.12fr_0.88fr] lg:px-6"
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
          <div class="qualiopi-badge">
            <div class="qualiopi-badge__flag" aria-hidden="true">
              <span class="qualiopi-badge__flag-line qualiopi-badge__flag-line--blue"></span>
              <span class="qualiopi-badge__flag-line qualiopi-badge__flag-line--red"></span>
            </div>
            <div class="qualiopi-badge__copy">
              <p class="qualiopi-badge__title">Qualiopi</p>
              <p class="qualiopi-badge__subtitle">Processus certifié</p>
              <p class="qualiopi-badge__caption">Actions de formation</p>
            </div>
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

.qualiopi-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.85rem;
  width: fit-content;
  max-width: 100%;
  border: 1px solid color-mix(in oklab, var(--line) 82%, white);
  border-radius: 0.95rem;
  background: color-mix(in oklab, white 84%, var(--paper-tint));
  padding: 0.8rem 0.95rem;
  box-shadow: 0 10px 22px rgb(17 39 65 / 0.08);
}

.qualiopi-badge__flag {
  display: grid;
  gap: 0.28rem;
}

.qualiopi-badge__flag-line {
  display: block;
  width: 1.6rem;
  height: 0.22rem;
  border-radius: 999px;
}

.qualiopi-badge__flag-line--blue {
  background: var(--primary);
}

.qualiopi-badge__flag-line--red {
  background: var(--tricolor-red);
}

.qualiopi-badge__copy {
  display: grid;
  gap: 0.08rem;
}

.qualiopi-badge__title {
  color: var(--primary);
  font-size: 1.18rem;
  font-style: italic;
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.03em;
}

.qualiopi-badge__subtitle,
.qualiopi-badge__caption {
  color: var(--ink);
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  line-height: 1.25;
}

.qualiopi-badge__caption {
  color: var(--muted-foreground);
}
</style>
