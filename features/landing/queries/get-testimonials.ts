import z from "zod";

export const testimonialSchema = z.object({
  title: z.string(),
  name: z.string(),
  age: z.number(),
  stars: z.number(),
  testimonial: z.string(),
  picture: z.string(),
  id: z.string(),
});

export type Testimonial = z.infer<typeof testimonialSchema>;

export const getTestimonials = async (): Promise<Testimonial[]> => {
  return [
    {
      id: "1",
      title: "Achat d'une voiture",
      name: "Lucie",
      age: 42,
      stars: 5,
      testimonial:
        "J’ai fait appel à Drivite pour l’achat de ma nouvelle voiture. L'équipe a été présente à chaque étape du début à la fin, me conseillant de manière claire et rassurante. Ils ont pris le temps de répondre à toutes mes questions (même le dimanche !) et m'ont vraiment aidée à faire le bon choix. Je suis très contente de ma nouvelle voiture, et je les recommande sans hésitation !",
      picture: "/images/landing/testimonial-1.png",
    },
    {
      id: "2",
      title: "Vente d'une voiture",
      name: "Romain",
      age: 29,
      stars: 5,
      testimonial:
        "J'ai récemment vendu ma voiture avec Drivite, et tout s'est vraiment bien passé. Dès le départ, ils ont pris en main toute la gestion : estimation du prix, rédaction de l’annonce, organisation des visites, et même les négociations. En quelques jours, ma voiture était vendue à un très bon prix. Un service efficace et sans prise de tête, je ferai de nouveau appel à leurs services pour une future vente !",
      picture: "/images/landing/testimonial-2.png",
    },
  ];
};
