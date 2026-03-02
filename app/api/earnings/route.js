import { NextResponse } from 'next/server';
import { bookings } from '@/lib/store';

export async function GET(request) {
  const userId = request.headers.get('x-user-id');
  const role = request.headers.get('x-role') || '';
  if (role !== 'owner' && role !== 'admin') {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }
  const list = bookings.filter(
    (b) => b.ownerId === Number(userId) || role === 'admin'
  );
  const approved = list.filter((b) => b.status === 'approved' && b.paid);
  const total = approved.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
  return NextResponse.json({ total, count: approved.length });
}
