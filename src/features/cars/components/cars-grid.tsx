import Link from "next/link";
import { Car } from "../schemas/car";
import CarCard from "./car-card";

export async function CarsGrid({ cars }: { cars: Car[] }) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {cars
        .sort(
          (a, b) =>
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime(),
        )
        .map((car) => {
          return (
            <Link
              href={"/cars/" /* + car.id */}
              className="flex flex-col gap-3"
              key={car.id}
            >
              <CarCard
                imageUrl={car.images[0]}
                title={car.brand + " " + car.model}
                price={car.price}
                location={car.location}
                subtitle={car.manufacturingYear + " - " + car.mileage + " km"}
                isSold={car.isSold || false}
              />
            </Link>
          );
        })}
    </div>
  );
}
