const RNCP_URL = 'https://www.francecompetences.fr/recherche/rncp/38575/'
const ARRETE_URL = 'https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000048595047'
const GEFOR_RPMS_URL =
  'https://www.gefor.com/titre-pro/titre-professionnel-responsable-petite-et-moyenne-structure/'

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
    question: 'La formation RPMS correspond-elle à mon projet ?',
    answer:
      "La formation RPMS est faite pour vous si vous visez un titre de niveau 5 (Bac+2) reconnu par l'État pour développer une vision globale d'entreprise, encadrer une équipe et piloter une activité. Elle s'adresse aux personnes qui veulent évoluer vers des fonctions de coordination, de gestion ou de direction, avec une approche à la fois opérationnelle, commerciale et financière.",
    audience: 'particulier',
    sortOrder: 1
  },
  {
    question: 'Quelle est la valeur réelle du diplôme ?',
    answer:
      "Il s'agit d'un Titre Professionnel de niveau 5 (Bac+2), enregistré au RNCP sous le numéro 38575 et délivré par le Ministère du Travail. Il correspond au niveau de qualification d'un BTS, avec une approche beaucoup plus orientée vers la réalité du terrain en PME. La fiche RNCP le donne valide jusqu'au 8 février 2029.",
    audience: 'particulier',
    sortOrder: 2
  },
  {
    question: 'Que couvre exactement la formation RPMS ?',
    answer:
      "La formation est structurée en trois blocs de compétences officiels : diriger une structure avec une équipe, mettre en oeuvre l'objet social de la structure, et établir un rapport d'activité. Vous y travaillez le management d'équipe, l'organisation de l'activité, le développement commercial, l'analyse financière et la présentation des indicateurs clés.",
    audience: 'particulier',
    sortOrder: 3
  },
  {
    question: 'Quels sont les prérequis pour suivre la formation ?',
    answer:
      "Vous devez justifier d'un diplôme de niveau 4 (Bac ou équivalent) ou d'une expérience professionnelle significative. Une bonne aisance avec la lecture, la rédaction et les outils numériques du quotidien est recommandée, ainsi que la capacité à organiser un travail personnel régulier dans un parcours à distance.",
    audience: 'particulier',
    sortOrder: 4
  },
  {
    question: 'Quel format faut-il prévoir pour la formation ?',
    answer:
      "La formation se suit en 100 % distanciel, sur notre plateforme e-learning accessible 24h/24 et 7j/7. Le parcours est conçu pour avancer à votre rythme tout en gardant un cadre clair, avec des contenus structurés, des points de repère réguliers et un suivi personnalisé pour sécuriser votre progression.",
    audience: 'particulier',
    sortOrder: 5
  },
  {
    question: 'Je travaille déjà, puis-je suivre la formation ?',
    answer:
      "Oui, et c'est même le profil idéal. Le format 100 % distanciel et l'accès 24/7 à la plateforme vous permettent d'adapter votre apprentissage à votre emploi du temps professionnel. Les classes virtuelles peuvent être revues selon les ressources mises à disposition par l'organisme.",
    audience: 'particulier',
    sortOrder: 6
  },
  {
    question: 'Combien de temps faut-il prévoir pour valider le titre ?',
    answer:
      "Le parcours représente 364 heures de formation, avec environ 300 heures de travail effectif à étaler selon votre rythme personnel et professionnel. Une validation par bloc de compétences reste également possible, vous permettant de capitaliser progressivement vers le titre complet selon les modalités prévues par la fiche RNCP.",
    audience: 'particulier',
    sortOrder: 7
  },
  {
    question: "Comment et quand se passe l'examen final ?",
    answer:
      "L'examen se déroule à la fin de votre parcours de formation, devant un jury composé de deux professionnels agréés. La fiche RNCP38575 décrit une épreuve finale de 1 h 35 au total : la présentation d'un projet préparé en amont, un entretien technique avec le jury, puis un entretien final sur votre dossier professionnel. L'échange vise à valider vos compétences réelles de manager, sur un cas concret ou votre propre projet d'entreprise.",
    audience: 'particulier',
    sortOrder: 8
  },
  {
    question: 'Que se passe-t-il si je ne valide pas le titre du premier coup ?',
    answer:
      "Pas de panique. Le titre RPMS est composé de trois blocs de compétences indépendants. Si vous ne validez qu'une partie des blocs, vous obtenez des Certificats de Compétences Professionnelles (CCP) qui restent acquis. Vous pouvez vous représenter à une session suivante uniquement sur les blocs non validés, dans la limite de la durée de validité du titre.",
    audience: 'particulier',
    sortOrder: 9
  },
  {
    question: 'Comment financer la formation ?',
    answer:
      "Trois solutions s'offrent à vous : le paiement comptant en une seule fois, le paiement en 4 fois sans frais via notre partenaire Alma, ou le financement intégral par l'État (AIF pour les demandeurs d'emploi, OPCO pour les salariés). Pour cette dernière option, vous ne sortez aucun euro de votre poche et notre équipe gère l'intégralité du dossier administratif avec vous.",
    audience: 'particulier',
    sortOrder: 10
  },
  {
    question: 'Que se passe-t-il si je ne peux plus payer en cours de route ?',
    answer:
      "Si vous avez choisi le paiement en 4 fois via Alma, c'est Alma qui gère le suivi des échéances directement avec vous. En cas de difficulté, contactez-nous immédiatement : chaque situation est étudiée au cas par cas pour trouver une solution adaptée. Pour les financements AIF ou OPCO, le règlement étant pris en charge par l'organisme, vous n'avez pas d'avance à faire.",
    audience: 'particulier',
    sortOrder: 11
  },
  {
    question: "Comment m'inscrire ou poser une question ?",
    answer:
      'Pour vous inscrire, rendez-vous dans la section Financement qui présente le prix, les modalités de règlement et les conditions d’accès. Si vous préférez être rappelé avant de vous engager, utilisez le formulaire de diagnostic : un conseiller vous recontacte sous 48 h pour répondre à vos questions et valider votre projet avec vous.',
    audience: 'particulier',
    sortOrder: 12
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
      hookLines: [
        'Décrochez votre BAC+2,',
        "Certifié par l'Etat,",
        '100% à distance,',
        'En 364 heures.'
      ],
      lead:
        "Devenez Responsable de Petite et Moyenne Structure (RPMS). Une certification RNCP 38575 reconnue par l'État qui vous permet de :",
      capabilities: [
        'piloter une activité',
        'encadrer une équipe',
        'gérer une structure (entreprise, association, organisation publique)'
      ]
    },
    painPointSection: {
      title: "Le coût de l'immobilisme",
      subtitle: 'Le "Plafond de Verre" qui freine votre carrière',
      description:
        "En 2026, l'expertise technique ne suffit plus. Sans diplôme de gestion reconnu, vous restez bloqué à des postes d'exécution, alors que les PME cherchent désespérément des pilotes.",
      items: [
        {
          title: 'Perte de revenus',
          text:
            'Un profil RPMS gagne en moyenne 25 % de plus qu’un technicien expert.'
        },
        {
          title: 'Insécurité professionnelle',
          text:
            "Les postes non certifiés sont les premiers menacés par l'automatisation."
        },
        {
          title: 'Manque de crédibilité',
          text:
            "Sans titre d'État, difficile de convaincre un banquier ou un investisseur."
        }
      ]
    },
    proofItems: [
      {
        label: 'Diplôme reconnu',
        value: 'Bac+2 / niveau 5',
        note: "Titre professionnel certifié par l'État"
      },
      {
        label: 'Format souple',
        value: '100 % à distance',
        note: 'E-learning avec accompagnement pédagogique individuel'
      },
      {
        label: 'Durée du parcours',
        value: '364 h',
        note: 'Un format structuré pour avancer avec méthode'
      }
    ],
    personasSection: {
      title: 'Cette formation est faite pour vous si...',
      description: '',
      items: [
        {
          title: "Vous êtes manager ou chef d'équipe",
          detailsHtml:
            "Vous pilotez déjà une équipe mais visez un poste de direction. Le RPMS valide officiellement vos compétences avec un titre Bac+2 reconnu par l'État, et vous ouvre l'accès à des postes observés <br>entre <strong>40 000 €</strong> et <strong>50 000 € brut/an</strong> selon les fiches métiers du secteur.",
          sourceRefs: ['salary']
        },
        {
          title: 'Vous êtes salarié en reconversion',
          detailsHtml:
            "Vous voulez évoluer vers la gestion d'entreprise sans repasser par un cursus universitaire long. Le RPMS est accessible sans Bac+2 préalable, avec un niveau 4 / Bac ou une expérience professionnelle significative, et se prépare à votre rythme en <strong>100 % distanciel</strong>.",
          sourceRefs: ['rncp']
        },
        {
          title: "Vous êtes demandeur d'emploi",
          detailsHtml:
            "Vous cherchez à sécuriser un retour à l'emploi rapide sur un métier en tension. <strong>69 %</strong> des diplômés RPMS sont en emploi <strong>6 mois</strong> après l'obtention du titre, et <strong>78 %</strong> occupent un poste dans le métier visé <strong>2 ans</strong> après.",
          sourceRefs: ['rncp']
        },
        {
          title: 'Vous êtes dirigeant ou repreneur de TPE/PME',
          detailsHtml:
            "Vous gérez votre structure au feeling et voulez professionnaliser votre pilotage. Le RPMS structure ces trois dimensions en<br><strong>3 blocs de compétences indépendants</strong>, que vous pouvez capitaliser séparément selon vos priorités.",
          sourceRefs: ['arrete', 'rncp']
        },
        {
          title: "Vous êtes entrepreneur ou créateur d'entreprise",
          detailsHtml:
            "Vous lancez votre activité et avez besoin des fondamentaux pour piloter une structure viable. Le RPMS couvre les trois piliers d'un dirigeant : analyser un marché, manager une équipe et lire un bilan comptable. Une passerelle officielle existe avec <strong>RNCP34324</strong>.",
          sourceRefs: ['rncp', 'arrete']
        }
      ]
    },
    sources: [
      {
        id: 'rncp',
        label: 'France Compétences - fiche RNCP38575',
        url: RNCP_URL
      },
      {
        id: 'arrete',
        label: 'Légifrance - arrêté du 5 décembre 2023',
        url: ARRETE_URL
      },
      {
        id: 'salary',
        label: 'GEFOR - Titre Pro Responsable petite et moyenne structure',
        url: GEFOR_RPMS_URL
      }
    ],
    rpmsCityzSection: {
      title: "Le Titre RPMS : le diplôme que les PME s'arrachent en 2026",
      items: [
        {
          title: 'Stratégie & Territoire',
          description:
            'Ne subissez plus votre marché. Apprenez à analyser votre zone de chalandise et à définir une vision gagnante pour votre structure.'
        },
        {
          title: 'Management de Terrain',
          description:
            'Transformez-vous en leader. Recrutez, motivez et pilotez vos équipes avec des méthodes modernes et humaines.'
        },
        {
          title: 'Pilotage Financier',
          description:
            'Maîtrisez vos chiffres. Du seuil de rentabilité au pilotage de la trésorerie, devenez le garant de la santé financière de votre structure.'
        }
      ]
    },
    cityzSection: {
      title: 'Pourquoi CITYZ Formation ?',
      items: [
        {
          label: '100 % Distanciel',
          description: 'Apprenez à votre rythme, où que vous soyez.'
        },
        {
          label: 'Accompagnement Individuel',
          description:
            'Un mentor dédié pour vous suivre jusqu’à la réussite de votre titre.'
        },
        {
          label: 'Jury Professionnel',
          description:
            'Validez vos acquis devant des experts reconnus du secteur.'
        },
        {
          label: 'Réseau CITYZ',
          description:
            'Accès exclusif à notre communauté de dirigeants et d’entrepreneurs.'
        },
        {
          label: 'Accès illimité aux modules CITYZ',
          descriptionHtml:
            'Boostez votre profil avec nos formations complémentaires : <strong>Excel</strong>, <strong>Anglais professionnel</strong>, <strong>Mathématiques appliquées</strong> et bien d’autres, toutes incluses sans surcoût.'
        }
      ]
    },
    zeroPaperSection: {
      title: 'Service "Zéro Paperasse"',
      description:
        "Le financement est souvent le premier frein. Chez CITYZ, nous avons supprimé cet obstacle. Nos experts s'occupent de tout votre dossier administratif, de A à Z.",
      stats: [
        {
          value: '100 %',
          label: 'ACCOMPAGNEMENT'
        },
        {
          value: '48 h',
          label: 'DÉLAI DE RÉPONSE'
        }
      ],
      steps: [
        {
          number: '01',
          title: 'Diagnostic',
          description:
            "Échange de 15 minutes avec un conseiller pour valider votre éligibilité et définir la meilleure solution de financement."
        },
        {
          number: '02',
          title: 'Montage du dossier',
          description:
            "Notre équipe prépare l'intégralité des documents : devis, conventions, formulaires AIF ou OPCO. Vous n'avez rien à rédiger."
        },
        {
          number: '03',
          title: 'Validation',
          description:
            'Vous signez électroniquement, nous transmettons votre dossier au financeur. Démarrage de la formation sous 48 h.'
        }
      ]
    },
    finalCta: {
      title: 'Prêt à briser votre plafond de verre ?',
      description:
        "Nos experts répondent à vos questions sur la formation, le financement et votre éligibilité, sans engagement. Réservez ensuite votre appel de 15 minutes.",
      note: 'NOMBRE DE PLACES LIMITÉ POUR CHAQUE SESSION'
    }
  },
  program: {
    hero: {
      eyebrow: 'Programme du titre professionnel Responsable de petite et moyenne structure',
      title: 'Obtenez votre Bac+2 certifié pour piloter une structure.',
      description:
        'Titre professionnel RPMS, RNCP38575, niveau 5 / Bac+2.',
      note:
        'Formation 100 % distanciel, en e-learning, avec accompagnement pédagogique sur 364 heures.'
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
        'Diriger une organisation dans sa globalité',
        'Piloter l’activité et la performance',
        'Encadrer et animer une équipe',
        'Développer des partenariats',
        'Intégrer les enjeux territoriaux et stratégiques',
        'Prendre des décisions éclairées'
      ]
    },
    evaluationSection: {
      eyebrow: 'Durée et évaluation',
      title: '364 heures de formation,\nExamen de 1 h 35.',
      description:
        "La fiche France Compétences RNCP38575 décrit une évaluation finale structurée autour d'un projet, d'un entretien technique et d'un entretien final.",
      summaryCards: [
        {
          label: 'Volume',
          value: '364 heures de formation',
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
      eyebrow: 'Programme de formation',
      title:
        'Trois blocs de compétences essentielles pour piloter une structure avec méthode.',
      description:
        'Le détail des compétences a été conservé ici pour que la page programme reste la référence complète après simplification de la page accueil.'
    },
    ctaBand: {
      eyebrow: "Prêt à passer à l'action ?",
      title: 'Donnez un nouvel élan à votre carrière.',
      description:
        'Réservez votre diagnostic gratuit ou lancez directement votre inscription.'
    }
  },
  finance: {
    hero: {
      eyebrow: 'FINANCEMENT RPMS',
      title: 'Financez votre formation sans compromis',
      description:
        'Quel que soit votre profil, nous avons une solution adaptée. Découvrez le prix de la formation et choisissez la modalité de règlement qui vous convient.'
    },
    pricing: {
      eyebrow: 'PRIX DE LA FORMATION',
      title: 'Prix de la formation',
      amount: '3 500 € TTC',
      description:
        "Tout est inclus : préparation à l'examen, passage du jury, accompagnement par un mentor dédié et accès illimité à tous les modules CITYZ."
    },
    paymentLinks: {
      cashUrl: '',
      installmentsUrl: ''
    },
    paymentSection: {
      eyebrow: '3 SOLUTIONS DE PAIEMENT',
      title: 'Choisissez la formule qui vous correspond',
      solutions: [
        {
          id: 'cash',
          eyebrow: 'SOLUTION 01',
          title: 'Paiement comptant',
          description: 'La solution la plus simple pour démarrer immédiatement.',
          detail:
            'Réglez 3 500 € en une seule fois et accédez instantanément à votre espace de formation.',
          badge: 'LE PLUS POPULAIRE',
          ctaLabel: "S'inscrire",
          secondaryLabel: 'Lien de paiement Stripe à renseigner'
        },
        {
          id: 'installments',
          eyebrow: 'SOLUTION 02',
          title: 'Paiement en 4 fois sans frais avec Alma',
          description:
            'Étalez votre investissement sans frais supplémentaires avec notre partenaire Alma.',
          detail: '4 mensualités de 875 € — 0 € de frais, 0 € d’intérêts.',
          extraDetail: 'Décision immédiate, sans dossier complexe.',
          ctaLabel: "S'inscrire",
          secondaryLabel: 'Lien Alma à renseigner'
        },
        {
          id: 'state',
          eyebrow: 'SOLUTION 03',
          title: "Formation financée par l'État",
          description:
            "Pour les demandeurs d'emploi (AIF) et les salariés via leur OPCO d'entreprise.",
          badge: '100 % FINANCÉE',
          emphasis: 'dark',
          points: [
            'Prise en charge totale selon votre éligibilité',
            'Maintien de vos allocations pendant la formation',
            'Dossier administratif intégralement géré par CITYZ'
          ],
          note:
            'Notre équipe vous accompagne de A à Z dans le montage de votre dossier.',
          ctaLabel: 'Vérifier mon éligibilité'
        }
      ]
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
      eyebrow: "Ce que CITYZ'France met à disposition",
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
        "Prenez connaissance du prix, des modalités de paiement et des solutions de financement.",
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
      eyebrow: 'QUESTIONS FRÉQUENTES',
      title: 'Tout ce que vous devez savoir avant de vous lancer',
      description:
        'Vous hésitez encore ? Voici les réponses aux questions que se posent la plupart de nos futurs apprenants.'
    },
    closingNote: {
      eyebrow: 'Choisissez la suite utile',
      title: 'Passez à la page qui vous fait avancer.',
      description:
        "Programme pour le détail des compétences, Financement pour les modalités de règlement, Inscription pour passer à l'action."
    }
  },
  signup: {
    heroEyebrow: 'Inscription RPMS',
    heroTitle: 'Inscrivez-vous à la formation RPMS.',
    heroSupport:
      "Complétez le formulaire pour lancer votre demande, choisir votre mode de financement et, si besoin, programmer un rappel.",
    formTitle: "Lancez votre inscription",
    formIntro:
      "Toutes les informations sont obligatoires sauf la date de naissance, qui reste optionnelle.",
    formSupport:
      "Choisissez votre modalité de financement, laissez vos coordonnées, puis validez votre demande.",
    paymentTitle: 'Choisissez votre mode de financement',
    paymentSupport:
      "Sélectionnez le règlement comptant, le 4 fois Alma ou le financement par l'État. Vous pouvez aussi demander à être rappelé(e) par nos équipes pour répondre à vos questions sur la formation, le financement ou l'inscription.",
    footerBand: {
      eyebrow: 'Avant de valider',
      title: 'Programme et financement restent accessibles à tout moment',
      description:
        "Relisez-les si besoin, ou passez directement à l'inscription."
    }
  },
  contact: {
    heroEyebrow: 'Diagnostic gratuit',
    heroTitle: 'Demandez à être rappelé.',
    heroSupport:
      "Laissez simplement vos coordonnées pour que l'équipe CITYZ'France puisse vous recontacter.",
    formTitle: 'Être rappelé',
    formIntro:
      "Indiquez vos coordonnées principales et nous reviendrons vers vous pour répondre à vos questions.",
    formSupport:
      "Le formulaire de contact est dédié aux demandes d'information et aux demandes de rappel.",
    footerBand: {
      eyebrow: 'Avant de valider',
      title: 'Programme et financement restent accessibles à tout moment',
      description:
        'Consultez-les si besoin, puis laissez vos coordonnées si vous souhaitez être rappelé.'
    },
    phone: '09 77 21 51 61',
    address: '110 Esplanade du General de Gaulle, 92400 Courbevoie',
    city: 'Courbevoie',
    website: 'www.cityzfrance.fr'
  },
  thankYou: {
    nextStepLine:
      'Nous revenons vers vous pour répondre à vos questions sur le programme, le financement et la suite à donner à votre projet.'
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
      "France Compétences RNCP38575, arrêté du 5 décembre 2023 et dossier légal CITYZ'France"
  }
}
