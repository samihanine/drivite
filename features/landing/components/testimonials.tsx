"use client";

import { Container } from "@/components/container";
import { Image } from "@/components/image";
import { Typography } from "@/components/typography";
import { useI18n } from "@/locale/client";
import { CreditCardIcon } from "@heroicons/react/24/solid";

const TestimonialCard = ({
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
    <div className="bg-background rounded-lg p-6 max-w-lg w-full">
      <div className="flex flex-col items-center h-full gap-6">
        <div className="w-20 h-20 shadow-inner shadow-[#E7F1FB] rounded-bl-none flex items-center justify-center rounded-xl ">
          <Icon className="h-12 w-12 text-primary" />
        </div>
        <Typography variant="h4" className="text-primary">
          {title}
        </Typography>
        <Typography variant="small" className="text-center">
          {description}
        </Typography>
      </div>
    </div>
  );
};

export const Testimonials = () => {
  const t = useI18n();
  return (
    <div className="py-20 bg-primary">
      <Container className="relative h-full flex flex-col gap-8 items-center">
        <Typography variant="h2" className="text-white">
          {t("home.how.title")}
        </Typography>
        <Typography
          variant="paragraph"
          className="max-w-xl text-center text-white"
        >
          {t("home.how.description")}
        </Typography>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full"></div>
      </Container>
    </div>
  );
};
