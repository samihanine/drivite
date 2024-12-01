import { db } from "@/db";
import { InsertUser, usersTable } from "@/db/schemas";
import { sendEmail } from "@/lib/resend";

export const createUser = async (data: InsertUser) => {
  const user = await db.insert(usersTable).values(data).returning();

  await sendEmail({
    to: data.email,
    subject: "Bienvenue sur notre plateforme",
    text: `Bonjour, nous sommes ravis de vous accueillir sur notre plateforme !`,
    actionText: "Se connecter",
    actionUrl: (process.env.NEXT_PUBLIC_BASE_URL as string) + "/login",
  });

  return user[0];
};
