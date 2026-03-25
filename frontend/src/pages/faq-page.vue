<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

import SectionTitle from '@/components/section-title.vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { api } from '@/lib/api'

const site = ref({
  positioning: {},
  faq: {}
})
const items = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const [sitePayload, faqPayload] = await Promise.all([api.getSite(), api.getFaq()])
    site.value = sitePayload
    items.value = faqPayload
  } finally {
    loading.value = false
  }
})

const faqCopy = computed(() => site.value.faq ?? {})
const heroLead = computed(
  () =>
    "Commencez par les questions qui comptent vraiment pour votre projet avant de laisser vos coordonnées."
)
const closingNote = computed(() => {
  const note = faqCopy.value.closingNote
  if (note && typeof note === 'object') {
    return {
      eyebrow: note.eyebrow ?? 'Encore une hésitation ?',
      title: note.title ?? 'Revenir au programme avant de demander un rappel',
      description:
        note.description ??
        "Les réponses ci-dessus résument les points utiles avant un échange plus personnalisé.",
      supportLine:
        note.supportLine ??
        "Si une question reste ouverte, la demande de rappel permet de préciser votre situation et de vérifier si le parcours correspond à votre projet."
    }
  }

  return {
    eyebrow: 'Encore une hésitation ?',
    title: 'Revenir au programme avant de demander un rappel',
    description:
      typeof note === 'string' && note
        ? note
        : "Les réponses ci-dessus résument les points utiles avant un échange plus personnalisé.",
    supportLine:
      "Si une question reste ouverte, la demande de rappel permet de préciser votre situation et de vérifier si le parcours correspond à votre projet."
  }
})
</script>

<template>
  <div class="space-y-8 sm:space-y-10">
    <section class="grid gap-8 lg:grid-cols-[1.04fr,0.96fr] lg:items-start">
      <div class="space-y-5">
        <div class="space-y-4">
          <p class="kicker">FAQ RPMS</p>
          <h1 class="editorial-title max-w-4xl text-[clamp(2.05rem,4.2vw,3.7rem)] text-foreground">
            Les questions qui bloquent le plus souvent la décision
          </h1>
          <p class="max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {{ heroLead }}
          </p>
        </div>
      </div>

      <Card class="page-cut">
        <CardContent class="space-y-4 p-6 text-sm leading-relaxed text-muted-foreground">
          <p class="kicker">{{ closingNote.eyebrow }}</p>
          <h2 class="text-2xl font-semibold text-foreground">{{ closingNote.title }}</h2>
          <p>{{ closingNote.description }}</p>
          <p>{{ closingNote.supportLine }}</p>
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
    </section>

    <p v-if="loading" class="text-sm text-muted-foreground">Chargement de la FAQ...</p>

    <template v-else>
      <SectionTitle
        eyebrow="Objections fréquentes"
        title="Commencez par les points qui comptent le plus pour trancher"
        description="Chaque réponse doit réduire une hésitation précise, pas seulement répéter la fiche du programme."
      />

      <div class="space-y-4">
        <Card v-for="item in items" :key="item.question" class="page-cut">
          <CardContent class="p-0">
            <details class="group px-5 py-5 sm:px-6">
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

      <section class="page-cut rounded-[1.5rem] p-6 sm:p-8 lg:p-10">
        <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div class="space-y-3">
            <p class="kicker">Besoin d'un échange</p>
            <h2 class="editorial-title text-[clamp(2rem,3.3vw,3.2rem)] text-foreground">
              Faire le point avant d'aller plus loin
            </h2>
            <p class="max-w-2xl text-base leading-relaxed text-muted-foreground">
              Si vous voulez une réponse adaptée à votre projet, le rappel permet de cadrer la
              suite sans vous engager trop tôt.
            </p>
          </div>

          <div class="flex flex-wrap gap-3">
            <RouterLink to="/contact">
              <Button size="lg">Être rappelé</Button>
            </RouterLink>
            <RouterLink to="/programme">
              <Button size="lg" variant="outline">Voir le programme</Button>
            </RouterLink>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>
