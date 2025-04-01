"use server";

import { answerSchema, db, questionsTable, sectionsTable } from "@/db";
import { authActionClient } from "@/lib/safe-action";
import { z } from "zod";
import { PDFDocument, PDFFont, PDFPage, rgb, StandardFonts } from "pdf-lib";
import { isNull } from "drizzle-orm";
import fs from "fs";
import path from "path";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "@/lib/s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";

export const generateReportPdf = authActionClient
  .schema(
    z.object({
      answers: z.array(
        answerSchema.pick({
          questionId: true,
          value: true,
        }),
      ),
    }),
  )
  .action(async ({ parsedInput }) => {
    try {
      const pdfDoc = await PDFDocument.create();
      let page = pdfDoc.addPage([595.28, 841.89]);
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const { width, height } = page.getSize();
      let yPosition = height - 50;

      yPosition = await addImage({
        page,
        yPosition,
        imageBase64: imageToBase64("/public/images/logos/logo-text.png"),
        width: 264,
        height: 104,
      });

      yPosition = addTitle({
        page,
        yPosition,
        font: boldFont,
        title: "Drivite - Inspection du véhicule",
      });

      const questions = await db.query.questionsTable.findMany({
        where: isNull(questionsTable.deletedAt),
      });
      const sections = (
        await db.query.sectionsTable.findMany({
          where: isNull(sectionsTable.deletedAt),
        })
      ).sort((a, b) => a.order - b.order);

      for (const section of sections) {
        const sectionQuestions = questions
          .filter((q) => q.sectionId === section.id)
          .sort((a, b) => a.order - b.order);

        if (sectionQuestions.length === 0) {
          continue;
        }

        ({ page, yPosition } = addPageIfNeeded({
          doc: pdfDoc,
          page,
          yPosition,
          neededSpace: 50 + sectionQuestions.length * 30,
        }));

        yPosition = addSection({
          page,
          font,
          yPosition,
          section: section.title,
        });

        for (const question of sectionQuestions) {
          const answer = parsedInput.answers.find(
            (a) => a.questionId === question.id,
          );

          if (!answer) {
            continue;
          }

          if (question.type === "IMAGE") {
            ({ page, yPosition } = addPageIfNeeded({
              doc: pdfDoc,
              page,
              yPosition,
              neededSpace: 200,
            }));
            yPosition = await addImageResponse({
              page,
              yPosition,
              imagePath: answer.value,
              question: question.label,
              font,
              boldFont,
            });
          } else {
            ({ page, yPosition } = addPageIfNeeded({
              doc: pdfDoc,
              page,
              yPosition,
              neededSpace: 50,
            }));
            yPosition = addTextResponse({
              page,
              font,
              boldFont,
              yPosition,
              question: question.label,
              answer: answer.value,
            });
          }
        }
      }

      return await pdfDoc.saveAsBase64({ dataUri: true });
    } catch (error) {
      console.log(error);
      return { success: false, message: "Failed to generate report PDF" };
    }
  });

interface SectionParams {
  page: PDFPage;
  font: PDFFont;
  yPosition: number;
  section: string;
}

function addSection({ page, font, yPosition, section }: SectionParams): number {
  const lineHeight = 30;
  const margin = 50;

  page.drawRectangle({
    x: margin,
    y: yPosition - 20,
    width: page.getWidth() - margin * 2,
    height: 25,
    color: rgb(0.91, 0.93, 0.96),
  });

  page.drawText(section, {
    x: margin + 5,
    y: yPosition - 12,
    size: 12,
    font,
    color: rgb(0, 0, 0),
  });

  return yPosition - lineHeight - 10;
}

interface ResponseParams {
  page: PDFPage;
  font: PDFFont;
  boldFont: PDFFont;
  yPosition: number;
  question: string;
  answer: string;
  backgroundColor?: string;
}

function addTextResponse({
  page,
  font,
  boldFont,
  yPosition,
  question,
  answer,
  backgroundColor,
}: ResponseParams): number {
  const lineHeight = 30;
  const margin = 50;
  const rgbColor = backgroundColor
    ?.match(/[A-Za-z0-9]{2}/g)
    ?.map((v) => parseInt(v, 16));

  page.drawText(question, {
    x: margin,
    y: yPosition,
    size: 10,
    font: boldFont,
    color: rgb(0, 0, 0),
  });

  const rectangleWidth = 100;
  const rectangleHeight = 15;
  const rectangleX = page.getWidth() - margin - rectangleWidth;
  const rectangleY = yPosition - rectangleHeight + 10;

  page.drawRectangle({
    x: rectangleX,
    y: rectangleY,
    width: rectangleWidth,
    height: rectangleHeight,
    color: rgbColor ? rgb(rgbColor[0], rgbColor[1], rgbColor[2]) : rgb(1, 1, 1),
  });

  const answerWidth = font.widthOfTextAtSize(answer, 10);
  page.drawText(answer, {
    x: page.getWidth() - margin - answerWidth,
    y: yPosition,
    size: 10,
    font,
    color: rgb(0.5, 0.5, 0.5),
  });

  page.drawLine({
    start: { x: margin, y: yPosition - 5 },
    end: { x: page.getWidth() - margin, y: yPosition - 5 },
    thickness: 1,
    color: rgb(0.8, 0.8, 0.8),
  });

  return yPosition - lineHeight;
}

interface ImageResponseParams {
  page: PDFPage;
  font: PDFFont;
  boldFont: PDFFont;
  yPosition: number;
  imagePath: string;
  question: string;
}

async function addImageResponse({
  page,
  yPosition,
  imagePath,
  question,
  font,
  boldFont,
}: ImageResponseParams): Promise<number> {
  const lineHeight = 30;
  const imageHeight = 150;
  const command = new GetObjectCommand({
    Bucket: process.env.DO_BUCKET,
    Key: imagePath,
  });
  const src = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  const response = await fetch(src);
  const buffer = await response.arrayBuffer();
  const uint8Array = new Uint8Array(buffer);
  const image = await page.doc.embedPng(uint8Array);
  const imageWidth = (image.width / image.height) * imageHeight;

  yPosition = addTextResponse({
    page,
    font: font,
    boldFont: boldFont,
    yPosition,
    question,
    answer: "",
  });

  page.drawImage(image, {
    x: page.getWidth() / 2 - imageWidth / 2,
    y: yPosition - imageHeight,
    width: imageWidth,
    height: imageHeight,
  });

  return yPosition - imageHeight - lineHeight;
}

interface TitleParams {
  page: PDFPage;
  font: PDFFont;
  title: string;
  yPosition: number;
}

function addTitle({ page, font, title, yPosition }: TitleParams): number {
  const margin = 50;
  const fontSize = 18;

  page.drawText(title, {
    x: margin,
    y: yPosition,
    size: fontSize,
    font,
    color: rgb(0, 0, 0),
  });

  return yPosition - fontSize - 10;
}

interface ImageParams {
  page: PDFPage;
  yPosition: number;
  imageBase64: string;
  width: number;
  height: number;
}

async function addImage({
  page,
  yPosition,
  imageBase64,
  width,
  height,
}: ImageParams): Promise<number> {
  const buffer = Buffer.from(imageBase64.split(",")[1], "base64");
  const uint8Array = new Uint8Array(buffer);
  const image = await page.doc.embedPng(uint8Array);

  page.drawImage(image, {
    x: page.getWidth() / 2 - width / 2,
    y: yPosition - height,
    width: width,
    height: height,
  });

  return yPosition - height - 20;
}

function imageToBase64(imagePath: string): string {
  const absolutePath = path.join(process.cwd(), imagePath);
  const imageBuffer = fs.readFileSync(absolutePath);
  return `data:image/png;base64,${imageBuffer.toString("base64")}`;
}

function addPageIfNeeded({
  doc,
  page,
  yPosition,
  neededSpace,
}: {
  doc: PDFDocument;
  page: PDFPage;
  yPosition: number;
  neededSpace: number;
}) {
  if (yPosition < neededSpace) {
    page = doc.addPage([595.28, 841.89]);
    yPosition = page.getSize().height - 50;
  }
  return { page, yPosition };
}