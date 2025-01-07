import { db } from "@/db/database";
import { customersTable } from "@/db/schemas";
import { eq } from "drizzle-orm";

export const getCustomerByUserId = async (userId: string) => {
  return await db.query.customersTable.findFirst({
    where: eq(customersTable.userId, userId),
  });
};
