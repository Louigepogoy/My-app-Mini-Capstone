import { NextResponse } from 'next/server';
import { findBookingById, updateBooking } from '@/lib/store';

export async function POST(request, { params }) {
  const userId = request.headers.get('x-user-id');
  const b = findBookingById(params.id);
  if (!b) return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
  if (b.customerId !== Number(userId)) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }
  updateBooking(b.id, { paid: true });
  return NextResponse.json(findBookingById(params.id));
}
