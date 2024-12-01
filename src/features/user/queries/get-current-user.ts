"use server";

import { db } from "@/db";
import { usersTable } from "@/db/schemas";
import { eq } from "drizzle-orm";
import jsonwebtoken from "jsonwebtoken";
import { cookies } from "next/headers";

export const getCurrentUser = async () => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return null;
  }

  const result: string | undefined = await new Promise((resolve) => {
    jsonwebtoken.verify(
      accessToken,
      process.env.SECRET_KEY as string,
      (err, decoded) => {
        if (err) {
          resolve(undefined);
        }
        resolve(decoded as string);
      },
    );
  });

  if (!result) {
    return null;
  }

  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.id, result),
  });

  return user || null;
};
