<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

import SectionTitle from '@/components/section-title.vue'
import { Button } from '@/components/ui/button'
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
    "Commencez par les questions qui comptent vraiment sur le titre, le format et les compétences travaillées avant de laisser vos coordonnées."
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
  <div class="space-y-12 sm:space-y-14 lg:space-y-16">
    <section class="page-hero grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.04fr,0.96fr] lg:p-10">
      <div class="space-y-5">
        <div class="space-y-4">
          <p class="kicker">FAQ RPMS</p>
          <h1 class="editorial-title max-w-4xl text-[clamp(2.2rem,4.5vw,3.8rem)] text-foreground">
            Les questions utiles avant de vous engager dans le RPMS
          </h1>
          <p class="max-w-3xl text-base leading-8 text-muted-foreground sm:text-[1.05rem]">
            {{ heroLead }}
          </p>
        </div>
      </div>

      <aside class="page-cut p-6 sm:p-7">
        <p class="kicker">{{ closingNote.eyebrow }}</p>
        <h2 class="mt-4 text-[clamp(1.6rem,2.8vw,2.25rem)] font-semibold leading-tight tracking-[-0.04em] text-foreground">
          {{ closingNote.title }}
        </h2>
        <p class="mt-4 text-sm leading-7 text-muted-foreground">
          {{ closingNote.description }}
        </p>
        <p class="mt-3 text-sm leading-7 text-muted-foreground">
          {{ closingNote.supportLine }}
        </p>
        <div class="mt-6 flex flex-col gap-3 sm:flex-row">
          <RouterLink to="/contact">
            <Button size="lg">Être rappelé</Button>
          </RouterLink>
          <RouterLink to="/programme">
            <Button size="lg" variant="outline">Voir le programme</Button>
          </RouterLink>
        </div>
      </aside>
    </section>

    <p v-if="loading" class="text-sm text-muted-foreground">Chargement de la FAQ...</p>

    <template v-else>
      <section class="space-y-6">
        <SectionTitle
          eyebrow="Objections fréquentes"
          title="Commencez par les points qui comptent le plus pour trancher"
          description="Chaque réponse doit éclairer le titre, le format, les repères officiels et la portée concrète du programme."
        />

        <div class="grid gap-3">
          <details
            v-for="item in items"
            :key="item.question"
            class="page-cut group px-5 py-5 sm:px-6"
          >
            <summary class="flex cursor-pointer list-none items-start justify-between gap-4 text-left">
              <span class="text-[1.02rem] font-semibold leading-snug text-foreground">
                {{ item.question }}
              </span>
              <span
                class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-muted text-primary transition-colors group-open:bg-primary group-open:text-primary-foreground"
              >
                +
              </span>
            </summary>
            <p class="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
              {{ item.answer }}
            </p>
          </details>
        </div>
      </section>

      <section class="arch-cta p-6 sm:p-8 lg:p-10">
        <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div class="space-y-3">
            <p class="kicker">Besoin d'un échange</p>
            <h2 class="editorial-title max-w-3xl text-[clamp(1.95rem,3vw,2.8rem)] text-foreground">
              Faire le point sur votre projet et le cadre du titre
            </h2>
            <p class="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-[1rem]">
              Si vous voulez une réponse adaptée à votre projet, le rappel permet de cadrer la
              suite sans vous engager trop tôt.
            </p>
          </div>

          <div class="flex flex-col gap-3 sm:flex-row">
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
