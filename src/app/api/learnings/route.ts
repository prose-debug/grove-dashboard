import { db } from '@/db';
import { learnings } from '@/db/schema';
import { like, eq, and, sql } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const q = searchParams.get('q') || '';
    const category = searchParams.get('category') || '';
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // For simplicity, fetch all learnings and filter in JavaScript
    // In production, use raw SQL with proper FTS indexing
    const allLearnings = await db.select().from(learnings);

    let results = allLearnings;

    if (q) {
      const queryLower = q.toLowerCase();
      results = results.filter(
        (l: any) =>
          (l.title?.toLowerCase().includes(queryLower) || false) ||
          (l.summary?.toLowerCase().includes(queryLower) || false)
      );
    }

    if (category) {
      results = results.filter((l: any) => l.category === category);
    }

    // Apply pagination
    const paginatedResults = results.slice(offset, offset + limit);

    return NextResponse.json({
      results: paginatedResults,
      total: results.length,
      limit,
      offset,
    });
  } catch (error) {
    console.error('Error fetching learnings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch learnings' },
      { status: 500 }
    );
  }
}
