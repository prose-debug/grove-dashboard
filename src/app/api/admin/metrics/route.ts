import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const METRICS_FILE = path.join(process.cwd(), 'src/data/metrics-config.json');

export async function GET() {
  try {
    const data = fs.readFileSync(METRICS_FILE, 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading metrics:', error);
    return NextResponse.json({ error: 'Failed to read metrics' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const config = await request.json();
    fs.writeFileSync(METRICS_FILE, JSON.stringify(config, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving metrics:', error);
    return NextResponse.json({ error: 'Failed to save metrics' }, { status: 500 });
  }
}
