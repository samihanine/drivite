"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Container } from "@/components/container";
import { Typography } from "@/components/typography";

const MarketStatisticCard = ({
  percentage,
  title,
}: {
  title: string;
  percentage: number;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const startCount = () => {
      let start = 0;
      const end = percentage;
      const duration = 1500;
      const stepTime = Math.abs(Math.floor(duration / end));

      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) {
          clearInterval(timer);
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
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [percentage, title]);

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
        <Typography variant="h3" className="text-center text-4xl font-bold">
          {count} %
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
          <MarketStatisticCard title="de compteurs trafiqués" percentage={10} />
          <MarketStatisticCard title="d’accidents dissimulés" percentage={20} />
          <MarketStatisticCard
            title="de frais de réparations cachés"
            percentage={30}
          />
          <MarketStatisticCard
            title="d’annonces frauduleuses"
            percentage={15}
          />
        </div>
      </Container>
    </div>
  );
};
