"use client";

import { AppContainer } from "@/components/app-container";
import { Button } from "@/components/button";
import { InsertQuestion, Question } from "@/db";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  DndProvider,
  useDrag,
  useDrop,
  useDragLayer,
  XYCoord,
} from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { QuestionCard } from "./question-card";
import { useAction } from "next-safe-action/hooks";
import { updateQuestions } from "../actions/update-questions";
import { showError, showSuccess } from "@/lib/utils";
import DraggableQuestionCard from "./draggable-question-card";

export const FormEditor: React.FC<{ questions: Question[] }> = ({
  questions: initialQuestions,
}) => {
  const [questions, setQuestions] = useState<Question[]>(
    initialQuestions.sort((a, b) => a.order - b.order),
  );
  const { executeAsync, status } = useAction(updateQuestions);

  const onSave = async () => {
    const result = await executeAsync({
      questions,
    });

    if (result?.serverError || result?.validationErrors) {
      showError({
        message:
          "Une erreur s'est produite lors de la sauvegarde des questions",
      });
    } else {
      showSuccess({ message: "Questions sauvegardées avec succès" });
    }
  };

  const moveQuestion = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragQuestion = questions[dragIndex];
      const updatedQuestions = [...questions];
      updatedQuestions.splice(dragIndex, 1);
      updatedQuestions.splice(hoverIndex, 0, dragQuestion);
      const reorderedQuestions = updatedQuestions.map((q, idx) => ({
        ...q,
        order: idx,
      }));
      setQuestions(reorderedQuestions);
    },
    [questions],
  );

  const addQuestion = useCallback(() => {
    const newQuestion = {
      order: questions.length,
      type: "TEXT",
      label: "Nouvelle question",
    } as InsertQuestion;
    setQuestions((q) => [...q, newQuestion as Question]);
  }, [questions]);

  useEffect(() => {
    setQuestions(initialQuestions.sort((a, b) => a.order - b.order));
  }, [initialQuestions]);

  const isDraft = useMemo(() => {
    return JSON.stringify(initialQuestions) !== JSON.stringify(questions);
  }, [initialQuestions, questions]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full">
        <div className="fixed border-b border-border bg-background w-[calc(100%-255px)]">
          <AppContainer className="flex items-center justify-between !py-5">
            <div>
              <div>Question</div>
            </div>

            <Button
              onClick={onSave}
              disabled={status === "executing" || !isDraft}
            >
              Sauvegarder
            </Button>
          </AppContainer>
        </div>
      </div>

      <AppContainer className="flex flex-col gap-5 py-10 mt-20">
        <div className="flex flex-col justify-between">
          <div className="flex gap-3 flex-col flex-1">
            {questions
              .filter((q) => !q.deletedAt)
              .map((question, index) => (
                <DraggableQuestionCard
                  key={question.id}
                  question={question}
                  index={index}
                  moveQuestion={moveQuestion}
                  handleUpdateQuestion={(question) => {
                    setQuestions(
                      questions.map((q) =>
                        q.id === question.id ? question : q,
                      ),
                    );
                  }}
                />
              ))}
          </div>
        </div>
      </AppContainer>
    </DndProvider>
  );
};
