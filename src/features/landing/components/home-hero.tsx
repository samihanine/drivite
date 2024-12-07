import { ContactButton } from "@/features/landing/components/contact-button";
import { Container } from "@/components/container";
import { Image } from "@/components/image";
import { Typography } from "@/components/typography";
import { getI18n } from "@/locale/server";

export const HomeHero = async () => {
  const t = await getI18n();

  return (
    <div className="relative h-[calc(100vh-120px)]">
      <div className="absolute flex w-full h-full">
        <div className="bg-primary h-full w-full sm:w-1/2"></div>
        <Image
          src="/images/landing/home-hero.png"
          className="hidden sm:block sm:w-1/2 h-full"
          alt="Background"
        />
      </div>

      <Container className="relative py-20 h-full">
        <div className="flex flex-col gap-8 max-w-xl h-full justify-center">
          <Typography variant="h1" className="text-white">
            <span className="text-gray-200">{t("home.hero.title.line1")}</span>
            <br />
            {t("home.hero.title.line2")}
            <br />
            {t("home.hero.title.line3")}
          </Typography>
          <Typography variant="lead" className="text-white">
            {t("home.hero.description")}
          </Typography>
          <ContactButton />
        </div>
      </Container>
    </div>
  );
};
