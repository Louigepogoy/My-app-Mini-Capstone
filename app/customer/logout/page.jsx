'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { setStoredUser } from '@/lib/auth';

export default function CustomerLogoutPage() {
  const router = useRouter();
  useEffect(() => {
    setStoredUser(null);
    router.replace('/login');
  }, [router]);
  return <p className="text-slate-600">Logging out…</p>;
}
