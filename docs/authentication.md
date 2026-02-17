# Authentication

## Overview
This application uses **Clerk** for all authentication and authorization. No other authentication methods should be implemented.

## Rules

### Authentication Provider
- **ONLY** use Clerk for authentication
- Never implement custom auth logic (JWT, sessions, passwords, etc.)
- Sign-in and sign-up flows must redirect to Clerk-hosted URLs
- Sign-in and sign-up open a Clerk-hosted page in the same browser tab (no modal)

### Protected Routes
- `/dashboard` is a protected route requiring authentication
- Users must be logged in to access `/dashboard`
- Redirect unauthenticated users attempting to access protected routes to Clerk sign-in

### Route Redirects
- If an authenticated user accesses the homepage (`/`), redirect them to `/dashboard`
- After successful authentication, redirect users to `/dashboard`

## Implementation Guidelines
- Use Clerk's Next.js SDK and middleware for route protection
- Leverage Clerk components for sign-in/sign-up UI
- Use Clerk's session management - do not create custom session handling

## DO NOT
- ❌ Implement custom authentication (no JWT, bcrypt, password hashing, etc.)
- ❌ Create custom login/signup forms that bypass Clerk
- ❌ Store passwords or credentials in the database
- ❌ Use third-party auth libraries (Passport.js, NextAuth, Auth0, etc.)
- ❌ Build custom session management or token handling
- ❌ Create custom middleware for auth when Clerk provides it
- ❌ Implement custom OAuth flows - use Clerk's social connections

## Best Practices
- Use `clerkMiddleware()` in middleware.ts for route protection
- Access user data with `auth()` in Server Components and Route Handlers
- Use `useAuth()` and `useUser()` hooks in Client Components
- Protect API routes using Clerk's authentication helpers
- Check `userId` from `auth()` to verify authentication status
- Use Clerk's `<SignedIn>` and `<SignedOut>` components for conditional rendering
- Keep Clerk keys in environment variables (never commit them)
- Use Clerk's webhooks for user event handling (creation, updates, deletion)
