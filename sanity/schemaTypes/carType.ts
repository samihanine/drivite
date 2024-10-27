import { CarIcon } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";

export const carType = defineType({
  name: "car",
  title: "Car",
  type: "document",
  icon: CarIcon as any,
  fields: [
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image" }],
    }),
    defineField({
      name: "price",
      title: "Price (€)",
      type: "number",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Micro-city car", value: "micro-city-car" },
          { title: "City car", value: "city-car" },
          { title: "Compact", value: "compact" },
          { title: "Sedan", value: "sedan" },
          { title: "Station wagon", value: "station-wagon" },
          { title: "Coupe", value: "coupe" },
          { title: "SUV", value: "SUV" },
          { title: "Convertible", value: "convertible" },
          { title: "Minivan", value: "minivan" },
          { title: "Limousine", value: "limousine" },
        ],
      },
    }),
    defineField({
      name: "brand",
      title: "Brand",
      type: "string",
    }),
    defineField({
      name: "model",
      title: "Model",
      type: "string",
    }),
    defineField({
      name: "finish",
      title: "Finish",
      type: "string",
    }),
    defineField({
      name: "equipments",
      title: "Equipments",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "interiorColor",
      title: "Interior Color",
      type: "color",
    }),
    defineField({
      name: "exteriorColor",
      title: "Exterior Color",
      type: "color",
    }),
    defineField({
      name: "manufacturingYear",
      title: "Manufacturing Year",
      type: "number",
    }),
    defineField({
      name: "mileage",
      title: "Mileage",
      type: "number",
    }),
    defineField({
      name: "fuelType",
      title: "Fuel Type",
      type: "string",
      options: {
        list: [
          { title: "Essence", value: "petrol" },
          { title: "Diesel", value: "diesel" },
          { title: "Hybride", value: "hybrid" },
          { title: "Electrique", value: "electric" },
        ],
      },
    }),
    defineField({
      name: "critAir",
      title: "Crit'Air",
      type: "string",
    }),
    defineField({
      name: "transmission",
      title: "Transmission",
      type: "string",
    }),
    defineField({
      name: "enginePower",
      title: "Engine Power",
      type: "string",
    }),
    defineField({
      name: "doors",
      title: "Doors",
      type: "number",
    }),
    defineField({
      name: "seats",
      title: "Seats",
      type: "number",
    }),
  ],
  preview: {
    select: {
      title: "brand",
      subtitle: "model",
      media: "images.0",
    },
  },
});
