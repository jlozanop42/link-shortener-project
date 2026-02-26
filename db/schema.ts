import { pgTable, integer, varchar, text, timestamp } from 'drizzle-orm/pg-core';

export const links = pgTable('links', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  userId: varchar('user_id', { length: 255 }).notNull(),
  originalUrl: text('original_url').notNull(),
  shortCode: varchar('short_code', { length: 20 }).notNull().unique(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// TypeScript types inferred from the schema
export type Link = typeof links.$inferSelect;
export type NewLink = typeof links.$inferInsert;
