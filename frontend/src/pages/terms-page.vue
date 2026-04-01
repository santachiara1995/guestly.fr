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
      eyebrow="CGV / CGU"
      title="Conditions générales du site et de la formation"
      description="Conditions de consultation du site, de prise de contact et de demande d'inscription à la formation RPMS."
    />

    <article class="monument-panel surface-cut space-y-8 p-6 text-sm leading-relaxed text-muted-foreground">
      <section class="space-y-3">
        <h2 class="text-2xl font-semibold text-foreground">CGU du site</h2>
        <p>
          Le site CITYZ'France présente la formation RPMS, ses modalités, ses pages d'information
          et ses formulaires de contact ou d'inscription. Son utilisation implique une navigation
          loyale, conforme à sa destination et sans tentative d'altération de son fonctionnement.
        </p>
        <p>
          Les contenus diffusés sur le site ont pour objet d'informer l'utilisateur sur la
          formation, son organisation, son financement et les modalités de contact. CITYZ'France
          peut faire évoluer ces contenus pour tenir compte des mises à jour pédagogiques,
          administratives ou techniques.
        </p>
      </section>

      <section class="space-y-3">
        <h2 class="text-2xl font-semibold text-foreground">CGV de la formation RPMS</h2>
        <p>
          Les demandes d'inscription effectuées depuis le site portent sur la formation RPMS
          proposée par CITYZ'France. Le tarif de référence, les modalités de règlement et les
          principales conditions d'accès sont ceux affichés sur la page Financement au moment de la
          demande.
        </p>
        <p>
          L'accès à la formation, à la plateforme et aux services associés intervient après
          validation du dossier d'inscription et selon les modalités de paiement retenues. En cas
          de paiement échelonné, le déroulement du parcours reste soumis au respect des échéances
          prévues.
        </p>
      </section>

      <section class="space-y-3">
        <h2 class="text-2xl font-semibold text-foreground">Formulaires et prise de contact</h2>
        <p>
          Les formulaires du site permettent soit de demander un rappel, soit de lancer une demande
          d'inscription. Les informations saisies doivent être exactes, à jour et strictement liées
          au projet de formation ou à la demande d'information.
        </p>
        <p>
          Toute demande transmise via le site vaut prise de contact volontaire avec CITYZ'France en
          vue d'obtenir une information, un rappel ou un accompagnement dans le parcours
          d'inscription.
        </p>
      </section>

      <section class="space-y-3">
        <h2 class="text-2xl font-semibold text-foreground">Références de l'organisme</h2>
        <div class="detail-grid">
          <div v-if="organization?.legalName" class="detail-row">
            <p class="detail-key">Organisme</p>
            <p class="detail-value">{{ organization.legalName }}</p>
          </div>
          <div v-if="organization?.siret" class="detail-row">
            <p class="detail-key">SIRET</p>
            <p class="detail-value">{{ organization.siret }}</p>
          </div>
          <div v-if="organization?.ndaNumber" class="detail-row">
            <p class="detail-key">NDA</p>
            <p class="detail-value">{{ organization.ndaNumber }}</p>
          </div>
          <div v-if="organization?.headquartersAddress" class="detail-row">
            <p class="detail-key">Adresse</p>
            <p class="detail-value">{{ organization.headquartersAddress }}</p>
          </div>
          <div v-if="organization?.phone" class="detail-row">
            <p class="detail-key">Téléphone</p>
            <p class="detail-value">{{ organization.phone }}</p>
          </div>
          <div v-if="organization?.website" class="detail-row">
            <p class="detail-key">Site</p>
            <p class="detail-value">{{ organization.website }}</p>
          </div>
        </div>
      </section>
    </article>
  </div>
</template>
