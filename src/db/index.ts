import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema';

let sqlite: Database.Database | null = null;
let dbInstance: any = null;

function getDb() {
  if (!dbInstance) {
    if (!sqlite) {
      sqlite = new Database('/Users/microwave/Desktop/grove/cory-learnings/learnings.db', {
        readonly: true, // Read-only access to the learnings database
      });
    }
    dbInstance = drizzle(sqlite, { schema });
  }
  return dbInstance;
}

// Lazy export - only initializes when accessed
export const db = new Proxy({}, {
  get: (target, prop) => {
    const instance = getDb();
    return (instance as any)[prop];
  },
}) as any;

export type DB = ReturnType<typeof getDb>;
