import { client } from "@/sanity/lib/client";
import { Post } from "../schemas/post";
import { SanityPost, serializePost } from "../utils/serialize-post";

export async function getAllPosts({
  locale,
}: {
  locale: string;
}): Promise<Post[]> {
  const query = '*[_type == "post"]';
  const posts = await client.fetch<SanityPost[]>(query);
  return posts.map((post) => serializePost({ post, locale }));
}
