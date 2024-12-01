"use server";

import { db, insertQuestionSchema, questionsTable } from "@/db";
import { adminActionClient } from "@/lib/safe-action";
import { eq, gte } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const createQuestion = adminActionClient
  .schema(insertQuestionSchema)
  .action(async ({ parsedInput }) => {
    const result = await db.insert(questionsTable).values(parsedInput);

    const order = parsedInput.order;

    const questionOrders = await db.query.questionsTable.findMany({
      where: gte(questionsTable.order, order),
    });

    const updatePromises = questionOrders.map(({ id, order }) =>
      db
        .update(questionsTable)
        .set({ order })
        .where(eq(questionsTable.id, id))
        .execute(),
    );

    await Promise.all(updatePromises);

    revalidatePath("/app/admin/form");

    return result[0];
  });
