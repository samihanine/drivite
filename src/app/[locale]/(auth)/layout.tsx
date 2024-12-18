import { AuthCarousel } from "@/features/auth/components/auth-carousel";
import { LogoText } from "@/components/logo-text";
import Link from "next/link";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const testimonials = [
    {
      quote:
        "Nous offrons des services sur-mesure pour l'achat et la vente de véhicules. Notre accompagnement personnalisé rend le processus simple et sécurisé.",
      imageUrl: "/images/auth/auth-carousel-1.jpg",
    },
    {
      quote:
        "Nous offrons des services sur-mesure pour l'achat et la vente de véhicules. Notre accompagnement personnalisé rend le processus simple et sécurisé.",
      imageUrl: "/images/auth/auth-carousel-2.jpg",
    },
    {
      quote:
        "Nous offrons des services sur-mesure pour l'achat et la vente de véhicules. Notre accompagnement personnalisé rend le processus simple et sécurisé.",
      imageUrl: "/images/auth/auth-carousel-3.jpg",
    },
    {
      quote:
        "Nous offrons des services sur-mesure pour l'achat et la vente de véhicules. Notre accompagnement personnalisé rend le processus simple et sécurisé.",
      imageUrl: "/images/auth/auth-carousel-4.jpg",
    },
    {
      quote:
        "Nous offrons des services sur-mesure pour l'achat et la vente de véhicules. Notre accompagnement personnalisé rend le processus simple et sécurisé.",
      imageUrl: "/images/auth/auth-carousel-5.jpg",
    },
  ];

  return (
    <>
      <div className="flex min-h-screen w-full px-8 py-12">
        <div className="px-5 md:px-20 space-y-8 lg:max-w-lg w-full">
          <Link href="/">
            <LogoText />
          </Link>

          {children}
        </div>

        <AuthCarousel testimonials={testimonials} />
      </div>
    </>
  );
}
