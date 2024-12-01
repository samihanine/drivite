CREATE TYPE "public"."displayConditionTypeEnum" AS ENUM('IF_FALSE', 'IF_TRUE');--> statement-breakpoint
CREATE TYPE "public"."conditionTypeEnum" AS ENUM('BELLOW_50_AND_25', 'IF_TRUE', 'IF_FALSE');--> statement-breakpoint
CREATE TYPE "public"."questionTypeEnum" AS ENUM('TEXT', 'SELECT', 'RANGE', 'IMAGE', 'STATE', 'CONFORM', 'FUNCTIONAL', 'NOT_EQUIPPED');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "questions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"label" text NOT NULL,
	"type" "questionTypeEnum" NOT NULL,
	"required" boolean DEFAULT false,
	"points" integer DEFAULT 0,
	"pointConditionType" "conditionTypeEnum",
	"order" integer NOT NULL,
	"displayConditionType" "conditionTypeEnum",
	"options" text[] DEFAULT '{}'
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "answer" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"questionId" integer NOT NULL,
	"reportId" integer NOT NULL,
	"booleanValue" boolean,
	"textValue" text,
	"imageValue" text,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reports" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"inspectionId" uuid NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "inspections" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "consultants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"firstName" text DEFAULT '',
	"lastName" text DEFAULT '',
	"phone" text DEFAULT '',
	"email" text DEFAULT '',
	"zone" text DEFAULT '',
	"address" text DEFAULT '',
	"postalCode" text DEFAULT '',
	"city" text DEFAULT '',
	"siren" text DEFAULT '',
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "customers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"firstName" text DEFAULT '',
	"lastName" text DEFAULT '',
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cars" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"photo" uuid NOT NULL,
	"brand" uuid NOT NULL,
	"model" uuid NOT NULL,
	"category" uuid NOT NULL,
	"priceEstimation" integer NOT NULL,
	"year" integer NOT NULL,
	"energy" uuid NOT NULL,
	"engine" uuid NOT NULL,
	"power" integer NOT NULL,
	"gearbox" uuid NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"deletedAt" timestamp
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "answer" ADD CONSTRAINT "answer_reportId_reports_id_fk" FOREIGN KEY ("reportId") REFERENCES "public"."reports"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reports" ADD CONSTRAINT "reports_inspectionId_inspections_id_fk" FOREIGN KEY ("inspectionId") REFERENCES "public"."inspections"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "consultants" ADD CONSTRAINT "consultants_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "customers" ADD CONSTRAINT "customers_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
