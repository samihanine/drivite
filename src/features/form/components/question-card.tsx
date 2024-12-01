"use client";

import { Button } from "@/components/button";
import { Card } from "@/components/card";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/drawer";
import { Question } from "@/db";
import { Bars2Icon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Badge } from "@/components/badge";
import { UpdateQuestionButton } from "./update-question-button";
import { cn } from "@/lib/utils";
import { Cog6ToothIcon, TrashIcon } from "@heroicons/react/24/solid";

export const QuestionCard = ({
  question,
  handleUpdateQuestion,
}: {
  question: Question;
  handleUpdateQuestion: (question: Question) => void;
}) => {
  return (
    <Card
      className={cn(
        "flex-1 flex justify-between items-center p-4 rounded-sm",
        question.type === "SECTION" &&
          "border-primary bg-slate-50 border-l-4 border-l-primary",
      )}
    >
      {question.type !== "SECTION" && (
        <div className="flex gap-4 items-center">
          <Bars2Icon className="w-5 h-5 mr-2" />

          <div className="flex gap-2">
            <h2>{question.label}</h2>
            <Badge variant={"success"} className="w-fit">
              + {question.points} points
            </Badge>
          </div>
        </div>
      )}

      {question.type === "SECTION" && (
        <div className="flex gap-4 items-center">
          <Bars2Icon className="w-5 h-5 mr-2" />

          <div className="flex flex-col gap-1">
            <h2>{question.label}</h2>
          </div>
        </div>
      )}

      <div className="flex gap-4 items-center">
        <Drawer>
          <DrawerTrigger asChild>
            <button>
              <TrashIcon className="text-red-500 hover:text-red-500 w-7 h-7" />
            </button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>Supprimer la question</DrawerTitle>
                <DrawerDescription>
                  Êtes-vous sûr de vouloir supprimer cette question ?
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4 pb-0"></div>
              <DrawerFooter>
                <Button
                  onClick={() => {
                    handleUpdateQuestion({
                      ...question,
                      deletedAt: new Date(),
                    });
                  }}
                >
                  Supprimer
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline">Annuler</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>

        <UpdateQuestionButton
          question={question}
          handleUpdateQuestion={handleUpdateQuestion}
        >
          <Cog6ToothIcon className="w-7 h-7 text-primary" />
        </UpdateQuestionButton>
      </div>
    </Card>
  );
};
