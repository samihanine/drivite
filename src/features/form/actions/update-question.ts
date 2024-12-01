"use server";

import { db, questionSchema, questionsTable } from "@/db";
import { adminActionClient } from "@/lib/safe-action";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const updateQuestion = adminActionClient
  .schema(questionSchema)
  .action(async ({ parsedInput }) => {
    const result = await db
      .update(questionsTable)
      .set(parsedInput)
      .where(eq(questionsTable.id, parsedInput.id))
      .returning();

    revalidatePath("/app/admin/form");

    return result[0];
  });
