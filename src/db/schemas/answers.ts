import {
  integer,
  boolean,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { reportsTable } from "./reports";
import { questionsTable } from "./questions";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const answerTable = pgTable("answer", {
  id: uuid().primaryKey().defaultRandom(),
  questionId: uuid()
    .notNull()
    .references(() => questionsTable.id, {
      onDelete: "cascade",
    }),
  reportId: uuid()
    .notNull()
    .references(() => reportsTable.id, {
      onDelete: "cascade",
    }),
  booleanValue: boolean(),
  textValue: text(),
  imageValue: text(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow(),
  deletedAt: timestamp(),
});

export const insertAnswerSchema = createInsertSchema(answerTable);
export const answerSchema = createSelectSchema(answerTable);
export type Answer = z.infer<typeof answerSchema>;
export type InsertAnswer = z.infer<typeof insertAnswerSchema>;
