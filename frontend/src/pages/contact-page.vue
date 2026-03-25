<script setup>
import { computed, onMounted, ref } from 'vue'

import LeadForm from '@/components/lead-form.vue'
import SectionTitle from '@/components/section-title.vue'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { api } from '@/lib/api'

const site = ref({
  contact: {
    phone: '09 77 21 51 61',
    address: '110 Esplanade du General de Gaulle, 92400 Courbevoie',
    website: 'www.cityzfrance.fr'
  },
  organizationProfile: {
    headquartersAddress: '110 Esplanade du General de Gaulle, 92400 Courbevoie'
  }
})
const program = ref({
  title: 'Titre professionnel Responsable petite et moyenne structure (RPMS)',
  rncpCode: 'RNCP38575',
  levelLabel: 'Niveau 5 (Bac+2)',
  formatLabel: '100 % distanciel',
  rhythmLabel: 'E-learning'
})
const loading = ref(true)

onMounted(async () => {
  try {
    const [sitePayload, programPayload] = await Promise.all([
      api.getSite(),
      api.getProgram('rpms')
    ])
    site.value = sitePayload
    program.value = programPayload
  } finally {
    loading.value = false
  }
})

const displayPhone = computed(() => site.value.contact?.phone?.trim() ?? null)
const displayAddress = computed(
  () =>
    site.value.contact?.address?.trim() ??
    site.value.organizationProfile?.headquartersAddress?.trim() ??
    null
)
</script>

<template>
  <div class="space-y-10 lg:space-y-12">
    <SectionTitle
      eyebrow="Contact"
      title="Demande de rappel"
      description="Le formulaire centralise la prise de contact autour du programme RPMS pour particuliers."
    />

    <div class="grid gap-5 lg:grid-cols-[1.08fr,0.92fr]">
      <Card class="panel-shell">
        <CardHeader class="space-y-3">
          <CardTitle>Présenter votre projet</CardTitle>
          <p class="text-sm leading-relaxed text-muted-foreground">
            Décrivez votre contexte et ce que vous souhaitez clarifier. La demande reste liée au programme RPMS.
          </p>
        </CardHeader>
        <CardContent>
          <LeadForm source-page="/contact" />
        </CardContent>
      </Card>

      <div class="space-y-4">
        <Card class="panel-shell">
          <CardHeader>
            <CardTitle>Repères publics</CardTitle>
          </CardHeader>
          <CardContent class="space-y-3 text-sm leading-relaxed text-muted-foreground">
            <Badge variant="outline">{{ program?.rncpCode }}</Badge>
            <p><strong class="text-foreground">Titre :</strong> {{ program?.title }}</p>
            <p><strong class="text-foreground">Niveau :</strong> {{ program?.levelLabel }}</p>
            <p><strong class="text-foreground">Modalité :</strong> {{ program?.formatLabel }}</p>
            <p><strong class="text-foreground">Format :</strong> {{ program?.rhythmLabel }}</p>
          </CardContent>
        </Card>

        <Card class="panel-shell">
          <CardHeader>
            <CardTitle>Coordonnées utiles</CardTitle>
          </CardHeader>
          <CardContent class="space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p v-if="displayPhone">
              <strong class="text-foreground">Téléphone :</strong> {{ displayPhone }}
            </p>
            <p v-if="displayAddress">
              <strong class="text-foreground">Adresse :</strong> {{ displayAddress }}
            </p>
            <p v-if="loading">Chargement des coordonnées...</p>
          </CardContent>
        </Card>

        <Card class="panel-shell">
          <CardHeader>
            <CardTitle>Après l’envoi</CardTitle>
          </CardHeader>
          <CardContent class="space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>La demande est enregistrée sur le site.</p>
            <p>Le rappel sert à préciser le besoin et le contexte de la demande.</p>
            <p>Les informations publiées restent concentrées sur le cadre RPMS.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>
