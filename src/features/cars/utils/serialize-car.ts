import { urlFor } from "@/sanity/lib/image";
import { Car } from "../schemas/car";

export type SanityCar = {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _type: string;
  doors: number;
  seats: number;
  price: number;
  location: string;
  brand: string;
  model: string;
  finish: string;
  equipments: string[];
  interiorColor: {
    rgb: {
      r: number;
      g: number;
      b: number;
      a: number;
    };
    hex: string;
  };
  exteriorColor: {
    rgb: {
      r: number;
      g: number;
      b: number;
      a: number;
    };
    hex: string;
  };
  manufacturingYear: number;
  mileage: number;
  fuelType: string;
  critAir: string;
  transmission: string;
  enginePower: string;
  images: { asset: { _ref: string } }[];
  publishedAt: string;
};

export const serializeCar = ({
  car,
  locale,
}: {
  car: SanityCar;
  locale: string;
}): Car => ({
  id: car._id,
  images: car.images.map((image) => urlFor(image.asset).url()),
  price: car.price,
  location: car.location,
  type: car._type,
  brand: car.brand,
  model: car.model,
  finish: car.finish,
  equipments: car.equipments,
  interiorColor: car.interiorColor.hex,
  exteriorColor: car.exteriorColor.hex,
  manufacturingYear: car.manufacturingYear,
  mileage: car.mileage,
  fuelType: car.fuelType,
  critAir: car.critAir,
  transmission: car.transmission,
  enginePower: car.enginePower,
  doors: car.doors,
  seats: car.seats,
  publishedAt: car.publishedAt,
});