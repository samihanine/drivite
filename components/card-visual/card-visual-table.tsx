import { CardVisual, OrganizationUser } from "@/lib/schemas";
import { MoreHorizontal } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import DeleteCardVisualButton from "./delete-card-visual-button";
import Image from "next/image";
import { getFileUrlByKey } from "@/lib/s3";
import { CARD_HEIGHT, CARD_WIDTH } from "@/lib/config";
import EditCardVisualButton from "./edit-card-visual-button";

export default async function CardVisualTable({
  cardVisuals,
}: {
  cardVisuals: CardVisual[];
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Titre</TableHead>
          <TableHead>Recto</TableHead>
          <TableHead>Verso</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cardVisuals
          .sort(
            (a, b) =>
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
          )
          .map((cardVisual) => (
            <TableRow key={cardVisual.id}>
              <TableCell className="font-medium">{cardVisual.title}</TableCell>
              <TableCell>
                <Image
                  src={getFileUrlByKey(cardVisual.frontPath)}
                  alt="Recto"
                  width={CARD_WIDTH}
                  height={CARD_HEIGHT}
                  className="w-40 h-auto object-cover"
                />
              </TableCell>

              <TableCell>
                <Image
                  src={getFileUrlByKey(cardVisual.backPath)}
                  alt="Verso"
                  width={CARD_WIDTH}
                  height={CARD_HEIGHT}
                  className="w-40 h-auto object-cover"
                />
              </TableCell>

              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="flex flex-col justify-start"
                    align="end"
                  >
                    <EditCardVisualButton
                      cardVisual={cardVisual}
                      organizationId={cardVisual.organizationId}
                    >
                      <DropdownMenuLabel>
                        <button>Modifier</button>
                      </DropdownMenuLabel>
                    </EditCardVisualButton>
                    <DeleteCardVisualButton cardVisualId={cardVisual.id}>
                      <DropdownMenuLabel>
                        <button>Supprimer</button>
                      </DropdownMenuLabel>
                    </DeleteCardVisualButton>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
