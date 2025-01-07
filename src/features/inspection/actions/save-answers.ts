"use server";

import { answerTable, db, insertAnswerSchema } from "@/db";
import { actionClient } from "@/lib/safe-action";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const saveAnswers = actionClient
  .schema(
    z.object({
      inspectionId: z.string(),
      answers: z.array(insertAnswerSchema),
    }),
  )
  .action(async ({ parsedInput }) => {
    await db
      .delete(answerTable)
      .where(eq(answerTable.inspectionId, parsedInput.inspectionId));

    const result = await db
      .insert(answerTable)
      .values(parsedInput.answers)
      .returning();

    revalidatePath("/app/admin/form");

    return result;
  });
