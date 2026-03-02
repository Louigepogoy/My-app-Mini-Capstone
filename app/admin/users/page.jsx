'use client';

import { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/auth';

export default function AdminUsersPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApi('/api/users')
      .then((r) => (r.ok ? r.json() : []))
      .then(setList)
      .finally(() => setLoading(false));
  }, []);

  async function verify(id) {
    const res = await fetchApi(`/api/users/${id}/verify`, { method: 'POST' });
    if (res.ok) setList((prev) => prev.map((u) => (u.id === id ? { ...u, verified: true } : u)));
  }

  async function suspend(id) {
    const res = await fetchApi(`/api/users/${id}/suspend`, { method: 'POST', body: JSON.stringify({}) });
    if (res.ok) setList((prev) => prev.map((u) => (u.id === id ? { ...u, suspended: true } : u)));
  }

  async function unsuspend(id) {
    const res = await fetchApi(`/api/users/${id}/suspend`, { method: 'POST', body: JSON.stringify({ unsuspend: true }) });
    if (res.ok) setList((prev) => prev.map((u) => (u.id === id ? { ...u, suspended: false } : u)));
  }

  if (loading) return <p className="text-slate-600">Loading users…</p>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-slate-900">Manage Users (Customer & Owner)</h1>
      <p className="text-slate-600">Verify owner accounts and suspend or unsuspend accounts.</p>
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="p-3 text-left font-medium">ID</th>
              <th className="p-3 text-left font-medium">Email</th>
              <th className="p-3 text-left font-medium">Role</th>
              <th className="p-3 text-left font-medium">Verified</th>
              <th className="p-3 text-left font-medium">Suspended</th>
              <th className="p-3 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((u) => (
              <tr key={u.id} className="border-b border-slate-100">
                <td className="p-3">{u.id}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">{u.role}</td>
                <td className="p-3">{u.verified ? 'Yes' : 'No'}</td>
                <td className="p-3">{u.suspended ? 'Yes' : 'No'}</td>
                <td className="p-3 flex gap-2">
                  {u.role === 'owner' && !u.verified && (
                    <button onClick={() => verify(u.id)} className="rounded bg-green-600 px-2 py-1 text-xs text-white hover:bg-green-700">Verify</button>
                  )}
                  {!u.suspended ? (
                    <button onClick={() => suspend(u.id)} className="rounded bg-amber-600 px-2 py-1 text-xs text-white hover:bg-amber-700">Suspend</button>
                  ) : (
                    <button onClick={() => unsuspend(u.id)} className="rounded bg-slate-600 px-2 py-1 text-xs text-white hover:bg-slate-700">Unsuspend</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
