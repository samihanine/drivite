import { Container } from "@/components/container";
import { CarFilters } from "@/features/cars/components/car-filters";
import { CarsGrid } from "@/features/cars/components/cars-grid";
import { getCars } from "@/features/cars/queries/get-cars";
import { Cta } from "@/features/landing/components/cta";

export default async function Page({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams: {
    minPrice: string;
    maxPrice: string;
    type: string;
    brand: string;
    doors: string;
    seats: string;
    exteriorColor: string;
    interiorColor: string;
    manufacturingYear: string;
    fuelType: string;
    transmission: string;
    critAir: string;
  };
}) {
  const cars = await getCars({ locale: params.locale });

  const filteredCars = cars.filter((car) => {
    return (
      (!searchParams.minPrice ||
        car.price >= parseInt(searchParams.minPrice)) &&
      (!searchParams.maxPrice ||
        car.price <= parseInt(searchParams.maxPrice)) &&
      (!searchParams.type || car.type === searchParams.type) &&
      (!searchParams.brand || car.brand === searchParams.brand) &&
      (!searchParams.doors || car.doors === parseInt(searchParams.doors)) &&
      (!searchParams.seats || car.seats === parseInt(searchParams.seats)) &&
      (!searchParams.exteriorColor ||
        car.exteriorColor === searchParams.exteriorColor) &&
      (!searchParams.interiorColor ||
        car.interiorColor === searchParams.interiorColor) &&
      (!searchParams.manufacturingYear ||
        car.manufacturingYear === parseInt(searchParams.manufacturingYear)) &&
      (!searchParams.fuelType || car.fuelType === searchParams.fuelType) &&
      (!searchParams.transmission ||
        car.transmission === searchParams.transmission) &&
      (!searchParams.critAir || car.critAir === searchParams.critAir)
    );
  });

  return (
    <>
      <div className="relative flex flex-col sm:flex-row">
        <div className="w-full py-12 px-10 sm:w-80 sm:border-r sm:border-border flex flex-col gap-5">
          <CarFilters />
        </div>
        <div className="flex-1 py-12 px-12 sm:px-16 flex flex-col gap-10">
          <CarsGrid cars={filteredCars} />
        </div>
      </div>
      <Cta />
    </>
  );
}
