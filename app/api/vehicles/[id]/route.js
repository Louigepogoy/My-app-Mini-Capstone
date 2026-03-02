import { NextResponse } from 'next/server';
import { findVehicleById, updateVehicle, deleteVehicle } from '@/lib/store';

export async function GET(request, { params }) {
  const id = params.id;
  const v = findVehicleById(id);
  if (!v) return NextResponse.json({ message: 'Vehicle not found' }, { status: 404 });
  return NextResponse.json(v);
}

export async function PUT(request, { params }) {
  const userId = request.headers.get('x-user-id');
  const role = request.headers.get('x-role') || '';
  const id = params.id;
  const v = findVehicleById(id);
  if (!v) return NextResponse.json({ message: 'Vehicle not found' }, { status: 404 });
  if (role !== 'admin' && v.ownerId !== Number(userId)) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }
  const body = await request.json();
  const updated = updateVehicle(id, {
    name: body.name ?? v.name,
    model: body.model ?? v.model,
    plate: body.plate ?? v.plate,
    pricePerDay: body.pricePerDay ?? v.pricePerDay,
    availability: body.availability !== undefined ? body.availability : v.availability,
  });
  return NextResponse.json(updated);
}

export async function DELETE(request, { params }) {
  const userId = request.headers.get('x-user-id');
  const role = request.headers.get('x-role') || '';
  const id = params.id;
  const v = findVehicleById(id);
  if (!v) return NextResponse.json({ message: 'Vehicle not found' }, { status: 404 });
  if (role !== 'admin' && v.ownerId !== Number(userId)) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }
  deleteVehicle(id);
  return NextResponse.json({ message: 'Deleted' });
}
