"use server";

import { createUser } from "@/features/user/actions/create-user";
import { actionClient } from "@/lib/safe-action";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { createCookie } from "../utils/create-cookie";
import { db, usersTable } from "@/db";
import { z } from "zod";
import { eq } from "drizzle-orm";

const hashPassword = async (password: string): Promise<string> => {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
};

export const signUpWithPassword = actionClient
  .schema(
    z.object({
      email: z.string().email(),
      name: z.string(),
      password: z.string(),
      confirmPassword: z.string(),
    }),
  )
  .action(async ({ parsedInput }) => {
    const { email, name, password, confirmPassword } = parsedInput;

    if (password !== confirmPassword) {
      return { error: "Les mots de passe ne correspondent pas" };
    }

    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.email, email),
    });

    if (user) {
      return { error: "Cet utilisateur existe déjà" };
    }

    const hash = await hashPassword(password);

    const newUser = await createUser({
      email,
      name,
      password: hash,
      provider: "CREDENTIALS",
      role: "CUSTOMER",
    });

    if (!newUser) {
      return {
        error: "Une erreur s'est produite lors de la création de l'utilisateur",
      };
    }

    await createCookie({ userId: newUser.id });

    redirect(`/app`);
  });
