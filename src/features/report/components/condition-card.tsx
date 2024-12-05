"use client";

import { Button } from "@/components/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/card";
import { InsertCondition, InsertQuestion } from "@/db/schemas";
import { cn } from "@/lib/utils";
import { TrashIcon } from "@heroicons/react/24/solid";
import { Edit2Icon, Network } from "lucide-react";
import { useState } from "react";
import { ActionButton } from "./action-button";
import { ConditionForm } from "./condition-form";

export const ConditionCard = ({
  condition,
  handleUpdateCondition,
  question,
}: {
  condition: InsertCondition;
  handleUpdateCondition: (condition: InsertCondition) => void;
  question: InsertQuestion;
}) => {
  const [isEditConditionFormOpen, setIsEditConditionFormOpen] = useState(false);
  const [isDeleteConditionFormOpen, setIsDeleteConditionFormOpen] =
    useState(false);

  return (
    <Card
      className={cn(
        "flex-1 flex justify-between cursor-move items-center p-4 rounded-sm border-purple-500 border border-l-4",
      )}
    >
      <div className="flex gap-4 items-center">
        <Network className="w-5 h-5 mr-2 text-purple-500" />

        <div className="flex flex-col gap-1">
          <h2>Si la valeur est égale à &quot;{condition.value}&quot;</h2>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <ActionButton
          isOpen={isDeleteConditionFormOpen}
          setIsOpen={setIsDeleteConditionFormOpen}
          renderForm={() => (
            <div className="flex flex-col gap-10">
              <Card className="bg-yellow-50 p-4 border-yellow-500">
                <CardHeader>
                  <CardTitle className="mb-3">Attention !</CardTitle>
                  <CardDescription className="text-foreground">
                    La suppression de cette condition entrainera la suppression
                    de toutes les questions associées.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Button
                onClick={() => {
                  handleUpdateCondition({
                    ...condition,
                    deletedAt: new Date(),
                  });
                  setIsDeleteConditionFormOpen(false);
                }}
                className="w-full bg-red-500 hover:bg-red-600"
              >
                Supprimer
              </Button>
            </div>
          )}
          modalTitle="Supprimer la condition"
        >
          <TrashIcon className="text-red-500 w-5 h-5 hover:brightness-110" />
        </ActionButton>

        <ActionButton
          isOpen={isEditConditionFormOpen}
          setIsOpen={setIsEditConditionFormOpen}
          renderForm={() => (
            <ConditionForm
              question={question}
              condition={condition}
              handleUpdateCondition={(q) => {
                handleUpdateCondition(q);
                setIsEditConditionFormOpen(false);
              }}
            />
          )}
          modalTitle="Modifier la condition"
        >
          <Edit2Icon className="text-primary hover:text-primary w-5 h-5 hover:brightness-110" />
        </ActionButton>
      </div>
    </Card>
  );
};
