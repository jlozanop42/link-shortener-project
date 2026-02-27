---
description: Read this before creating or modifying server actions. This file outlines the rules and guidelines for implementing server actions in this application.
---

# Server Actions Instructions

## Core Principles

All data mutations in this application **MUST** be done via server actions.

## File Structure

- Server action files **MUST** be named `action.ts`
- Server action files **MUST** be colocated in the directory of the component that calls them
- Example: If `app/dashboard/links/create-link-form.tsx` calls a server action, the action file should be at `app/dashboard/links/action.ts`

## Server Action Implementation

### 1. Type Safety
- All data passed to server actions **MUST** have appropriate TypeScript types
- **DO NOT** use the `FormData` TypeScript type
- Define explicit interfaces or types for action parameters

### 2. Data Validation
- All data **MUST** be validated using Zod schemas
- Validation should happen at the beginning of the server action
- Return appropriate error messages if validation fails

### 3. Authentication
- All server actions **MUST** check for a logged-in user before continuing with database operations
- Use Clerk's authentication methods to verify the user session
- Return an error if the user is not authenticated

### 4. Database Operations
- Server actions **MUST NOT** directly use drizzle queries
- Database operations **MUST** be done via helper functions that wrap drizzle queries
- These helper functions are located in the `/data` directory
- Import and use these helper functions from the `/data` directory in your server actions

### 5. Client Components
- Server actions **MUST** be called from client components
- Use the `"use client"` directive in components that call server actions

### 6. Error Handling
- Server actions **MUST NOT** throw errors
- Instead, return an object with either an `error` or `success` property
- Use a consistent return type structure across all server actions
- Example return types:
  - Success: `{ success: true, data: T }`
  - Error: `{ error: string }` or `{ error: string, details?: any }`

## Example Structure

```typescript
// app/dashboard/links/action.ts
'use server'

import { z } from 'zod'
import { auth } from '@clerk/nextjs/server'
import { createLink } from '@/data/links'

const createLinkSchema = z.object({
  url: z.string().url(),
  slug: z.string().min(1),
})

type CreateLinkInput = z.infer<typeof createLinkSchema>

export async function createLinkAction(input: CreateLinkInput) {
  // 1. Check authentication
  const { userId } = await auth()
  if (!userId) {
    return { error: 'Unauthorized' }
  }

  // 2. Validate input
  const validationResult = createLinkSchema.safeParse(input)
  if (!validationResult.success) {
    return { error: 'Invalid input', details: validationResult.error }
  }

  // 3. Use helper function from /data
  try {
    const link = await createLink({
      userId,
      ...validationResult.data,
    })
    return { success: true, data: link }
  } catch (error) {
    return { error: 'Failed to create link' }
  }
}
```

## Key Requirements Checklist

- [ ] File named `action.ts`
- [ ] Colocated with component
- [ ] Uses explicit TypeScript types (not FormData)
- [ ] Validates data with Zod
- [ ] Checks authentication first
- [ ] Uses helper functions from `/data` directory
- [ ] Never uses drizzle queries directly
- [ ] Called from client components
