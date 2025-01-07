import { getConsultantByUserId } from "@/features/consultant/queries/get-consultant-by-user-id";
import Onboarding from "@/features/onboarding/components/onboarding";
import { getCurrentUser } from "@/features/user/queries/get-current-user";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/login");
  }

  const consultant = await getConsultantByUserId(user.id);

  if (consultant) {
    return redirect("/app");
  }

  return <Onboarding userId={user.id} />;
}
