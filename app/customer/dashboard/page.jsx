'use client';

import Link from 'next/link';

export default function CustomerDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Customer Dashboard</h1>
      <p className="text-slate-600">Browse vehicles, book, pay, cancel, and leave reviews.</p>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <Link href="/customer/vehicles" className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:bg-slate-50">
          <h2 className="font-semibold text-slate-900">Browse Vehicles</h2>
          <p className="text-sm text-slate-600">View available vehicles and details.</p>
        </Link>
        <Link href="/customer/bookings" className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:bg-slate-50">
          <h2 className="font-semibold text-slate-900">My Bookings</h2>
          <p className="text-sm text-slate-600">See bookings, pay, or cancel.</p>
        </Link>
        <Link href="/customer/reviews" className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:bg-slate-50">
          <h2 className="font-semibold text-slate-900">Leave Review</h2>
          <p className="text-sm text-slate-600">Rate and review after a booking.</p>
        </Link>
      </div>
    </div>
  );
}
