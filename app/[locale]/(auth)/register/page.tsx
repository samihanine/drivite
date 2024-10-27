import { RegisterForm } from "@/features/auth/components/register-form";

export default async function Register() {
  return (
    <div className="flex w-full flex-col gap-8">
      <RegisterForm />
    </div>
  );
}
