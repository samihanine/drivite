import { Container } from "@/components/container";
import { CarIcon, ChatIcon, ClickIcon, DocumentIcon } from "@/components/icons";
import { Image } from "@/components/image";
import { Typography } from "@/components/typography";
import { getI18n } from "@/locale/server";

const HowItWorksCard = ({
  title,
  description,
  Icon,
}: {
  title: string;
  description: string;
  Icon: any;
}) => {
  return (
    <div className="bg-background rounded-lg p-6 max-w-lg w-full">
      <div className="flex flex-col items-center h-full gap-6">
        <div className="w-20 h-20 shadow-inner shadow-[#E7F1FB] rounded-bl-none flex items-center justify-center rounded-xl ">
          <Icon className="h-12 w-12 text-primary" />
        </div>
        <Typography variant="h4" className="text-primary text-base text-center">
          {title}
        </Typography>
        <Typography variant="small" className="text-center text-sm">
          {description}
        </Typography>
      </div>
    </div>
  );
};
export const HowItWorks = async () => {
  const t = await getI18n();

  return (
    <div className="py-20">
      <Container className="relative h-full flex flex-col gap-8 items-center">
        <Typography variant="h2">{t("home.how.title")}</Typography>
        <Typography variant="paragraph" className="max-w-xl text-center">
          {t("home.how.description")}
        </Typography>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
          <div className="relative">
            <Image
              src="/images/landing/arrow-up.svg"
              alt="arrow"
              className="absolute left-1/2 w-full px-12 ml-2 pt-10 z-50 hidden md:block"
            />
            <HowItWorksCard
              title="1 - Consultation personnalisée"
              description="Bénéficiez d’un 1er rendez-vous afin d'établir vos besoins, votre budget et le choix de la formule adaptée."
              Icon={ClickIcon}
            />
          </div>

          <div className="relative">
            <Image
              src="/images/landing/arrow-down.svg"
              alt="arrow"
              className="absolute left-1/2 top-[40px] w-full px-12 ml-2 pt-10 z-50 hidden md:block"
            />
            <HowItWorksCard
              title="2 - Réalisation de nos services"
              description="Nous vous accompagnons de A à Z  tout au long de votre processus d'achat ou de vente."
              Icon={DocumentIcon}
            />
          </div>

          <div className="relative">
            <Image
              src="/images/landing/arrow-up.svg"
              alt="arrow"
              className="absolute left-1/2 w-full px-12 ml-2 pt-10 z-50 hidden md:block"
            />
            <HowItWorksCard
              title="3 - Suivi et échanges réguliers"
              description="Restez au courant de chaque avancée de votre projet via votre espace client."
              Icon={ChatIcon}
            />
          </div>

          <div className="relative">
            <HowItWorksCard
              title="4 - Départ en toute sérénité"
              description="Vous pouvez repartir avec l'esprit tranquille."
              Icon={CarIcon}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};
