'use client';

import { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/auth';

export default function AdminReportsPage() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApi('/api/reports')
      .then((r) => (r.ok ? r.json() : null))
      .then(setReport)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-slate-600">Loading reports…</p>;
  if (!report) return <p className="text-slate-600">Unable to load system reports.</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">System Reports</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="font-semibold text-slate-900">Users</h2>
          <p className="mt-1 text-slate-600">Total: {report.users?.total ?? 0}</p>
          <p className="text-slate-600">Customers: {report.users?.customers ?? 0}</p>
          <p className="text-slate-600">Owners: {report.users?.owners ?? 0}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="font-semibold text-slate-900">Vehicles</h2>
          <p className="mt-1 text-slate-600">Total: {report.vehicles?.total ?? 0}</p>
          <p className="text-slate-600">Available: {report.vehicles?.available ?? 0}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="font-semibold text-slate-900">Bookings</h2>
          <p className="mt-1 text-slate-600">Total: {report.bookings?.total ?? 0}</p>
          <p className="text-slate-600">Pending: {report.bookings?.pending ?? 0}</p>
          <p className="text-slate-600">Approved: {report.bookings?.approved ?? 0}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="font-semibold text-slate-900">Reviews</h2>
          <p className="mt-1 text-slate-600">Total: {report.reviews?.total ?? 0}</p>
        </div>
      </div>
    </div>
  );
}
