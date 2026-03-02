import { db } from "@/db";
import { links, type NewLink } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

/**
 * Get all links for a specific user
 * @param userId - The Clerk user ID
 * @returns Array of links ordered by creation date (newest first)
 */
export async function getUserLinks(userId: string) {
  return await db
    .select()
    .from(links)
    .where(eq(links.userId, userId))
    .orderBy(desc(links.createdAt));
}

/**
 * Create a new shortened link
 * @param data - The link data (userId, originalUrl, shortCode)
 * @returns The created link
 */
export async function createLink(data: NewLink) {
  const [link] = await db
    .insert(links)
    .values(data)
    .returning();
  return link;
}
