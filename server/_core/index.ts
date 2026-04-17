import "dotenv/config";
import express from "express";
import type { Request, Response, NextFunction } from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import {
  resolveFollowUpRequest,
  saveQuizSubmission,
  createFollowUpRequest,
  getFollowUpRequest,
  addToWaitlist,
  getAllQuizSubmissions,
  getAllFollowUpRequests,
  getAllWaitlist,
  getAdminStats,
  recordPageview,
} from "../db";
import { invokeLLM } from "./llm";
import { notifyOwner } from "./notification";
import { nanoid } from "nanoid";

// ─── Admin Auth Middleware ─────────────────────────────────────────────────────
const ADMIN_PASSWORD = process.env.MENOVA_ADMIN_PASSWORD || "menova2026";

function adminAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const token = authHeader.replace("Bearer ", "");
  if (token !== ADMIN_PASSWORD) {
    return res.status(403).json({ error: "Invalid admin token" });
  }
  next();
}

// ─── Server Setup ─────────────────────────────────────────────────────────────

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // OAuth callback
  registerOAuthRoutes(app);

  // ─── REST API Routes ──────────────────────────────────────────────────────

  // 1. Quiz Submission
  app.post("/api/quiz/submit", async (req: Request, res: Response) => {
    try {
      const { name, email, score, maxScore, tier, answers, recommendation, source, utmSource, utmMedium, utmCampaign } = req.body;
      if (!name || !email || score === undefined || maxScore === undefined || !tier) {
        return res.status(400).json({ success: false, error: "Missing required fields" });
      }
      await saveQuizSubmission({
        name,
        email,
        score: Number(score),
        maxScore: Number(maxScore),
        severityTier: tier,
        recommendation: recommendation || null,
        answers: answers ? JSON.stringify(answers) : null,
        source: source || null,
        utmSource: utmSource || null,
        utmMedium: utmMedium || null,
        utmCampaign: utmCampaign || null,
      });
      // Notify owner of new quiz submission
      try {
        await notifyOwner({
          title: `New Quiz Submission: ${name}`,
          content: `${name} (${email}) completed the symptom quiz.\nScore: ${score}/${maxScore} — ${tier}`,
        });
      } catch (e) {
        console.warn("[Notification] Failed to notify owner:", e);
      }
      return res.json({ success: true });
    } catch (err) {
      console.error("[Quiz] Failed to save submission:", err);
      return res.status(500).json({ success: false, error: "Failed to save quiz submission" });
    }
  });

  // 2. Follow-Up Request
  app.post("/api/followup/request", async (req: Request, res: Response) => {
    try {
      const { firstName, lastName, email } = req.body;
      if (!firstName || !lastName || !email) {
        return res.status(400).json({ success: false, error: "Missing required fields" });
      }
      const sessionId = nanoid(24);
      await createFollowUpRequest({
        sessionId,
        firstName,
        lastName,
        email,
      });
      // Notify owner
      try {
        await notifyOwner({
          title: `New Follow-Up Request: ${firstName} ${lastName}`,
          content: `${firstName} ${lastName} (${email}) requested a follow-up verification.\nSession ID: ${sessionId}`,
        });
      } catch (e) {
        console.warn("[Notification] Failed to notify owner:", e);
      }
      return res.json({ success: true, sessionId });
    } catch (err) {
      console.error("[FollowUp] Failed to create request:", err);
      return res.status(500).json({ success: false, error: "Failed to create follow-up request" });
    }
  });

  // 3. Follow-Up Status Check (polling)
  app.get("/api/followup/status/:sessionId", async (req: Request, res: Response) => {
    try {
      const { sessionId } = req.params;
      const request = await getFollowUpRequest(sessionId);
      if (!request) {
        return res.status(404).json({ error: "Session not found" });
      }
      return res.json({
        status: request.status,
        qualified: request.qualified,
        resultMessage: request.resultMessage || null,
      });
    } catch (err) {
      console.error("[FollowUp] Failed to check status:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  // 4. Make.com Webhook Receiver
  app.post("/api/followup-result", async (req: Request, res: Response) => {
    try {
      const { sessionId, qualified } = req.body;
      if (!sessionId || qualified === undefined) {
        return res.status(400).json({ error: "Missing sessionId or qualified field" });
      }
      await resolveFollowUpRequest(sessionId, Boolean(qualified));
      console.log(`[Make.com] Follow-up resolved: sessionId=${sessionId}, qualified=${qualified}`);
      return res.json({ success: true });
    } catch (err) {
      console.error("[Make.com] Failed to resolve follow-up:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  // 5. Waitlist
  app.post("/api/waitlist", async (req: Request, res: Response) => {
    try {
      const { name, email, interest } = req.body;
      if (!name || !email) {
        return res.status(400).json({ success: false, error: "Name and email are required" });
      }
      const result = await addToWaitlist({
        name,
        email,
        interest: interest || null,
      });
      if (result.alreadyExists) {
        return res.json({ success: true, message: "You're already on the waitlist!" });
      }
      // Notify owner
      try {
        await notifyOwner({
          title: `New Waitlist Signup: ${name}`,
          content: `${name} (${email}) joined the waitlist.${interest ? ` Interest: ${interest}` : ""}`,
        });
      } catch (e) {
        console.warn("[Notification] Failed to notify owner:", e);
      }
      return res.json({ success: true, message: "You've been added to the waitlist!" });
    } catch (err) {
      console.error("[Waitlist] Failed to add:", err);
      return res.status(500).json({ success: false, error: "Failed to join waitlist" });
    }
  });

  // 6. AI Chat
  app.post("/api/chat", async (req: Request, res: Response) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      const systemPrompt = `You are MeNova Health's AI assistant, specializing in menopause education and support for women in British Columbia, Canada.

IMPORTANT RULES:
- You provide general educational information about menopause, perimenopause, and Bioidentical Hormone Replacement Therapy (BHRT)
- You NEVER diagnose conditions or prescribe treatments
- You always recommend consulting with a licensed healthcare provider for medical decisions
- You are warm, empathetic, and supportive
- You keep answers concise (2-3 paragraphs max)
- When relevant, mention that MeNova Health offers virtual consultations with BC-licensed Nurse Practitioners
- If asked about pricing: Initial consult is $175 CAD, Monthly care bundle is $199/month
- If asked about booking: Direct them to book at cal.com/menova/30min
- You know about common menopause symptoms: hot flashes, night sweats, brain fog, sleep issues, mood changes, weight gain, low libido, vaginal dryness, fatigue, hair thinning
- You know BHRT uses plant-derived hormones molecularly identical to human hormones
- You know MeNova serves all of BC via telehealth

If someone asks something completely unrelated to women's health or menopause, politely redirect them.`;

      const messages: Array<{ role: string; content: string }> = [
        { role: "system", content: systemPrompt },
      ];

      // Add conversation history
      if (history && Array.isArray(history)) {
        for (const msg of history.slice(-10)) {
          if (msg.role && msg.content) {
            messages.push({ role: msg.role, content: msg.content });
          }
        }
      }

      messages.push({ role: "user", content: message });

      const result = await invokeLLM({
        messages: messages as any,
      });

      const reply = typeof result.choices?.[0]?.message?.content === "string"
        ? result.choices[0].message.content
        : "I'm sorry, I couldn't generate a response right now. Please try again or contact us directly.";

      return res.json({ reply });
    } catch (err) {
      console.error("[Chat] AI chat error:", err);
      return res.json({
        reply: "I'm having trouble connecting right now. For immediate assistance, please book a consultation at cal.com/menova/30min or try again in a moment.",
      });
    }
  });

  // 7. Admin Login
  app.post("/api/admin/login", async (req: Request, res: Response) => {
    try {
      const { password } = req.body;
      if (password === ADMIN_PASSWORD) {
        return res.json({ success: true, token: ADMIN_PASSWORD });
      }
      return res.status(401).json({ success: false, error: "Invalid password" });
    } catch (err) {
      return res.status(500).json({ success: false, error: "Internal server error" });
    }
  });

  // 8. Admin Stats
  app.get("/api/admin/stats", adminAuth, async (_req: Request, res: Response) => {
    try {
      const stats = await getAdminStats();
      return res.json(stats);
    } catch (err) {
      console.error("[Admin] Failed to get stats:", err);
      return res.status(500).json({ error: "Failed to get stats" });
    }
  });

  // 9. Admin Quiz Submissions
  app.get("/api/admin/quiz-submissions", adminAuth, async (_req: Request, res: Response) => {
    try {
      const submissions = await getAllQuizSubmissions();
      return res.json(submissions);
    } catch (err) {
      console.error("[Admin] Failed to get quiz submissions:", err);
      return res.status(500).json({ error: "Failed to get quiz submissions" });
    }
  });

  // 10. Admin Follow-Up Requests
  app.get("/api/admin/followup-requests", adminAuth, async (_req: Request, res: Response) => {
    try {
      const requests = await getAllFollowUpRequests();
      return res.json(requests);
    } catch (err) {
      console.error("[Admin] Failed to get follow-up requests:", err);
      return res.status(500).json({ error: "Failed to get follow-up requests" });
    }
  });

  // 11. Admin Waitlist
  app.get("/api/admin/waitlist", adminAuth, async (_req: Request, res: Response) => {
    try {
      const entries = await getAllWaitlist();
      return res.json(entries);
    } catch (err) {
      console.error("[Admin] Failed to get waitlist:", err);
      return res.status(500).json({ error: "Failed to get waitlist" });
    }
  });

  // 12. Admin CSV Export
  app.get("/api/admin/export/:type", adminAuth, async (req: Request, res: Response) => {
    try {
      const { type } = req.params;
      let data: Record<string, any>[] = [];
      let filename = "";

      switch (type) {
        case "quiz":
          data = await getAllQuizSubmissions();
          filename = "quiz-submissions.csv";
          break;
        case "followup":
          data = await getAllFollowUpRequests();
          filename = "followup-requests.csv";
          break;
        case "waitlist":
          data = await getAllWaitlist();
          filename = "waitlist.csv";
          break;
        default:
          return res.status(400).json({ error: "Invalid export type" });
      }

      if (data.length === 0) {
        return res.status(404).json({ error: "No data to export" });
      }

      // Build CSV
      const headers = Object.keys(data[0]);
      const csvRows = [headers.join(",")];
      for (const row of data) {
        const values = headers.map(h => {
          const val = (row as any)[h];
          if (val === null || val === undefined) return "";
          const str = String(val);
          // Escape CSV values
          if (str.includes(",") || str.includes('"') || str.includes("\n")) {
            return `"${str.replace(/"/g, '""')}"`;
          }
          return str;
        });
        csvRows.push(values.join(","));
      }

      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
      return res.send(csvRows.join("\n"));
    } catch (err) {
      console.error("[Admin] Failed to export:", err);
      return res.status(500).json({ error: "Failed to export data" });
    }
  });

  // 13. Analytics Pageview
  app.post("/api/analytics/pageview", async (req: Request, res: Response) => {
    try {
      const { page, referrer, utmSource, utmMedium, utmCampaign } = req.body;
      if (!page) {
        return res.status(400).json({ error: "Page is required" });
      }
      await recordPageview({
        page,
        referrer: referrer || null,
        utmSource: utmSource || null,
        utmMedium: utmMedium || null,
        utmCampaign: utmCampaign || null,
      });
      return res.json({ success: true });
    } catch (err) {
      // Don't fail the request for analytics
      return res.json({ success: true });
    }
  });

  // ─── tRPC API ─────────────────────────────────────────────────────────────
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  // ─── Static / Vite ────────────────────────────────────────────────────────
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
