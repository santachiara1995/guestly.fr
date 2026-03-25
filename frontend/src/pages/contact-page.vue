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
  () => site.value.contact?.address?.trim() ?? site.value.organizationProfile?.headquartersAddress?.trim() ?? null
)
</script>

<template>
  <div class="space-y-10">
    <SectionTitle
      eyebrow="Contact"
      title="Demande de rappel"
      description="Un seul formulaire pour centraliser la prise de contact autour du programme RPMS."
    />

    <section class="architectural-band grid gap-8 p-8 lg:grid-cols-[1.06fr,0.94fr] lg:p-12">
      <Card class="p-0">
        <CardHeader class="border-b border-border/70 px-6 py-5">
          <CardTitle>Présenter votre projet</CardTitle>
          <p class="text-sm leading-relaxed text-muted-foreground">
            Décrivez votre contexte et ce que vous souhaitez clarifier. La demande reste rattachée
            au programme RPMS pour particuliers.
          </p>
        </CardHeader>
        <CardContent class="px-6 py-6">
          <LeadForm source-page="/contact" />
        </CardContent>
      </Card>

      <div class="space-y-4">
        <article class="monument-panel surface-cut p-6">
          <div class="flex items-center justify-between gap-3">
            <h2 class="text-2xl font-semibold text-foreground">Repères rapides</h2>
            <Badge variant="outline">{{ program?.rncpCode }}</Badge>
          </div>

          <div class="detail-grid mt-4">
            <div class="detail-row">
              <p class="detail-key">Titre</p>
              <p class="detail-value">{{ program?.title }}</p>
            </div>
            <div class="detail-row">
              <p class="detail-key">Niveau</p>
              <p class="detail-value">{{ program?.levelLabel }}</p>
            </div>
            <div class="detail-row">
              <p class="detail-key">Modalité</p>
              <p class="detail-value">{{ program?.formatLabel }}</p>
            </div>
            <div class="detail-row">
              <p class="detail-key">Format</p>
              <p class="detail-value">{{ program?.rhythmLabel }}</p>
            </div>
          </div>
        </article>

        <article class="monument-panel surface-cut p-6">
          <h2 class="text-2xl font-semibold text-foreground">Coordonnées utiles</h2>

          <div class="detail-grid mt-4">
            <div v-if="displayPhone" class="detail-row">
              <p class="detail-key">Téléphone</p>
              <p class="detail-value">{{ displayPhone }}</p>
            </div>
            <div v-if="displayAddress" class="detail-row">
              <p class="detail-key">Adresse</p>
              <p class="detail-value">{{ displayAddress }}</p>
            </div>
            <div v-if="site.contact?.website" class="detail-row">
              <p class="detail-key">Site</p>
              <p class="detail-value">{{ site.contact.website }}</p>
            </div>
          </div>

          <p v-if="loading" class="mt-4 text-sm text-muted-foreground">Chargement des coordonnées...</p>
        </article>

        <article class="monument-panel surface-cut p-6">
          <h2 class="text-2xl font-semibold text-foreground">Après l’envoi</h2>
          <div class="detail-grid mt-4">
            <div class="detail-row">
              <p class="detail-key">Étape 1</p>
              <p class="detail-value">La demande est enregistrée sur le site.</p>
            </div>
            <div class="detail-row">
              <p class="detail-key">Étape 2</p>
              <p class="detail-value">Le rappel sert à préciser le besoin et le contexte de la demande.</p>
            </div>
            <div class="detail-row">
              <p class="detail-key">Étape 3</p>
              <p class="detail-value">Les informations publiées restent concentrées sur le cadre RPMS.</p>
            </div>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>
