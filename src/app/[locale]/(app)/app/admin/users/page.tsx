import { AppContainer } from "@/components/app-container";
import { Typography } from "@/components/typography";
import AdminUserTable from "@/features/user/components/admin-user-table";
import { getCurrentUser } from "@/features/user/queries/get-current-user";
import { getUsers } from "@/features/user/queries/get-users";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await getCurrentUser();
  const users = await getUsers();

  if (!user) {
    return redirect("/login");
  }

  return (
    <AppContainer className="mt-10">
      <Typography variant="h3" className="mb-5">
        Gestion des utilisateurs
      </Typography>
      <AdminUserTable users={users} />
    </AppContainer>
  );
}
