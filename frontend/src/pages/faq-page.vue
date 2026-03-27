<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowRight, ChevronDown } from 'lucide-vue-next'

import SectionTitle from '@/components/section-title.vue'
import { Button } from '@/components/ui/button'
import { useExperienceVariant } from '@/composables/use-experience-variant'
import { api } from '@/lib/api'
import { motionVariants, staggerEnter } from '@/lib/motion'

const site = ref({
  faq: {}
})
const items = ref([])
const loading = ref(true)

const { toWithExperience } = useExperienceVariant()

onMounted(async () => {
  try {
    const [sitePayload, faqPayload] = await Promise.all([api.getSite(), api.getFaq()])
    site.value = sitePayload
    items.value = faqPayload
  } finally {
    loading.value = false
  }
})

const faqCopy = computed(() => site.value.faq ?? {})
const programLink = computed(() => toWithExperience('/programme'))
const financeLink = computed(() => toWithExperience('/financement'))
const contactLink = computed(() => toWithExperience('/contact'))

const hero = computed(() => ({
  eyebrow: faqCopy.value.hero?.eyebrow ?? 'Étape 4 · FAQ RPMS',
  title: faqCopy.value.hero?.title ?? 'Les questions utiles avant la dernière étape.',
  description:
    faqCopy.value.hero?.description ??
    'Retrouvez les réponses essentielles sur le titre, le programme, le format et le financement.'
}))

const opening = computed(() => ({
  eyebrow: faqCopy.value.opening?.eyebrow ?? 'Étape 4 · Ce que cette page répond',
  title: faqCopy.value.opening?.title ?? 'Des réponses courtes pour continuer sans détour.',
  description:
    faqCopy.value.opening?.description ??
    'La FAQ vous aide à confirmer les points essentiels avant de passer au rappel ou de revenir au programme.',
  bullets: Array.isArray(faqCopy.value.opening?.bullets)
    ? faqCopy.value.opening.bullets
    : [
        'Vérifier le titre, le niveau et le format.',
        'Comprendre les trois blocs et le détail des compétences.',
        "Consulter les informations financières utiles avant d'aller plus loin."
      ]
}))

const closingNote = computed(() => ({
  eyebrow: faqCopy.value.closingNote?.eyebrow ?? 'Étape 5 · Si un point reste ouvert',
  title:
    faqCopy.value.closingNote?.title ??
    'Revenez au programme, au financement ou demandez un rappel',
  description:
    faqCopy.value.closingNote?.description ??
    "Vous gardez ainsi une lecture claire du titre, des compétences et des conditions de l'offre.",
  supportLine:
    faqCopy.value.closingNote?.supportLine ??
    'Un échange peut ensuite vous aider à remettre ces éléments dans votre propre situation.'
}))

const supportTiles = computed(() => [
  {
    label: 'Étape 1 à 3',
    text: 'Le titre d’abord, le programme ensuite, puis le financement si un point reste à éclaircir.'
  },
  {
    label: 'Rester centré',
    text: "Les réponses ci-dessous restent centrées sur le titre professionnel Responsable petite et moyenne structure."
  },
  {
    label: 'Étape 5',
    text: 'Quand la lecture est claire, vous pouvez demander un rappel sans quitter le parcours public.'
  }
])
</script>

<template>
  <div class="space-y-10 sm:space-y-11 lg:space-y-12">
    <p v-if="loading" class="text-sm text-muted-foreground">Chargement de la FAQ…</p>

    <template v-else>
      <section
        class="hero-split page-hero grid gap-6 p-5 sm:p-6 lg:grid-cols-[1.05fr,0.95fr] lg:p-8"
        v-motion
        :initial="motionVariants.block.initial"
        :enter="motionVariants.block.enter"
      >
        <div class="space-y-5">
          <div class="space-y-4">
            <p class="detail-key">Étape 4 · FAQ</p>
            <p class="kicker">{{ hero.eyebrow }}</p>
            <h1 class="editorial-title max-w-4xl text-[clamp(1.75rem,3vw,2.6rem)] text-foreground">
              {{ hero.title }}
            </h1>
            <p class="max-w-3xl text-base leading-8 text-muted-foreground sm:text-[1.02rem]">
              {{ hero.description }}
            </p>
          </div>

          <div class="max-w-2xl rounded-[1rem] border border-border/80 bg-[color:var(--paper-tint)]/65 p-4 sm:p-5">
            <p class="detail-key">Lecture conseillée</p>
            <p class="mt-2 text-sm leading-7 text-foreground">
              La FAQ sert à lever les points de lecture, pas à ajouter de nouveaux arguments.
            </p>
            <p class="mt-2 text-sm leading-7 text-muted-foreground">
              Si une réponse demande plus de contexte, revenez au programme ou au financement.
            </p>
          </div>

          <RouterLink :to="programLink" class="home-inline-link">
            Relire le programme
            <ArrowRight class="h-4 w-4" />
          </RouterLink>
        </div>

        <aside class="sidebar-panel paper-card p-5 sm:p-6">
          <p class="kicker">{{ opening.eyebrow }}</p>
          <h2 class="mt-4 text-[clamp(1.25rem,2vw,1.7rem)] font-semibold tracking-[-0.04em] text-foreground">
            {{ opening.title }}
          </h2>
          <p class="mt-4 text-sm leading-7 text-muted-foreground">
            {{ opening.description }}
          </p>

          <div class="mt-6 grid gap-3">
            <article
              v-for="(bullet, index) in opening.bullets"
              :key="bullet"
              class="support-tile paper-card p-4"
              v-motion
              :initial="motionVariants.pop.initial"
              :enter="staggerEnter(index, 44, 22)"
            >
              <div class="flex items-start gap-3">
                <span class="finance-badge">{{ index + 1 }}</span>
                <p class="text-sm leading-6 text-foreground">{{ bullet }}</p>
              </div>
            </article>
          </div>

          <div class="mt-6 grid gap-3">
            <RouterLink :to="financeLink" class="home-inline-link">
              Aller au financement
              <ArrowRight class="h-4 w-4" />
            </RouterLink>
            <RouterLink :to="contactLink" class="home-inline-link">
              Demander un rappel
              <ArrowRight class="h-4 w-4" />
            </RouterLink>
          </div>
        </aside>
      </section>

      <section class="support-grid grid gap-6 lg:grid-cols-[minmax(0,1.18fr),minmax(0,0.82fr)]">
        <article class="space-y-5">
          <SectionTitle
            eyebrow="Étape 4 · Questions utiles"
            title="Les réponses essentielles avant de passer à l'étape suivante."
            description="Chaque réponse doit aider à vérifier le RPMS, pas à pousser une décision trop vite."
          />

          <div class="grid gap-4">
            <details
              v-for="(item, index) in items"
              :key="item.question"
              class="accordion-card paper-card px-5 py-4 sm:px-6 sm:py-5"
              v-motion
              :initial="motionVariants.block.initial"
              :enter="staggerEnter(index, 40, 18)"
            >
              <summary class="faq-summary">
                <span class="text-base font-semibold leading-6 text-foreground">{{ item.question }}</span>
                <ChevronDown class="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              </summary>
              <p class="mt-4 text-sm leading-7 text-muted-foreground">
                {{ item.answer }}
              </p>
            </details>
          </div>
        </article>

        <aside class="sidebar-panel paper-card p-5 sm:p-6">
          <p class="kicker">Étape 4 · Lire dans le bon ordre</p>
          <h2 class="mt-4 text-[clamp(1.25rem,2vw,1.7rem)] font-semibold tracking-[-0.04em] text-foreground">
            Programme, financement, puis rappel si besoin.
          </h2>

          <div class="mt-6 grid gap-3">
            <article
              v-for="(tile, index) in supportTiles"
              :key="tile.label"
              class="support-tile paper-card p-4"
              v-motion
              :initial="motionVariants.pop.initial"
              :enter="staggerEnter(index, 44, 22)"
            >
              <p class="detail-key">{{ tile.label }}</p>
              <p class="mt-2 text-sm leading-7 text-muted-foreground">
                {{ tile.text }}
              </p>
            </article>
          </div>

          <div class="mt-6 grid gap-3 border-t border-border/70 pt-5">
            <RouterLink :to="contactLink" class="home-inline-link">
              Être rappelé
              <ArrowRight class="h-4 w-4" />
            </RouterLink>
            <RouterLink :to="programLink" class="home-inline-link">
              Voir le programme
              <ArrowRight class="h-4 w-4" />
            </RouterLink>
          </div>
        </aside>
      </section>

      <section class="cta-band arch-cta paper-card p-5 sm:p-6 lg:p-8">
        <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div class="space-y-3">
            <p class="kicker">{{ closingNote.eyebrow }}</p>
            <h2 class="editorial-title max-w-3xl text-[clamp(1.55rem,2.3vw,2.1rem)] text-foreground">
              {{ closingNote.title }}
            </h2>
            <p class="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-[1rem]">
              {{ closingNote.description }}
            </p>
            <p class="max-w-2xl text-sm leading-7 text-muted-foreground">
              {{ closingNote.supportLine }}
            </p>
          </div>

          <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button :as="RouterLink" :to="contactLink" size="lg">
              Être rappelé
              <ArrowRight class="ml-2 h-4 w-4" />
            </Button>
            <Button :as="RouterLink" :to="programLink" size="lg" variant="outline">
              Voir le programme
            </Button>
          </div>
        </div>

        <RouterLink :to="financeLink" class="home-inline-link mt-4">
          Aller vers le financement
          <ArrowRight class="h-4 w-4" />
        </RouterLink>
      </section>
    </template>
  </div>
</template>
