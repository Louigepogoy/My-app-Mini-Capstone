import { NextResponse } from 'next/server';
import { users } from '@/lib/store';

export async function GET(request) {
  const role = request.headers.get('x-role') || '';
  if (role !== 'admin') {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }
  const safe = users.map((u) => ({
    id: u.id,
    email: u.email,
    role: u.role,
    verified: u.verified,
    suspended: u.suspended,
  }));
  return NextResponse.json(safe);
}
