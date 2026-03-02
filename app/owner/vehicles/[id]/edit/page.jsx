'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/auth';

export default function OwnerEditVehiclePage() {
  const params = useParams();
  const router = useRouter();
  const [vehicle, setVehicle] = useState(null);
  const [name, setName] = useState('');
  const [model, setModel] = useState('');
  const [plate, setPlate] = useState('');
  const [pricePerDay, setPricePerDay] = useState('');
  const [availability, setAvailability] = useState(true);

  useEffect(() => {
    fetchApi(`/api/vehicles/${params.id}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((v) => {
        setVehicle(v);
        if (v) {
          setName(v.name || '');
          setModel(v.model || '');
          setPlate(v.plate || '');
          setPricePerDay(String(v.pricePerDay ?? ''));
          setAvailability(v.availability !== false);
        }
      });
  }, [params.id]);

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetchApi(`/api/vehicles/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify({ name, model, plate, pricePerDay: Number(pricePerDay) || 0, availability }),
    });
    if (res.ok) router.push('/owner/vehicles');
  }

  if (!vehicle) return <p className="text-slate-600">Loading…</p>;

  return (
    <div className="max-w-md space-y-4">
      <h1 className="text-2xl font-bold text-slate-900">Update Vehicle Information</h1>
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
        <button type="submit" className="w-full rounded bg-indigo-600 py-2 font-medium text-white hover:bg-indigo-700">Update vehicle</button>
      </form>
    </div>
  );
}
