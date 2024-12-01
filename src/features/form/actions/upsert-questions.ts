"use server";

import { db, insertQuestionSchema, questionsTable } from "@/db";
import { adminActionClient } from "@/lib/safe-action";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const upsertQuestions = adminActionClient
  .schema(
    z.object({
      questions: z.array(insertQuestionSchema),
    }),
  )
  .action(async ({ parsedInput }) => {
    try {
      const { questions } = parsedInput;

      const insertPromises = questions
        .filter((question) => !question.id && !question.deletedAt)
        .map((question) => {
          return db
            .insert(questionsTable)
            .values({ ...question, id: undefined })
            .execute();
        });

      const updatePromises = questions
        .filter((question) => question.id)
        .map((question) =>
          db
            .update(questionsTable)
            .set(question)
            .where(eq(questionsTable.id, question.id as string))
            .execute(),
        );

      await Promise.all(updatePromises);

      await Promise.all(insertPromises);

      revalidatePath("/app/admin/form");

      return { success: true, message: "Question orders updated successfully" };
    } catch (error) {
      console.log(error);
      return { success: false, message: "Failed to update question orders" };
    }
  });
