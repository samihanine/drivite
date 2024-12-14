"use client";

import { motion } from "framer-motion";
import { ContactButton } from "@/features/landing/components/contact-button";
import { Container } from "@/components/container";
import { Image } from "@/components/image";
import { Typography } from "@/components/typography";

export const HomeHero = () => {
  return (
    <div className="relative h-[calc(100vh-120px)]">
      <div className="absolute flex w-full h-full">
        <div className="bg-primary h-full w-full sm:w-1/2"></div>
        <Image
          src="/images/landing/home-hero.png"
          className="hidden sm:block sm:w-1/2 h-full"
          alt="Background"
        />
      </div>

      <Container className="relative py-20 h-full">
        <motion.div
          className="flex flex-col gap-8 max-w-xl h-full justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Typography variant="h1" className="text-white">
            <motion.span
              className="text-gray-200"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, x: -30 },
                visible: { opacity: 1, x: 0 },
              }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              Drivite,
            </motion.span>
            <br />
            l'expert qui éclaire
            <br />
            vos choix automobiles
          </Typography>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          >
            <Typography variant="lead" className="text-white">
              Nous offrons des services sur-mesure pour l'achat et la vente de
              véhicules. Notre accompagnement personnalisé rend le processus
              simple et sécurisé.
            </Typography>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1 },
            }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          >
            <ContactButton />
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
};
