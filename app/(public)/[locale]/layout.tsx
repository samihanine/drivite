import { Header } from "@/components/header";
import { GeistSans } from "geist/font/sans";
import { Footer } from "@/components/footer";
import Providers from "@/components/providers";
import { getI18n } from "@/locale/server";
import NextTopLoader from "nextjs-toploader";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

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
  return (
    <html lang={params.locale || "en"}>
      <body className={GeistSans.className}>
        <Providers locale={params.locale}>
          <>
            <NextTopLoader color="#000000" />
            <Header />
            <Analytics />
            <main>{children}</main>
            <Footer />
          </>
        </Providers>
      </body>
    </html>
  );
}
