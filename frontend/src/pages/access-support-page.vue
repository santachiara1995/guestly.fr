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
    <section class="page-cut rounded-[1.25rem] p-6 sm:p-8 lg:p-10">
      <div class="grid gap-6 lg:grid-cols-[1.02fr,0.98fr]">
        <div class="space-y-4">
          <p class="kicker">Accès et accompagnement</p>
          <h1 class="editorial-title max-w-3xl text-[clamp(2.4rem,5vw,4.5rem)] text-foreground">
            Un cadre pédagogique posé avant le reste
          </h1>
          <p class="max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {{ site.access?.intro }}
          </p>
          <p class="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Le site expose le cadre du parcours, l'accompagnement pédagogique et le point de
            contact associé au programme RPMS.
          </p>
        </div>

        <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <Card class="page-cut">
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

          <Card class="page-cut">
            <CardHeader>
              <div class="flex items-center gap-2">
                <ShieldCheck class="h-5 w-5 text-primary" />
                <CardTitle>Repères pratiques</CardTitle>
              </div>
            </CardHeader>
            <CardContent class="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p v-for="item in supportPoints" :key="item">{{ item }}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <section class="space-y-8">
      <SectionTitle
        eyebrow="Repères"
        title="Ce que le visiteur doit comprendre rapidement"
        description="Les attentes restent volontairement limitées à des repères de lecture."
      />

      <div class="grid gap-4 md:grid-cols-3">
        <Card
          v-for="(item, index) in expectations"
          :key="item"
          class="page-cut"
          v-motion
          :initial="motionVariants.block.initial"
          :enter="staggerEnter(index, 95, 80)"
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
        title="Le chemin de lecture reste court"
        description="Trois étapes suffisent pour passer de la découverte à la prise de contact."
      />

      <div class="grid gap-4 md:grid-cols-3">
        <Card
          v-for="(step, index) in processSteps"
          :key="step"
          class="page-cut"
          v-motion
          :initial="motionVariants.block.initial"
          :enter="staggerEnter(index, 100, 90)"
        >
          <CardHeader>
            <div class="flex items-center gap-2">
              <span
                class="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground"
              >
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

    <section class="page-cut rounded-[1.25rem] p-6 sm:p-8 lg:p-10">
      <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div class="space-y-3">
          <p class="kicker">Contact</p>
          <h2 class="editorial-title text-[clamp(2rem,3.3vw,3.2rem)] text-foreground">
            La suite passe par un rappel
          </h2>
          <p class="max-w-2xl text-base leading-relaxed text-muted-foreground">
            Le formulaire centralise la demande autour du programme RPMS.
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
