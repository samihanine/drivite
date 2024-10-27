import { Container } from "@/components/container";
import { CreditCardIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";
import { Typography } from "@/components/typography";
import { CarIcon } from "@/components/icons";
import { Image } from "@/components/image";

const ServiceCard = ({
  title,
  href,
  description,
  image,
}: {
  title: string;
  description: string;
  href: string;
  image: string;
}) => {
  return (
    <div className="bg-background rounded-lg p-6 max-w-lg shadow-md shadow-[#E7F1FB]">
      <div className="flex flex-col items-center justify-between h-full gap-6">
        <div className="flex flex-col gap-2 items-center justify-center">
          <div className="w-20 h-20 flex items-center justify-center">
            <Image
              src={image}
              alt={title}
              width={80}
              height={80}
              className="h-20 w-20 text-primary"
            />
          </div>
          <Typography variant="h3">{title}</Typography>
        </div>
        <Typography variant="paragraph" className="text-center">
          {description}
        </Typography>
        <Link href={href} className="text-primary font-medium hover:underline">
          En savoir plus →
        </Link>
      </div>
    </div>
  );
};

export const ServiceCards: React.FC = async () => {
  return (
    <div className="px-8 py-20 bg-[#F8F9FF]">
      <Container>
        <Typography variant="h2" className="text-center mb-12">
          Définissez votre Parcours
        </Typography>
        <div className="flex flex-wrap justify-center gap-8">
          <ServiceCard
            title="Acheter ma voiture"
            description="Drivite rend l'achat de votre future voiture plus simple et sécurisé grâce à nos services complets. Faites confiance à notre accompagnement et à notre expertise pour une expérience réussie."
            image={"/images/landing/car.png"}
            href="/buy"
          />
          <ServiceCard
            title="Vendre ma voiture"
            description="Nous vous accompagnons tout au long du processus de vente, vous permettant ainsi de prendre des décisions éclairées et d’éviter les pièges courants. Assurez-vous d'une vente rapide et en toute sécurité."
            image={"/images/landing/car-key.png"}
            href="/sell"
          />
        </div>
      </Container>
    </div>
  );
};
