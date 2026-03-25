<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'

const site = ref({
  thankYou: {}
})

onMounted(async () => {
  try {
    site.value = await api.getSite()
  } catch {
    // Keep the static fallback copy if the payload cannot be loaded.
  }
})

const nextStepLine = computed(
  () =>
    site.value.thankYou?.nextStepLine ??
    'Nous revenons vers vous pour préciser votre projet et répondre à vos questions.'
)
</script>

<template>
  <section class="page-cut rounded-[1.6rem] p-8 sm:p-10 lg:p-12">
    <div class="mx-auto max-w-3xl text-center">
      <p class="kicker">Merci</p>
      <h1 class="editorial-title mt-3 text-[clamp(2.2rem,4vw,3.8rem)] text-foreground">
        Votre demande a bien été envoyée.
      </h1>
      <p class="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
        {{ nextStepLine }}
      </p>

      <div class="mx-auto mt-6 flex flex-wrap justify-center gap-3">
        <RouterLink to="/">
          <Button variant="outline">Retour à l’accueil</Button>
        </RouterLink>
        <RouterLink to="/programme">
          <Button>Voir le programme</Button>
        </RouterLink>
      </div>
    </div>
  </section>
</template>
