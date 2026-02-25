import { sql } from "drizzle-orm";
import { pgTable, text, varchar, boolean, timestamp, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  titleEn: text("title_en").notNull(),
  description: text("description").notNull(),
  descriptionEn: text("description_en").notNull(),
  image: text("image").notNull(),
  tags: text("tags").array().notNull(),
  demoUrl: text("demo_url"),
  repoUrl: text("repo_url"),
  filesUrl: text("files_url"),
  videoUrl: text("video_url"),
  authorUrl: text("author_url"),
  featured: boolean("featured").default(false).notNull(),
});

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  titleEn: text("title_en").notNull(),
  excerpt: text("excerpt").notNull(),
  excerptEn: text("excerpt_en").notNull(),
  image: text("image"),
  date: text("date").notNull(),
  dateEn: text("date_en").notNull(),
  readTime: text("read_time").notNull(),
  readTimeEn: text("read_time_en").notNull(),
  category: text("category").notNull(),
  categoryEn: text("category_en").notNull(),
  featured: boolean("featured").default(false).notNull(),
});

export const adminSettings = pgTable("admin_settings", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  value: text("value").notNull(),
});

export const aboutPage = pgTable("about_page", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  titleEn: text("title_en").notNull(),
  description: text("description").notNull(),
  descriptionEn: text("description_en").notNull(),
  whoTitle: text("who_title").notNull(),
  whoTitleEn: text("who_title_en").notNull(),
  whoContent: text("who_content").notNull(),
  whoContentEn: text("who_content_en").notNull(),
  whyTitle: text("why_title").notNull(),
  whyTitleEn: text("why_title_en").notNull(),
});

export const aboutCards = pgTable("about_cards", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  titleEn: text("title_en").notNull(),
  description: text("description").notNull(),
  descriptionEn: text("description_en").notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
});

export const socialLinks = pgTable("social_links", {
  id: serial("id").primaryKey(),
  platform: text("platform").notNull(),
  url: text("url").notNull(),
  visible: boolean("visible").default(true).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  purpose: text("purpose").notNull(),
  message: text("message").notNull(),
  read: boolean("read").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
});

export const insertAboutPageSchema = createInsertSchema(aboutPage).omit({
  id: true,
});

export const insertAboutCardSchema = createInsertSchema(aboutCards).omit({
  id: true,
});

export const insertMessageSchema = createInsertSchema(messages).omit({
  id: true,
  read: true,
  createdAt: true,
});

export const insertSocialLinkSchema = createInsertSchema(socialLinks).omit({
  id: true,
});

export const insertAdminSettingsSchema = createInsertSchema(adminSettings).omit({
  id: true,
});

// Types
export type InsertAdminSettings = z.infer<typeof insertAdminSettingsSchema>;
export type AdminSettings = typeof adminSettings.$inferSelect;

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;

export type InsertAboutPage = z.infer<typeof insertAboutPageSchema>;
export type AboutPage = typeof aboutPage.$inferSelect;

export type InsertAboutCard = z.infer<typeof insertAboutCardSchema>;
export type AboutCard = typeof aboutCards.$inferSelect;

export type InsertSocialLink = z.infer<typeof insertSocialLinkSchema>;
export type SocialLink = typeof socialLinks.$inferSelect;

export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = typeof messages.$inferSelect;
