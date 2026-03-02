import { NextResponse } from 'next/server';
import { findUserById, verifyUser } from '@/lib/store';

export async function POST(request, { params }) {
  const role = request.headers.get('x-role') || '';
  if (role !== 'admin') return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  const u = verifyUser(params.id);
  if (!u) return NextResponse.json({ message: 'User not found' }, { status: 404 });
  return NextResponse.json({ id: u.id, verified: u.verified });
}
