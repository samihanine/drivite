import Providers from "@/components/providers";
import { getI18n } from "@/locale/server";
import "@/styles/globals.css";
import localFont from "next/font/local";

const codecPro = localFont({
  src: [
    {
      path: "../../../public/font/CodecPro-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../../public/font/CodecPro-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../../public/font/CodecPro-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../../public/font/CodecPro-ExtraBoldItalic.woff2",
      weight: "800",
      style: "italic",
    },
    {
      path: "../../../public/font/CodecPro-ExtraLightItalic.woff2",
      weight: "200",
      style: "italic",
    },
    {
      path: "../../../public/font/CodecPro-Fat.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../../public/font/CodecPro-FatItalic.woff2",
      weight: "900",
      style: "italic",
    },
    {
      path: "../../../public/font/CodecPro-Heavy.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../../public/font/CodecPro-HeavyItalic.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../../public/font/CodecPro-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../../public/font/CodecPro-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../../public/font/CodecPro-News.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/font/CodecPro-NewsItalic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../../public/font/CodecPro-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../../public/font/CodecPro-ThinItalic.woff2",
      weight: "100",
      style: "italic",
    },
    {
      path: "../../../public/font/CodecPro-Bold.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/font/CodecPro-UltraBlack.woff2",
      weight: "950",
      style: "normal",
    },
    {
      path: "../../../public/font/CodecPro-UltraBlackItalic.woff2",
      weight: "950",
      style: "italic",
    },
    {
      path: "../../../public/font/CodecPro-UltraItalic.woff2",
      weight: "500",
      style: "italic",
    },
  ],
});

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
    <html lang={(await params).locale || "en"} className={codecPro.className}>
      <body>
        <Providers locale={(await params).locale}>{children}</Providers>
      </body>
    </html>
  );
}
