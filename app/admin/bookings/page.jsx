'use client';

import { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/auth';

export default function AdminBookingsPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApi('/api/bookings')
      .then((r) => r.json())
      .then(setList)
      .catch(() => setList([]))
      .finally(() => setLoading(false));
  }, []);

  async function approve(id) {
    const res = await fetchApi(`/api/bookings/${id}/approve`, { method: 'POST' });
    if (res.ok) setList((prev) => prev.map((b) => (b.id === id ? { ...b, status: 'approved' } : b)));
  }

  async function reject(id) {
    const res = await fetchApi(`/api/bookings/${id}/reject`, { method: 'POST' });
    if (res.ok) setList((prev) => prev.map((b) => (b.id === id ? { ...b, status: 'rejected' } : b)));
  }

  if (loading) return <p className="text-slate-600">Loading bookings…</p>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-slate-900">Manage All Bookings</h1>
      <p className="text-slate-600">View and manage every booking in the system.</p>
      <div className="space-y-2">
        {list.length === 0 ? (
          <p className="text-slate-600">No bookings.</p>
        ) : (
          list.map((b) => (
            <div key={b.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white p-4">
              <span>#{b.id} — Vehicle {b.vehicleId} — Customer {b.customerId} — ${b.totalAmount} — {b.status}</span>
              {b.status === 'pending' && (
                <div className="flex gap-2">
                  <button onClick={() => approve(b.id)} className="rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700">Approve</button>
                  <button onClick={() => reject(b.id)} className="rounded bg-rose-600 px-3 py-1 text-sm text-white hover:bg-rose-700">Reject</button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
