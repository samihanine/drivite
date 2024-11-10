import z from "zod";

export const postSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  imageUrl: z.string(),
  publishedAt: z.string(),
  body: z.string(),
  description: z.string(),
  altText: z.string().optional(),
  authorId: z.string().optional(),
  categoryIds: z.array(z.string()).optional(),
});

export type Post = z.infer<typeof postSchema>;
