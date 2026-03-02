'use client';

const KEY = 'rental_user';

export function getStoredUser() {
  if (typeof window === 'undefined') return null;
  try {
    const s = localStorage.getItem(KEY);
    return s ? JSON.parse(s) : null;
  } catch {
    return null;
  }
}

export function setStoredUser(user) {
  if (typeof window === 'undefined') return;
  if (user) localStorage.setItem(KEY, JSON.stringify(user));
  else localStorage.removeItem(KEY);
}

export function apiHeaders() {
  const u = getStoredUser();
  const h = { 'Content-Type': 'application/json' };
  if (u?.userId) h['x-user-id'] = String(u.userId);
  if (u?.role) h['x-role'] = u.role;
  return h;
}

export function fetchApi(path, options = {}) {
  return fetch(path, { ...options, headers: { ...apiHeaders(), ...options.headers } });
}
