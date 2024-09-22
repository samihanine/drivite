import { Container } from "@/components/container";
import { Typography } from "@/components/typography";

export function Map() {
  return (
    <div className="py-20">
      <Container className="flex gap-12 sm:gap-20 items-center flex-col sm:flex-row">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2782.76921021505!2d4.8603265!3d45.7758153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f4ea9116e5482d%3A0x78621844a5e8e698!2s37%20Rue%20Louis%20Gu%C3%A9rin%2C%2069100%20Villeurbanne%2C%20France!5e0!3m2!1sen!2sca!4v1705630836939!5m2!1sen!2sca"
          className="rounded-3xl w-full sm:w-1/2 aspect-square"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        <div className="flex flex-col gap-8 w-full sm:w-1/2">
          <Typography variant="h2" className="text-center text-5xl">
            Nous trouver
          </Typography>

          <div className="flex flex-col gap-4">
            <Typography variant="h4" className="text-center">
              Siègle social
            </Typography>
            <Typography
              variant="paragraph"
              className="text-muted-foreground text-lg text-center"
            >
              Drivite Inc.
              <br />
              37 Rue Louis Guérin
              <br />
              69100 <br />
              Villeurbanne
              <br />
              Auvergne-Rhône-Alpes <br />
              France
            </Typography>
          </div>
        </div>
      </Container>
    </div>
  );
}
