"use server";

import { uploadFileToS3 } from "@/lib/s3";
import { authActionClient } from "@/lib/safe-action";
import { z } from "zod";
import { zfd } from "zod-form-data";

export const uploadFileSchema = zfd.formData({
  file: z.any(),
});

export type UploadFile = z.infer<typeof uploadFileSchema>;

export const uploadFile = authActionClient
  .schema(uploadFileSchema)
  .action(async ({ parsedInput }) => {
    const { file } = parsedInput;
    return uploadFileToS3(file);
  });
