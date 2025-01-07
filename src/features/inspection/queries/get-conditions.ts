import { db, conditionsTable } from "@/db";
import { isNull } from "drizzle-orm";

export const getConditions = async () => {
  return await db.query.conditionsTable.findMany({
    where: isNull(conditionsTable.deletedAt),
  });
};
