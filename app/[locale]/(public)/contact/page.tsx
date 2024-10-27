import { Container } from "@/components/container";
import { Typography } from "@/components/typography";
import { CalendlyEmbed } from "@/features/landing/components/calendly";
import { ContactForm } from "@/features/landing/components/contact-form";
import { ContactHero } from "@/features/landing/components/contact-hero";
import { Map } from "@/features/landing/components/map";

export default async function Page() {
  return (
    <>
      <ContactHero />
      <div className="flex justify-center flex-col sm:flex-row">
        <Container className="flex flex-col sm:flex-row gap-12 py-20 w-full sm:w-1/2">
          <div className="w-full sm:px-20">
            <div className="w-full">
              <Typography className="mb-8" variant="h2">
                Envoyez nous un message !
              </Typography>

              <ContactForm />

              <Typography className="mt-8" variant="small">
                L&apos; adresse indiquée sur la map à droite correspond au siège
                social et n&apos;accueille pas de public.
              </Typography>
            </div>
          </div>
        </Container>

        <div className="w-full min-h-80 flex-grow sm:w-1/2">
          <Map />
        </div>
      </div>
    </>
  );
}
