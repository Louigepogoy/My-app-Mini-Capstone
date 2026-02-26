"use client";

import { useEffect, useState } from "react";

export default function AdminReportsPage() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const role = window.localStorage.getItem("role");
      setIsAdmin(role === "admin");
    }
  }, []);

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10 text-slate-50">
        <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/80 p-6 text-center shadow-xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-fuchsia-400">
            Admin only
          </p>
          <h1 className="mt-2 text-lg font-semibold">Access restricted</h1>
          <p className="mt-1 text-xs text-slate-400">
            Only admin users can view platform reports. Log in with an admin
            account to continue.
          </p>
          <a
            href="/login"
            className="mt-4 inline-flex items-center justify-center rounded-full bg-slate-800 px-4 py-2 text-xs font-medium text-slate-50 hover:bg-slate-700"
          >
            Go to login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-6 text-slate-50">
      <div className="mx-auto w-full max-w-4xl space-y-6">
        <header className="border-b border-slate-800 pb-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-fuchsia-400">
            Admin · Reports
          </p>
          <h1 className="mt-2 text-2xl font-semibold">Platform reports</h1>
          <p className="mt-1 text-xs text-slate-400">
            High-level overview of bookings, revenue, and vehicle utilization
            (demo data).
          </p>
        </header>

        <section className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg text-xs">
          <h2 className="text-sm font-semibold">Filters</h2>
          <div className="grid gap-3 md:grid-cols-3">
            <label className="space-y-1">
              <span className="block text-[11px] font-medium text-slate-200">
                Date range
              </span>
              <select className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-50 outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500/60">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>This year</option>
              </select>
            </label>
            <label className="space-y-1">
              <span className="block text-[11px] font-medium text-slate-200">
                Report type
              </span>
              <select className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-50 outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500/60">
                <option>Overview</option>
                <option>Revenue</option>
                <option>Vehicle utilization</option>
              </select>
            </label>
            <label className="space-y-1">
              <span className="block text-[11px] font-medium text-slate-200">
                Export format
              </span>
              <select className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-50 outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500/60">
                <option>CSV</option>
                <option>PDF</option>
              </select>
            </label>
          </div>
        </section>

        <section className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg text-xs">
          <h2 className="text-sm font-semibold">Summary (demo)</h2>
          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-xl bg-slate-950/70 p-3">
              <p className="text-[11px] text-slate-400">Completed bookings</p>
              <p className="mt-1 text-lg font-semibold text-slate-50">124</p>
            </div>
            <div className="rounded-xl bg-slate-950/70 p-3">
              <p className="text-[11px] text-slate-400">Total revenue</p>
              <p className="mt-1 text-lg font-semibold text-slate-50">
                ₱1,050,000.00
              </p>
            </div>
            <div className="rounded-xl bg-slate-950/70 p-3">
              <p className="text-[11px] text-slate-400">Avg. utilization</p>
              <p className="mt-1 text-lg font-semibold text-slate-50">72%</p>
            </div>
          </div>

          <p className="text-[11px] text-slate-400">
            This is placeholder data. Wire this screen up to your analytics or
            reporting backend to show live metrics.
          </p>
        </section>
      </div>
    </div>
  );
}

