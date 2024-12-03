"use client";

import { useState } from "react";
import { FAQ } from "../queries/get-faq";
import { Typography } from "@/components/typography";

export const QuestionAccordion = ({ question }: { question: FAQ }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`accordion border border-solid border-border p-4 rounded-xl mb-8 lg:p-4 bg-background`}
    >
      <button
        className={`accordion-toggle flex group items-center questions-center justify-between text-left text-lg font-normal leading-8 w-full ${
          isOpen ? "text-primary" : "hover:text-primary"
        }`}
        aria-controls={`basic-collapse-${question.id}`}
        onClick={toggleAccordion}
      >
        <Typography variant="h4">{question.question}</Typography>
        <span className="text-3xl">
          {isOpen ? <span>-</span> : <span>+</span>}
        </span>
      </button>
      <div
        id={`basic-collapse-${question.id}`}
        className={`accordion-content w-full overflow-hidden pr-4 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <Typography variant="paragraph" className="mt-4">
          {question.answer}
        </Typography>
      </div>
    </div>
  );
};
