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
      "Titre professionnel de niveau 5 / Bac+2 pour des managers polyvalents capables de piloter une activité, encadrer une équipe et gérer une structure.",
    objectiveSummary: [
      "Piloter une activité et sa performance avec des repères de gestion, d'organisation et de reporting.",
      "Encadrer et animer une équipe en clarifiant le travail, la communication et les priorités.",
      "Développer des partenariats et inscrire la structure dans son environnement territorial.",
      'Organiser la production, les ressources et la lecture des résultats.'
    ],
    professionalScope: [
      "Piloter l'activité, les priorités et la performance d'une structure",
      "Encadrer une équipe et organiser le travail au quotidien",
      'Développer des partenariats et inscrire la structure dans son territoire',
      'Suivre la production, les ressources, le bilan et le reporting'
    ],
    blocks: [
      {
        code: 'Bloc 1',
        title: 'Diriger une structure et une équipe',
        details:
          "Compréhension de l'écosystème.\nGestion administrative.\nVeille stratégique et réglementaire."
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
          "Fondamentaux du management.\nCommunication, motivation et développement des compétences.\nGestion des conflits et organisation du travail."
      },
      {
        code: 'Bloc 4',
        title: "Adapter l'offre à la demande",
        details:
          "Analyse du marché.\nConception de l'offre.\nInnovation et satisfaction client."
      },
      {
        code: 'Bloc 5',
        title: "Développer la diffusion de l'offre",
        details:
          'Stratégie commerciale.\nMarketing digital.\nSuivi des performances.'
      },
      {
        code: 'Bloc 6',
        title: 'Organiser la production',
        details:
          'Gestion des processus.\nPlanification et ressources.\nAmélioration continue.'
      },
      {
        code: 'Bloc 7',
        title: 'Gestion financière et reporting',
        details:
          "Lecture du bilan.\nCompte de résultat.\nRapport d'activité."
      }
    ],
    sortOrder: 1
  }
]

export const faqSeed = [
  {
    question: 'Ce titre peut-il correspondre à mon projet ?',
    answer:
      "Oui si votre projet vise un titre professionnel de niveau 5 (Bac+2) pour piloter une activité, encadrer une équipe et organiser une structure.",
    audience: 'particulier',
    sortOrder: 1
  },
  {
    question: 'Que prépare concrètement le RPMS ?',
    answer:
      "Le parcours travaille la gestion, l'organisation, la communication, l'analyse stratégique, le territoire, les partenariats, la production et le reporting.",
    audience: 'particulier',
    sortOrder: 2
  },
  {
    question: 'Comment le parcours se suit-il ?',
    answer:
      'Le titre se suit en 100 % distanciel, en e-learning, avec accompagnement pédagogique.',
    audience: 'particulier',
    sortOrder: 3
  },
  {
    question: "Quels repères faut-il vérifier en priorité ?",
    answer:
      "Commencez par l'intitulé officiel, le code RNCP38575, le niveau 5 (Bac+2), le format à distance et les blocs de compétences.",
    audience: 'particulier',
    sortOrder: 4
  },
  {
    question: "À quoi sert la demande de rappel ?",
    answer:
      "Elle sert à vérifier si le titre, le format et les responsabilités travaillées correspondent à votre projet avant d'aller plus loin.",
    audience: 'particulier',
    sortOrder: 5
  },
  {
    question: 'Le programme reste-t-il relié au terrain ?',
    answer:
      "Oui. Il relie le pilotage d'activité au territoire, aux partenariats, à la production et au reporting.",
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
      "Le RPMS donne un cadre clair pour piloter une activité, encadrer une équipe et organiser une structure.",
    fitLine:
      "Commencez par vérifier si ce titre correspond à votre projet de pilotage, de coordination ou de management."
  },
  home: {
    hero: {
      eyebrow: 'Titre professionnel RPMS - RNCP38575',
      title: 'Vérifiez si le RPMS correspond à votre projet de pilotage ou de management.',
      lead:
        'Titre professionnel Responsable petite et moyenne structure (RPMS), niveau 5 (Bac+2), en 100 % distanciel avec accompagnement pédagogique.',
      fitLine:
        "Cette première lecture sert à comprendre ce que le titre prépare réellement : activité, équipe, organisation, territoire, production et reporting.",
      decisionTitle: 'Ce que vous allez vérifier ici',
      decisionText:
        "Lire le titre, comprendre les responsabilités travaillées, puis décider si le format et l'accompagnement correspondent à votre projet.",
      decisionPoints: [
        "Commencer par les repères officiels : titre, RNCP38575, niveau 5 et format à distance.",
        'Relier ces repères aux responsabilités visées : activité, équipe, organisation et résultats.',
        "Choisir ensuite entre la lecture détaillée du programme et une demande de rappel."
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
      eyebrow: 'Ce que le titre structure',
      title: 'Une lecture claire du rôle visé avant d’entrer dans le détail du programme.',
      description:
        "Le RPMS relie le pilotage quotidien à des responsabilités plus larges de management, d'organisation, de territoire et de performance.",
      pillars: [
        {
          title: 'Piloter une activité',
          text: 'Priorités, performance, arbitrages, suivi et reporting.'
        },
        {
          title: 'Encadrer une équipe',
          text: 'Organisation du travail, animation, communication et coordination.'
        },
        {
          title: 'Inscrire la structure dans son environnement',
          text: 'Territoire, partenariats, diffusion de l’offre et résultats.'
        }
      ]
    },
    featuredBlocksIntro: {
      eyebrow: 'Ce que vous retrouverez dans le programme',
      title: 'Trois blocs suffisent pour comprendre la logique du parcours.',
      description:
        "Le programme complet précise ensuite l'écosystème, le territoire, l'équipe, l'offre, la production et le reporting."
    },
    journeySection: {
      eyebrow: 'Comment décider',
      title: 'Trois repères suffisent pour voir si le RPMS mérite d’aller plus loin dans votre projet.',
      description:
        "Le site vous aide d'abord à lire le titre, puis à comprendre les responsabilités travaillées, avant de passer à un échange si nécessaire.",
      steps: [
        {
          title: 'Lire les repères officiels',
          text: 'Titre, RNCP, niveau, format et accompagnement pédagogique.'
        },
        {
          title: 'Comprendre le rôle préparé',
          text: "Pilotage d'activité, management d'équipe, organisation, territoire et reporting."
        },
        {
          title: 'Choisir votre prochaine étape',
          text: 'Poursuivre avec le programme ou demander un rappel pour clarifier votre projet.'
        }
      ]
    },
    contactBand: {
      eyebrow: 'Parler de votre projet',
      title: 'Demandez un rappel si vous voulez vérifier ce cadre avec votre situation.',
      description:
        "Le rappel sert à clarifier le titre, le format et les responsabilités travaillées avant toute décision.",
      supportLine:
        "Vous repartez avec une lecture plus nette du programme, de son cadre officiel et de son adéquation avec votre projet."
    }
  },
  program: {
    hero: {
      eyebrow: 'Programme RPMS',
      title: 'Le programme comme carte de lecture du titre, du rôle et des blocs.',
      description:
        "Cette page donne une lecture factuelle du RPMS : repères officiels, responsabilités travaillées et blocs de compétences.",
      note:
        "Commencez par les repères du titre, puis utilisez les blocs pour comprendre ce que le RPMS prépare concrètement."
    },
    summarySection: {
      eyebrow: "Vue d'ensemble",
      title: 'Les points à regarder avant de parcourir chaque bloc.',
      description:
        "Le titre, le niveau, le format et les objectifs résument déjà la logique du parcours avant d'entrer dans le détail."
    },
    competencySection: {
      eyebrow: 'Ce que cela veut dire en pratique',
      title: "Le RPMS prépare un rôle polyvalent de pilotage, d'organisation et de reporting.",
      description:
        "Ces repères donnent une traduction concrète du rôle visé avant la lecture détaillée du programme."
    },
    blocksSection: {
      eyebrow: 'Blocs de compétences',
      title: 'Le détail du programme, bloc par bloc.',
      description:
        "Chaque bloc éclaire une partie du rôle : structure, territoire, équipe, offre, production et résultats."
    },
    ctaBand: {
      eyebrow: 'Après la lecture du programme',
      title: 'Vérifier si ce cadre correspond à votre projet',
      description:
        'Si cette lecture correspond à ce que vous cherchez, vous pouvez demander un rappel pour faire le point sur votre situation.'
    }
  },
  access: {
    hero: {
      eyebrow: 'Accès et accompagnement',
      title: "Voici ce qu'il faut comprendre avant d'aller plus loin.",
      description:
        'Le RPMS se suit en 100 % distanciel, en e-learning, avec accompagnement pédagogique.',
      fitLine:
        "Cette page aide à vérifier le format, l'appui pédagogique et les points utiles avant une demande de rappel."
    },
    fitChecklist: {
      eyebrow: 'Vérifier votre point de départ',
      title: 'Trois questions simples avant de poursuivre.',
      description:
        "L'objectif n'est pas de vous convaincre, mais de vous aider à voir si le cadre du titre vous convient.",
      items: [
        'Cherchez-vous un titre pour piloter une activité, encadrer une équipe ou organiser une structure ?',
        'Pouvez-vous avancer dans un parcours 100 % distanciel, en e-learning ?',
        "Souhaitez-vous d'abord vérifier le cadre officiel avant d'aller plus loin ?"
      ]
    },
    supportSection: {
      eyebrow: 'Ce que le cadre prévoit',
      title: 'Un format à distance avec un accompagnement pédagogique lisible.',
      description:
        "Le parcours reste sobre dans sa promesse : un titre officiel, un format à distance et un appui pédagogique pour avancer avec plus de clarté.",
      points: [
        '100 % distanciel',
        'E-learning',
        'Accompagnement pédagogique',
        'Titre professionnel de niveau 5 / Bac+2'
      ]
    },
    processSection: {
      eyebrow: 'Si vous demandez un rappel',
      title: 'Le rappel suit un parcours court et concret.',
      description:
        "L'échange sert à clarifier votre projet, pas à ajouter une étape commerciale de plus.",
      steps: [
        'Lire les blocs de compétences et les repères officiels du titre.',
        "Vérifier si le format 100 % distanciel et l'accompagnement pédagogique vous conviennent.",
        'Demander un rappel si vous voulez faire le point sur votre situation.'
      ]
    },
    ctaBand: {
      eyebrow: 'Aller plus loin',
      title: 'Demander un rappel pour vérifier votre projet',
      description:
        "Si le cadre vous semble pertinent, l'échange permet de clarifier vos questions avant toute décision."
    }
  },
  faq: {
    hero: {
      eyebrow: 'FAQ RPMS',
      title: 'Les questions qui tranchent vraiment avant d’aller plus loin.',
      description:
        "Commencez par les points qui éclairent le titre, le format et les responsabilités travaillées."
    },
    opening: {
      eyebrow: 'Avant de dérouler les questions',
      title: 'La FAQ sert à confirmer un choix, pas à tout expliquer.',
      description:
        "Si un point reste flou après cette lecture, le plus utile est de revenir au programme ou de demander un rappel.",
      bullets: [
        'Vérifier le titre, le niveau et le format.',
        'Comprendre les responsabilités travaillées.',
        'Décider si un échange vous aiderait à clarifier la suite.'
      ]
    },
    closingNote: {
      eyebrow: 'Encore une question',
      title: 'Revenez au programme ou demandez un rappel si un point reste ouvert.',
      description:
        "La FAQ doit vous aider à trancher. Si une question dépend de votre situation, l'échange permet de la remettre dans votre contexte.",
      supportLine:
        "Le rappel sert ensuite à vérifier si le parcours correspond réellement à votre projet."
    }
  },
  contact: {
    heroEyebrow: 'Être rappelé',
    heroTitle: 'Le rappel sert à vérifier si le RPMS correspond vraiment à votre projet.',
    heroSupport:
      'Décrivez en quelques lignes votre situation, ce que vous cherchez à clarifier et les responsabilités vers lesquelles vous souhaitez évoluer.',
    formTitle: 'Décrire votre situation en quelques lignes',
    formIntro:
      "Le formulaire sert à préparer un échange utile, pas à tout formaliser.",
    formSupport:
      "L'essentiel est de préciser votre projet, vos questions et le cadre que vous voulez vérifier.",
    guidanceTitle: "Ce que vous pouvez clarifier pendant l'échange",
    guidancePoints: [
      'Le rôle ou les responsabilités vers lesquels vous souhaitez progresser.',
      "L'adéquation du format 100 % distanciel avec votre rythme.",
      'Les compétences que vous voulez renforcer : activité, équipe, organisation, territoire, production et reporting.'
    ],
    nextStepNote: {
      title: 'Ce qui se passe après votre demande',
      points: [
        "Votre demande est prise en compte par CITYZ'France.",
        "L'échange sert à comprendre votre projet et à répondre à vos premières questions.",
        "Les informations demandées restent limitées à ce qui est utile pour vous recontacter."
      ]
    },
    factsTitle: 'Repères utiles',
    footerBand: {
      eyebrow: "Avant d'envoyer votre demande",
      title: 'Vous pouvez encore relire le programme ou revenir au formulaire',
      description:
        'Le programme et la FAQ restent accessibles si vous souhaitez reprendre les repères avant de finaliser votre demande.'
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
