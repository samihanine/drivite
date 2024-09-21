import { Container } from "@/components/container";
import { Typography } from "@/components/typography";
import { getI18n } from "@/locale/server";
import { ContactButton } from "@/features/landing/components/contact-button";
import { Image } from "@/components/image";

export const Cta = async () => {
  const t = await getI18n();

  return (
    <div className="py-16 bg-primary">
      <Container className="relative h-full">
        <Image
          src="/images/landing/star.svg"
          alt="cta"
          className="w-20 h-20 md:absolute lg:ml-28"
        />

        <div className="flex flex-col gap-8 items-center max-w-3xl h-full justify-center mx-auto py-10">
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

        <div className="w-full flex justify-end">
          <Image
            src="/images/landing/star.svg"
            alt="cta"
            className="w-14 h-14 md:absolute right-0 bottom-0 self-end sm:mr-20 lg:mr-28"
          />
        </div>
      </Container>
    </div>
  );
};
