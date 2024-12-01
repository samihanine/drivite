CREATE TYPE "public"."display_condition_type_enum" AS ENUM('IF_FALSE', 'IF_TRUE', 'ALWAYS');--> statement-breakpoint
CREATE TYPE "public"."point_condition_type_enum" AS ENUM('PERCENTAGE', 'IF_TRUE', 'IF_FALSE', 'NONE');--> statement-breakpoint
CREATE TYPE "public"."question_type_enum" AS ENUM('TEXT', 'SELECT', 'PERCENTAGE', 'IMAGE', 'STATE', 'CONFORM', 'FUNCTIONAL', 'NOT_EQUIPPED');--> statement-breakpoint
ALTER TABLE "questions" ALTER COLUMN "type" SET DATA TYPE question_type_enum;--> statement-breakpoint
ALTER TABLE "questions" ALTER COLUMN "pointConditionType" SET DATA TYPE point_condition_type_enum;--> statement-breakpoint
ALTER TABLE "questions" ALTER COLUMN "displayConditionType" SET DATA TYPE display_condition_type_enum;--> statement-breakpoint
DROP TYPE "public"."displayConditionTypeEnum";--> statement-breakpoint
DROP TYPE "public"."pointConditionTypeEnum";--> statement-breakpoint
DROP TYPE "public"."questionTypeEnum";