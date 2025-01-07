import { answerTable, db } from "@/db";
import { and, eq, isNull } from "drizzle-orm";

export const getAnswersByInspectionId = async (inspectionId: string) => {
  return await db.query.answerTable.findMany({
    where: and(
      isNull(answerTable.deletedAt),
      eq(answerTable.inspectionId, inspectionId),
    ),
  });
};
