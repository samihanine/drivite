import { Advantages } from "./advantages";
import { HomeHero } from "./home-hero";
import { HowItWorks } from "./how-it-works";
import { MarketStatistics } from "./market-statistics";
import { ServiceCards } from "./service-cards";
import { Testimonials } from "./testimonials";

export const HomePage = () => {
  return (
    <>
      <HomeHero />
      <ServiceCards />
      <Advantages />
      <MarketStatistics />
      <HowItWorks />
      <Testimonials />
    </>
  );
};
