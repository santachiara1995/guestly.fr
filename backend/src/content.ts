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
    eyebrow: 'Titre professionnel RPMS',
    title: "Le RPMS pour viser un diplôme de niveau Bac+2 en pilotage, management et organisation.",
    subtitle:
      "Découvrez le titre professionnel Responsable petite et moyenne structure de CITYZ'France, un diplôme de niveau Bac+2 référencé au RNCP, son format à distance et l'accompagnement pédagogique prévu pour avancer avec méthode.",
    fitLine:
      "Vous cherchez une formation à distance pour viser un diplôme de niveau Bac+2 tout en développant des compétences concrètes de pilotage, de management et d'organisation."
  },
  home: {
    proofItems: [
      {
        value: 'RNCP38575',
        label: 'Code RNCP',
        note: 'Titre professionnel reconnu'
      },
      {
        value: 'Niveau 5',
        label: 'Niveau',
        note: 'Diplôme Bac+2'
      },
      {
        value: '100 % distanciel',
        label: 'Modalité',
        note: 'E-learning et accompagnement pédagogique'
      }
    ],
    valueSection: {
      eyebrow: 'Avant le contact',
      title: 'Un parcours pour viser un niveau Bac+2 utile à votre projet',
      description:
        "Le RPMS rassemble les repères utiles pour comprendre le niveau Bac+2 visé, le format de travail et les compétences mobilisées avant de demander un rappel.",
      items: [
        'Identifier le niveau Bac+2 visé et le code RNCP du titre.',
        'Comprendre le format 100 % distanciel et la place de l’e-learning.',
        'Situer les compétences de pilotage, de management et d’organisation qui soutiennent cette progression.'
      ]
    },
    contactBand: {
      eyebrow: 'Échange',
      title: "Faire le point sur votre projet avec CITYZ'France",
      description:
        'Si vous souhaitez vérifier si le RPMS correspond à votre situation, vous pouvez demander un rappel depuis le site.',
      supportLine:
        "Le rappel permet de préciser votre projet et les questions à clarifier avant d'aller plus loin."
    },
    highlights: [
      {
        title: 'Un diplôme de niveau Bac+2',
        text: 'Le RPMS s’appuie sur le code RNCP38575 et un niveau 5 / Bac+2 reconnu.'
      },
      {
        title: 'Un format pensé pour avancer à distance',
        text: 'La formation se déroule en 100 % distanciel, en e-learning, avec accompagnement pédagogique.'
      },
      {
        title: 'Des compétences utiles au quotidien',
        text: 'Pilotage, management, organisation, communication et reporting forment le socle du programme.'
      }
    ],
    journey: [
      {
        title: 'Vérifier l’adéquation du parcours',
        text: 'Commencez par le niveau, la modalité et les compétences travaillées pour situer votre projet.'
      },
      {
        title: 'Comprendre le cadre de travail',
        text: "Le format à distance et l'accompagnement pédagogique donnent un cadre clair pour avancer."
      },
      {
        title: 'Demander un rappel',
        text: 'Posez vos questions pour vérifier si le RPMS correspond à votre situation.'
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
    formIntro:
      "Indiquez votre contexte et ce que vous souhaitez clarifier pour vérifier si ce diplôme de niveau Bac+2 correspond à votre projet.",
    nextStepNote: {
      title: "Ce qui se passe après l'envoi",
      points: [
        "Votre demande est prise en compte par CITYZ'France.",
        "L'échange sert à préciser votre projet et vos questions.",
        "Les informations demandées restent limitées à ce qui est utile pour vous recontacter."
      ]
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
