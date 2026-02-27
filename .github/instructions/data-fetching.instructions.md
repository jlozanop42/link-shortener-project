---
description: Read this file to understand how to fetch data in this project.
---
# Data Fetching Guidelines
This document outlines the best practices for fetching data in this project. Follow these guidelines to ensure consistency, performance, and maintainability across the codebase.

## 1. Use server components for data fetching

In next.js, ALWAYS use server components for data fetching. NEVER use client components for data fetching.

## 2. Data fetching methods

ALWAYS use the helper functions in the /data directory to fetch data. NEVER fetch data directly in your components. This ensures that all data fetching logic is centralized and reusable.

ALL helper functions in the /data directory should use Drizzle ORM for database interactions. NEVER use raw SQL queries or other database libraries.