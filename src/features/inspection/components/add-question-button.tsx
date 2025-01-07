import { useState } from "react";
import { ActionButton } from "./action-button";
import { QuestionForm } from "./question-form";
import { InsertQuestion } from "@/db/schemas";
import { v4 as uuidv4 } from "uuid";
import { cn } from "@/lib/utils";

export default function AddQuestionButton({
  addQuestion,
  order,
  sectionId,
  conditionId,
}: {
  addQuestion: (question: InsertQuestion) => void;
  order: number;
  sectionId: string;
  conditionId?: string;
}) {
  const [isAddQuestionModalOpen, setIsAddQuestionModalOpen] = useState(false);
  return (
    <ActionButton
      className={cn(
        "w-full text-left text-sm font-medium",
        conditionId ? "text-purple-500" : "text-muted-foreground",
      )}
      renderForm={() => (
        <QuestionForm
          handleUpdateQuestion={(s) => {
            addQuestion(s);
            setIsAddQuestionModalOpen(false);
          }}
          question={{
            id: uuidv4(),
            type: "TEXT",
            order,
            label: "Nouvelle question",
            sectionId,
            conditionId,
            options: [],
          }}
        />
      )}
      modalTitle="Ajouter une question"
      isOpen={isAddQuestionModalOpen}
      setIsOpen={setIsAddQuestionModalOpen}
    >
      + Ajouter une question
    </ActionButton>
  );
}
