"use client";

import { cn } from "@/lib/utils";
import { Card } from "./card";
import { Label } from "./label";

export const RadioCard = ({
  items,
  className,
  onValueChange,
  value,
}: {
  items: {
    label: string;
    value: string;
    disabled?: boolean;
    Icon: React.FC<{ className: string }>;
  }[];
  className?: string;
  value: string;
  onValueChange: (value: string) => void;
}) => {
  return (
    <div
      className={cn(
        "grid flex-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5",
        className,
      )}
      defaultValue={value}
    >
      {items.map((item) => (
        <Card
          className={cn(
            "p-5 flex flex-col justify-center items-center cursor-pointer",
            value === item.value && "border-primary border-[1.5px]",
            item.disabled && "opacity-50",
          )}
          key={item.value}
          onClick={() => {
            if (item.disabled) return;
            onValueChange(item.value);
          }}
        >
          <div className="w-full">
            <input
              type="radio"
              id={item.value}
              name="radio"
              className="w-5 h-5 accent-primary"
              value={item.value}
              checked={value === item.value}
              readOnly
            />
          </div>
          <item.Icon className="w-28 h-28 text-primary" />

          <Label
            className="mt-10 text-center text-sm text-primary"
            htmlFor={item.value}
          >
            {item.label}
          </Label>
        </Card>
      ))}
    </div>
  );
};
