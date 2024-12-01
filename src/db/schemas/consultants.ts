import { timestamp, pgTable, uuid, text } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import z from "zod";
import { usersTable } from "./users";

export const consultantsTable = pgTable("consultants", {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid()
    .notNull()
    .references(() => usersTable.id, {
      onDelete: "cascade",
    }),
  firstName: text().default(""),
  lastName: text().default(""),
  phone: text().default(""),
  email: text().default(""),
  zone: text().default(""),
  address: text().default(""),
  postalCode: text().default(""),
  city: text().default(""),
  siren: text().default(""),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow(),
  deletedAt: timestamp(),
});

export const insertConsultantSchema = createInsertSchema(consultantsTable);
export const consultantSchema = createSelectSchema(consultantsTable);
export type Consultant = z.infer<typeof consultantSchema>;
export type InsertConsultant = z.infer<typeof insertConsultantSchema>;
