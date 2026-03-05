import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const BRANDING_FILE = path.join(process.cwd(), 'src/data/branding-config.json');

export async function GET() {
  try {
    const data = fs.readFileSync(BRANDING_FILE, 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading branding:', error);
    return NextResponse.json({ error: 'Failed to read branding' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const config = await request.json();
    fs.writeFileSync(BRANDING_FILE, JSON.stringify(config, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving branding:', error);
    return NextResponse.json({ error: 'Failed to save branding' }, { status: 500 });
  }
}
