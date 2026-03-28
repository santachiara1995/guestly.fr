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
    question: 'Le RPMS correspond-il à mon projet ?',
    answer:
      "Oui si vous cherchez un Bac+2 / niveau 5 pour piloter une structure, encadrer une équipe et suivre l'activité. Le détail des compétences est dans l'onglet Programme.",
    audience: 'particulier',
    sortOrder: 1
  },
  {
    question: 'Que couvre exactement le programme ?',
    answer:
      "Le programme est structuré en trois blocs RNCP38575BC01, BC02 et BC03. Vous retrouvez dans l'onglet Programme les compétences bloc par bloc.",
    audience: 'particulier',
    sortOrder: 2
  },
  {
    question: 'Quel format faut-il prévoir ?',
    answer:
      'Le RPMS se suit en 100 % distanciel, en e-learning, avec accompagnement pédagogique. Le parcours est pensé pour avancer à votre rythme.',
    audience: 'particulier',
    sortOrder: 3
  },
  {
    question: 'Combien de temps et quelle évaluation faut-il prévoir ?',
    answer:
      "Le parcours représente 300 h de formation. L'évaluation finale comprend un projet, un entretien technique et un entretien final. Le détail est dans l'onglet Programme.",
    audience: 'particulier',
    sortOrder: 4
  },
  {
    question: 'Comment voir le financement ou poser ma question ?',
    answer:
      "L'onglet Financement présente le prix, les modalités de paiement et les conditions de l'offre. Si vous voulez avancer, contactez-nous directement.",
    audience: 'particulier',
    sortOrder: 5
  }
]

export const siteContent = {
  brand: {
    name: "CITYZ'France",
    shortName: "CITYZ'France",
    descriptor: 'Formation RPMS 100 % distanciel',
    primaryCta: "S'inscrire",
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
      eyebrow: "Bac+2 certifié par l'État · 100 % à distance · 300 h",
      title: "Devenez Manager avec un Bac+2 certifié par l'État.",
      lead:
        'Le titre professionnel RPMS (RNCP38575) forme des managers polyvalents capables de :',
      capabilities: [
        'piloter une activité',
        'encadrer une équipe',
        'gérer une structure (entreprise, association, organisation publique)'
      ]
    },
    proofItems: [
      {
        value: 'Bac+2 / niveau 5',
        label: 'Diplôme reconnu',
        note: "Titre professionnel certifié par l'État"
      },
      {
        value: '100 % à distance',
        label: 'Format souple',
        note: 'E-learning avec accompagnement pédagogique'
      },
      {
        value: '300 h',
        label: 'Durée du parcours',
        note: 'Un format structuré pour avancer avec méthode'
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
      eyebrow: 'Choisissez votre prochaine étape',
      title: 'Avancez là où la décision se joue.',
      description:
        'Programme, financement ou inscription : allez directement au point qui compte pour vous.',
      steps: [
        {
          title: 'Approfondir le programme',
          text: 'Vérifiez les blocs et les compétences avant de vous décider.'
        },
        {
          title: 'Financer la formation',
          text: "Retrouvez le prix, les modalités de paiement et les conditions de l'offre."
        },
        {
          title: "Passer à l'inscription",
          text: "Lancez votre demande dès que le programme et le financement vous conviennent."
        }
      ]
    },
    contactBand: {
      eyebrow: 'Prêt à aller plus loin ?',
      title: 'Développez vos compétences !',
      description: '',
      supportLine:
        "Bac+2 / niveau 5 · diplôme certifié par l'État · 100 % à distance · 300 h"
    }
  },
  program: {
    hero: {
      eyebrow: 'Programme RPMS',
      title: 'Le programme RPMS, bloc par bloc.',
      description:
        '300 h de formation à distance pour préparer un Bac+2 certifié par l’État et entrer dans le détail des compétences attendues.',
      note: 'Niveau 5 / Bac+2 · 100 % distanciel · accompagnement pédagogique.'
    },
    summarySection: {
      eyebrow: "Vue d'ensemble",
      title: 'Trois blocs. Une lecture nette du titre.',
      description:
        'Chaque bloc correspond à un certificat de compétences professionnelles (CCP).'
    },
    competencySection: {
      eyebrow: 'Ce que le titre prépare',
      title:
        "Le RPMS prépare à piloter, mettre en oeuvre et suivre l'activité.",
      description:
        'Commencez par la structure. Le détail vient juste après.'
    },
    objectivesPanel: {
      eyebrow: 'Objectifs pédagogiques',
      title: 'À l’issue de la formation, les apprenants seront capables de :',
      description:
        "Le parcours se suit entièrement à distance, en e-learning, avec une organisation souple pensée pour progresser sans interrompre votre activité professionnelle.",
      items: [
        'diriger une organisation dans sa globalité',
        'piloter l’activité et la performance',
        'encadrer et animer une équipe',
        'développer des partenariats',
        'intégrer les enjeux territoriaux et stratégiques',
        'prendre des décisions éclairées'
      ]
    },
    evaluationSection: {
      eyebrow: 'Durée et évaluation',
      title: '300 h de formation. Épreuve finale : 1 h 35 au total.',
      description:
        "La fiche France Compétences RNCP38575 décrit une évaluation finale structurée autour d'un projet, d'un entretien technique et d'un entretien final.",
      summaryCards: [
        {
          label: 'Volume',
          value: '300 h de formation',
          note: 'Parcours 100 % distanciel avec accompagnement pédagogique.'
        },
        {
          label: 'Évaluation finale',
          value: '1 h 35 au total',
          note: "Projet, entretien technique et entretien final selon la fiche RNCP38575."
        },
        {
          label: 'Structure du titre',
          value: '3 blocs / 3 CCP',
          note: 'Chaque bloc correspond à un certificat de compétences professionnelles.'
        }
      ],
      steps: [
        "Présentation d'un projet réalisé en amont de la session : 45 min.",
        'Entretien technique : 30 min.',
        'Entretien final : 20 min.',
        'Validation par bloc : 45 min par CCP (30 min de présentation et 15 min d’entretien technique).'
      ]
    },
    blocksSection: {
      eyebrow: 'Compétences détaillées',
      title: 'Les compétences, bloc par bloc.',
      description:
        'Chaque compétence est reprise selon la fiche RNCP38575.'
    },
    ctaBand: {
      eyebrow: 'Une question sur le programme ?',
      title: "Passez à l'inscription.",
      description:
        "Vérifiez le financement ou inscrivez-vous si le RPMS correspond à votre projet."
    }
  },
  finance: {
    hero: {
      eyebrow: 'Financement RPMS',
      title: '3 500 € TTC, comptant ou en plusieurs fois.',
      description:
        "Retrouvez ici le prix, les modalités de paiement et les conditions principales de l'offre RPMS."
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
      title: 'Les solutions de règlement proposées',
      options: [
        'Paiement comptant.',
        'Paiement en plusieurs fois sans frais (partenariat COFIDIS).',
        'En 3 fois : 1 000 € + 3 x 833 €.',
        'En 4 fois : 1 000 € + 4 x 625 €.'
      ]
    },
    conditionsSection: {
      eyebrow: 'Conditions à connaître',
      title: "Les conditions principales de l'offre",
      items: [
        "Accès à la plateforme conditionné au paiement.",
        'Suspension en cas de défaut de paiement.',
        "Passage de l'examen entre le 6ème et le 12ème mois."
      ]
    },
    ctaBand: {
      eyebrow: 'Besoin d’aller plus loin ?',
      title: "Passez à l'inscription.",
      description:
        "Vérifiez encore le programme ou passez directement à l'inscription."
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
        "Passez à l'inscription si le programme et le financement vous conviennent."
      ]
    },
    ctaBand: {
      eyebrow: 'Faire le point',
      title: "Inscrivez-vous si le format vous correspond",
      description:
        "Si le format, le programme et le financement correspondent à ce que vous recherchez, passez à l'inscription."
    }
  },
  faq: {
    hero: {
      eyebrow: 'FAQ RPMS',
      title: 'Les réponses utiles avant de choisir le RPMS.',
      description:
        "En cinq questions, vérifiez le titre, le programme, le format et le financement, puis avancez si le RPMS correspond à votre projet."
    },
    closingNote: {
      eyebrow: 'Choisissez la suite utile',
      title: 'Passez à la page qui vous fait avancer.',
      description:
        "Programme pour le détail des compétences, Financement pour les conditions de l'offre, Inscription pour passer à l'action."
    }
  },
  contact: {
    heroEyebrow: 'Inscription RPMS',
    heroTitle: 'Inscrivez-vous au RPMS.',
    heroSupport:
      "Complétez le formulaire pour lancer votre demande et préciser le point que vous souhaitez encore clarifier.",
    formTitle: "Lancez votre inscription",
    formIntro:
      "Quelques informations suffisent pour démarrer votre demande d'inscription.",
    formSupport:
      "Renseignez simplement vos coordonnées et le point utile pour finaliser votre projet.",
    footerBand: {
      eyebrow: "Avant de valider",
      title: 'Programme et financement restent accessibles à tout moment',
      description:
        "Relisez-les si besoin, ou passez directement à l'inscription."
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
