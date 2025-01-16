"use client";

import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { Typography } from "@/components/typography";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type Pricing = {
  Icon: React.ElementType<{ className: string }>;
  title: string;
  price: number;
  subtitle: string;
  buttonText: string;
  buttonHref: string;
  description: string;
};

function PricingCard({
  pricing,
  position,
}: {
  pricing: Pricing;
  position: "left" | "right" | "center";
}) {
  return (
    <div
      className={cn(
        "w-min rounded-3xl text-white border border-blue-500/50 h-min",
        position !== "center" ? "bg-[#09277c]" : "bg-[#276cbc]",
        position === "left" && "lg:rounded-r-none",
        position === "right" && "lg:rounded-l-none",
      )}
    >
      <div
        className={cn(
          "flex flex-col gap-6 w-full px-6",
          position !== "center" ? "py-8" : "pb-8 pt-16",
        )}
      >
        <div className="relative w-full flex justify-center">
          <div
            className={cn(
              "relative h-fit bg-primary p-3 flex justify-center items-center rounded-lg border border-blue-500/50",
              position !== "center" ? "mt-[-50px]" : "mt-[-84px]",
            )}
          >
            <pricing.Icon className="text-white w-5 h-5" />
          </div>
        </div>
        <div
          className={cn(
            "mx-auto border border-blue-500/50 rounded-lg px-5 py-1 w-fit",
            position !== "center" ? "bg-[#003F88]" : "bg-white text-primary",
          )}
        >
          <Typography variant="h4" className="text-center text-lg">
            {pricing.title}
          </Typography>
        </div>

        <Typography variant="small" className="text-white/80 text-center">
          À partir de
        </Typography>

        <Typography
          variant="paragraph"
          className="text-white font-bold text-center text-5xl"
        >
          {pricing.price} €
        </Typography>
      </div>
      <div
        className={cn(
          "flex flex-col w-full px-6 rounded-b-3xl",
          position !== "center"
            ? "bg-primary gap-8 py-8"
            : "bg-[#1359ab] gap-10 pt-8 pb-16",
        )}
      >
        <Typography variant="paragraph" className="text-center">
          {pricing.subtitle}
        </Typography>

        <Link href={pricing.buttonHref}>
          <Button
            className={cn(
              "!w-max mx-auto",
              position !== "center"
                ? "bg-[#003f88] text-[#2fd9ff]"
                : "bg-white text-primary",
            )}
          >
            Demander une inspection <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function DynamicPricing({
  pricingList,
}: {
  pricingList: Pricing[];
}) {
  const [activeIndex, setActiveIndex] = useState(1);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % pricingList.length);
  };

  const handlePrev = () => {
    setActiveIndex(
      (prev) => (prev - 1 + pricingList.length) % pricingList.length,
    );
  };

  const Dot = ({ index }: { index: number }) => (
    <button
      className={cn(
        "w-2 h-2 bg-gray-400 rounded-full cursor-pointor",
        activeIndex === index && "bg-primary",
      )}
      onClick={() => setActiveIndex(index)}
    ></button>
  );

  const right = (activeIndex + 1) % pricingList.length;
  const left = (activeIndex - 1 + pricingList.length) % pricingList.length;

  return (
    <section className="relative bg-[#F8F9FF] text-gray-900">
      <Container className="pb-20 md:mt-[-50px] relative">
        <Typography variant="h2" className="mb-16 text-center lg:text-left">
          Découvrez nos formules
        </Typography>
        <div className="flex justify-evenly items-center">
          <Button
            className="p-2 h-fit w-fit hidden lg:flex"
            variant={"default"}
            size={"icon"}
          >
            <ArrowLeft className="h-7 w-7" onClick={handlePrev} />
          </Button>

          <div className="flex justify-center items-center flex-col lg:flex-row gap-10 lg:gap-0">
            <PricingCard pricing={pricingList[right]} position="left" />

            <PricingCard pricing={pricingList[activeIndex]} position="center" />

            <PricingCard pricing={pricingList[left]} position="right" />
          </div>

          <Button
            className="p-2 h-fit w-fit hidden lg:flex"
            variant={"default"}
            size={"icon"}
          >
            <ArrowRight className="h-7 w-7" onClick={handleNext} />
          </Button>
        </div>
        <div className="mt-12 max-w-2xl mx-auto text-center text-sm text-gray-700 hidden lg:flex">
          <Typography
            variant="small"
            className="bg-[#1A62B6]/80 p-5 rounded-lg border-primary text-white"
          >
            Cette formule est idéale pour ceux qui manquent de temps ou de
            connaissances pour acheter leur future voiture. Si vous êtes
            dépassé, notre équipe d'experts s'occupe de tout, de vos besoins à
            la remise des clés.
          </Typography>
        </div>

        <div className="mt-6 mx-auto lg:flex justify-center gap-2 hidden">
          <Dot index={0} />

          <Dot index={1} />

          <Dot index={2} />
        </div>
      </Container>
    </section>
  );
}
