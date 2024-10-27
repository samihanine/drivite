import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/resend";

export const createUser = async (data: {
  email: string;
  name: string;
  password?: string;
  provider: "PASSWORD" | "GOOGLE";
  role: "USER" | "ADMINISTRATOR";
  imagePath?: string;
}) => {
  const user = await prisma.user.create({
    data: {
      ...data,
    },
  });

  await sendEmail({
    to: data.email,
    subject: "Bienvenue sur notre plateforme",
    text: `Bonjour, nous sommes ravis de vous accueillir sur notre plateforme !`,
    actionText: "Se connecter",
    actionUrl: (process.env.NEXT_PUBLIC_BASE_URL as string) + "/login",
  });

  return user;
};
