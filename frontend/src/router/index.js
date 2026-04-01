import { h } from 'vue'
import { createRouter, createWebHistory, RouterLink } from 'vue-router'

import AccessSupportPage from '@/pages/access-support-page.vue'
import ContactPage from '@/pages/contact-page.vue'
import FinancingPage from '@/pages/financing-page.vue'
import FaqPage from '@/pages/faq-page.vue'
import HomePage from '@/pages/home-page.vue'
import LegalPage from '@/pages/legal-page.vue'
import PrivacyPage from '@/pages/privacy-page.vue'
import ProgramPage from '@/pages/program-page.vue'
import SignupPage from '@/pages/signup-page.vue'
import ThankYouPage from '@/pages/thank-you-page.vue'
import TermsPage from '@/pages/terms-page.vue'

const brandName = "CITYZ'France"

const notFoundPage = {
  name: 'NotFoundPage',
  render() {
    return h('section', { class: 'page-cut rounded-[1.6rem] p-8 sm:p-10 lg:p-12' }, [
      h('p', { class: 'kicker' }, 'Page introuvable'),
      h(
        'h1',
        { class: 'editorial-title mt-3 text-4xl text-foreground sm:text-5xl' },
        "Cette page n'est pas disponible."
      ),
      h(
        'p',
        { class: 'mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg' },
        "Le lien demandé est ancien ou incorrect. Revenez à l'accueil ou utilisez la page contact."
      ),
      h('div', { class: 'mt-6 flex flex-wrap gap-3' }, [
        h(
          RouterLink,
          {
            to: '/',
            class:
              'inline-flex items-center rounded-full border border-primary bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/92'
          },
          () => "Retour à l'accueil"
        ),
        h(
          RouterLink,
          {
            to: '/inscription',
            class:
              'inline-flex items-center rounded-full border border-border bg-card/82 px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary/35 hover:bg-accent'
          },
          () => "S'inscrire"
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
    path: '/financement',
    name: 'financement',
    component: FinancingPage,
    meta: {
      title: 'Financement'
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
    path: '/inscription',
    name: 'inscription',
    component: SignupPage,
    meta: {
      title: 'Inscription'
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
    path: '/cgv-cgu',
    name: 'cgv-cgu',
    component: TermsPage,
    meta: {
      title: 'CGV / CGU'
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
