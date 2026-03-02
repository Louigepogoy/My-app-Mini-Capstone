'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchApi } from '@/lib/auth';

export default function OwnerAddVehiclePage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [model, setModel] = useState('');
  const [plate, setPlate] = useState('');
  const [pricePerDay, setPricePerDay] = useState('');
  const [availability, setAvailability] = useState(true);

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetchApi('/api/vehicles', {
      method: 'POST',
      body: JSON.stringify({
        name: name || 'Vehicle',
        model,
        plate,
        pricePerDay: Number(pricePerDay) || 0,
        availability,
      }),
    });
    if (res.ok) router.push('/owner/vehicles');
  }

  return (
    <div className="max-w-md space-y-4">
      <h1 className="text-2xl font-bold text-slate-900">Add Vehicle</h1>
      <form onSubmit={handleSubmit} className="space-y-3 rounded-xl border border-slate-200 bg-white p-6">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Name</span>
          <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded border border-slate-300 px-3 py-2" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Model</span>
          <input value={model} onChange={(e) => setModel(e.target.value)} className="mt-1 w-full rounded border border-slate-300 px-3 py-2" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Plate</span>
          <input value={plate} onChange={(e) => setPlate(e.target.value)} className="mt-1 w-full rounded border border-slate-300 px-3 py-2" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Price per day</span>
          <input type="number" value={pricePerDay} onChange={(e) => setPricePerDay(e.target.value)} className="mt-1 w-full rounded border border-slate-300 px-3 py-2" />
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={availability} onChange={(e) => setAvailability(e.target.checked)} />
          <span className="text-sm">Available</span>
        </label>
        <button type="submit" className="w-full rounded bg-indigo-600 py-2 font-medium text-white hover:bg-indigo-700">Add vehicle</button>
      </form>
    </div>
  );
}
