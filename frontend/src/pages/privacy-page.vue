<script setup>
import { onMounted, ref } from 'vue'

import { api } from '@/lib/api'

const site = ref({})

onMounted(async () => {
  site.value = await api.getSite()
})
</script>

<template>
  <div class="space-y-8">
    <section class="space-y-3">
      <p class="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
        Politique de confidentialité
      </p>
      <h1 class="text-3xl font-semibold text-foreground">Protection des données personnelles</h1>
      <p class="max-w-3xl text-base leading-relaxed text-muted-foreground">
        Les informations transmises via le formulaire sont utilisées exclusivement pour traiter
        une demande de rappel liée au programme présenté sur ce site.
      </p>
    </section>

    <section class="diamond-panel surface-cut space-y-4 rounded-[2rem] p-8 text-sm leading-relaxed text-muted-foreground">
      <p v-if="site.organizationProfile?.legalName">
        Responsable du traitement : {{ site.organizationProfile.legalName }}
      </p>
      <p>
        Ce site collecte les informations saisies dans le formulaire de rappel : identité,
        coordonnées de contact et message libre.
      </p>
      <p>
        Ces données sont utilisées pour traiter la demande, organiser le rappel et assurer le suivi
        de la prise de contact liée au programme présenté sur le site.
      </p>
      <p>
        Le formulaire public du site n’a pas d’autre finalité que la gestion de cette relation de
        contact.
      </p>
      <p>
        Pour toute demande relative aux informations transmises via le site, le point de référence
        affiché publiquement reste le siège de l’organisme.
      </p>
      <p v-if="site.organizationProfile?.headquartersAddress">
        Adresse de référence : {{ site.organizationProfile.headquartersAddress }}
      </p>
    </section>
  </div>
</template>
