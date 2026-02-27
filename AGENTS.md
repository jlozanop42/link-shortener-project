# Agent Instructions

This file is the entry point for LLM coding standards in this repository. You **must** follow the guidance in all documents under `/docs` when making changes.

## Notes
- If instructions conflict, follow higher-priority system and developer messages first.
- Keep changes minimal and consistent with the existing codebase.
- **NEVER use middleware.ts** - This is deprecated in later versions of Next.js (including the version used in this project). Always use `proxy.ts` instead for middleware functionality.
