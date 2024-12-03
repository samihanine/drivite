import { notFound } from "next/navigation";
import { Metadata } from "next";
import { setStaticParamsLocale } from "next-international/server";
import { getCarById } from "@/features/cars/queries/get-car-by-id";
import { getCars } from "@/features/cars/queries/get-cars";
import { Car } from "@/features/cars/components/car";
import { Cta } from "@/features/landing/components/cta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    car: string;
    locale: string;
  }>;
}): Promise<Metadata> {
  const data = await params;
  const car = await getCarById({
    locale: data.locale,
    id: data.car,
  });

  if (!car) {
    return {};
  }

  return {
    title: car.brand + " - TVL Conseils",
    openGraph: {
      title: car.brand + " - TVL Conseils",
      images: car.images[0],
      locale: data.locale,
    },
    twitter: {
      card: "summary_large_image",
      site: "@tvlconseils",
      creator: "@tvlconseils",
      images: car.images[0],
    },
  };
}

export async function generateStaticParams({}: {
  params: Promise<{
    locale: string;
  }>;
}) {
  const slugEn = (await getCars({ locale: "fr" })).map((car) => ({
    slug: car.id,
    locale: "en",
  }));

  const slugFr = (await getCars({ locale: "en" })).map((car) => ({
    slug: car.id,
    locale: "fr",
  }));

  return [...slugEn, ...slugFr];
}

export default async function CarPage({
  params,
}: {
  params: Promise<{
    car: string;
    locale: string;
  }>;
}) {
  const data = await params;
  const locale = data.locale;
  setStaticParamsLocale(locale);
  const car = await getCarById({ locale, id: data.car });

  if (!car) {
    return notFound();
  }

  return (
    <>
      <Car car={car} />
      <Cta />
    </>
  );
}

export const dynamic = "force-dynamic";
