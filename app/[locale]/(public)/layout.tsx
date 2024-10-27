import { Header } from "@/features/landing/components/header";
import { Footer } from "@/features/landing/components/footer";
import Providers from "@/components/providers";
import { getI18n } from "@/locale/server";
import "./globals.css";
import { getPageLinks } from "@/features/landing/queries/get-page-links";
import Script from "next/script";

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
      <Script id="json" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: "Nom du produit",
          image: ["https://exemple.com/photo_du_produit.jpg"],
          description: "Description du produit",
          sku: "SKU12345",
          mpn: "925872",
          brand: {
            "@type": "Brand",
            name: "Nom de la marque",
          },
          review: {
            "@type": "Review",
            reviewRating: {
              "@type": "Rating",
              ratingValue: "5",
              bestRating: "5",
            },
            author: {
              "@type": "Person",
              name: "Nom du critique",
            },
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "5.0",
            reviewCount: "23",
          },
        })}
      </Script>
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
