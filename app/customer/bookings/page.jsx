'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchApi } from '@/lib/auth';

export default function CustomerBookingsPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApi('/api/bookings')
      .then((r) => r.json())
      .then(setList)
      .catch(() => setList([]))
      .finally(() => setLoading(false));
  }, []);

  async function cancel(id) {
    if (!confirm('Cancel this booking?')) return;
    const res = await fetchApi(`/api/bookings/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ cancel: true }),
    });
    if (res.ok) setList((prev) => prev.map((b) => (b.id === id ? { ...b, status: 'cancelled' } : b)));
  }

  async function pay(id) {
    const res = await fetchApi(`/api/bookings/${id}/payment`, { method: 'POST' });
    if (res.ok) setList((prev) => prev.map((b) => (b.id === id ? { ...b, paid: true } : b)));
  }

  if (loading) return <p className="text-slate-600">Loading bookings…</p>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-slate-900">My Bookings</h1>
      <p className="text-slate-600">View, pay, or cancel your bookings.</p>
      <div className="space-y-3">
        {list.length === 0 ? (
          <p className="text-slate-600">No bookings yet. <Link href="/customer/vehicles" className="text-indigo-600 hover:underline">Browse vehicles</Link>.</p>
        ) : (
          list.map((b) => (
            <div key={b.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white p-4">
              <div>
                <span className="font-medium">Booking #{b.id}</span> — Vehicle {b.vehicleId} — ${b.totalAmount ?? 0} — {b.status}
                {b.paid && ' • Paid'}
              </div>
              <div className="flex gap-2">
                {b.status === 'approved' && !b.paid && (
                  <button onClick={() => pay(b.id)} className="rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700">Pay</button>
                )}
                {(b.status === 'pending' || b.status === 'approved') && (
                  <button onClick={() => cancel(b.id)} className="rounded bg-rose-600 px-3 py-1 text-sm text-white hover:bg-rose-700">Cancel</button>
                )}
                {b.status === 'approved' && b.paid && (
                  <Link href={`/customer/reviews?bookingId=${b.id}`} className="rounded bg-slate-600 px-3 py-1 text-sm text-white hover:bg-slate-700">Leave review</Link>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
