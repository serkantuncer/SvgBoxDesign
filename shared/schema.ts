import { pgTable, text, serial, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Users table for authentication
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Define box dimensions validation schema
export const boxDimensionsSchema = z.object({
  a: z.number().min(10).max(1000),
  b: z.number().min(10).max(1000),
  h: z.number().min(10).max(1000),
  materialThickness: z.number().min(0.1).max(2),
  modelType: z.number().min(1).max(2),
  featureType: z.enum(["Normal", "Aski", "Dil", "Parmak"]),
  z: z.number().min(0).max(100),
  f: z.number().min(0).max(100),
  g: z.number().min(0).max(200),
  c: z.number().min(0).max(100),
  askiType: z.number().min(1).max(4).optional(),
  dilType: z.number().min(1).max(4).optional(),
  parmakType: z.number().min(1).max(4).optional(),
  m1: z.number().min(0).max(100).optional(),
  m4: z.number().min(0).max(100).optional(),
  d: z.number().min(0).max(100).optional(),
  r1: z.number().min(0).max(50).optional(),
});

// Box designs table
export const designs = pgTable("designs", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  dimensions: jsonb("dimensions").notNull().$type<z.infer<typeof boxDimensionsSchema>>(),
  svg: text("svg").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Box design validation schema
export const boxDesignSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(3, "Name must be at least 3 characters"),
  dimensions: boxDimensionsSchema,
  svg: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const designInsertSchema = createInsertSchema(designs);
export type DesignInsert = z.infer<typeof designInsertSchema>;
export type Design = typeof designs.$inferSelect;
