import { z } from "zod";

const Config = z.object({
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GOOGLE_REDIRECT_URL: z.string(),
  GEOAPIFY_API_KEY: z.string(),
  STRIPE_SECRET_KEY: z.string(),
  NEXT_PUBLIC_BASE_URL: z.string(),
  DATABASE_URL: z.string(),
  SECRET_KEY: z.string(),
  RESEND_API_KEY: z.string(),
  RESEND_FROM_EMAIL: z.string(),
  S3_ACCESS_KEY_ID: z.string(),
  S3_SECRET_ACCESS_KEY: z.string(),
  S3_REGION: z.string(),
  NEXT_PUBLIC_S3_ENDPOINT: z.string(),
  NEXT_PUBLIC_S3_BUCKET_NAME: z.string(),
});

const config = Config.parse(process.env);

export default config;
