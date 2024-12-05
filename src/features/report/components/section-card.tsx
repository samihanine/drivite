"use client";

import { Button } from "@/components/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/card";
import { InsertSection } from "@/db";
import { cn } from "@/lib/utils";
import { Bars2Icon, TrashIcon } from "@heroicons/react/24/solid";
import { ChevronDown, ChevronUp, Edit2Icon } from "lucide-react";
import { useState } from "react";
import { ActionButton } from "./action-button";
import { SectionForm } from "./section-form";

export const SectionCard = ({
  section,
  handleUpdateSection,
}: {
  section: InsertSection;
  handleUpdateSection: (section: InsertSection) => void;
}) => {
  const [isEditSectionFormOpen, setIsEditSectionFormOpen] = useState(false);
  const [isDeleteSectionFormOpen, setIsDeleteSectionFormOpen] = useState(false);

  return (
    <Card
      className={cn(
        "flex-1 flex justify-between cursor-move items-center p-4 rounded-sm border-primary bg-slate-50 border-l-4 border-l-primary",
      )}
    >
      <div className="flex gap-4 items-center">
        <Bars2Icon className="w-5 h-5 mr-2" />

        <div className="flex flex-col gap-1">
          <h2>{section.title}</h2>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <ActionButton
          isOpen={isDeleteSectionFormOpen}
          setIsOpen={setIsDeleteSectionFormOpen}
          renderForm={() => (
            <div className="flex flex-col gap-10">
              <Card className="bg-yellow-50 p-4 border-yellow-500">
                <CardHeader>
                  <CardTitle className="mb-3">Attention !</CardTitle>
                  <CardDescription className="text-foreground">
                    La suppression de cette section entrainera la suppression de
                    toutes les questions et conditions associées.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Button
                onClick={() => {
                  handleUpdateSection({
                    ...section,
                    deletedAt: new Date(),
                  });
                  setIsDeleteSectionFormOpen(false);
                }}
                className="w-full bg-red-500 hover:bg-red-600"
              >
                Supprimer
              </Button>
            </div>
          )}
          modalTitle="Supprimer la section"
        >
          <TrashIcon className="text-red-500 w-5 h-5 hover:brightness-110" />
        </ActionButton>

        <ActionButton
          renderForm={() => (
            <SectionForm
              section={section}
              handleUpdateSection={(q) => {
                handleUpdateSection(q);
                setIsEditSectionFormOpen(false);
              }}
            />
          )}
          isOpen={isEditSectionFormOpen}
          setIsOpen={setIsEditSectionFormOpen}
          modalTitle="Modifier la section"
        >
          <Edit2Icon className="text-primary hover:text-primary w-5 h-5 hover:brightness-110" />
        </ActionButton>

        {!section.isToggled && (
          <button
            onClick={() =>
              handleUpdateSection({ ...section, isToggled: !section.isToggled })
            }
          >
            <ChevronDown className="text-primary hover:text-primary w-5 h-5 hover:brightness-110" />
          </button>
        )}
        {section.isToggled && (
          <button
            onClick={() =>
              handleUpdateSection({ ...section, isToggled: !section.isToggled })
            }
          >
            <ChevronUp className="text-primary hover:text-primary w-5 h-5 hover:brightness-110" />
          </button>
        )}
      </div>
    </Card>
  );
};
