"use server";

import { db } from "@/db";
import { getCurrentUser } from "../queries/get-current-user";
import { userSchema, usersTable } from "@/db/schemas";
import { adminActionClient } from "@/lib/safe-action";

export const updateCurrentUser = adminActionClient
  .schema(userSchema.partial())
  .action(async ({ parsedInput }) => {
    const user = await getCurrentUser();

    if (!user) {
      return null;
    }

    return await db.update(usersTable).set(parsedInput).returning();
  });
