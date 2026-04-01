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
        item.to === '/mentions-legales' ||
        item.to === '/politique-confidentialite' ||
        item.to === '/cgv-cgu'
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
            <img
              src="/telechargement.png"
              alt="Logo Qualiopi - Processus certifié, actions de formation"
              class="qualiopi-badge__image"
              loading="lazy"
            />
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
  width: fit-content;
  max-width: 100%;
  border: 1px solid color-mix(in oklab, var(--line) 82%, white);
  border-radius: 0.95rem;
  background: color-mix(in oklab, white 84%, var(--paper-tint));
  padding: 0.45rem 0.55rem;
  box-shadow: 0 10px 22px rgb(17 39 65 / 0.08);
}

.qualiopi-badge__image {
  display: block;
  width: auto;
  max-width: min(100%, 12.5rem);
  height: auto;
  max-height: 4.6rem;
}
</style>
