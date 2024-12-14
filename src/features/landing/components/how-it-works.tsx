"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/container";
import { CarIcon, ChatIcon, ClickIcon, DocumentIcon } from "@/components/icons";
import { Image } from "@/components/image";
import { Typography } from "@/components/typography";

const HowItWorksCard = ({
  title,
  description,
  Icon,
  delay,
  arrowDirection,
}: {
  title: string;
  description: string;
  Icon: any;
  delay: number;
  arrowDirection?: "up" | "down";
}) => {
  return (
    <motion.div
      className="bg-background rounded-lg p-6 max-w-lg w-full relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
    >
      {arrowDirection && (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.8, ease: "easeOut", delay: delay - 0.1 }}
        >
          <Image
            src={`/images/landing/arrow-${arrowDirection}.svg`}
            alt="arrow"
            className={`absolute left-1/2 w-full px-12 ml-2 pt-10 z-50 hidden md:block ${
              arrowDirection === "down" ? "top-[40px]" : ""
            }`}
          />
        </motion.div>
      )}

      <div className="flex flex-col items-center h-full gap-6">
        <div className="w-20 h-20 shadow-inner shadow-[#E7F1FB] rounded-bl-none flex items-center justify-center rounded-xl">
          <Icon className="h-12 w-12 text-primary" />
        </div>
        <Typography variant="h4" className="text-primary text-base text-center">
          {title}
        </Typography>
        <Typography variant="small" className="text-center text-sm">
          {description}
        </Typography>
      </div>
    </motion.div>
  );
};

export const HowItWorks = () => {
  return (
    <div className="py-20">
      <Container className="relative h-full flex flex-col gap-8 items-center">
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
          <Typography variant="h2">Comment ça marche ?</Typography>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <Typography variant="paragraph" className="max-w-xl text-center">
            De la consultation initiale à la satisfaction finale, découvrez
            comment nous transformons chaque étape de votre projet en une
            expérience sur mesure.
          </Typography>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
          <HowItWorksCard
            title="1 - Consultation personnalisée"
            description="Bénéficiez d’un 1er rendez-vous afin d'établir vos besoins, votre budget et le choix de la formule adaptée."
            Icon={ClickIcon}
            delay={0.2}
            arrowDirection="up"
          />

          <HowItWorksCard
            title="2 - Réalisation de nos services"
            description="Nous vous accompagnons de A à Z  tout au long de votre processus d'achat ou de vente."
            Icon={DocumentIcon}
            delay={0.4}
            arrowDirection="down"
          />

          <HowItWorksCard
            title="3 - Suivi et échanges réguliers"
            description="Restez au courant de chaque avancée de votre projet via votre espace client."
            Icon={ChatIcon}
            delay={0.6}
            arrowDirection="up"
          />

          <HowItWorksCard
            title="4 - Départ en toute sérénité"
            description="Vous pouvez repartir avec l'esprit tranquille."
            Icon={CarIcon}
            delay={0.8}
          />
        </div>
      </Container>
    </div>
  );
};
