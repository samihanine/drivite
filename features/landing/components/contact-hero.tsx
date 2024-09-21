import { Container } from "@/components/container";
import { Typography } from "@/components/typography";
import { getI18n } from "@/locale/server";
import { ContactButton } from "@/features/landing/components/contact-button";
import { Image } from "@/components/image";
import { ContactForm } from "./contact-form";
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/solid";

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
                  +33 1 23 45 67 89
                </a>
              </Typography>
            </div>

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
              Entrez en contact
            </Typography>
            <Typography variant="paragraph">
              Vous avez une question ?
            </Typography>
          </div>
          <ContactForm />
        </div>
      </Container>
    </div>
  );
};
