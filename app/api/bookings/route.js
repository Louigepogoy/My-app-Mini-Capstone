import { NextResponse } from 'next/server';
import { bookings, vehicles, createBooking, findVehicleById } from '@/lib/store';

export async function GET(request) {
  const userId = request.headers.get('x-user-id');
  const role = request.headers.get('x-role') || '';
  let list = [...bookings];
  if (role === 'customer') list = list.filter((b) => b.customerId === Number(userId));
  else if (role === 'owner') list = list.filter((b) => b.ownerId === Number(userId));
  return NextResponse.json(list);
}

export async function POST(request) {
  try {
    const userId = request.headers.get('x-user-id');
    if (!userId) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    const body = await request.json();
    const vehicleId = body.vehicleId;
    const v = findVehicleById(vehicleId);
    if (!v) return NextResponse.json({ message: 'Vehicle not found' }, { status: 404 });
    if (!v.availability) return NextResponse.json({ message: 'Vehicle not available' }, { status: 400 });
    const days = body.days ?? 1;
    const totalAmount = (v.pricePerDay || 0) * days;
    const booking = createBooking({
      vehicleId: v.id,
      customerId: Number(userId),
      ownerId: v.ownerId,
      totalAmount,
    });
    return NextResponse.json(booking, { status: 201 });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
