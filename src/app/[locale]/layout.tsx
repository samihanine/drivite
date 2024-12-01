import Providers from "@/components/providers";
import { getI18n } from "@/locale/server";
import "@/styles/globals.css";

export async function generateMetadata(_: {
  params: Promise<{ lang: string }>;
}) {
  const t = await getI18n();
  return {
    title: t("home.metaTitle"),
    description: t("common.description"),
    twitter: {
      card: "summary_large_image",
      title: t("common.title"),
      description: t("common.description"),
      creator: "@_sam0411",
    },
    metadataBase: process.env.NEXT_PUBLIC_BASE_URL || "",
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  return (
    <html lang={(await params).locale || "en"}>
      <body>
        <Providers locale={(await params).locale}>{children}</Providers>
      </body>
    </html>
  );
}
