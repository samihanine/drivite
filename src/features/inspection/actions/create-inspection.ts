"use server";

import { db } from "@/db/database";
import { insertAnswerSchema, inspectionsTable } from "@/db/schemas";
import { actionClient } from "@/lib/safe-action";
import { z } from "zod";

export const createInspection = actionClient
  .schema(
    z.object({
      consultantId: z.string(),
    }),
  )
  .action(async ({ parsedInput }) => {
    const result = await db
      .insert(inspectionsTable)
      .values({ ...parsedInput })
      .returning();

    return result[0];
  });
