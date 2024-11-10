import { htmlToTailwind } from "@/lib/utils";
import { toHTML } from "@portabletext/to-html";
import { Category } from "../schemas/category";

export type SanityCategory = {
  _id: string;
  title: string;
  slug: { current: string };
  slugfr: { current: string };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  description: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  descriptionfr: any;
};

export const serializeCategory = ({
  category,
  locale,
}: {
  category: SanityCategory;
  locale: string;
}): Category => ({
  id: category._id,
  title: category.title,
  description: htmlToTailwind(
    toHTML(locale === "fr" ? category.descriptionfr : category.description),
  ),
  slug: category.slug.current,
});
