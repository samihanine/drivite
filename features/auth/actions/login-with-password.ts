"use server";

import prisma from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createCookie } from "../utils/create-cookie";

const comparePassword = async (password: string, hashedPassword: string) => {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (error) {
    console.error("Error comparing password:", error);
    throw error;
  }
};

export const loginWithPassword = actionClient
  .schema(
    z.object({
      email: z.string().email(),
      password: z.string(),
    }),
  )
  .action(async ({ parsedInput }) => {
    const { email, password } = parsedInput;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { error: "Votre email est introuvable" };
    }

    if (user.provider !== "PASSWORD" || !user.password) {
      return { error: "Veuillez vous connecter avec Google" };
    }

    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch) {
      return { error: "Le mot de passe est incorrect" };
    }

    await createCookie({ userId: user.id });

    redirect(`/`);
  });
