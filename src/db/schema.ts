import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

/** General enquiry / contact form submissions (replaces the WP contact widget). */
export const enquiries = pgTable("enquiries", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 80 }).notNull(),
  lastName: varchar("last_name", { length: 80 }).notNull(),
  email: varchar("email", { length: 160 }).notNull(),
  phone: varchar("phone", { length: 30 }),
  interest: varchar("interest", { length: 120 }),
  message: text("message").notNull(),
  source: varchar("source", { length: 80 }).notNull().default("website"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

/** Admission application requests submitted through /admission-form. */
export const admissions = pgTable("admissions", {
  id: serial("id").primaryKey(),
  fullName: varchar("full_name", { length: 160 }).notNull(),
  email: varchar("email", { length: 160 }).notNull(),
  phone: varchar("phone", { length: 30 }).notNull(),
  course: varchar("course", { length: 120 }).notNull(),
  qualification: varchar("qualification", { length: 120 }),
  city: varchar("city", { length: 120 }),
  message: text("message"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

/** Student feedback submissions from /student-corner. */
export const feedback = pgTable("feedback", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 80 }).notNull(),
  lastName: varchar("last_name", { length: 80 }).notNull(),
  email: varchar("email", { length: 160 }).notNull(),
  kind: varchar("kind", { length: 40 }).notNull().default("feedback"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

/**
 * Certificate verification lookups.
 * The official certificate records are maintained by the MSITM office and were
 * not published on the reference website, so lookups are logged here and the
 * visitor is directed to the official helpline. No certificate data is faked.
 */
export const certificateLookups = pgTable("certificate_lookups", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  certificateId: varchar("certificate_id", { length: 80 }),
  event: varchar("event", { length: 160 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Enquiry = typeof enquiries.$inferSelect;
export type Admission = typeof admissions.$inferSelect;
export type Feedback = typeof feedback.$inferSelect;
