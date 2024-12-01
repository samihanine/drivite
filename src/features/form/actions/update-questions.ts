"use server";

import { db, questionSchema, questionsTable } from "@/db";
import { adminActionClient } from "@/lib/safe-action";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const updateQuestions = adminActionClient
  .schema(
    z.object({
      questions: z.array(questionSchema),
    }),
  )
  .action(async ({ parsedInput }) => {
    const { questions } = parsedInput;

    const updatePromises = questions.map((question) =>
      db
        .update(questionsTable)
        .set(question)
        .where(eq(questionsTable.id, question.id))
        .execute(),
    );

    await Promise.all(updatePromises);

    revalidatePath("/app/admin/form");

    return { success: true, message: "Question orders updated successfully" };
  });
