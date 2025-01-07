import { db } from "@/db";
import { isNull } from "drizzle-orm";
import { inspectionsTable } from "@/db/schemas";

export const getInspections = async () => {
  return await db.query.inspectionsTable.findMany({
    where: isNull(inspectionsTable.deletedAt),
  });
};
