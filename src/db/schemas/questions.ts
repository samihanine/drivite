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

export const pointConditionType = pgEnum("point_condition_type_enum", [
  "PERCENTAGE",
  "IF_TRUE",
  "IF_FALSE",
  "NONE",
]);

export const questionTypeEnum = pgEnum("question_type_enum", [
  "TEXT",
  "PERCENTAGE",
  "NUMBER",
  "IMAGE",
  "STATE",
  "CONFORM",
  "FUNCTIONAL",
  "NOT_EQUIPPED",
  "SECTION",
  "BOOLEAN",
  "DATE",
  "DATETIME",
]);

export const displayConditionTypeEnum = pgEnum("display_condition_type_enum", [
  "IF_FALSE",
  "IF_TRUE",
  "ALWAYS",
]);

export const questionsTable = pgTable("questions", {
  id: uuid().primaryKey().defaultRandom(),
  label: text().notNull(),
  type: questionTypeEnum().notNull(),
  required: boolean().default(true),
  points: integer().default(0),
  pointConditionType: pointConditionType().default("NONE").notNull(),
  order: integer().notNull(),
  displayConditionType: displayConditionTypeEnum().default("ALWAYS").notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow(),
  deletedAt: timestamp(),
});

export const insertQuestionSchema = createInsertSchema(questionsTable);
export const questionSchema = createSelectSchema(questionsTable);
export type Question = z.infer<typeof questionSchema>;
export type InsertQuestion = z.infer<typeof insertQuestionSchema>;
