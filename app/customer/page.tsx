export default function CustomerDashboardPage() {
  return (
    <div className="min-h-screen bg-slate-950 px-4 py-6 text-slate-50">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <header className="flex flex-col gap-3 border-b border-slate-800 pb-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-400">
              Customer dashboard
            </p>
            <h1 className="mt-2 text-2xl font-semibold md:text-3xl">
              Welcome to your trips
            </h1>
            <p className="mt-1 text-xs text-slate-400 md:text-sm">
              Quickly check upcoming rides, past trips, and saved locations.
            </p>
          </div>
        </header>

        <main className="grid gap-6 md:grid-cols-[minmax(0,1.7fr)_minmax(0,1.3fr)]">
          <section className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h2 className="text-sm font-semibold">Upcoming trips</h2>
                <p className="text-[11px] text-slate-400">
                  Example cards for your next bookings.
                </p>
              </div>
              <button className="rounded-full bg-sky-500 px-3 py-1.5 text-[11px] font-medium text-white shadow-sm hover:bg-sky-400">
                Book a ride
              </button>
            </div>

            <div className="mt-2 space-y-3 text-xs">
              <article className="space-y-1 rounded-xl border border-slate-800 bg-slate-950/70 p-3">
                <div className="flex items-center justify-between">
                  <p className="font-medium">Airport drop-off</p>
                  <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                    Confirmed
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Compact car · Today · 5:30 PM
                </p>
                <p className="text-[11px] text-slate-300">
                  Pickup: Downtown Hub → Airport Station
                </p>
              </article>
            </div>
          </section>

          <section className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg">
            <h2 className="text-sm font-semibold">Shortcuts</h2>
            <p className="text-[11px] text-slate-400">
              Helpful links for customers using your platform.
            </p>
            <ul className="mt-3 space-y-2 text-xs">
              <li className="rounded-xl bg-slate-950/70 px-3 py-2">
                View all bookings
              </li>
              <li className="rounded-xl bg-slate-950/70 px-3 py-2">
                Saved locations
              </li>
              <li className="rounded-xl bg-slate-950/70 px-3 py-2">
                Payment methods
              </li>
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
}

