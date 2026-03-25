<script setup>
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import { useExperienceVariant } from '@/composables/use-experience-variant'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { api } from '@/lib/api'

const props = defineProps({
  sourcePage: {
    type: String,
    default: '/contact'
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
  message: '',
  consentRgpd: false
})

async function submitForm() {
  errorMessage.value = ''

  if (!form.consentRgpd) {
    errorMessage.value = 'Le consentement RGPD est obligatoire.'
    return
  }

  submitting.value = true
  try {
    await api.submitLead({
      ...form,
      sourcePage: sourcePageWithExperience.value,
      honeypot: ''
    })
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
    </div>

    <label class="form-field">
      <span>Votre projet</span>
      <Textarea
        v-model="form.message"
        autocomplete="off"
        name="message"
        placeholder="Indiquez votre contexte, votre objectif et ce que vous souhaitez clarifier lors du rappel."
        required
        rows="7"
      />
    </label>

    <label class="elevated-item flex items-start gap-3 rounded-[1rem] p-4">
      <input
        v-model="form.consentRgpd"
        class="mt-1 h-4 w-4 rounded border-input bg-white accent-primary"
        name="consent-rgpd"
        required
        type="checkbox"
      >
      <span class="text-sm leading-relaxed text-muted-foreground">
        J’accepte d’être recontacté par CITYZ'France dans le cadre de cette demande et du traitement
        de mes données personnelles.
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
      {{ submitting ? 'Envoi en cours...' : 'Être rappelé' }}
    </Button>
  </form>
</template>
