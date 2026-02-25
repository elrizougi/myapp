import { eq, asc } from "drizzle-orm";
import { db } from "./db";
import bcrypt from "bcrypt";
import {
  users, projects, blogPosts, messages, adminSettings, aboutPage, aboutCards, socialLinks,
  type User, type InsertUser,
  type Project, type InsertProject,
  type BlogPost, type InsertBlogPost,
  type Message, type InsertMessage,
  type AboutPage, type InsertAboutPage,
  type AboutCard, type InsertAboutCard,
  type SocialLink, type InsertSocialLink,
} from "@shared/schema";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  getProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: number): Promise<boolean>;

  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: number): Promise<boolean>;

  getAboutPage(): Promise<AboutPage | undefined>;
  updateAboutPage(data: InsertAboutPage): Promise<AboutPage>;
  getAboutCards(): Promise<AboutCard[]>;
  createAboutCard(card: InsertAboutCard): Promise<AboutCard>;
  updateAboutCard(id: number, card: Partial<InsertAboutCard>): Promise<AboutCard | undefined>;
  deleteAboutCard(id: number): Promise<boolean>;

  getSocialLinks(): Promise<SocialLink[]>;
  createSocialLink(link: InsertSocialLink): Promise<SocialLink>;
  updateSocialLink(id: number, data: Partial<InsertSocialLink>): Promise<SocialLink | undefined>;
  deleteSocialLink(id: number): Promise<boolean>;

  verifyAdminPassword(password: string): Promise<boolean>;
  setAdminPassword(password: string): Promise<void>;

  getSetting(key: string): Promise<string | null>;
  setSetting(key: string, value: string): Promise<void>;

  getMessages(): Promise<Message[]>;
  getMessage(id: number): Promise<Message | undefined>;
  createMessage(message: InsertMessage): Promise<Message>;
  markMessageAsRead(id: number): Promise<Message | undefined>;
  deleteMessage(id: number): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(user: InsertUser): Promise<User> {
    const [created] = await db.insert(users).values(user).returning();
    return created;
  }

  async getProjects(): Promise<Project[]> {
    return db.select().from(projects);
  }

  async getProject(id: number): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project;
  }

  async createProject(project: InsertProject): Promise<Project> {
    const [created] = await db.insert(projects).values(project).returning();
    return created;
  }

  async updateProject(id: number, data: Partial<InsertProject>): Promise<Project | undefined> {
    const [updated] = await db.update(projects).set(data).where(eq(projects.id, id)).returning();
    return updated;
  }

  async deleteProject(id: number): Promise<boolean> {
    const result = await db.delete(projects).where(eq(projects.id, id)).returning();
    return result.length > 0;
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return db.select().from(blogPosts);
  }

  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post;
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const [created] = await db.insert(blogPosts).values(post).returning();
    return created;
  }

  async updateBlogPost(id: number, data: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const [updated] = await db.update(blogPosts).set(data).where(eq(blogPosts.id, id)).returning();
    return updated;
  }

  async deleteBlogPost(id: number): Promise<boolean> {
    const result = await db.delete(blogPosts).where(eq(blogPosts.id, id)).returning();
    return result.length > 0;
  }

  async getAboutPage(): Promise<AboutPage | undefined> {
    const [page] = await db.select().from(aboutPage);
    return page;
  }

  async updateAboutPage(data: InsertAboutPage): Promise<AboutPage> {
    const existing = await this.getAboutPage();
    if (existing) {
      const [updated] = await db.update(aboutPage).set(data).where(eq(aboutPage.id, existing.id)).returning();
      return updated;
    } else {
      const [created] = await db.insert(aboutPage).values(data).returning();
      return created;
    }
  }

  async getAboutCards(): Promise<AboutCard[]> {
    return db.select().from(aboutCards).orderBy(asc(aboutCards.sortOrder));
  }

  async createAboutCard(card: InsertAboutCard): Promise<AboutCard> {
    const [created] = await db.insert(aboutCards).values(card).returning();
    return created;
  }

  async updateAboutCard(id: number, data: Partial<InsertAboutCard>): Promise<AboutCard | undefined> {
    const [updated] = await db.update(aboutCards).set(data).where(eq(aboutCards.id, id)).returning();
    return updated;
  }

  async deleteAboutCard(id: number): Promise<boolean> {
    const result = await db.delete(aboutCards).where(eq(aboutCards.id, id)).returning();
    return result.length > 0;
  }

  async getSocialLinks(): Promise<SocialLink[]> {
    return db.select().from(socialLinks).orderBy(asc(socialLinks.sortOrder));
  }

  async createSocialLink(link: InsertSocialLink): Promise<SocialLink> {
    const [created] = await db.insert(socialLinks).values(link).returning();
    return created;
  }

  async updateSocialLink(id: number, data: Partial<InsertSocialLink>): Promise<SocialLink | undefined> {
    const [updated] = await db.update(socialLinks).set(data).where(eq(socialLinks.id, id)).returning();
    return updated;
  }

  async deleteSocialLink(id: number): Promise<boolean> {
    const result = await db.delete(socialLinks).where(eq(socialLinks.id, id)).returning();
    return result.length > 0;
  }

  async verifyAdminPassword(password: string): Promise<boolean> {
    const [setting] = await db.select().from(adminSettings).where(eq(adminSettings.key, "admin_password"));
    if (!setting) {
      return password === "admin";
    }
    if (setting.value.startsWith("$2")) {
      return bcrypt.compare(password, setting.value);
    }
    return password === setting.value;
  }

  async setAdminPassword(password: string): Promise<void> {
    const hashed = await bcrypt.hash(password, 10);
    const [existing] = await db.select().from(adminSettings).where(eq(adminSettings.key, "admin_password"));
    if (existing) {
      await db.update(adminSettings).set({ value: hashed }).where(eq(adminSettings.key, "admin_password"));
    } else {
      await db.insert(adminSettings).values({ key: "admin_password", value: hashed });
    }
  }

  async getSetting(key: string): Promise<string | null> {
    const [setting] = await db.select().from(adminSettings).where(eq(adminSettings.key, key));
    return setting?.value ?? null;
  }

  async setSetting(key: string, value: string): Promise<void> {
    const [existing] = await db.select().from(adminSettings).where(eq(adminSettings.key, key));
    if (existing) {
      await db.update(adminSettings).set({ value }).where(eq(adminSettings.key, key));
    } else {
      await db.insert(adminSettings).values({ key, value });
    }
  }

  async getMessages(): Promise<Message[]> {
    return db.select().from(messages);
  }

  async getMessage(id: number): Promise<Message | undefined> {
    const [msg] = await db.select().from(messages).where(eq(messages.id, id));
    return msg;
  }

  async createMessage(message: InsertMessage): Promise<Message> {
    const [created] = await db.insert(messages).values(message).returning();
    return created;
  }

  async markMessageAsRead(id: number): Promise<Message | undefined> {
    const [updated] = await db.update(messages).set({ read: true }).where(eq(messages.id, id)).returning();
    return updated;
  }

  async deleteMessage(id: number): Promise<boolean> {
    const result = await db.delete(messages).where(eq(messages.id, id)).returning();
    return result.length > 0;
  }
}

export const storage = new DatabaseStorage();
