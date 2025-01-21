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
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { getBudgets } from "../utils/get-budgets";

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
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center">
        <div className="absolute pl-2">
          <MagnifyingGlassIcon className="w-4 h-4" />
        </div>

        <Input
          id="search"
          type="text"
          className="pl-8 h-11"
          placeholder="Recherchez par marque, modèle ou mot-clé"
          value={searchParams.get("query") || ""}
          onChange={(e) => updateQuery("query", e.target.value)}
        />
      </div>

      <div className="flex flex-row gap-4">
        <Select
          defaultValue={searchParams.get("brand") || ""}
          value={searchParams.get("brand") || ""}
          onValueChange={(value) => updateQuery("brand", value)}
        >
          <SelectTrigger className="w-fit bg-[#0154B5] text-white">
            <SelectValue placeholder="Marque" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Marque</SelectItem>
            {getBrands().map((brand) => (
              <SelectItem key={brand} value={brand}>
                {brand}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          defaultValue={searchParams.get("model") || ""}
          value={searchParams.get("model") || ""}
          onValueChange={(value) => updateQuery("model", value)}
          disabled
        >
          <SelectTrigger className="w-fit bg-[#0154B5] text-white">
            <SelectValue placeholder="Modèle" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Modèle</SelectItem>
            {getBrands().map((brand) => (
              <SelectItem key={brand} value={brand}>
                {brand}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          defaultValue={searchParams.get("budget") || ""}
          value={searchParams.get("budget") || ""}
          onValueChange={(value) => updateQuery("budget", value)}
        >
          <SelectTrigger className="w-fit bg-[#0154B5] text-white">
            <SelectValue placeholder="Budget" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Budget</SelectItem>
            {getBudgets().map((budget) => (
              <SelectItem key={budget.value} value={budget.value.toString()}>
                {budget.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
