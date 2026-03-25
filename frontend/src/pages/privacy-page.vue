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
      description="Les données transmises via la demande de rappel sont utilisées pour vous recontacter au sujet du programme RPMS."
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
            Les informations saisies dans la demande de rappel portent sur votre identité, vos
            coordonnées et votre message.
          </p>
        </div>
        <div class="detail-row">
          <p class="detail-key">Finalité</p>
          <p class="detail-value">
            Ces données servent uniquement à traiter votre demande de rappel et à vous répondre au
            sujet du programme.
          </p>
        </div>
        <div class="detail-row">
          <p class="detail-key">Cadre</p>
          <p class="detail-value">
            Les informations transmises ne sont utilisées que dans le cadre de cette prise de
            contact.
          </p>
        </div>
        <div class="detail-row">
          <p class="detail-key">Référence</p>
          <p class="detail-value">
            Pour toute question relative à vos données, le point de référence indiqué sur le site
            reste le siège de l'organisme.
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
