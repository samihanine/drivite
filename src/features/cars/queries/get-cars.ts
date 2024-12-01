import { client } from "@/sanity/lib/client";
import { Car } from "../schemas/car";
import { SanityCar, serializeCar } from "../utils/serialize-car";

export async function getCars({ locale }: { locale: string }): Promise<Car[]> {
  const query = '*[_type == "car"]';
  const cars = await client.fetch<SanityCar[]>(
    query,
    {},
    { next: { revalidate: 0 } },
  );

  return cars.map((car) => serializeCar({ car, locale }));
}
