import { NextResponse } from 'next/server';
import { users, vehicles, bookings, reviews } from '@/lib/store';

export async function GET(request) {
  const role = request.headers.get('x-role') || '';
  if (role !== 'admin') {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }
  const report = {
    users: { total: users.length, customers: users.filter((u) => u.role === 'customer').length, owners: users.filter((u) => u.role === 'owner').length },
    vehicles: { total: vehicles.length, available: vehicles.filter((v) => v.availability).length },
    bookings: { total: bookings.length, pending: bookings.filter((b) => b.status === 'pending').length, approved: bookings.filter((b) => b.status === 'approved').length },
    reviews: { total: reviews.length },
  };
  return NextResponse.json(report);
}
