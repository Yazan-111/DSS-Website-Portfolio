import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  /* ── POST /api/contact ── */
  app.post("/api/contact", async (req, res) => {
    const parsed = insertContactSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "بيانات غير صالحة", details: parsed.error.flatten() });
    }
    const submission = await storage.createContactSubmission(parsed.data);
    return res.status(201).json(submission);
  });

  /* ── GET /api/contact (admin view) ── */
  app.get("/api/contact", async (_req, res) => {
    const submissions = await storage.getContactSubmissions();
    return res.json(submissions);
  });

  return httpServer;
}
