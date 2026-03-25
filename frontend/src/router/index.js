import { h } from 'vue'
import { createRouter, createWebHistory, RouterLink } from 'vue-router'

import AccessSupportPage from '@/pages/access-support-page.vue'
import ContactPage from '@/pages/contact-page.vue'
import FaqPage from '@/pages/faq-page.vue'
import HomePage from '@/pages/home-page.vue'
import LegalPage from '@/pages/legal-page.vue'
import PrivacyPage from '@/pages/privacy-page.vue'
import ProgramPage from '@/pages/program-page.vue'
import ThankYouPage from '@/pages/thank-you-page.vue'

const brandName = "CITYZ'France"

const notFoundPage = {
  name: 'NotFoundPage',
  render() {
    return h('section', { class: 'page-cut rounded-[1.25rem] p-6 sm:p-8 lg:p-10' }, [
      h('p', { class: 'kicker' }, 'Page introuvable'),
      h(
        'h1',
        { class: 'editorial-title mt-3 text-[clamp(2rem,3vw,3rem)] text-foreground' },
        'Cette adresse ne fait pas partie du site public.'
      ),
      h(
        'p',
        { class: 'mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg' },
        "Le lien demandé est ancien ou incorrect. Revenez à l'accueil ou utilisez le formulaire de contact."
      ),
      h('div', { class: 'mt-6 flex flex-wrap gap-3' }, [
        h(
          RouterLink,
          {
            to: '/',
            class:
              'inline-flex items-center rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90'
          },
          () => "Retour à l'accueil"
        ),
        h(
          RouterLink,
          {
            to: '/contact',
            class:
              'inline-flex items-center rounded-xl border border-border/70 bg-background/80 px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-background'
          },
          () => 'Être rappelé'
        )
      ])
    ])
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: {
      title: 'Accueil'
    }
  },
  {
    path: '/programme',
    name: 'programme',
    component: ProgramPage,
    meta: {
      title: 'Programme'
    }
  },
  {
    path: '/acces-et-accompagnement',
    name: 'acces-et-accompagnement',
    component: AccessSupportPage,
    meta: {
      title: 'Accès et accompagnement'
    }
  },
  {
    path: '/faq',
    name: 'faq',
    component: FaqPage,
    meta: {
      title: 'FAQ'
    }
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactPage,
    meta: {
      title: 'Contact'
    }
  },
  {
    path: '/mentions-legales',
    name: 'mentions-legales',
    component: LegalPage,
    meta: {
      title: 'Mentions légales'
    }
  },
  {
    path: '/politique-confidentialite',
    name: 'politique-confidentialite',
    component: PrivacyPage,
    meta: {
      title: 'Politique de confidentialité'
    }
  },
  {
    path: '/merci',
    name: 'merci',
    component: ThankYouPage,
    meta: {
      title: 'Merci'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: notFoundPage,
    meta: {
      title: 'Page introuvable'
    }
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  }
})

router.afterEach((to) => {
  const page = to.meta?.title ? ` - ${to.meta.title}` : ''
  document.title = `${brandName}${page}`
})
