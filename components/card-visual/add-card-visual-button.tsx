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

export default function AddCardVisualButton({
  children,
  organizationId,
}: {
  children?: React.ReactNode;
  organizationId: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {children ?? (
          <Button className="gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Ajouter un visuel de carte
            </span>
          </Button>
        )}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Ajouter un visuel de carte</SheetTitle>
          <SheetDescription>
            Ajouter un visuel de carte à votre organisation.
          </SheetDescription>
          <div className="h-2" />

          <CardVisualForm
            organizationId={organizationId}
            onSuccess={() => setOpen(false)}
          />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
