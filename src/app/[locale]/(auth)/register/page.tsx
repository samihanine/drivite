import { RegisterForm } from "@/features/auth/components/register-form";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/features/user/queries/get-current-user";

export default async function Register() {
  const user = await getCurrentUser();

  if (user) {
    return redirect("/app");
  }
  return (
    <div className="flex w-full flex-col gap-8">
      <RegisterForm />
    </div>
  );
}
