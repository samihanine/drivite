import { db } from "@/db";
import { isNull } from "drizzle-orm";
import { consultantsTable } from "@/db/schemas";

export const getConsultants = async () => {
  return await db.query.consultantsTable.findMany({
    where: isNull(consultantsTable.deletedAt),
  });
};
