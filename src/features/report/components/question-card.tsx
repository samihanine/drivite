"use client";

import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { InsertCondition, InsertQuestion } from "@/db";
import { cn } from "@/lib/utils";
import { TrashIcon } from "@heroicons/react/24/solid";
import { Edit2Icon, Network } from "lucide-react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ActionButton } from "./action-button";
import { ConditionForm } from "./condition-form";
import { QuestionForm } from "./question-form";
import QuestionTypeBage from "./question-type-badge";

export const QuestionCard = ({
  question,
  handleUpdateQuestion,
  handleAddCondition,
}: {
  question: InsertQuestion;
  handleUpdateQuestion: (question: InsertQuestion) => void;
  handleAddCondition?: (condition: InsertCondition) => void;
}) => {
  const [isEditQuestionFormOpen, setIsEditQuestionFormOpen] = useState(false);
  const [isDeleteQuestionFormOpen, setIsDeleteQuestionFormOpen] =
    useState(false);
  const [isAddConditionFormOpen, setIsAddConditionFormOpen] = useState(false);

  return (
    <Card
      className={cn(
        "flex-1 cursor-move flex justify-between items-center p-4 rounded-sm",
      )}
    >
      <div className="flex gap-2 items-center">
        <QuestionTypeBage type={question.type} />

        {!!question.points && (
          <Badge variant={"success"} className="w-fit">
            + {question.points} pts
          </Badge>
        )}

        <div className="flex ml-2">
          <h2>{question.label}</h2>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <ActionButton
          isOpen={isDeleteQuestionFormOpen}
          setIsOpen={setIsDeleteQuestionFormOpen}
          renderForm={() => (
            <div className="flex flex-col gap-10">
              <Button
                onClick={() => {
                  handleUpdateQuestion({
                    ...question,
                    deletedAt: new Date(),
                  });
                }}
                className="w-full bg-red-500 hover:bg-red-600"
              >
                Supprimer
              </Button>
            </div>
          )}
          modalTitle="Supprimer la question"
        >
          <TrashIcon className="text-red-500 w-5 h-5 hover:brightness-110" />
        </ActionButton>

        <ActionButton
          isOpen={isEditQuestionFormOpen}
          setIsOpen={setIsEditQuestionFormOpen}
          renderForm={() => (
            <QuestionForm
              question={question}
              handleUpdateQuestion={(q) => {
                handleUpdateQuestion(q);
                setIsEditQuestionFormOpen(false);
              }}
            />
          )}
          modalTitle="Modifier la question"
        >
          <Edit2Icon className="text-primary hover:text-primary w-5 h-5 hover:brightness-110" />
        </ActionButton>

        {handleAddCondition && (
          <ActionButton
            isOpen={isAddConditionFormOpen}
            setIsOpen={setIsAddConditionFormOpen}
            renderForm={() => (
              <ConditionForm
                question={question}
                handleUpdateCondition={async (condition) => {
                  handleAddCondition(condition);
                  setIsAddConditionFormOpen(false);
                }}
                condition={{
                  id: uuidv4(),
                  questionId: question.id as string,
                  value: "",
                }}
              />
            )}
            modalTitle="Ajouter une condition"
          >
            <Network className="text-purple-500 hover:text-purple-500 w-5 h-5 hover:brightness-110" />{" "}
          </ActionButton>
        )}
      </div>
    </Card>
  );
};
