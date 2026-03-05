import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Get credentials from environment variables
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@montereybayaquarium.org';
    const adminPassword = process.env.ADMIN_PASSWORD || 'monterey-ocean-healing-2026';

    // Validate credentials
    if (email !== adminEmail || password !== adminPassword) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Create response with auth cookie
    const response = NextResponse.json(
      { message: 'Login successful' },
      { status: 200 }
    );

    // Set simple token cookie (in production, use JWT)
    const token = process.env.ADMIN_TOKEN || 'monterey-admin-token-2026';
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 86400 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'An error occurred during login' },
      { status: 500 }
    );
  }
}
