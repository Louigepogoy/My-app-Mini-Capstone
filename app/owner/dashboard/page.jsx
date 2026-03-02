'use client';

import Link from 'next/link';

export default function OwnerDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Owner Dashboard</h1>
      <p className="text-slate-600">Manage profile, vehicles, booking requests, and earnings.</p>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <Link href="/owner/profile" className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:bg-slate-50">
          <h2 className="font-semibold text-slate-900">Manage Profile</h2>
          <p className="text-sm text-slate-600">Update your account details.</p>
        </Link>
        <Link href="/owner/vehicles" className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:bg-slate-50">
          <h2 className="font-semibold text-slate-900">My Vehicles</h2>
          <p className="text-sm text-slate-600">Add, update, delete, set availability.</p>
        </Link>
        <Link href="/owner/bookings" className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:bg-slate-50">
          <h2 className="font-semibold text-slate-900">Booking Requests</h2>
          <p className="text-sm text-slate-600">Approve or reject requests.</p>
        </Link>
        <Link href="/owner/earnings" className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:bg-slate-50">
          <h2 className="font-semibold text-slate-900">Earnings</h2>
          <p className="text-sm text-slate-600">View your earnings.</p>
        </Link>
      </div>
    </div>
  );
}
