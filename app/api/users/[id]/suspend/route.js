import { NextResponse } from 'next/server';
import { findUserById, suspendUser, unsuspendUser } from '@/lib/store';

export async function POST(request, { params }) {
  const role = request.headers.get('x-role') || '';
  if (role !== 'admin') return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  const body = await request.json().catch(() => ({}));
  const u = body.unsuspend ? unsuspendUser(params.id) : suspendUser(params.id);
  if (!u) return NextResponse.json({ message: 'User not found' }, { status: 404 });
  return NextResponse.json({ id: u.id, suspended: u.suspended });
}
