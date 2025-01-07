"use client";

import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import { DataTable } from "@/components/data-table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog";
import { Typography } from "@/components/typography";
import { User } from "@/db";
import { verifyConsultant } from "@/features/consultant/actions/verify-consultant";
import { ColumnDef } from "@tanstack/react-table";
import { useAction } from "next-safe-action/hooks";
import React from "react";
import UserAvatar from "./user-avatar";

const AdminUserTable = ({ users }: { users: User[] }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { executeAsync, status } = useAction(verifyConsultant);

  const handleVerifyConsultant = async (id: string) => {
    await executeAsync({
      userId: id,
    });

    setIsOpen(false);
  };

  const columns: ColumnDef<User>[] = [
    {
      id: "image",
      header: "Image",
      cell: (ctx) => {
        const row = ctx.row.original;

        return (
          <UserAvatar imagePath={row.imagePath || undefined} name={row.name} />
        );
      },
    },
    {
      id: "name",
      header: "Nom",
      cell: (ctx) => {
        const row = ctx.row.original;
        return <Typography variant="small">{row.name}</Typography>;
      },
    },
    {
      id: "email",
      header: "Email",
      cell: (ctx) => {
        const row = ctx.row.original;
        return <Typography variant="small">{row.email}</Typography>;
      },
    },
    {
      id: "role",
      header: "Role",
      cell: (ctx) => {
        const row = ctx.row.original;
        const role = row.role;
        if (role === "ADMINISTRATOR")
          return <Badge variant="yellow">Admin</Badge>;
        if (role === "CUSTOMER") return <Badge variant="blue">Client</Badge>;
        if (role === "CONSULTANT")
          return <Badge variant="green">Consultant</Badge>;
        return <p>{row.role}</p>;
      },
    },
    {
      id: "createdAt",
      header: "Créé le",
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
      id: "actions",
      header: "Actions",
      cell: (ctx) => {
        if (ctx.row.original.role !== "CONSULTANT") {
          return <Button disabled>Vérifier le compte</Button>;
        }

        return (
          <div className="flex gap-2">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button>Vérifier le compte</Button>
              </DialogTrigger>

              <DialogContent>
                <div className="mx-auto w-full max-w-sm">
                  <DialogHeader className="mb-5">
                    <DialogTitle>
                      Vérifier le compte de {ctx.row.original.name}
                    </DialogTitle>
                  </DialogHeader>
                  <form
                    className="py-4 pb-0"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleVerifyConsultant(ctx.row.original.id);
                    }}
                  >
                    <Button
                      type="submit"
                      className="w-full mt-8"
                      disabled={status === "executing"}
                    >
                      Vérifier
                    </Button>

                    <Button
                      className="w-full mt-3"
                      variant="outline"
                      onClick={() => setIsOpen(false)}
                      type="button"
                    >
                      Annuler
                    </Button>
                  </form>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        );
      },
    },
  ];

  return <DataTable data={users} columns={columns} />;
};

export default AdminUserTable;
