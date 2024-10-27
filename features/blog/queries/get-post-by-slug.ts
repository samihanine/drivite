import { client } from "@/sanity/lib/client";
import { Post } from "../schemas/post";
import { SanityPost, serializePost } from "../utils/serialize-post";

export async function getPostBySlug({
  locale,
  slug,
}: {
  locale: string;
  slug: string;
}): Promise<Post | null> {
  const query = `*[_type == "post" && slug.current == $slug][0]`;
  const post = await client.fetch<SanityPost>(query, { slug });
  return post ? serializePost({ post, locale }) : null;
}
