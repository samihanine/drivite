import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const postType = defineType({
  name: "post",
  title: "Post",
  type: "document",
  icon: DocumentTextIcon as any,
  fields: [
    defineField({
      name: "title",
      title: "Title (EN)",
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
      name: "author",
      type: "reference",
      to: { type: "author" },
    } as any),
    defineField({
      name: "mainImage",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text (EN)",
        },
        {
          name: "altfr",
          type: "string",
          title: "Alternative text (FR)",
        },
      ],
    } as any),
    defineField({
      name: "categories",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: { type: "category" } })],
    } as any),
    defineField({
      name: "publishedAt",
      type: "datetime",
    }),
    defineField({
      title: "Short description (EN)",
      name: "description",
      type: "text",
    }),
    defineField({
      title: "Short description (FR)",
      name: "descriptionfr",
      type: "text",
    }),
    defineField({
      title: "Body (EN)",
      name: "body",
      type: "blockContent",
    }),
    defineField({
      title: "Body (FR)",
      name: "bodyfr",
      type: "blockContent",
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
    },
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `by ${author}` };
    },
  },
});
