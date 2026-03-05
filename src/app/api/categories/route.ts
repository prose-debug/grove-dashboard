import { db } from '@/db';
import { learnings } from '@/db/schema';
import { sql } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const result = await db
      .select({ category: learnings.category })
      .from(learnings)
      .where(sql`${learnings.category} IS NOT NULL`)
      .groupBy(learnings.category);

    const categories = result
      .map((r: any) => r.category)
      .filter((c: any) => c !== null && c !== undefined && c !== '')
      .sort();

    return NextResponse.json({ categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}
