import { client } from "@/sanity/lib/client";
import {
  SanityAuthor,
  serializeAuthor,
} from "@/features/blog/utils/serialize-author";
import { Author } from "../schemas/author";

export async function getAllAuthors({
  locale,
}: {
  locale: string;
}): Promise<Author[]> {
  const query = '*[_type == "author"]';
  const authors = await client.fetch<SanityAuthor[]>(query);
  return authors.map((author) => serializeAuthor({ author, locale }));
}
