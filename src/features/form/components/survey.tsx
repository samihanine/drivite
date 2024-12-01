import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { Stepper } from "@/components/stepper";
import { Question } from "@/db/schemas";
import { useState } from "react";

export const Survey = ({ questions }: { questions: Question[] }) => {
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

  return (
    <div className="h-[calc(100vh-80px)]">
      <Stepper
        activeStep={currentStep}
        steps={sections.map((s) => ({ title: s.label, description: s.label }))}
      >
        <div className="flex flex-col">
          {currentQuestions
            .filter((q) => q.type !== "SECTION")
            .map((q) => (
              <div key={q.id} className="flex flex-col gap-2 mt-5">
                <Label>{q.label}</Label>
                <Input />
              </div>
            ))}
        </div>

        <div className="flex justify-center gap-5 mt-10">
          <Button
            variant={"ghost"}
            onClick={() => setCurrentStep(currentStep - 1)}
            disabled={currentStep === 0}
          >
            Précédent
          </Button>
          <Button onClick={() => setCurrentStep(currentStep + 1)}>
            Suivant
          </Button>
        </div>
      </Stepper>
    </div>
  );
};
