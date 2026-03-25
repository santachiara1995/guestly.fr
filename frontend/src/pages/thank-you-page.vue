<script setup>
import { RouterLink } from 'vue-router'

import { Button } from '@/components/ui/button'
</script>

<template>
  <section class="page-cut rounded-[1.25rem] p-6 text-center sm:p-8 lg:p-10">
    <p class="kicker">Merci</p>
    <h1 class="mt-3 text-[clamp(2rem,3vw,3rem)] font-semibold text-foreground">
      Votre demande a bien été transmise.
    </h1>
    <p class="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
      L’équipe de CITYZ'France reviendra vers vous pour poursuivre l’échange à partir des
      informations communiquées dans le formulaire.
    </p>

    <div class="mt-6 flex flex-wrap justify-center gap-3">
      <RouterLink to="/">
        <Button variant="outline">Retour à l’accueil</Button>
      </RouterLink>
      <RouterLink to="/programme">
        <Button>Voir le programme</Button>
      </RouterLink>
    </div>
  </section>
</template>
