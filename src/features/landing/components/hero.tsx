import { Container } from "@/components/container";
import { Image } from "@/components/image";
import { Typography } from "@/components/typography";

export const Hero = ({
  title,
  description,
  backgroundImagePath,
}: {
  title: string;
  description: string;
  backgroundImagePath: string;
}) => {
  return (
    <div className="relative">
      <div className="absolute flex w-full h-full">
        <div className="absolute w-full h-full bg-primary"></div>
      </div>

      <Container className="relative py-16 h-full flex justify-center">
        <div className="flex flex-col gap-8 max-w-3xl h-full justify-center">
          <Typography variant="h1" className="text-white text-center">
            {title}
          </Typography>
          <Typography variant="lead" className="text-white text-center">
            {description}
          </Typography>
        </div>
      </Container>
    </div>
  );
};
