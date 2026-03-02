import { NextResponse } from 'next/server';
import { findBookingById, updateBooking } from '@/lib/store';

export async function GET(request, { params }) {
  const b = findBookingById(params.id);
  if (!b) return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
  return NextResponse.json(b);
}

export async function PATCH(request, { params }) {
  const userId = request.headers.get('x-user-id');
  const role = request.headers.get('x-role') || '';
  const b = findBookingById(params.id);
  if (!b) return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
  const body = await request.json();
  if (body.cancel) {
    if (b.customerId !== Number(userId) && role !== 'admin') {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }
    updateBooking(b.id, { status: 'cancelled' });
  }
  const updated = findBookingById(params.id);
  return NextResponse.json(updated);
}
