<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { CheckCircle2, PhoneCall, ShieldCheck } from 'lucide-vue-next'

import SectionTitle from '@/components/section-title.vue'
import { Button } from '@/components/ui/button'
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
    <section class="architectural-band grid gap-8 p-8 lg:grid-cols-[1.05fr,0.95fr] lg:p-12">
      <div class="space-y-4">
        <p class="kicker">Accès et accompagnement</p>
        <h1 class="editorial-title max-w-2xl text-4xl text-foreground sm:text-5xl">
          Un cadre pédagogique présenté avant toute promesse
        </h1>
        <p class="max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {{ site.access?.intro }}
        </p>
      </div>

      <article class="monument-panel surface-cut p-6">
        <div class="flex items-center gap-2">
          <CheckCircle2 class="h-5 w-5 text-primary" />
          <h2 class="text-2xl font-semibold text-foreground">Repères de travail</h2>
        </div>

        <div class="detail-grid mt-4">
          <div class="detail-row">
            <p class="detail-key">Titre</p>
            <p class="detail-value">{{ program?.title }}</p>
          </div>
          <div class="detail-row">
            <p class="detail-key">Niveau</p>
            <p class="detail-value">{{ program?.levelLabel }}</p>
          </div>
          <div class="detail-row">
            <p class="detail-key">Modalité</p>
            <p class="detail-value">{{ program?.formatLabel }}</p>
          </div>
          <div class="detail-row">
            <p class="detail-key">Format</p>
            <p class="detail-value">{{ program?.rhythmLabel }}</p>
          </div>
          <div class="detail-row">
            <p class="detail-key">Accompagnement</p>
            <p class="detail-value">{{ program?.supportLabel }}</p>
          </div>
        </div>
      </article>
    </section>

    <section class="section-shell grid gap-6 lg:grid-cols-[1fr,0.95fr]">
      <article class="monument-panel surface-cut p-6">
        <div class="flex items-center gap-2">
          <ShieldCheck class="h-5 w-5 text-primary" />
          <h2 class="text-2xl font-semibold text-foreground">Ce que la page retient</h2>
        </div>

        <div class="mt-5 grid gap-0">
          <div
            v-for="(item, index) in supportPoints"
            :key="item"
            class="grid gap-4 border-t border-border/70 py-4 first:border-t-0 first:pt-0 sm:grid-cols-[auto,1fr]"
            v-motion
            :initial="motionVariants.block.initial"
            :enter="staggerEnter(index, 90, 70)"
          >
            <span class="mt-1 h-2.5 w-2.5 rounded-full bg-secondary"></span>
            <p class="text-sm leading-relaxed text-muted-foreground">{{ item }}</p>
          </div>
        </div>
      </article>

      <article class="monument-panel surface-cut p-6">
        <SectionTitle
          eyebrow="Pour qui"
          title="Des repères lisibles pour des particuliers"
          description="Le site garde une forme claire et directe pour que le programme soit compris avant tout échange."
        />

        <div class="mt-5 grid gap-0">
          <div
            v-for="(item, index) in expectations"
            :key="item"
            class="timeline-row px-0"
            v-motion
            :initial="motionVariants.block.initial"
            :enter="staggerEnter(index, 90, 90)"
          >
            <span class="timeline-index">{{ String(index + 1).padStart(2, '0') }}</span>
            <p class="timeline-text mt-0">{{ item }}</p>
          </div>
        </div>
      </article>
    </section>

    <section class="section-shell space-y-8">
      <SectionTitle
        eyebrow="Séquence"
        title="Un parcours volontairement simple"
        description="La progression reste lisible du premier écran jusqu’au rappel."
      />

      <div class="timeline-shell">
        <div
          v-for="(step, index) in processSteps"
          :key="step"
          class="timeline-row"
          v-motion
          :initial="motionVariants.block.initial"
          :enter="staggerEnter(index, 100, 80)"
        >
          <span class="timeline-index">{{ String(index + 1).padStart(2, '0') }}</span>
          <div>
            <h3 class="timeline-title">Étape {{ index + 1 }}</h3>
            <p class="timeline-text">{{ step }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="arch-cta p-8 lg:p-10">
      <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div class="space-y-3">
          <p class="kicker">Contact</p>
          <h2 class="text-3xl font-semibold sm:text-4xl">
            La suite du parcours passe par un rappel unique
          </h2>
          <p class="max-w-2xl text-base leading-relaxed text-muted-foreground">
            Le formulaire de contact permet de centraliser la demande autour du programme RPMS.
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
