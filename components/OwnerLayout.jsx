'use client';

import Link from 'next/link';

const links = [
  { href: '/owner/dashboard', label: 'Dashboard' },
  { href: '/owner/profile', label: 'Manage Profile' },
  { href: '/owner/vehicles', label: 'My Vehicles' },
  { href: '/owner/bookings', label: 'Booking Requests' },
  { href: '/owner/earnings', label: 'Earnings' },
  { href: '/owner/logout', label: 'Log out' },
];

export default function OwnerLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-100">
      <nav className="border-b border-slate-200 bg-white px-4 py-3">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <span className="font-semibold text-slate-800">Owner</span>
          <div className="flex gap-3">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="text-sm text-slate-600 hover:text-slate-900">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
    </div>
  );
}
