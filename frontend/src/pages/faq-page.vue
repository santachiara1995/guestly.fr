<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

import { useExperienceVariant } from '@/composables/use-experience-variant'
import SectionTitle from '@/components/section-title.vue'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'

const RPMS_VARIANTS = ['orientation-hub', 'career-journey', 'program-first-marketplace']

const FAQ_VARIANT_DEFAULTS = {
  'orientation-hub': {
    hero: {
      eyebrow: 'FAQ RPMS',
      title: "Les questions qui tranchent vraiment avant d'aller plus loin.",
      description:
        "Commencez par les points qui éclairent le titre, le format et les responsabilités travaillées."
    },
    opening: {
      eyebrow: 'Avant de dérouler les questions',
      title: 'La FAQ sert à confirmer un choix, pas à tout expliquer.',
      description:
        "Si un point reste flou après cette lecture, le plus utile est de revenir au programme ou de demander un rappel.",
      bullets: [
        'Vérifier le titre, le niveau et le format.',
        'Comprendre les responsabilités travaillées.',
        'Décider si un échange vous aiderait à clarifier la suite.'
      ]
    },
    sectionTitle: {
      eyebrow: 'Questions à trancher',
      title: 'Commencez par les points qui comptent le plus pour décider',
      description:
        'Chaque réponse doit vous aider à confirmer le titre, le format et les responsabilités travaillées.'
    },
    closingNote: {
      eyebrow: 'Encore une question',
      title: 'Revenez au programme ou demandez un rappel si un point reste ouvert.',
      description:
        "La FAQ doit vous aider à trancher. Si une question dépend de votre situation, l'échange permet de la remettre dans votre contexte.",
      supportLine:
        "Le rappel sert ensuite à vérifier si le parcours correspond réellement à votre projet."
    }
  },
  'career-journey': {
    hero: {
      eyebrow: 'FAQ RPMS',
      title: "Commencez par les questions qui bloquent le passage à l'étape suivante.",
      description:
        "Cette lecture traite d'abord les points qui freinent la décision : cadre, format, rôle préparé et bon moment pour demander un rappel."
    },
    opening: {
      eyebrow: 'Blocages fréquents',
      title: "Traitez d'abord ce qui arrête votre lecture.",
      description:
        'La FAQ fonctionne ici comme un parcours de déblocage, pas comme une liste neutre.',
      bullets: [
        'Le cadre officiel du titre et son niveau.',
        "La compatibilité du format 100 % distanciel avec votre rythme.",
        "Le moment où le rappel devient utile dans votre progression."
      ]
    },
    blockerSection: {
      eyebrow: 'Bloqueurs prioritaires',
      title: 'Débloquez les questions avant de tout lire.',
      description:
        "La suite devient plus simple quand vous traitez d'abord le frein principal.",
      cards: [
        {
          label: 'Bloqueur 1',
          title: 'Le cadre du titre',
          text: 'Confirmez le RPMS, le RNCP38575 et la lecture Bac+2 / niveau 5.'
        },
        {
          label: 'Bloqueur 2',
          title: 'Le format',
          text: "Vérifiez le 100 % distanciel, l'e-learning et l'accompagnement pédagogique."
        },
        {
          label: 'Bloqueur 3',
          title: 'Le bon usage du rappel',
          text: "Gardez l'échange pour les points liés à votre situation, pas pour remplacer toute la lecture du site."
        }
      ]
    },
    sectionTitle: {
      eyebrow: 'Déroulé des réponses',
      title: 'Passez ensuite aux réponses détaillées',
      description:
        "Une fois le principal bloqueur identifié, les autres réponses servent à compléter votre lecture."
    },
    closingNote: {
      eyebrow: 'Si le blocage persiste',
      title: 'Demandez un rappel pour remettre la question dans votre situation.',
      description:
        "Le rappel n'efface pas la FAQ : il sert à reprendre un point bloquant avec votre projet en tête.",
      supportLine:
        "Vous repartez avec une lecture plus nette du titre, du format et de ce qui reste à confirmer."
    }
  },
  'program-first-marketplace': {
    hero: {
      eyebrow: 'FAQ RPMS',
      title: "Base d'aide RPMS : les réponses de référence avant contact.",
      description:
        "Lisez cette page comme une aide ciblée : repères, format, rôle préparé et usage du rappel, sans glisser vers une FAQ générique."
    },
    opening: {
      eyebrow: 'Guide express',
      title: 'Repérez la bonne rubrique avant de parcourir les réponses.',
      description:
        "Chaque groupe reprend un angle précis : référence du titre, modalité du parcours ou lecture du rôle.",
      bullets: [
        'Référence officielle du titre et du niveau.',
        'Modalité du parcours et place du rappel.',
        'Compétences et lecture terrain du programme.'
      ]
    },
    helpdeskSection: {
      eyebrow: "Base d'aide",
      title: "Une lecture plus proche d'un centre d'aide ciblé que d'une brochure.",
      description:
        "Les réponses restent courtes, factuelles et orientées vers la décision."
    },
    closingNote: {
      eyebrow: 'Besoin de confirmer la fiche',
      title: 'Passez au programme ou au rappel selon le point qui reste ouvert.',
      description:
        "Si la réponse attendue demande davantage de contexte, le programme ou le rappel servent de relais naturel.",
      supportLine:
        "La FAQ reste une base d'aide : le rappel sert ensuite à contextualiser ce qui manque."
    }
  }
}

const pickText = (...values) =>
  values.find((value) => typeof value === 'string' && value.trim().length > 0) ?? ''

const pickList = (...values) =>
  values.find((value) => Array.isArray(value) && value.length > 0) ?? []

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
const { experienceVariant: currentExperienceVariant, toWithExperience } = useExperienceVariant()
const experienceVariant = computed(() => currentExperienceVariant.value ?? 'orientation-hub')
const routeWithVariant = (path) => toWithExperience(path)
const faqVariantCopy = computed(() => faqCopy.value.variants?.[experienceVariant.value] ?? {})

const helpdeskGroups = computed(() => {
  const source = items.value

  return [
    {
      label: 'Référence',
      title: 'Titre et cadre officiel',
      items: [source[0], source[3]].filter(Boolean)
    },
    {
      label: 'Format',
      title: 'Modalité et usage du rappel',
      items: [source[2], source[4]].filter(Boolean)
    },
    {
      label: 'Rôle',
      title: 'Compétences et lecture terrain',
      items: [source[1], source[5]].filter(Boolean)
    }
  ].filter((group) => group.items.length > 0)
})

const faqContent = computed(() => {
  const defaults = FAQ_VARIANT_DEFAULTS[experienceVariant.value]
  const variantCopy = faqVariantCopy.value

  if (experienceVariant.value === 'career-journey') {
    return {
      hero: {
        eyebrow: pickText(variantCopy.hero?.eyebrow, defaults.hero.eyebrow),
        title: pickText(variantCopy.hero?.title, defaults.hero.title),
        description: pickText(variantCopy.hero?.description, defaults.hero.description)
      },
      opening: {
        eyebrow: pickText(variantCopy.opening?.eyebrow, defaults.opening.eyebrow),
        title: pickText(variantCopy.opening?.title, defaults.opening.title),
        description: pickText(variantCopy.opening?.description, defaults.opening.description),
        bullets: pickList(variantCopy.opening?.bullets, defaults.opening.bullets)
      },
      blockerSection: {
        eyebrow: pickText(
          variantCopy.blockerSection?.eyebrow,
          defaults.blockerSection.eyebrow
        ),
        title: pickText(variantCopy.blockerSection?.title, defaults.blockerSection.title),
        description: pickText(
          variantCopy.blockerSection?.description,
          defaults.blockerSection.description
        ),
        cards: pickList(variantCopy.blockerSection?.cards, defaults.blockerSection.cards)
      },
      sectionTitle: {
        eyebrow: pickText(variantCopy.sectionTitle?.eyebrow, defaults.sectionTitle.eyebrow),
        title: pickText(variantCopy.sectionTitle?.title, defaults.sectionTitle.title),
        description: pickText(
          variantCopy.sectionTitle?.description,
          defaults.sectionTitle.description
        )
      },
      closingNote: {
        eyebrow: pickText(variantCopy.closingNote?.eyebrow, defaults.closingNote.eyebrow),
        title: pickText(variantCopy.closingNote?.title, defaults.closingNote.title),
        description: pickText(
          variantCopy.closingNote?.description,
          defaults.closingNote.description
        ),
        supportLine: pickText(
          variantCopy.closingNote?.supportLine,
          defaults.closingNote.supportLine
        )
      }
    }
  }

  if (experienceVariant.value === 'program-first-marketplace') {
    return {
      hero: {
        eyebrow: pickText(variantCopy.hero?.eyebrow, defaults.hero.eyebrow),
        title: pickText(variantCopy.hero?.title, defaults.hero.title),
        description: pickText(variantCopy.hero?.description, defaults.hero.description)
      },
      opening: {
        eyebrow: pickText(variantCopy.opening?.eyebrow, defaults.opening.eyebrow),
        title: pickText(variantCopy.opening?.title, defaults.opening.title),
        description: pickText(variantCopy.opening?.description, defaults.opening.description),
        bullets: pickList(variantCopy.opening?.bullets, defaults.opening.bullets)
      },
      helpdeskSection: {
        eyebrow: pickText(
          variantCopy.helpdeskSection?.eyebrow,
          defaults.helpdeskSection.eyebrow
        ),
        title: pickText(variantCopy.helpdeskSection?.title, defaults.helpdeskSection.title),
        description: pickText(
          variantCopy.helpdeskSection?.description,
          defaults.helpdeskSection.description
        )
      },
      closingNote: {
        eyebrow: pickText(variantCopy.closingNote?.eyebrow, defaults.closingNote.eyebrow),
        title: pickText(variantCopy.closingNote?.title, defaults.closingNote.title),
        description: pickText(
          variantCopy.closingNote?.description,
          defaults.closingNote.description
        ),
        supportLine: pickText(
          variantCopy.closingNote?.supportLine,
          defaults.closingNote.supportLine
        )
      }
    }
  }

  const hero = faqCopy.value.hero ?? {}
  const opening = faqCopy.value.opening ?? {}
  const closingNote = faqCopy.value.closingNote ?? {}

  return {
    hero: {
      eyebrow: pickText(variantCopy.hero?.eyebrow, hero.eyebrow, defaults.hero.eyebrow),
      title: pickText(variantCopy.hero?.title, hero.title, defaults.hero.title),
      description: pickText(variantCopy.hero?.description, hero.description, defaults.hero.description)
    },
    opening: {
      eyebrow: pickText(variantCopy.opening?.eyebrow, opening.eyebrow, defaults.opening.eyebrow),
      title: pickText(variantCopy.opening?.title, opening.title, defaults.opening.title),
      description: pickText(
        variantCopy.opening?.description,
        opening.description,
        defaults.opening.description
      ),
      bullets: pickList(variantCopy.opening?.bullets, opening.bullets, defaults.opening.bullets)
    },
    sectionTitle: {
      eyebrow: pickText(variantCopy.sectionTitle?.eyebrow, defaults.sectionTitle.eyebrow),
      title: pickText(variantCopy.sectionTitle?.title, defaults.sectionTitle.title),
      description: pickText(
        variantCopy.sectionTitle?.description,
        defaults.sectionTitle.description
      )
    },
    closingNote: {
      eyebrow: pickText(
        variantCopy.closingNote?.eyebrow,
        closingNote.eyebrow,
        defaults.closingNote.eyebrow
      ),
      title: pickText(variantCopy.closingNote?.title, closingNote.title, defaults.closingNote.title),
      description: pickText(
        variantCopy.closingNote?.description,
        closingNote.description,
        defaults.closingNote.description
      ),
      supportLine: pickText(
        variantCopy.closingNote?.supportLine,
        closingNote.supportLine,
        defaults.closingNote.supportLine
      )
    }
  }
})
</script>

<template>
  <div class="space-y-12 sm:space-y-14 lg:space-y-16">
    <section class="page-hero grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr,0.96fr] lg:p-10">
      <div class="space-y-5">
        <div class="space-y-4">
          <p class="kicker">{{ faqContent.hero.eyebrow }}</p>
          <h1 class="editorial-title max-w-4xl text-[clamp(2.2rem,4.5vw,3.8rem)] text-foreground">
            {{ faqContent.hero.title }}
          </h1>
          <p class="max-w-3xl text-base leading-8 text-muted-foreground sm:text-[1.05rem]">
            {{ faqContent.hero.description }}
          </p>
        </div>
      </div>

      <aside class="page-cut p-6 sm:p-7">
        <p class="kicker">{{ faqContent.opening.eyebrow }}</p>
        <h2 class="mt-4 text-[clamp(1.6rem,2.8vw,2.25rem)] font-semibold leading-tight tracking-[-0.04em] text-foreground">
          {{ faqContent.opening.title }}
        </h2>
        <p class="mt-4 text-sm leading-7 text-muted-foreground">
          {{ faqContent.opening.description }}
        </p>

        <ul class="mt-5 grid gap-3">
          <li
            v-for="item in faqContent.opening.bullets"
            :key="item"
            class="elevated-item rounded-[1rem] px-4 py-4 text-sm leading-6 text-foreground"
          >
            {{ item }}
          </li>
        </ul>

        <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button :as="RouterLink" :to="routeWithVariant('/programme')" size="lg">
            Voir le programme
          </Button>
          <Button :as="RouterLink" :to="routeWithVariant('/contact')" size="lg" variant="outline">
            Être rappelé
          </Button>
        </div>
      </aside>
    </section>

    <p v-if="loading" class="text-sm text-muted-foreground">Chargement de la FAQ...</p>

    <template v-else>
      <template v-if="experienceVariant === 'career-journey'">
        <section class="grid gap-6 lg:grid-cols-[0.84fr,1.16fr] lg:items-start">
          <div class="space-y-6">
            <SectionTitle
              :description="faqContent.blockerSection.description"
              :eyebrow="faqContent.blockerSection.eyebrow"
              :title="faqContent.blockerSection.title"
            />

            <div class="grid gap-4">
              <article
                v-for="card in faqContent.blockerSection.cards"
                :key="card.label"
                class="page-cut p-5 sm:p-6"
              >
                <p class="detail-key">{{ card.label }}</p>
                <h3 class="mt-3 text-[1.08rem] font-semibold leading-tight text-foreground">
                  {{ card.title }}
                </h3>
                <p class="mt-3 text-sm leading-7 text-muted-foreground">
                  {{ card.text }}
                </p>
              </article>
            </div>
          </div>

          <div class="space-y-6">
            <SectionTitle
              :description="faqContent.sectionTitle.description"
              :eyebrow="faqContent.sectionTitle.eyebrow"
              :title="faqContent.sectionTitle.title"
            />

            <div class="grid gap-3">
              <details
                v-for="item in items"
                :key="item.question"
                class="page-cut group px-5 py-5 sm:px-6"
              >
                <summary class="faq-summary">
                  <span class="text-[1.02rem] font-semibold leading-snug text-foreground">
                    {{ item.question }}
                  </span>
                  <span
                    aria-hidden="true"
                    class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-muted text-primary transition-colors group-open:bg-primary group-open:text-primary-foreground"
                  >
                    +
                  </span>
                </summary>
                <p class="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
                  {{ item.answer }}
                </p>
              </details>
            </div>
          </div>
        </section>
      </template>

      <template v-else-if="experienceVariant === 'program-first-marketplace'">
        <section class="space-y-6">
          <SectionTitle
            :description="faqContent.helpdeskSection.description"
            :eyebrow="faqContent.helpdeskSection.eyebrow"
            :title="faqContent.helpdeskSection.title"
          />

          <div class="grid gap-4 xl:grid-cols-3">
            <article
              v-for="group in helpdeskGroups"
              :key="group.label"
              class="page-cut p-5 sm:p-6"
            >
              <p class="detail-key">{{ group.label }}</p>
              <h3 class="mt-3 text-[1.08rem] font-semibold leading-tight text-foreground">
                {{ group.title }}
              </h3>

              <div class="mt-5 space-y-5">
                <div v-for="item in group.items" :key="item.question" class="space-y-2">
                  <p class="text-sm font-semibold leading-6 text-foreground">
                    {{ item.question }}
                  </p>
                  <p class="text-sm leading-7 text-muted-foreground">
                    {{ item.answer }}
                  </p>
                </div>
              </div>
            </article>
          </div>
        </section>
      </template>

      <template v-else>
        <section class="space-y-6">
          <SectionTitle
            :description="faqContent.sectionTitle.description"
            :eyebrow="faqContent.sectionTitle.eyebrow"
            :title="faqContent.sectionTitle.title"
          />

          <div class="grid gap-3">
            <details
              v-for="item in items"
              :key="item.question"
              class="page-cut group px-5 py-5 sm:px-6"
            >
              <summary class="faq-summary">
                <span class="text-[1.02rem] font-semibold leading-snug text-foreground">
                  {{ item.question }}
                </span>
                <span
                  aria-hidden="true"
                  class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-muted text-primary transition-colors group-open:bg-primary group-open:text-primary-foreground"
                >
                  +
                </span>
              </summary>
              <p class="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
                {{ item.answer }}
              </p>
            </details>
          </div>
        </section>
      </template>

      <section class="page-cut p-6 sm:p-8">
        <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div class="space-y-3">
            <p class="kicker">{{ faqContent.closingNote.eyebrow }}</p>
            <h2 class="editorial-title max-w-3xl text-[clamp(1.8rem,3vw,2.55rem)] text-foreground">
              {{ faqContent.closingNote.title }}
            </h2>
            <p class="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-[1rem]">
              {{ faqContent.closingNote.description }}
            </p>
            <p class="max-w-2xl text-sm leading-7 text-muted-foreground">
              {{ faqContent.closingNote.supportLine }}
            </p>
          </div>

          <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button
              :as="RouterLink"
              :to="routeWithVariant('/programme')"
              size="lg"
              variant="outline"
            >
              Voir le programme
            </Button>
            <Button :as="RouterLink" :to="routeWithVariant('/contact')" size="lg">
              Être rappelé
            </Button>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>
