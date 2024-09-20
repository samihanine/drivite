"use server";
import jsonwebtoken from "jsonwebtoken";
import { cookies } from "next/headers";
import prisma from "../lib/prisma";

export const getCurrentUser = async () => {
  const cookieStore = cookies();

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

  const user = await prisma.user.findUnique({
    where: { id: result },
  });

  return user || null;
};
