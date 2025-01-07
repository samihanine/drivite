"use server";

import {
  db,
  insertConditionSchema,
  insertQuestionSchema,
  insertSectionSchema,
  questionsTable,
  sectionsTable,
  conditionsTable,
} from "@/db";
import { adminActionClient } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const saveReport = adminActionClient
  .schema(
    z.object({
      questions: z.array(insertQuestionSchema),
      sections: z.array(insertSectionSchema),
      conditions: z.array(insertConditionSchema),
    }),
  )
  .action(async ({ parsedInput }) => {
    try {
      const { questions, sections, conditions } = parsedInput;

      // Upsert Sections
      const sectionPromises = sections.map((section) => {
        return db
          .insert(sectionsTable)
          .values({ ...section })
          .onConflictDoUpdate({
            target: [sectionsTable.id],
            set: section,
          })
          .execute();
      });

      await Promise.all(sectionPromises);

      // Upsert Questions without conditions
      const questionsWithoutConditions = questions.filter(
        (q) => !q.conditionId,
      );
      const questionPromisesWithoutConditions = questionsWithoutConditions.map(
        (question) => {
          return db
            .insert(questionsTable)
            .values({ ...question })
            .onConflictDoUpdate({
              target: [questionsTable.id],
              set: question,
            })
            .execute();
        },
      );

      await Promise.all(questionPromisesWithoutConditions);

      // Upsert Conditions
      const conditionPromises = conditions.map((condition) => {
        return db
          .insert(conditionsTable)
          .values({ ...condition })
          .onConflictDoUpdate({
            target: [conditionsTable.id],
            set: condition,
          })
          .execute();
      });

      await Promise.all(conditionPromises);

      // Upsert Questions with conditions (dependent)
      const questionsWithConditions = questions.filter((q) => q.conditionId);
      const questionPromisesWithConditions = questionsWithConditions.map(
        (question) => {
          return db
            .insert(questionsTable)
            .values({ ...question })
            .onConflictDoUpdate({
              target: [questionsTable.id],
              set: question,
            })
            .execute();
        },
      );

      await Promise.all(questionPromisesWithConditions);

      revalidatePath("/app/admin/form");

      return {
        success: true,
        message: "Form data updated successfully",
      };
    } catch (error) {
      console.log(error);
      return { success: false, message: "Failed to update form data" };
    }
  });
