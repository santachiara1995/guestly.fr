export const programsSeed = [
  {
    slug: 'rpms',
    category: 'particulier',
    title: 'Titre professionnel Responsable petite et moyenne structure (RPMS)',
    rncpCode: 'RNCP38575',
    levelLabel: 'Niveau 5 (Bac+2)',
    formatLabel: '100 % distanciel',
    rhythmLabel: 'E-learning',
    supportLabel: 'Accompagnement pédagogique',
    intro:
      "Une formation à distance pour développer des compétences de pilotage, d'organisation et de management au sein d'une petite ou moyenne structure.",
    objectiveSummary: [
      "Piloter l'activité et suivre la performance d'une structure.",
      "Manager une équipe et coordonner le travail au quotidien.",
      "Organiser les opérations, la qualité et le suivi de l'activité.",
      'Soutenir le développement, la communication et le reporting.'
    ],
    professionalScope: [
      'Pilotage opérationnel',
      "Management d'équipe",
      'Organisation de l’activité',
      'Reporting et développement'
    ],
    blocks: [
      {
        code: 'Bloc 1',
        title: 'Diriger une structure et une équipe',
        details:
          "Compréhension de l'écosystème de la structure.\nGestion administrative.\nVeille stratégique et réglementaire."
      },
      {
        code: 'Bloc 2',
        title: 'Inscrire la structure dans son territoire',
        details:
          'Analyse du territoire.\nCommunication et marketing territorial.\nDéveloppement de partenariats.'
      },
      {
        code: 'Bloc 3',
        title: 'Manager et animer une équipe',
        details:
          "Fondamentaux du management.\nCommunication, motivation et développement des compétences.\nOrganisation du travail et gestion des conflits."
      },
      {
        code: 'Bloc 4',
        title: "Adapter l'offre de la structure à la demande",
        details:
          "Analyse du marché et des besoins.\nConception et adaptation de l'offre.\nQualité, satisfaction et innovation."
      },
      {
        code: 'Bloc 5',
        title: "Organiser et développer la diffusion de l'offre",
        details:
          'Stratégie commerciale.\nMarketing digital et relation client.\nSuivi des performances.'
      },
      {
        code: 'Bloc 6',
        title: 'Organiser la production',
        details:
          'Organisation des processus.\nPlanification, ressources et sécurité.\nAmélioration continue et gestion de projet.'
      },
      {
        code: 'Bloc 7',
        title: 'Établir et présenter les résultats',
        details:
          "Lecture du bilan et du compte de résultat.\nRapport d'activité.\nOutils de reporting pour le pilotage."
      }
    ],
    sortOrder: 1
  }
]

export const faqSeed = [
  {
    question: 'À qui s’adresse le programme RPMS ?',
    answer:
      "Le titre professionnel RPMS s'adresse aux personnes qui souhaitent consolider des compétences de pilotage, de coordination et de management dans une petite ou moyenne structure.",
    audience: 'particulier',
    sortOrder: 1
  },
  {
    question: 'Quel est le niveau de la certification ?',
    answer:
      "Le titre professionnel Responsable petite et moyenne structure (RPMS), code RNCP38575, correspond à un diplôme de niveau Bac+2 reconnu.",
    audience: 'particulier',
    sortOrder: 2
  },
  {
    question: 'Comment se déroule la formation ?',
    answer:
      'La formation se déroule en 100 % distanciel, en e-learning, avec accompagnement pédagogique.',
    audience: 'particulier',
    sortOrder: 3
  },
  {
    question: 'Quelles compétences sont travaillées ?',
    answer:
      "Le parcours couvre le pilotage d'une activité, le management d'équipe, l'organisation des opérations, le développement, la communication et le reporting.",
    audience: 'particulier',
    sortOrder: 4
  },
  {
    question: "Que se passe-t-il après une demande de rappel ?",
    answer:
      'Un échange permet de préciser votre projet, de répondre à vos questions et de vous orienter vers les informations utiles pour la suite.',
    audience: 'particulier',
    sortOrder: 5
  },
  {
    question: 'Les informations tarifaires et de financement sont-elles publiées ici ?',
    answer:
      'Non. Les informations tarifaires et de financement ne sont pas publiées sur cette page.',
    audience: 'particulier',
    sortOrder: 6
  }
]

export const siteContent = {
  brand: {
    name: "CITYZ'France",
    shortName: "CITYZ'France",
    descriptor: 'Organisme de formation certifié Qualiopi',
    primaryCta: 'Être rappelé',
    secondaryCta: 'Voir le programme'
  },
  positioning: {
    eyebrow: "CITYZ'France",
    title:
      "Avec CITYZ'France, avancez vers des fonctions de pilotage, de management et d'organisation.",
    subtitle:
      "Le RPMS est une formation de niveau 5 (Bac+2) conçue pour développer des bases concrètes en pilotage, management et organisation, dans un cadre 100 % distanciel avec accompagnement pédagogique.",
    fitLine:
      "Si vous cherchez un parcours lisible pour clarifier votre projet et renforcer des responsabilités concrètes, CITYZ'France vous aide à comprendre ce que cette progression peut réellement vous apporter."
  },
  home: {
    proofItems: [
      {
        value: 'RNCP38575',
        label: 'Code RNCP',
        note: 'Titre professionnel RPMS'
      },
      {
        value: 'Niveau 5',
        label: 'Niveau visé',
        note: 'Bac+2'
      },
      {
        value: '100 % distanciel',
        label: 'Modalité',
        note: 'E-learning avec accompagnement pédagogique'
      }
    ],
    valueSection: {
      eyebrow: "Pourquoi CITYZ'France",
      title: 'Un cadre clair pour relier votre projet, le niveau visé et la réalité du parcours',
      description:
        "Avant de vous engager, l'enjeu est d'identifier ce que le RPMS peut structurer dans votre projet et la manière dont CITYZ'France vous accompagne.",
      items: [
        'Situer le niveau 5 (Bac+2) dans une progression vers des fonctions de pilotage et de management.',
        'Comprendre le format 100 % distanciel, l’e-learning et la place de l’accompagnement pédagogique.',
        'Vérifier si les compétences travaillées correspondent à votre contexte, vos questions et votre rythme.'
      ]
    },
    contactBand: {
      eyebrow: 'Prochaine étape',
      title: 'Demandez un rappel pour vérifier si le RPMS correspond à votre projet',
      description:
        "L'échange avec CITYZ'France permet de faire le point sur votre situation, de clarifier les questions utiles et de voir comment avancer.",
      supportLine:
        'Vous repartez avec une vision plus claire du parcours, du niveau visé et des prochaines étapes possibles.'
    },
    highlights: [
      {
        title: 'Piloter une activité avec davantage de recul',
        text: 'Le parcours aide à mieux suivre la performance, structurer les priorités et poser un cadre de décision plus lisible.'
      },
      {
        title: 'Manager et coordonner plus sereinement',
        text: "Le RPMS aborde l'animation d'équipe, l'organisation du travail et la coordination quotidienne avec une logique concrète."
      },
      {
        title: 'Organiser les opérations avec méthode',
        text: "Organisation, qualité, communication et reporting s'articulent pour donner une lecture plus complète des responsabilités visées."
      }
    ],
    journey: [
      {
        title: 'Faire le point sur votre projet',
        text: 'Le rappel part de votre contexte, de vos questions et de ce que vous cherchez à structurer avant toute décision.'
      },
      {
        title: 'Comprendre le cadre du parcours',
        text: "Vous pouvez clarifier le format 100 % distanciel, l'e-learning et l'accompagnement pédagogique avant d'aller plus loin."
      },
      {
        title: 'Décider avec plus de visibilité',
        text: "L'objectif est de vous donner des éléments utiles sur le RPMS, le niveau visé et la suite possible, sans vous brusquer."
      }
    ],
    competencyClusters: [
      'Piloter une activité et sa performance',
      'Manager et animer une équipe',
      'Organiser les opérations et la qualité',
      'Développer l’offre, la communication et le reporting'
    ]
  },
  access: {
    intro:
      "Le parcours se suit à distance avec un accompagnement pédagogique pour avancer vers un diplôme de niveau Bac+2 dans un cadre clair et progressif.",
    reassuranceLine:
      "Vous pouvez vérifier ici si le format, le niveau Bac+2 et l'accompagnement correspondent à votre projet.",
    expectations: [
      "Un projet d'évolution ou de reconversion vers des fonctions de pilotage, de coordination ou de management.",
      'La disponibilité pour avancer avec régularité dans une formation à distance.',
      "Le besoin de vérifier l'adéquation du programme avec votre projet avant d'aller plus loin."
    ],
    supportPoints: [
      '100 % distanciel',
      'E-learning',
      'Accompagnement pédagogique'
    ],
    processSteps: [
      'Découvrir le programme et les compétences visées.',
      "Vérifier le format à distance et l'accompagnement pédagogique.",
      'Demander un rappel pour échanger sur votre projet.'
    ]
  },
  faq: {
    closingNote: {
      eyebrow: 'Pour décider',
      title: 'Les réponses les plus utiles avant un échange',
      description:
        "Les réponses ci-dessus résument les points utiles pour vous situer avant un échange plus personnalisé.",
      supportLine:
        "Si une question reste ouverte, la demande de rappel permet d'aller plus loin sur votre projet."
    }
  },
  contact: {
    heroEyebrow: 'Être rappelé',
    heroTitle: "Parlons de votre projet de formation avec CITYZ'France",
    heroSupport:
      "Le rappel sert à faire le lien entre votre projet, le cadre du RPMS et le niveau 5 (Bac+2) visé.",
    formTitle: 'Présentez votre situation',
    formIntro:
      'Décrivez brièvement votre situation, ce que vous cherchez à clarifier et les questions que vous souhaitez aborder pendant l’échange.',
    formSupport:
      'Quelques informations suffisent pour permettre à CITYZ\'France de revenir vers vous dans de bonnes conditions.',
    guidanceTitle: "Ce que vous pouvez clarifier pendant l'échange",
    guidancePoints: [
      "La place du RPMS dans votre projet d'évolution ou de reconversion.",
      "Le cadre 100 % distanciel, l'e-learning et l'accompagnement pédagogique.",
      'Les compétences travaillées en pilotage, management, organisation et reporting.'
    ],
    nextStepNote: {
      title: 'Ce qui se passe après votre demande',
      points: [
        "Votre demande est prise en compte par CITYZ'France.",
        "L'échange permet de comprendre votre projet et de répondre à vos premières questions.",
        "Les informations demandées restent limitées à ce qui est utile pour vous recontacter."
      ]
    },
    factsTitle: 'Points utiles',
    footerBand: {
      eyebrow: 'Avant de valider',
      title: 'Vous pouvez relire le programme ou la FAQ avant de demander un rappel',
      description:
        'Si vous préférez prendre un peu de recul, ces pages restent accessibles avant de revenir vers le formulaire.'
    },
    phone: '09 77 21 51 61',
    address: '110 Esplanade du General de Gaulle, 92400 Courbevoie',
    city: 'Courbevoie',
    website: 'www.cityzfrance.fr'
  },
  thankYou: {
    nextStepLine:
      "Nous revenons vers vous pour préciser votre projet et répondre à vos questions."
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
    certification: 'Organisme de formation certifié Qualiopi',
    source:
      "Projet RPMS, plaquette RPMS et dossier legal CITYZ'France"
  }
}
