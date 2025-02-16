"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Container } from "@/components/container";
import { Typography } from "@/components/typography";

const MarketStatisticCard = ({
  value,
  unit,
  title,
}: {
  title: string;
  value: number;
  unit: string;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const startCount = () => {
      let current = 0;
      const duration = 1500;
      let increment: number;
      let stepTime: number;

      if (Number.isInteger(value)) {
        increment = 1;
        stepTime = Math.floor(duration / value);
      } else {
        stepTime = 50;
        const steps = Math.floor(duration / stepTime);
        increment = value / steps;
      }

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(current);
        }
      }, stepTime);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startCount();
        }
      },
      { threshold: 0.1 },
    );

    const element = document.getElementById(`stat-${title}`);
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [value, title]);

  return (
    <motion.div
      id={`stat-${title}`}
      className="bg-background rounded-2xl p-6 max-w-lg border border-border rounded-b-none border-b-secondary border-b-2"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="flex flex-col items-center justify-between h-full gap-6">
        <Typography variant="h3" className="text-center text-4xl font-medium">
          {Number.isInteger(value) ? Math.floor(count) : count.toFixed(1)}{" "}
          {unit}
        </Typography>
        <Typography variant="small" className="text-center">
          {title}
        </Typography>
      </div>
    </motion.div>
  );
};

export const MarketStatistics = () => {
  return (
    <div className="py-20 bg-[#E7F1FB]">
      <Container className="relative h-full flex flex-col gap-12 items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: -30 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Typography variant="h2">
            Le marché de l’occasion en chiffres c’est
          </Typography>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
          <MarketStatisticCard
            title="de véhicules vendus en France en 2024 (neufs et occasions)"
            value={7.1}
            unit="millions"
          />
          <MarketStatisticCard
            title="d’annonces frauduleuses (vices cachés, accidents dissimulés, compteurs trafiqués…)"
            value={30}
            unit="%"
          />
          <MarketStatisticCard
            title="des acheteurs et vendeurs de voitures expriment des craintes"
            value={88}
            unit="%"
          />
          <MarketStatisticCard
            title="des Français ont déjà été confrontés à une arnaque lors de l’achat / vente"
            value={58}
            unit="%"
          />
        </div>
      </Container>
    </div>
  );
};
