import { Container } from "@/components/container";
import React from "react";
import { QuestionAccordion } from "./question-accordion";
import { cn } from "@/lib/utils";
import { FAQ } from "../queries/get-faq";

export const Faq = ({
  questions,
  background,
}: {
  questions: FAQ[];
  background?: "primary" | "background";
}) => {
  return (
    <section
      className={cn(
        "py-24",
        background === "primary" ? "bg-primary" : "bg-background",
      )}
    >
      <Container>
        <div className="accordion-group" data-accordion="default-accordion">
          {questions.map((question) => (
            <QuestionAccordion key={question.id} question={question} />
          ))}
        </div>
      </Container>
    </section>
  );
};
