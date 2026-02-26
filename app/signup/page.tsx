export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl backdrop-blur">
        <header className="mb-6 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400">
            Online Rental Transportation
          </p>
          <h1 className="mt-2 text-xl font-semibold text-slate-50 sm:text-2xl">
            Create your account
          </h1>
          <p className="mt-1 text-xs text-slate-400 sm:text-sm">
            Sign up to start booking rides and managing rentals.
          </p>
        </header>

        <form className="space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="fullName"
              className="block text-xs font-medium text-slate-200"
            >
              Full name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              className="block w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 shadow-sm outline-none ring-0 transition placeholder:text-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/60"
              placeholder="Alex Doe"
            />
          </div>

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
              className="block w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 shadow-sm outline-none ring-0 transition placeholder:text-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/60"
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="block text-xs font-medium text-slate-200"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="new-password"
              className="block w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 shadow-sm outline-none ring-0 transition placeholder:text-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/60"
              placeholder="Create a strong password"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="role"
              className="block text-xs font-medium text-slate-200"
            >
              I am a
            </label>
            <select
              id="role"
              name="role"
              className="block w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 shadow-sm outline-none ring-0 transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/60"
              defaultValue="customer"
            >
              <option value="customer">Customer (book rides)</option>
              <option value="operator">Operator (manage vehicles)</option>
            </select>
          </div>

          <button
            type="submit"
            className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-emerald-500 px-4 py-2.5 text-sm font-medium text-white shadow-md shadow-emerald-500/30 transition hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            Sign up
          </button>
        </form>

        <p className="mt-5 text-center text-xs text-slate-400">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-medium text-emerald-300 hover:text-emerald-200"
          >
            Log in
          </a>
        </p>

        <p className="mt-4 text-center text-[11px] text-slate-500">
          This is a UI-only signup screen. Connect it to your backend or auth
          provider to store users securely.
        </p>
      </div>
    </div>
  );
}

