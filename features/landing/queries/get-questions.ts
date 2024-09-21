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
      question: "Acheter ma voiture",
      answer:
        "Le processus d'achat de ma nouvelle voiture a été incroyablement fluide. L'équipe de Drivite était là à chaque étape, offrant un suivi et des conseils précieux. Très satisfaite de mon achat grâce à eux.",
    },
    {
      id: "2",
      question: "Acheter ma voiture",
      answer:
        "Le processus d'achat de ma nouvelle voiture a été incroyablement fluide. L'équipe de Drivite était là à chaque étape, offrant un suivi et des conseils précieux. Très satisfaite de mon achat grâce à eux.",
    },
  ];
};
