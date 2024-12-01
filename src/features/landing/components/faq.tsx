import { Container } from "@/components/container";
import React from "react";
import { Question } from "../queries/get-faq";
import { QuestionAccordion } from "./question-accordion";
import { cn } from "@/lib/utils";

export const Faq = async ({
  questions,
  background,
}: {
  questions: Question[];
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
