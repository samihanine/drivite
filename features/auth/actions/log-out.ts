"use server";

import { authActionClient } from "@/lib/safe-action";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logOut = authActionClient.action(async () => {
  const cookieStore = cookies();

  cookieStore.delete("accessToken");

  redirect(`/`);
});
