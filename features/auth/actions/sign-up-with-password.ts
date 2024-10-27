"use server";

import { createUser } from "@/features/user/actions/create-user";
import prisma from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { registerSchema } from "@/lib/schemas";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { createCookie } from "../utils/create-cookie";

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
  .schema(registerSchema)
  .action(async ({ parsedInput }) => {
    const { email, name, password, confirmPassword } = parsedInput;

    if (password !== confirmPassword) {
      return { error: "Les mots de passe ne correspondent pas" };
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      return { error: "Cet utilisateur existe déjà" };
    }

    const hash = await hashPassword(password);

    const newUser = await createUser({
      email,
      name,
      password: hash,
      provider: "PASSWORD",
      role: "USER",
    });

    if (!newUser) {
      return {
        error: "Une erreur s'est produite lors de la création de l'utilisateur",
      };
    }

    await createCookie({ userId: newUser.id });

    redirect(`/`);
  });
