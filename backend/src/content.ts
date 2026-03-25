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
      "Un parcours à distance pour renforcer votre pilotage, votre management et votre organisation dans une petite ou moyenne structure.",
    objectiveSummary: [
      "Piloter l'activité avec une lecture plus claire des priorités et des résultats.",
      "Manager une équipe et mieux coordonner le travail au quotidien.",
      "Structurer les opérations, les ressources, la qualité et la production.",
      "Développer l'offre, les partenariats, le territoire et le reporting avec davantage de méthode."
    ],
    professionalScope: [
      "Piloter l'activité et la performance",
      "Manager et coordonner une équipe",
      'Organiser une structure au quotidien',
      "Développer l'offre, le territoire et le reporting"
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
    question: 'Ce parcours peut-il correspondre à mon projet ?',
    answer:
      "Oui si vous cherchez à renforcer votre capacité à piloter une activité, coordonner une équipe et organiser une structure avec plus de méthode.",
    audience: 'particulier',
    sortOrder: 1
  },
  {
    question: "Qu'allez-vous travailler concrètement ?",
    answer:
      "Le parcours couvre le pilotage d'une activité, le management d'équipe, l'organisation des opérations, la communication, le territoire, les partenariats et le reporting.",
    audience: 'particulier',
    sortOrder: 2
  },
  {
    question: 'Comment la formation se suit-elle au quotidien ?',
    answer:
      'Le parcours se suit en 100 % distanciel, en e-learning, avec accompagnement pédagogique.',
    audience: 'particulier',
    sortOrder: 3
  },
  {
    question: "Sur quels repères officiels s'appuie le parcours ?",
    answer:
      "Vous préparez le titre professionnel Responsable petite et moyenne structure (RPMS), code RNCP38575, un titre professionnel reconnu par l'État de niveau 5 (Bac+2).",
    audience: 'particulier',
    sortOrder: 4
  },
  {
    question: "À quoi sert la demande de rappel ?",
    answer:
      'Elle permet de faire le point sur votre projet, de répondre à vos questions et de vérifier si le parcours correspond à ce que vous cherchez.',
    audience: 'particulier',
    sortOrder: 5
  },
  {
    question: 'Le programme reste-t-il connecté aux réalités du terrain ?',
    answer:
      "Oui. Il relie le pilotage d'activité au territoire, aux partenariats, à la diffusion de l'offre, à la production et au reporting.",
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
      'Vous cherchez à prendre plus de responsabilités dans une petite ou moyenne structure ?',
    subtitle:
      "Ce parcours vous aide à renforcer votre pilotage, votre management et votre organisation avec des repères concrets en activité, équipe, offre, territoire et reporting.",
    fitLine:
      "Avant de laisser vos coordonnées, voyez rapidement si ce parcours correspond à ce que vous cherchez à structurer dans votre projet."
  },
  home: {
    proofItems: [
      {
        value: 'Titre reconnu',
        label: 'Titre',
        note: 'Titre professionnel RPMS'
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
      eyebrow: 'Ce que ce parcours peut vous aider à structurer',
      title: 'Un cadre plus clair pour tenir un rôle plus complet au quotidien.',
      description:
        "L'enjeu n'est pas seulement d'identifier un titre, mais de voir si le parcours répond à ce que vous voulez vraiment mieux piloter, coordonner et organiser.",
      items: [
        "Prendre plus de recul sur l'activité et les priorités.",
        "Mieux coordonner une équipe et organiser le travail.",
        "Structurer l'offre, le territoire, les partenariats et le reporting avec plus de méthode."
      ]
    },
    contactBand: {
      eyebrow: 'Parler de votre projet',
      title: 'Demandez un rappel pour savoir rapidement si ce parcours correspond à votre projet',
      description:
        "En quelques minutes, vous pouvez clarifier le contenu, le niveau visé, le format à distance et les compétences travaillées.",
      supportLine:
        "Vous repartez avec une vision plus nette du programme et de la place qu'il peut prendre dans votre projet."
    },
    highlights: [
      {
        title: "Prendre plus de recul sur l'activité",
        text: "Le parcours vous aide à suivre la performance, structurer les priorités et garder une lecture plus claire de l'activité."
      },
      {
        title: 'Mieux coordonner une équipe',
        text: "Vous travaillez l'animation d'équipe, l'organisation du travail et la coordination quotidienne dans une logique concrète."
      },
      {
        title: 'Structurer les opérations avec méthode',
        text: "Organisation, qualité, communication et reporting s'articulent pour vous donner un cadre d'action plus solide."
      }
    ],
    journey: [
      {
        title: 'Partir de votre situation',
        text: "Vous commencez par ce que vous cherchez à débloquer, clarifier ou mieux organiser dans votre quotidien."
      },
      {
        title: "Vérifier l'adéquation du parcours",
        text: "Vous revenez sur le contenu, le format à distance, l'accompagnement et les repères officiels du parcours."
      },
      {
        title: 'Décider avec une vision claire',
        text: "L'objectif est de vous aider à voir rapidement si ce parcours mérite d'aller plus loin dans votre projet."
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
      "Cette page vous aide à vérifier rapidement si le format à distance, l'accompagnement et les attentes du parcours correspondent à votre manière d'apprendre et à votre projet.",
    reassuranceLine:
      "Vous n'avez pas besoin de tout décider tout de suite: l'essentiel est de voir si le cadre vous convient vraiment.",
    expectations: [
      "L'envie d'évoluer vers plus de pilotage, de coordination ou de management.",
      "La disponibilité pour avancer avec régularité dans un parcours à distance.",
      "Le besoin d'un cadre clair avant de vous engager."
    ],
    supportPoints: [
      '100 % distanciel',
      'E-learning',
      'Accompagnement pédagogique'
    ],
    processSteps: [
      'Consultez les grands blocs et les compétences travaillées.',
      "Vérifiez si le format à distance et l'accompagnement vous conviennent.",
      "Demandez un rappel si vous voulez faire le point sur votre projet."
    ]
  },
  faq: {
    closingNote: {
      eyebrow: 'Encore un doute ?',
      title: 'Commencez par les questions qui comptent le plus pour votre décision',
      description:
        "La FAQ vous donne les repères essentiels. Le rappel sert ensuite à parler de votre situation concrète.",
      supportLine:
        "Si une question reste ouverte, l'échange permet de vérifier si le parcours correspond vraiment à votre projet."
    }
  },
  contact: {
    heroEyebrow: 'Être rappelé',
    heroTitle: 'Vous voulez savoir si ce parcours correspond à votre projet ?',
    heroSupport:
      "Expliquez en quelques lignes où vous en êtes et ce que vous cherchez à clarifier. Le rappel sert à vérifier l'adéquation du parcours avant toute décision.",
    formTitle: 'Décrivez en quelques lignes où vous en êtes',
    formIntro:
      "Vous pouvez simplement préciser votre situation, les responsabilités que vous visez et les points que vous voulez éclaircir.",
    formSupport:
      "Vous n'avez pas besoin de tout formaliser: quelques informations suffisent pour permettre à CITYZ'France de revenir vers vous dans de bonnes conditions.",
    guidanceTitle: "Ce que vous pouvez clarifier pendant l'échange",
    guidancePoints: [
      "Le rôle ou les responsabilités vers lesquels vous voulez progresser.",
      "L'adéquation du format 100 % distanciel avec votre rythme.",
      "Les compétences que vous voulez renforcer: activité, équipe, organisation, offre, territoire et reporting."
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
      eyebrow: 'Avant de laisser vos coordonnées',
      title: 'Vous pouvez encore relire le programme ou la FAQ',
      description:
        "Si vous préférez prendre un peu de recul, ces pages restent accessibles avant de revenir vers le formulaire."
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
