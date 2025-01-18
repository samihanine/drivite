"use client";
import { Container } from "@/components/container";
import { ChatIcon, ClockIcon, SpeedIcon, WheelIcon } from "@/components/icons";
import CommerceHero from "@/features/landing/components/commerce-hero";
import { Cta } from "@/features/landing/components/cta";
import Discover from "@/features/landing/components/discover";
import DynamicPricing from "@/features/landing/components/dynamic-pricing";
import InformationCards from "@/features/landing/components/information-cards";
import PricingFormulas from "@/features/landing/components/pricing-formulas";
import {
  CalendarIcon,
  ChartBarIcon,
  CreditCardIcon,
  DocumentTextIcon,
  LockClosedIcon,
  SparklesIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { SearchIcon, SparkleIcon } from "lucide-react";

export default function Page() {
  return (
    <>
      <CommerceHero
        title="Vendre ma voiture"
        subtitle="Nos services sur mesure simplifie chaque étape, de l'estimation à la négociation, pour que vous puissiez vendre votre véhicule en toute confiance. Pour une expérience de vente automobile en toute sérénité, faites le choix de l'efficacité et la tranquilité avec Drivite. Disponible dans toute la France."
        type="SELL"
      />
      <DynamicPricing
        pricingList={[
          {
            Icon: ({ className }) => <SpeedIcon className={className} />,
            title: "Formule Express",
            price: 700,
            subtitle:
              "Une solution rapide et efficace pour vendre votre véhicule.",
            buttonText: "Vendre ma voiture rapidement",
            buttonHref: "/contact",
            description:
              "À l’opposé du trajet direct, cette formule est pour les personnes qui n’ont aucune idée de la valeur de leur véhicule. Ces services vous permettront de maximiser la valeur de votre bien tout en accélérant le processus de vente grâce à la diffusion de votre annonce.",
          },
          {
            Icon: ({ className }) => <WheelIcon className={className} />,
            title: "Formule Sur-mesure",
            price: 1180,
            subtitle: "Parce que vendre votre véhicule se doit d'être simple.",
            buttonText: "Vendre ma voiture simplement",
            buttonHref: "/contact",
            description:
              "Cette formule est conçue pour les vendeurs qui souhaitent un accompagnement complet, du début à la fin. Elle est idéale si vous ne connaissez pas bien le monde de l'automobile, si vous voulez maximiser la valeur de votre voiture, et si vous préférez que quelqu'un d'autre prenne en charge les aspects fastidieux de la vente.",
          },
          {
            Icon: ({ className }) => <ClockIcon className={className} />,
            title: "Formule Directe",
            price: 780,
            subtitle:
              "Parce que vendre votre véhicule ne devrait pas être une épreuve.",
            buttonText: "Vendre ma voiture facilement",
            buttonHref: "/contact",
            description:
              "Si vous avez une idée claire de la valeur de votre véhicule et que vous êtes à l'aise pour gérer une partie du processus de vente, la Formule Trajet Direct est une option pratique. Elle s'adresse à ceux qui souhaitent simplifier la vente de leur voiture sans nécessiter un accompagnement complet.",
          },
        ]}
      />

      <PricingFormulas
        tierOne="Express"
        tierTwo="Directe"
        tierThree="Sur-mesure"
        formulas={[
          {
            Icon: UserIcon,
            title: "Évaluation détaillée du véhicule et rapport complet.",
            tierOne: true,
            tierTwo: false,
            tierThree: true,
          },
          {
            Icon: ChartBarIcon,
            title: "Estimation de la valeur sur le marché.",
            tierOne: true,
            tierTwo: false,
            tierThree: true,
          },
          {
            Icon: SearchIcon,
            title: "Création et publication d'une annonce attractive.",
            tierOne: true,
            tierTwo: true,
            tierThree: true,
          },
          {
            Icon: SparklesIcon,
            title: "Promotion de l'annonce pour plus de visibilité.",
            tierOne: true,
            tierTwo: true,
            tierThree: true,
          },
          {
            Icon: LockClosedIcon,
            title: "Tri et évaluation des offres reçues.",
            tierOne: false,
            tierTwo: true,
            tierThree: true,
          },
          {
            Icon: ChatIcon,
            title: "Contact avec les acheteurs potentiels et échanges.",
            tierOne: false,
            tierTwo: true,
            tierThree: true,
          },
          {
            Icon: CalendarIcon,
            title:
              "Accompagnement lors des visites et mise en avant des atouts.",
            tierOne: false,
            tierTwo: true,
            tierThree: true,
          },
          {
            Icon: CreditCardIcon,
            title: "Négociation du prix avec les acheteurs.",
            tierOne: false,
            tierTwo: true,
            tierThree: true,
          },
          {
            Icon: DocumentTextIcon,
            title: "Accompagnement administratif lors de la vente.",
            tierOne: false,
            tierTwo: true,
            tierThree: true,
          },
        ]}
      />

      <div className="bg-[#F8F9FF]">
        <Container className="pb-20">
          <p className="">
            <strong>Pour les vendeurs,</strong> notre modèle représente une
            opportunité de réaliser <strong>jusqu&apos;à 25% de plus</strong>{" "}
            par rapport à une vente en concession ou chez un garage
            traditionnel. Pour les acheteurs, Drivite offre la possibilité
            d&apos;acquérir un <strong>véhicule</strong> à un tarif inférieur de
            5 à 10% par rapport aux concessions classiques. Sur un{" "}
            <strong>véhicule</strong> d&apos;une valeur de 20 000€ vendu par
            Drivite, cela signifie un <strong>gain potentiel</strong> de 4 000€
            pour le vendeur et des <strong>économies</strong> d’environ 1 500€
            pour l&apos;acheteur.
          </p>
        </Container>
      </div>

      <InformationCards
        title="Vous souhaitez en savoir plus sur l’accompagnement ?"
        subtitle="Découvrez ce que nos clients disent de leur expérience avec Drivite, leur partenaire de confiance pour l'achat et la vente de véhicules."
        cards={[
          {
            title: "Expertise avancée",
            description:
              "Bénéficiez de notre savoir-faire et nos connaissances dans le secteur...",
            Icon: ClockIcon,
          },
          {
            title: "Accompagnement personnalisé",
            description: "Nous nous adaptons à vos besoins uniques...",
            Icon: ClockIcon,
          },
          {
            title: "Sélection exigeante",
            description:
              "Profitez d'une gamme de véhicules d'occasion soigneusement...",
            Icon: ClockIcon,
          },
          {
            title: "Gain de temps",
            description:
              "Évitez les pertes de temps grâce à notre gestion complète, pour...",
            Icon: ClockIcon,
          },
        ]}
      />

      <Discover
        title="L’application qui simplifie votre projet automobile"
        subtitle="Simplifiez l'achat et la vente de votre voiture avec notre application dédiée, garantissant transparence et sécurité à chaque étape. Permet un suivi en temps réel et transforme l'attente en une expérience interactive et rassurante, pour une tranquillité d'esprit totale. "
        buttonText="Découvrir la plateforme"
        imagePath="/images/landing/double-phone-2.png"
      />

      <Cta />
    </>
  );
}
