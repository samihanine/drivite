ALTER TABLE "users" ADD COLUMN "emailVerifiedAt" timestamp;--> statement-breakpoint
ALTER TABLE "consultants" ADD COLUMN "isVerifiedByAdmin" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "emailVerified";