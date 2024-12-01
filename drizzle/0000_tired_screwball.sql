CREATE TYPE "public"."user_privilege" AS ENUM('ADMINISTRATOR', 'CUSTOMER', 'CONSULTANT');--> statement-breakpoint
CREATE TYPE "public"."user_provider" AS ENUM('GOOGLE', 'CREDENTIALS');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"emailVerified" timestamp,
	"imagePath" varchar,
	"provider" "user_provider" DEFAULT 'CREDENTIALS' NOT NULL,
	"password" varchar,
	"role" "user_privilege" DEFAULT 'CUSTOMER' NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"deletedAt" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
