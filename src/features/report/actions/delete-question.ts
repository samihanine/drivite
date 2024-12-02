"use server";

import { db, questionSchema, questionsTable } from "@/db";
import { adminActionClient } from "@/lib/safe-action";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const deleteQuestion = adminActionClient
  .schema(z.object({ id: questionSchema.shape.id }))
  .action(async ({ parsedInput }) => {
    const result = await db
      .update(questionsTable)
      .set({
        deletedAt: new Date(),
      })
      .where(eq(questionsTable.id, parsedInput.id))
      .returning();

    revalidatePath("/app/admin/form");

    return result[0];
  });
