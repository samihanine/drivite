"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import { Typography } from "@/components/typography";
import { Button } from "@/components/button";
import { getBrands } from "../utils/get-brands";

export const CarFilters: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateQuery = (key: string, value: string | number) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (!value) {
      current.delete(key);
    } else {
      current.set(key, value.toString());
    }

    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`, {
      scroll: false,
    });
  };

  return (
    <div>
      <Button className="mb-5 w-full" onClick={() => router.push(pathname)}>
        Réinitialiser les filtres
      </Button>

      <Typography className="my-3 text-primary" variant="h5">
        Informations générales
      </Typography>

      <div className="space-y-4">
        <div>
          <Label>Prix</Label>

          <div className="space-x-4 flex">
            <div>
              <Input
                id="minPrice"
                type="number"
                placeholder="min"
                value={searchParams.get("minPrice") || ""}
                onChange={(e) => updateQuery("minPrice", e.target.value)}
              />
            </div>

            <div>
              <Input
                id="maxPrice"
                type="number"
                placeholder="max"
                value={searchParams.get("maxPrice") || ""}
                onChange={(e) => updateQuery("maxPrice", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div>
          <Label>Kilométrage</Label>

          <div className="space-x-4 flex">
            <div>
              <Input
                id="minMileage"
                type="number"
                placeholder="min"
                value={searchParams.get("minMileage") || ""}
                onChange={(e) => updateQuery("minMileage", e.target.value)}
              />
            </div>

            <div>
              <Input
                id="maxMileage"
                type="number"
                placeholder="max"
                value={searchParams.get("maxMileage") || ""}
                onChange={(e) => updateQuery("maxMileage", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div>
          <Label>Année</Label>

          <div className="space-x-4 flex">
            <div>
              <Input
                id="minYear"
                type="number"
                placeholder="min"
                value={searchParams.get("minYear") || ""}
                onChange={(e) => updateQuery("minYear", e.target.value)}
              />
            </div>

            <div>
              <Input
                id="maxYear"
                type="number"
                placeholder="max"
                value={searchParams.get("maxYear") || ""}
                onChange={(e) => updateQuery("maxYear", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div>
          <Label>Kilométrage</Label>

          <div className="space-x-4 flex">
            <div>
              <Input
                id="minMileage"
                type="number"
                placeholder="min"
                value={searchParams.get("minMileage") || ""}
                onChange={(e) => updateQuery("minMileage", e.target.value)}
              />
            </div>

            <div>
              <Input
                id="maxMileage"
                type="number"
                placeholder="max"
                value={searchParams.get("maxMileage") || ""}
                onChange={(e) => updateQuery("maxMileage", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="type">Type de véhicule</Label>
          <Select
            defaultValue={searchParams.get("type") as string}
            onValueChange={(value) => updateQuery("type", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Tous les types</SelectItem>
              <SelectItem value="micro-city-car">
                Voiture micro-citadine
              </SelectItem>
              <SelectItem value="city-car">Voiture de ville</SelectItem>
              <SelectItem value="compact">Compacte</SelectItem>
              <SelectItem value="sedan">Berline</SelectItem>
              <SelectItem value="station-wagon">Break</SelectItem>
              <SelectItem value="coupe">Coupé</SelectItem>
              <SelectItem value="SUV">SUV</SelectItem>
              <SelectItem value="convertible">Cabriolet</SelectItem>
              <SelectItem value="minivan">Monospace</SelectItem>
              <SelectItem value="limousine">Limousine</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="brand">Marque</Label>
          <Select
            defaultValue={searchParams.get("brand") as string}
            onValueChange={(value) => updateQuery("brand", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Exterior Color" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Toutes les couleurs</SelectItem>
              {getBrands().map((brand) => (
                <SelectItem key={brand} value={brand}>
                  {brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="model">Modèle</Label>
          <Input
            id="model"
            type="text"
            value={searchParams.get("model") || ""}
            onChange={(e) => updateQuery("model", e.target.value)}
          />
        </div>
      </div>

      <Typography className="mb-3 mt-8 text-primary" variant="h5">
        Caractéristiques techniques
      </Typography>

      <div className="space-y-4">
        <div>
          <Label htmlFor="fuelType">Énergie</Label>
          <Select
            defaultValue={searchParams.get("fuelType") as string}
            onValueChange={(value) => updateQuery("fuelType", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="fuelType" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="petrol">Pétrol</SelectItem>
              <SelectItem value="diesel">Diesel</SelectItem>
              <SelectItem value="electric">Électrique</SelectItem>
              <SelectItem value="hybrid">Hybride</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="transmission">Boite de vitesse</Label>
          <Select
            defaultValue={searchParams.get("transmission") as string}
            onValueChange={(value) => updateQuery("transmission", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="transmission" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Tous les types</SelectItem>
              <SelectItem value="Automatic">Automatic</SelectItem>
              <SelectItem value="Manual">Manual</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Typography className="my-3 mt-8 text-primary" variant="h5">
        Couleurs
      </Typography>

      <div className="space-y-4">
        <div>
          <Label htmlFor="exteriorColor">Couleur extérieure</Label>
          <Select
            defaultValue={searchParams.get("exteriorColor") as string}
            onValueChange={(value) => updateQuery("exteriorColor", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Exterior Color" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Toutes les couleurs</SelectItem>
              <SelectItem value="Black">Black</SelectItem>
              <SelectItem value="White">White</SelectItem>
              <SelectItem value="Grey">Grey</SelectItem>
              <SelectItem value="Brown">Brown</SelectItem>
              <SelectItem value="Red">Red</SelectItem>
              <SelectItem value="Blue">Blue</SelectItem>
              <SelectItem value="Green">Green</SelectItem>
              <SelectItem value="Yellow">Yellow</SelectItem>
              <SelectItem value="Orange">Orange</SelectItem>
              <SelectItem value="Purple">Purple</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="interiorColor">Couleur intérieure</Label>
          <Select
            defaultValue={searchParams.get("interiorColor") as string}
            onValueChange={(value) => updateQuery("interiorColor", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Interior Color" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Toutes les couleurs</SelectItem>
              <SelectItem value="Black">Black</SelectItem>
              <SelectItem value="White">White</SelectItem>
              <SelectItem value="Grey">Grey</SelectItem>
              <SelectItem value="Brown">Brown</SelectItem>
              <SelectItem value="Red">Red</SelectItem>
              <SelectItem value="Blue">Blue</SelectItem>
              <SelectItem value="Green">Green</SelectItem>
              <SelectItem value="Yellow">Yellow</SelectItem>
              <SelectItem value="Orange">Orange</SelectItem>
              <SelectItem value="Purple">Purple</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
