import { Container } from "@/components/container";
import { CarFilters } from "@/features/cars/components/car-filters";
import { CarsGrid } from "@/features/cars/components/cars-grid";
import { getCars } from "@/features/cars/queries/get-cars";
import { getBudgets } from "@/features/cars/utils/get-budgets";
import { Cta } from "@/features/landing/components/cta";

export default async function Page(props: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
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
    budget: string;
    query: string;
  }>;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const cars = await getCars({ locale: params.locale });

  const filteredCars = cars.filter((car) => {
    const currentBudgetIndex = getBudgets().findIndex(
      (budget) => budget.value === parseInt(searchParams.budget),
    );

    const minPrice = getBudgets()[currentBudgetIndex - 1]?.value ?? 0;
    const maxPrice = getBudgets()[currentBudgetIndex]?.value ?? Infinity;

    return (
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
      (!searchParams.critAir || car.critAir === searchParams.critAir) &&
      car.price >= minPrice &&
      car.price <= maxPrice &&
      (!searchParams.query ||
        car.brand.toLowerCase().includes(searchParams.query.toLowerCase()) ||
        car.model.toLowerCase().includes(searchParams.query.toLowerCase()))
    );
  });

  return (
    <div className="bg-[#f7f7fa]">
      <Container className="relative flex flex-col py-10">
        <div className="w-full flex flex-col gap-5 mb-10">
          <CarFilters />
        </div>
        <CarsGrid cars={filteredCars} />
      </Container>
      <Cta />
    </div>
  );
}
