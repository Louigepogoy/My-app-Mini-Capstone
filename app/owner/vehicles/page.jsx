'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchApi, getStoredUser } from '@/lib/auth';

export default function OwnerVehiclesPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = getStoredUser();

  useEffect(() => {
    if (user?.userId) {
      fetchApi(`/api/vehicles?ownerId=${user.userId}`)
        .then((r) => r.json())
        .then(setList)
        .catch(() => setList([]))
        .finally(() => setLoading(false));
    } else setLoading(false);
  }, [user?.userId]);

  async function setAvailability(id, availability) {
    const res = await fetchApi(`/api/vehicles/${id}/availability`, {
      method: 'PATCH',
      body: JSON.stringify({ availability }),
    });
    if (res.ok) setList((prev) => prev.map((v) => (v.id === id ? { ...v, availability } : v)));
  }

  async function remove(id) {
    if (!confirm('Delete this vehicle?')) return;
    const res = await fetchApi(`/api/vehicles/${id}`, { method: 'DELETE' });
    if (res.ok) setList((prev) => prev.filter((v) => v.id !== id));
  }

  if (loading) return <p className="text-slate-600">Loading vehicles…</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">My Vehicles</h1>
        <Link href="/owner/vehicles/add" className="rounded bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">Add vehicle</Link>
      </div>
      <p className="text-slate-600">Add, update, delete, and set vehicle availability.</p>
      <div className="space-y-2">
        {list.length === 0 ? (
          <p className="text-slate-600">No vehicles. <Link href="/owner/vehicles/add" className="text-indigo-600 hover:underline">Add one</Link>.</p>
        ) : (
          list.map((v) => (
            <div key={v.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white p-4">
              <div>
                <span className="font-medium">{v.name || v.model || `Vehicle ${v.id}`}</span> — {v.plate} — ${v.pricePerDay}/day — {v.availability ? 'Available' : 'Unavailable'}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setAvailability(v.id, !v.availability)}
                  className="rounded bg-slate-600 px-3 py-1 text-sm text-white hover:bg-slate-700"
                >
                  {v.availability ? 'Set unavailable' : 'Set available'}
                </button>
                <Link href={`/owner/vehicles/${v.id}/edit`} className="rounded bg-slate-600 px-3 py-1 text-sm text-white hover:bg-slate-700">Update</Link>
                <button onClick={() => remove(v.id)} className="rounded bg-rose-600 px-3 py-1 text-sm text-white hover:bg-rose-700">Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
