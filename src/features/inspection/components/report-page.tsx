"use client";

import React, { useEffect, useState } from "react";
import { Answer, Question, Section } from "@/db/schemas";
import { Image } from "@/components/image";
import LogoImage from "/public/images/logos/logo-text.png";
import { Card } from "@/components/card";
import { Button } from "@/components/button";
import S3Image from "@/features/upload/components/s3-image";
import { AppContainer } from "@/components/app-container";
import { useAction } from "next-safe-action/hooks";
import { generateReportPdf } from "../actions/generate-report-pdf";
import { toast } from "sonner";

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
      {sectionQuestions.map((q) =>
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
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const { executeAsync: generateReportPdfAction } =
    useAction(generateReportPdf);

  useEffect(() => {
    const generatePdf = async () => {
      try {
        setIsGenerating(true);
        const result = await generateReportPdfAction({
          answers,
        });

        const base64 = result?.data;

        if (typeof base64 !== "string") {
          toast.error("Error generating PDF preview");
          return;
        }

        setPdfUrl(base64);
      } catch (error) {
        toast.error("Error generating PDF preview");
        console.error(error);
      } finally {
        setIsGenerating(false);
      }
    };

    generatePdf();

    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [answers]);

  const handleDownload = async () => {
    if (!pdfUrl) return;

    try {
      const base64Data = pdfUrl.includes("base64,")
        ? pdfUrl.split("base64,")[1]
        : pdfUrl;

      const byteCharacters = atob(base64Data);
      const byteArrays = [];

      for (let i = 0; i < byteCharacters.length; i++) {
        byteArrays.push(byteCharacters.charCodeAt(i));
      }

      const blob = new Blob([new Uint8Array(byteArrays)], {
        type: "application/pdf",
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "rapport.pdf";
      a.click();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erreur lors du téléchargement du PDF:", error);
      toast.error("Erreur lors du téléchargement du rapport");
    }
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
            <Button disabled={!pdfUrl} onClick={handleDownload}>
              Télécharger le rapport
            </Button>
          </div>
        </div>

        {isGenerating ? (
          <div className="w-full flex justify-center py-10">
            <p>Génération du rapport...</p>
          </div>
        ) : pdfUrl ? (
          <div className="w-full h-[800px] mb-10">
            <iframe
              src={pdfUrl}
              className="w-full h-full border-0"
              title="PDF Report Preview"
            />
          </div>
        ) : (
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
                Drivite - Rapport d&apos;inspection
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
        )}
      </AppContainer>
    </>
  );
};

export default ReportPage;
