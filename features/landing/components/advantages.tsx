"use client";

import { Container } from "@/components/container";
import { Image } from "@/components/image";
import { Typography } from "@/components/typography";
import { useI18n } from "@/locale/client";
import {
  AdjustmentsVerticalIcon,
  ClipboardDocumentCheckIcon,
  ClockIcon,
  ShieldExclamationIcon,
} from "@heroicons/react/24/solid";

const AdvantageCard = ({
  title,
  description,
  Icon,
}: {
  title: string;
  description: string;
  Icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
      title?: string | undefined;
      titleId?: string | undefined;
    } & React.RefAttributes<SVGSVGElement>
  >;
}) => {
  return (
    <div className="bg-background rounded-2xl p-6 max-w-lg shadow-md shadow-[#E7F1FB]">
      <div className="flex flex-col items-center justify-between h-full gap-6">
        <div className="flex w-full items-center gap-4">
          <div className="w-12 h-12 bg-[#E7F1FB] rounded-md flex items-center justify-center">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <Typography variant="h4">{title}</Typography>
        </div>

        <Typography variant="small">{description}</Typography>
      </div>
    </div>
  );
};

export const Advantages = () => {
  const t = useI18n();
  return (
    <div className="py-20">
      <Container className="relative flex-col sm:flex-row sm:h-full flex gap-12 sm:gap-20 items-center">
        <Image
          src="/images/landing/home-advantages.png"
          className="w-full sm:block sm:w-2/5 h-full"
          alt="Background"
        />

        <div className="w-full sm:w-3/5 sm:h-full flex flex-col gap-8">
          <Typography variant="h2">{t("home.advantages.title")}</Typography>

          <Typography variant="paragraph">
            {t("home.advantages.description")}
          </Typography>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <AdvantageCard
              Icon={ClipboardDocumentCheckIcon}
              title="Expertise avancée"
              description="Bénéficiez de notre savoir-faire et nos connaissances dans le secteur automobile, garantissant des transactions réussies."
            />
            <AdvantageCard
              Icon={AdjustmentsVerticalIcon}
              title="Accompagnement personnalisé"
              description="Nous nous adaptons à vos besoins uniques pour vous offrir un service sur-mesure."
            />
            <AdvantageCard
              Icon={ShieldExclamationIcon}
              title="Sélection exigeante"
              description="Profitez d'une gamme de véhicules d'occasion soigneusement sélectionnés pour leur qualité."
            />
            <AdvantageCard
              Icon={ClockIcon}
              title="Gain de temps"
              description="Évitez les pertes de temps grâce à notre gestion complète, pour une expérience sans stress."
            />
          </div>
        </div>
      </Container>
    </div>
  );
};
