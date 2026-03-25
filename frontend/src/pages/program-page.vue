<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowRight } from 'lucide-vue-next'

import SectionTitle from '@/components/section-title.vue'
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
  () => program.value?.title ?? 'Titre professionnel Responsable petite et moyenne structure (RPMS)'
)
const heroSubtitle = computed(
  () =>
    program.value
      ? `${program.value.rncpCode} - ${program.value.levelLabel} - ${program.value.formatLabel} - ${program.value.rhythmLabel} - ${program.value.supportLabel}`
      : 'RNCP38575, niveau 5 / Bac+2, 100 % distanciel, e-learning et accompagnement pédagogique.'
)
const heroNote =
  'Le programme relie pilotage, management, organisation, territoire, partenariats, production, diffusion et reporting dans une logique de titre professionnel reconnu.'

const quickFacts = computed(() =>
  [
    { label: 'Titre', value: program.value?.title ? 'Titre professionnel RPMS' : undefined },
    { label: 'Référence', value: program.value?.rncpCode },
    { label: 'Niveau', value: program.value?.levelLabel },
    { label: 'Modalité', value: program.value?.formatLabel },
    { label: 'Cadre', value: program.value?.rhythmLabel },
    { label: 'Appui', value: program.value?.supportLabel }
  ].filter((item) => item.value)
)
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
          <SectionTitle
            eyebrow="Programme RPMS"
            :title="heroTitle"
            :description="heroSubtitle"
          />
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
        </div>

        <div class="space-y-4 lg:pt-1">
          <div class="page-cut rounded-[1.45rem] p-5 sm:p-6">
            <div class="flex flex-wrap gap-2">
              <Badge>RPMS</Badge>
              <Badge variant="outline">{{ program.rncpCode }}</Badge>
              <Badge variant="outline">{{ program.levelLabel }}</Badge>
              <Badge variant="outline">{{ program.formatLabel }}</Badge>
            </div>
            <p class="mt-4 text-sm leading-relaxed text-muted-foreground">
              Un cadre de lecture simple pour situer le titre professionnel, sa référence RNCP et
              le format 100 % distanciel.
            </p>
          </div>

          <div class="grid gap-3 sm:grid-cols-2">
            <div
              v-for="(item, index) in quickFacts"
              :key="item.label"
              class="page-cut rounded-xl px-4 py-4"
              v-motion
              :initial="motionVariants.pop.initial"
              :enter="staggerEnter(index, 70, 80)"
            >
              <p class="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {{ item.label }}
              </p>
              <p class="mt-2 text-lg font-semibold text-foreground">{{ item.value }}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="space-y-8">
        <SectionTitle
          eyebrow="Ce que vous allez travailler"
          title="Des repères concrets pour le pilotage, le management et l'organisation"
          description="Le programme ne se limite pas à un intitulé: il relie le titre professionnel RPMS à des activités précises autour de la performance, de la structure et des responsabilités."
        />

        <div class="grid gap-6 lg:grid-cols-[0.95fr,1.05fr]">
          <Card class="page-cut h-fit">
            <CardHeader>
              <CardTitle>Objectifs du parcours</CardTitle>
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
        </div>
      </section>

      <section class="space-y-6">
        <SectionTitle
          eyebrow="Blocs de compétences"
          title="Le détail des grands blocs du programme"
          description="Chaque bloc reprend les thèmes de travail visibles dans la documentation du parcours."
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
              Recevoir un rappel pour échanger sur votre projet
            </h2>
            <p class="max-w-2xl text-base leading-relaxed text-muted-foreground">
              Si vous souhaitez aller plus loin après cette lecture, vous pouvez demander un rappel
              depuis la page contact ou revenir sur le cadre du parcours.
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
