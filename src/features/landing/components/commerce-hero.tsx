"use client";

import { Container } from "@/components/container";
import React from "react";
import { Typography } from "@/components/typography";
import Image from "next/image";
import CarWithStars from "/public/images/landing/car-and-stars.png";

export default function CommerceHero({
  title,
  subtitle,
  type,
}: {
  title: string;
  subtitle: string;
  type: "BUY" | "SELL";
}) {
  return (
    <div className="bg-[#F8F9FF]">
      <section className="relative bg-primary text-white">
        <div className="relative overflow-hidden pb-10">
          <Container className="py-20 relative z-10">
            <div className="max-w-xl space-y-4">
              <Typography variant="h1">{title}</Typography>
              <Typography variant="paragraph" className="text-white/80">
                {subtitle}
              </Typography>
            </div>
          </Container>
        </div>
      </section>

      <div className="justify-end flex w-full relative py-10 md:py-0 md:mt-[-225px]">
        <Image
          src={CarWithStars}
          alt="Car with stars"
          className="w-auto h-[450px] object-contain z-[50]"
        />
      </div>
    </div>
  );
}
