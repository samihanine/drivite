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
      title: "Acheter ma voiture",
      name: "Jeanne",
      age: 35,
      stars: 5,
      testimonial:
        "Le processus d'achat de ma nouvelle voiture a été incroyablement fluide. L'équipe de Drivite était là à chaque étape, offrant un suivi et des conseils précieux. Très satisfaite de mon achat grâce à eux.",
      picture: "/images/landing/testimonial-1.png",
    },
    {
      id: "2",
      title: "Acheter ma voiture",
      name: "Jean",
      age: 35,
      stars: 5,
      testimonial:
        "Le processus d'achat de ma nouvelle voiture a été incroyablement fluide. L'équipe de Drivite était là à chaque étape, offrant un suivi et des conseils précieux. Très satisfaite de mon achat grâce à eux.",
      picture: "/images/landing/testimonial-2.png",
    },
  ];
};
