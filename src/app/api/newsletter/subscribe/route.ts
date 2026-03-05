import { NextRequest, NextResponse } from 'next/server';
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

function readVisitorData(): VisitorData {
  try {
    const data = fs.readFileSync(VISITOR_DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return {
      emailSubscribers: [],
      analytics: {},
      goals: {},
    };
  }
}

function writeVisitorData(data: VisitorData): void {
  fs.writeFileSync(VISITOR_DATA_FILE, JSON.stringify(data, null, 2));
}

export async function POST(request: NextRequest) {
  try {
    const { name, email } = await request.json();

    // Validate input
    if (!name || !email) {
      return NextResponse.json(
        { message: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Read visitor data
    const visitorData = readVisitorData();

    // Check if already subscribed
    const existing = visitorData.emailSubscribers.find(
      (sub) => sub.email.toLowerCase() === email.toLowerCase()
    );

    if (existing) {
      return NextResponse.json(
        { message: 'This email is already subscribed' },
        { status: 409 }
      );
    }

    // Create new subscriber
    const newSubscriber = {
      id: `sub_${Date.now()}`,
      email: email.toLowerCase(),
      name: name.trim(),
      timestamp: new Date().toISOString(),
      source: 'dashboard-signup',
      tier: 1, // Start at Tier 1, can be promoted to Tier 2
    };

    // Add subscriber
    visitorData.emailSubscribers.push(newSubscriber);

    // Update analytics
    if (!visitorData.analytics) {
      visitorData.analytics = {};
    }
    visitorData.analytics.emailSignups = (visitorData.analytics.emailSignups || 0) + 1;

    // Update goals if tracking current count
    if (visitorData.goals && visitorData.goals.current_tier1_count !== undefined) {
      visitorData.goals.current_tier1_count += 1;
    }

    // Write back to file
    writeVisitorData(visitorData);

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully signed up!',
        subscriber: newSubscriber,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Newsletter signup error:', error);
    return NextResponse.json(
      { message: 'An error occurred during signup' },
      { status: 500 }
    );
  }
}
