import { urlFor } from "@/sanity/lib/image";
import { toHTML } from "@portabletext/to-html";
import { Author } from "../schemas/author";
import { htmlToTailwind } from "@/lib/utils";

export type SanityAuthor = {
  _id: string;
  name: string;
  slug: { current: string };
  image: {
    asset: { url: string };
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bio: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  biofr: any;
};

export const serializeAuthor = ({
  author,
  locale,
}: {
  author: SanityAuthor;
  locale: string;
}): Author => ({
  id: author._id,
  name: author.name,
  slug: author.slug.current,
  imageUrl: urlFor(author.image).url(),
  bio: htmlToTailwind(toHTML(locale === "fr" ? author.biofr : author.bio)),
});
