<script setup>
import { RouterLink } from 'vue-router'

import { Button } from '@/components/ui/button'
</script>

<template>
  <section class="arch-cta p-10 text-center lg:p-12">
    <p class="kicker">Merci</p>
    <h1 class="mt-3 text-3xl font-semibold sm:text-4xl">
      Votre demande a bien été transmise.
    </h1>
    <p class="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
      L’équipe de CITYZ'France reviendra vers vous à partir des informations communiquées dans le
      formulaire.
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
