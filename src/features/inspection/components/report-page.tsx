"use client";

import React from "react";
import { Answer, Question, Section } from "@/db/schemas";
import { Image } from "@/components/image";
import LogoImage from "/public/images/logos/logo-text.png";
import { Card } from "@/components/card";
import { Container } from "@/components/container";
import { Button } from "@/components/button";
import S3Image from "@/features/upload/components/s3-image";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { AppContainer } from "@/components/app-container";

interface ReportProps {
  questions: Question[];
  sections: Section[];
  answers: Answer[];
  onCancel?: () => void;
}

const ImageResponse: React.FC<{ question: Question; answer?: Answer }> = ({
  question,
  answer,
}) => {
  if (!answer?.value) return null;
  return (
    <div className="mb-6 mt-2">
      <div className="font-medium mb-3">{question.label}</div>
      <S3Image
        imagePath={answer.value}
        alt={question.label}
        className="h-40 w-auto object-contain"
        height={160}
      />
    </div>
  );
};

const TextResponse: React.FC<{ question: Question; answer?: Answer }> = ({
  question,
  answer,
}) => {
  if (!answer?.value) return null;
  return (
    <div className="flex items-center justify-between border-b border-gray-300 py-2">
      <span className="font-medium">{question.label}</span>
      <div className="px-2 py-1 bg-gray-100 rounded">
        <span className="pdf-in-rectangle">{answer.value}</span>
      </div>
    </div>
  );
};

const SectionComponent: React.FC<{
  section: Section;
  questions: Question[];
  answers: Answer[];
}> = ({ section, questions, answers }) => {
  const sectionQuestions = questions
    .filter((q) => q.sectionId === section.id)
    .sort((a, b) => a.order - b.order);

  if (sectionQuestions.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="bg-[#E7F1FB] py-2 px-4 font-medium mb-4">
        <span className="pdf-in-rectangle">{section.title}</span>
      </div>
      {questions
        .filter((q) => q.sectionId === section.id)
        .sort((a, b) => a.order - b.order)
        .map((q) =>
          q.type === "IMAGE" ? (
            <ImageResponse
              key={q.id}
              question={q}
              answer={answers.find((a) => a.questionId === q.id)}
            />
          ) : (
            <TextResponse
              key={q.id}
              question={q}
              answer={answers.find((a) => a.questionId === q.id)}
            />
          ),
        )}
    </div>
  );
};

const ReportPage: React.FC<ReportProps> = ({
  questions,
  sections,
  answers,
  onCancel,
}) => {
  const sortedSections = [...sections].sort((a, b) => a.order - b.order);

  const handleDownload = async () => {
    const input = document.getElementById("report");
    if (!input) return;

    input.setAttribute("style", "width: 793px");
    const images = document.querySelectorAll(
      "#report img",
    ) as NodeListOf<HTMLImageElement>;

    for (const img of images) {
      const response = await fetch(img.src);
      const blob = await response.blob();
      const reader = new FileReader();
      await new Promise((resolve) => {
        reader.onload = resolve;
        reader.readAsDataURL(blob);
      });
      img.src = reader.result as string;
    }

    const textInRectangle = document.querySelectorAll(".pdf-in-rectangle");
    textInRectangle.forEach((element) => {
      element.setAttribute(
        "style",
        `position: relative; top: -6px; ${element.getAttribute("style")}`,
      );
    });

    const canvas = await html2canvas(input, {
      scale: 1,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "pt", [canvas.width, canvas.height]);

    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height, "", "FAST");

    textInRectangle.forEach((element) => {
      element.removeAttribute("style");
    });
    input.removeAttribute("style");

    pdf.save("rapport.pdf");
  };

  return (
    <>
      <AppContainer>
        <div className="py-10 flex justify-between items-center">
          <h2 className="text-2xl font-medium">Rapport d&apos;inspection</h2>
          <div className="flex gap-4">
            {onCancel && (
              <Button variant="ghost" onClick={onCancel}>
                Retour
              </Button>
            )}
            <Button onClick={handleDownload}>Télécharger le rapport</Button>
          </div>
        </div>
        <Card className="rounded-none w-full max-w-3xl mx-auto">
          <div className="p-8 aspect-[1.4157/2] w-full" id="report">
            <div className="flex justify-center mb-8">
              <Image
                src={LogoImage}
                alt="Drivite Logo"
                className=""
                height={96}
                width={200}
              />
            </div>
            <h1 className="text-2xl font-medium mb-8">
              Drivite - Inspection du véhicule
            </h1>
            {sortedSections.map((section) => (
              <SectionComponent
                key={section.id}
                section={section}
                questions={questions}
                answers={answers}
              />
            ))}
          </div>
        </Card>
      </AppContainer>
    </>
  );
};

export default ReportPage;
