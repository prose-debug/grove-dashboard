import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema';

// Connect to the learnings database in cory-learnings/
const sqlite = new Database('/Users/microwave/Desktop/grove/cory-learnings/learnings.db', {
  readonly: true, // Read-only access to the learnings database
});

export const db = drizzle(sqlite, { schema });

export type DB = typeof db;
