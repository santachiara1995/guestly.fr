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
      <p class="kicker">Politique de confidentialité</p>
      <h1 class="editorial-title text-[clamp(2rem,3vw,3rem)] text-foreground">
        Protection des données personnelles
      </h1>
      <p class="max-w-3xl text-base leading-relaxed text-muted-foreground">
        Les informations transmises via le formulaire servent uniquement à traiter la demande de
        rappel liée au programme présenté sur ce site.
      </p>
    </section>

    <section class="page-cut space-y-4 rounded-[1.25rem] p-6 text-sm leading-relaxed text-muted-foreground sm:p-8">
      <p v-if="site.organizationProfile?.legalName">
        Responsable du traitement : {{ site.organizationProfile.legalName }}
      </p>
      <p>
        Ce site collecte les informations saisies dans le formulaire de rappel : identité,
        coordonnées de contact et message libre.
      </p>
      <p>
        Ces données sont utilisées pour traiter la demande et organiser le rappel associé au
        programme présenté sur le site.
      </p>
      <p>
        Le formulaire public n’a pas d’autre finalité que la gestion de cette prise de contact.
      </p>
      <p v-if="site.organizationProfile?.headquartersAddress">
        Adresse de référence : {{ site.organizationProfile.headquartersAddress }}
      </p>
    </section>
  </div>
</template>
