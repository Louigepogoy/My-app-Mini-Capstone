'use client';

import Link from 'next/link';

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
      <p className="text-slate-600">Manage users (customer & owner), verify owners, vehicles, all bookings, reports, and suspend accounts.</p>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <Link href="/admin/users" className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:bg-slate-50">
          <h2 className="font-semibold text-slate-900">Manage Users</h2>
          <p className="text-sm text-slate-600">Customer & owner accounts, verify, suspend.</p>
        </Link>
        <Link href="/admin/vehicles" className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:bg-slate-50">
          <h2 className="font-semibold text-slate-900">Vehicles</h2>
          <p className="text-sm text-slate-600">Add, update, delete vehicles.</p>
        </Link>
        <Link href="/admin/bookings" className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:bg-slate-50">
          <h2 className="font-semibold text-slate-900">All Bookings</h2>
          <p className="text-sm text-slate-600">Manage every booking.</p>
        </Link>
        <Link href="/admin/reports" className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:bg-slate-50">
          <h2 className="font-semibold text-slate-900">System Reports</h2>
          <p className="text-sm text-slate-600">View system stats.</p>
        </Link>
      </div>
    </div>
  );
}
