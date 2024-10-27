import z from "zod";

export const questionSchema = z.object({
  id: z.string(),
  answer: z.string(),
  question: z.string(),
});

export type Question = z.infer<typeof questionSchema>;

export const getQuestions = async (): Promise<Question[]> => {
  return [
    {
      id: "1",
      question: "Qu'est-ce que Drivite ?",
      answer: `Drivite accompagne et conseille les particuliers pour l'achat et la vente de véhicules neufs ou d'occasions. Nous vous aidons à mieux acheter et vendre votre véhicule en toute sécurité, en vous guidant à chaque étape de la transaction.`,
    },
    {
      id: "2",
      question: "Comment fonctionne Drivite pour l'achat d'une voiture ?",
      answer: `Nous commençons par une évaluation de vos besoins (budget, modèle, critères) pour vous conseiller sur le véhicule idéal. Ensuite, nous effectuons une recherche sur le marché, sélectionnons les véhicules appropriés, procédons à une inspection technique complète et vous accompagnons dans la négociation et les démarches administratives. Pour + de détails vous pouvez consulter la page Services - acheter une voiture`,
    },
    {
      id: "3",
      question: "Comment fonctionne Drivite pour la vente d'une voiture ?",
      answer: `Nous évaluons d’abord votre véhicule et vous fournissons une estimation précise de sa valeur grâce à une inspection technique et esthétique. Ensuite, nous rédigeons une annonce attractive, la partageons sur des sites et nos réseaux sociaux, gérons les visites des acheteurs potentiels et négocions pour obtenir le meilleur prix possible. Pour + de détails vous pouvez consulter la page Services - acheter une voiture`,
    },
    {
      id: "4",
      question:
        "Est-ce que je dois payer pour obtenir une estimation de mon véhicule ?",
      answer: `L'estimation de votre véhicule fait partie de nos services de vente. Elle est incluse dans nos formules d'accompagnement Sur-Mesure et Directe. Si vous souhaitez uniquement une estimation de votre véhicule, contactez le service commercial.`,
    },
    {
      id: "5",
      question:
        "Comment Drivite garantit-elle la sécurité lors de l’achat d’un véhicule ?",
      answer: `Nous vérifions chaque véhicule à travers une inspection technique complète réalisée par des experts formés. Nous vous assurons une transparence totale sur l’état technique, esthétique et historique du véhicule.`,
    },
    {
      id: "6",
      question:
        "Est-ce que Drivite se charge de toutes les démarches administratives ?",
      answer: `Oui, nous vous assistons dans toutes les démarches administratives liées à l'achat ou à la vente d’un véhicule (vérification du contrôle technique, cession du véhicule, accompagnement pour la carte grise, certificat de non-gage etc.).`,
    },
    {
      id: "7",
      question: "Qui réalise les inspections techniques des véhicules ?",
      answer: `Les inspections sont effectuées par notre réseau de professionnels de l’automobile indépendants, formés à nos processus rigoureux et opérant en tant que consultants automobiles pour Drivite.`,
    },
    {
      id: "8",
      question: "Comment Drivite choisit-elle les véhicules pour moi ?",
      answer: `Nous tenons compte de vos critères de sélection (budget, modèle, préférences, etc.) et nous effectuons une recherche détaillée sur le marché pour trouver les options qui répondent le mieux à vos attentes. Si le véhicule proposé ne vous convient pas, vous êtes libre de nous le notifier et nous chercherons une alternative pour que vous soyez pleinement satisfait.`,
    },
    {
      id: "9",
      question:
        "Quels sont les avantages de passer par Drivite plutôt que de gérer moi-même l'achat ou la vente de mon véhicule ?",
      answer: `Passer par Drivite vous assure une transaction sécurisée, un gain de temps, et l’assurance de ne pas vous faire avoir. Vous bénéficiez aussi de notre expertise technique, de nos négociations professionnelles et d’un accompagnement personnalisé afin de faire les bons choix dans ce secteur complexe.`,
    },
    {
      id: "10",
      question: "Quels sont les délais pour acheter un véhicule avec Drivite ?",
      answer: `Le délai dépend des critères de recherche et de la disponibilité des véhicules sur le marché. En général, le processus complet peut prendre quelques semaines.`,
    },
    {
      id: "11",
      question:
        "Quel est le délai moyen pour vendre une voiture avec Drivite ?",
      answer: `Le délai moyen dépend de la demande du marché et du type de véhicule. En général, grâce à nos annonces optimisées et notre réseau, la vente d'un véhicule peut prendre de quelques jours à quelques semaines.`,
    },
    {
      id: "12",
      question:
        "Drivite peut-elle m'aider si j'ai déjà trouvé une voiture mais que je souhaite une vérification ?",
      answer: `Oui, nous avons une formule directement adapté à ce besoin précis qui s’appelle la formule Pilote. nous pouvons réaliser une inspection technique complète du véhicule que vous avez
      trouvé, pour vous assurer qu'il est en bon état et conforme à vos attentes. Nous vous assisterons en plus sur les démarches administratives associées`,
    },
    {
      id: "13",
      question:
        "Est-ce que Drivite peut m'accompagner dans l'achat ou la vente de véhicule autre qu'une voiture ? (exemple moto/camion...)",
      answer: `Oui, Drivite peut vous accompagner dans l'achat ou la vente de divers types de véhicules, y compris des motos, des camionnettes et des véhicules utilitaires. Notre équipe d'experts offre des accompagnements quel que soit le type de véhicule que vous souhaitez acquérir. Pour toute demande spécifique, veuillez contacter le service commercial.`,
    },
    {
      id: "14",
      question:
        "Quels types de véhicules Drivite peut-elle m’aider à acheter ou vendre ?",
      answer: `Nous travaillons avec tous types de véhicules, qu’il s’agisse de voitures particulières, neufs ou d’occasions, de véhicules utilitaires ou de modèles spécifiques selon vos besoins.`,
    },
    {
      id: "15",
      question: "Combien coûtent les services de Drivite ?",
      answer: `Nos tarifs sont basés sur la formule choisis et la valeur du véhicule, selon des paliers prédéfinis. Pour connaître le tarif précis selon votre demande nous vous invitons à prendre rendez-vous gratuitement pour connaître vos besoins. Page contact`,
    },
    {
      id: "16",
      question: "Puis-je utiliser Drivite uniquement pour vendre ma voiture ?",
      answer: `Oui, nous proposons plusieurs formules dont une complète pour la vente de votre voiture, incluant l'estimation, l'annonce, la gestion des visites, la négociation et les démarches administratives.`,
    },
    {
      id: "17",
      question:
        "Est-ce que Drivite peut m’aider à vendre rapidement mon véhicule ?",
      answer: `Oui, grâce à notre estimation précise et nos annonces optimisées, nous maximisons vos chances de vendre votre voiture rapidement et au meilleur prix.`,
    },

    {
      id: "18",
      question: "Comment Drivite détermine la valeur de mon véhicule ?",
      answer: `Nous utilisons des données de marché, l'état du véhicule précis et notre expertise pour estimer avec précision la valeur de votre voiture pour une vente rapide et optimisée, tout en maximisant vos gains.`,
    },
    {
      id: "19",
      question: "Quelle est la zone de couverture de Drivite ?",
      answer: `Nous opérons nos services dans toute la France.`,
    },
    {
      id: "20",
      question: "Quels sont les moyens de paiement acceptés par Drivite ?",
      answer: `Drivite accepte les paiements par virement bancaire sécurisé et les chèques.`,
    },
    {
      id: "21",
      question:
        "Est-ce que Drivite intervient sur les démarches de carte grise ?",
      answer: `Oui, nous travaillons avec un partenaire pour réaliser ces démarches très rapidement.`,
    },
    {
      id: "22",
      question:
        "Que se passe-t-il si le véhicule que je souhaite acheter présente des défauts lors de l'inspection ?",
      answer: `Nous vous fournissons un rapport détaillé des défauts constatés et vous aidons à négocier un prix en conséquence, ou à trouver une autre option. Notre objectif est de vous conseiller sur la pertinence de l'achat, en tenant compte de l'état du véhicule.`,
    },
    {
      id: "23",
      question: "Est-ce que Drivite négocie le prix des voitures pour moi ?",
      answer: `Oui, nous négocions le prix du véhicule pour nous assurer que vous obtenez un prix juste et conforme à la valeur réelle du véhicule.`,
    },
    {
      id: "24",
      question:
        "Est-ce que Drivite propose des services de financement pour l’achat de véhicules ?",
      answer: `Nous ne proposons pas directement de financement, mais nous pouvons vous orienter vers des partenaires pour obtenir des solutions adaptées.`,
    },
    {
      id: "25",
      question:
        "Puis-je contacter Drivite pour une simple consultation sans engagement ?",
      answer:
        "Oui, vous pouvez nous contacter pour une première consultation gratuite afin de discuter de vos besoins et voir comment nous pouvons vous aider.",
    },
    {
      id: "26",
      question: "Comment puis-je contacter Drivite ?",
      answer:
        "Vous pouvez nous contacter via notre formulaire en ligne, par email ou directement par téléphone.",
    },
    {
      id: "27",
      question: "Que se passe-t-il après la vente de mon véhicule ?",
      answer:
        "Une fois la vente conclue, nous vous accompagnons dans les dernières démarches administratives et restons à votre disposition pour toute assistance post-vente.",
    },
    {
      id: "28",
      question:
        "Comment fonctionne le processus de négociation du prix avec les acheteurs potentiels ?",
      answer:
        "Nous négocions directement avec les acheteurs potentiels, en nous assurant que le prix proposé reflète la valeur réelle du véhicule.",
    },
    {
      id: "30",
      question: "Est-ce que Drivite propose un programme de parrainage ?",
      answer:
        "Oui, en parrainant quelqu’un, vous et cette personne pouvez bénéficier de réductions sur nos services.",
    },
    {
      id: "31",
      question: "Quels types de véhicules Drivite accepte-t-il pour la vente ?",
      answer:
        "Drivite accepte la plupart des véhicules d’occasion, en s’assurant qu'ils respectent nos standards de qualité.",
    },
    {
      id: "32",
      question:
        "Quelles plateformes Drivite utilise-t-il pour diffuser les annonces de vente de voitures ?",
      answer:
        "Nous diffusons les annonces sur des plateformes comme LeBonCoin, La Centrale, ParuVendu, Facebook Marketplace, et notre site.",
    },
    {
      id: "33",
      question:
        "Je souhaite acheter une voiture avec un petit budget, vos services sont-ils quand même disponibles ?",
      answer:
        "Oui, nos services s'adaptent à tous les budgets, y compris pour les petits budgets, en garantissant le meilleur rapport qualité-prix.",
    },
    {
      id: "34",
      question: "Une question supplémentaire ?",
      answer:
        "Si vous n'avez pas trouvé la réponse à votre question, contactez-nous. Notre équipe est à votre disposition pour répondre à toutes vos interrogations.",
    },
  ];
};
