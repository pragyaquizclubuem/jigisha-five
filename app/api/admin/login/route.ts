import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminUsername || !adminPassword) {
      console.error('⚠️ ADMIN_USERNAME or ADMIN_PASSWORD is not set in the environment variables.');
      return NextResponse.json({ message: 'Authentication is currently disabled due to server misconfiguration.' }, { status: 500 });
    }

    if (username === adminUsername && password === adminPassword) {
      return NextResponse.json({ success: true, message: 'Authenticated successfully' });
    }

    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
