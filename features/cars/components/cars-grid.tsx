import Link from "next/link";
import { Image } from "@/components/image";
import { Car } from "../schemas/car";
import { Typography } from "@/components/typography";
import { Badge } from "@/components/badge";

export async function CarsGrid({ cars }: { cars: Car[] }) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {cars
        .sort(
          (a, b) =>
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime(),
        )
        .map((car) => {
          return (
            <Link
              href={"/cars/" + car.id}
              className="flex flex-col gap-3"
              key={car.id}
            >
              {car.images[0] && (
                <Image
                  src={car.images[0]}
                  alt={car.brand}
                  width={1200}
                  height={600}
                  className="w-full h-64 object-cover rounded-xl"
                />
              )}
              <div className="flex justify-between gap-3 flex-wrap">
                <Typography variant="h4" className="mt-1">
                  {car.brand + " " + car.model}
                </Typography>

                <Typography variant="h4" className="mt-1 text-primary">
                  {car.price + " €"}
                </Typography>
              </div>

              <div className="flex gap-3 flex-wrap">
                {car.type?.length && <Badge>{car.type}</Badge>}
                {car.manufacturingYear && (
                  <Badge>{car.manufacturingYear}</Badge>
                )}
                {car.mileage && <Badge>{car.mileage + " km"}</Badge>}
                {car.fuelType && <Badge>{car.fuelType}</Badge>}
                {car.transmission && <Badge>{car.transmission}</Badge>}
                {car.critAir && <Badge>{car.critAir}</Badge>}
                {car.exteriorColor && <Badge>{car.exteriorColor}</Badge>}
                {car.interiorColor && <Badge>{car.interiorColor}</Badge>}
              </div>
            </Link>
          );
        })}
    </div>
  );
}
