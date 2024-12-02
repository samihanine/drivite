import { Button } from "./button";
import { Typography } from "./typography";
import { cn } from "../lib/utils";
import { LogoText } from "./logo-text";
import { Check } from "lucide-react";
import { AppContainer } from "./app-container";

type Step = {
  title: string;
  description?: string;
};

const StepperSidebar = ({
  steps,
  activeStep,
  title,
}: {
  steps: Step[];
  activeStep: number;
  title?: string;
}) => {
  return (
    <AppContainer className="relative w-full h-full">
      <div className="relative h-full w-full">
        <div className="fixed top-0 h-full px-5 pb-10 pt-5 bg-card border-l border-l-border flex flex-col justify-between">
          <div className="flex flex-col">
            {!!title?.length && (
              <Typography className="mb-10 text-primary" variant={"h3"}>
                {title}
              </Typography>
            )}

            {steps.map((step, index) => (
              <div
                className={cn("flex", activeStep < index && "opacity-30")}
                key={index}
              >
                <div key={index} className={cn("gap-4 flex")}>
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        "flex items-center justify-center text-sm rounded-full w-7 h-7",
                        activeStep >= index ? "bg-green-500 text-white" : "",
                        activeStep == index
                          ? "bg-card border-[2px] border-primary text-primary"
                          : "",
                        activeStep < index
                          ? "border-[2px] border-gray-300 text-primary"
                          : "",
                      )}
                    >
                      {activeStep > index ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        (index + 1).toString()
                      )}
                    </div>
                    {index !== steps.length - 1 && (
                      <div
                        className={cn(
                          "h-full flex-1 w-[2px] my-1",
                          activeStep > index && "bg-green-500",
                          activeStep <= index && "bg-gray-300 opacity-30",
                        )}
                      ></div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 flex-1 pb-5 pt-[3px]">
                    <Typography className="text-sm" variant={"h5"}>
                      {step.title}
                    </Typography>
                    <Typography className="text-sm" variant={"small"}>
                      {step.description}
                    </Typography>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <div>
              <LogoText />
            </div>
            {/* 
            <Typography className="text-base mt-3" variant={"lead"}>
              Having trouble?
            </Typography>
            <Typography className="text-sm" variant={"small"}>
              Feel free to contact us and we will always help you though the
              process.
            </Typography>
            <Button className="w-fit mt-3" variant={"outline"}>
              Contact us
            </Button>
            */}
          </div>
        </div>
      </div>
    </AppContainer>
  );
};

export const Stepper = ({
  activeStep,
  steps,
  children,
  title,
}: {
  activeStep: number;
  steps: Step[];
  children: React.ReactNode;
  title?: string;
}) => {
  const currentStep = steps[activeStep];

  if (!currentStep) {
    return null;
  }

  return (
    <div className="flex h-full">
      <AppContainer className="flex-1 pb-10">
        <div className="flex flex-col gap-2 justify-center items-center sm:max-w-2xl w-full mx-auto mb-5 mt-5">
          <Typography className="text-center" variant={"h2"}>
            {currentStep.title}
          </Typography>
          {!!currentStep.description?.length && (
            <Typography
              className="text-muted-foreground text-center"
              variant={"paragraph"}
            >
              {currentStep.description}
            </Typography>
          )}
        </div>

        {children}
      </AppContainer>
      <div className="max-w-md w-full h-full hidden sm:flex">
        <StepperSidebar title={title} steps={steps} activeStep={activeStep} />
      </div>
    </div>
  );
};
