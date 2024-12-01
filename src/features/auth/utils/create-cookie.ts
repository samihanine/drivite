import jsonwebtoken from "jsonwebtoken";
import { cookies } from "next/headers";

export const createCookie = async ({ userId }: { userId: string }) => {
  const accessToken = jsonwebtoken.sign(
    userId,
    process.env.SECRET_KEY as string,
  );

  const cookieStore = await cookies();

  cookieStore.set("accessToken", accessToken, {
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
  });
};
