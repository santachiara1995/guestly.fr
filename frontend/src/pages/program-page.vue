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

const quickFacts = computed(() =>
  [
    { label: 'Niveau', value: program.value?.levelLabel },
    { label: 'Modalité', value: program.value?.formatLabel },
    { label: 'Format', value: program.value?.rhythmLabel },
    { label: 'Accompagnement', value: program.value?.supportLabel }
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
      <section class="page-cut space-y-6 rounded-[1.5rem] p-6 sm:p-8 lg:p-10">
        <div class="flex flex-wrap gap-2">
          <Badge>RPMS</Badge>
          <Badge variant="outline">{{ program.rncpCode }}</Badge>
          <Badge variant="outline">{{ program.levelLabel }}</Badge>
          <Badge variant="outline">{{ program.formatLabel }}</Badge>
        </div>

        <div class="grid gap-6 lg:grid-cols-[1.02fr,0.98fr] lg:items-start">
          <div class="space-y-4">
            <h1 class="editorial-title max-w-4xl text-[clamp(2.5rem,5.2vw,4.8rem)] text-foreground">
              {{ program.title }}
            </h1>
            <p class="max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {{ program.intro }}
            </p>
            <p class="max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Retrouvez ici les compétences visées, les grands blocs du parcours et les repères
              utiles pour situer votre projet.
            </p>

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

      <section class="grid gap-6 lg:grid-cols-[0.95fr,1.05fr]">
        <Card class="page-cut h-fit">
          <CardHeader>
            <CardTitle>Ce que vous allez travailler</CardTitle>
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
              depuis la page contact.
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
