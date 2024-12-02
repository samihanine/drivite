ALTER TABLE "questions" ALTER COLUMN "required" SET DEFAULT true;--> statement-breakpoint
ALTER TABLE "questions" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "answer" ADD COLUMN "numberValue" integer;