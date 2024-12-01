CREATE TYPE "public"."pointConditionTypeEnum" AS ENUM('PERCENTAGE', 'IF_TRUE', 'IF_FALSE', 'NONE');--> statement-breakpoint
ALTER TYPE "public"."displayConditionTypeEnum" ADD VALUE 'ALWAYS';--> statement-breakpoint
ALTER TABLE "questions" ALTER COLUMN "pointConditionType" SET DATA TYPE pointConditionTypeEnum;--> statement-breakpoint
ALTER TABLE "questions" ALTER COLUMN "pointConditionType" SET DEFAULT 'NONE';--> statement-breakpoint
ALTER TABLE "questions" ALTER COLUMN "pointConditionType" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "questions" ALTER COLUMN "displayConditionType" SET DATA TYPE displayConditionTypeEnum;--> statement-breakpoint
ALTER TABLE "questions" ALTER COLUMN "displayConditionType" SET DEFAULT 'ALWAYS';--> statement-breakpoint
ALTER TABLE "questions" ALTER COLUMN "displayConditionType" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "inspections" ADD COLUMN "consultantId" uuid NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "inspections" ADD CONSTRAINT "inspections_consultantId_consultants_id_fk" FOREIGN KEY ("consultantId") REFERENCES "public"."consultants"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "inspections" DROP COLUMN IF EXISTS "inspectorId";--> statement-breakpoint
ALTER TABLE "public"."questions" ALTER COLUMN "type" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."questionTypeEnum";--> statement-breakpoint
CREATE TYPE "public"."questionTypeEnum" AS ENUM('TEXT', 'SELECT', 'PERCENTAGE', 'IMAGE', 'STATE', 'CONFORM', 'FUNCTIONAL', 'NOT_EQUIPPED');--> statement-breakpoint
ALTER TABLE "public"."questions" ALTER COLUMN "type" SET DATA TYPE "public"."questionTypeEnum" USING "type"::"public"."questionTypeEnum";--> statement-breakpoint
DROP TYPE "public"."conditionTypeEnum";