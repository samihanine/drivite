import { Container } from "@/components/container";
import { Typography } from "@/components/typography";
import { getI18n } from "@/locale/server";

const MarketStatisticCard = ({
  percentage,
  title,
}: {
  title: string;
  percentage: number;
}) => {
  return (
    <div className="bg-background rounded-2xl p-6 max-w-lg border border-border rounded-b-none border-b-secondary border-b-2">
      <div className="flex flex-col items-center justify-between h-full gap-6">
        <Typography variant="h3" className="text-center text-4xl font-bold">
          {percentage} %
        </Typography>

        <Typography variant="small" className="text-center">
          {title}
        </Typography>
      </div>
    </div>
  );
};

export const MarketStatistics = async () => {
  const t = await getI18n();
  return (
    <div className="py-20 bg-[#E7F1FB]">
      <Container className="relative h-full flex flex-col gap-12 items-center">
        <Typography variant="h2">{t("home.market.title")}</Typography>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
          <MarketStatisticCard title="Taux de satisfaction" percentage={95} />
          <MarketStatisticCard title="Taux de satisfaction" percentage={95} />
          <MarketStatisticCard title="Taux de satisfaction" percentage={95} />
          <MarketStatisticCard title="Taux de satisfaction" percentage={95} />
        </div>
      </Container>
    </div>
  );
};
