<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowRight } from 'lucide-vue-next'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { api } from '@/lib/api'

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
</script>

<template>
  <div class="space-y-8">
    <p v-if="loading" class="text-sm text-muted-foreground">Chargement du programme...</p>

    <p
      v-else-if="errorMessage"
      class="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive"
    >
      {{ errorMessage }}
    </p>

    <template v-else-if="program">
      <section class="diamond-panel surface-cut space-y-5 rounded-[2rem] p-8 lg:p-12">
        <div class="flex flex-wrap items-center gap-2">
          <Badge>RPMS</Badge>
          <Badge variant="outline">{{ program.rncpCode }}</Badge>
          <Badge variant="outline">{{ program.levelLabel }}</Badge>
        </div>

        <h1 class="editorial-title text-4xl text-foreground sm:text-5xl">
          {{ program.title }}
        </h1>

        <p class="max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {{ program.intro }}
        </p>

        <div class="grid gap-4 md:grid-cols-3">
          <Card class="surface-cut">
            <CardHeader>
              <CardTitle class="text-base">Modalité</CardTitle>
            </CardHeader>
            <CardContent class="text-sm text-muted-foreground">
              {{ program.formatLabel }}
            </CardContent>
          </Card>
          <Card class="surface-cut">
            <CardHeader>
              <CardTitle class="text-base">Format pédagogique</CardTitle>
            </CardHeader>
            <CardContent class="text-sm text-muted-foreground">
              {{ program.rhythmLabel }}
            </CardContent>
          </Card>
          <Card class="surface-cut">
            <CardHeader>
              <CardTitle class="text-base">Accompagnement</CardTitle>
            </CardHeader>
            <CardContent class="text-sm text-muted-foreground">
              {{ program.supportLabel }}
            </CardContent>
          </Card>
        </div>
      </section>

      <section class="grid gap-6 lg:grid-cols-[0.9fr,1.1fr]">
        <Card class="diamond-panel surface-cut h-fit">
          <CardHeader>
            <CardTitle>Objectifs pédagogiques</CardTitle>
          </CardHeader>
          <CardContent>
            <ul class="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <li v-for="item in program.objectiveSummary" :key="item" class="flex gap-3">
                <span class="mt-1 h-2 w-2 rounded-full bg-primary"></span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card class="diamond-panel surface-cut h-fit">
          <CardHeader>
            <CardTitle>Champs de compétences</CardTitle>
          </CardHeader>
          <CardContent>
            <ul class="grid gap-3 text-sm leading-relaxed text-muted-foreground sm:grid-cols-2">
              <li
                v-for="scope in program.professionalScope"
                :key="scope"
                class="rounded-2xl border border-border/70 bg-background/70 px-4 py-3"
              >
                {{ scope }}
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section class="space-y-5">
        <div class="space-y-3">
          <p class="kicker">Blocs de compétences</p>
          <h2 class="text-3xl font-semibold text-foreground">Structure du programme</h2>
          <p class="max-w-3xl text-base leading-relaxed text-muted-foreground">
            La présentation publique reprend les grands blocs visibles dans les documents de référence
            afin de donner une vision concrète du périmètre de formation.
          </p>
        </div>

        <div class="grid gap-4">
          <Card
            v-for="block in program.blocks"
            :key="block.code"
            class="diamond-panel surface-cut"
          >
            <CardHeader>
              <div class="flex flex-wrap items-center gap-2">
                <Badge variant="outline">{{ block.code }}</Badge>
              </div>
              <CardTitle class="text-xl">{{ block.title }}</CardTitle>
            </CardHeader>
            <CardContent class="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
              {{ block.details }}
            </CardContent>
          </Card>
        </div>
      </section>

      <section class="diamond-panel surface-cut rounded-[2rem] p-8 lg:p-10">
        <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div class="space-y-3">
            <p class="kicker">Prise de contact</p>
            <h2 class="text-3xl font-semibold text-foreground">
              Recevoir un rappel pour clarifier votre projet
            </h2>
            <p class="max-w-2xl text-base leading-relaxed text-muted-foreground">
              Le site public s’arrête volontairement aux informations validées. Le formulaire de
              rappel permet d’aller plus loin sans multiplier les parcours.
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
