<script setup>
import { onMounted, ref } from 'vue'

import SectionTitle from '@/components/section-title.vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
      title="Informations éditeur"
      description="Données publiques présentées pour l’information des visiteurs du site."
    />

    <Card v-if="organization" class="diamond-panel surface-cut">
      <CardHeader>
        <CardTitle>{{ organization.legalName }}</CardTitle>
      </CardHeader>
      <CardContent class="space-y-2 text-sm leading-relaxed text-muted-foreground">
        <p v-if="organization.legalForm">
          <strong class="text-foreground">Forme juridique :</strong> {{ organization.legalForm }}
        </p>
        <p v-if="organization.siret">
          <strong class="text-foreground">SIRET :</strong> {{ organization.siret }}
        </p>
        <p v-if="organization.rcsNumber">
          <strong class="text-foreground">RCS :</strong> {{ organization.rcsNumber }}
        </p>
        <p v-if="organization.ndaNumber">
          <strong class="text-foreground">Numéro de déclaration d’activité :</strong>
          {{ organization.ndaNumber }}
        </p>
        <p v-if="organization.capital">
          <strong class="text-foreground">Capital :</strong> {{ organization.capital }}
        </p>
        <p v-if="organization.headquartersAddress">
          <strong class="text-foreground">Siège :</strong> {{ organization.headquartersAddress }}
        </p>
        <p v-if="organization.phone">
          <strong class="text-foreground">Téléphone :</strong> {{ organization.phone }}
        </p>
        <p v-if="organization.website">
          <strong class="text-foreground">Site :</strong> {{ organization.website }}
        </p>
        <p v-if="organization.certification">
          <strong class="text-foreground">Certification :</strong> {{ organization.certification }}
        </p>
        <p v-if="organization.activities?.length"><strong class="text-foreground">Activités :</strong></p>
        <ul v-if="organization.activities?.length" class="space-y-1">
          <li v-for="item in organization.activities" :key="item">- {{ item }}</li>
        </ul>
        <p v-if="organization.source">
          <strong class="text-foreground">Sources :</strong> {{ organization.source }}
        </p>
      </CardContent>
    </Card>
  </div>
</template>
