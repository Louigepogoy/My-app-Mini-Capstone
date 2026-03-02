import { NextResponse } from 'next/server';

export async function POST() {
  // With JWT/sessions you would invalidate server-side here.
  return NextResponse.json({ message: 'Logged out' });
}
