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
      "Une formation à distance pour développer des compétences de pilotage, de management et d'organisation au sein d'une petite ou moyenne structure.",
    objectiveSummary: [
      "Piloter l'activité et suivre la performance d'une structure.",
      "Manager une équipe et coordonner le travail au quotidien.",
      "Organiser les opérations, la qualité et la production de l'activité.",
      "Développer l'ancrage territorial, les partenariats, la communication et le reporting."
    ],
    professionalScope: [
      'Pilotage opérationnel',
      "Management d'équipe",
      'Organisation de la structure',
      "Ancrage territorial et reporting"
    ],
    blocks: [
      {
        code: 'Bloc 1',
        title: 'Diriger une structure et organiser son fonctionnement',
        details:
          "Compréhension de l'écosystème de la structure.\nGestion administrative.\nVeille stratégique et réglementaire."
      },
      {
        code: 'Bloc 2',
        title: 'Inscrire la structure dans son territoire',
        details:
          "Analyse du territoire.\nCommunication de l'offre.\nDéveloppement de partenariats."
      },
      {
        code: 'Bloc 3',
        title: 'Manager et animer une équipe',
        details:
          "Fondamentaux du management.\nCommunication, motivation et développement des compétences.\nOrganisation du travail et gestion des tensions."
      },
      {
        code: 'Bloc 4',
        title: "Adapter l'offre de la structure à la demande",
        details:
          "Analyse du marché et des besoins.\nAjustement de l'offre.\nQualité, satisfaction et innovation."
      },
      {
        code: 'Bloc 5',
        title: "Organiser et développer la diffusion de l'offre",
        details:
          'Stratégie commerciale.\nDiffusion de l’offre et relation client.\nSuivi des performances.'
      },
      {
        code: 'Bloc 6',
        title: 'Organiser la production et les ressources',
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
      "Le titre professionnel Responsable petite et moyenne structure (RPMS), code RNCP38575, correspond à un titre professionnel de niveau 5 (Bac+2) reconnu par l'État.",
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
      "Le parcours couvre le pilotage d'une activité, le management d'équipe, l'organisation des opérations, l'ancrage territorial, la communication et le reporting.",
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
    question: 'Le titre professionnel RPMS aborde-t-il aussi le territoire, les partenariats et le reporting ?',
    answer:
      "Le titre professionnel RPMS relie le pilotage d'activité au territoire, aux partenariats, à la diffusion de l'offre, à la production et au reporting.",
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
    eyebrow: 'Titre professionnel RPMS',
    title:
      'Un repère Bac+2 reconnu pour piloter, manager et organiser une petite ou moyenne structure.',
    subtitle:
      "Le titre professionnel RPMS est un titre de niveau 5 (Bac+2) reconnu par l'État, conçu pour développer des bases concrètes en pilotage, management et organisation, dans un cadre 100 % distanciel avec accompagnement pédagogique.",
    fitLine:
      "Le site aide à situer le titre professionnel RPMS, son niveau, son format et les responsabilités qu'il prépare avant tout échange."
  },
  home: {
    proofItems: [
      {
        value: 'Titre professionnel RPMS',
        label: 'Titre',
        note: 'Titre professionnel reconnu'
      },
      {
        value: 'RNCP38575',
        label: 'Référence',
        note: 'Code RNCP'
      },
      {
        value: 'Niveau 5',
        label: 'Niveau',
        note: 'Bac+2 reconnu par l’État'
      },
      {
        value: '100 % distanciel',
        label: 'Modalité',
        note: 'E-learning avec accompagnement pédagogique'
      }
    ],
    valueSection: {
      eyebrow: "Pourquoi CITYZ'France",
      title: 'Un cadre clair pour relier le titre, le niveau visé et la réalité du parcours',
      description:
        "Avant de vous engager, l'enjeu est d'identifier ce que le titre professionnel RPMS structure concrètement dans votre projet: pilotage, management, organisation, territoire et reporting.",
      items: [
        "Situer le titre professionnel de niveau 5 (Bac+2) dans une progression vers des responsabilités concrètes.",
        'Comprendre le format 100 % distanciel, l’e-learning et la place de l’accompagnement pédagogique.',
        "Vérifier si les compétences travaillées correspondent à votre contexte: pilotage, équipe, offre, territoire et résultats."
      ]
    },
    contactBand: {
      eyebrow: 'Prochaine étape',
      title: 'Demandez un rappel pour situer le titre professionnel RPMS dans votre projet',
      description:
        "L'échange avec CITYZ'France permet de revenir sur le titre, le niveau 5 (Bac+2), le format à distance et les compétences visées.",
      supportLine:
        'Vous repartez avec un cadre plus net sur le programme, les blocs de compétences et la suite possible.'
    },
    highlights: [
      {
        title: 'Piloter une activité avec davantage de recul',
        text: "Le parcours aide à suivre la performance, structurer les priorités et garder une lecture lisible de l'activité."
      },
      {
        title: 'Manager et coordonner plus sereinement',
        text: "Le titre professionnel RPMS aborde l'animation d'équipe, l'organisation du travail et la coordination quotidienne avec une logique concrète."
      },
      {
        title: 'Organiser les opérations avec méthode',
        text: "Organisation, qualité, communication et reporting s'articulent pour donner une lecture plus complète des responsabilités visées."
      }
    ],
    journey: [
      {
        title: 'Situer le titre dans votre projet',
        text: 'Le rappel part de votre contexte, de vos questions et de ce que vous cherchez à structurer avant toute décision.'
      },
      {
        title: 'Comprendre le cadre du parcours',
        text: "Vous pouvez revenir sur le format 100 % distanciel, l'e-learning et l'accompagnement pédagogique avant d'aller plus loin."
      },
      {
        title: 'Décider avec plus de visibilité',
        text: "L'objectif est de vous donner des repères utiles sur le titre professionnel RPMS, le niveau visé et la suite possible."
      }
    ],
    competencyClusters: [
      'Piloter une activité et sa performance',
      'Manager et animer une équipe',
      'Organiser les opérations et la qualité',
      "Développer l'offre, les partenariats et le reporting"
    ]
  },
  access: {
    intro:
      "Le parcours se suit à distance avec un accompagnement pédagogique pour préparer un titre professionnel de niveau 5 (Bac+2) reconnu par l'État dans un cadre clair et progressif.",
    reassuranceLine:
      "Vous pouvez vérifier ici si le format 100 % distanciel, le niveau 5 (Bac+2) et l'accompagnement correspondent à votre projet.",
    expectations: [
      "Un projet d'évolution vers des fonctions de pilotage, de coordination ou de management.",
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
        "Si une question reste ouverte, la demande de rappel permet d'aller plus loin sur votre projet et sur le cadre du titre professionnel."
    }
  },
  contact: {
    heroEyebrow: 'Être rappelé',
    heroTitle: "Parlons de votre projet de formation avec CITYZ'France",
    heroSupport:
      "Le rappel sert à faire le lien entre votre projet, le cadre du titre professionnel RPMS, son niveau 5 (Bac+2) reconnu par l'État et son format 100 % distanciel.",
    formTitle: 'Présentez votre situation',
    formIntro:
      'Décrivez brièvement votre situation, les points utiles pour l’échange et ce que vous souhaitez vérifier à propos du titre professionnel RPMS.',
    formSupport:
      'Quelques informations suffisent pour permettre à CITYZ\'France de revenir vers vous dans de bonnes conditions.',
    guidanceTitle: "Points que vous pouvez aborder pendant l'échange",
    guidancePoints: [
      "La place du titre professionnel RPMS dans votre projet et le niveau visé.",
      "Le cadre 100 % distanciel, l'e-learning et l'accompagnement pédagogique.",
      "Les compétences travaillées en pilotage, management, organisation, territoire et reporting."
    ],
    nextStepNote: {
      title: 'Ce qui se passe après votre demande',
      points: [
        "Votre demande est prise en compte par CITYZ'France.",
        "L'échange permet de comprendre votre projet et de répondre à vos premières questions.",
        "Les informations demandées restent limitées à ce qui est utile pour vous recontacter."
      ]
    },
    factsTitle: 'Repères du titre',
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
