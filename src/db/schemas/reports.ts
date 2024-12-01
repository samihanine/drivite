import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { inspectionsTable } from "./inspections";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const reportsTable = pgTable("reports", {
  id: uuid().primaryKey().defaultRandom(),
  title: text().notNull(),
  inspectionId: uuid()
    .notNull()
    .references(() => inspectionsTable.id, {
      onDelete: "cascade",
    }),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow(),
  deletedAt: timestamp(),
});

export const insertReportSchema = createInsertSchema(reportsTable);
export const reportSchema = createSelectSchema(reportsTable);
export type Report = z.infer<typeof reportSchema>;
export type InsertReport = z.infer<typeof insertReportSchema>;
