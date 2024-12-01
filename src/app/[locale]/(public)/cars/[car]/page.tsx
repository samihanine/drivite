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
  params: {
    car: string;
    locale: string;
  };
}): Promise<Metadata> {
  const car = await getCarById({
    locale: params.locale,
    id: params.car,
  });

  if (!car) {
    return {};
  }

  return {
    title: car.brand + " - TVL Conseils",
    openGraph: {
      title: car.brand + " - TVL Conseils",
      images: car.images[0],
      locale: params.locale,
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
  params: {
    locale: string;
  };
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
  params: {
    car: string;
    locale: string;
  };
}) {
  const locale = params.locale;
  setStaticParamsLocale(locale);
  const car = await getCarById({ locale, id: params.car });

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
