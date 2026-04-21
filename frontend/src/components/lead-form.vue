<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

import { useExperienceVariant } from '@/composables/use-experience-variant'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { api } from '@/lib/api'

const props = defineProps({
  sourcePage: {
    type: String,
    default: '/contact'
  },
  showDateOfBirth: {
    type: Boolean,
    default: true
  },
  showPaymentSection: {
    type: Boolean,
    default: true
  },
  showAppointmentPicker: {
    type: Boolean,
    default: false
  },
  showPromoCode: {
    type: Boolean,
    default: false
  },
  phoneRequired: {
    type: Boolean,
    default: false
  },
  paymentLinks: {
    type: Object,
    default: () => ({
      cashUrl: '',
      installmentsUrl: ''
    })
  },
  selectedPayment: {
    type: String,
    default: ''
  },
  paymentTitle: {
    type: String,
    default: 'Choisissez ensuite votre mode de règlement'
  },
  paymentSupport: {
    type: String,
    default: "Les liens de paiement sont accessibles depuis ce formulaire dès qu'ils sont activés."
  },
  submitLabel: {
    type: String,
    default: "S'inscrire"
  },
  consentLabel: {
    type: String,
    default:
      "J’accepte que CITYZ'France utilise ces informations pour traiter ma demande d'inscription et me recontacter."
  },
  submissionMessage: {
    type: String,
    default: ''
  },
  appointmentTitle: {
    type: String,
    default: 'Créneau souhaité'
  },
  appointmentSupport: {
    type: String,
    default:
      "Choisissez si vous le souhaitez une date et une heure pour être recontacté ou finaliser votre inscription."
  }
})

const emit = defineEmits(['submitted'])
const router = useRouter()
const { toWithExperience } = useExperienceVariant()
const submitting = ref(false)
const errorMessage = ref('')
const sourcePageWithExperience = computed(() => toWithExperience(props.sourcePage))
const paymentChoice = ref('cash')

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  promoCode: '',
  dateOfBirth: '',
  appointmentDate: '',
  appointmentTime: '',
  wantsCallback: false,
  consentRgpd: false
})

function normalizePaymentChoice(value) {
  const normalized = String(value ?? '').trim().toLowerCase()

  if (normalized === 'installments' || normalized === 'state' || normalized === 'cash') {
    return normalized
  }

  if (normalized === 'etat') {
    return 'state'
  }

  return 'cash'
}

watch(
  () => props.selectedPayment,
  (value) => {
    paymentChoice.value = normalizePaymentChoice(value)
  },
  { immediate: true }
)

const paymentOptions = computed(() => [
  {
    id: 'cash',
    title: 'Paiement comptant',
    support: 'Règlement en une seule fois via Stripe.',
    href: props.paymentLinks?.cashUrl ?? ''
  },
  {
    id: 'installments',
    title: 'Paiement en 4 fois avec Alma',
    support: '4 mensualités de 875 € sans frais.',
    href: props.paymentLinks?.installmentsUrl ?? ''
  },
  {
    id: 'state',
    title: "Financement par l'État",
    support: 'AIF / OPCO avec rappel prioritaire pour lancer votre dossier et répondre à vos questions.',
    href: ''
  }
])

const paymentPreference = computed(() => paymentChoice.value)

const hasPaymentLinks = computed(() =>
  props.showPaymentSection &&
  paymentOptions.value.some((option) => option.id !== 'state' && option.href)
)

const defaultMessage = computed(() =>
  props.submissionMessage ||
  (props.showPaymentSection
    ? paymentPreference.value === 'installments'
      ? 'Inscription RPMS. Préférence de paiement : 4 fois avec Alma.'
      : paymentPreference.value === 'state'
        ? "Inscription RPMS. Préférence de financement : État / AIF / OPCO avec rappel programmé."
        : 'Inscription RPMS. Préférence de paiement : comptant.'
    : 'Demande de rappel via formulaire de contact.')
)

const resolvedAppointmentTitle = computed(() =>
  paymentPreference.value === 'state' ? 'Rappel prioritaire' : props.appointmentTitle
)

const resolvedAppointmentSupport = computed(() =>
  paymentPreference.value === 'state'
    ? "Choisissez un créneau pour que l'équipe CITYZ vous rappelle, réponde à vos questions et lance avec vous votre dossier AIF ou OPCO."
    : props.appointmentSupport
)

const shouldShowAppointmentFields = computed(
  () => props.showAppointmentPicker && (form.wantsCallback || paymentPreference.value === 'state')
)

const messageWithAppointment = computed(() => {
  const notes = []

  if (props.showPromoCode && String(form.promoCode ?? '').trim()) {
    notes.push(`Code promo indiqué : ${String(form.promoCode).trim()}.`)
  }

  if (props.showAppointmentPicker && form.wantsCallback) {
    notes.push("Le prospect souhaite être rappelé(e) par l'équipe pour répondre à ses questions.")
  }

  if (shouldShowAppointmentFields.value && form.appointmentDate && form.appointmentTime) {
    notes.push(`Créneau souhaité : ${form.appointmentDate} à ${form.appointmentTime}.`)
  } else if (shouldShowAppointmentFields.value && form.appointmentDate) {
    notes.push(`Date souhaitée : ${form.appointmentDate}.`)
  } else if (shouldShowAppointmentFields.value && form.appointmentTime) {
    notes.push(`Heure souhaitée : ${form.appointmentTime}.`)
  }

  return [defaultMessage.value, ...notes].join(' ').trim()
})

async function submitForm() {
  errorMessage.value = ''

  if (!String(form.firstName ?? '').trim()) {
    errorMessage.value = 'Le prénom est obligatoire.'
    return
  }

  if (!String(form.lastName ?? '').trim()) {
    errorMessage.value = 'Le nom est obligatoire.'
    return
  }

  if (!String(form.email ?? '').trim()) {
    errorMessage.value = "L'adresse email est obligatoire."
    return
  }

  if (!form.consentRgpd) {
    errorMessage.value = 'Le consentement RGPD est obligatoire.'
    return
  }

  if (props.phoneRequired && !String(form.phone ?? '').trim()) {
    errorMessage.value = 'Le numéro de téléphone est obligatoire.'
    return
  }

  submitting.value = true
  try {
    const payload = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      message: messageWithAppointment.value,
      sourcePage: sourcePageWithExperience.value,
      honeypot: ''
    }

    if (props.showDateOfBirth && form.dateOfBirth) {
      payload.dateOfBirth = form.dateOfBirth
    }

    if (props.showPaymentSection) {
      payload.paymentPreference = paymentPreference.value
    }

    await api.submitLead(payload)
    emit('submitted')
    router.push(toWithExperience('/merci'))
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Envoi impossible'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <form
    :aria-busy="submitting ? 'true' : undefined"
    class="space-y-5"
    @submit.prevent="submitForm"
  >
    <div class="hidden" aria-hidden="true">
      <label for="lead-website">Site web</label>
      <input id="lead-website" autocomplete="off" name="website" tabindex="-1" type="text">
    </div>

    <section class="space-y-3 rounded-[1rem] border border-border/70 bg-white/70 p-4">
      <div class="grid gap-4 sm:grid-cols-2">
        <label class="form-field">
          <span>Prénom</span>
          <Input
            v-model="form.firstName"
            autocomplete="given-name"
            name="first-name"
            placeholder="Votre prénom"
            required
          />
        </label>

        <label class="form-field">
          <span>Nom</span>
          <Input
            v-model="form.lastName"
            autocomplete="family-name"
            name="last-name"
            placeholder="Votre nom"
            required
          />
        </label>

        <label class="form-field">
          <span>Email</span>
          <Input
            v-model="form.email"
            autocomplete="email"
            name="email"
            placeholder="nom@domaine.fr"
            required
            type="email"
          />
        </label>

        <label class="form-field">
          <span>Téléphone</span>
          <Input
            v-model="form.phone"
            autocomplete="tel"
            name="phone"
            placeholder="06 00 00 00 00"
            :required="phoneRequired"
            type="tel"
          />
        </label>

        <label v-if="showDateOfBirth" class="form-field min-w-0 sm:col-span-2">
          <span>Date de naissance (optionnel)</span>
          <Input
            v-model="form.dateOfBirth"
            autocomplete="bday"
            class="min-w-0 max-w-full"
            name="birth-date"
            type="date"
          />
        </label>

        <label v-if="showPromoCode" class="form-field sm:col-span-2">
          <span>Code promo (optionnel)</span>
          <Input
            v-model="form.promoCode"
            autocomplete="off"
            name="promo-code"
            placeholder="Votre code promo"
          />
        </label>
      </div>
    </section>

    <section
      v-if="showPaymentSection"
      class="space-y-3 rounded-[1rem] border border-border/70 bg-white/70 p-4"
    >
      <div class="space-y-1">
        <p class="detail-key">{{ paymentTitle }}</p>
        <p class="text-sm leading-6 text-muted-foreground">
          {{ paymentSupport }}
        </p>
      </div>

      <div class="grid gap-3 lg:grid-cols-3">
        <article
          v-for="option in paymentOptions"
          :key="option.id"
          :class="[
            'rounded-[1rem] border p-4 transition-colors',
            paymentPreference === option.id
              ? 'border-primary/40 bg-primary/5'
              : 'border-border/70 bg-white'
          ]"
        >
          <button
            type="button"
            class="w-full text-left"
            @click="paymentChoice = option.id"
          >
          <p class="text-base font-semibold text-foreground">{{ option.title }}</p>
          <p class="mt-1 text-sm leading-6 text-muted-foreground">{{ option.support }}</p>
          </button>

          <div class="mt-4 grid gap-3">
            <Button
              type="button"
              class="w-full justify-center"
              size="sm"
              :variant="paymentPreference === option.id ? 'default' : 'outline'"
              @click="paymentChoice = option.id"
            >
              {{ paymentPreference === option.id ? 'Option sélectionnée' : 'Choisir cette option' }}
            </Button>

          <Button
            v-if="option.href"
            as="a"
            :href="option.href || undefined"
            class="w-full justify-center"
            rel="noreferrer"
            size="sm"
            target="_blank"
            variant="outline"
          >
            Ouvrir le lien de paiement
          </Button>

            <p v-else-if="option.id === 'state'" class="text-sm leading-6 text-muted-foreground">
              Sélectionnez cette option puis programmez un rappel pour lancer votre dossier.
            </p>

            <p v-else class="text-sm leading-6 text-muted-foreground">
              Lien de paiement à activer.
            </p>
          </div>
        </article>
      </div>

      <p v-if="!hasPaymentLinks" class="text-sm leading-6 text-muted-foreground">
        Les URLs Stripe et Alma ne sont pas encore renseignées dans la configuration.
      </p>
    </section>

    <section
      v-if="showAppointmentPicker"
      class="space-y-3 rounded-[1rem] border border-border/70 bg-white/70 p-4"
    >
      <div class="space-y-1">
        <p class="detail-key">{{ resolvedAppointmentTitle }}</p>
        <p class="text-sm leading-6 text-muted-foreground">
          {{ resolvedAppointmentSupport }}
        </p>
      </div>

      <label class="elevated-item flex items-start gap-3 rounded-[1rem] p-4">
        <input
          v-model="form.wantsCallback"
          class="mt-1 h-4 w-4 rounded border-input bg-white accent-primary"
          name="callback-request"
          type="checkbox"
        >
        <span class="text-sm leading-relaxed text-muted-foreground">
          Je souhaite être rappelé(e) par l’équipe CITYZ pour obtenir des réponses sur la formation,
          le financement ou mon inscription.
        </span>
      </label>

      <div v-if="shouldShowAppointmentFields" class="grid gap-4 sm:grid-cols-2">
        <label class="form-field min-w-0">
          <span>Date de rappel</span>
          <Input
            v-model="form.appointmentDate"
            class="min-w-0 max-w-full"
            name="appointment-date"
            type="date"
          />
        </label>

        <label class="form-field min-w-0">
          <span>Heure de rappel</span>
          <Input
            v-model="form.appointmentTime"
            class="min-w-0 max-w-full"
            name="appointment-time"
            type="time"
          />
        </label>
      </div>
    </section>

    <label class="elevated-item flex items-start gap-3 rounded-[1rem] p-4">
      <input
        v-model="form.consentRgpd"
        class="mt-1 h-4 w-4 rounded border-input bg-white accent-primary"
        name="consent-rgpd"
        required
        type="checkbox"
      >
      <span class="text-sm leading-relaxed text-muted-foreground">
        {{ consentLabel }}
      </span>
    </label>

    <p
      v-if="errorMessage"
      aria-live="polite"
      class="rounded-[0.9rem] border border-destructive/15 bg-destructive/10 px-3 py-2 text-sm text-destructive"
      role="status"
    >
      {{ errorMessage }}
    </p>

    <Button :aria-busy="submitting ? 'true' : undefined" :disabled="submitting" size="lg" type="submit">
      {{ submitting ? 'Envoi en cours...' : submitLabel }}
    </Button>
  </form>
</template>
