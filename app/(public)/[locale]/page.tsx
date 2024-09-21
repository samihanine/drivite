import { Advantages } from "@/features/landing/components/advantages";
import { HomeHero } from "@/features/landing/components/home-hero";
import { HowItWorks } from "@/features/landing/components/how-it-works";
import { MarketStatistics } from "@/features/landing/components/market-statistics";
import { ServiceCards } from "@/features/landing/components/service-cards";
import { Testimonials } from "@/features/landing/components/testimonials";
import { getTestimonials } from "@/features/landing/queries/get-testimonials";
import { Cta } from "@/features/landing/components/cta";

export default async function HomePage() {
  const testimonials = await getTestimonials();

  return (
    <>
      <HomeHero />
      <ServiceCards />
      <Advantages />
      <MarketStatistics />
      <HowItWorks />
      <Testimonials testimonials={testimonials} />
      <Cta />
    </>
  );
}
