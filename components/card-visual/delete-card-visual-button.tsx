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
import { deleteCardVisual } from "@/server/card-visual";
import { useAction } from "next-safe-action/hooks";

export default function DeleteCardVisualButton({
  children,
  cardVisualId,
}: {
  children?: React.ReactNode;
  cardVisualId: string;
}) {
  const [open, setOpen] = useState(false);

  const { executeAsync: deleteAsync, status: deleteStatus } =
    useAction(deleteCardVisual);

  const handleDelete = async () => {
    await deleteAsync({ id: cardVisualId });
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {children ?? (
          <Button className="gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Supprimer un visuel de carte
            </span>
          </Button>
        )}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Supprimer un visuel de carte</SheetTitle>
          <SheetDescription>
            Attention ! Cette action est irréversible.
          </SheetDescription>
          <div className="h-2" />

          <Button
            variant="destructive"
            className="w-full"
            onClick={handleDelete}
          >
            Supprimer
          </Button>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => setOpen(false)}
          >
            Annuler
          </Button>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
