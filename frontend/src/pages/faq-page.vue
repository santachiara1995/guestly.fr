<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowRight, ChevronDown } from 'lucide-vue-next'

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
  eyebrow: faqCopy.value.hero?.eyebrow ?? 'FAQ RPMS',
  title: faqCopy.value.hero?.title ?? 'Les réponses utiles avant de choisir le RPMS.',
  description:
    faqCopy.value.hero?.description ??
    'En cinq questions, vérifiez le titre, le programme, le format et le financement, puis avancez si le RPMS correspond à votre projet.'
}))

const closingNote = computed(() => ({
  eyebrow: faqCopy.value.closingNote?.eyebrow ?? 'Choisissez la suite utile',
  title: faqCopy.value.closingNote?.title ?? 'Passez à la page qui vous fait avancer.',
  description:
    faqCopy.value.closingNote?.description ??
    "Programme pour le détail des compétences, Financement pour les conditions de l'offre, Contact pour faire le point."
}))

const topItems = computed(() => items.value.slice(0, 5))
</script>

<template>
  <div class="page-stack">
    <p v-if="loading" class="text-sm text-muted-foreground">Chargement de la FAQ…</p>

    <template v-else>
      <section
        class="page-shell space-y-6"
        v-motion
        :initial="motionVariants.block.initial"
        :enter="motionVariants.block.enter"
      >
        <article class="page-hero p-5 sm:p-6 lg:p-7">
          <div class="mx-auto max-w-3xl space-y-4 text-center">
            <p class="kicker">{{ hero.eyebrow }}</p>
            <h1 class="editorial-title text-[clamp(1.75rem,3vw,2.6rem)] text-foreground">
              {{ hero.title }}
            </h1>
            <p class="text-base leading-8 text-muted-foreground sm:text-[1.02rem]">
              {{ hero.description }}
            </p>
          </div>
        </article>

        <div class="mx-auto grid max-w-4xl gap-4">
          <details
            v-for="(item, index) in topItems"
            :key="item.question"
            class="accordion-card paper-card px-5 py-4 sm:px-6 sm:py-5"
            v-motion
            :initial="motionVariants.block.initial"
            :enter="staggerEnter(index, 40, 18)"
          >
            <summary class="faq-summary accordion-summary">
              <span class="text-base font-semibold leading-6 text-foreground">{{ item.question }}</span>
              <ChevronDown class="accordion-summary__icon mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
            </summary>
            <p class="accordion-panel">
              {{ item.answer }}
            </p>
          </details>
        </div>

        <div class="page-cut paper-card flex flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
          <div class="space-y-3">
            <p class="kicker">{{ closingNote.eyebrow }}</p>
            <h2 class="text-[clamp(1.28rem,2vw,1.72rem)] font-semibold tracking-[-0.04em] text-foreground">
              {{ closingNote.title }}
            </h2>
            <p class="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-[1rem]">
              {{ closingNote.description }}
            </p>
          </div>

          <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button :as="RouterLink" :to="programLink" size="lg" variant="outline">
              Voir le programme
            </Button>
            <Button :as="RouterLink" :to="financeLink" size="lg" variant="outline">
              Voir le financement
            </Button>
            <Button :as="RouterLink" :to="contactLink" size="lg">
              Être rappelé
              <ArrowRight class="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>
