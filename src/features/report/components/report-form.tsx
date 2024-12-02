import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { RadioGroup, RadioGroupItem } from "@/components/radio-group";
import { Slider } from "@/components/slider";
import { Stepper } from "@/components/stepper";
import { Answer, InsertAnswer, Question } from "@/db/schemas";
import { useEffect, useState } from "react";
import { createAnswers } from "../actions/create-answers";
import { useAction } from "next-safe-action/hooks";
import { showError } from "@/lib/utils";
import { generateReportPdf } from "../actions/generate-report-pdf";

export const ReportForm = ({
  questions,
  inspectionId,
  isPreview,
  answers: initialAnswers,
}: {
  questions: Question[];
  inspectionId: string;
  isPreview?: boolean;
  answers: Answer[];
}) => {
  const { executeAsync: createAnswersAsync, status: createAnswersStatus } =
    useAction(createAnswers);

  const { executeAsync: generateReportAsync, status: generateReportStatus } =
    useAction(generateReportPdf);

  const sections = questions
    .filter((q) => q.type === "SECTION")
    .sort((a, b) => a.order - b.order);
  const [currentStep, setCurrentStep] = useState(0);

  const currentSection = sections[currentStep];

  const nextSection = questions
    .filter((q) => currentSection.order < q.order && q.type === "SECTION")
    .sort((a, b) => a.order - b.order)[0];

  const currentQuestions = questions.filter(
    (q) =>
      q.type !== "SECTION" &&
      q.order >= currentSection.order &&
      q.order < (nextSection?.order || Infinity),
  );

  const [answers, setAnswers] = useState<InsertAnswer[]>(initialAnswers);

  useEffect(() => {
    setAnswers(initialAnswers);
  }, [initialAnswers]);

  const updateAnswer = ({
    questionId,
    booleanValue,
    textValue,
    numberValue,
    imageValue,
    dateValue,
  }: {
    questionId: string;
    booleanValue?: boolean;
    textValue?: string;
    numberValue?: number;
    imageValue?: string;
    dateValue?: string;
  }) => {
    const newAnswers = [...answers].filter((a) => a.questionId !== questionId);
    newAnswers.push({
      questionId,
      inspectionId,
      booleanValue,
      textValue,
      numberValue,
      imageValue,
    });
    setAnswers(newAnswers);
  };

  const handleNextStep = async () => {
    if (currentStep === sections.length - 1) {
      if (isPreview) {
        console.log(answers);
        const reponse = await generateReportAsync({
          answers: answers.map((a) => ({
            textValue: a.textValue === undefined ? null : a.textValue,
            numberValue: a.numberValue === undefined ? null : a.numberValue,
            booleanValue: a.booleanValue === undefined ? null : a.booleanValue,
            imageValue: a.imageValue === undefined ? null : a.imageValue,
            dateValue: a.dateValue === undefined ? null : a.dateValue,
            questionId: a.questionId,
          })),
        });

        console.log(reponse?.data);
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
  return (
    <div className="h-[calc(100vh-80px)]">
      <Stepper
        activeStep={currentStep}
        steps={sections.map((s) => ({
          title: s.label,
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
          <div className="flex flex-col">
            {currentQuestions
              .filter((q) => q.type !== "SECTION")
              .map((q) => (
                <Card key={q.id} className="flex flex-col gap-2 mt-5 p-5">
                  <Label>
                    {q.label}

                    {q.required && <span className="text-red-500 ml-1">*</span>}
                  </Label>

                  {q.type === "TEXT" && (
                    <Input
                      type="text"
                      required={q.required || false}
                      value={
                        answers.find((a) => a.questionId === q.id)?.textValue ||
                        undefined
                      }
                      onChange={(e) => {
                        updateAnswer({
                          questionId: q.id,
                          textValue: e.target.value,
                        });
                      }}
                    />
                  )}

                  {q.type === "NUMBER" && (
                    <Input
                      type="number"
                      required={q.required || false}
                      value={
                        answers.find((a) => a.questionId === q.id)
                          ?.numberValue || ""
                      }
                      onChange={(e) => {
                        updateAnswer({
                          questionId: q.id,
                          numberValue: parseInt(e.target.value),
                        });
                      }}
                    />
                  )}

                  {q.type === "PERCENTAGE" && (
                    <div className="flex items-center gap-5">
                      <Slider
                        className="bg-gray-100"
                        value={[
                          answers.find((a) => a.questionId === q.id)
                            ?.numberValue || 0,
                        ]}
                        onValueChange={(value) => {
                          updateAnswer({
                            questionId: q.id,
                            numberValue: value[0],
                          });
                        }}
                        step={10}
                        min={0}
                        max={100}
                      />

                      <div className="flex items-center gap-3">
                        <Input
                          required={q.required || false}
                          type="number"
                          value={
                            answers.find((a) => a.questionId === q.id)
                              ?.numberValue || ""
                          }
                          onChange={(e) => {
                            updateAnswer({
                              questionId: q.id,
                              numberValue: parseInt(e.target.value),
                            });
                          }}
                        />
                        %
                      </div>
                    </div>
                  )}

                  {(q.type === "BOOLEAN" ||
                    q.type === "CONFORM" ||
                    q.type === "FUNCTIONAL" ||
                    q.type === "STATE") && (
                    <RadioGroup
                      className="flex gap-5 flex-row"
                      required={q.required || false}
                      onValueChange={(value) => {
                        updateAnswer({
                          questionId: q.id,
                          booleanValue: value === "TRUE",
                        });
                      }}
                      name={q.id}
                      value={
                        answers.find((a) => a.questionId === q.id) !== undefined
                          ? answers.find((a) => a.questionId === q.id)
                              ?.booleanValue
                            ? "TRUE"
                            : "FALSE"
                          : undefined
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="TRUE" id="TRUE" />
                        <Label className="cursor-pointer" htmlFor="TRUE">
                          {q.type === "BOOLEAN" && "Oui"}
                          {q.type === "CONFORM" && "Conforme"}
                          {q.type === "FUNCTIONAL" && "Fonctionnel"}
                          {q.type === "STATE" && "Bon état"}
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="FALSE" id="FALSE" />
                        <Label className="cursor-pointer" htmlFor="FALSE">
                          {q.type === "BOOLEAN" && "Non"}
                          {q.type === "CONFORM" && "Non conforme"}
                          {q.type === "FUNCTIONAL" && "Non fonctionnel"}
                          {q.type === "STATE" && "Mauvais état"}
                        </Label>
                      </div>
                    </RadioGroup>
                  )}

                  {q.type === "IMAGE" && (
                    <div className="flex flex-col gap-2">
                      {!!answers.find((a) => a.questionId === q.id)?.imageValue
                        ?.length && (
                        <img
                          src={
                            answers.find((a) => a.questionId === q.id)
                              ?.imageValue || ""
                          }
                          className="h-40 w-full object-contain"
                        />
                      )}

                      <Input
                        type="file"
                        required={q.required || false}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const reader = new FileReader();
                          reader.onload = (e) => {
                            const imageValue = e.target?.result as string;
                            updateAnswer({
                              questionId: q.id,
                              imageValue,
                            });
                          };
                          reader.readAsDataURL(file);
                        }}
                      />
                    </div>
                  )}

                  {q.type === "DATE" && (
                    <Input
                      type="date"
                      value={
                        answers.find((a) => a.questionId === q.id)?.dateValue
                          ? new Date(
                              answers.find((a) => a.questionId === q.id)
                                ?.dateValue || "",
                            ).toISOString() || undefined
                          : undefined
                      }
                      required={q.required || false}
                      onChange={(e) => {
                        updateAnswer({
                          questionId: q.id,
                          dateValue: e.target.value,
                        });
                      }}
                    />
                  )}

                  {q.type === "DATETIME" && (
                    <Input
                      type="datetime-local"
                      value={
                        answers.find((a) => a.questionId === q.id)?.dateValue
                          ? new Date(
                              answers.find((a) => a.questionId === q.id)
                                ?.dateValue || "",
                            ).toISOString() || undefined
                          : undefined
                      }
                      required={q.required || false}
                      onChange={(e) => {
                        updateAnswer({
                          questionId: q.id,
                          dateValue: e.target.value,
                        });
                      }}
                    />
                  )}
                </Card>
              ))}
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
            <Button type="submit" disabled={isLoading}>
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
