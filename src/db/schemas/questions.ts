import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { conditionsTable } from "./conditions";
import { sectionsTable } from "./sections";

export const questionTypeEnum = pgEnum("question_type_enum", [
  "TEXT",
  "SELECT",
  "PERCENTAGE",
  "NUMBER",
  "IMAGE",
  "DATE",
  "DATETIME",
]);

export const questionsTable = pgTable("questions", {
  id: uuid().primaryKey().defaultRandom(),
  conditionId: uuid().references(() => conditionsTable.id, {
    onDelete: "cascade",
  }),
  sectionId: uuid()
    .notNull()
    .references(() => sectionsTable.id, {
      onDelete: "cascade",
    }),
  label: text().notNull(),
  type: questionTypeEnum().notNull(),
  required: boolean().default(true),
  points: integer().default(0),
  valueForPoints: text(),
  order: integer().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow(),
  deletedAt: timestamp(),
  options: text().array().default([]).notNull(),
});

export const insertQuestionSchema = createInsertSchema(questionsTable).extend({
  options: z.array(z.string()),
});
export const questionSchema = createSelectSchema(questionsTable).extend({
  options: z.array(z.string()),
});
export type Question = z.infer<typeof questionSchema> & {
  options?: string[];
};
export type InsertQuestion = z.infer<typeof insertQuestionSchema> & {
  options?: string[];
};
