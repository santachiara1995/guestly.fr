<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { CheckCircle2, PhoneCall, ShieldCheck } from 'lucide-vue-next'

import SectionTitle from '@/components/section-title.vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { api } from '@/lib/api'
import { motionVariants, staggerEnter } from '@/lib/motion'

const site = ref({
  access: {
    intro:
      "Consultez le cadre du parcours, le format à distance et les points utiles à vérifier avant votre demande de rappel."
  }
})
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
const quickFacts = computed(() =>
  [
    { label: 'Titre', value: program.value?.title },
    { label: 'Niveau', value: program.value?.levelLabel },
    { label: 'Modalité', value: program.value?.formatLabel },
    { label: 'Format', value: program.value?.rhythmLabel },
    { label: 'Accompagnement', value: program.value?.supportLabel }
  ].filter((item) => item.value)
)
</script>

<template>
  <div class="space-y-10 sm:space-y-12">
    <section class="page-cut rounded-[1.5rem] p-6 sm:p-8 lg:p-10">
      <div class="grid gap-6 lg:grid-cols-[1.02fr,0.98fr]">
        <div class="space-y-4">
          <p class="kicker">Accès et accompagnement</p>
          <h1 class="editorial-title max-w-3xl text-[clamp(2.4rem,5vw,4.5rem)] text-foreground">
            Un cadre clair avant votre demande de rappel
          </h1>
          <p class="max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {{ site.access?.intro }}
          </p>
          <p class="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Vous retrouvez ici les informations utiles pour vérifier le format du parcours et la
            nature de l'accompagnement annoncé.
          </p>
        </div>

        <div class="grid gap-3">
          <Card class="page-cut">
            <CardHeader>
              <div class="flex items-center gap-2">
                <CheckCircle2 class="h-5 w-5 text-primary" />
                <CardTitle>Informations du parcours</CardTitle>
              </div>
            </CardHeader>
            <CardContent class="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p v-for="item in quickFacts" :key="item.label">
                <strong class="text-foreground">{{ item.label }} :</strong> {{ item.value }}
              </p>
            </CardContent>
          </Card>

          <Card class="page-cut">
            <CardHeader>
              <div class="flex items-center gap-2">
                <ShieldCheck class="h-5 w-5 text-primary" />
                <CardTitle>Format annoncé</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul class="space-y-3 text-sm leading-relaxed text-muted-foreground">
                <li v-for="item in supportPoints" :key="item" class="flex gap-3">
                  <span class="mt-1 h-2.5 w-2.5 rounded-full bg-secondary"></span>
                  <span>{{ item }}</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <section class="space-y-8">
      <SectionTitle
        eyebrow="Avant le contact"
        title="Ce que vous pouvez vérifier rapidement"
        description="Cette page vous aide à qualifier votre besoin avant de demander un rappel."
      />

      <div class="grid gap-4 md:grid-cols-3">
        <Card
          v-for="(item, index) in expectations"
          :key="item"
          class="page-cut"
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
        eyebrow="Démarche"
        title="Comment se passe la prise de contact"
        description="Le parcours de visite reste volontairement court pour aller de l'information utile à l'échange."
      />

      <div class="grid gap-4 md:grid-cols-3">
        <Card
          v-for="(step, index) in processSteps"
          :key="step"
          class="page-cut"
          v-motion
          :initial="motionVariants.block.initial"
          :enter="staggerEnter(index, 80, 80)"
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

    <section class="page-cut rounded-[1.5rem] p-6 sm:p-8 lg:p-10">
      <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div class="space-y-3">
          <p class="kicker">Contact</p>
          <h2 class="editorial-title text-[clamp(2rem,3.3vw,3.2rem)] text-foreground">
            Demander un rappel pour faire le point
          </h2>
          <p class="max-w-2xl text-base leading-relaxed text-muted-foreground">
            Si vous souhaitez vérifier l'adéquation du RPMS à votre projet, vous pouvez demander
            un rappel directement depuis le site.
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

    <p v-if="loading" class="text-sm text-muted-foreground">Chargement du contenu...</p>
  </div>
</template>
