<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import {
  ArrowRight,
  BookOpenCheck,
  Building2,
  GraduationCap,
  ShieldCheck,
  Waypoints
} from 'lucide-vue-next'

import SectionTitle from '@/components/section-title.vue'
import ImpactStat from '@/components/visual/impact-stat.vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { api } from '@/lib/api'
import { motionVariants, staggerEnter } from '@/lib/motion'

const program = ref(null)
const site = ref({
  positioning: {
    eyebrow: 'Titre professionnel à distance',
    subtitle:
      "CITYZ'France présente le titre professionnel Responsable petite et moyenne structure (RPMS) pour des particuliers. La page publique rassemble les repères essentiels avant une demande de rappel."
  }
})
const loading = ref(true)
const errorMessage = ref('')

onMounted(async () => {
  try {
    const [programPayload, sitePayload] = await Promise.all([
      api.getProgram('rpms'),
      api.getSite()
    ])
    program.value = programPayload
    site.value = sitePayload
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Contenu indisponible.'
  } finally {
    loading.value = false
  }
})

const heroEyebrow = computed(() => site.value.positioning?.eyebrow ?? 'Titre professionnel à distance')
const heroSubtitle = computed(
  () =>
    site.value.positioning?.subtitle ??
    "CITYZ'France présente le titre professionnel Responsable petite et moyenne structure (RPMS) pour des particuliers."
)

const proofItems = computed(() => [
  {
    value: program.value?.rncpCode ?? 'RNCP38575',
    label: 'Référentiel',
    note: 'Titre professionnel'
  },
  {
    value: program.value?.levelLabel ?? 'Niveau 5',
    label: 'Positionnement',
    note: 'Bac+2'
  },
  {
    value: program.value?.formatLabel ?? '100 % distanciel',
    label: 'Modalité',
    note: program.value?.supportLabel ?? 'E-learning'
  }
])

const routeCards = computed(() => [
  {
    icon: BookOpenCheck,
    title: 'Programme',
    text: 'Lire la structure du RPMS, le niveau attendu et les blocs de compétences.',
    to: '/programme'
  },
  {
    icon: Building2,
    title: 'Accès et accompagnement',
    text: 'Comprendre le cadre pédagogique et l’accompagnement présenté sur le site.',
    to: '/acces-et-accompagnement'
  },
  {
    icon: ShieldCheck,
    title: 'FAQ',
    text: 'Consulter les réponses publiques déjà stabilisées sur le RPMS.',
    to: '/faq'
  },
  {
    icon: Waypoints,
    title: 'Contact',
    text: 'Demander un rappel via le formulaire du site public.',
    to: '/contact'
  }
])

const competencyCards = computed(() => [
  {
    icon: GraduationCap,
    title: 'Piloter une activité',
    text: 'Structurer le suivi, la performance et l’organisation courante.'
  },
  {
    icon: BookOpenCheck,
    title: 'Manager une équipe',
    text: 'Animer le travail collectif et soutenir les dynamiques de coordination.'
  },
  {
    icon: Building2,
    title: 'Organiser les opérations',
    text: 'Sécuriser les processus, la qualité et le suivi de l’activité.'
  },
  {
    icon: ShieldCheck,
    title: 'Développer et reporting',
    text: 'Relier l’offre, la communication utile et la lecture des résultats.'
  }
])

const summaryCards = computed(() => [
  { label: 'Niveau', value: program.value?.levelLabel },
  { label: 'Modalité', value: program.value?.formatLabel },
  { label: 'Format', value: program.value?.rhythmLabel },
  { label: 'Accompagnement', value: program.value?.supportLabel }
].filter((item) => item.value))
</script>

<template>
  <div class="space-y-14 lg:space-y-16">
    <section
      class="grid gap-8 lg:grid-cols-[1.04fr,0.96fr] lg:items-start"
      v-motion
      :initial="motionVariants.block.initial"
      :enter="motionVariants.block.enter"
    >
      <div class="space-y-6">
        <p class="kicker">{{ heroEyebrow }}</p>
        <div class="space-y-4">
          <h1 class="editorial-title max-w-4xl text-4xl text-foreground sm:text-5xl lg:text-6xl">
            Titre professionnel Responsable petite et moyenne structure (RPMS)
          </h1>
          <p class="max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {{ heroSubtitle }}
          </p>
        </div>

        <div class="flex flex-wrap gap-3">
          <RouterLink to="/contact">
            <Button size="lg">
              Être rappelé
              <ArrowRight class="ml-2 h-4 w-4" />
            </Button>
          </RouterLink>
          <RouterLink to="/programme">
            <Button size="lg" variant="outline">Voir le programme</Button>
          </RouterLink>
        </div>

        <div class="flex flex-wrap gap-2">
          <span
            v-for="item in ['RPMS', 'RNCP38575', 'Niveau 5', '100 % distanciel', 'E-learning', 'accompagnement pédagogique']"
            :key="item"
            class="rounded-full border border-border bg-white px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground"
          >
            {{ item }}
          </span>
        </div>

        <p
          v-if="errorMessage"
          class="rounded-2xl border border-destructive/20 bg-destructive/6 px-4 py-3 text-sm text-destructive"
        >
          {{ errorMessage }}
        </p>
      </div>

      <div class="grid gap-3">
        <div
          v-for="(item, index) in proofItems"
          :key="item.label"
          v-motion
          :initial="motionVariants.pop.initial"
          :enter="staggerEnter(index, 70, 90)"
        >
          <ImpactStat :value="item.value" :label="item.label" :note="item.note" />
        </div>

        <Card class="panel-shell">
          <CardHeader class="space-y-3">
            <p class="kicker">Lecture rapide</p>
            <CardTitle class="text-xl">Un seul programme, quatre repères essentiels</CardTitle>
          </CardHeader>
          <CardContent class="space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>Le programme est présenté autour du niveau, de la modalité, du format et de l’accompagnement pédagogique.</p>
            <div class="grid gap-2 sm:grid-cols-2">
              <div
                v-for="item in summaryCards"
                :key="item.label"
                class="rounded-2xl border border-border bg-background/50 px-4 py-3"
              >
                <p class="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {{ item.label }}
                </p>
                <p class="mt-1 text-sm font-semibold text-foreground">
                  {{ item.value }}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>

    <section class="space-y-8">
      <SectionTitle
        eyebrow="Navigation"
        title="Les pages publiques sont séparées par rôle"
        description="L’accueil oriente vers les pages de programme, d’accès, de FAQ et de contact sans répéter le même bloc d’information partout."
      />

      <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <RouterLink
          v-for="(item, index) in routeCards"
          :key="item.to"
          :to="item.to"
          class="group block h-full"
          v-motion
          :initial="motionVariants.block.initial"
          :enter="staggerEnter(index, 70, 70)"
        >
          <Card class="h-full panel-shell">
            <CardHeader class="space-y-3">
              <component :is="item.icon" class="h-6 w-6 text-primary" />
              <CardTitle class="text-lg">{{ item.title }}</CardTitle>
            </CardHeader>
            <CardContent class="space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>{{ item.text }}</p>
              <span class="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                Voir la page
                <ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </CardContent>
          </Card>
        </RouterLink>
      </div>
    </section>

    <section class="space-y-8">
      <SectionTitle
        eyebrow="Compétences"
        title="Le RPMS se lit à travers un noyau de pilotage, d’équipe et d’organisation"
        description="La page publique reste sobre et centrée sur la structure de compétences attendue pour le RPMS."
      />

      <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card
          v-for="(item, index) in competencyCards"
          :key="item.title"
          class="panel-shell"
          v-motion
          :initial="motionVariants.block.initial"
          :enter="staggerEnter(index, 70, 70)"
        >
          <CardHeader>
            <component :is="item.icon" class="mb-2 h-6 w-6 text-primary" />
            <CardTitle class="text-lg">{{ item.title }}</CardTitle>
          </CardHeader>
          <CardContent class="text-sm leading-relaxed text-muted-foreground">
            {{ item.text }}
          </CardContent>
        </Card>
      </div>
    </section>

    <section class="grid gap-6 lg:grid-cols-[0.88fr,1.12fr]">
      <div class="space-y-6">
        <SectionTitle
          eyebrow="Repères"
          title="Les informations essentielles restent visibles sans surcharge"
          description="RNCP38575, niveau 5, distanciel, e-learning et accompagnement pédagogique sont les points d’ancrage du site public."
        />

        <Card class="panel-shell">
          <CardHeader>
            <CardTitle class="text-lg">Ce que le site met en avant</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="grid gap-3">
              <div
                v-for="item in [
                  'RNCP38575',
                  'Niveau 5 / Bac+2',
                  '100 % distanciel',
                  'E-learning',
                  'Accompagnement pédagogique'
                ]"
                :key="item"
                class="rounded-2xl border border-border bg-background/50 px-4 py-3 text-sm font-semibold text-foreground"
              >
                {{ item }}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div class="space-y-4">
        <article
          v-for="(block, index) in program?.blocks ?? []"
          :key="block.code"
          class="panel-shell rounded-[1.5rem] p-5 sm:p-6"
          v-motion
          :initial="motionVariants.block.initial"
          :enter="staggerEnter(index, 55, 80)"
        >
          <div class="flex flex-wrap items-center gap-2">
            <span class="kicker">{{ block.code }}</span>
          </div>
          <h3 class="mt-3 text-xl font-semibold text-foreground">{{ block.title }}</h3>
          <p class="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
            {{ block.details }}
          </p>
        </article>
      </div>
    </section>

    <section class="panel-shell rounded-[2rem] p-8 lg:p-10">
      <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div class="space-y-3">
          <p class="kicker">Contact</p>
          <h2 class="text-3xl font-semibold text-foreground sm:text-4xl">
            Demander un rappel pour aller plus loin
          </h2>
          <p class="max-w-2xl text-base leading-relaxed text-muted-foreground">
            Le formulaire de contact permet de poser une question ou de demander un rappel à partir des repères publiés sur le site.
          </p>
        </div>

        <div class="flex flex-wrap gap-3">
          <RouterLink to="/contact">
            <Button size="lg">
              Être rappelé
              <ArrowRight class="ml-2 h-4 w-4" />
            </Button>
          </RouterLink>
          <RouterLink to="/programme">
            <Button size="lg" variant="outline">Voir le programme</Button>
          </RouterLink>
        </div>
      </div>
    </section>

    <p v-if="loading" class="text-sm text-muted-foreground">Actualisation du contenu…</p>
  </div>
</template>
