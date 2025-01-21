import { client } from "@/sanity/lib/client";
import { SanityCategory, serializeCategory } from "../utils/serialize-category";
import { Category } from "../schemas/category";

export async function getCategories({
  locale,
}: {
  locale: string;
}): Promise<Category[]> {
  const query = '*[_type == "category"]';
  const categories = await client.fetch<SanityCategory[]>(
    query,
    {},
    { next: { revalidate: 0 } },
  );
  return (
    categories?.map((category) => serializeCategory({ category, locale })) || []
  );
}
