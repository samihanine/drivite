import Providers from "@/components/layout/providers";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const font = Roboto({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Drivite",
  description:
    "Nous offrons des services sur-mesure pour l'achat et la vente de véhicules. Notre accompagnement personnalisé rend le processus simple et sécurisé.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${font.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
