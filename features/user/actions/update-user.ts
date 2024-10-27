"use server";

import { getCurrentUser } from "@/features/user/queries/get-current-user";
import prisma from "@/lib/prisma";
import { authActionClient } from "@/lib/safe-action";
import { userSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const updateUser = authActionClient
  .schema(
    userSchema
      .partial()
      .extend({
        id: z.string(),
      })
      .omit({
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      }),
  )
  .action(async ({ parsedInput }) => {
    const user = await getCurrentUser();

    if (!user) {
      return null;
    }

    const result = await prisma.user
      .update({
        where: { id: user.id },
        data: parsedInput,
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        return null;
      });

    revalidatePath("/");

    return result;
  });
