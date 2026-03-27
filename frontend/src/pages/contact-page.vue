<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowRight } from 'lucide-vue-next'

import LeadForm from '@/components/lead-form.vue'
import { Button } from '@/components/ui/button'
import { useExperienceVariant } from '@/composables/use-experience-variant'
import { api } from '@/lib/api'
import { motionVariants, staggerEnter } from '@/lib/motion'

const site = ref({
  contact: {},
  organizationProfile: {}
})
const loading = ref(true)

const { toWithExperience } = useExperienceVariant()

onMounted(async () => {
  try {
    const sitePayload = await api.getSite()
    site.value = sitePayload
  } finally {
    loading.value = false
  }
})

const contactCopy = computed(() => site.value.contact ?? {})
const programLink = computed(() => toWithExperience('/programme'))
const financeLink = computed(() => toWithExperience('/financement'))
const faqLink = computed(() => toWithExperience('/faq'))

const hero = computed(() => ({
  eyebrow: contactCopy.value.heroEyebrow ?? 'Être rappelé',
  title: contactCopy.value.heroTitle ?? 'Le rappel sert à vérifier si le RPMS correspond à votre projet.',
  support:
    contactCopy.value.heroSupport ??
    'Précisez votre situation, le bloc qui retient votre attention et, si besoin, le point de financement que vous souhaitez éclaircir.',
  intro:
    contactCopy.value.formIntro ??
    'Quelques informations suffisent pour préparer un échange utile autour du titre, du programme et du financement.'
}))

const guidancePoints = computed(() =>
  Array.isArray(contactCopy.value.guidancePoints) && contactCopy.value.guidancePoints.length > 0
    ? contactCopy.value.guidancePoints
    : [
        'Le rôle ou les responsabilités que vous visez.',
        "L'adéquation du format 100 % distanciel avec votre rythme.",
        'Le prix, les modalités de paiement ou les conditions que vous souhaitez clarifier.'
      ]
)

const nextStepPoints = computed(() =>
  Array.isArray(contactCopy.value.nextStepNote?.points) && contactCopy.value.nextStepNote.points.length > 0
    ? contactCopy.value.nextStepNote.points
    : [
        "Votre demande est prise en compte par CITYZ'France.",
        "L'échange permet de comprendre votre projet et de répondre à vos premières questions.",
        'Les informations demandées restent limitées à ce qui est utile pour vous recontacter.'
      ]
)
</script>

<template>
  <div class="page-stack">
    <p v-if="loading" class="text-sm text-muted-foreground">Chargement du contact…</p>

    <template v-else>
      <section
        class="page-shell"
        v-motion
        :initial="motionVariants.block.initial"
        :enter="motionVariants.block.enter"
      >
        <article class="page-hero space-y-5 p-5 sm:p-6 lg:p-7">
          <div class="space-y-4">
            <h1 class="editorial-title max-w-4xl text-[clamp(1.75rem,3vw,2.6rem)] text-foreground">
              {{ hero.title }}
            </h1>
            <p class="max-w-3xl text-base leading-8 text-muted-foreground sm:text-[1.02rem]">
              {{ hero.support }}
            </p>
          </div>

          <div class="max-w-2xl rounded-[1rem] border border-border/80 bg-[color:var(--paper-tint)]/65 p-4 sm:p-5">
            <p class="detail-key">À préparer avant l'envoi</p>
            <p class="mt-2 text-sm leading-7 text-foreground">
              {{ hero.intro }}
            </p>
            <p class="mt-2 text-sm leading-7 text-muted-foreground">
              Le formulaire sert à cadrer un rappel utile, pas à multiplier les champs.
            </p>
          </div>

          <div class="flex flex-wrap gap-4">
            <a href="#formulaire-rappel" class="home-inline-link">
              Aller au formulaire
              <ArrowRight class="h-4 w-4" />
            </a>
            <RouterLink :to="faqLink" class="home-inline-link">
              Lire la FAQ
              <ArrowRight class="h-4 w-4" />
            </RouterLink>
          </div>
        </article>
      </section>

      <section
        id="formulaire-rappel"
        class="page-shell support-grid grid gap-6 lg:grid-cols-[minmax(0,1.28fr)_minmax(18rem,0.82fr)] xl:grid-cols-[minmax(0,1.34fr)_minmax(20rem,0.78fr)]"
      >
        <article class="paper-card sidebar-panel p-5 sm:p-6">
          <div class="space-y-3">
            <p class="kicker">{{ contactCopy.formTitle ?? 'Parlez-nous de votre projet' }}</p>
            <h2 class="editorial-title max-w-4xl text-[clamp(1.5rem,2.35vw,2.15rem)] text-foreground">
              {{ contactCopy.formSupport ?? 'Donnez assez de contexte pour que le rappel soit utile.' }}
            </h2>
            <p class="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-[0.98rem]">
              {{ hero.intro }}
            </p>
          </div>

          <div class="mt-6 rounded-[1.1rem] border border-border/70 bg-[color:var(--paper-tint)]/60 p-4 sm:p-5 lg:p-6">
            <LeadForm source-page="/contact" />
          </div>
        </article>

        <aside class="sidebar-panel paper-card p-5 sm:p-6">
          <div class="space-y-3">
            <p class="kicker">{{ contactCopy.guidanceTitle ?? 'Préparez votre échange' }}</p>
            <h2 class="editorial-title text-[clamp(1.4rem,2vw,1.85rem)] text-foreground">
              Les trois repères à préciser dans votre message.
            </h2>
            <p class="text-sm leading-7 text-muted-foreground sm:text-[0.97rem]">
              Plus la demande est cadrée, plus le rappel peut répondre simplement et sans détour.
            </p>
          </div>

          <div class="mt-6 grid gap-3">
            <article
              v-for="(point, index) in guidancePoints"
              :key="point"
              class="support-tile paper-card p-4"
              v-motion
              :initial="motionVariants.pop.initial"
              :enter="staggerEnter(index, 44, 22)"
            >
              <div class="flex items-start gap-3">
                <span class="finance-badge">{{ index + 1 }}</span>
                <p class="text-sm leading-6 text-foreground">
                  {{ point }}
                </p>
              </div>
            </article>
          </div>

          <div class="mt-6 border-t border-border/70 pt-5">
            <p class="detail-key">Après l'envoi</p>
            <div class="mt-4 grid gap-3">
              <article
                v-for="(point, index) in nextStepPoints"
                :key="point"
                class="rounded-[1rem] border border-border/70 bg-[color:var(--paper-tint)]/55 p-4"
                v-motion
                :initial="motionVariants.pop.initial"
                :enter="staggerEnter(index, 42, 20)"
              >
                <div class="flex items-start gap-3">
                  <span class="finance-line" aria-hidden="true"></span>
                  <p class="text-sm leading-6 text-muted-foreground">
                    {{ point }}
                  </p>
                </div>
              </article>
            </div>
          </div>
        </aside>
      </section>

      <section class="page-shell cta-band arch-cta paper-card p-5 sm:p-6 lg:p-8">
        <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div class="space-y-3">
            <p class="kicker">{{ contactCopy.footerBand?.eyebrow ?? "Avant d'envoyer votre demande" }}</p>
            <h2 class="editorial-title max-w-3xl text-[clamp(1.55rem,2.3vw,2.1rem)] text-foreground">
              {{
                contactCopy.footerBand?.title ??
                'Programme et financement restent accessibles à tout moment'
              }}
            </h2>
            <p class="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-[1rem]">
              {{
                contactCopy.footerBand?.description ??
                'Vous pouvez les relire avant de finaliser votre demande si vous souhaitez confirmer un point.'
              }}
            </p>
          </div>

          <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button :as="RouterLink" :to="programLink" size="lg">
              Voir le programme
              <ArrowRight class="ml-2 h-4 w-4" />
            </Button>
            <Button :as="RouterLink" :to="financeLink" size="lg" variant="outline">
              Voir le financement
            </Button>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>
