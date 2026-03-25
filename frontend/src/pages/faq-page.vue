<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

import SectionTitle from '@/components/section-title.vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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

    <div v-else class="space-y-4">
      <Card v-for="item in items" :key="item.question" class="diamond-panel surface-cut">
        <CardHeader>
          <CardTitle class="text-lg">{{ item.question }}</CardTitle>
        </CardHeader>
        <CardContent class="text-sm leading-relaxed text-muted-foreground">
          {{ item.answer }}
        </CardContent>
      </Card>
    </div>

    <section class="diamond-panel surface-cut rounded-[2rem] p-8 text-center">
      <p class="kicker">Besoin d’un échange</p>
      <h2 class="mt-3 text-3xl font-semibold text-foreground">
        Le rappel reste le point d’entrée unique
      </h2>
      <p class="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
        Si votre question dépasse ce qui est volontairement publié sur le site, utilisez le
        formulaire de contact pour être rappelé.
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
