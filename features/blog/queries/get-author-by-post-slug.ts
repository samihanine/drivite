import {
  SanityAuthor,
  serializeAuthor,
} from "@/features/blog/utils/serialize-author";
import { client } from "@/sanity/lib/client";
import { Author } from "../schemas/author";

export async function getAuthorByPostSlug({
  postSlug,
  locale,
}: {
  postSlug: string;
  locale: string;
}): Promise<Author | null> {
  const query = `*[_type == "post" && slug.current == $postSlug][0].author`;
  const author = await client.fetch<{
    _ref: string;
    _type: string;
  }>(query, { postSlug });

  if (!author) {
    return null;
  }

  const authorQuery = `*[_id == $authorId][0]`;
  const authorData = await client.fetch<SanityAuthor>(authorQuery, {
    authorId: author._ref,
  });

  return authorData ? serializeAuthor({ author: authorData, locale }) : null;
}
