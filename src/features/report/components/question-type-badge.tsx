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
        type === "BOOLEAN" && "bg-purple-50 text-purple-600",
        type === "IMAGE" && "bg-pink-50 text-pink-600",
        type === "STATE" && "bg-indigo-50 text-indigo-600",
        type === "CONFORM" && "bg-indigo-50 text-indigo-600",
        type === "FUNCTIONAL" && "bg-indigo-50 text-indigo-600",
        type === "NOT_EQUIPPED" && "bg-indigo-50 text-indigo-600",
        type === "PERCENTAGE" && "bg-red-50 text-red-600",
      )}
      {...props}
    >
      {type === "BOOLEAN" && "Vrai/Faux"}
      {type === "TEXT" && "Texte"}
      {type === "NUMBER" && "Nombre"}
      {type === "DATE" && "Date"}
      {type === "DATETIME" && "Date et heure"}
      {type === "IMAGE" && "Image"}
      {type === "STATE" && "État"}
      {type === "CONFORM" && "Conforme"}
      {type === "FUNCTIONAL" && "Fonctionnel"}
      {type === "NOT_EQUIPPED" && "Équipé"}
      {type === "PERCENTAGE" && "Pourcentage"}
    </span>
  );
}
