<script setup>
import { computed, onMounted, ref } from 'vue'
import { ChevronDown } from 'lucide-vue-next'

import PrefooterCtaPanel from '@/components/shared/prefooter-cta-panel.vue'
import { api } from '@/lib/api'
import { motionVariants, staggerEnter } from '@/lib/motion'

const site = ref({
  faq: {}
})
const items = ref([])
const loading = ref(true)

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

const hero = computed(() => ({
  eyebrow: faqCopy.value.hero?.eyebrow ?? 'FAQ RPMS',
  title: faqCopy.value.hero?.title ?? 'Les réponses utiles avant de choisir le RPMS.',
  description:
    faqCopy.value.hero?.description ??
    'En cinq questions, vérifiez le titre, le programme, le format et le financement, puis avancez si le RPMS correspond à votre projet.'
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

        <PrefooterCtaPanel />
      </section>
    </template>
  </div>
</template>
