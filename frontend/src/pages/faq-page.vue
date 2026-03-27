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
</script>

<template>
  <div class="space-y-12 sm:space-y-14 lg:space-y-16">
    <p v-if="loading" class="text-sm text-muted-foreground">Chargement de la FAQ…</p>

    <template v-else>
      <section
        class="page-hero grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.04fr,0.96fr] lg:p-10"
        v-motion
        :initial="motionVariants.block.initial"
        :enter="motionVariants.block.enter"
      >
        <div class="space-y-4">
          <p class="kicker">{{ faqCopy.hero?.eyebrow }}</p>
          <h1 class="editorial-title max-w-4xl text-[clamp(2rem,4vw,3.55rem)] text-foreground">
            {{ faqCopy.hero?.title }}
          </h1>
          <p class="max-w-3xl text-base leading-8 text-muted-foreground sm:text-[1.02rem]">
            {{ faqCopy.hero?.description }}
          </p>
        </div>

        <aside class="trust-panel page-cut p-6 sm:p-7">
          <p class="kicker">{{ faqCopy.opening?.eyebrow }}</p>
          <h2 class="mt-4 text-[clamp(1.5rem,3vw,2.05rem)] font-semibold tracking-[-0.04em] text-foreground">
            {{ faqCopy.opening?.title }}
          </h2>
          <p class="mt-4 text-sm leading-7 text-muted-foreground">
            {{ faqCopy.opening?.description }}
          </p>

          <div class="mt-6 grid gap-3">
            <article
              v-for="(item, index) in faqCopy.opening?.bullets ?? []"
              :key="item"
              class="elevated-item rounded-[1rem] p-4"
              v-motion
              :initial="motionVariants.pop.initial"
              :enter="staggerEnter(index, 48, 24)"
            >
              <div class="flex items-start gap-3">
                <span class="finance-line" aria-hidden="true"></span>
                <p class="text-sm leading-6 text-foreground">{{ item }}</p>
              </div>
            </article>
          </div>
        </aside>
      </section>

      <section class="space-y-6">
        <SectionTitle
          eyebrow="Questions à lire"
          title="Les réponses essentielles sur le titre, le programme et le financement."
          description="Chaque réponse doit vous aider à avancer avec plus de clarté et moins d’incertitude."
        />

        <div class="grid gap-4">
          <details
            v-for="(item, index) in items"
            :key="item.question"
            class="page-cut px-5 py-4 sm:px-6"
            v-motion
            :initial="motionVariants.block.initial"
            :enter="staggerEnter(index, 40, 20)"
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
      </section>

      <section class="arch-cta p-6 sm:p-8 lg:p-10">
        <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div class="space-y-3">
            <p class="kicker">{{ faqCopy.closingNote?.eyebrow }}</p>
            <h2 class="editorial-title max-w-3xl text-[clamp(1.9rem,3vw,2.75rem)] text-foreground">
              {{ faqCopy.closingNote?.title }}
            </h2>
            <p class="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-[1rem]">
              {{ faqCopy.closingNote?.description }}
            </p>
            <p class="max-w-2xl text-sm leading-7 text-muted-foreground">
              {{ faqCopy.closingNote?.supportLine }}
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

        <RouterLink
          :to="financeLink"
          class="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:text-secondary hover:underline"
        >
          Aller vers le financement
        </RouterLink>
      </section>
    </template>
  </div>
</template>
