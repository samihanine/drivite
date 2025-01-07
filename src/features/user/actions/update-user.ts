"use server";

import { db } from "@/db";
import { usersTable, userSchema } from "@/db/schemas";
import { getCurrentUser } from "@/features/user/queries/get-current-user";
import { adminActionClient } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";

export const updateUser = adminActionClient
  .schema(userSchema)
  .action(async ({ parsedInput }) => {
    const user = await getCurrentUser();

    if (!user) {
      return null;
    }

    const result = await db.update(usersTable).set(parsedInput).returning();

    revalidatePath("/");

    return result[0];
  });
