# Agent Instructions


# 🚨🚨🚨 CRITICAL: BEFORE YOU GENERATE ANY CODE 🚨🚨🚨

It is **INCREDIBLY IMPORTANT** to **ALWAYS** read the relevant individual instructions files within the `/docs` directory **before generating ANY code**. Failure to do so may result in incorrect, non-compliant, or rejected code changes.

This file is the entry point for LLM coding standards in this repository. You **must** follow the guidance in all documents under `/docs` when making changes.

**DO NOT SKIP THIS STEP.**

ALWAYS refer to the relevant .md file in `/docs` BEFORE generating any code:

## Documentation
- [Authentication](docs/authentication.md) - Clerk authentication rules and protected routes
- [UI Components](docs/ui-components.md) - shadcn/ui usage rules for all UI elements

## Notes
- If instructions conflict, follow higher-priority system and developer messages first.
- Keep changes minimal and consistent with the existing codebase.
- **NEVER use middleware.ts** - This is deprecated in later versions of Next.js (including the version used in this project). Always use `proxy.ts` instead for middleware functionality.
