import { NextResponse } from 'next/server';
import { vehicles, createVehicle } from '@/lib/store';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const ownerId = searchParams.get('ownerId');
  const availableOnly = searchParams.get('available') === 'true';
  let list = [...vehicles];
  if (ownerId) list = list.filter((v) => v.ownerId === Number(ownerId));
  if (availableOnly) list = list.filter((v) => v.availability);
  return NextResponse.json(list);
}

export async function POST(request) {
  try {
    const userId = request.headers.get('x-user-id');
    const role = request.headers.get('x-role') || '';
    if (!userId && role !== 'admin') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const body = await request.json();
    const ownerId = body.ownerId ?? Number(userId);
    const vehicle = createVehicle({
      ownerId,
      name: body.name || 'Vehicle',
      model: body.model || '',
      plate: body.plate || '',
      pricePerDay: body.pricePerDay ?? 0,
      availability: body.availability !== false,
    });
    return NextResponse.json(vehicle, { status: 201 });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
