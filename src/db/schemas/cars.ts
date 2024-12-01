import { integer, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const carsTable = pgTable("cars", {
  id: uuid().primaryKey().defaultRandom(),
  photo: uuid().notNull(),
  brand: uuid().notNull(),
  model: uuid().notNull(),
  category: uuid().notNull(),
  priceEstimation: integer().notNull(),
  year: integer().notNull(),
  energy: uuid().notNull(),
  engine: uuid().notNull(),
  power: integer().notNull(),
  gearbox: uuid().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow(),
  deletedAt: timestamp(),
});

export const insertCarSchema = createInsertSchema(carsTable);
export const carSchema = createSelectSchema(carsTable);
export type Car = z.infer<typeof carSchema>;
export type InsertCar = z.infer<typeof insertCarSchema>;
