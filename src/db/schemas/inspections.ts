import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { consultantsTable } from "./consultants";

export const inspectionsTable = pgTable("inspections", {
  id: uuid().primaryKey().defaultRandom(),
  consultantId: uuid()
    .notNull()
    .references(() => consultantsTable.id, {
      onDelete: "cascade",
    }),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow(),
  deletedAt: timestamp(),
});

export const insertInspectionSchema = createInsertSchema(inspectionsTable);
export const inspectionSchema = createSelectSchema(inspectionsTable);
export type Inspection = z.infer<typeof inspectionSchema>;
export type InsertInspection = z.infer<typeof insertInspectionSchema>;
