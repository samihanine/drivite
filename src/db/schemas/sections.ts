import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const sectionsTable = pgTable("sections", {
  id: uuid().primaryKey().defaultRandom(),
  title: text().notNull(),
  description: text(),
  isToggled: boolean().default(true),
  order: integer().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow(),
  deletedAt: timestamp(),
});

export const insertSectionSchema = createInsertSchema(sectionsTable);
export const sectionSchema = createSelectSchema(sectionsTable);
export type Section = z.infer<typeof sectionSchema>;
export type InsertSection = z.infer<typeof insertSectionSchema>;
