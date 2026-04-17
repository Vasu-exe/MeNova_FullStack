import { boolean, int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Quiz submissions — stores every symptom assessment completed on the site.
 */
export const quizSubmissions = mysqlTable("quiz_submissions", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  score: int("score").notNull(),
  maxScore: int("maxScore").notNull(),
  severityTier: varchar("severityTier", { length: 64 }).notNull(),
  recommendation: text("recommendation"),
  answers: text("answers"),
  source: varchar("source", { length: 255 }),
  utmSource: varchar("utmSource", { length: 255 }),
  utmMedium: varchar("utmMedium", { length: 255 }),
  utmCampaign: varchar("utmCampaign", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type QuizSubmission = typeof quizSubmissions.$inferSelect;
export type InsertQuizSubmission = typeof quizSubmissions.$inferInsert;

/**
 * Follow-up verification requests — tracks who requested a follow-up and the result.
 */
export const followUpRequests = mysqlTable("follow_up_requests", {
  id: int("id").autoincrement().primaryKey(),
  sessionId: varchar("sessionId", { length: 128 }).notNull().unique(),
  firstName: varchar("firstName", { length: 255 }).notNull(),
  lastName: varchar("lastName", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  qualified: boolean("qualified"),
  status: mysqlEnum("status", ["pending", "qualified", "not_qualified"]).default("pending").notNull(),
  resultMessage: text("resultMessage"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  resolvedAt: timestamp("resolvedAt"),
});

export type FollowUpRequest = typeof followUpRequests.$inferSelect;
export type InsertFollowUpRequest = typeof followUpRequests.$inferInsert;

/**
 * Waitlist — people who want to be notified when slots open.
 */
export const waitlist = mysqlTable("waitlist", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  phone: varchar("phone", { length: 32 }),
  city: varchar("city", { length: 128 }),
  interest: varchar("interest", { length: 64 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Waitlist = typeof waitlist.$inferSelect;
export type InsertWaitlist = typeof waitlist.$inferInsert;

/**
 * Pageview analytics — tracks page visits and referral sources.
 */
export const pageviews = mysqlTable("pageviews", {
  id: int("id").autoincrement().primaryKey(),
  page: varchar("page", { length: 512 }).notNull(),
  referrer: varchar("referrer", { length: 512 }),
  utmSource: varchar("utmSource", { length: 255 }),
  utmMedium: varchar("utmMedium", { length: 255 }),
  utmCampaign: varchar("utmCampaign", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Pageview = typeof pageviews.$inferSelect;
export type InsertPageview = typeof pageviews.$inferInsert;
