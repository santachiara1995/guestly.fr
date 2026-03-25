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
  <div class="space-y-8 lg:space-y-10">
    <p v-if="loading" class="text-sm text-muted-foreground">Chargement du programme...</p>

    <p
      v-else-if="errorMessage"
      class="rounded-2xl border border-destructive/20 bg-destructive/6 px-4 py-3 text-sm text-destructive"
    >
      {{ errorMessage }}
    </p>

    <template v-else-if="program">
      <section class="grid gap-8 lg:grid-cols-[1.08fr,0.92fr] lg:items-start">
        <div class="space-y-5">
          <div class="flex flex-wrap items-center gap-2">
            <Badge>RPMS</Badge>
            <Badge variant="outline">{{ program.rncpCode }}</Badge>
            <Badge variant="outline">{{ program.levelLabel }}</Badge>
          </div>

          <div class="space-y-4">
            <h1 class="editorial-title max-w-4xl text-4xl text-foreground sm:text-5xl lg:text-6xl">
              {{ program.title }}
            </h1>

            <p class="max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {{ program.intro }}
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

        <div class="grid gap-3">
          <Card class="panel-shell">
            <CardHeader>
              <CardTitle class="text-lg">Lecture rapide</CardTitle>
            </CardHeader>
            <CardContent class="grid gap-3">
              <div class="rounded-2xl border border-border bg-background/50 px-4 py-3">
                <p class="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Modalité
                </p>
                <p class="mt-1 text-sm font-semibold text-foreground">{{ program.formatLabel }}</p>
              </div>
              <div class="rounded-2xl border border-border bg-background/50 px-4 py-3">
                <p class="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Format pédagogique
                </p>
                <p class="mt-1 text-sm font-semibold text-foreground">{{ program.rhythmLabel }}</p>
              </div>
              <div class="rounded-2xl border border-border bg-background/50 px-4 py-3">
                <p class="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Accompagnement
                </p>
                <p class="mt-1 text-sm font-semibold text-foreground">{{ program.supportLabel }}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section class="grid gap-5 lg:grid-cols-[0.94fr,1.06fr]">
        <Card class="panel-shell h-fit">
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

        <Card class="panel-shell h-fit">
          <CardHeader>
            <CardTitle>Champ de compétences</CardTitle>
          </CardHeader>
          <CardContent>
            <ul class="grid gap-3 text-sm leading-relaxed text-muted-foreground sm:grid-cols-2">
              <li
                v-for="scope in program.professionalScope"
                :key="scope"
                class="rounded-2xl border border-border bg-background/50 px-4 py-3"
              >
                {{ scope }}
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section class="space-y-6">
        <div class="space-y-3">
          <p class="kicker">Blocs de compétences</p>
          <h2 class="text-3xl font-semibold text-foreground">Structure du programme</h2>
          <p class="max-w-3xl text-base leading-relaxed text-muted-foreground">
            La présentation publique reprend les grands blocs visibles dans les documents de référence pour donner une vue concrète du périmètre de la formation.
          </p>
        </div>

        <div class="grid gap-4">
          <Card
            v-for="block in program.blocks"
            :key="block.code"
            class="panel-shell"
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

      <section class="panel-shell rounded-[2rem] p-8 lg:p-10">
        <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div class="space-y-3">
            <p class="kicker">Contact</p>
            <h2 class="text-3xl font-semibold text-foreground sm:text-4xl">
              Demander un rappel pour préciser votre projet
            </h2>
            <p class="max-w-2xl text-base leading-relaxed text-muted-foreground">
              Le site public reste centré sur les repères stabilisés. Le formulaire de rappel permet d’aller vers un échange direct à partir de ces informations.
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
