"use server";

import { consultantsTable, db, insertConsultantSchema } from "@/db";
import { authActionClient } from "@/lib/safe-action";

export const createConsultant = authActionClient
  .schema(insertConsultantSchema)
  .action(async ({ parsedInput }) => {
    const result = await db
      .insert(consultantsTable)
      .values({ ...parsedInput })
      .returning();

    return result[0];
  });
