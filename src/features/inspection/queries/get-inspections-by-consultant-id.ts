import { db } from "@/db";
import { and, eq, isNull } from "drizzle-orm";
import { inspectionsTable } from "@/db/schemas";

export const getInspectionsByConsultantId = async (consultantId: string) => {
  return await db.query.inspectionsTable.findMany({
    where: and(
      eq(inspectionsTable.consultantId, consultantId),
      isNull(inspectionsTable.deletedAt),
    ),
  });
};
