import { eq, sql, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser,
  InsertQuizSubmission,
  InsertFollowUpRequest,
  InsertWaitlist,
  InsertPageview,
  followUpRequests,
  quizSubmissions,
  users,
  waitlist,
  pageviews,
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ─── Quiz Submissions ─────────────────────────────────────────────────────────

export async function saveQuizSubmission(data: InsertQuizSubmission) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(quizSubmissions).values(data);
}

export async function getAllQuizSubmissions() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(quizSubmissions).orderBy(desc(quizSubmissions.createdAt));
}

// ─── Follow-Up Requests ───────────────────────────────────────────────────────

export async function createFollowUpRequest(data: InsertFollowUpRequest) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(followUpRequests).values(data);
}

export async function getFollowUpRequest(sessionId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db
    .select()
    .from(followUpRequests)
    .where(eq(followUpRequests.sessionId, sessionId))
    .limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function resolveFollowUpRequest(sessionId: string, qualified: boolean) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const resultMessage = qualified
    ? "You are eligible for a follow-up consultation. Please book your appointment below."
    : "Based on our review, a follow-up consultation is not recommended at this time. Please consult your primary care provider.";
  await db
    .update(followUpRequests)
    .set({
      qualified,
      status: qualified ? "qualified" : "not_qualified",
      resultMessage,
      resolvedAt: new Date(),
    })
    .where(eq(followUpRequests.sessionId, sessionId));
}

export async function getAllFollowUpRequests() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(followUpRequests).orderBy(desc(followUpRequests.createdAt));
}

// ─── Waitlist ─────────────────────────────────────────────────────────────────

export async function addToWaitlist(data: InsertWaitlist) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const existing = await db
    .select()
    .from(waitlist)
    .where(eq(waitlist.email, data.email))
    .limit(1);
  if (existing.length > 0) return { alreadyExists: true };
  await db.insert(waitlist).values(data);
  return { alreadyExists: false };
}

export async function getAllWaitlist() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(waitlist).orderBy(desc(waitlist.createdAt));
}

// ─── Pageview Analytics ───────────────────────────────────────────────────────

export async function recordPageview(data: InsertPageview) {
  const db = await getDb();
  if (!db) return;
  try {
    await db.insert(pageviews).values(data);
  } catch (err) {
    console.warn("[Analytics] Failed to record pageview:", err);
  }
}

// ─── Admin Stats ──────────────────────────────────────────────────────────────

export async function getAdminStats() {
  const db = await getDb();
  if (!db) return { totalQuiz: 0, totalFollowUp: 0, totalWaitlist: 0, qualifiedCount: 0, pendingCount: 0 };

  const [quizCount] = await db.select({ count: sql<number>`count(*)` }).from(quizSubmissions);
  const [followUpCount] = await db.select({ count: sql<number>`count(*)` }).from(followUpRequests);
  const [waitlistCount] = await db.select({ count: sql<number>`count(*)` }).from(waitlist);
  const [qualifiedCount] = await db.select({ count: sql<number>`count(*)` }).from(followUpRequests).where(eq(followUpRequests.status, "qualified"));
  const [pendingCount] = await db.select({ count: sql<number>`count(*)` }).from(followUpRequests).where(eq(followUpRequests.status, "pending"));

  return {
    totalQuiz: Number(quizCount?.count ?? 0),
    totalFollowUp: Number(followUpCount?.count ?? 0),
    totalWaitlist: Number(waitlistCount?.count ?? 0),
    qualifiedCount: Number(qualifiedCount?.count ?? 0),
    pendingCount: Number(pendingCount?.count ?? 0),
  };
}
