"use client";

import { Container } from "@/components/container";
import React from "react";
import Image from "next/image";
import { Typography } from "@/components/typography";
import { LinkedInIcon } from "@/components/icons";
import { Hero } from "./hero";

const TeamMember = ({
  name,
  image,
  description,
  linkedin,
  subtitle,
}: {
  name: string;
  image: string;
  description: string;
  subtitle: string;
  linkedin: string;
}) => {
  return (
    <div className="flex flex-col flex-1">
      <Image
        src={image}
        alt={name}
        className="w-full aspect-square object-cover rounded-lg"
        objectFit="cover"
        width={1000}
        height={1000}
      />
      <div className="flex justify-between items-center mt-8">
        <Typography variant="h4" className="">
          {name}
        </Typography>
        <a href={linkedin} target="_blank" rel="noopener noreferrer">
          <LinkedInIcon className="w-6 h-6 text-primary" />
        </a>
      </div>

      <Typography variant="lead" className="text-primary my-2">
        {subtitle}
      </Typography>
      <Typography
        variant="small"
        dangerouslySetInnerHTML={{ __html: description }}
        className="text-muted-foreground"
      />
    </div>
  );
};

export default function AboutUs() {
  return (
    <>
      <Hero
        title="Qui sommes-nous ?"
        description="Drivite se positionne en tant qu'expert de confiance pour accompagner et simplifier vos démarches d'achat et de vente de véhicules. Nous mettons à votre disposition notre savoir-faire dans le but de prévenir les problèmes fréquemment rencontrés dans le monde automobile. Faites le choix de la tranquillité d'esprit avec Drivite."
        backgroundImagePath="/images/landing/question.jpeg"
      />

      <div className="bg-[#f8f9fe]">
        <Container className="flex flex-col gap-12 py-20">
          <section className="flex flex-col gap-8 sm:gap-20">
            <div className="flex flex-col gap-4 text-center w-full">
              <Typography className="text-center" variant="h2">
                Les fondateurs
              </Typography>

              <p className="text-muted-foreground w-full max-w-3xl mx-auto">
                {`Découvrez l'origine de Drivite à travers les portraits de ses
                fondateurs : Sarah Hanine et Léo Saunier. Ensemble, ils
                incarnent une passion commune pour l'automobile.`}
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-12 sm:gap-28 justify-around w-full max-w-3xl mx-auto">
              <TeamMember
                name="Sarah Hanine"
                subtitle="Cofondatrice présidente"
                image="/images/landing/sarah.png"
                description="Sarah Hanine apporte à Drivite une expertise en développement commercial et en gestion de projet, soutenue par une passion pour l'automobile. Avec une solide formation académique et une expérience précédente en tant qu'assistante de direction et chargée de développement, elle est déterminée à offrir une expérience client exceptionnelle. <br /> <br /> Chez Drivite, Sarah assure que chaque interaction client reflète notre engagement envers la transparence et la satisfaction."
                linkedin="https://www.linkedin.com/in/sarah-hanine"
              />

              <TeamMember
                name="Léo Saunier"
                subtitle="Cofondateur directeur général"
                image="/images/landing/leo.png"
                description="Léo Saunier incarne à Drivite une passion pour l'automobile et une expertise en commerce. Fort d'une expérience variée dans le développement commercial et la gestion d'équipes, il guide notre mission d'assurer des transactions automobiles sûres et transparentes. <br /> <br /> Léo combine une vision stratégique avec une connaissance approfondie du marché automobile, positionnant Drivite comme un partenaire de confiance pour tous vos besoins d'achat et de vente de véhicules."
                linkedin="https://www.linkedin.com/in/leosaunier/"
              />
            </div>
          </section>
        </Container>
        <div className="bg-[#f8f9fe]">
          <Container className="pb-28">
            <div className="flex flex-col items-center justify-start gap-6 lg:flex-row">
              <div className="flex w-full flex-col items-start justify-start gap-24 lg:w-1/2">
                <div className="pr-6">
                  <Typography variant="h2" className="mb-6">
                    Notre histoire
                  </Typography>

                  <Typography variant="paragraph" className="mb-9">
                    {`Fondée à Lyon, Drivite a débuté son parcours en répondant à
                    un besoin critique sur le marché automobile : sécuriser et
                    simplifier l'achat et la vente de véhicules. En digitalisant
                    nos services d'accompagnement, nous avons introduit une
                    nouvelle norme de transparence et de sécurité dans chaque`}
                    <br />
                    <br />
                    {`transaction. Ce pivot numérique nous a permis de non
                    seulement consolider notre présence dans toute la France,
                    mais aussi de répondre efficacement aux besoins des clients.
                    Aujourd'hui, Drivite s'engage à offrir une expérience client
                    fiable et accessible, transformant ainsi le secteur
                    automobile.`}
                  </Typography>
                </div>
                <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
                  <img
                    src="/images/landing/about-1.png"
                    alt="about 1"
                    className="aspect-[0.7] w-full rounded-lg object-cover md:w-1/2"
                  />
                  <div className="flex w-full flex-col items-center justify-center gap-6 md:w-1/2">
                    <img
                      src="/images/landing/about-2.png"
                      alt="about 2"
                      className="aspect-[1.1] rounded-lg object-cover"
                    />
                    <img
                      src="/images/landing/about-3.avif"
                      alt="about 3"
                      className="aspect-[0.7] rounded-lg object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-col items-center justify-center gap-12 pt-12 lg:w-1/2 lg:pt-48">
                <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
                  <img
                    src="/images/landing/about-4.avif"
                    alt="about 4"
                    className="aspect-[0.9] w-full rounded-lg object-cover md:w-1/2"
                  />
                  <div className="flex w-full flex-col items-center justify-center gap-6 md:w-1/2">
                    <img
                      src="/images/landing/about-5.avif"
                      alt="about 5"
                      className="aspect-[0.8] rounded-lg object-cover"
                    />
                    <img
                      src="/images/landing/about-6.avif"
                      alt="about 6"
                      className="aspect-[0.9] rounded-lg object-cover"
                    />
                  </div>
                </div>
                <div className="px-8">
                  <Typography variant="h2" className="mb-8">
                    Nos valeurs et engagements
                  </Typography>
                  <Typography variant="paragraph" className="mb-9">
                    {`Drivite se place comme votre intermédiaire de confiance à
                    chaque étape de l'achat ou la vente d'un véhicule. Nous
                    sommes composé d'une équipes d'experts, entièrement dévouée
                    à répondre à vos besoins`}
                    <br />
                    <br />
                    {`Nous nous engageons à mettre à disposition toutes nos
                    ressources pour vous permettre de trouver l'option idéale :
                    cela dans les meilleures conditions et à un prix juste.`}
                  </Typography>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}
