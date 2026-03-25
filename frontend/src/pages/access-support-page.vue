<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { CheckCircle2, PhoneCall, ShieldCheck } from 'lucide-vue-next'

import SectionTitle from '@/components/section-title.vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { api } from '@/lib/api'
import { motionVariants, staggerEnter } from '@/lib/motion'

const site = ref({})
const program = ref(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const [sitePayload, programPayload] = await Promise.all([
      api.getSite(),
      api.getProgram('rpms')
    ])
    site.value = sitePayload
    program.value = programPayload
  } finally {
    loading.value = false
  }
})

const expectations = computed(() => site.value.access?.expectations ?? [])
const supportPoints = computed(() => site.value.access?.supportPoints ?? [])
const processSteps = computed(() => site.value.access?.processSteps ?? [])
</script>

<template>
  <div class="space-y-10">
    <section class="diamond-panel surface-cut rounded-[2rem] p-8 lg:p-12">
      <p class="kicker">Accès et accompagnement</p>
      <h1 class="editorial-title mt-3 text-4xl text-foreground sm:text-5xl">
        Un cadre pédagogique présenté avant toute promesse opérationnelle
      </h1>
      <p class="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
        {{ site.access?.intro }}
      </p>
      <p class="mt-4 text-sm text-muted-foreground">
        Le site public présente le cadre du parcours, la logique d’accompagnement et le point
        d’entrée de contact. Les éléments opérationnels non revalidés n’y sont pas publiés.
      </p>
    </section>

    <div class="grid gap-5 lg:grid-cols-[1.05fr,0.95fr]">
      <Card class="diamond-panel surface-cut">
        <CardHeader>
          <div class="flex items-center gap-2">
            <CheckCircle2 class="h-5 w-5 text-primary" />
            <CardTitle>Repères de travail</CardTitle>
          </div>
        </CardHeader>
        <CardContent class="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p><strong class="text-foreground">Titre :</strong> {{ program?.title }}</p>
          <p><strong class="text-foreground">Niveau :</strong> {{ program?.levelLabel }}</p>
          <p><strong class="text-foreground">Modalité :</strong> {{ program?.formatLabel }}</p>
          <p><strong class="text-foreground">Format :</strong> {{ program?.rhythmLabel }}</p>
          <p><strong class="text-foreground">Accompagnement :</strong> {{ program?.supportLabel }}</p>
        </CardContent>
      </Card>

      <Card class="diamond-panel surface-cut">
        <CardHeader>
          <div class="flex items-center gap-2">
            <ShieldCheck class="h-5 w-5 text-primary" />
            <CardTitle>Ce que cette page pose clairement</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ul class="space-y-3 text-sm leading-relaxed text-muted-foreground">
            <li v-for="item in supportPoints" :key="item" class="flex gap-3">
              <span class="mt-1 h-2 w-2 rounded-full bg-secondary"></span>
              <span>{{ item }}</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>

    <section class="space-y-8">
      <SectionTitle
        eyebrow="Pour qui"
        title="Des repères conçus pour des particuliers en recherche d’un cadre lisible"
        description="Le site public ne construit pas un tunnel d’admission détaillé. Il aide d’abord à comprendre le périmètre du programme et la logique de contact."
      />

      <div class="grid gap-4 md:grid-cols-3">
        <Card
          v-for="(item, index) in expectations"
          :key="item"
          class="diamond-panel surface-cut"
          v-motion
          :initial="motionVariants.block.initial"
          :enter="staggerEnter(index, 105, 90)"
        >
          <CardContent class="pt-1 text-sm leading-relaxed text-muted-foreground">
            {{ item }}
          </CardContent>
        </Card>
      </div>
    </section>

    <section class="space-y-8">
      <SectionTitle
        eyebrow="Séquence"
        title="Un parcours volontairement simple"
        description="Le site garde un seul chemin d’action : lire, comprendre, puis demander un rappel."
      />

      <div class="grid gap-4 md:grid-cols-3">
        <Card
          v-for="(step, index) in processSteps"
          :key="step"
          class="diamond-panel surface-cut"
          v-motion
          :initial="motionVariants.block.initial"
          :enter="staggerEnter(index, 110, 100)"
        >
          <CardHeader>
            <div class="flex items-center gap-2">
              <span class="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                {{ index + 1 }}
              </span>
              <CardTitle class="text-lg">Étape {{ index + 1 }}</CardTitle>
            </div>
          </CardHeader>
          <CardContent class="text-sm leading-relaxed text-muted-foreground">
            {{ step }}
          </CardContent>
        </Card>
      </div>
    </section>

    <section class="diamond-panel surface-cut rounded-[2rem] p-8 lg:p-10">
      <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div class="space-y-3">
          <p class="kicker">Contact</p>
          <h2 class="text-3xl font-semibold text-foreground">
            La suite du parcours passe par un rappel unique
          </h2>
          <p class="max-w-2xl text-base leading-relaxed text-muted-foreground">
            Le formulaire de contact permet de centraliser la demande, sans page concurrente ni
            renvoi externe.
          </p>
        </div>

        <div class="flex flex-wrap gap-3">
          <RouterLink to="/contact">
            <Button size="lg">
              <PhoneCall class="mr-2 h-4 w-4" />
              Être rappelé
            </Button>
          </RouterLink>
          <RouterLink to="/programme">
            <Button size="lg" variant="outline">Voir le programme</Button>
          </RouterLink>
        </div>
      </div>
    </section>

    <p v-if="loading" class="text-sm text-muted-foreground">Chargement des repères...</p>
  </div>
</template>
