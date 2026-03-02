'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchApi, getStoredUser } from '@/lib/auth';

export default function VehicleDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [vehicle, setVehicle] = useState(null);
  const [days, setDays] = useState(1);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    fetchApi(`/api/vehicles/${params.id}`)
      .then((r) => (r.ok ? r.json() : null))
      .then(setVehicle)
      .finally(() => setLoading(false));
  }, [params.id]);

  async function handleBook(e) {
    e.preventDefault();
    const user = getStoredUser();
    if (!user) {
      router.push('/login');
      return;
    }
    const res = await fetchApi('/api/bookings', {
      method: 'POST',
      body: JSON.stringify({ vehicleId: Number(params.id), days }),
    });
    if (res.ok) {
      const data = await res.json();
      setBooking(data);
      router.push('/customer/bookings');
    }
  }

  if (loading) return <p className="text-slate-600">Loading…</p>;
  if (!vehicle) return <p className="text-slate-600">Vehicle not found.</p>;

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Vehicle Details</h1>
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">{vehicle.name || vehicle.model || `Vehicle ${vehicle.id}`}</h2>
        <p className="text-slate-600">Model: {vehicle.model || '—'}</p>
        <p className="text-slate-600">Plate: {vehicle.plate || '—'}</p>
        <p className="font-medium text-slate-800">${vehicle.pricePerDay ?? 0} per day</p>
        <p className="text-sm text-slate-600">Available: {vehicle.availability ? 'Yes' : 'No'}</p>

        {vehicle.availability && (
          <form onSubmit={handleBook} className="mt-4 flex items-end gap-3">
            <label className="block">
              <span className="text-sm text-slate-700">Days</span>
              <input
                type="number"
                min={1}
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="ml-2 rounded border border-slate-300 px-2 py-1"
              />
            </label>
            <button type="submit" className="rounded bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
              Book now
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
