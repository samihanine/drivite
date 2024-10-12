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
      question: "Quels sont les avantages d'acheter une voiture d'occasion avec Drivite ?",
      answer: "Drivite vous offre une expérience d'achat de voiture d'occasion"
    },
    {
      id: "2",
      question: "Comment puis-je obtenir une estimation gratuite de ma voiture avec Drivite ?",
      answer: "Pour obtenir une estimation gratuite de votre voiture avec Drivite, vous pouvez"
    },
    {
      id: "3",
      question: "Quels sont les critères utilisés par Drivite pour sélectionner les véhicules à vendre ?",
      answer: "Drivite sélectionne les véhicules à vendre en fonction de plusieurs critères"
    },
    {
      id: "4",
      question: "Quels types de véhicules Drivite accepte-t-il pour la vente ?",
      answer: "Drivite accepte les véhicules de toutes"
    },
    {
      id: "5",
      question: "Comment puis-je planifier une inspection technique avec Drivite ?",
      answer: "Pour planifier une inspection technique avec Drivite, vous pouvez"
    },
    {
      id: "6",
      question: "Quelles plateformes Drivite utilise-t-il pour diffuser les annonces de vente de voitures ?",
      answer: "Drivite utilise plusieurs plateformes pour diffuser les annonces de vente de voitures"
    },
    {
      id: "7",
      question: "Est-ce que Drivite offre des garanties ou des assurances sur les véhicules vendus ?",
      answer: "Drivite offre des garanties et des assurances sur les véhicules vendus"
    },
    {
      id: "8",
      question: "Quel est le délai moyen pour vendre une voiture avec Drivite ?",
      answer: "Le délai moyen pour vendre une voiture avec Drivite est de quelques jours"
    },
    {
      id: "9",
      question: "Comment fonctionne le processus de négociation du prix avec les acheteurs potentiels ?",
      answer: "Le processus de négociation du prix avec les acheteurs potentiels est simple"
    },
    {
      id: "10",
      question: "Quels sont les moyens de paiement acceptés par Drivite pour l'achat de véhicules ?",
      answer: "Drivite accepte plusieurs moyens de paiement pour l'achat de véhicules"
    }
  ];
};
