import { getQuestions } from "@/features/form/queries/get-questions";
import { getCurrentUser } from "@/features/user/queries/get-current-user";
import { redirect } from "next/navigation";
import { FormEditor } from "@/features/form/components/form-editor";
import { Question } from "@/db";

export default async function Page() {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/login");
  }

  const questions = await getQuestions();

  return <FormEditor questions={questions as Question[]} />;
}
