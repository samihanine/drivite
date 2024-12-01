import { client } from "@/sanity/lib/client";
import { Car } from "../schemas/car";
import { SanityCar, serializeCar } from "../utils/serialize-car";

export async function getCarById({
  locale,
  id,
}: {
  locale: string;
  id: string;
}): Promise<Car | null> {
  const query = `*[_type == "car" && _id == $id][0]`;
  const car = await client.fetch<SanityCar>(
    query,
    { id },
    { next: { revalidate: 0 } },
  );
  return car ? serializeCar({ car, locale }) : null;
}
