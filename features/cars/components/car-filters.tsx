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
        <div className="space-x-4 flex">
          <div>
            <Label htmlFor="minPrice">Prix minimum</Label>
            <Input
              id="minPrice"
              type="number"
              value={searchParams.get("minPrice") || ""}
              onChange={(e) => updateQuery("minPrice", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="maxPrice">Prix maximum</Label>
            <Input
              id="maxPrice"
              type="number"
              value={searchParams.get("maxPrice") || ""}
              onChange={(e) => updateQuery("maxPrice", e.target.value)}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="type">Type</Label>
          <Select
            defaultValue={searchParams.get("type") as string}
            onValueChange={(value) => updateQuery("type", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Tous les types</SelectItem>
              <SelectItem value="micro-city-car">Micro-city car</SelectItem>
              <SelectItem value="city-car">City car</SelectItem>
              <SelectItem value="compact">Compact</SelectItem>
              <SelectItem value="sedan">Sedan</SelectItem>
              <SelectItem value="station-wagon">Station wagon</SelectItem>
              <SelectItem value="coupe">Coupe</SelectItem>
              <SelectItem value="SUV">SUV</SelectItem>
              <SelectItem value="convertible">Convertible</SelectItem>
              <SelectItem value="minivan">Minivan</SelectItem>
              <SelectItem value="limousine">Limousine</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="brand">Marque</Label>
          <Input
            id="brand"
            type="text"
            value={searchParams.get("brand") || ""}
            onChange={(e) => updateQuery("brand", e.target.value)}
          />
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

        <div>
          <Label htmlFor="manufacturingYear">Manufacturing Year</Label>
          <Input
            id="manufacturingYear"
            type="number"
            value={searchParams.get("manufacturingYear") || ""}
            onChange={(e) => updateQuery("manufacturingYear", e.target.value)}
          />
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

        <div>
          <Label htmlFor="type">Portes</Label>
          <Input
            id="doors"
            value={searchParams.get("doors") || ""}
            type="number"
            onChange={(e) => updateQuery("doors", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="type">Sièges</Label>
          <Input
            id="seats"
            value={searchParams.get("seats") || ""}
            type="number"
            onChange={(e) => updateQuery("seats", e.target.value)}
          />
        </div>
      </div>

      <Typography className="mb-3 mt-8 text-primary" variant="h5">
        Caractéristiques techniques
      </Typography>

      <div className="space-y-4">
        <div>
          <Label htmlFor="fuelType">Type de carburant</Label>
          <Select
            defaultValue={searchParams.get("fuelType") as string}
            onValueChange={(value) => updateQuery("fuelType", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="fuelType" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Petrol">Petrol</SelectItem>
              <SelectItem value="Diesel">Diesel</SelectItem>
              <SelectItem value="Electric">Electric</SelectItem>
              <SelectItem value="Hybrid">Hybrid</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="transmission">Transmission</Label>
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
        <div>
          <Label htmlFor="critAir">Crit'Air</Label>
          <Input
            id="critAir"
            type="text"
            value={searchParams.get("critAir") || ""}
            onChange={(e) => updateQuery("critAir", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
