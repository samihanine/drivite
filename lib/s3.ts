import { randomUUID } from "crypto";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { File } from "formdata-node";
import config from "./config";

const client = new S3Client({
  region: config.S3_REGION,
  endpoint: config.NEXT_PUBLIC_S3_ENDPOINT,
  credentials: {
    accessKeyId: config.S3_ACCESS_KEY_ID,
    secretAccessKey: config.S3_SECRET_ACCESS_KEY,
  },
});

const bucketName = config.NEXT_PUBLIC_S3_BUCKET_NAME;

export const uploadFileToS3 = async (file: File) => {
  try {
    const randomId = randomUUID().split("-")[0];
    const key = `${randomId}-${file.name}`;

    if (file.size > 3_000_000) {
      throw new Error("The file must not exceed 3MB");
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: buffer,
    });

    await client.send(command);

    return key;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw new Error("An error occurred while uploading the file");
  }
};

export const getFileUrlByKey = (key: string) => {
  const result = config.NEXT_PUBLIC_S3_ENDPOINT + "/" + bucketName + "/" + key;
  return result;
};
