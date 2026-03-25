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
      "Un parcours professionnalisant pour structurer des compétences de pilotage, d'organisation et de management dans une petite ou moyenne structure.",
    objectiveSummary: [
      "Piloter l'activité et la performance d'une structure.",
      'Encadrer et animer une équipe dans un cadre opérationnel clair.',
      "Organiser les processus, la qualité et le suivi de l'activité.",
      'Développer l’offre, les partenariats et la communication utile au pilotage.'
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
      "Le site public présente le parcours RPMS pour des particuliers souhaitant structurer une évolution ou une reconversion vers des fonctions de pilotage, de coordination ou de management.",
    audience: 'particulier',
    sortOrder: 1
  },
  {
    question: 'Quel est le niveau de la certification ?',
    answer:
      "Le programme présenté correspond au titre professionnel Responsable petite et moyenne structure (RPMS), code RNCP38575, de niveau 5, soit un niveau Bac+2.",
    audience: 'particulier',
    sortOrder: 2
  },
  {
    question: 'Comment se déroule la formation ?',
    answer:
      "La formation est présentée en 100 % distanciel, avec un dispositif associant e-learning et accompagnement pédagogique.",
    audience: 'particulier',
    sortOrder: 3
  },
  {
    question: 'Quelles compétences sont travaillées ?',
    answer:
      "Le parcours couvre le pilotage d'une activité, le management d'équipe, l'organisation des opérations, le développement de l'offre et le reporting.",
    audience: 'particulier',
    sortOrder: 4
  },
  {
    question: "Que se passe-t-il après une demande de rappel ?",
    answer:
      "La prise de contact permet de préciser le projet, de présenter le contenu du programme et d'orienter la personne vers les informations utiles à la poursuite de son dossier.",
    audience: 'particulier',
    sortOrder: 5
  },
  {
    question: 'Les informations tarifaires et de financement sont-elles publiées ici ?',
    answer:
      "Non. Le site public ne publie pas d'information tarifaire ou de financement tant qu'elle n'est pas revalidée dans les sources opérationnelles et documentaires.",
    audience: 'particulier',
    sortOrder: 6
  }
]

export const siteContent = {
  brand: {
    name: "CITYZ'France",
    shortName: "CITYZ'France",
    descriptor: 'Centre de formation certifié Qualiopi',
    primaryCta: 'Être rappelé',
    secondaryCta: 'Voir le programme'
  },
  positioning: {
    eyebrow: 'Titre professionnel à distance',
    title: 'Un site centré sur un programme, une lecture claire, un parcours de prise de contact unique.',
    subtitle:
      "CITYZ'France présente le titre professionnel Responsable petite et moyenne structure (RPMS) pour des particuliers recherchant un cadre sérieux, lisible et entièrement orienté vers l'information utile."
  },
  home: {
    proofItems: [
      {
        value: 'RNCP38575',
        label: 'Référentiel visible',
        note: "Titre professionnel reconnu par l'État"
      },
      {
        value: 'Niveau 5',
        label: 'Positionnement',
        note: 'Équivalent Bac+2'
      },
      {
        value: '100 % distanciel',
        label: 'Modalité',
        note: 'E-learning'
      }
    ],
    highlights: [
      {
        title: 'Un cadrage institutionnel',
        text: 'Le site ne présente qu’un seul parcours, avec des repères pédagogiques, réglementaires et légaux identifiés.'
      },
      {
        title: 'Une lecture utile avant contact',
        text: 'Programme, compétences, accompagnement et pages légales sont organisés pour donner une vision stable du parcours.'
      },
      {
        title: 'Un point d’entrée unique',
        text: 'La prise de contact se fait via un seul formulaire de rappel, sans tunnel externe ni promesse commerciale ajoutée.'
      }
    ],
    journey: [
      {
        title: 'Comprendre le programme',
        text: 'Identifier le niveau, le référentiel, la modalité pédagogique et la logique des blocs de compétences.'
      },
      {
        title: 'Évaluer le cadre d’accompagnement',
        text: 'Lire le fonctionnement distanciel, le suivi pédagogique et les repères pratiques donnés avant la prise de contact.'
      },
      {
        title: 'Être rappelé',
        text: "Déposer une demande de rappel pour être recontacté avec une réponse adaptée au projet et au niveau d'information recherché."
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
      "La page d'accès et d'accompagnement présente le cadre de travail du parcours, les attendus de base et la manière dont le suivi pédagogique est posé sur le site public.",
    expectations: [
      'Un projet professionnel nécessitant une lecture claire du programme et de ses débouchés fonctionnels.',
      'Une capacité à suivre un parcours distanciel combinant travail personnel et temps synchrones.',
      'Une démarche de prise d’information préalable avant toute orientation plus détaillée.'
    ],
    supportPoints: [
      'Accompagnement pédagogique',
      'E-learning'
    ],
    processSteps: [
      'Consulter les pages publiques du programme et du cadre d’accompagnement.',
      'Déposer une demande de rappel via le formulaire dédié.',
      'Être recontacté pour préciser le projet et recevoir les informations utiles.'
    ]
  },
  contact: {
    phone: '09 77 21 51 61',
    address: '110 Esplanade du General de Gaulle, 92400 Courbevoie',
    city: 'Courbevoie',
    officeHours: 'Du lundi au vendredi',
    website: 'www.cityzfrance.fr'
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
      'Projet RMPS.pdf, plaquette RPMS et dossier legal CITYZ France'
  }
}
