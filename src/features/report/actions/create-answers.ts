"use server";

import { Answer, answerTable, db, insertAnswerSchema } from "@/db";
import { adminActionClient } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createAnswers = adminActionClient
  .schema(
    z.object({
      answers: z.array(insertAnswerSchema),
    }),
  )
  .action(async ({ parsedInput }) => {
    const result = await db.insert(answerTable).values(parsedInput.answers);

    revalidatePath("/app/admin/form");

    return result as Answer[];
  });
