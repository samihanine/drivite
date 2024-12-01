import { db, questionsTable } from "@/db";
import { isNull } from "drizzle-orm";

export const getQuestions = async () => {
  return await db.query.questionsTable.findMany({
    where: isNull(questionsTable.deletedAt),
  });
};
