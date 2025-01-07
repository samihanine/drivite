import { CarFilters } from "@/features/cars/components/car-filters";
import { CarsGrid } from "@/features/cars/components/cars-grid";
import { getCars } from "@/features/cars/queries/get-cars";
import { Cta } from "@/features/landing/components/cta";

export default async function Page(props: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    minPrice: string;
    maxPrice: string;
    type: string;
    brand: string;
    exteriorColor: string;
    interiorColor: string;
    fuelType: string;
    transmission: string;
    critAir: string;
    minMileage: string;
    maxMileage: string;
    minYear: string;
    maxYear: string;
  }>;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const cars = await getCars({ locale: params.locale });

  const filteredCars = cars.filter((car) => {
    return (
      (!searchParams.minPrice ||
        car.price >= parseInt(searchParams.minPrice)) &&
      (!searchParams.maxPrice ||
        car.price <= parseInt(searchParams.maxPrice)) &&
      (!searchParams.minMileage ||
        car.mileage >= parseInt(searchParams.minMileage)) &&
      (!searchParams.maxMileage ||
        car.mileage <= parseInt(searchParams.maxMileage)) &&
      (!searchParams.minYear ||
        car.manufacturingYear >= parseInt(searchParams.minYear)) &&
      (!searchParams.maxYear ||
        car.manufacturingYear <= parseInt(searchParams.maxYear)) &&
      (!searchParams.type || car.type === searchParams.type) &&
      (!searchParams.brand || car.brand === searchParams.brand) &&
      (!searchParams.exteriorColor ||
        car.exteriorColor === searchParams.exteriorColor) &&
      (!searchParams.interiorColor ||
        car.interiorColor === searchParams.interiorColor) &&
      (!searchParams.fuelType || car.fuelType === searchParams.fuelType) &&
      (!searchParams.transmission ||
        car.transmission === searchParams.transmission) &&
      (!searchParams.critAir || car.critAir === searchParams.critAir)
    );
  });

  return (
    <>
      <div className="relative flex flex-col sm:flex-row">
        <div className="w-full py-12 px-8 sm:w-80 sm:border-r sm:border-border flex flex-col gap-5">
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
