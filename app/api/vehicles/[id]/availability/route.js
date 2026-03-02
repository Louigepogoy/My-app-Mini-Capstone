import { NextResponse } from 'next/server';
import { findVehicleById, updateVehicle } from '@/lib/store';

export async function PATCH(request, { params }) {
  const userId = request.headers.get('x-user-id');
  const role = request.headers.get('x-role') || '';
  const id = params.id;
  const v = findVehicleById(id);
  if (!v) return NextResponse.json({ message: 'Vehicle not found' }, { status: 404 });
  if (role !== 'admin' && v.ownerId !== Number(userId)) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }
  const body = await request.json();
  const updated = updateVehicle(id, { availability: !!body.availability });
  return NextResponse.json(updated);
}
