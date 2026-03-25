<script setup>
import { onMounted, ref } from 'vue'

import SectionTitle from '@/components/section-title.vue'
import { api } from '@/lib/api'

const organization = ref(null)

onMounted(async () => {
  const site = await api.getSite()
  organization.value = site.organizationProfile ?? null
})
</script>

<template>
  <div class="space-y-8">
    <SectionTitle
      eyebrow="Mentions légales"
      title="Informations légales"
      description="Informations relatives à l'édition du site de CITYZ'France."
    />

    <article v-if="organization" class="monument-panel surface-cut p-6">
      <div class="space-y-2">
        <h2 class="text-3xl font-semibold text-foreground">{{ organization.legalName }}</h2>
        <p class="text-sm leading-relaxed text-muted-foreground">
          Ces informations permettent d'identifier l'éditeur du site et le cadre de publication.
        </p>
      </div>

      <div class="detail-grid mt-5">
        <div v-if="organization.legalForm" class="detail-row">
          <p class="detail-key">Forme juridique</p>
          <p class="detail-value">{{ organization.legalForm }}</p>
        </div>
        <div v-if="organization.siret" class="detail-row">
          <p class="detail-key">SIRET</p>
          <p class="detail-value">{{ organization.siret }}</p>
        </div>
        <div v-if="organization.rcsNumber" class="detail-row">
          <p class="detail-key">RCS</p>
          <p class="detail-value">{{ organization.rcsNumber }}</p>
        </div>
        <div v-if="organization.ndaNumber" class="detail-row">
          <p class="detail-key">Déclaration d’activité</p>
          <p class="detail-value">{{ organization.ndaNumber }}</p>
        </div>
        <div v-if="organization.capital" class="detail-row">
          <p class="detail-key">Capital</p>
          <p class="detail-value">{{ organization.capital }}</p>
        </div>
        <div v-if="organization.headquartersAddress" class="detail-row">
          <p class="detail-key">Siège</p>
          <p class="detail-value">{{ organization.headquartersAddress }}</p>
        </div>
        <div v-if="organization.phone" class="detail-row">
          <p class="detail-key">Téléphone</p>
          <p class="detail-value">{{ organization.phone }}</p>
        </div>
        <div v-if="organization.website" class="detail-row">
          <p class="detail-key">Site</p>
          <p class="detail-value">{{ organization.website }}</p>
        </div>
        <div v-if="organization.certification" class="detail-row">
          <p class="detail-key">Certification</p>
          <p class="detail-value">{{ organization.certification }}</p>
        </div>
        <div v-if="organization.activities?.length" class="detail-row">
          <p class="detail-key">Activités</p>
          <p class="detail-value">{{ organization.activities.join(' · ') }}</p>
        </div>
        <div v-if="organization.source" class="detail-row">
          <p class="detail-key">Sources</p>
          <p class="detail-value">{{ organization.source }}</p>
        </div>
      </div>
    </article>
  </div>
</template>
