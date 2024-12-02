ALTER TABLE "reports" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "reports" CASCADE;--> statement-breakpoint
ALTER TABLE "answer" DROP CONSTRAINT "answer_reportId_reports_id_fk";
--> statement-breakpoint
ALTER TABLE "answer" ADD COLUMN "inspectionId" uuid NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "answer" ADD CONSTRAINT "answer_inspectionId_inspections_id_fk" FOREIGN KEY ("inspectionId") REFERENCES "public"."inspections"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "answer" DROP COLUMN IF EXISTS "reportId";