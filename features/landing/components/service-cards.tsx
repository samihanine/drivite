import { Container } from "@/components/container";
import { CreditCardIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";
import { Typography } from "@/components/typography";
import { CarIcon } from "@/components/icons";

const ServiceCard = ({
  title,
  href,
  description,
  Icon,
}: {
  title: string;
  description: string;
  href: string;
  Icon: any;
}) => {
  return (
    <div className="bg-background rounded-lg p-6 max-w-lg shadow-md shadow-[#E7F1FB]">
      <div className="flex flex-col items-center justify-between h-full gap-6">
        <div className="w-20 h-20 bg-[#E7F1FB] rounded-md flex items-center justify-center">
          <Icon className="h-12 w-12 text-primary" />
        </div>
        <Typography variant="h3">{title}</Typography>
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
            description="Drivite simplifie et sécurise l'achat de votre voiture. Comptez sur notre accompagnement et notre expertise pour une expérience réussie."
            Icon={CreditCardIcon}
            href="/buy"
          />
          <ServiceCard
            title="Vendre ma voiture"
            description="Nos experts sécurisent et simplifient aussi la vente de votre voiture. Comptez sur notre équipe pour une expérience réussie."
            Icon={CarIcon}
            href="/sell"
          />
        </div>
      </Container>
    </div>
  );
};
