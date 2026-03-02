import { NextResponse } from 'next/server';
import { findUserById } from '@/lib/store';

export async function GET(request) {
  const userId = request.headers.get('x-user-id');
  if (!userId) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  const u = findUserById(userId);
  if (!u) return NextResponse.json({ message: 'User not found' }, { status: 404 });
  return NextResponse.json({ id: u.id, email: u.email, role: u.role, profile: u.profile });
}

export async function PUT(request) {
  const userId = request.headers.get('x-user-id');
  if (!userId) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  const u = findUserById(userId);
  if (!u) return NextResponse.json({ message: 'User not found' }, { status: 404 });
  const body = await request.json();
  u.profile = { ...u.profile, ...body.profile };
  return NextResponse.json({ profile: u.profile });
}
