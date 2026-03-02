import { NextResponse } from 'next/server';
import { findBookingById, updateBooking } from '@/lib/store';

export async function POST(request, { params }) {
  const userId = request.headers.get('x-user-id');
  const role = request.headers.get('x-role') || '';
  const b = findBookingById(params.id);
  if (!b) return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
  if (role !== 'admin' && b.ownerId !== Number(userId)) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }
  updateBooking(b.id, { status: 'approved' });
  return NextResponse.json(findBookingById(params.id));
}
