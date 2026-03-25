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
  <div class="space-y-10 lg:space-y-12">
    <section class="panel-shell rounded-[2rem] p-8 lg:p-12">
      <p class="kicker">Accès et accompagnement</p>
      <h1 class="editorial-title mt-3 max-w-4xl text-4xl text-foreground sm:text-5xl lg:text-6xl">
        Un cadre pédagogique lisible avant le contact
      </h1>
      <p class="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
        {{ site.access?.intro }}
      </p>
      <p class="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
        La page présente les repères utiles sur le programme RPMS, l’accompagnement pédagogique et la manière d’entrer en relation avec CITYZ'France.
      </p>
    </section>

    <div class="grid gap-5 lg:grid-cols-[1.05fr,0.95fr]">
      <Card class="panel-shell">
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

      <Card class="panel-shell">
        <CardHeader>
          <div class="flex items-center gap-2">
            <ShieldCheck class="h-5 w-5 text-primary" />
            <CardTitle>Ce que la page souligne</CardTitle>
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
        title="Des repères conçus pour des particuliers qui veulent lire le programme avant d’aller plus loin"
        description="Le site garde une présentation courte et stable des informations utiles, puis renvoie vers le formulaire de rappel."
      />

      <div class="grid gap-4 md:grid-cols-3">
        <Card
          v-for="(item, index) in expectations"
          :key="item"
          class="panel-shell"
          v-motion
          :initial="motionVariants.block.initial"
          :enter="staggerEnter(index, 80, 70)"
        >
          <CardContent class="pt-1 text-sm leading-relaxed text-muted-foreground">
            {{ item }}
          </CardContent>
        </Card>
      </div>
    </section>

    <section class="space-y-8">
      <SectionTitle
        eyebrow="Parcours"
        title="Trois repères pour comprendre le cadre de lecture"
        description="Le site présente d’abord le programme, puis l’accompagnement et enfin le contact."
      />

      <div class="grid gap-4 md:grid-cols-3">
        <Card
          v-for="(step, index) in processSteps"
          :key="step"
          class="panel-shell"
          v-motion
          :initial="motionVariants.block.initial"
          :enter="staggerEnter(index, 80, 80)"
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

    <section class="panel-shell rounded-[2rem] p-8 lg:p-10">
      <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div class="space-y-3">
          <p class="kicker">Contact</p>
          <h2 class="text-3xl font-semibold text-foreground sm:text-4xl">
            Demander un rappel à partir des repères publiés
          </h2>
          <p class="max-w-2xl text-base leading-relaxed text-muted-foreground">
            Le formulaire de contact centralise la demande autour du programme RPMS.
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
