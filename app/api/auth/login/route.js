import { NextResponse } from 'next/server';
import { findUserByEmail } from '@/lib/store';

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }
    const user = findUserByEmail(email);
    if (!user || user.password !== password) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }
    if (user.suspended) {
      return NextResponse.json({ message: 'Account is suspended' }, { status: 403 });
    }
    return NextResponse.json({
      userId: user.id,
      email: user.email,
      role: user.role,
      verified: user.verified,
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Login failed', error: error.message },
      { status: 500 }
    );
  }
}
