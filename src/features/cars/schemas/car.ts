import z from "zod";

export const carSchema = z.object({
  id: z.string(),
  images: z.array(z.string()),
  price: z.number(),
  location: z.string(),
  type: z.string(),
  brand: z.string(),
  model: z.string(),
  finish: z.string(),
  equipments: z.array(z.string()),
  interiorColor: z.string(),
  exteriorColor: z.string(),
  manufacturingYear: z.number(),
  mileage: z.number(),
  fuelType: z.string(),
  critAir: z.string(),
  transmission: z.string(),
  enginePower: z.string(),
  doors: z.number(),
  seats: z.number(),
  publishedAt: z.string(),
});

export type Car = z.infer<typeof carSchema>;
