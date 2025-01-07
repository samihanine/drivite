import { db } from "@/db/database";
import { consultantsTable } from "@/db/schemas";
import { eq } from "drizzle-orm";

export const getConsultantByUserId = async (userId: string) => {
  return await db.query.consultantsTable.findFirst({
    where: eq(consultantsTable.userId, userId),
  });
};
