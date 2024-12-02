import { getQuestions } from "@/features/report/queries/get-questions";
import { getCurrentUser } from "@/features/user/queries/get-current-user";
import { redirect } from "next/navigation";
import { ReportEditor } from "@/features/report/components/report-editor";
import { Question } from "@/db";

export default async function Page() {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/login");
  }

  const questions = await getQuestions();

  return <ReportEditor questions={questions as Question[]} />;
}
