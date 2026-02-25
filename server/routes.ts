import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProjectSchema, insertBlogPostSchema, insertMessageSchema, insertAboutPageSchema, insertAboutCardSchema, insertSocialLinkSchema } from "@shared/schema";
import { z } from "zod";
import { uploadRouter } from "./uploads";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // ── Projects ──
  app.get("/api/projects", async (_req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.get("/api/projects/:id", async (req, res) => {
    const project = await storage.getProject(Number(req.params.id));
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  });

  app.post("/api/projects", async (req, res) => {
    const parsed = insertProjectSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Invalid data", errors: parsed.error.flatten() });
    const project = await storage.createProject(parsed.data);
    res.status(201).json(project);
  });

  app.patch("/api/projects/:id", async (req, res) => {
    const id = Number(req.params.id);
    const updated = await storage.updateProject(id, req.body);
    if (!updated) return res.status(404).json({ message: "Project not found" });
    res.json(updated);
  });

  app.delete("/api/projects/:id", async (req, res) => {
    const deleted = await storage.deleteProject(Number(req.params.id));
    if (!deleted) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Deleted" });
  });

  // ── Blog Posts ──
  app.get("/api/blog-posts", async (_req, res) => {
    const posts = await storage.getBlogPosts();
    res.json(posts);
  });

  app.get("/api/blog-posts/:id", async (req, res) => {
    const post = await storage.getBlogPost(Number(req.params.id));
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  });

  app.post("/api/blog-posts", async (req, res) => {
    const parsed = insertBlogPostSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Invalid data", errors: parsed.error.flatten() });
    const post = await storage.createBlogPost(parsed.data);
    res.status(201).json(post);
  });

  app.patch("/api/blog-posts/:id", async (req, res) => {
    const id = Number(req.params.id);
    const updated = await storage.updateBlogPost(id, req.body);
    if (!updated) return res.status(404).json({ message: "Post not found" });
    res.json(updated);
  });

  app.delete("/api/blog-posts/:id", async (req, res) => {
    const deleted = await storage.deleteBlogPost(Number(req.params.id));
    if (!deleted) return res.status(404).json({ message: "Post not found" });
    res.json({ message: "Deleted" });
  });

  // ── Messages ──
  app.get("/api/messages", async (_req, res) => {
    const msgs = await storage.getMessages();
    res.json(msgs);
  });

  app.post("/api/messages", async (req, res) => {
    const parsed = insertMessageSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Invalid data", errors: parsed.error.flatten() });
    const msg = await storage.createMessage(parsed.data);
    res.status(201).json(msg);
  });

  app.patch("/api/messages/:id/read", async (req, res) => {
    const updated = await storage.markMessageAsRead(Number(req.params.id));
    if (!updated) return res.status(404).json({ message: "Message not found" });
    res.json(updated);
  });

  app.delete("/api/messages/:id", async (req, res) => {
    const deleted = await storage.deleteMessage(Number(req.params.id));
    if (!deleted) return res.status(404).json({ message: "Message not found" });
    res.json({ message: "Deleted" });
  });

  // ── About Page ──
  app.get("/api/about", async (_req, res) => {
    const page = await storage.getAboutPage();
    res.json(page || null);
  });

  app.put("/api/about", async (req, res) => {
    const parsed = insertAboutPageSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Invalid data", errors: parsed.error.flatten() });
    const page = await storage.updateAboutPage(parsed.data);
    res.json(page);
  });

  // ── About Cards ──
  app.get("/api/about-cards", async (_req, res) => {
    const cards = await storage.getAboutCards();
    res.json(cards);
  });

  app.post("/api/about-cards", async (req, res) => {
    const parsed = insertAboutCardSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Invalid data", errors: parsed.error.flatten() });
    const card = await storage.createAboutCard(parsed.data);
    res.status(201).json(card);
  });

  app.patch("/api/about-cards/:id", async (req, res) => {
    const updated = await storage.updateAboutCard(Number(req.params.id), req.body);
    if (!updated) return res.status(404).json({ message: "Card not found" });
    res.json(updated);
  });

  app.delete("/api/about-cards/:id", async (req, res) => {
    const deleted = await storage.deleteAboutCard(Number(req.params.id));
    if (!deleted) return res.status(404).json({ message: "Card not found" });
    res.json({ message: "Deleted" });
  });

  // ── Social Links ──
  app.get("/api/social-links", async (_req, res) => {
    const links = await storage.getSocialLinks();
    res.json(links);
  });

  app.post("/api/social-links", async (req, res) => {
    const parsed = insertSocialLinkSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Invalid data", errors: parsed.error.flatten() });
    const link = await storage.createSocialLink(parsed.data);
    res.status(201).json(link);
  });

  app.patch("/api/social-links/:id", async (req, res) => {
    const updated = await storage.updateSocialLink(Number(req.params.id), req.body);
    if (!updated) return res.status(404).json({ message: "Link not found" });
    res.json(updated);
  });

  app.delete("/api/social-links/:id", async (req, res) => {
    const deleted = await storage.deleteSocialLink(Number(req.params.id));
    if (!deleted) return res.status(404).json({ message: "Link not found" });
    res.json({ message: "Deleted" });
  });

  // ── File Upload (Local) ──
  app.use(uploadRouter);

  // ── Settings (CV, etc.) ──
  const allowedSettingsKeys = ["cv_url"];

  app.get("/api/settings/:key", async (req, res) => {
    const { key } = req.params;
    if (!allowedSettingsKeys.includes(key)) {
      return res.status(400).json({ message: "Invalid setting key" });
    }
    const value = await storage.getSetting(key);
    res.json({ value });
  });

  app.put("/api/settings/:key", async (req, res) => {
    const { key } = req.params;
    if (!allowedSettingsKeys.includes(key)) {
      return res.status(400).json({ message: "Invalid setting key" });
    }
    const { value } = req.body;
    if (value === undefined) return res.status(400).json({ message: "Missing value" });
    await storage.setSetting(key, value);
    res.json({ success: true });
  });

  // ── Auth ──
  app.post("/api/auth/login", async (req, res) => {
    const { password } = req.body;
    const isValid = await storage.verifyAdminPassword(password);
    if (isValid) {
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false, message: "Invalid password" });
    }
  });

  app.post("/api/auth/change-password", async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }
    const isValid = await storage.verifyAdminPassword(currentPassword);
    if (!isValid) {
      return res.status(401).json({ success: false, message: "Current password is incorrect" });
    }
    if (newPassword.length < 4) {
      return res.status(400).json({ success: false, message: "Password too short" });
    }
    await storage.setAdminPassword(newPassword);
    res.json({ success: true });
  });

  return httpServer;
}
