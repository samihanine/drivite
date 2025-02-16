"use client";
import { Container } from "@/components/container";
import { SpeedIcon, WheelIcon } from "@/components/icons";
import CommerceHero from "@/features/landing/components/commerce-hero";
import { Cta } from "@/features/landing/components/cta";
import Discover from "@/features/landing/components/discover";
import DynamicPricing from "@/features/landing/components/dynamic-pricing";
import InformationCards from "@/features/landing/components/information-cards";
import PricingFormulas from "@/features/landing/components/pricing-formulas";
import {
  AdjustmentsVerticalIcon,
  ClipboardDocumentIcon,
  ShieldExclamationIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import {
  ChartBarIcon,
  CreditCardIcon,
  DocumentTextIcon,
  LockClosedIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";
import { SearchIcon, SparkleIcon } from "lucide-react";

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
              "Vous savez exactement quel véhicule vous voulez, mais trouver le bon sur le marché de l'occasion et faire le diagnostic vous semble complexe. Notre formule Co-Pilote est conçue pour répondre à vos besoins. Nous mettons à votre disposition notre expérience et notre connaissance approfondie du marché pour vous aider à trouver la voiture de vos rêves tout en vous assurant de sa qualité et de sa fiabilité.",
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
              "Cette formule est parfaite pour les personnes qui manquent de connaissances ou de temps pour mener à bien l'achat de leur future voiture. Si vous ne savez pas ce que vous recherchez exactement, par où commencer ou si vous vous sentez dépassé, notre équipe d'experts est là. Nous prenons en charge chaque étape du processus, de la définition de vos besoins à la remise des clés du véhicule.",
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
              "Vous avez trouvé l'annonce parfaite sur le marché, mais il est nécessaire d'inspecter la voiture pour s'assurer de sa conformité et sécuriser votre achat. Notre formule Pilote est conçue pour vous garantir la bonne sélection et le bon diagnostique. Il vous suffit de nous confier l'annonce, et nous nous chargeons du reste. Nous inspectons minutieusement le véhicule, traitons les formalités administratives et vous délivrons une voiture prête à rouler en toute sécurité.",
          },
        ]}
      />

      <PricingFormulas
        tierOne="Pilote"
        tierTwo="Co-Pilote"
        tierThree="Autopilote"
        formulas={[
          {
            Icon: ChartBarIcon,
            title: "Analyse de vos besoins pour trouver le modèle idéal.",
            tierOne: false,
            tierTwo: false,
            tierThree: true,
          },
          {
            Icon: SearchIcon,
            title:
              "Recherche ciblée sur le marché pour dénicher le bon véhicule.",
            tierOne: false,
            tierTwo: true,
            tierThree: true,
          },
          {
            Icon: SparklesIcon,
            title: "Comparaison des offres et sélection adaptée.",
            tierOne: false,
            tierTwo: true,
            tierThree: true,
          },
          {
            Icon: LockClosedIcon,
            title: "Inspection détaillée du véhicule et rapport complet.",
            tierOne: true,
            tierTwo: true,
            tierThree: true,
          },
          {
            Icon: CreditCardIcon,
            title: "Conseils d’achat et négociations expertes.",
            tierOne: true,
            tierTwo: true,
            tierThree: true,
          },
          {
            Icon: DocumentTextIcon,
            title: "Accompagnement des formalités administratives.",
            tierOne: true,
            tierTwo: true,
            tierThree: true,
          },
          {
            Icon: SparkleIcon,
            title:
              "Recommandations personnalisées d’utilisation et d’entretien.",
            tierOne: true,
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
            traditionnel. Pour les acheteurs, <strong>Drivite</strong> offre la
            possibilité d&apos;acquérir un véhicule à un{" "}
            <strong>tarif inférieur de 5 à 10%</strong> par rapport aux
            concessions classiques. Sur un véhicule d&apos;une valeur de 20 000€
            vendu par Drivite, cela signifie un gain potentiel de 4 000€ pour le
            vendeur et des <strong>économies</strong> d’environ 1 500€ pour
            l&apos;acheteur.
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
              "Bénéficiez de notre savoir-faire et nos connaissances dans le secteur automobile, garantissant des transactions réussies.",
            Icon: ClipboardDocumentIcon,
          },
          {
            title: "Accompagnement personnalisé",
            description:
              "Nous nous adaptons à vos besoins uniques pour vous offrir un service sur-mesure.",
            Icon: AdjustmentsVerticalIcon,
          },
          {
            title: "Sélection exigeante",
            description:
              "Profitez d'une gamme de véhicules d'occasion soigneusement sélectionnés pour leur qualité.",
            Icon: ShieldExclamationIcon,
          },
          {
            title: "Gain de temps",
            description:
              "Évitez les pertes de temps grâce à notre gestion complète, pour une expérience sans stress.",
            Icon: ClockIcon,
          },
        ]}
      />

      <Discover
        title="L’application qui simplifie votre projet automobile"
        subtitle="Simplifiez l'achat et la vente de votre voiture avec notre application dédiée, garantissant transparence et sécurité à chaque étape. Permet un suivi en temps réel et transforme l'attente en une expérience interactive et rassurante, pour une tranquillité d'esprit totale. "
        buttonText="Découvrir la plateforme"
        imagePath="/images/landing/double-phone.png"
      />

      <Cta />
    </>
  );
}
