<script setup>
import { computed, reactive, ref } from 'vue'
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
  }
})

const emit = defineEmits(['submitted'])
const router = useRouter()
const { toWithExperience } = useExperienceVariant()
const submitting = ref(false)
const errorMessage = ref('')
const sourcePageWithExperience = computed(() => toWithExperience(props.sourcePage))

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  consentRgpd: false
})

const paymentOptions = computed(() => [
  {
    id: 'cash',
    title: 'Paiement Stripe',
    support: 'Règlement comptant',
    href: props.paymentLinks?.cashUrl ?? ''
  },
  {
    id: 'installments',
    title: 'Paiement en plusieurs fois',
    support: '3x ou 4x sans frais',
    href: props.paymentLinks?.installmentsUrl ?? ''
  }
])

const paymentPreference = computed(() =>
  props.selectedPayment === 'installments' ? 'installments' : 'cash'
)

const hasPaymentLinks = computed(() =>
  props.showPaymentSection && paymentOptions.value.some((option) => option.href)
)

const defaultMessage = computed(() =>
  props.submissionMessage ||
  (props.showPaymentSection
    ? paymentPreference.value === 'installments'
      ? 'Inscription RPMS. Préférence de paiement : plusieurs fois.'
      : 'Inscription RPMS. Préférence de paiement : comptant.'
    : 'Demande de rappel via formulaire de contact.')
)

async function submitForm() {
  errorMessage.value = ''

  if (!form.consentRgpd) {
    errorMessage.value = 'Le consentement RGPD est obligatoire.'
    return
  }

  submitting.value = true
  try {
    const payload = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      message: defaultMessage.value,
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
          type="tel"
        />
      </label>

      <label v-if="showDateOfBirth" class="form-field sm:col-span-2">
        <span>Date de naissance</span>
        <Input
          v-model="form.dateOfBirth"
          autocomplete="bday"
          name="birth-date"
          required
          type="date"
        />
      </label>
    </div>

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

      <div class="grid gap-3 sm:grid-cols-2">
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
          <p class="text-base font-semibold text-foreground">{{ option.title }}</p>
          <p class="mt-1 text-sm leading-6 text-muted-foreground">{{ option.support }}</p>
          <Button
            :as="option.href ? 'a' : 'button'"
            :disabled="!option.href"
            :href="option.href || undefined"
            class="mt-4 w-full justify-center"
            rel="noreferrer"
            size="sm"
            target="_blank"
            variant="outline"
          >
            {{ option.href ? 'Ouvrir le lien de paiement' : 'Lien de paiement à activer' }}
          </Button>
        </article>
      </div>

      <p v-if="!hasPaymentLinks" class="text-sm leading-6 text-muted-foreground">
        Les URLs de paiement Stripe ne sont pas encore renseignées dans la configuration.
      </p>
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
