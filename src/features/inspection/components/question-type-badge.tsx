import { Question } from "@/db/schemas";
import { cn } from "@/lib/utils";
import React from "react";

export default function QuestionTypeBage({
  type,
  className,
  ...props
}: React.ComponentProps<"span"> & { type: Question["type"] }) {
  return (
    <span
      className={cn(
        `px-2 py-0.5 border border-border text-xs font-semibold rounded-full`,
        className,
        type === "TEXT" && "bg-blue-50 text-blue-600",
        type === "NUMBER" && "bg-yellow-50 text-yellow-600",
        type === "DATE" && "bg-green-50 text-green-600",
        type === "DATETIME" && "bg-green-50 text-green-600",
        type === "IMAGE" && "bg-pink-50 text-pink-600",
        type === "SELECT" && "bg-indigo-50 text-indigo-600",
        type === "PERCENTAGE" && "bg-red-50 text-red-600",
      )}
      {...props}
    >
      {type === "TEXT" && "Texte"}
      {type === "NUMBER" && "Nombre"}
      {type === "DATE" && "Date"}
      {type === "DATETIME" && "Date et heure"}
      {type === "IMAGE" && "Image"}
      {type === "SELECT" && "Choix multiple"}
      {type === "PERCENTAGE" && "Pourcentage"}
    </span>
  );
}
