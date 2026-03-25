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

const visibleItems = computed(() =>
  items.value.filter(
    (item) => !/tarif|financement|cpf|opco/i.test(`${item.question} ${item.answer}`)
  )
)
</script>

<template>
  <div class="space-y-8 lg:space-y-10">
    <SectionTitle
      eyebrow="FAQ"
      title="Questions publiques"
      description="Cette page reprend les informations stabilisées autour du programme RPMS et du cadre de contact présenté sur le site."
    />

    <p v-if="loading" class="text-sm text-muted-foreground">Chargement de la FAQ...</p>

    <div v-else class="grid gap-4 lg:grid-cols-[1.1fr,0.9fr]">
      <div class="space-y-4">
        <Card v-for="item in visibleItems" :key="item.question" class="panel-shell">
          <CardContent class="p-0">
            <details class="group px-6 py-5">
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
          </CardContent>
        </Card>
      </div>

      <aside class="space-y-4">
        <Card class="panel-shell">
          <CardContent class="space-y-3 p-6 text-sm leading-relaxed text-muted-foreground">
            <p>Le rappel permet de prolonger l’échange lorsque la FAQ ne suffit pas.</p>
            <div class="flex flex-wrap gap-3 pt-2">
              <RouterLink to="/contact">
                <Button size="lg">Être rappelé</Button>
              </RouterLink>
              <RouterLink to="/programme">
                <Button size="lg" variant="outline">Voir le programme</Button>
              </RouterLink>
            </div>
          </CardContent>
        </Card>

        <Card class="panel-shell">
          <CardContent class="space-y-3 p-6 text-sm leading-relaxed text-muted-foreground">
            <p>La FAQ reste centrée sur le RPMS, le niveau, la modalité et l’accompagnement pédagogique.</p>
            <p>La page reste limitée aux informations publiées.</p>
          </CardContent>
        </Card>
      </aside>
    </div>
  </div>
</template>
