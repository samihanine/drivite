import { Header } from "@/features/landing/components/header";
import { Footer } from "@/features/landing/components/footer";
import { getI18n } from "@/locale/server";
import { getPageLinks } from "@/features/landing/queries/get-page-links";
import Script from "next/script";
import { cookies } from "next/headers";

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
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const pageLinks = await getPageLinks();
  const cookiesData = (await cookies()).get("accessToken");

  return (
    <>
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

      <Header pageLinks={pageLinks} isLogged={!!cookiesData?.value?.length} />
      <main>{children}</main>
      <Footer pageLinks={pageLinks} />
    </>
  );
}
