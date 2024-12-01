import z from "zod";

export const categorySchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  description: z.string(),
});

export type Category = z.infer<typeof categorySchema>;
