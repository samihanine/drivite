import { pgEnum, varchar, timestamp, pgTable, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import z from "zod";

export const providerEnum = pgEnum("user_provider", ["GOOGLE", "CREDENTIALS"]);
export const privilegeEnum = pgEnum("user_privilege", [
  "ADMINISTRATOR",
  "CUSTOMER",
  "CONSULTANT",
]);

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar().notNull(),
  email: varchar().notNull().unique(),
  emailVerifiedAt: timestamp(),
  imagePath: varchar(),
  provider: providerEnum().notNull().default("CREDENTIALS"),
  password: varchar(),
  role: privilegeEnum().default("CUSTOMER").notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow(),
  deletedAt: timestamp(),
});

export const insertUserSchema = createInsertSchema(usersTable);
export const userSchema = createSelectSchema(usersTable);
export type User = z.infer<typeof userSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;
