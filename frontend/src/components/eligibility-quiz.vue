<script setup>
import { computed, reactive, ref } from 'vue'
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CircleHelp,
  CreditCard,
  GraduationCap,
  Hammer,
  Landmark,
  RefreshCw,
  Rocket,
  Search,
  ShieldCheck,
  Sprout,
  Target,
  TrendingUp,
  Wallet,
  X
} from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const emit = defineEmits(['close'])

const questions = [
  { id: 'status', title: 'Quelle est votre situation actuelle ?', subtitle: 'Cela détermine vos voies de financement prioritaires.', options: [
    { value: 'salarie', label: 'Salarié en CDI ou CDD', icon: BriefcaseBusiness },
    { value: 'demandeur', label: "Demandeur d'emploi", icon: Search },
    { value: 'dirigeant', label: 'Dirigeant ou indépendant', icon: Rocket },
    { value: 'reconversion', label: 'En reconversion', icon: RefreshCw }
  ]},
  { id: 'diploma', title: 'Avez-vous le baccalauréat ?', subtitle: 'Le RPMS reste accessible même sans Bac selon votre parcours.', options: [
    { value: 'oui', label: 'Oui', icon: GraduationCap },
    { value: 'non-exp', label: "Non, mais j'ai plus de 3 ans d'expérience", icon: Hammer },
    { value: 'non', label: 'Non, moins de 3 ans d’expérience', icon: Sprout }
  ]},
  { id: 'goal', title: 'Quel est votre objectif principal ?', subtitle: 'On relie votre projet à la meilleure trajectoire de certification.', options: [
    { value: 'promo', label: 'Évoluer dans mon entreprise', icon: TrendingUp },
    { value: 'change', label: 'Changer de métier', icon: Target },
    { value: 'entrepreneur', label: 'Créer ou reprendre une entreprise', icon: Rocket },
    { value: 'secure', label: 'Sécuriser mon poste avec un diplôme', icon: ShieldCheck }
  ]},
  { id: 'funding', title: 'Comment aimeriez-vous financer votre formation ?', subtitle: 'On vous oriente ensuite sur le bon dossier.', options: [
    { value: 'cpf', label: 'Mon CPF', icon: Wallet },
    { value: 'opco', label: 'Mon OPCO ou mon employeur', icon: Building2 },
    { value: 'aif', label: 'France Travail ou AIF', icon: Landmark },
    { value: 'perso', label: 'Paiement personnel avec échéancier', icon: CreditCard },
    { value: 'unknown', label: 'Je ne sais pas encore', icon: CircleHelp }
  ]}
]

const step = ref(0)
const submitted = ref(false)
const submitting = ref(false)
const answers = reactive({})
const lead = reactive({ firstName: '', email: '', phone: '', consent: false })

const currentQuestion = computed(() => questions[step.value] ?? null)
const score = computed(() => {
  let s = 50
  if (answers.status === 'dirigeant') s += 20
  if (answers.status === 'reconversion') s += 15
  if (answers.diploma === 'non-exp') s += 15
  if (answers.diploma === 'oui') s += 10
  if (answers.goal === 'entrepreneur') s += 15
  if (answers.goal === 'promo') s += 10
  if (answers.funding === 'opco' || answers.funding === 'aif') s += 10
  return Math.min(s, 98)
})

function handleAnswer(id, value) {
  answers[id] = value
  window.setTimeout(() => { step.value += 1 }, 180)
}

function handleSubmit() {
  if (!lead.firstName || !lead.email || !lead.phone || !lead.consent) return
  submitting.value = true
  console.log('Lead captured:', { answers, score: score.value, ...lead })
  submitted.value = true
  submitting.value = false
}
</script>

<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-[70] bg-slate-950/70 p-4 backdrop-blur-sm">
      <div class="flex min-h-full items-center justify-center">
        <div class="w-full max-w-2xl rounded-[1.8rem] border border-white/15 bg-white p-6 shadow-2xl md:p-10">
          <button class="absolute right-6 top-6" @click="emit('close')"><X /></button>
          <template v-if="!submitted">
            <template v-if="currentQuestion">
              <div class="mb-6 flex gap-2"><div v-for="(q,i) in questions" :key="q.id" class="h-1.5 flex-1 rounded-full" :style="{backgroundColor: i <= step ? '#dc2626' : '#e2e8f0'}"></div></div>
              <p class="mb-2 text-[11px] font-bold uppercase tracking-[0.22em] text-red-600">Question {{ step + 1 }} / {{ questions.length }}</p>
              <h3 class="text-3xl font-black text-slate-900">{{ currentQuestion.title }}</h3>
              <p class="mt-3 text-slate-500">{{ currentQuestion.subtitle }}</p>
              <div class="mt-8 space-y-3">
                <button v-for="option in currentQuestion.options" :key="option.value" type="button" class="flex w-full items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 text-left hover:border-red-500 hover:bg-red-50" @click="handleAnswer(currentQuestion.id, option.value)">
                  <component :is="option.icon" class="h-5 w-5 text-slate-700" />
                  <span class="flex-1 font-semibold text-slate-900">{{ option.label }}</span>
                  <ArrowRight class="h-4 w-4 text-slate-300" />
                </button>
              </div>
            </template>
            <template v-else>
              <div class="text-center">
                <div class="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-slate-900 text-4xl font-black text-white">{{ score }}%</div>
                <h3 class="mt-6 text-3xl font-black text-slate-900">Profil analysé</h3>
              </div>
              <div class="mt-8 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                <div class="grid gap-3 md:grid-cols-2">
                  <Input v-model="lead.firstName" placeholder="Prénom" />
                  <Input v-model="lead.phone" placeholder="Téléphone" type="tel" />
                  <Input v-model="lead.email" class="md:col-span-2" placeholder="Email" type="email" />
                </div>
                <label class="mt-4 flex items-start gap-2 text-sm text-slate-600"><input v-model="lead.consent" class="mt-1 h-4 w-4" type="checkbox" />J'accepte d'être contacté par Guestly dans le cadre de cette simulation.</label>
              </div>
              <Button class="mt-6 w-full bg-slate-900 text-white" size="lg" @click="handleSubmit">{{ submitting ? 'Envoi…' : 'Réserver mon appel diagnostic gratuit' }} <ArrowRight class="ml-2 h-4 w-4" /></Button>
            </template>
          </template>
          <template v-else>
            <div class="py-10 text-center">
              <div class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 text-4xl">✅</div>
              <h3 class="mt-5 text-3xl font-black text-slate-900">Merci {{ lead.firstName }} !</h3>
              <p class="mt-3 text-slate-600">Votre simulation est enregistrée. Un conseiller vous contactera sous 24h au {{ lead.phone }}.</p>
              <Button class="mt-6 bg-red-600 text-white" @click="emit('close')">Fermer</Button>
            </div>
          </template>
        </div>
      </div>
    </div>
  </Teleport>
</template>
