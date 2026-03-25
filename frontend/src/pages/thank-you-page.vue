<script setup>
import { RouterLink } from 'vue-router'

import { Button } from '@/components/ui/button'
</script>

<template>
  <section class="page-cut rounded-[1.6rem] p-8 text-center sm:p-10 lg:p-12">
    <p class="kicker">Merci</p>
    <h1 class="editorial-title mt-3 text-[clamp(2.2rem,4vw,3.6rem)] text-foreground">
      Votre demande a bien été transmise.
    </h1>
    <p class="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
      Un membre de CITYZ'France reviendra vers vous à partir des informations communiquées dans
      votre demande.
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
