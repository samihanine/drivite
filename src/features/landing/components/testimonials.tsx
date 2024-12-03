import { Container } from "@/components/container";
import { Image } from "@/components/image";
import { Typography } from "@/components/typography";
import { StarIcon } from "@heroicons/react/24/solid";
import { Testimonial } from "../queries/get-testimonials";
import { getI18n } from "@/locale/server";

const TestimonialCard = ({
  title,
  stars,
  age,
  testimonial,
  picture,
  name,
}: {
  title: string;
  name: string;
  stars: number;
  age: number;
  testimonial: string;
  picture: string;
}) => {
  return (
    <div className="bg-background rounded-lg px-6 py-12 w-full flex gap-6">
      <div className="flex flex-col items-center justify-center w-1/3 gap-1">
        <Image
          src={"/images/landing/user.png"}
          alt="Testimonial"
          className="w-24 h-24 rounded-full mb-3"
        />
        <Typography variant="h4" className="text-center">
          {name}
        </Typography>
        <Typography variant="paragraph" className="text-center">
          {title}
        </Typography>
        <Typography variant="small" className="text-center">
          {age} ans
        </Typography>
      </div>
      <div className="flex flex-col w-2/3 gap-6">
        <div className="flex gap-2">
          {Array.from({ length: stars }).map((_, i) => (
            <StarIcon key={i} className="h-7 w-7 text-yellow-400" />
          ))}
        </div>
        <Typography variant="paragraph">{testimonial}</Typography>
      </div>
    </div>
  );
};

export const Testimonials = async (props: { testimonials: Testimonial[] }) => {
  const t = await getI18n();

  return (
    <div className="py-20 bg-[#003F88]">
      <Container className="relative h-full flex flex-col gap-4 items-center">
        <Typography variant="h2" className="text-white">
          Témoignages de nos clients
        </Typography>
        <Typography
          variant="paragraph"
          className="max-w-xl text-center text-white"
        >
          Nos clients sont notre priorité, découvrez ce qu&apos;ils pensent de
          nous.
        </Typography>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full mt-8">
          {props.testimonials.slice(0, 2).map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              title={testimonial.title}
              name={testimonial.name}
              age={testimonial.age}
              stars={testimonial.stars}
              testimonial={testimonial.testimonial}
              picture={testimonial.picture}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};
