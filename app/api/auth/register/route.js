import { NextResponse } from 'next/server';
import { createUser, findUserByEmail } from '@/lib/store';

export async function POST(request) {
  try {
    const { email, password, role } = await request.json();
    if (!email || !password || !role) {
      return NextResponse.json(
        { message: 'Email, password, and role are required' },
        { status: 400 }
      );
    }
    if (findUserByEmail(email)) {
      return NextResponse.json({ message: 'Email already registered' }, { status: 400 });
    }
    const normalizedRole = ['customer', 'owner', 'admin'].includes(role) ? role : 'customer';
    const user = createUser({ email, password, role: normalizedRole });
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to register', error: error.message },
      { status: 500 }
    );
  }
}
