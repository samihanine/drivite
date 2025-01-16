import { getI18n } from "@/locale/server";
import { z } from "zod";

export const pageLinkSchema = z.object({
  label: z.string(),
  href: z.string().optional(),
  children: z
    .array(z.object({ label: z.string(), href: z.string() }))
    .optional(),
});

export type PageLink = z.infer<typeof pageLinkSchema>;

export const getPageLinks = async (): Promise<PageLink[]> => {
  const t = await getI18n();
  const links = [
    { label: t("header.home"), href: "/" },
    {
      label: t("header.services"),
      children: [
        { label: t("header.cars"), href: "/cars" },
        /*
        { label: t("header.buy"), href: "/buy" },
        { label: t("header.sell"), href: "/sell" },
         */
      ],
    },
    {
      label: t("header.about"),
      children: [
        /*
        { label: t("header.who"), href: "/about-us" },
         */
        { label: t("header.faq"), href: "/faq" },
        /*
        { label: t("header.join"), href: "/join-us" },
        { label: t("header.testimonials"), href: "/testimonials" },
        { label: t("header.partners"), href: "/partners" },
         */
      ],
    },
    { label: t("header.blog"), href: "/blog" },
    { label: t("header.contact"), href: "/contact" },
  ];

  return links;
};
