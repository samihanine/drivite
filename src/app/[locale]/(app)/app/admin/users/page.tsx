import { getCurrentUser } from "@/features/user/queries/get-current-user";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div>
      <h1>Page</h1>
    </div>
  );
}
