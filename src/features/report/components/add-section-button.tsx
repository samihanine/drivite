import { useState } from "react";
import { ActionButton } from "./action-button";
import { SectionForm } from "./section-form";
import { InsertSection } from "@/db/schemas";
import { v4 as uuidv4 } from "uuid";

export default function AddSectionButton({
  addSection,
  order,
}: {
  addSection: (section: InsertSection) => void;
  order: number;
}) {
  const [isAddSectionModalOpen, setIsAddSectionModalOpen] = useState(false);
  return (
    <ActionButton
      className="w-full text-left text-sm font-medium text-primary"
      renderForm={() => (
        <SectionForm
          handleUpdateSection={(s) => {
            addSection(s);
            setIsAddSectionModalOpen(false);
          }}
          section={{
            id: uuidv4(),
            title: "Nouvelle section",
            order,
            isToggled: true,
          }}
        />
      )}
      modalTitle="Ajouter une section"
      isOpen={isAddSectionModalOpen}
      setIsOpen={setIsAddSectionModalOpen}
    >
      + Ajouter une section
    </ActionButton>
  );
}
