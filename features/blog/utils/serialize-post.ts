import { Post } from "../schemas/post";
import { urlFor } from "@/sanity/lib/image";
import { toHTML } from "@portabletext/to-html";

export type SanityPost = {
  _id: string;
  title: string;
  titlefr: string;
  slug: { current: string };
  slugfr: { current: string };
  mainImage: {
    asset: { url: string };
    alt: string;
    altfr: string;
  };
  publishedAt: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bodyfr: any;
  description: string;
  descriptionfr: string;
  author: {
    _ref: string;
    _type: string;
  };
};

export const serializePost = ({
  post,
  locale,
}: {
  post: SanityPost;
  locale: string;
}): Post => ({
  id: post._id,
  title: locale === "fr" ? post.titlefr : post.title,
  slug: post.slug.current,
  imageUrl: urlFor(post.mainImage).url(),
  publishedAt: post.publishedAt,
  body: toHTML(locale === "fr" ? post.bodyfr : post.body),
  description: locale === "fr" ? post.descriptionfr : post.description,
  altText: locale === "fr" ? post.mainImage.altfr : post.mainImage.alt,
  authorId: post.author._ref,
});
