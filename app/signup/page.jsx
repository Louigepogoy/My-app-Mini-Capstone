'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setStoredUser } from '@/lib/auth';

export default function SignupPage() {
  const router = useRouter();
  const [role, setRole] = useState('customer'); // 'customer' | 'operator'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          // map operator → owner in backend
          role: role === 'customer' ? 'customer' : 'owner',
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to sign up');

      setStoredUser({ userId: data.id, email: data.email, role: data.role });

      if (role === 'customer') {
        router.push('/customer/dashboard');
      } else {
        // operator → owner of cars dashboard
        router.push('/owner/dashboard');
      }
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md border border-slate-200 p-6 space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Create an account</h1>
          <p className="text-sm text-slate-600">
            Sign up as a customer or operator (owner of cars).
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ROLE SELECT */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              I am a
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setRole('customer')}
                className={`flex-1 rounded-md border px-3 py-2 text-sm font-medium ${
                  role === 'customer'
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                    : 'border-slate-300 bg-white text-slate-700'
                }`}
              >
                Customer
              </button>
              <button
                type="button"
                onClick={() => setRole('operator')}
                className={`flex-1 rounded-md border px-3 py-2 text-sm font-medium ${
                  role === 'operator'
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                    : 'border-slate-300 bg-white text-slate-700'
                }`}
              >
                Operator (Owner)
              </button>
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Email
              <input
                type="email"
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Password
              <input
                type="password"
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </label>
          </div>

          {/* ERROR */}
          {errorMsg && (
            <p className="text-sm text-rose-600 bg-rose-50 border border-rose-100 rounded-md px-3 py-2">
              {errorMsg}
            </p>
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
          >
            {loading ? 'Creating account…' : 'Sign up'}
          </button>
        </form>
      </div>
    </div>
  );
}

