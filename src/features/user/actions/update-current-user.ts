import { db } from "@/db";
import { getCurrentUser } from "../queries/get-current-user";
import { usersTable } from "@/db/schemas";

export const updateCurrentUser = async (data: {
  name?: string;
  phoneNumber?: string;
  email?: string;
  imagePath?: string;
}) => {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  return await db.update(usersTable).set(data).returning();
};
