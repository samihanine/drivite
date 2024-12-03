"use client";

import { AppContainer } from "@/components/app-container";
import { Button } from "@/components/button";
import { Question } from "@/db";
import { showError, showLoading, showSuccess } from "@/lib/utils";
import { useAction } from "next-safe-action/hooks";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { toast } from "sonner";
import { upsertQuestions } from "../actions/upsert-questions";
import DraggableQuestionCard from "./draggable-question-card";
import { Typography } from "@/components/typography";
import { ReportForm } from "./report-form";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";

export const ReportEditor: React.FC<{ questions: Question[] }> = ({
  questions: initialQuestions,
}) => {
  const [questions, setQuestions] = useState<Question[]>(
    initialQuestions.sort((a, b) => a.order - b.order),
  );
  const { executeAsync, status } = useAction(upsertQuestions);
  const [showPreview, setShowPreview] = useState(false);

  const onSave = async () => {
    const idToast = showLoading();
    const result = await executeAsync({
      questions: questions.map((q) => ({
        ...q,
        id: q.id.includes("new-question-") ? undefined : q.id,
      })),
    });

    toast.dismiss(idToast);

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

  useEffect(() => {
    setQuestions(initialQuestions.sort((a, b) => a.order - b.order));
  }, [initialQuestions]);

  const isDraft = useMemo(() => {
    return JSON.stringify(initialQuestions) !== JSON.stringify(questions);
  }, [initialQuestions, questions]);

  const addQuestion = (question: Question) => {
    const updatedQuestions: Question[] = questions.map((q) => {
      if (q.order >= question.order) {
        return { ...q, order: q.order + 1 };
      }
      return q;
    });

    setQuestions([...updatedQuestions, question]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full">
        <div className="fixed z-[20] border-b border-border bg-background w-full sm:!w-[calc(100%-255px)]">
          <AppContainer className="flex items-center justify-between !py-5 !max-w-none">
            <Typography variant="h4">Éditeur de formulaire</Typography>

            <div className="flex gap-3 items-center">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="cursor-pointer"
              >
                {showPreview ? (
                  <EyeClosedIcon className="w-6 h-6" />
                ) : (
                  <EyeOpenIcon className="w-6 h-6" />
                )}
              </button>
              <Button
                onClick={onSave}
                disabled={status === "executing" || !isDraft}
              >
                Sauvegarder
              </Button>
            </div>
          </AppContainer>
        </div>
      </div>

      <div className="mt-20" />
      {showPreview && (
        <ReportForm
          questions={questions}
          inspectionId=""
          isPreview
          answers={[]}
        />
      )}

      {!showPreview && (
        <AppContainer className="flex flex-col gap-5 py-10">
          <div className="flex flex-col justify-between">
            <div className="flex flex-col flex-1">
              {questions
                .filter((q) => !q.deletedAt)
                .sort((a, b) => a.order - b.order)
                .map((question, index) => (
                  <React.Fragment key={question.id}>
                    <DraggableQuestionCard
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
                    <div className="w-full flex justify-center gap-3">
                      <Button
                        variant={"outline"}
                        className="border border-border px-2 py-0 text-sm"
                        onClick={() => {
                          addQuestion({
                            ...question,
                            id: "new-question-" + Date.now(),
                            label: "[Nouvelle question]",
                            type: "TEXT",
                            order: question.order + 1,
                          });
                        }}
                      >
                        ?
                      </Button>

                      <Button
                        variant={"outline"}
                        className="border border-border px-2 py-0 text-sm"
                        onClick={() => {
                          addQuestion({
                            ...question,
                            id: "new-question-" + Date.now(),
                            label: "[Nouvelle section]",
                            type: "SECTION",
                            order: question.order + 1,
                          });
                        }}
                      >
                        =
                      </Button>
                    </div>
                  </React.Fragment>
                ))}

              {questions.filter((q) => !q.deletedAt).length === 0 && (
                <div className="w-full flex justify-center gap-3">
                  <Button
                    onClick={() => {
                      addQuestion({
                        id: "new-question-" + Date.now(),
                        label: "[Nouvelle section]",
                        type: "SECTION",
                        order: 0,
                        description: "",
                        required: false,
                        points: 0,
                        pointConditionType: "NONE",
                        displayConditionType: "ALWAYS",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        deletedAt: null,
                      });
                    }}
                  >
                    Ajouter une section
                  </Button>
                </div>
              )}
            </div>
          </div>
        </AppContainer>
      )}
    </DndProvider>
  );
};
