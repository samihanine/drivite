import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const categoryType = defineType({
  name: "category",
  title: "Category",
  type: "document",
  icon: TagIcon as any,
  fields: [
    defineField({
      title: "Title (EN)",
      name: "title",
      type: "string",
    }),
    defineField({
      title: "Title (FR)",
      name: "titlefr",
      type: "string",
    }),
    defineField({
      title: "Slug (EN)",
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),
    defineField({
      title: "Slug (FR)",
      name: "slugfr",
      type: "slug",
      options: {
        source: "titlefr",
      },
    }),
    defineField({
      title: "Description (EN)",
      name: "description",
      type: "text",
    }),
    defineField({
      title: "Description (FR)",
      name: "descriptionfr",
      type: "text",
    }),
  ],
});
