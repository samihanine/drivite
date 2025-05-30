"use client";

import { Button } from "@/components/button";
import { Container } from "@/components/container";
import {
  EmailIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  TiktokIcon,
  TwitterIcon,
  YouTubeIcon,
} from "@/components/icons";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { motion } from "framer-motion";
import Link from "next/link";
import { PhoneButton } from "./phone-button";
import { PageLink } from "../queries/get-page-links";

const socialLinks = [
  {
    label: "Facebook",
    icon: FacebookIcon,
    href: "https://www.facebook.com/profile.php?id=61563391888273&locale=fr_FR",
  },
  {
    label: "Instagram",
    icon: InstagramIcon,
    href: "https://www.instagram.com/drivite_fr/",
  },
  {
    label: "LinkedIn",
    icon: LinkedInIcon,
    href: "https://www.linkedin.com/company/drivite/",
  },
  {
    label: "YouTube",
    icon: YouTubeIcon,
    href: "https://www.youtube.com/@drivite",
  },
  {
    label: "Twitter",
    icon: TwitterIcon,
    href: "https://x.com/drivite_fr",
  },
  {
    label: "Tik-tok",
    icon: TiktokIcon,
    href: "https://www.tiktok.com/@drivite_fr",
  },
];

function SocialLink({
  icon: Icon,
  label,
  ...props
}: {
  icon: any;
  label: string;
  href: string;
}) {
  return (
    <motion.a
      className="flex items-center justify-center gap-2.5 rounded-full border border-primary py-2.5 text-sm text-muted-foreground duration-200 ease-in-out hover:bg-primary hover:text-white lg:gap-2 xl:gap-2.5"
      rel="noopener noreferrer"
      target="_blank"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      {...props}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {label}
    </motion.a>
  );
}

export function Footer({ pageLinks }: { pageLinks: PageLink[] }) {
  return (
    <section>
      <footer className="overflow-hidden border-t border-t-border bg-background py-8 sm:py-16">
        <Container>
          <div className="mx-auto grid max-w-xl items-center gap-5 lg:mx-0 lg:max-w-none lg:grid-cols-12 lg:gap-12 xl:gap-20">
            <motion.div
              className="lg:col-span-7 flex flex-col items-center sm:items-start"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0 },
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h3 className="text-center font-display text-4xl font-medium text-foreground sm:text-5xl lg:max-w-xl lg:text-left">
                Drivite, l&apos;expert qui éclaire vos choix automobiles
              </h3>
              <div className="mt-8 flex items-center gap-4 flex-wrap">
                <PhoneButton />
                <a href="mailto:contact@drivite.fr">
                  <Button variant={"outline"}>
                    <EmailIcon className="h-4 w-4 shrink-0 mr-2" />
                    contact@drivite.fr
                  </Button>
                </a>
              </div>
            </motion.div>

            <motion.div
              className="flex flex-col items-center lg:col-span-5 lg:items-start"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0 },
              }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <p className="text-center text-base text-muted-foreground lg:text-left">
                Nous offrons des services sur-mesure pour l&apos;achat et la
                vente de véhicules. Notre accompagnement personnalisé rend le
                processus simple et sécurisé.
              </p>
              <div className="mt-16 grid w-full max-w-sm grid-cols-2 gap-3.5 sm:max-w-none sm:grid-cols-3 lg:mt-8 lg:gap-2.5 xl:gap-3.5">
                {socialLinks.map((socialLink, index) => (
                  <SocialLink
                    key={`footer-social-link-${socialLink.label}`}
                    icon={socialLink.icon}
                    label={socialLink.label}
                    href={socialLink.href}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          <motion.hr
            className="mb-6 mt-12 h-px w-full border-border sm:mb-10 sm:mt-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { width: 0 },
              visible: { width: "100%" },
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />

          <motion.div
            className="flex flex-col items-center justify-between md:flex-row"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          >
            <div className="flex items-center gap-6 flex-wrap">
              <div className="bg-white rounded-full p-1">
                <LocaleSwitcher />
              </div>
              {[
                {
                  label: "Mentions légales",
                  href: "/mentions",
                },
                {
                  label: "Conditions générales de vente",
                  href: "/cgv",
                },
              ].map((link, index) => (
                <Link
                  key={`footer-link-${index}`}
                  href={link.href || "/"}
                  className="text-base font-medium text-muted-foreground duration-200 ease-in-out hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <p className="mt-8 text-base text-muted-foreground md:mt-0">
              © {new Date().getFullYear()} Drivite. Tous droits réservés
            </p>
          </motion.div>
        </Container>
      </footer>
    </section>
  );
}
