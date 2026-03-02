import { NextResponse } from 'next/server';
import { createReview, findBookingById } from '@/lib/store';

export async function POST(request) {
  try {
    const userId = request.headers.get('x-user-id');
    if (!userId) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    const body = await request.json();
    const booking = findBookingById(body.bookingId);
    if (!booking) return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
    if (booking.customerId !== Number(userId)) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }
    const review = createReview({
      bookingId: booking.id,
      customerId: Number(userId),
      vehicleId: booking.vehicleId,
      rating: body.rating ?? 5,
      comment: body.comment || '',
    });
    return NextResponse.json(review, { status: 201 });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
