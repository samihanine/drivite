import z from "zod";

export const authorSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  imageUrl: z.string(),
  bio: z.string(),
});

export type Author = z.infer<typeof authorSchema>;
