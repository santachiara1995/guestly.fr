<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

import SectionTitle from '@/components/section-title.vue'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'

const items = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    items.value = await api.getFaq()
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="space-y-8">
    <SectionTitle
      eyebrow="FAQ"
      title="Questions fréquemment posées"
      description="Cette page reprend les informations publiques stabilisées autour du programme RPMS et du cadre de contact présenté sur le site."
    />

    <p v-if="loading" class="text-sm text-muted-foreground">Chargement de la FAQ...</p>

    <article v-else class="monument-panel surface-cut p-0">
      <details
        v-for="item in items"
        :key="item.question"
        class="group border-t border-border/70 px-6 py-5 first:border-t-0"
      >
        <summary class="flex cursor-pointer list-none items-center justify-between gap-4 text-left">
          <span class="text-lg font-semibold text-foreground">{{ item.question }}</span>
          <span class="flex h-8 w-8 items-center justify-center rounded-full border border-primary/20 bg-white/90 text-primary transition-transform group-open:rotate-45">
            +
          </span>
        </summary>
        <p class="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          {{ item.answer }}
        </p>
      </details>
    </article>

    <section class="arch-cta p-8 text-center">
      <p class="kicker">Besoin d’un échange</p>
      <h2 class="mt-3 text-3xl font-semibold">
        Le rappel reste le point d’entrée unique
      </h2>
      <p class="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
        Si votre question dépasse ce qui est publié sur le site, utilisez le formulaire de contact pour être rappelé.
      </p>
      <div class="mt-6 flex flex-wrap justify-center gap-3">
        <RouterLink to="/contact">
          <Button size="lg">Être rappelé</Button>
        </RouterLink>
        <RouterLink to="/programme">
          <Button size="lg" variant="outline">Voir le programme</Button>
        </RouterLink>
      </div>
    </section>
  </div>
</template>
