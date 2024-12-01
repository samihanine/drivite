ALTER TABLE "answer" ALTER COLUMN "questionId" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "answer" ALTER COLUMN "reportId" SET DATA TYPE uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "answer" ADD CONSTRAINT "answer_questionId_questions_id_fk" FOREIGN KEY ("questionId") REFERENCES "public"."questions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
