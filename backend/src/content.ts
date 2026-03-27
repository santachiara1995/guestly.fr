export const programsSeed = [
  {
    slug: 'rpms',
    category: 'particulier',
    title: 'Titre professionnel Responsable petite et moyenne structure (RPMS)',
    rncpCode: 'RNCP38575',
    levelLabel: 'Niveau 5 / Bac+2',
    formatLabel: '100 % distanciel',
    rhythmLabel: 'E-learning',
    supportLabel: 'Accompagnement pédagogique',
    intro:
      "Titre professionnel de niveau 5 / Bac+2 qui prépare à diriger une structure, mettre en oeuvre son activité et présenter ses résultats.",
    objectiveSummary: [
      "Comprendre l'environnement d'une structure, son territoire et son organisation d'ensemble.",
      "Mettre en oeuvre l'objet social de la structure en adaptant l'offre, sa diffusion et sa production.",
      "Lire l'activité et ses résultats à partir du bilan, du compte de résultat et du rapport d'activité."
    ],
    professionalScope: [
      'Diriger une structure avec une équipe',
      "Mettre en oeuvre l'objet social d'une structure",
      "Suivre l'activité et présenter ses résultats"
    ],
    blocks: [
      {
        code: 'RNCP38575BC01',
        title: 'Diriger une structure avec une équipe',
        details:
          "Développer une vision systémique de la structure dans son environnement\nInscrire la structure dans son territoire\nManager et animer une équipe"
      },
      {
        code: 'RNCP38575BC02',
        title: "Mettre en oeuvre l'objet social de la structure",
        details:
          "Adapter l'offre de la structure à la demande\nOrganiser et développer la diffusion de l'offre\nOrganiser la production"
      },
      {
        code: 'RNCP38575BC03',
        title: "Établir et présenter un rapport d'activité de la structure",
        details:
          "Analyser le bilan de la structure\nAnalyser le compte de résultat de la structure\nRédiger le rapport d'activité de la structure"
      }
    ],
    sortOrder: 1
  }
]

export const faqSeed = [
  {
    question: 'Comment lire rapidement le RPMS ?',
    answer:
      "Commencez par les trois grands blocs de compétences, puis entrez dans le détail de chaque compétence dans l'onglet Programme.",
    audience: 'particulier',
    sortOrder: 1
  },
  {
    question: 'Où retrouver le détail des compétences ?',
    answer:
      "L'onglet Programme présente les trois blocs RNCP38575BC01, BC02 et BC03 avec la liste des compétences associées.",
    audience: 'particulier',
    sortOrder: 2
  },
  {
    question: 'Quel est le format de la formation ?',
    answer:
      'Le RPMS est présenté en 100 % distanciel, en e-learning, avec accompagnement pédagogique.',
    audience: 'particulier',
    sortOrder: 3
  },
  {
    question: 'Quel est le prix annoncé ?',
    answer:
      'Le tarif indiqué pour la formation RPMS est de 3 500 € TTC.',
    audience: 'particulier',
    sortOrder: 4
  },
  {
    question: 'Quelles sont les modalités de paiement ?',
    answer:
      "Le financement mentionne un paiement comptant ainsi qu'un paiement en plusieurs fois sans frais avec partenariat COFIDIS.",
    audience: 'particulier',
    sortOrder: 5
  },
  {
    question: 'Pourquoi demander un rappel ?',
    answer:
      "Le rappel permet de vérifier l'adéquation du titre, du programme, du financement et du format avec votre projet.",
    audience: 'particulier',
    sortOrder: 6
  }
]

export const siteContent = {
  brand: {
    name: "CITYZ'France",
    shortName: "CITYZ'France",
    descriptor: 'Formation RPMS 100 % distanciel',
    primaryCta: 'Être rappelé',
    secondaryCta: 'Voir le programme'
  },
  positioning: {
    eyebrow: '',
    title:
      'Titre professionnel Responsable petite et moyenne structure (RPMS), niveau 5 / Bac+2.',
    subtitle:
      "Un titre reconnu pour développer une vision globale de la structure, piloter son activité et encadrer une équipe.",
    fitLine:
      "En quelques repères, vous identifiez ce que couvre le titre, comment il se suit et quelle suite choisir."
  },
  home: {
    hero: {
      eyebrow: '',
      title: "Le RPMS s'articule autour de trois grands blocs de compétences.",
      lead:
        'Titre professionnel Responsable petite et moyenne structure (RPMS), niveau 5 / Bac+2, en 100 % distanciel, en e-learning, avec accompagnement pédagogique.',
      fitLine:
        "Avant d'aller plus loin, visualisez clairement ce que le titre couvre réellement et la manière dont il peut servir votre projet.",
      decisionTitle: 'Pourquoi commencer ici',
      decisionText:
        "En quelques minutes, vous visualisez l'architecture du titre et vous savez vers quelle étape poursuivre.",
      decisionPoints: [
        'Repérez immédiatement le titre, le code RNCP38575, le niveau 5 / Bac+2 et le format à distance.',
        "Découvrez les trois grands blocs qui structurent le référentiel avant d'entrer dans le détail.",
        'Choisissez ensuite entre le programme détaillé, le financement ou une demande de rappel.'
      ]
    },
    proofItems: [
      {
        value: 'Responsable petite et moyenne structure (RPMS)',
        label: 'Titre',
        note: 'Intitulé officiel'
      },
      {
        value: 'RNCP38575',
        label: 'Référence',
        note: 'Code RNCP'
      },
      {
        value: 'Niveau 5 / Bac+2',
        label: 'Niveau',
        note: "Titre professionnel reconnu par l'État"
      },
      {
        value: '100 % distanciel',
        label: 'Modalité',
        note: 'E-learning avec accompagnement pédagogique'
      }
    ],
    orientationSection: {
      eyebrow: 'Trois grands blocs',
      title: 'Une lecture claire du référentiel dès le premier regard.',
      description:
        "Ces trois blocs donnent la structure complète du titre. Le détail des compétences se retrouve ensuite dans l'onglet Programme.",
      pillars: [
        {
          title: 'BC01',
          text: "Diriger la structure, comprendre son environnement, l'inscrire dans son territoire et animer une équipe."
        },
        {
          title: 'BC02',
          text: "Mettre en oeuvre l'objet social, adapter l'offre, organiser sa diffusion et structurer la production."
        },
        {
          title: 'BC03',
          text: "Analyser l'activité, lire les résultats et rédiger le rapport d'activité de la structure."
        }
      ]
    },
    journeySection: {
      eyebrow: 'La suite, en toute clarté',
      title: 'Trois étapes pour avancer sereinement.',
      description:
        "Vous pouvez approfondir le contenu, consulter les modalités financières ou demander un échange selon votre besoin du moment.",
      steps: [
        {
          title: 'Approfondir le programme',
          text: 'Accédez au détail de chaque bloc et de chaque compétence pour mesurer précisément ce que couvre le RPMS.'
        },
        {
          title: 'Consulter le financement',
          text: "Retrouvez le prix, les modalités de paiement et les principales conditions de l'offre."
        },
        {
          title: 'Demander un rappel',
          text: 'Faites le point sur votre situation et obtenez une réponse claire à vos questions.'
        }
      ]
    },
    contactBand: {
      eyebrow: 'Prêt à aller plus loin ?',
      title: 'Vous avez maintenant les repères essentiels pour décider de la suite.',
      description:
        "Programme, financement et rappel suivent une même logique : vous donner une information claire pour avancer avec confiance.",
      supportLine:
        'RNCP38575, niveau 5 / Bac+2, 100 % distanciel, e-learning et accompagnement pédagogique.'
    }
  },
  program: {
    hero: {
      eyebrow: 'Programme RPMS',
      title:
        'Le programme détaille les compétences contenues dans les trois grands blocs du référentiel.',
      description:
        "Chaque bloc est présenté avec sa liste de compétences associées, sans ajout hors référentiel.",
      note:
        "Vous passez ici d'une vue d'ensemble à une lecture précise des compétences qui structurent le titre."
    },
    summarySection: {
      eyebrow: "Vue d'ensemble",
      title: 'Trois blocs structurent le programme.',
      description:
        "Le référentiel couvre la direction de la structure, la mise en oeuvre de son objet social et la présentation de son activité."
    },
    competencySection: {
      eyebrow: 'Ce que le titre prépare',
      title:
        "Le RPMS prépare un rôle de direction, d'organisation, de mise en oeuvre et de suivi d'activité.",
      description:
        "Cette lecture vous aide à évaluer concrètement la portée du titre avant toute prise de décision."
    },
    blocksSection: {
      eyebrow: 'Compétences détaillées',
      title: 'Chaque bloc est décliné compétence par compétence.',
      description:
        "Vous retrouvez ici le détail de RNCP38575BC01, RNCP38575BC02 et RNCP38575BC03."
    },
    ctaBand: {
      eyebrow: 'Après le programme',
      title: 'Consultez le financement ou demandez un rappel',
      description:
        "Une fois le programme parcouru, vous pouvez vérifier les modalités financières ou faire le point sur votre projet."
    }
  },
  finance: {
    hero: {
      eyebrow: 'Financement RPMS',
      title: 'Le financement du RPMS, présenté de manière claire et directe.',
      description:
        "Prix, modalités de paiement et conditions de l'offre sont réunis ici pour vous permettre d'avancer en connaissance de cause."
    },
    pricing: {
      eyebrow: 'Prix de la formation',
      title: 'Tarif annoncé pour la formation RPMS',
      amount: '3 500 € TTC',
      description:
        "Le tarif présenté correspond à l'offre RPMS de CITYZ'France."
    },
    paymentSection: {
      eyebrow: 'Modalités de paiement',
      title: 'Des solutions de règlement clairement établies',
      options: [
        'Paiement comptant.',
        'Paiement en plusieurs fois sans frais (partenariat COFIDIS).',
        'En 3 fois : 1 000 € + 3 x 833 €.',
        'En 4 fois : 1 000 € + 4 x 625 €.'
      ]
    },
    conditionsSection: {
      eyebrow: 'Conditions à connaître',
      title: "Les conditions principales liées à l'offre",
      items: [
        "Accès à la plateforme conditionné au paiement.",
        'Suspension en cas de défaut de paiement.',
        "Passage de l'examen entre le 6ème et le 12ème mois."
      ]
    },
    ctaBand: {
      eyebrow: 'Besoin d’aller plus loin ?',
      title: 'Revenez au programme ou demandez un rappel',
      description:
        "Le financement complète naturellement la lecture du programme. Si vous souhaitez valider ces éléments dans votre situation, demandez un rappel."
    }
  },
  access: {
    hero: {
      eyebrow: 'Accès et accompagnement',
      title: 'Un format pensé pour avancer à distance avec méthode.',
      description:
        'Le RPMS se suit en 100 % distanciel, en e-learning, avec accompagnement pédagogique.',
      fitLine:
        "Vérifiez simplement si ce format correspond à votre rythme, à vos objectifs et à votre manière d'apprendre."
    },
    fitChecklist: {
      eyebrow: 'Les bons repères avant de démarrer',
      title: 'Trois questions pour vous situer rapidement.',
      description:
        "Cette lecture vous aide à confirmer l'adéquation du format avec votre projet.",
      items: [
        "Souhaitez-vous développer une vision plus complète de la structure, de son activité et de ses résultats ?",
        'Pouvez-vous avancer dans un parcours 100 % distanciel, en e-learning ?',
        'Cherchez-vous un cadre clair avant de passer à un échange individualisé ?'
      ]
    },
    supportSection: {
      eyebrow: 'Ce que CITYZ\'France met à disposition',
      title: 'Un cadre lisible pour apprendre à distance.',
      description:
        "Le format conjugue souplesse, accompagnement et points de repère concrets pour vous permettre d'avancer avec régularité.",
      points: [
        '100 % distanciel',
        'E-learning',
        'Accompagnement pédagogique',
        'Rendez-vous individuel avec un formateur'
      ]
    },
    processSection: {
      eyebrow: 'Le bon enchaînement',
      title: 'Programme, financement, puis échange si vous en ressentez le besoin.',
      description:
        "Cette progression permet de prendre votre décision avec davantage de clarté et moins d'incertitude.",
      steps: [
        'Consultez le détail des trois blocs et des compétences associées.',
        "Prenez connaissance du prix, des modalités de paiement et des conditions de l'offre.",
        'Demandez un rappel pour vérifier la cohérence de votre projet.'
      ]
    },
    ctaBand: {
      eyebrow: 'Faire le point',
      title: 'Demandez un rappel pour clarifier votre projet',
      description:
        "Si le format, le programme et le financement correspondent à ce que vous recherchez, l'échange permet d'aller plus loin."
    }
  },
  faq: {
    hero: {
      eyebrow: 'FAQ RPMS',
      title: 'Les questions les plus utiles avant de vous décider.',
      description:
        "Retrouvez les réponses essentielles sur le titre, le programme, le format et le financement."
    },
    opening: {
      eyebrow: 'Avant de commencer',
      title: 'Des réponses claires, sans détour.',
      description:
        "La FAQ vous aide à confirmer les points essentiels avant de revenir au programme, au financement ou au rappel.",
      bullets: [
        'Vérifier le titre, le niveau et le format.',
        'Comprendre les trois blocs et le détail des compétences.',
        "Consulter les informations financières utiles avant d'aller plus loin."
      ]
    },
    closingNote: {
      eyebrow: 'Une question reste ouverte ?',
      title: 'Revenez au programme, au financement ou demandez un rappel',
      description:
        "Vous gardez ainsi une lecture claire du titre, des compétences et des conditions de l'offre.",
      supportLine:
        "Un échange peut ensuite vous aider à remettre ces éléments dans votre propre situation."
    }
  },
  contact: {
    heroEyebrow: 'Être rappelé',
    heroTitle: 'Le rappel sert à vérifier si le RPMS correspond à votre projet.',
    heroSupport:
      "Précisez votre situation, le bloc qui retient votre attention et, si besoin, le point de financement que vous souhaitez éclaircir.",
    formTitle: 'Parlez-nous de votre projet',
    formIntro:
      "Quelques informations suffisent pour préparer un échange utile autour du titre, du programme et du financement.",
    formSupport:
      "Plus votre demande est précise, plus la réponse pourra être adaptée à votre besoin.",
    guidanceTitle: "Préparez votre échange",
    guidancePoints: [
      'Le rôle ou les responsabilités que vous visez.',
      "L'adéquation du format 100 % distanciel avec votre rythme.",
      'Le prix, les modalités de paiement ou les conditions que vous souhaitez clarifier.'
    ],
    nextStepNote: {
      title: 'Ce qui se passe après votre demande',
      points: [
        "Votre demande est prise en compte par CITYZ'France.",
        "L'échange permet de comprendre votre projet et de répondre à vos premières questions.",
        "Les informations demandées restent limitées à ce qui est utile pour vous recontacter."
      ]
    },
    factsTitle: 'Repères utiles',
    footerBand: {
      eyebrow: "Avant d'envoyer votre demande",
      title: 'Programme et financement restent accessibles à tout moment',
      description:
        "Vous pouvez les relire avant de finaliser votre demande si vous souhaitez confirmer un point."
    },
    phone: '09 77 21 51 61',
    address: '110 Esplanade du General de Gaulle, 92400 Courbevoie',
    city: 'Courbevoie',
    website: 'www.cityzfrance.fr'
  },
  thankYou: {
    nextStepLine:
      "Nous revenons vers vous pour répondre à vos questions sur le programme, le financement et la suite à donner à votre projet."
  },
  organizationProfile: {
    legalName: "CITYZ'France",
    legalForm: 'SASU',
    siret: '992 448 936 00011',
    rcsNumber: '992 448 936 R.C.S. Nanterre',
    ndaNumber: '11923039192',
    capital: '100,00 Euros',
    headquartersAddress: '110 Esplanade du General de Gaulle, 92400 Courbevoie',
    website: 'www.cityzfrance.fr',
    phone: '09 77 21 51 61',
    certification: 'Centre de formation certifié Qualiopi',
    source:
      "France Compétences RNCP38575, Projet RPMS et dossier légal CITYZ'France"
  }
}
