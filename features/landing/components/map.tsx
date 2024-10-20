import { Container } from "@/components/container";
import { Typography } from "@/components/typography";

export function Map() {
  return (
    <div className="py-20">
      <Container className="flex gap-12 items-center flex-col">
        <Typography variant="h2">Nous trouver</Typography>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2783.608843791002!2d4.839379175990619!3d45.7589872137221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f4ea5980530a01%3A0xaeeb676d781df202!2s12%20Rue%20de%20la%20Part-Dieu%2C%2069003%20Lyon%2C%20France!5e0!3m2!1sen!2sca!4v1729429729687!5m2!1sen!2sca"
          className="rounded-3xl w-full h-96"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </Container>
    </div>
  );
}
