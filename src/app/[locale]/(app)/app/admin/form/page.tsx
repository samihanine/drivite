import { getQuestions } from "@/features/inspection/queries/get-questions";
import { getCurrentUser } from "@/features/user/queries/get-current-user";
import { ReportEditor } from "@/features/inspection/components/report-editor";
import { getConditions } from "@/features/inspection/queries/get-conditions";
import { getSections } from "@/features/inspection/queries/get-sections";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/login");
  }

  const questions = await getQuestions();
  const conditions = await getConditions();
  const sections = await getSections();

  return (
    <ReportEditor
      questions={questions}
      conditions={conditions}
      sections={sections}
    />
  );
}
