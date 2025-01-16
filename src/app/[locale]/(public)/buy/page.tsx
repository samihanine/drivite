"use client";
import { ClickIcon, ClockIcon, SpeedIcon, WheelIcon } from "@/components/icons";
import { UnderConstruction } from "@/components/under-construction";
import CommerceHero from "@/features/landing/components/commerce-hero";
import { Cta } from "@/features/landing/components/cta";
import DynamicPricing from "@/features/landing/components/dynamic-pricing";
import PricingFormulas from "@/features/landing/components/pricing-formulas";

export default function Page() {
  return (
    <>
      <CommerceHero
        title="Acheter ma voiture"
        subtitle="Nos services simplifient tout, de la recherche à la transaction du véhicule. Pour une expérience d'achat automobile en toute sérénité, faites le choix de l'efficacité et la tranquilité avec Drivite. Disponible dans toute la France."
        type="BUY"
      />
      <DynamicPricing
        pricingList={[
          {
            Icon: ({ className }) => <SpeedIcon className={className} />,
            title: "Formule Co-Pilote",
            price: 980,
            subtitle:
              "Une solution simple et efficace pour acheter votre véhicule.",
            buttonText: "Contacter un expert Drivite",
            buttonHref: "/contact",
            description:
              "Cette formule est idéale pour ceux qui manquent de temps ou de connaissances pour acheter leur future voiture. Si vous êtes dépassé, notre équipe d'experts s’occupe de tout, de vos besoins à la remise des clés.",
          },
          {
            Icon: ({ className }) => <WheelIcon className={className} />,
            title: "Formule Autopilote",
            price: 1120,
            subtitle:
              "Parce que acheter votre véhicule ne devrait pas être une épreuve.",
            buttonText: "Trouver ma future voiture",
            buttonHref: "/contact",
            description:
              "Cette formule est idéale pour ceux qui manquent de temps ou de connaissances pour acheter leur future voiture. Si vous êtes dépassé, notre équipe d'experts s’occupe de tout, de vos besoins à la remise des clés.",
          },
          {
            Icon: ({ className }) => <ClockIcon className={className} />,
            title: "Formule Pilote",
            price: 440,
            subtitle:
              "Une solution rapide et efficace pour acheter votre véhicule.",
            buttonText: "Demander une inspection",
            buttonHref: "/contact",
            description:
              "Cette formule est idéale pour ceux qui manquent de temps ou de connaissances pour acheter leur future voiture. Si vous êtes dépassé, notre équipe d'experts s’occupe de tout, de vos besoins à la remise des clés.",
          },
        ]}
      />

      <PricingFormulas
        formulas={[
          {
            Icon: ClickIcon,
            title: "Formule Co-Pilote",
            tierOne: true,
            tierTwo: true,
            tierThree: true,
          },
          {
            Icon: ClockIcon,
            title: "Formule Autopilote",
            tierOne: true,
            tierTwo: true,
            tierThree: true,
          },
          {
            Icon: SpeedIcon,
            title: "Formule Pilote",
            tierOne: true,
            tierTwo: true,
            tierThree: true,
          },
        ]}
      />
      <Cta />
    </>
  );
}
