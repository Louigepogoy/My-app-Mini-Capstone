export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl backdrop-blur">
        <header className="mb-6 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-400">
            Online Rental Transportation
          </p>
          <h1 className="mt-2 text-xl font-semibold text-slate-50 sm:text-2xl">
            Welcome back
          </h1>
          <p className="mt-1 text-xs text-slate-400 sm:text-sm">
            Log in to manage your trips, vehicles, and bookings.
          </p>
        </header>

        <form className="space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="block text-xs font-medium text-slate-200"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="block w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 shadow-sm outline-none ring-0 transition placeholder:text-slate-500 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/60"
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-xs font-medium text-slate-200"
              >
                Password
              </label>
              <button
                type="button"
                className="text-[11px] font-medium text-sky-300 hover:text-sky-200"
              >
                Forgot?
              </button>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="block w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 shadow-sm outline-none ring-0 transition placeholder:text-slate-500 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/60"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-sky-500 px-4 py-2.5 text-sm font-medium text-white shadow-md shadow-sky-500/30 transition hover:bg-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            Log in
          </button>
        </form>

        <p className="mt-5 text-center text-xs text-slate-400">
          New to the platform?{" "}
          <a
            href="/signup"
            className="font-medium text-sky-300 hover:text-sky-200"
          >
            Create an account
          </a>
        </p>

        <p className="mt-4 text-center text-[11px] text-slate-500">
          This is a UI-only login screen. Connect it to your auth API or
          provider to make it fully functional.
        </p>
      </div>
    </div>
  );
}

