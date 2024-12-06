import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { Stepper } from "@/components/stepper";
import {
  Answer,
  Condition,
  InsertAnswer,
  Question,
  Section,
} from "@/db/schemas";
import { showError } from "@/lib/utils";
import { useAction } from "next-safe-action/hooks";
import { useEffect, useState } from "react";
import { createAnswers } from "../actions/create-answers";
import { generateReportPdf } from "../actions/generate-report-pdf";
import QuestionInput from "./question-input";
import React from "react";
import ReportPage from "./render-report";

export const ReportForm = ({
  questions,
  inspectionId,
  isPreview,
  answers: initialAnswers,
  sections,
  conditions,
}: {
  questions: Question[];
  sections: Section[];
  conditions: Condition[];
  inspectionId: string;
  isPreview?: boolean;
  answers: Answer[];
}) => {
  const { executeAsync: createAnswersAsync, status: createAnswersStatus } =
    useAction(createAnswers);

  const { executeAsync: generateReportAsync, status: generateReportStatus } =
    useAction(generateReportPdf);

  const [showReport, setShowReport] = useState(false);

  const [currentStep, setCurrentStep] = useState(0);

  const currentSection = sections[currentStep];

  const currentQuestions = questions.filter(
    (q) =>
      q.sectionId === currentSection.id &&
      q.deletedAt === null &&
      !q.conditionId,
  );

  const [answers, setAnswers] = useState<InsertAnswer[]>(initialAnswers);

  useEffect(() => {
    setAnswers(initialAnswers);
  }, [initialAnswers]);

  const updateAnswer = ({
    questionId,
    value,
  }: {
    questionId: string;
    value: string;
  }) => {
    const newAnswers = [...answers].filter((a) => a.questionId !== questionId);

    if (!value) {
      return;
    }

    newAnswers.push({
      questionId,
      inspectionId,
      value,
    });
    setAnswers(newAnswers);
  };

  const handleNextStep = async () => {
    if (currentStep === sections.length - 1) {
      if (isPreview) {
        console.log(answers);
        setShowReport(true);
        return;
      }

      const response = await createAnswersAsync({
        answers,
      });

      if (!response?.data?.length) {
        return showError({
          message:
            "Une erreur s'est produite lors de la sauvegarde des réponses",
        });
      }

      const reponse = await generateReportAsync({
        answers: response.data,
      });

      console.log(reponse?.data);
      return;
    }

    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    if (currentStep === 0) {
      return;
    }

    setCurrentStep(currentStep - 1);
  };

  const isLoading =
    createAnswersStatus === "executing" || generateReportStatus === "executing";

  if (showReport) {
    return (
      <ReportPage
        answers={answers as Answer[]}
        questions={questions}
        sections={sections}
        onCancel={() => setShowReport(false)}
      />
    );
  }

  return (
    <div className="h-[calc(100vh-80px)]">
      <Stepper
        activeStep={currentStep}
        steps={sections.map((s) => ({
          title: s.title,
          description: s.description || undefined,
        }))}
        title={"Formulaire d'inspection"}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleNextStep();
          }}
        >
          <div className="flex flex-col gap-4">
            {currentQuestions.map((q) => {
              const value =
                answers.find((a) => a.questionId === q.id)?.value || "";
              const currentConditions = conditions.filter(
                (c) => c.questionId === q.id && c.value === value,
              );

              return (
                <React.Fragment key={q.id}>
                  <Card className="flex flex-col p-4 gap-2">
                    <QuestionInput
                      question={q}
                      updateAnswer={updateAnswer}
                      value={value}
                    />
                  </Card>

                  {!!currentConditions.length &&
                    currentConditions.map((c) => {
                      const conditionQuestions = questions.filter(
                        (q) => q.conditionId === c.id,
                      );

                      return (
                        <React.Fragment key={c.id}>
                          <Card className="flex flex-col p-4 gap-2">
                            {conditionQuestions.map((cq) => {
                              const value2 =
                                answers.find((a) => a.questionId === cq.id)
                                  ?.value || "";

                              return (
                                <QuestionInput
                                  key={cq.id}
                                  question={cq}
                                  updateAnswer={updateAnswer}
                                  value={value2}
                                />
                              );
                            })}
                          </Card>
                        </React.Fragment>
                      );
                    })}
                </React.Fragment>
              );
            })}
          </div>

          <div className="flex justify-center gap-5 mt-10 mb-5">
            {!!currentStep && (
              <Button
                variant={"ghost"}
                onClick={handlePreviousStep}
                disabled={isLoading}
                type="button"
              >
                Précédent
              </Button>
            )}
            <Button type="submit" disabled={isLoading} className="px-10">
              {currentStep === sections.length - 1
                ? "Générer le rapport"
                : "Suivant"}
            </Button>
          </div>

          <div className="text-background">_</div>
        </form>
      </Stepper>
    </div>
  );
};
