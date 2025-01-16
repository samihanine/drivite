"use client";

import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import { DataTable } from "@/components/data-table";
import { DocumentIcon } from "@/components/icons";
import { Typography } from "@/components/typography";
import { Inspection } from "@/db";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

const InspectionTable = ({ inspections }: { inspections: Inspection[] }) => {
  const columns: ColumnDef<Inspection>[] = [
    {
      id: "id",
      header: "",
      cell: () => {
        return <DocumentIcon className="text-primary w-6 h-6" />;
      },
    },
    {
      id: "createdAt",
      header: "Date",
      cell: (ctx) => {
        const row = ctx.row.original;
        return (
          <Typography variant="small">
            {new Date(row.createdAt).toLocaleDateString()}
          </Typography>
        );
      },
    },
    {
      id: "status",
      header: "Status",
      cell: (ctx) => {
        const row = ctx.row.original;
        return row.status === "IN_PROGRESS" ? (
          <Badge variant={"yellow"}>En cours</Badge>
        ) : (
          <Badge variant={"green"}>Terminé</Badge>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: (ctx) => {
        const row = ctx.row.original;
        return (
          <div className="flex gap-2">
            {row.status === "IN_PROGRESS" && (
              <Link href={`/app/inspections/${ctx.row.original.id}`}>
                <Button>Continuer</Button>
              </Link>
            )}

            {row.status === "COMPLETED" && (
              <Link href={`/app/inspections/${ctx.row.original.id}`}>
                <Button variant={"outline"}>Voir</Button>
              </Link>
            )}
          </div>
        );
      },
    },
  ];

  return <DataTable data={inspections} columns={columns} />;
};

export default InspectionTable;
