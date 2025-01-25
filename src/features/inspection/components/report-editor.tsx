"use client";

import { AppContainer } from "@/components/app-container";
import { Button } from "@/components/button";
import { Typography } from "@/components/typography";
import {
  Answer,
  Condition,
  InsertAnswer,
  InsertCondition,
  InsertQuestion,
  InsertSection,
  Question,
  Section,
} from "@/db/schemas";
import { showError, showLoading, showSuccess } from "@/lib/utils";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { useAction } from "next-safe-action/hooks";
import React, { useEffect, useMemo, useState, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { saveReport } from "../actions/save-report";
import AddQuestionButton from "./add-question-button";
import AddSectionButton from "./add-section-button";
import { ConditionCard } from "./condition-card";
import { QuestionCard } from "./question-card";
import { ReportForm } from "./report-form";
import { SectionCard } from "./section-card";
import { DraggableSection } from "./draggable-section";
import { DraggableQuestion } from "./draggable-question";
import { DraggableCondition } from "./draggable-condition";

export const ReportEditor: React.FC<{
  questions: InsertQuestion[];
  sections: InsertSection[];
  conditions: InsertCondition[];
}> = ({
  questions: initialQuestions,
  sections: initialSections,
  conditions: initialConditions,
}) => {
  const [questions, setQuestions] = useState<InsertQuestion[]>(
    initialQuestions.sort((a, b) => a.order - b.order),
  );
  const [sections, setSections] = useState<InsertSection[]>([
    ...initialSections.sort((a, b) => a.order - b.order),
  ]);
  const [conditions, setConditions] = useState<InsertCondition[]>([
    ...initialConditions,
  ]);
  const [answers, setAnswers] = useState<InsertAnswer[]>([]);

  const [showPreview, setShowPreview] = useState(false);

  const { executeAsync: executeSaveFormData, status: statusSaveFormData } =
    useAction(saveReport);

  const onSave = async () => {
    const idToast = showLoading();
    const result = await executeSaveFormData({
      sections: sections.map((s) => ({ ...s })),
      questions: questions.map((q) => ({ ...q })),
      conditions: conditions.map((c) => ({ ...c })),
    });
    if (!result?.data?.success) {
      showError({ message: "Erreur lors de la sauvegarde des données" });
      return;
    }
    toast.dismiss(idToast);
    showSuccess({ message: "Données sauvegardées avec succès" });
  };

  useEffect(() => {
    setQuestions(initialQuestions.sort((a, b) => a.order - b.order));
  }, [initialQuestions]);

  useEffect(() => {
    setSections(initialSections.sort((a, b) => a.order - b.order));
  }, [initialSections]);

  useEffect(() => {
    setConditions(initialConditions);
  }, [initialConditions]);

  const isDraft = useMemo(() => {
    return (
      JSON.stringify(initialQuestions) !== JSON.stringify(questions) ||
      JSON.stringify(initialSections) !== JSON.stringify(sections) ||
      JSON.stringify(initialConditions) !== JSON.stringify(conditions)
    );
  }, [initialQuestions, questions, initialSections, sections, conditions]);

  const addQuestion = (question: InsertQuestion) => {
    const updatedQuestions: InsertQuestion[] = questions.map((q) => {
      if (
        q.sectionId === question.sectionId &&
        q.conditionId === question.conditionId &&
        q.order >= question.order
      ) {
        return { ...q, order: q.order + 1 };
      }
      return q;
    });
    setQuestions(
      [...updatedQuestions, { ...question }].sort((a, b) => a.order - b.order),
    );
  };

  const updateQuestion = (question: InsertQuestion) => {
    const oldQuestion = questions.find((q) => q.id === question.id);
    if (oldQuestion?.order !== question.order) {
      const updatedQuestions = questions.map((q) => {
        if (
          q.sectionId === question.sectionId &&
          q.conditionId === question.conditionId &&
          q.order >= question.order
        ) {
          return { ...q, order: q.order + 1 };
        }
        return q;
      });
      setQuestions(
        updatedQuestions
          .filter((q) => q.id !== question.id)
          .concat(question)
          .sort((a, b) => a.order - b.order),
      );
      return;
    }
    const updatedQuestions = questions.map((q) =>
      q.id === question.id ? question : q,
    );
    setQuestions(updatedQuestions);
  };

  const addSection = (section: InsertSection) => {
    const updatedSections = sections.map((s) => {
      if (s.order >= section.order) {
        return { ...s, order: s.order + 1 };
      }
      return s;
    });
    setSections([...updatedSections, section]);
  };

  const updateSection = (section: InsertSection) => {
    const oldSection = sections.find((s) => s.id === section.id);
    if (oldSection?.order !== section.order) {
      const updatedSections = sections.map((s) => {
        if (s.order >= section.order) {
          return { ...s, order: s.order + 1 };
        }
        return s;
      });
      setSections(
        updatedSections
          .filter((s) => s.id !== section.id)
          .concat(section)
          .sort((a, b) => a.order - b.order),
      );
      return;
    }
    const updatedSections = sections.map((s) =>
      s.id === section.id ? section : s,
    );
    setSections(updatedSections);
  };

  const addCondition = (condition: InsertCondition) => {
    setConditions([...conditions, condition]);
  };

  const updateCondition = (condition: InsertCondition) => {
    const oldCondition = conditions.find((c) => c.id === condition.id);
    if (oldCondition?.value !== condition.value) {
      const updatedConditions = conditions.map((c) =>
        c.id === condition.id ? condition : c,
      );
      setConditions(updatedConditions);
      return;
    }
    const updatedConditions = conditions.map((c) =>
      c.id === condition.id ? condition : c,
    );
    setConditions(updatedConditions);
  };

  const moveSection = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const reordered = [...sections];
      const [removed] = reordered.splice(dragIndex, 1);
      reordered.splice(hoverIndex, 0, removed);
      setSections(reordered.map((item, index) => ({ ...item, order: index })));
    },
    [sections],
  );

  const moveQuestion = useCallback(
    (
      dragIndex: number,
      hoverIndex: number,
      parentId?: string,
      grandParentId?: string | null,
    ) => {
      const filteredQuestions = questions.filter(
        (q) =>
          q.sectionId === parentId &&
          q.conditionId === (grandParentId || null) &&
          !q.deletedAt,
      );
      const [draggedItem] = filteredQuestions.splice(dragIndex, 1);
      filteredQuestions.splice(hoverIndex, 0, draggedItem);
      const updated = questions.map((q) => {
        if (
          q.sectionId === parentId &&
          q.conditionId === (grandParentId || null)
        ) {
          const newIndex = filteredQuestions.findIndex((x) => x.id === q.id);
          return { ...q, order: newIndex };
        }
        return q;
      });
      setQuestions(updated.sort((a, b) => a.order - b.order));
    },
    [questions],
  );

  const moveCondition = useCallback(
    (dragIndex: number, hoverIndex: number, parentId: string) => {
      const filteredConditions = conditions.filter(
        (c) => c.questionId === parentId,
      );
      const [draggedItem] = filteredConditions.splice(dragIndex, 1);
      filteredConditions.splice(hoverIndex, 0, draggedItem);
      setConditions([...conditions]);
    },
    [conditions],
  );

  const createFakeAnswers = () => {
    const fakeAnswers = questions
      .filter((q) => !q.deletedAt)
      .map((q) => {
        let value = "Lorem ipsum";
        if (q.type === "IMAGE") {
          value = "1733518907083-firm.png";
        } else if (q.options?.length) {
          value = q.options[0];
        }

        return {
          id: uuidv4(),
          questionId: q.id as string,
          value,
          inspectionId: "",
        };
      });
    setAnswers(fakeAnswers);
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
                disabled={statusSaveFormData === "executing" || !isDraft}
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
          answers={answers as Answer[]}
          inspectionId=""
          questions={
            questions
              .filter((q) => !q.deletedAt)
              .sort((a, b) => a.order - b.order) as Question[]
          }
          sections={
            sections
              .filter((s) => !s.deletedAt)
              .sort((a, b) => a.order - b.order) as Section[]
          }
          conditions={conditions.filter((c) => !c.deletedAt) as Condition[]}
          isPreview
        />
      )}
      {!showPreview && (
        <AppContainer className="flex flex-col gap-5 py-10">
          <div className="flex flex-col gap-5">
            {sections
              .sort((a, b) => a.order - b.order)
              .filter((s) => !s.deletedAt)
              .map((section, sectionIndex) => (
                <React.Fragment key={section.id}>
                  <DraggableSection
                    section={section}
                    index={sectionIndex}
                    moveSection={moveSection}
                  >
                    <SectionCard
                      section={section}
                      handleUpdateSection={updateSection}
                    />
                  </DraggableSection>
                  {section.isToggled && (
                    <div className="pl-5 flex flex-col gap-5 border-l border-border">
                      {questions
                        .filter(
                          (q) =>
                            q.sectionId === section.id &&
                            q.conditionId == null &&
                            !q.deletedAt,
                        )
                        .sort((a, b) => a.order - b.order)
                        .map((question, qIndex) => (
                          <React.Fragment key={question.id}>
                            <DraggableQuestion
                              question={question}
                              index={qIndex}
                              parentId={section.id}
                              grandParentId={null}
                              moveQuestion={moveQuestion}
                            >
                              <QuestionCard
                                question={question}
                                handleUpdateQuestion={updateQuestion}
                                handleAddCondition={(condition) => {
                                  addCondition({
                                    questionId: question.id as string,
                                    value: condition.value,
                                    id: uuidv4(),
                                  });
                                }}
                              />
                            </DraggableQuestion>
                            {!!conditions.filter(
                              (c) =>
                                c.questionId === question.id && !c.deletedAt,
                            )?.length && (
                              <div className="pl-5 flex flex-col gap-5 border-l border-border">
                                {conditions
                                  .filter(
                                    (c) =>
                                      c.questionId === question.id &&
                                      !c.deletedAt,
                                  )
                                  .map((condition, cIndex) => (
                                    <DraggableCondition
                                      key={condition.id}
                                      condition={condition}
                                      index={cIndex}
                                      parentId={question.id as string}
                                      moveCondition={moveCondition}
                                    >
                                      <div className="flex flex-col gap-5">
                                        <ConditionCard
                                          condition={condition}
                                          question={question}
                                          handleUpdateCondition={
                                            updateCondition
                                          }
                                        />
                                        {!!questions.length &&
                                          questions
                                            .filter(
                                              (q) =>
                                                q.sectionId === section.id &&
                                                q.conditionId ===
                                                  condition.id &&
                                                !q.deletedAt,
                                            )
                                            .sort((a, b) => a.order - b.order)
                                            .map((subQuestion, sqIndex) => (
                                              <DraggableQuestion
                                                key={subQuestion.id}
                                                question={subQuestion}
                                                index={sqIndex}
                                                parentId={section.id}
                                                grandParentId={condition.id}
                                                moveQuestion={moveQuestion}
                                              >
                                                <QuestionCard
                                                  question={subQuestion}
                                                  handleUpdateQuestion={
                                                    updateQuestion
                                                  }
                                                />
                                              </DraggableQuestion>
                                            ))}
                                        <AddQuestionButton
                                          addQuestion={addQuestion}
                                          sectionId={section.id as string}
                                          conditionId={condition.id as string}
                                          order={
                                            questions.filter(
                                              (q) =>
                                                q.sectionId === section.id &&
                                                q.conditionId === condition.id,
                                            ).length
                                          }
                                        />
                                      </div>
                                    </DraggableCondition>
                                  ))}
                              </div>
                            )}
                          </React.Fragment>
                        ))}
                      <AddQuestionButton
                        addQuestion={addQuestion}
                        sectionId={section.id as string}
                        order={
                          questions.filter(
                            (q) =>
                              q.sectionId === section.id &&
                              q.conditionId == null,
                          ).length
                        }
                      />
                    </div>
                  )}
                </React.Fragment>
              ))}
            <AddSectionButton addSection={addSection} order={sections.length} />
          </div>
        </AppContainer>
      )}
    </DndProvider>
  );
};
