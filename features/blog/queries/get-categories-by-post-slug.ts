import { client } from "@/sanity/lib/client";
import { SanityCategory, serializeCategory } from "../utils/serialize-category";
import { Category } from "../schemas/category";

export async function getCategoriesByPostSlug({
  postSlug,
  locale,
}: {
  postSlug: string;
  locale: string;
}): Promise<Category[]> {
  const query = `
        *[_type == "post" && slug.current == $postSlug]{
          "categories": categories[]->{
            _id,
            title,
            slug,
            description,
            descriptionfr
          }
        }[0].categories`;

  const categories = await client.fetch<SanityCategory[]>(query, { postSlug });
  return categories.map((category) => serializeCategory({ category, locale }));
}
