export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-slate-950 px-4 py-6 text-slate-50">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <header className="flex flex-col justify-between gap-4 border-b border-slate-800 pb-5 md:flex-row md:items-center">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-fuchsia-400">
              Admin dashboard
            </p>
            <h1 className="mt-2 text-2xl font-semibold md:text-3xl">
              Platform overview
            </h1>
            <p className="mt-1 text-xs text-slate-400 md:text-sm">
              Monitor vehicles, bookings, and users across the entire
              Online Rental Transportation platform.
            </p>
          </div>
        </header>

        <main className="grid gap-6 md:grid-cols-3">
          <section className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg">
            <h2 className="text-sm font-semibold">Key metrics</h2>
            <p className="text-[11px] text-slate-400">
              Replace these demo numbers with your live analytics.
            </p>
            <dl className="mt-3 grid grid-cols-3 gap-3 text-xs">
              <div className="rounded-xl bg-slate-950/70 p-3">
                <dt className="text-[11px] text-slate-400">Total vehicles</dt>
                <dd className="mt-1 text-lg font-semibold text-slate-50">36</dd>
              </div>
              <div className="rounded-xl bg-slate-950/70 p-3">
                <dt className="text-[11px] text-slate-400">Active bookings</dt>
                <dd className="mt-1 text-lg font-semibold text-slate-50">9</dd>
              </div>
              <div className="rounded-xl bg-slate-950/70 p-3">
                <dt className="text-[11px] text-slate-400">Registered users</dt>
                <dd className="mt-1 text-lg font-semibold text-slate-50">128</dd>
              </div>
            </dl>
          </section>

          <section className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg">
            <h2 className="text-sm font-semibold">Moderation</h2>
            <p className="text-[11px] text-slate-400">
              Review reports, vehicle issues, and booking disputes.
            </p>
            <ul className="mt-3 space-y-2 text-xs">
              <li className="flex items-center justify-between rounded-xl bg-slate-950/70 px-3 py-2">
                <span>Pending vehicle verification</span>
                <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-300">
                  3
                </span>
              </li>
              <li className="flex items-center justify-between rounded-xl bg-slate-950/70 px-3 py-2">
                <span>Open customer reports</span>
                <span className="rounded-full bg-rose-500/10 px-2 py-0.5 text-[10px] font-semibold text-rose-300">
                  1
                </span>
              </li>
            </ul>
          </section>

          <section className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg">
            <h2 className="text-sm font-semibold">Quick actions</h2>
            <p className="text-[11px] text-slate-400">
              Admin tools are split into focused pages.
            </p>
            <div className="mt-3 space-y-2 text-xs">
              <a
                href="/admin/add-vehicle"
                className="inline-flex w-full items-center justify-center rounded-full bg-fuchsia-500 px-3 py-2 font-medium text-white shadow-sm transition hover:bg-fuchsia-400"
              >
                Add vehicle
              </a>
              <a
                href="/admin/delete-vehicle"
                className="inline-flex w-full items-center justify-center rounded-full bg-slate-800 px-3 py-2 font-medium text-slate-50 transition hover:bg-slate-700"
              >
                Delete vehicle
              </a>
              <a
                href="/admin/vehicle-requests"
                className="inline-flex w-full items-center justify-center rounded-full bg-slate-800 px-3 py-2 font-medium text-slate-50 transition hover:bg-slate-700"
              >
                Review owner vehicle requests
              </a>
              <a
                href="/admin/reports"
                className="inline-flex w-full items-center justify-center rounded-full bg-slate-800 px-3 py-2 font-medium text-slate-50 transition hover:bg-slate-700"
              >
                View reports
              </a>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}