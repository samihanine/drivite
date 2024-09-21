import { Container } from "@/components/container";
import { Typography } from "@/components/typography";
import { getI18n } from "@/locale/server";
import { ContactButton } from "@/features/landing/components/contact-button";

export const Cta = async () => {
  const t = await getI18n();

  return (
    <div className="py-20 bg-primary">
      <Container className="relative h-full flex justify-center">
        <div className="flex flex-col gap-8 items-center max-w-3xl h-full justify-center">
          <Typography variant="h2" className="text-white text-center text-5xl">
            {t("common.cta.title")}
          </Typography>
          <Typography
            variant="paragraph"
            className="max-w-xl text-white text-center"
          >
            {t("common.cta.description")}
          </Typography>

          <ContactButton />
        </div>
      </Container>
    </div>
  );
};
