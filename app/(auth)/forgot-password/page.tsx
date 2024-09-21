import { getCurrentUser } from "@/features/user/queries/get-current-user";

export default async function Page() {
  const user = await getCurrentUser();

  return <>{JSON.stringify(user)}</>;
}
