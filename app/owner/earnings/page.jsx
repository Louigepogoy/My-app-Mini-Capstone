'use client';

import { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/auth';

export default function OwnerEarningsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApi('/api/earnings')
      .then((r) => (r.ok ? r.json() : null))
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-slate-600">Loading…</p>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-slate-900">View Earnings</h1>
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <p className="text-slate-600">Total paid bookings: {data?.count ?? 0}</p>
        <p className="text-xl font-semibold text-slate-900">Total earnings: ${data?.total ?? 0}</p>
      </div>
    </div>
  );
}
