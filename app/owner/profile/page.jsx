'use client';

import { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/auth';

export default function OwnerProfilePage() {
  const [profile, setProfile] = useState({ name: '', phone: '' });
  const [email, setEmail] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchApi('/api/profile')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data) {
          setEmail(data.email || '');
          setProfile(data.profile || { name: '', phone: '' });
        }
      });
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetchApi('/api/profile', {
      method: 'PUT',
      body: JSON.stringify({ profile }),
    });
    if (res.ok) setSaved(true);
  }

  return (
    <div className="max-w-md space-y-4">
      <h1 className="text-2xl font-bold text-slate-900">Manage Profile</h1>
      <p className="text-slate-600">Update your owner account details.</p>
      <form onSubmit={handleSubmit} className="space-y-3 rounded-xl border border-slate-200 bg-white p-6">
        <p className="text-sm text-slate-600">Email: {email}</p>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Name</span>
          <input
            value={profile.name || ''}
            onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
            className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Phone</span>
          <input
            value={profile.phone || ''}
            onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
            className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
          />
        </label>
        <button type="submit" className="w-full rounded bg-indigo-600 py-2 font-medium text-white hover:bg-indigo-700">Save profile</button>
      </form>
      {saved && <p className="text-sm text-green-600">Profile saved.</p>}
    </div>
  );
}
