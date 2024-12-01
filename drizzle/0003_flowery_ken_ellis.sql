CREATE TABLE IF NOT EXISTS "sections" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"order" integer NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"deletedAt" timestamp
);
--> statement-breakpoint
ALTER TABLE "questions" ADD COLUMN "createdAt" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "questions" ADD COLUMN "updatedAt" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "questions" ADD COLUMN "deletedAt" timestamp;--> statement-breakpoint
ALTER TABLE "inspections" ADD COLUMN "inspectorId" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "inspections" ADD COLUMN "createdAt" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "inspections" ADD COLUMN "updatedAt" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "inspections" ADD COLUMN "deletedAt" timestamp;--> statement-breakpoint
ALTER TABLE "questions" DROP COLUMN IF EXISTS "options";--> statement-breakpoint
ALTER TABLE "inspections" DROP COLUMN IF EXISTS "title";