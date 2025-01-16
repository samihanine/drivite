"use server";

import { consultantsTable, db } from "@/db";
import { adminActionClient } from "@/lib/safe-action";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const verifyConsultantSchema = z.object({
  userId: z.string(),
});

export const verifyConsultant = adminActionClient
  .schema(verifyConsultantSchema)
  .action(async ({ parsedInput }) => {
    const { userId } = parsedInput;

    const result = await db
      .update(consultantsTable)
      .set({ isVerifiedByAdmin: true })
      .where(eq(consultantsTable.userId, userId))
      .returning();

    revalidatePath("/app/admin/users");
    revalidatePath("/app");

    return result[0];
  });
