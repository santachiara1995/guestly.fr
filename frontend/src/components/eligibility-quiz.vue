<script setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { ArrowRight, Check, Lightbulb, X } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const emit = defineEmits(['close'])

const questions = [
  {
    id: 'status',
    title: 'Dites-nous en un peu plus sur vous.',
    subtitle: 'En 4 questions, on identifie votre voie d’accès et votre meilleur financement.',
    options: [
      { value: 'salarie', label: 'Salarié en CDI ou CDD' },
      { value: 'demandeur', label: "Demandeur d'emploi" },
      { value: 'dirigeant', label: 'Dirigeant ou indépendant' },
      { value: 'reconversion', label: 'En reconversion' }
    ]
  },
  {
    id: 'diploma',
    title: 'Parlons de votre parcours.',
    subtitle: 'Le RPMS reste accessible même sans Bac selon votre expérience.',
    options: [
      { value: 'oui', label: 'Oui, j’ai le Bac' },
      { value: 'non-exp', label: "Non, mais j'ai plus de 3 ans d'expérience" },
      { value: 'non', label: 'Non, moins de 3 ans d’expérience' }
    ]
  },
  {
    id: 'goal',
    title: 'Votre objectif principal ?',
    subtitle: 'On relie votre projet à la meilleure trajectoire de certification.',
    options: [
      { value: 'promo', label: 'Évoluer dans mon entreprise' },
      { value: 'change', label: 'Changer de métier' },
      { value: 'entrepreneur', label: 'Créer ou reprendre une entreprise' },
      { value: 'secure', label: 'Sécuriser mon poste avec un diplôme' }
    ]
  },
  {
    id: 'funding',
    title: 'Comment préférez-vous financer ?',
    subtitle: 'Nous vous orientons ensuite vers le bon dossier.',
    options: [
      { value: 'opco', label: 'Mon OPCO ou mon employeur' },
      { value: 'aif', label: 'France Travail / AIF' },
      { value: 'cpf', label: 'Mon CPF' },
      { value: 'perso', label: 'Acompte 1 000 € + mensualités' },
      { value: 'unknown', label: 'Je ne sais pas encore' }
    ]
  }
]

const step = ref(0)
const submitted = ref(false)
const answers = reactive({})
const lead = reactive({ firstName: '', email: '', phone: '' })

const currentQuestion = computed(() => questions[step.value] ?? null)

function handleAnswer(id, value) {
  answers[id] = value
  window.setTimeout(() => {
    if (step.value < questions.length) step.value += 1
  }, 180)
}

const financingLabel = computed(() => {
  if (answers.funding === 'opco') return 'OPCO — prise en charge totale possible'
  if (answers.funding === 'aif') return 'AIF — 100 % financé, allocations maintenues'
  if (answers.funding === 'cpf') return 'CPF + solutions complémentaires'
  if (answers.funding === 'perso') return 'Acompte 1 000 € + mensualités'
  return 'À définir lors du diagnostic'
})

const recommendation = computed(() => {
  if (answers.status === 'salarie' && answers.funding === 'opco') {
    return "Votre entreprise peut financer jusqu'à 100 % de votre formation via l'OPCO. Notre équipe monte le dossier sous 48h. Vous conservez votre salaire pendant toute la formation."
  }
  if (answers.status === 'salarie' && answers.funding === 'cpf') {
    return "Votre CPF peut couvrir tout ou partie du coût (3 500 €). Nous vérifions votre solde lors de l'appel et vous proposons un montage qui minimise le reste à charge."
  }
  if (answers.status === 'demandeur' && answers.funding === 'aif') {
    return "France Travail peut financer intégralement votre formation via l'AIF tout en maintenant vos allocations chômage. Dossier monté sous 48h par notre équipe."
  }
  if (answers.status === 'dirigeant') {
    return "En tant que dirigeant, vous cumulez plusieurs dispositifs (CPF, OPCO, plan de formation). Nous arbitrons ensemble la meilleure combinaison selon votre structure."
  }
  if (answers.status === 'reconversion') {
    return "Votre projet correspond à un PTP (Projet de Transition Professionnelle). Financement + maintien du salaire possibles. Nous accompagnons le montage avec Transitions Pro."
  }
  if (answers.diploma === 'non-exp') {
    return "Votre expérience est un atout majeur. Le RPMS valorise justement les parcours sans diplôme mais riches d'expérience. Aucun examen d'entrée, juste un diagnostic de votre projet."
  }
  return "C'est notre spécialité. En 15 min d'échange, nous identifions tous les dispositifs auxquels vous avez droit et construisons un plan financier sur mesure."
})

function handleSubmit() {
  if (!lead.firstName || !lead.email || !lead.phone) return
  console.log('Lead captured:', { answers, lead })
  submitted.value = true
}

function onKeydown(event) {
  if (event.key === 'Escape') emit('close')
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-[70] bg-slate-950/70 p-3 backdrop-blur-sm sm:p-4" @click.self="emit('close')">
      <div class="flex min-h-full items-center justify-center">
        <div class="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-[1.8rem] border border-white/15 bg-white p-5 shadow-2xl sm:p-6 md:p-10">
          <button
            type="button"
            class="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
            @click="emit('close')"
          >
            <X class="h-5 w-5" />
          </button>

          <template v-if="!submitted">
            <template v-if="currentQuestion">
              <p v-if="step === 0" class="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-red-600">
                Diagnostic gratuit · 2 min
              </p>
              <div class="mb-6 flex gap-2">
                <div
                  v-for="(q, i) in questions"
                  :key="q.id"
                  class="h-1.5 flex-1 rounded-full"
                  :style="{ backgroundColor: i <= step ? '#E1000F' : '#e2e8f0' }"
                />
              </div>

              <p class="mb-2 text-[11px] font-bold uppercase tracking-[0.22em] text-red-600">
                Question {{ step + 1 }} / {{ questions.length }}
              </p>
              <h3 class="text-2xl font-black leading-tight text-primary sm:text-3xl">
                {{ currentQuestion.title }}
              </h3>
              <p class="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
                {{ currentQuestion.subtitle }}
              </p>

              <div class="mt-8 space-y-3">
                <button
                  v-for="option in currentQuestion.options"
                  :key="option.value"
                  type="button"
                  class="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 text-left transition hover:border-red-600 hover:bg-red-50"
                  @click="handleAnswer(currentQuestion.id, option.value)"
                >
                  <span class="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-600">
                    {{ option.label.slice(0, 1) }}
                  </span>
                  <span class="flex-1 text-sm font-semibold leading-6 text-slate-900 sm:text-base">
                    {{ option.label }}
                  </span>
                  <ArrowRight class="h-4 w-4 flex-none text-slate-300" />
                </button>
              </div>
            </template>

            <template v-else>
              <div class="text-center">
                <div class="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-50 text-red-600 sm:h-28 sm:w-28">
                  <Check class="h-12 w-12 sm:h-14 sm:w-14" />
                </div>
                <h3 class="mt-6 text-2xl font-black text-primary sm:text-3xl">Votre profil est validé.</h3>
                <p class="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
                  Vous remplissez les conditions pour accéder au Titre Pro RPMS. Voici votre plan personnalisé.
                </p>
              </div>

              <div class="mt-8 rounded-2xl bg-primary p-4 text-white sm:p-5">
                <div class="grid gap-3 md:grid-cols-3">
                  <div class="rounded-xl border border-white/10 bg-white/5 p-3">
                    <p class="text-[10px] font-bold uppercase tracking-[0.18em] text-white">Éligibilité</p>
                    <p class="mt-2 text-sm font-bold">✓ Confirmée</p>
                  </div>
                  <div class="rounded-xl border border-white/10 bg-white/5 p-3">
                    <p class="text-[10px] font-bold uppercase tracking-[0.18em] text-white">Financement</p>
                    <p class="mt-2 text-sm font-bold">{{ financingLabel }}</p>
                  </div>
                  <div class="rounded-xl border border-white/10 bg-white/5 p-3">
                    <p class="text-[10px] font-bold uppercase tracking-[0.18em] text-white">Démarrage</p>
                    <p class="mt-2 text-sm font-bold">Sous 10 jours</p>
                  </div>
                </div>
              </div>

              <div class="mt-5 rounded-2xl border-l-4 border-red-600 bg-slate-50 p-4">
                <div class="flex items-start gap-3">
                  <Lightbulb class="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <p class="font-bold text-primary">Votre recommandation</p>
                    <p class="mt-2 text-sm leading-6 text-slate-600">{{ recommendation }}</p>
                  </div>
                </div>
              </div>

              <div class="mt-8 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 sm:p-5">
                <div class="grid gap-3 md:grid-cols-2">
                  <Input v-model="lead.firstName" placeholder="Prénom" />
                  <Input v-model="lead.phone" placeholder="Téléphone" type="tel" />
                  <Input v-model="lead.email" class="md:col-span-2" placeholder="Email" type="email" />
                </div>
              </div>

              <Button class="mt-6 w-full bg-red-600 text-white" size="lg" @click="handleSubmit">
                Réserver mon diagnostic gratuit (15 min)
                <ArrowRight class="ml-2 h-4 w-4" />
              </Button>
            </template>
          </template>

          <template v-else>
            <div class="py-10 text-center">
              <div class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 text-4xl">
                ✅
              </div>
              <h3 class="mt-5 text-2xl font-black text-primary sm:text-3xl">Merci {{ lead.firstName }} !</h3>
              <p class="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
                Votre demande est enregistrée. Un conseiller vous contactera sous 24h au {{ lead.phone }}.
              </p>
              <Button class="mt-6 bg-red-600 text-white" @click="emit('close')">Fermer</Button>
            </div>
          </template>
        </div>
      </div>
    </div>
  </Teleport>
</template>
