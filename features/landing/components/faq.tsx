import { Container } from "@/components/container";
import { Typography } from "@/components/typography";
import React from "react";
import { Question } from "../queries/get-questions";
import { QuestionAccordion } from "./question-accordion";

export const Faq = async ({ questions }: { questions: Question[] }) => {
  return (
    <section className="py-24 bg-primary">
      <Container>
        <div className="mb-12">
          <Typography variant="h2" className="text-center text-white">
            Frequently asked questions
          </Typography>
        </div>
        <div className="accordion-group" data-accordion="default-accordion">
          {questions.map((question) => (
            <QuestionAccordion key={question.id} question={question} />
          ))}
        </div>
      </Container>
    </section>
  );
};
