import { db, usersTable } from "@/db";
import { isNull } from "drizzle-orm";

export const getUsers = async () => {
  return await db.query.usersTable.findMany({
    where: isNull(usersTable.deletedAt),
  });
};
