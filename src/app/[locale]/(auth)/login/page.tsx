import { LoginForm } from "@/features/auth/components/login-form";
import { getCurrentUser } from "@/features/user/queries/get-current-user";
import { redirect } from "next/navigation";

export default async function Login() {
  const user = await getCurrentUser();

  if (user) {
    return redirect("/app");
  }

  return (
    <div className="flex w-full flex-col gap-8">
      <LoginForm />
    </div>
  );
}
