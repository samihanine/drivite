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

export const conditionsTable = pgTable("conditions", {
  id: uuid().primaryKey().defaultRandom(),
  questionId: uuid().notNull(),
  value: text().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow(),
  deletedAt: timestamp(),
});

export const insertConditionSchema = createInsertSchema(conditionsTable);
export const conditionSchema = createSelectSchema(conditionsTable);
export type Condition = z.infer<typeof conditionSchema>;
export type InsertCondition = z.infer<typeof insertConditionSchema>;
