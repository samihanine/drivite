"use client";

import { Container } from "@/components/container";
import { Typography } from "@/components/typography";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/solid";
import { CalendlyEmbed } from "./calendly";
import { useI18n } from "@/locale/client";
import { useState } from "react";
import { ContactForm } from "./contact-form";
import { Button } from "@/components/button";

export const ContactHero = () => {
  const t = useI18n();
  const [currentTab, setCurrentTab] = useState<"contact" | "appointment">(
    "contact",
  );

  return (
    <div className="py-20 bg-[#E7F1FB] min-h-[calc(100vh-80px)]">
      <Container className="relative h-full flex flex-col md:flex-row gap-12">
        <div className="flex flex-col gap-8 w-full md:w-3/5">
          <Typography variant="h1" className="text-5xl">
            Contactez-nous
          </Typography>
          <Typography variant="paragraph">
            {t("common.cta.description")}
          </Typography>
          <div className="flex flex-col gap-6 border-t border-t-primary pt-6 max-w-sm">
            <Typography variant="lead">Nos coordonnées</Typography>

            <div className="flex gap-4 items-center">
              <PhoneIcon className="h-6 w-6 text-primary" />
              <Typography variant="paragraph">
                <a
                  href="tel:04 11 66 56 11"
                  className="text-primary font-medium"
                >
                  04 11 66 56 11
                </a>
              </Typography>
            </div>

            <p>
              Pour toute informations complémentaires, n&apos;hésitez pas à nous
              contacter par mail :
            </p>

            <div className="flex gap-4 items-center">
              <EnvelopeIcon className="h-6 w-6 text-primary" />
              <Typography variant="paragraph">
                <a href="mailto:" className="text-primary font-medium">
                  contact@drivite.fr
                </a>
              </Typography>
            </div>
          </div>
        </div>

        <div className="bg-background p-8 w-full md:w-2/5 rounded-2xl shadow-md flex flex-col gap-3">
          <div className="flex gap-4 bg-slate-100 rounded-lg p-2">
            <Button
              variant={currentTab === "contact" ? "outline" : "ghost"}
              className="flex-1"
              onClick={() => setCurrentTab("contact")}
            >
              Message
            </Button>
            <Button
              variant={currentTab === "appointment" ? "outline" : "ghost"}
              className="flex-1"
              onClick={() => setCurrentTab("appointment")}
            >
              Rendez-vous
            </Button>
          </div>

          {currentTab === "appointment" && (
            <>
              <Typography variant="h3" className="mb-2">
                Prenez rendez-vous
              </Typography>

              <CalendlyEmbed url="https://calendly.com/drivite/30min" />
            </>
          )}
          {currentTab === "contact" && (
            <>
              <Typography variant="h3" className="mb-2">
                Envoyez nous un message
              </Typography>
              <ContactForm />
            </>
          )}
        </div>
      </Container>
    </div>
  );
};
