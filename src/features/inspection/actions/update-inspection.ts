"use server";

import { db } from "@/db/database";
import {
  insertAnswerSchema,
  inspectionSchema,
  inspectionsTable,
} from "@/db/schemas";
import { actionClient } from "@/lib/safe-action";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const updateInspection = actionClient
  .schema(
    z.object({
      id: z.string(),
      status: inspectionSchema.shape.status,
    }),
  )
  .action(async ({ parsedInput }) => {
    const result = await db
      .update(inspectionsTable)
      .set({ status: parsedInput.status })
      .where(eq(inspectionsTable.id, parsedInput.id))
      .returning();

    return result[0];
  });
