import React from 'react'
export function StatCard({ label, value, tone = 'blue' }) {
  const tones = { blue: 'bg-blue-50 text-blue-700 ring-blue-100 dark:bg-blue-950 dark:ring-blue-900', teal: 'bg-teal-50 text-teal-700 ring-teal-100 dark:bg-teal-950 dark:ring-teal-900', amber: 'bg-amber-50 text-amber-700 ring-amber-100 dark:bg-amber-950 dark:ring-amber-900', rose: 'bg-rose-50 text-rose-700 ring-rose-100 dark:bg-rose-950 dark:ring-rose-900' };
  return <div className={`rounded-lg p-5 ring-1 transition duration-200 hover:-translate-y-1 hover:shadow-soft ${tones[tone]}`}><div className="text-3xl font-black">{value}</div><div className="mt-1 text-sm font-semibold opacity-80">{label}</div></div>;
}
