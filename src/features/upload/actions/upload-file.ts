"use server";

import { s3Client } from "@/lib/s3";
import { authActionClient } from "@/lib/safe-action";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { z } from "zod";
import { zfd } from "zod-form-data";

const uploadFileSchema = zfd.formData({
  file: z.any(),
});

export const uploadFile = authActionClient
  .schema(uploadFileSchema)
  .action(async ({ parsedInput }) => {
    const { file } = parsedInput;
    const key = `${Date.now()}-${file.name}`;
    const Body = (await file.arrayBuffer()) as Buffer;

    await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.DO_BUCKET as string,
        Key: key,
        Body,
      }),
    );

    return key;
  });
