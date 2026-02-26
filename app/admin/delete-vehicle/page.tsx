"use client";

import { useEffect, useState } from "react";

export default function AdminDeleteVehiclePage() {
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
            Only admin users can delete vehicles. Log in with an admin account
            to continue.
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

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    alert("Vehicle deleted (demo only). Connect this to your backend.");
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-6 text-slate-50">
      <div className="mx-auto w-full max-w-3xl space-y-6">
        <header className="border-b border-slate-800 pb-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-fuchsia-400">
            Admin · Delete vehicle
          </p>
          <h1 className="mt-2 text-2xl font-semibold">Remove a vehicle</h1>
          <p className="mt-1 text-xs text-slate-400">
            Select a vehicle or enter its plate number to remove it from the
            platform.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg text-xs"
        >
          <label className="space-y-1 block">
            <span className="block text-[11px] font-medium text-slate-200">
              Choose from existing vehicles (demo)
            </span>
            <select className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-50 outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500/60">
              <option>EcoDrive Compact · PLT-1023</option>
              <option>UrbanMove Van · KTR-8891</option>
              <option>StreetLine Motorbike · MTR-5521</option>
            </select>
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-1">
              <span className="block text-[11px] font-medium text-slate-200">
                Or search by plate number
              </span>
              <input
                name="plate"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-50 outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500/60"
                placeholder="PLT-1023"
              />
            </label>
          </div>

          <p className="text-[11px] text-amber-300">
            This is a demo flow. In production, you should confirm the action
            and update your database before removing a vehicle.
          </p>

          <button
            type="submit"
            className="mt-2 inline-flex items-center justify-center rounded-full bg-rose-600 px-5 py-2 text-xs font-medium text-white shadow-sm hover:bg-rose-500"
          >
            Delete vehicle (demo)
          </button>
        </form>
      </div>
    </div>
  );
}

