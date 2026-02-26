export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-950 px-4 py-6 text-slate-50">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <header className="flex flex-col justify-between gap-4 border-b border-slate-800 pb-5 md:flex-row md:items-center">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-400">
              Dashboard
            </p>
            <h1 className="mt-2 text-2xl font-semibold md:text-3xl">
              Welcome back to your rental hub
            </h1>
            <p className="mt-1 text-xs text-slate-400 md:text-sm">
              Manage your bookings, explore available vehicles, and keep your
              journeys on track.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-300">
            <span className="inline-flex h-8 items-center rounded-full bg-slate-900 px-3">
              Signed in user
            </span>
            <a
              href="/login"
              className="inline-flex h-8 items-center rounded-full border border-slate-700 bg-slate-900 px-3 text-[11px] font-medium text-slate-200 transition hover:border-rose-500/70 hover:bg-rose-500/10 hover:text-rose-200"
            >
              Log out
            </a>
          </div>
        </header>

        <main className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)]">
          {/* Available vehicles */}
          <section className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h2 className="text-sm font-semibold">Available vehicles</h2>
                <p className="text-[11px] text-slate-400">
                  Sample data to illustrate what your live fleet could look
                  like.
                </p>
              </div>
              <button
                type="button"
                className="rounded-full bg-sky-500 px-3 py-1.5 text-[11px] font-medium text-white shadow-sm hover:bg-sky-400"
              >
                New booking
              </button>
            </div>

            <div className="mt-2 grid gap-3 text-xs md:grid-cols-3">
              <article className="space-y-2 rounded-xl border border-slate-800 bg-slate-950/70 p-3">
                <div className="flex items-center justify-between">
                  <p className="font-medium">Compact car</p>
                  <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                    Available
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <p>Brand: <span className="text-slate-200">EcoDrive</span></p>
                  <p>Owner: <span className="text-slate-200">Alex Motors</span></p>
                </div>
                <p className="text-[11px] text-slate-400">
                  Ideal for city trips and solo travellers.
                </p>
                <p className="text-[11px] text-slate-300">
                  From <span className="font-semibold">₱1,000</span>/day
                </p>
              </article>

              <article className="space-y-2 rounded-xl border border-slate-800 bg-slate-950/70 p-3">
                <div className="flex items-center justify-between">
                  <p className="font-medium">Family van</p>
                  <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                    Available
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <p>Brand: <span className="text-slate-200">UrbanMove</span></p>
                  <p>Owner: <span className="text-slate-200">Riverline Rentals</span></p>
                </div>
                <p className="text-[11px] text-slate-400">
                  Extra space for luggage and up to 7 people.
                </p>
                <p className="text-[11px] text-slate-300">
                  From <span className="font-semibold">₱2,400</span>/day
                </p>
              </article>

              <article className="space-y-2 rounded-xl border border-slate-800 bg-slate-950/70 p-3">
                <div className="flex items-center justify-between">
                  <p className="font-medium">Motorbike</p>
                  <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-300">
                    Limited
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <p>Brand: <span className="text-slate-200">StreetLine</span></p>
                  <p>Owner: <span className="text-slate-200">City Garage</span></p>
                </div>
                <p className="text-[11px] text-slate-400">
                  Perfect for quick errands and short hops.
                </p>
                <p className="text-[11px] text-slate-300">
                  From <span className="font-semibold">₱700</span>/day
                </p>
              </article>
            </div>
          </section>

          {/* My bookings */}
          <section className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h2 className="text-sm font-semibold">My bookings</h2>
                <p className="text-[11px] text-slate-400">
                  Recent and upcoming trips will appear here.
                </p>
              </div>
            </div>

            <div className="mt-2 space-y-3 text-xs">
              <article className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
                <div className="flex items-center justify-between">
                  <p className="font-medium">No active bookings</p>
                  <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300">
                    Demo
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-slate-400">
                  Once you start creating bookings from this account, you&apos;ll
                  see summaries of pickup times, locations, and vehicles here.
                </p>
              </article>
            </div>
          </section>

          {/* Role dashboards */}
          <section className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg md:col-span-2">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h2 className="text-sm font-semibold">Dashboards by role</h2>
                <p className="text-[11px] text-slate-400">
                  Jump to a more focused view for admins, customers, or vehicle
                  owners.
                </p>
              </div>
            </div>

            <div className="mt-3 grid gap-3 text-xs md:grid-cols-3">
              <a
                href="/admin"
                className="block space-y-1 rounded-xl border border-slate-800 bg-slate-950/70 p-3 transition hover:border-fuchsia-500/60 hover:bg-slate-900"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-fuchsia-300">
                  Admin
                </p>
                <p className="text-sm font-medium text-slate-50">
                  Admin dashboard
                </p>
                <p className="text-[11px] text-slate-400">
                  Platform-wide metrics, user management, and moderation tools.
                </p>
              </a>

              <a
                href="/customer"
                className="block space-y-1 rounded-xl border border-slate-800 bg-slate-950/70 p-3 transition hover:border-sky-500/60 hover:bg-slate-900"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-300">
                  Customer
                </p>
                <p className="text-sm font-medium text-slate-50">
                  Customer dashboard
                </p>
                <p className="text-[11px] text-slate-400">
                  Focused on trips, bookings, and saved preferences.
                </p>
              </a>

              <a
                href="/owner"
                className="block space-y-1 rounded-xl border border-slate-800 bg-slate-950/70 p-3 transition hover:border-emerald-500/60 hover:bg-slate-900"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                  Owner
                </p>
                <p className="text-sm font-medium text-slate-50">
                  Vehicle owner dashboard
                </p>
                <p className="text-[11px] text-slate-400">
                  Manage your fleet, availability, and rental earnings.
                </p>
              </a>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

