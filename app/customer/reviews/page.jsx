'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { fetchApi } from '@/lib/auth';

export default function LeaveReviewPage() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('bookingId');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [sent, setSent] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!bookingId) return;
    const res = await fetchApi('/api/reviews', {
      method: 'POST',
      body: JSON.stringify({ bookingId: Number(bookingId), rating, comment }),
    });
    if (res.ok) setSent(true);
  }

  if (sent) return <p className="text-slate-600">Thank you! Your review has been submitted.</p>;

  return (
    <div className="max-w-md space-y-4">
      <h1 className="text-2xl font-bold text-slate-900">Leave a Review</h1>
      <p className="text-slate-600">Rate your experience for booking {bookingId || 'your last trip'}.</p>
      <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Rating (1–5)</span>
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="mt-1 w-full rounded border border-slate-300 px-3 py-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Comment</span>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} className="mt-1 w-full rounded border border-slate-300 px-3 py-2" rows={3} />
        </label>
        <button type="submit" className="w-full rounded bg-indigo-600 py-2 font-medium text-white hover:bg-indigo-700">Submit review</button>
      </form>
    </div>
  );
}
