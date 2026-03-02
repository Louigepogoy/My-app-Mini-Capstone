'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchApi } from '@/lib/auth';

export default function BrowseVehiclesPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApi('/api/vehicles?available=true')
      .then((r) => r.json())
      .then(setList)
      .catch(() => setList([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-slate-600">Loading vehicles…</p>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-slate-900">Browse Vehicles</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.length === 0 ? (
          <p className="text-slate-600">No vehicles available.</p>
        ) : (
          list.map((v) => (
            <Link
              key={v.id}
              href={`/customer/vehicles/${v.id}`}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:bg-slate-50"
            >
              <h2 className="font-semibold text-slate-900">{v.name || v.model || `Vehicle ${v.id}`}</h2>
              <p className="text-sm text-slate-600">Plate: {v.plate || '—'}</p>
              <p className="text-sm font-medium text-slate-800">${v.pricePerDay ?? 0}/day</p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
