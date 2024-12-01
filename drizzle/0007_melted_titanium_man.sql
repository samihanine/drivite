ALTER TABLE "public"."questions" ALTER COLUMN "type" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."question_type_enum";--> statement-breakpoint
CREATE TYPE "public"."question_type_enum" AS ENUM('TEXT', 'PERCENTAGE', 'NUMBER', 'IMAGE', 'STATE', 'CONFORM', 'FUNCTIONAL', 'NOT_EQUIPPED', 'SECTION', 'BOOLEAN', 'DATE');--> statement-breakpoint
ALTER TABLE "public"."questions" ALTER COLUMN "type" SET DATA TYPE "public"."question_type_enum" USING "type"::"public"."question_type_enum";