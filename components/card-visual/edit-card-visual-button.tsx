"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import CardVisualForm from "./card-visual-form";
import { CardVisual } from "@/lib/schemas";

export default function EditCardVisualButton({
  children,
  organizationId,
  cardVisual,
}: {
  children?: React.ReactNode;
  organizationId: string;
  cardVisual: CardVisual;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {children ?? (
          <Button className="gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Modifier un visuel de carte
            </span>
          </Button>
        )}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Modifier le visuel de carte</SheetTitle>
          <SheetDescription>
            Modifier le visuel de carte sélectionné.
          </SheetDescription>
          <div className="h-2" />

          <CardVisualForm
            organizationId={organizationId}
            cardVisual={cardVisual}
            onSuccess={() => setOpen(false)}
          />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
