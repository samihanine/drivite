import { db, inspectionsTable } from "@/db";
import { and, eq, isNull } from "drizzle-orm";

export const getInspectionById = async (id: string) => {
  return await db.query.inspectionsTable.findFirst({
    where: and(isNull(inspectionsTable.deletedAt), eq(inspectionsTable.id, id)),
  });
};
