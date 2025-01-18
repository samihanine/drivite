import { Container } from "@/components/container";
import { Typography } from "@/components/typography";

export default function InformationCards({
  title,
  subtitle,
  cards,
}: {
  title: string;
  subtitle: string;
  cards: {
    title: string;
    description: string;
    Icon: React.ElementType;
  }[];
}) {
  return (
    <div className="bg-[#003F88] text-white">
      <Container className="py-20">
        <Typography variant="h2" className="text-center mb-4">
          {title}
        </Typography>
        <Typography
          variant="paragraph"
          className="text-center text-white/80 max-w-2xl mx-auto mb-8 text-lg"
        >
          {subtitle}
        </Typography>

        <div className="mt-16 grid grid-cols-1 gap-4 xl:grid-cols-4 lg:grid-cols-2">
          {cards.map((card) => (
            <div
              key={card.title}
              className="bg-white p-4 rounded-lg text-foreground"
            >
              <div className="flex items-center gap-4 mb-4 h-10">
                <div className="bg-[#E7F1FB] rounded-sm w-10 h-10 flex items-center justify-center">
                  <card.Icon className="w-5 h-5 text-primary" />
                </div>
                <Typography className="text-base" variant="h4">
                  {card.title}
                </Typography>
              </div>
              <Typography variant="small">{card.description}</Typography>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
