export default function OwnerDashboardPage() {
  return (
    <div className="min-h-screen bg-slate-950 px-4 py-6 text-slate-50">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <header className="flex flex-col gap-3 border-b border-slate-800 pb-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400">
              Vehicle owner dashboard
            </p>
            <h1 className="mt-2 text-2xl font-semibold md:text-3xl">
              Manage your fleet
            </h1>
            <p className="mt-1 text-xs text-slate-400 md:text-sm">
              Track your vehicles, earnings, and upcoming rentals in one place.
            </p>
          </div>
        </header>

        <main className="grid gap-6 md:grid-cols-[minmax(0,1.7fr)_minmax(0,1.3fr)]">
          <section className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h2 className="text-sm font-semibold">My vehicles</h2>
                <p className="text-[11px] text-slate-400">
                  Example list of cars you own and rent out.
                </p>
              </div>
              <button className="rounded-full bg-emerald-500 px-3 py-1.5 text-[11px] font-medium text-white shadow-sm hover:bg-emerald-400">
                Add vehicle
              </button>
            </div>

            <div className="mt-2 space-y-3 text-xs">
              <article className="space-y-1 rounded-xl border border-slate-800 bg-slate-950/70 p-3">
                <div className="flex items-center justify-between">
                  <p className="font-medium">EcoDrive Compact · PLT-1023</p>
                  <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                    Available
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Location: Downtown Hub · Next booking: none
                </p>
              </article>

              <article className="space-y-1 rounded-xl border border-slate-800 bg-slate-950/70 p-3">
                <div className="flex items-center justify-between">
                  <p className="font-medium">UrbanMove Van · KTR-8891</p>
                  <span className="rounded-full bg-sky-500/10 px-2 py-0.5 text-[10px] font-semibold text-sky-300">
                    On trip
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Location: Airport Station · Returns: Tomorrow, 10:00 AM
                </p>
              </article>
            </div>
          </section>

          <section className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg">
            <h2 className="text-sm font-semibold">Earnings summary</h2>
            <p className="text-[11px] text-slate-400">
              Demo numbers to show how owner payouts might look.
            </p>
            <dl className="mt-3 space-y-2 text-xs">
              <div className="flex items-center justify-between rounded-xl bg-slate-950/70 px-3 py-2">
                <dt>This week</dt>
                <dd className="font-semibold">₱12,000.00</dd>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-slate-950/70 px-3 py-2">
                <dt>This month</dt>
                <dd className="font-semibold">₱57,000.00</dd>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-slate-950/70 px-3 py-2">
                <dt>Upcoming payout</dt>
                <dd className="font-semibold">₱17,000.00</dd>
              </div>
            </dl>
          </section>
        </main>
      </div>
    </div>
  );
}

