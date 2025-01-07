import { Check } from "lucide-react";
import { cn } from "../lib/utils";
import { AppContainer } from "./app-container";
import { LogoText } from "./logo-text";
import { Typography } from "./typography";

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
    <AppContainer className="relative hidden sm:flex w-full h-full bg-card border-l border-l-border !max-w-md px-5 pb-10 pt-5 flex-col">
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

      <div className="flex flex-col gap-2 mt-5">
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
    </AppContainer>
  );
};

export const Stepper = ({
  activeStep,
  steps,
  children,
  title,
  hideSidebar,
}: {
  activeStep: number;
  steps: Step[];
  children: React.ReactNode;
  title?: string;
  hideSidebar?: boolean;
}) => {
  const currentStep = steps[activeStep];

  if (!currentStep) {
    return null;
  }

  return (
    <div className="flex h-full">
      <AppContainer className="flex-1 py-10">
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
      {!hideSidebar && (
        <StepperSidebar title={title} steps={steps} activeStep={activeStep} />
      )}
    </div>
  );
};
