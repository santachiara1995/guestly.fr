<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowRight } from 'lucide-vue-next'

import SectionTitle from '@/components/section-title.vue'
import TrustStrip from '@/components/visual/trust-strip.vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { api } from '@/lib/api'
import { motionVariants, staggerEnter } from '@/lib/motion'

const program = ref(null)
const loading = ref(true)
const errorMessage = ref('')

onMounted(async () => {
  try {
    program.value = await api.getProgram('rpms')
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Programme introuvable.'
  } finally {
    loading.value = false
  }
})

const heroTitle = computed(
  () =>
    'Ce que vous allez réellement travailler pour piloter, coordonner et organiser'
)
const heroSubtitle = computed(
  () =>
    program.value
      ? "Parcourez les grands blocs et les axes de travail pour voir si ce parcours correspond vraiment aux responsabilités que vous visez."
      : "Parcourez les grands blocs et les axes de travail pour voir si ce parcours correspond vraiment aux responsabilités que vous visez."
)
const heroNote =
  "Le programme vaut surtout par ce qu'il vous aide à mieux faire au quotidien, pas seulement par son intitulé."
const trustStripItems = computed(() => [
  program.value?.rncpCode ?? 'RNCP38575',
  program.value?.levelLabel ?? 'Niveau 5 (Bac+2)',
  program.value?.formatLabel ?? '100 % distanciel',
  program.value?.supportLabel ?? 'Accompagnement pédagogique'
])
</script>

<template>
  <div class="space-y-8 sm:space-y-10 lg:space-y-12">
    <p v-if="loading" class="text-sm text-muted-foreground">Chargement du programme...</p>

    <p
      v-else-if="errorMessage"
      class="rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive"
    >
      {{ errorMessage }}
    </p>

    <template v-else-if="program">
      <section class="grid gap-8 lg:grid-cols-[1.04fr,0.96fr] lg:items-start">
        <div class="space-y-5">
          <div class="space-y-4">
            <p class="kicker">Programme</p>
            <h1 class="editorial-title max-w-4xl text-[clamp(2.15rem,4.5vw,4rem)] text-foreground">
              {{ heroTitle }}
            </h1>
            <p class="max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {{ heroSubtitle }}
            </p>
          </div>
          <p class="max-w-2xl text-base font-semibold leading-relaxed text-foreground/90 sm:text-lg">
            {{ heroNote }}
          </p>

          <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <RouterLink to="/contact">
              <Button size="lg">
                Être rappelé
                <ArrowRight class="ml-2 h-4 w-4" />
              </Button>
            </RouterLink>
            <RouterLink to="/acces-et-accompagnement">
              <Button size="lg" variant="outline">Accès et accompagnement</Button>
            </RouterLink>
          </div>

          <trust-strip :items="trustStripItems" />
        </div>

        <Card class="page-cut h-fit lg:mt-1">
          <CardHeader>
            <CardTitle>Ce que vous allez réellement travailler</CardTitle>
          </CardHeader>
          <CardContent>
            <ul class="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <li v-for="item in program.objectiveSummary" :key="item" class="flex gap-3">
                <span class="mt-1 h-2.5 w-2.5 rounded-full bg-primary"></span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section class="space-y-8">
        <SectionTitle
          eyebrow="Repères du parcours"
          title="Des axes de travail concrets pour tenir un rôle plus complet"
          description="Le programme relie le pilotage, le management et l'organisation à des activités précises autour de la performance, de la structure et des responsabilités."
        />

        <div class="grid gap-6 lg:grid-cols-[0.92fr,1.08fr]">
          <Card class="page-cut h-fit">
            <CardHeader>
              <CardTitle>Compétences mobilisées</CardTitle>
            </CardHeader>
            <CardContent>
              <ul class="grid gap-3 text-sm leading-relaxed text-muted-foreground sm:grid-cols-2">
                <li
                  v-for="scope in program.professionalScope"
                  :key="scope"
                  class="rounded-xl border border-border bg-white px-4 py-3"
                >
                  {{ scope }}
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card class="page-cut h-fit">
            <CardHeader>
            <CardTitle>Repères officiels du parcours</CardTitle>
          </CardHeader>
          <CardContent class="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
                Le parcours s'appuie sur un cadre clair, reconnu par l'État, pour
                structurer votre lecture du niveau visé et du contenu travaillé.
              </p>
              <trust-strip :items="trustStripItems" />
            </CardContent>
          </Card>
        </div>
      </section>

      <section class="space-y-6">
        <SectionTitle
          eyebrow="Blocs de compétences"
          title="Le détail des grands blocs du programme"
          description="Chaque bloc éclaire un pan concret du rôle: activité, équipe, offre, production et résultats."
        />

        <div class="grid gap-4 xl:grid-cols-2">
          <Card
            v-for="(block, index) in program.blocks"
            :key="block.code"
            class="page-cut"
            v-motion
            :initial="motionVariants.block.initial"
            :enter="staggerEnter(index, 55, 80)"
          >
            <CardHeader class="space-y-3">
              <Badge variant="outline">{{ block.code }}</Badge>
              <CardTitle class="text-xl">{{ block.title }}</CardTitle>
            </CardHeader>
            <CardContent class="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
              {{ block.details }}
            </CardContent>
          </Card>
        </div>
      </section>

      <section class="page-cut rounded-[1.5rem] p-6 sm:p-8 lg:p-10">
        <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div class="space-y-3">
            <p class="kicker">Contact</p>
            <h2 class="editorial-title text-[clamp(2rem,3.4vw,3.25rem)] text-foreground">
              Recevoir un rappel pour voir si le programme vous convient
            </h2>
            <p class="max-w-2xl text-base leading-relaxed text-muted-foreground">
              Si vous souhaitez aller plus loin après cette lecture, vous pouvez demander un rappel
              pour faire le point sur votre projet et vos questions.
            </p>
          </div>

          <div class="flex flex-wrap gap-3">
            <RouterLink to="/contact">
              <Button size="lg">
                Être rappelé
                <ArrowRight class="ml-2 h-4 w-4" />
              </Button>
            </RouterLink>
            <RouterLink to="/acces-et-accompagnement">
              <Button size="lg" variant="outline">Accès et accompagnement</Button>
            </RouterLink>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>
