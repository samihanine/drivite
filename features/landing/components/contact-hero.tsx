import { Container } from "@/components/container";
import { Typography } from "@/components/typography";
import { getI18n } from "@/locale/server";
import { ContactButton } from "@/features/landing/components/contact-button";
import { Image } from "@/components/image";
import { ContactForm } from "./contact-form";
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/solid";
import Script from "next/script";
import { CalendlyEmbed } from "./calendly";

export const ContactHero = async () => {
  const t = await getI18n();

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
                <a href="tel:" className="text-primary font-medium">
                  06 33 82 71 73
                </a>
              </Typography>
            </div>

            <p>
              Pour toute informations complémentaires, n'hésitez pas à nous
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

        <div className="bg-background p-8 w-full md:w-2/5 rounded-2xl shadow-md flex flex-col gap-8">
          <div>
            <Typography variant="h2" className="mb-2">
              Entrons en contact
            </Typography>
            <Typography variant="paragraph">
              Prennez rendez-vous pour une consultation gratuite
            </Typography>
          </div>

          <CalendlyEmbed url="https://calendly.com/drivite/30min" />
        </div>
      </Container>
    </div>
  );
};
