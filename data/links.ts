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

/**
 * Update an existing link
 * @param linkId - The ID of the link to update
 * @param userId - The Clerk user ID (for authorization)
 * @param data - The updated link data
 * @returns The updated link or null if not found or unauthorized
 */
export async function updateLink(
  linkId: number,
  userId: string,
  data: { originalUrl?: string; shortCode?: string }
) {
  const [link] = await db
    .update(links)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(links.id, linkId))
    .returning();
  
  // Verify ownership
  if (!link || link.userId !== userId) {
    return null;
  }
  
  return link;
}

/**
 * Get a link by its short code
 * @param shortCode - The short code to look up
 * @returns The link or null if not found
 */
export async function getLinkByShortCode(shortCode: string) {
  const [link] = await db
    .select()
    .from(links)
    .where(eq(links.shortCode, shortCode))
    .limit(1);
  
  return link || null;
}

/**
 * Delete a link
 * @param linkId - The ID of the link to delete
 * @param userId - The Clerk user ID (for authorization)
 * @returns True if deleted, false if not found or unauthorized
 */
export async function deleteLink(linkId: number, userId: string) {
  const [link] = await db
    .delete(links)
    .where(eq(links.id, linkId))
    .returning();
  
  // Verify ownership
  if (!link || link.userId !== userId) {
    return false;
  }
  
  return true;
}
