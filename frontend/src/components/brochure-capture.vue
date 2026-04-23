<script setup>
import { ref } from 'vue'
import { Download } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const email = ref('')
const submitted = ref(false)

function submitForm() {
  if (!email.value) return
  console.log('Brochure request:', email.value)
  submitted.value = true
}
</script>

<template>
  <section class="py-20 bg-slate-50">
    <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col items-center gap-8 rounded-3xl border border-slate-200 bg-white p-8 md:flex-row md:p-12">
        <div class="flex h-24 w-24 items-center justify-center rounded-2xl bg-red-50 text-4xl">
          📘
        </div>
        <div class="flex-1 text-center md:text-left">
          <template v-if="!submitted">
            <p class="text-[10px] font-black uppercase tracking-widest text-red-600">Guide gratuit</p>
            <h3 class="mt-2 text-3xl font-black text-slate-900">Recevez la brochure complète du Titre Pro RPMS</h3>
            <p class="mt-3 text-slate-600">Programme détaillé, financement, témoignages, FAQ. PDF envoyé par email.</p>
            <div class="mt-6 flex flex-col gap-3 sm:flex-row">
              <Input v-model="email" class="flex-1" placeholder="votre@email.fr" type="email" />
              <Button class="bg-slate-900 text-white" size="lg" @click="submitForm">Recevoir la brochure</Button>
            </div>
          </template>
          <template v-else>
            <div class="text-4xl">✉️</div>
            <h3 class="mt-3 text-3xl font-black text-slate-900">C'est parti !</h3>
            <p class="mt-3 text-slate-600">La brochure arrive dans votre boîte mail dans quelques minutes.</p>
            <a class="mt-5 inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900" href="/brochures/guide-rpms.pdf" target="_blank" rel="noreferrer">
              <Download class="h-4 w-4" /> Ouvrir la brochure
            </a>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>
