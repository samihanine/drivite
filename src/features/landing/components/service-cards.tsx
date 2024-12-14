"use client";

import { Container } from "@/components/container";
import { Image } from "@/components/image";
import { Typography } from "@/components/typography";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

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
    <motion.div
      className="bg-background rounded-lg p-6 max-w-lg shadow-md shadow-[#E7F1FB]"
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
        <motion.div
          className="flex flex-col gap-2 items-center justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { scale: 0.8, opacity: 0 },
            visible: { scale: 1, opacity: 1 },
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
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
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
        >
          <Typography variant="paragraph" className="text-center">
            {description}
          </Typography>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
        >
          <Link
            href={href}
            className="text-primary font-medium hover:underline"
          >
            En savoir plus →
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export const ServiceCards: React.FC = () => {
  return (
    <div className="px-8 py-20 bg-[#F8F9FF]">
      <Container>
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
          <Typography variant="h2" className="text-center mb-12">
            Définissez votre Parcours
          </Typography>
        </motion.div>
        <div className="flex flex-wrap justify-center gap-8">
          <ServiceCard
            title="Acheter ma voiture"
            description="Drivite rend l'achat de votre future voiture plus simple et sécurisé grâce à nos services complets. Faites confiance à notre accompagnement et à notre expertise pour une expérience réussie."
            image={"/images/landing/car.png"}
            href="/buy"
          />
          <ServiceCard
            title="Vendre une voiture"
            description="Nous vous accompagnons tout au long du processus de vente, vous permettant ainsi de prendre des décisions éclairées et d’éviter les pièges courants. Assurez-vous d'une vente rapide et en toute sécurité."
            image={"/images/landing/car-key.png"}
            href="/sell"
          />
        </div>
      </Container>
    </div>
  );
};
