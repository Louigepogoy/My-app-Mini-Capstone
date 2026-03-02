'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/auth';

export default function PaymentPage() {
  const params = useParams();
  const router = useRouter();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [done, setDone] = useState(false);

  useEffect(() => {
    fetchApi(`/api/bookings/${params.id}`)
      .then((r) => (r.ok ? r.json() : null))
      .then(setBooking)
      .finally(() => setLoading(false));
  }, [params.id]);

  async function handlePay(e) {
    e.preventDefault();
    const res = await fetchApi(`/api/bookings/${params.id}/payment`, { method: 'POST' });
    if (res.ok) setDone(true);
  }

  if (loading) return <p className="text-slate-600">Loading…</p>;
  if (!booking) return <p className="text-slate-600">Booking not found.</p>;
  if (done) {
    return (
      <div className="max-w-md rounded-xl border border-slate-200 bg-white p-6">
        <h1 className="text-xl font-bold text-slate-900">Payment complete</h1>
        <p className="mt-2 text-slate-600">Booking #{booking.id} has been paid.</p>
        <button onClick={() => router.push('/customer/bookings')} className="mt-4 rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">Back to bookings</button>
      </div>
    );
  }

  return (
    <div className="max-w-md space-y-4">
      <h1 className="text-2xl font-bold text-slate-900">Make Payment</h1>
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <p>Booking #{booking.id} — Total: ${booking.totalAmount ?? 0}</p>
        <form onSubmit={handlePay} className="mt-4">
          <button type="submit" className="w-full rounded bg-indigo-600 py-2 font-medium text-white hover:bg-indigo-700">Confirm payment</button>
        </form>
      </div>
    </div>
  );
}
