import prisma from "@/lib/prisma";
import { getCurrentUser } from "../queries/get-current-user";

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

  return await prisma.user.update({
    where: { id: user.id },
    data,
  });
};
