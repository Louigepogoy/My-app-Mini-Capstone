export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-50 via-white to-emerald-50 px-4">
      <main className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-16 py-16 md:flex-row md:py-24">
        <section className="flex w-full flex-1 flex-col items-start gap-6 text-left">
          <p className="rounded-full bg-white/80 px-4 py-1 text-xs font-medium uppercase tracking-[0.2em] text-sky-700 shadow-sm ring-1 ring-sky-100">
            Online Rental Transportation
          </p>
          <h1 className="text-balance text-4xl font-semibold leading-tight text-slate-900 md:text-5xl">
            Book rides and rentals
            <span className="block text-sky-600">in just a few clicks.</span>
          </h1>
          <p className="max-w-xl text-balance text-sm text-slate-600 md:text-base">
            Seamlessly rent cars, vans, and bikes for your next trip. Real‑time
            availability, transparent pricing, and a smooth online booking
            experience for customers and operators.
          </p>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <a
              href="/signup"
              className="inline-flex items-center justify-center rounded-full bg-sky-600 px-7 py-3 text-sm font-medium text-white shadow-md shadow-sky-600/30 transition hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
            >
              Get started — Sign up
            </a>
            <a
              href="/login"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-7 py-3 text-sm font-medium text-slate-800 shadow-sm transition hover:border-sky-200 hover:bg-sky-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
            >
              Already have an account? Log in
            </a>
          </div>

          <dl className="mt-6 grid w-full max-w-lg grid-cols-2 gap-4 text-xs text-slate-500 sm:text-sm">
            <div className="rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-slate-100">
              <dt className="font-semibold text-slate-800">For customers</dt>
              <dd className="mt-1">
                Browse vehicles, compare prices, and confirm bookings in
                minutes.
              </dd>
            </div>
            <div className="rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-slate-100">
              <dt className="font-semibold text-slate-800">For operators</dt>
              <dd className="mt-1">
                Manage your fleet, track requests, and keep schedules organized.
              </dd>
            </div>
          </dl>
        </section>

        <section className="relative mt-6 w-full flex-1 md:mt-0">
          <div className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full bg-sky-100 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-10 -left-4 h-32 w-32 rounded-full bg-emerald-100 blur-3xl" />

          <div className="relative mx-auto w-full max-w-md rounded-3xl bg-white/90 p-6 shadow-xl shadow-slate-900/5 ring-1 ring-slate-100 backdrop-blur">
            <h2 className="text-sm font-semibold text-slate-900">
              Quick booking preview
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              This is a preview card. Hook this up to your real data and auth.
            </p>

            <div className="mt-5 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-[11px] font-medium text-slate-600">
                    Pickup location
                  </label>
                  <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] text-slate-700">
                    Downtown Hub
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="block text-[11px] font-medium text-slate-600">
                    Drop-off
                  </label>
                  <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] text-slate-700">
                    Airport Station
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-[11px] font-medium text-slate-600">
                    Date
                  </label>
                  <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] text-slate-700">
                    Today
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="block text-[11px] font-medium text-slate-600">
                    Vehicle type
                  </label>
                  <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] text-slate-700">
                    Compact car
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-slate-900 px-4 py-3 text-xs text-slate-100">
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-slate-400">
                    Estimated total
                  </p>
                  <p className="mt-1 text-base font-semibold">$42.80</p>
                </div>
                <button
                  type="button"
                  className="rounded-full bg-sky-500 px-4 py-2 text-[11px] font-medium text-white shadow-sm transition hover:bg-sky-400"
                >
                  Continue to sign up
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
