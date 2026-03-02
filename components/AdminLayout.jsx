'use client';

import Link from 'next/link';

const links = [
  { href: '/admin/dashboard', label: 'Dashboard' },
  { href: '/admin/users', label: 'Manage Users' },
  { href: '/admin/vehicles', label: 'Vehicles' },
  { href: '/admin/bookings', label: 'Bookings' },
  { href: '/admin/reports', label: 'System Reports' },
  { href: '/admin/logout', label: 'Log out' },
];

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-100">
      <nav className="border-b border-slate-200 bg-slate-800 px-4 py-3 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <span className="font-semibold">Admin</span>
          <div className="flex gap-3">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="text-sm text-slate-200 hover:text-white">
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
