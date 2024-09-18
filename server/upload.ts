"use server";

import { uploadFileToS3 } from "@/lib/s3";
import { authActionClient } from "@/lib/safe-action";
import { uploadFileSchema } from "@/lib/schemas";

export const uploadFile = authActionClient
  .schema(uploadFileSchema)
  .action(async ({ parsedInput }) => {
    const { file } = parsedInput;
    return uploadFileToS3(file);
  });
