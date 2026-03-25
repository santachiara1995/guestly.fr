<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowRight } from 'lucide-vue-next'

import SectionTitle from '@/components/section-title.vue'
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
  <div class="space-y-8 sm:space-y-10">
    <p v-if="loading" class="text-sm text-muted-foreground">Chargement du programme...</p>

    <section
      v-else-if="errorMessage"
      class="page-cut rounded-[1.25rem] p-6 text-sm text-destructive"
    >
      {{ errorMessage }}
    </section>

    <template v-else-if="program">
      <section class="page-cut space-y-6 rounded-[1.25rem] p-6 sm:p-8 lg:p-10">
        <div class="flex flex-wrap gap-2">
          <Badge>RPMS</Badge>
          <Badge variant="outline">{{ program.rncpCode }}</Badge>
          <Badge variant="outline">{{ program.levelLabel }}</Badge>
          <Badge variant="outline">{{ program.formatLabel }}</Badge>
          <Badge variant="outline">{{ program.rhythmLabel }}</Badge>
        </div>

        <div class="grid gap-6 lg:grid-cols-[1.06fr,0.94fr] lg:items-start">
          <div class="space-y-4">
            <h1 class="editorial-title max-w-4xl text-[clamp(2.4rem,5vw,4.6rem)] text-foreground">
              {{ program.title }}
            </h1>
            <p class="max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {{ program.intro }}
            </p>

            <div class="flex flex-wrap gap-3">
              <RouterLink to="/contact">
                <Button size="lg">
                  Être rappelé
                  <ArrowRight class="ml-2 h-4 w-4" />
                </Button>
              </RouterLink>
              <RouterLink to="/acces-et-accompagnement">
                <Button size="lg" variant="outline">Voir le programme</Button>
              </RouterLink>
            </div>
          </div>

          <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <div class="page-cut rounded-xl p-4">
              <p class="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Modalité
              </p>
              <p class="mt-2 text-lg font-semibold text-foreground">{{ program.formatLabel }}</p>
            </div>
            <div class="page-cut rounded-xl p-4">
              <p class="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Format pédagogique
              </p>
              <p class="mt-2 text-lg font-semibold text-foreground">{{ program.rhythmLabel }}</p>
            </div>
            <div class="page-cut rounded-xl p-4 sm:col-span-2 lg:col-span-1">
              <p class="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Accompagnement
              </p>
              <p class="mt-2 text-lg font-semibold text-foreground">{{ program.supportLabel }}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="grid gap-6 lg:grid-cols-[0.95fr,1.05fr]">
        <Card class="page-cut h-fit">
          <CardHeader>
            <CardTitle>Objectifs pédagogiques</CardTitle>
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
            <CardTitle>Champs de compétences</CardTitle>
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
          title="Structure du programme"
          description="La lecture reprend les blocs visibles dans la fiche officielle."
        />

        <div class="grid gap-4 xl:grid-cols-2">
          <Card
            v-for="block in program.blocks"
            :key="block.code"
            class="page-cut"
          >
            <CardHeader class="space-y-3">
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

      <section class="page-cut rounded-[1.25rem] p-6 sm:p-8 lg:p-10">
        <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div class="space-y-3">
            <p class="kicker">Contact</p>
            <h2 class="editorial-title text-[clamp(2rem,3.3vw,3.2rem)] text-foreground">
              Recevoir un rappel pour clarifier votre demande
            </h2>
            <p class="max-w-2xl text-base leading-relaxed text-muted-foreground">
              Le formulaire de contact prolonge la lecture du programme.
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
              <Button size="lg" variant="outline">Voir le programme</Button>
            </RouterLink>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>
