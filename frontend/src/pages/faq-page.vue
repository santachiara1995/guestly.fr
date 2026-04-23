<script setup>
import { computed, ref } from 'vue'
import { ChevronDown } from 'lucide-vue-next'

import PrefooterCtaPanel from '@/components/shared/prefooter-cta-panel.vue'
import { motionVariants, staggerEnter } from '@/lib/motion'

const site = ref({
  faq: {}
})
const items = ref([
  { question: 'Peut-on vraiment obtenir un Bac+2 sans avoir le Bac ?', answer: 'Oui. Le Titre Professionnel RPMS est délivré par le Ministère du Travail et ne nécessite pas le Baccalauréat.' },
  { question: 'Puis-je suivre la formation tout en gardant mon emploi ?', answer: 'Oui. Le format est 100 % à distance, en asynchrone.' },
  { question: "Comment se déroule l'examen final ?", answer: "L'examen dure 1h35 au total : présentation, entretien technique, entretien final." },
  { question: 'Quelle différence entre le RPMS et un BTS Management ?', answer: 'Les deux délivrent un Bac+2, mais le RPMS est plus court, professionnel et accessible sans Bac.' },
  { question: 'Combien de temps entre mon inscription et le démarrage ?', answer: 'Paiement comptant ou acompte + échéancier : démarrage sous 10 jours.' },
  { question: "Que se passe-t-il si je rate l'examen ?", answer: 'Vous pouvez repasser les blocs non validés lors d’une session suivante.' },
  { question: 'Puis-je utiliser mon CPF ?', answer: 'Oui, le RPMS est éligible au CPF.' },
  { question: 'Y a-t-il un stage obligatoire ?', answer: "Pour les candidats en emploi, non. Pour les demandeurs d'emploi, un stage peut être requis." },
  { question: "Combien d'heures par semaine dois-je y consacrer ?", answer: 'Entre 8 et 12 heures par semaine sur 6 à 12 mois.' },
  { question: "Compatible avec le RSA ou l'ARE ?", answer: 'Oui, selon votre situation et votre dossier.' },
  { question: 'Quel est le niveau de salaire après obtention du titre ?', answer: 'Selon la fiche ROME M1302, la rémunération observée est entre 35 000 et 55 000 € brut annuels.' },
  { question: 'Est-ce que CITYZ est certifié Qualiopi ?', answer: 'Oui, CITYZ Formation est certifié Qualiopi.' }
])

const faqCopy = computed(() => site.value.faq ?? {})

const hero = computed(() => ({
  eyebrow: faqCopy.value.hero?.eyebrow ?? 'QUESTIONS FRÉQUENTES',
  title:
    faqCopy.value.hero?.title ?? 'Tout ce que vous devez savoir avant de vous lancer',
  description:
    faqCopy.value.hero?.description ??
    'Vous hésitez encore ? Voici les réponses aux questions que se posent la plupart de nos futurs apprenants.'
}))

const faqSchema = computed(() =>
  JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: items.value.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer
        }
      }))
    },
    null,
    2
  )
)
</script>

<template>
  <div class="page-stack -mx-4 sm:-mx-6 lg:-mx-8">
    <p v-if="loading" class="px-4 py-6 text-sm text-muted-foreground sm:px-6 lg:px-8">
      Chargement de la FAQ…
    </p>

    <template v-else>
      <component :is="'script'" type="application/ld+json">
        {{ faqSchema }}
      </component>

      <section
        class="px-4 pb-0 pt-6 sm:px-6 lg:px-8 lg:pb-0 lg:pt-8"
        v-motion
        :initial="motionVariants.block.initial"
        :enter="motionVariants.block.enter"
      >
        <div class="shell-track space-y-6">
          <article class="page-hero p-5 sm:p-6 lg:p-8">
            <div class="mx-auto max-w-3xl space-y-4 text-center">
              <p class="kicker">{{ hero.eyebrow }}</p>
              <h1 class="editorial-title text-[clamp(1.85rem,3.05vw,2.8rem)] text-primary">
                {{ hero.title }}
              </h1>
              <p class="text-base leading-8 text-muted-foreground sm:text-[1.02rem]">
                {{ hero.description }}
              </p>
            </div>
          </article>

          <div class="mx-auto grid max-w-5xl gap-4">
            <details
              v-for="(item, index) in items"
              :key="item.question"
              class="accordion-card page-cut px-5 py-4 sm:px-6 sm:py-5"
              v-motion
              :initial="motionVariants.block.initial"
              :enter="staggerEnter(index, 42, 18)"
            >
              <summary class="faq-summary accordion-summary">
                <span class="text-base font-semibold leading-6 text-primary">{{ item.question }}</span>
                <ChevronDown class="accordion-summary__icon mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              </summary>
              <p class="accordion-panel">
                {{ item.answer }}
              </p>
            </details>
          </div>

          <PrefooterCtaPanel />
        </div>
      </section>
    </template>
  </div>
</template>
