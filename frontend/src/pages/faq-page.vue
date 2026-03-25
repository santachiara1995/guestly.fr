<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

import SectionTitle from '@/components/section-title.vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
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

const visibleItems = computed(() => items.value)
</script>

<template>
  <div class="space-y-8 sm:space-y-10">
    <SectionTitle
      eyebrow="FAQ"
      title="Questions fréquentes sur le RPMS"
      description="Retrouvez ici les réponses aux questions les plus courantes avant une demande de rappel."
    />

    <p v-if="loading" class="text-sm text-muted-foreground">Chargement de la FAQ...</p>

    <div v-else class="grid gap-5 lg:grid-cols-[1.08fr,0.92fr]">
      <div class="space-y-4">
        <Card v-for="item in visibleItems" :key="item.question" class="page-cut">
          <CardContent class="p-0">
            <details class="group px-5 py-5">
              <summary class="flex cursor-pointer list-none items-start justify-between gap-4 text-left">
                <span class="text-lg font-semibold leading-snug text-foreground">
                  {{ item.question }}
                </span>
                <span
                  class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-white text-primary transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p class="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                {{ item.answer }}
              </p>
            </details>
          </CardContent>
        </Card>
      </div>

      <aside class="space-y-4">
        <Card class="page-cut">
          <CardContent class="space-y-4 p-6 text-sm leading-relaxed text-muted-foreground">
            <p class="kicker">Besoin d'un échange</p>
            <p>
              Si vous souhaitez parler de votre situation ou clarifier un point du programme, vous
              pouvez demander un rappel.
            </p>
            <div class="flex flex-wrap gap-3 pt-1">
              <RouterLink to="/contact">
                <Button size="lg">Être rappelé</Button>
              </RouterLink>
              <RouterLink to="/programme">
                <Button size="lg" variant="outline">Voir le programme</Button>
              </RouterLink>
            </div>
          </CardContent>
        </Card>

        <Card class="page-cut">
          <CardContent class="space-y-3 p-6 text-sm leading-relaxed text-muted-foreground">
            <p>
              Cette page se concentre sur le contenu du programme, son niveau, son format à
              distance et l'accompagnement pédagogique annoncé.
            </p>
            <p>
              Si vous avez besoin d'une réponse adaptée à votre situation, la demande de rappel
              permet de poursuivre l'échange.
            </p>
          </CardContent>
        </Card>
      </aside>
    </div>
  </div>
</template>
