"use server";

import { googleClient } from "@/lib/google";
import prisma from "@/lib/prisma";
import { uploadFileToS3 } from "@/lib/s3";
import axios from "axios";
import { File } from "formdata-node";
import { createCookie } from "../utils/create-cookie";
import { createUser } from "@/features/user/actions/create-user";

export const handleGoogleCallback = async ({
  code,
}: {
  code: string;
  state?: string;
  scopes: string[];
}): Promise<string> => {
  const { tokens } = await googleClient.getToken({
    code: code,
    redirect_uri: process.env.GOOGLE_REDIRECT_URL,
  });

  const ticket = await googleClient.verifyIdToken({
    idToken: tokens.id_token as string,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const data = ticket.getPayload();

  if (!data) {
    throw new Error("Invalid google token");
  }

  if (!data.email) {
    throw new Error("Invalid google token");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    let picture = undefined;

    if (data.picture) {
      const response = await axios.get(data.picture, {
        responseType: "arraybuffer",
      });

      const buffer = Buffer.from(response.data, "binary");

      const file = new File([buffer], "profile.png", {
        type: "image/png",
      });

      const key = await uploadFileToS3(file);

      picture = key;
    }

    const newUser = await createUser({
      email: data.email,
      name: data.name || "",
      provider: "GOOGLE",
      role: "USER",
      imagePath: picture,
    });

    if (!newUser?.id) {
      throw new Error("Error creating user");
    }

    await createCookie({ userId: newUser.id });
  } else {
    await createCookie({ userId: user.id });
  }

  return `/`;
};
