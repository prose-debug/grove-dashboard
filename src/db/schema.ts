import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core';

export const learnings = sqliteTable('learnings', {
  number: integer('number').primaryKey(),
  title: text('title').notNull(),
  summary: text('summary'),
  content: text('content'),
  category: text('category'),
  tags: text('tags'), // JSON array string
  quality_score: real('quality_score'),
  applies_to: text('applies_to'),
  created_at: text('created_at'),
  updated_at: text('updated_at'),
});

export type Learning = typeof learnings.$inferSelect;
export type NewLearning = typeof learnings.$inferInsert;
