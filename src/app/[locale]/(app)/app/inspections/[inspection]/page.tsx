import { ReportForm } from "@/features/inspection/components/report-form";
import ReportPage from "@/features/inspection/components/report-page";
import { getAnswersByInspectionId } from "@/features/inspection/queries/get-answers-by-inspection-id";
import { getConditions } from "@/features/inspection/queries/get-conditions";
import { getInspectionById } from "@/features/inspection/queries/get-inspection-by-id";
import { getQuestions } from "@/features/inspection/queries/get-questions";
import { getSections } from "@/features/inspection/queries/get-sections";
import { getCurrentUser } from "@/features/user/queries/get-current-user";
import { notFound, redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ inspection: string }>;
}) {
  const { inspection: inspectionId } = await params;

  const user = await getCurrentUser();

  if (!user) {
    return redirect("/login");
  }

  const inspection = await getInspectionById(inspectionId);

  if (!inspection) {
    return notFound();
  }

  const questions = await getQuestions();
  const conditions = await getConditions();
  const sections = await getSections();
  const answers = await getAnswersByInspectionId(inspectionId);

  return inspection.status === "IN_PROGRESS" ? (
    <ReportForm
      questions={questions.sort((a, b) => a.order - b.order)}
      conditions={conditions}
      sections={sections.sort((a, b) => a.order - b.order)}
      answers={answers}
      inspectionId={inspectionId}
    />
  ) : (
    <ReportPage
      questions={questions}
      sections={sections}
      answers={answers}
      onCancel={async () => {
        "use server";

        redirect(`/app`);
      }}
    />
  );
}
