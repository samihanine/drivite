import { db, sectionsTable } from "@/db";
import { isNull } from "drizzle-orm";

export const getSections = async () => {
  return await db.query.sectionsTable.findMany({
    where: isNull(sectionsTable.deletedAt),
  });
};
