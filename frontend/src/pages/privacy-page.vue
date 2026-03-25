<script setup>
import { onMounted, ref } from 'vue'

import SectionTitle from '@/components/section-title.vue'
import { api } from '@/lib/api'

const site = ref({})

onMounted(async () => {
  site.value = await api.getSite()
})
</script>

<template>
  <div class="space-y-8">
    <SectionTitle
      eyebrow="Politique de confidentialité"
      title="Protection des données personnelles"
      description="Les informations transmises via le formulaire sont utilisées exclusivement pour traiter une demande de rappel liée au programme présenté sur ce site."
    />

    <article class="monument-panel surface-cut p-6 text-sm leading-relaxed text-muted-foreground">
      <div class="detail-grid">
        <div v-if="site.organizationProfile?.legalName" class="detail-row">
          <p class="detail-key">Responsable du traitement</p>
          <p class="detail-value">{{ site.organizationProfile.legalName }}</p>
        </div>
        <div class="detail-row">
          <p class="detail-key">Collecte</p>
          <p class="detail-value">
            Ce site collecte les informations saisies dans le formulaire de rappel: identité,
            coordonnées de contact et message libre.
          </p>
        </div>
        <div class="detail-row">
          <p class="detail-key">Finalité</p>
          <p class="detail-value">
            Ces données servent à traiter la demande, organiser le rappel et assurer le suivi de
            la prise de contact liée au programme présenté sur le site.
          </p>
        </div>
        <div class="detail-row">
          <p class="detail-key">Cadre</p>
          <p class="detail-value">
            Le formulaire public du site n’a pas d’autre finalité que la gestion de cette relation
            de contact.
          </p>
        </div>
        <div class="detail-row">
          <p class="detail-key">Référence</p>
          <p class="detail-value">
            Pour toute demande relative aux informations transmises via le site, le point de
            référence affiché publiquement reste le siège de l’organisme.
          </p>
        </div>
        <div v-if="site.organizationProfile?.headquartersAddress" class="detail-row">
          <p class="detail-key">Adresse de référence</p>
          <p class="detail-value">{{ site.organizationProfile.headquartersAddress }}</p>
        </div>
      </div>
    </article>
  </div>
</template>
