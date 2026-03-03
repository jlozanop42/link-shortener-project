'use server'

import { z } from 'zod'
import { auth } from '@clerk/nextjs/server'
import { createLink, updateLink, deleteLink } from '@/data/links'
import type { Link } from '@/db/schema'

/**
 * Generate a random short code
 */
function generateShortCode(): string {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const length = 8
  let result = ''
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

const createLinkSchema = z.object({
  originalUrl: z.string().url({ message: 'Please enter a valid URL' }),
  shortCode: z.string()
    .min(3, { message: 'Short code must be at least 3 characters' })
    .max(20, { message: 'Short code must be at most 20 characters' })
    .regex(/^[a-zA-Z0-9_-]+$/, { message: 'Short code can only contain letters, numbers, hyphens, and underscores' })
    .optional(),
})

type CreateLinkInput = z.infer<typeof createLinkSchema>

type ActionResult = 
  | { success: true; data: Link }
  | { error: string }

export async function createLinkAction(input: CreateLinkInput): Promise<ActionResult> {
  // 1. Check authentication
  const { userId } = await auth()
  if (!userId) {
    return { error: 'Unauthorized. Please sign in to create links.' }
  }

  // 2. Validate input
  const validationResult = createLinkSchema.safeParse(input)
  if (!validationResult.success) {
    const firstError = validationResult.error.issues[0]
    return { error: firstError.message }
  }

  // 3. Generate short code if not provided
  const shortCode = validationResult.data.shortCode || generateShortCode()

  // 4. Use helper function from /data
  try {
    const link = await createLink({
      userId,
      originalUrl: validationResult.data.originalUrl,
      shortCode,
    })
    return { success: true, data: link }
  } catch (error) {
    // Check for unique constraint violation (duplicate short code)
    if (error instanceof Error && error.message.includes('unique')) {
      // If auto-generated code conflicts, try again with new code
      if (!validationResult.data.shortCode) {
        const newShortCode = generateShortCode()
        try {
          const link = await createLink({
            userId,
            originalUrl: validationResult.data.originalUrl,
            shortCode: newShortCode,
          })
          return { success: true, data: link }
        } catch {
          return { error: 'Failed to create link. Please try again.' }
        }
      }
      return { error: 'This short code is already taken. Please choose another one.' }
    }
    return { error: 'Failed to create link. Please try again.' }
  }
}

const updateLinkSchema = z.object({
  id: z.number(),
  originalUrl: z.string().url({ message: 'Please enter a valid URL' }),
  shortCode: z.string()
    .min(3, { message: 'Short code must be at least 3 characters' })
    .max(20, { message: 'Short code must be at most 20 characters' })
    .regex(/^[a-zA-Z0-9_-]+$/, { message: 'Short code can only contain letters, numbers, hyphens, and underscores' }),
})

type UpdateLinkInput = z.infer<typeof updateLinkSchema>

export async function updateLinkAction(input: UpdateLinkInput): Promise<ActionResult> {
  // 1. Check authentication
  const { userId } = await auth()
  if (!userId) {
    return { error: 'Unauthorized. Please sign in to update links.' }
  }

  // 2. Validate input
  const validationResult = updateLinkSchema.safeParse(input)
  if (!validationResult.success) {
    const firstError = validationResult.error.issues[0]
    return { error: firstError.message }
  }

  // 3. Use helper function from /data
  try {
    const link = await updateLink(
      validationResult.data.id,
      userId,
      {
        originalUrl: validationResult.data.originalUrl,
        shortCode: validationResult.data.shortCode,
      }
    )
    
    if (!link) {
      return { error: 'Link not found or you do not have permission to update it.' }
    }
    
    return { success: true, data: link }
  } catch (error) {
    // Check for unique constraint violation (duplicate short code)
    if (error instanceof Error && error.message.includes('unique')) {
      return { error: 'This short code is already taken. Please choose another one.' }
    }
    return { error: 'Failed to update link. Please try again.' }
  }
}

const deleteLinkSchema = z.object({
  id: z.number(),
})

type DeleteLinkInput = z.infer<typeof deleteLinkSchema>

type DeleteActionResult = 
  | { success: true }
  | { error: string }

export async function deleteLinkAction(input: DeleteLinkInput): Promise<DeleteActionResult> {
  // 1. Check authentication
  const { userId } = await auth()
  if (!userId) {
    return { error: 'Unauthorized. Please sign in to delete links.' }
  }

  // 2. Validate input
  const validationResult = deleteLinkSchema.safeParse(input)
  if (!validationResult.success) {
    return { error: 'Invalid link ID.' }
  }

  // 3. Use helper function from /data
  try {
    const deleted = await deleteLink(validationResult.data.id, userId)
    
    if (!deleted) {
      return { error: 'Link not found or you do not have permission to delete it.' }
    }
    
    return { success: true }
  } catch (error) {
    return { error: 'Failed to delete link. Please try again.' }
  }
}
