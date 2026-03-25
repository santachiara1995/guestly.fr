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
      description="Cette page rassemble les questions publiques stabilisées autour du programme RPMS et du contact."
    />

    <p v-if="loading" class="text-sm text-muted-foreground">Chargement de la FAQ...</p>

    <div v-else class="page-cut divide-y divide-border rounded-[1.25rem]">
      <article
        v-for="item in items"
        :key="item.question"
        class="grid gap-3 px-5 py-5 md:grid-cols-[18rem,minmax(0,1fr)] md:gap-6"
      >
        <h3 class="text-lg font-semibold leading-snug text-foreground">
          {{ item.question }}
        </h3>
        <p class="text-sm leading-relaxed text-muted-foreground">
          {{ item.answer }}
        </p>
      </article>
    </div>

    <section class="page-cut rounded-[1.25rem] p-6 text-center sm:p-8">
      <p class="kicker">Besoin d’un échange</p>
      <h2 class="editorial-title mt-3 text-[clamp(2rem,3vw,3rem)] text-foreground">
        Le rappel reste le point de contact
      </h2>
      <p class="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
        Si une question ne trouve pas sa réponse ici, utilisez le formulaire de contact.
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
