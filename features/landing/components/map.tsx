import { Container } from "@/components/container";
import { Typography } from "@/components/typography";

export function Map() {
  return (
    <div className="py-20">
      <Container className="flex gap-12 items-center flex-col">
        <Typography variant="h2">Nous trouver</Typography>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2782.76921021505!2d4.8603265!3d45.7758153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f4ea9116e5482d%3A0x78621844a5e8e698!2s37%20Rue%20Louis%20Gu%C3%A9rin%2C%2069100%20Villeurbanne%2C%20France!5e0!3m2!1sen!2sca!4v1705630836939!5m2!1sen!2sca"
          className="rounded-3xl w-full h-96"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </Container>
    </div>
  );
}
