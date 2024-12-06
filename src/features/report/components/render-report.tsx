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

interface ReportProps {
  questions: Question[];
  sections: Section[];
  answers: Answer[];
  onCancel: () => void;
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
      <div className="px-2 py-1 bg-gray-100 rounded">{answer.value}</div>
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
        {section.title}
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

  const handleDownload = async () => {
    const input = document.getElementById("report");
    if (!input) return;

    // Précharger les images pour éviter les problèmes de CORS
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

    const pdf = new jsPDF("p", "pt", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    let yPosition = 0; // Position Y sur la page actuelle
    const margin = 20; // Marge pour le contenu
    const elements = input.querySelectorAll("*"); // Sélectionnez tous les éléments

    for (const element of elements) {
      const canvas = await html2canvas(element as HTMLElement, {
        scale: 2,
        useCORS: true,
      });
      const imgData = canvas.toDataURL("image/png");
      const imgProps = pdf.getImageProperties(imgData);
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

      if (yPosition + imgHeight > pdfHeight - margin) {
        pdf.addPage(); // Ajoutez une nouvelle page si le contenu dépasse
        yPosition = margin; // Réinitialisez la position
      }

      pdf.addImage(
        imgData,
        "PNG",
        margin,
        yPosition,
        pdfWidth - margin * 2,
        imgHeight,
        "",
        "FAST",
      );
      yPosition += imgHeight; // Mettez à jour la position Y
    }

    pdf.save("rapport.pdf");
  };

  return (
    <Container>
      <div className="py-10 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Rapport d&apos;inspection</h2>
        <div className="flex gap-4">
          <Button variant="ghost" onClick={onCancel}>
            Retour
          </Button>
          <Button onClick={handleDownload}>Télécharger le rapport</Button>
        </div>
      </div>
      <Card className="rounded-none">
        <div className="p-8 border-l-[40px] border-l-primary" id="report">
          <div className="flex justify-center mb-8">
            <Image
              src={LogoImage}
              alt="Drivite Logo"
              className=""
              height={96}
              width={200}
            />
          </div>
          <h1 className="text-2xl font-bold mb-8">
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
    </Container>
  );
};

export default ReportPage;
