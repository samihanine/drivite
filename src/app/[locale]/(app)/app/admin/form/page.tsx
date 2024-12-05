import { getQuestions } from "@/features/report/queries/get-questions";
import { getCurrentUser } from "@/features/user/queries/get-current-user";
import { ReportEditor } from "@/features/report/components/report-editor";
import { getConditions } from "@/features/report/queries/get-conditions";
import { getSections } from "@/features/report/queries/get-sections";
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
