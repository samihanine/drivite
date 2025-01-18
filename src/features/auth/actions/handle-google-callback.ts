"use server";

import { db } from "@/db";
import { usersTable } from "@/db/schemas";
import { createUser } from "@/features/user/actions/create-user";
import { googleClient } from "@/lib/google";
import { eq } from "drizzle-orm";
import { createCookie } from "../utils/create-cookie";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "@/lib/s3";

export const handleGoogleCallback = async ({
  code,
}: {
  code: string;
  state?: string;
  scopes: string[];
}): Promise<string> => {
  const { tokens } = await googleClient.getToken({
    code,
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

  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.email, data.email),
  });

  if (!user) {
    let picture = undefined;

    if (data.picture) {
      const response = await fetch(data.picture);
      const buffer = await response.arrayBuffer();

      const key = `${Date.now()}-${data.email}.png`;

      await s3Client.send(
        new PutObjectCommand({
          Bucket: process.env.DO_BUCKET as string,
          Key: key,
          Body: new Uint8Array(buffer),
        }),
      );

      picture = key;
    }

    const newUser = await createUser({
      email: data.email,
      name: data.name || "",
      provider: "GOOGLE",
      role: "CONSULTANT",
      imagePath: picture,
    });

    if (!newUser?.id) {
      throw new Error("Error creating user");
    }

    await createCookie({ userId: newUser.id });
  } else {
    if (user.provider === "CREDENTIALS") {
      throw new Error("You should login with your credentials, not google");
    }

    await createCookie({ userId: user.id });
  }

  return `/app`;
};
