"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/container";
import { Typography } from "@/components/typography";
import { ContactButton } from "@/features/landing/components/contact-button";
import { Image } from "@/components/image";

export const Cta = () => {
  return (
    <div className="py-16 bg-primary">
      <Container className="relative h-full">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, scale: 0 },
            visible: { opacity: 1, scale: 1 },
          }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Image
            src="/images/landing/star.svg"
            alt="cta"
            className="w-20 h-20 md:absolute lg:ml-28 animate-spin-slow"
          />
        </motion.div>

        <motion.div
          className="flex flex-col gap-8 items-center max-w-3xl h-full justify-center mx-auto py-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Typography variant="h2" className="text-white text-center text-5xl">
            Faites les meilleurs choix dès maintenant grâce à Drivite
          </Typography>
          <Typography
            variant="paragraph"
            className="max-w-xl text-white text-center"
          >
            Contactez Drivite aujourd&apos;hui et découvrez comment nous pouvons
            vous aider ! Nos services d&apos;accompagnement sont disponibles
            partout en France.
          </Typography>

          <ContactButton />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, scale: 0 },
            visible: { opacity: 1, scale: 1 },
          }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="w-full flex justify-end"
        >
          <Image
            src="/images/landing/star.svg"
            alt="cta"
            className="w-14 h-14 md:absolute right-0 bottom-0 self-end sm:mr-20 lg:mr-28 animate-spin-slow"
          />
        </motion.div>
      </Container>
    </div>
  );
};
