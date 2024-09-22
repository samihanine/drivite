import { Header } from "@/features/landing/components/header";
import { Footer } from "@/features/landing/components/footer";
import Providers from "@/components/providers";
import { getI18n } from "@/locale/server";
import "./globals.css";
import { getPageLinks } from "@/features/landing/queries/get-page-links";

export async function generateMetadata(_: { params: { lang: string } }) {
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
  params: { locale: string };
}) {
  const pageLinks = await getPageLinks();
  return (
    <html lang={params.locale || "en"}>
      <body>
        <Providers locale={params.locale}>
          <>
            <Header pageLinks={pageLinks} />
            <main>{children}</main>
            <Footer pageLinks={pageLinks} />
          </>
        </Providers>
      </body>
    </html>
  );
}
