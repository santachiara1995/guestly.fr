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
      'Titre professionnel de niveau 5 / Bac+2 pour diriger une petite ou moyenne structure dans ses dimensions stratégiques, administratives, humaines et territoriales.',
    objectiveSummary: [
      "Diriger une organisation en intégrant les dimensions stratégiques, administratives, humaines et territoriales.",
      "Piloter l'activité, encadrer et animer une équipe.",
      'Développer des partenariats et inscrire la structure dans son environnement local.',
      'Organiser la production, suivre la performance et formaliser le reporting.'
    ],
    professionalScope: [
      "Diriger une structure dans ses dimensions stratégiques, administratives, humaines et territoriales",
      "Piloter l'activité, encadrer et animer une équipe",
      'Développer des partenariats et inscrire la structure dans son environnement local',
      'Organiser la production, les ressources, le reporting et la performance'
    ],
    blocks: [
      {
        code: 'Bloc 1',
        title: 'Diriger une structure et organiser son fonctionnement',
        details:
          "Comprendre la structure et son écosystème.\nGestion administrative.\nVeille stratégique, intelligence économique et cadre réglementaire."
      },
      {
        code: 'Bloc 2',
        title: 'Inscrire la structure dans son territoire',
        details:
          'Définition et importance du territoire pour la structure.\nStratégies de communication et de marketing territorial.\nDéveloppement de réseaux et de partenariats territoriaux.'
      },
      {
        code: 'Bloc 3',
        title: 'Manager et animer une équipe',
        details:
          "Fondamentaux du management et de l'animation d'équipe.\nCommunication, motivation et développement des compétences internes.\nOrganisation du travail, gestion des conflits et évaluation."
      },
      {
        code: 'Bloc 4',
        title: "Adapter l'offre de la structure à la demande",
        details:
          'Analyse du marché, des besoins clients et de la concurrence.\nConception, développement et adaptation de l’offre.\nQualité, satisfaction client et innovation.'
      },
      {
        code: 'Bloc 5',
        title: "Organiser et développer la diffusion de l'offre",
        details:
          'Stratégies de commercialisation et de distribution.\nMarketing digital, communication et relation client.\nDéveloppement commercial et suivi des performances.'
      },
      {
        code: 'Bloc 6',
        title: 'Organiser la production et les ressources',
        details:
          'Organisation des processus et gestion de la qualité.\nPlanification, gestion des ressources et sécurité.\nOptimisation, amélioration continue et gestion de projet.'
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
      "Oui si votre projet vise un titre professionnel de niveau 5 (Bac+2) pour diriger, coordonner et organiser une petite ou moyenne structure.",
    audience: 'particulier',
    sortOrder: 1
  },
  {
    question: "Qu'allez-vous travailler concrètement ?",
    answer:
      "Le parcours couvre le pilotage d'activité, le management d'équipe, l'organisation des opérations, la communication, le territoire, les partenariats, la production et le reporting.",
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
      'Vous préparez le titre professionnel Responsable petite et moyenne structure (RPMS), code RNCP38575, de niveau 5 (Bac+2).',
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
    eyebrow: 'Titre professionnel RPMS - RNCP38575',
    title:
      'Titre professionnel Responsable petite et moyenne structure (RPMS), niveau 5 (Bac+2).',
    subtitle:
      "Le parcours structure les compétences de pilotage, management, organisation, territoire, partenariats, production, performance et reporting.",
    fitLine:
      "Avant de laisser vos coordonnées, vérifiez si ce titre professionnel correspond à votre projet de pilotage ou de management."
  },
  home: {
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
        note: 'Titre professionnel de niveau 5'
      },
      {
        value: '100 % distanciel',
        label: 'Modalité',
        note: 'E-learning avec accompagnement pédagogique'
      }
    ],
    valueSection: {
      eyebrow: 'Ce que le RPMS structure',
      title: 'Piloter une petite ou moyenne structure avec des repères de management, d’organisation et de performance.',
      description:
        "Le RPMS articule le pilotage de l'activité, le management d'équipe, l'organisation des ressources, le territoire, les partenariats, la production et le reporting.",
      items: [
        "Diriger une structure dans ses dimensions stratégiques, administratives, humaines et territoriales.",
        "Animer une équipe et organiser le travail au quotidien.",
        "Développer l'offre, les partenariats, la production et le reporting."
      ]
    },
    contactBand: {
      eyebrow: 'Parler de votre projet',
      title: 'Demandez un rappel pour vérifier l’adéquation du RPMS à votre projet',
      description:
        'En quelques minutes, vous pouvez clarifier le titre, le niveau visé, le format 100 % distanciel et les compétences travaillées.',
      supportLine:
        "Vous repartez avec une vision plus nette du programme et de son cadre officiel."
    },
    highlights: [
      {
        title: "Piloter l'activité avec méthode",
        text: "Le parcours relie performance, priorités et pilotage opérationnel."
      },
      {
        title: 'Coordonner une équipe',
        text: "Vous travaillez l'animation d'équipe, l'organisation du travail et la gestion des tensions."
      },
      {
        title: 'Structurer les opérations',
        text: 'Organisation, qualité, communication et reporting soutiennent une action plus solide.'
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
      'Organiser la production et les ressources',
      "Développer l'offre, les partenariats et le reporting"
    ]
  },
  access: {
    intro:
      "Cette page permet de vérifier si le titre professionnel RPMS, son format à distance et l'accompagnement pédagogique correspondent à votre projet.",
    reassuranceLine:
      "L'essentiel est de vérifier l'adéquation du cadre avant de poursuivre.",
    expectations: [
      'Vouloir évoluer vers plus de pilotage, de coordination ou de management.',
      'Pouvoir avancer régulièrement dans un parcours à distance.',
      "Chercher un cadre clair avant d'aller plus loin."
    ],
    supportPoints: [
      '100 % distanciel',
      'E-learning',
      'Accompagnement pédagogique'
    ],
    processSteps: [
      'Lisez les blocs de compétences et les repères officiels.',
      "Vérifiez si le format 100 % distanciel et l'accompagnement pédagogique vous conviennent.",
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
    heroTitle: 'Vous voulez vérifier l’adéquation du RPMS à votre projet ?',
    heroSupport:
      'Expliquez en quelques lignes où vous en êtes et ce que vous cherchez à clarifier. Le rappel sert à vérifier l’adéquation du parcours avant toute décision.',
    formTitle: 'Décrivez en quelques lignes où vous en êtes',
    formIntro:
      'Vous pouvez simplement préciser votre situation, le niveau visé et les points que vous voulez éclaircir.',
    formSupport:
      "Vous n'avez pas besoin de tout formaliser: quelques informations suffisent pour permettre à CITYZ'France de revenir vers vous dans de bonnes conditions.",
    guidanceTitle: "Ce que vous pouvez clarifier pendant l'échange",
    guidancePoints: [
      'Le rôle ou les responsabilités vers lesquels vous voulez progresser.',
      "L'adéquation du format 100 % distanciel avec votre rythme.",
      'Les compétences que vous voulez renforcer: activité, équipe, organisation, offre, territoire, production et reporting.'
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
