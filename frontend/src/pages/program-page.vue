<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowRight } from 'lucide-vue-next'

import SectionTitle from '@/components/section-title.vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
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
  <div class="space-y-10">
    <p v-if="loading" class="text-sm text-muted-foreground">Chargement du programme...</p>

    <p
      v-else-if="errorMessage"
      class="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive"
    >
      {{ errorMessage }}
    </p>

    <template v-else-if="program">
      <section class="architectural-band grid gap-8 p-8 lg:grid-cols-[1.04fr,0.96fr] lg:p-12">
        <div class="space-y-5">
          <div class="flex flex-wrap items-center gap-2">
            <Badge>RPMS</Badge>
            <Badge variant="outline">{{ program.rncpCode }}</Badge>
            <Badge variant="outline">{{ program.levelLabel }}</Badge>
          </div>

          <h1 class="editorial-title max-w-2xl text-4xl text-foreground sm:text-5xl">
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
              <Button size="lg" variant="outline">Accès et accompagnement</Button>
            </RouterLink>
          </div>
        </div>

        <article class="monument-panel surface-cut p-6">
          <p class="kicker">Repères du programme</p>
          <div class="detail-grid mt-4">
            <div class="detail-row">
              <p class="detail-key">RNCP</p>
              <p class="detail-value">{{ program.rncpCode }}</p>
            </div>
            <div class="detail-row">
              <p class="detail-key">Niveau</p>
              <p class="detail-value">{{ program.levelLabel }}</p>
            </div>
            <div class="detail-row">
              <p class="detail-key">Modalité</p>
              <p class="detail-value">{{ program.formatLabel }}</p>
            </div>
            <div class="detail-row">
              <p class="detail-key">Format</p>
              <p class="detail-value">{{ program.rhythmLabel }}</p>
            </div>
            <div class="detail-row">
              <p class="detail-key">Accompagnement</p>
              <p class="detail-value">{{ program.supportLabel }}</p>
            </div>
          </div>
        </article>
      </section>

      <section class="section-shell grid gap-6 lg:grid-cols-[0.92fr,1.08fr]">
        <article class="monument-panel surface-cut p-6">
          <SectionTitle
            eyebrow="Objectifs"
            title="Une lecture simple du périmètre attendu"
            description="La présentation publique met en avant les finalités pédagogiques du RPMS sans multiplier les digressions."
          />

          <div class="mt-5 detail-grid">
            <div
              v-for="item in program.objectiveSummary"
              :key="item"
              class="detail-row"
            >
              <p class="detail-key">Objectif</p>
              <p class="detail-value">{{ item }}</p>
            </div>
          </div>
        </article>

        <article class="monument-panel surface-cut p-6">
          <SectionTitle
            eyebrow="Compétences"
            title="Les champs de travail restent lisibles"
            description="Le contenu public conserve la forme d’un socle de compétences plutôt qu’un empilement de cartes."
          />

          <div class="mt-5 grid gap-3 sm:grid-cols-2">
            <div
              v-for="scope in program.professionalScope"
              :key="scope"
              class="rounded-2xl border border-border/70 bg-white/84 px-4 py-3 text-sm leading-relaxed text-foreground"
            >
              {{ scope }}
            </div>
          </div>
        </article>
      </section>

      <section class="section-shell space-y-8">
        <SectionTitle
          eyebrow="Blocs de compétences"
          title="Structure du programme"
          description="Chaque bloc est présenté dans une séquence continue pour garder une lecture fluide sur mobile."
        />

        <article class="monument-panel surface-cut p-0">
          <div class="divide-y divide-border/70">
            <div
              v-for="block in program.blocks"
              :key="block.code"
              class="space-y-3 px-6 py-5"
            >
              <Badge variant="outline">{{ block.code }}</Badge>
              <h3 class="text-xl font-semibold text-foreground">{{ block.title }}</h3>
              <p class="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                {{ block.details }}
              </p>
            </div>
          </div>
        </article>
      </section>

      <section class="arch-cta p-8 lg:p-10">
        <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div class="space-y-3">
            <p class="kicker">Prise de contact</p>
            <h2 class="text-3xl font-semibold sm:text-4xl">
              Recevoir un rappel pour clarifier votre projet
            </h2>
            <p class="max-w-2xl text-base leading-relaxed text-muted-foreground">
              Le formulaire de contact concentre la demande autour du RPMS et permet de poursuivre l’échange à partir du cadre publié.
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
