import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface VisitorData {
  emailSubscribers: Array<{
    id: string;
    email: string;
    name: string;
    timestamp: string;
    source: string;
    tier: number;
  }>;
  analytics: Record<string, any>;
  goals: Record<string, any>;
}

const VISITOR_DATA_FILE = path.join(process.cwd(), 'src/data/visitor-data.json');

export async function GET() {
  try {
    const data = fs.readFileSync(VISITOR_DATA_FILE, 'utf-8');
    const visitorData: VisitorData = JSON.parse(data);
    return NextResponse.json(visitorData.emailSubscribers);
  } catch (error) {
    console.error('Error reading subscribers:', error);
    return NextResponse.json([], { status: 500 });
  }
}
