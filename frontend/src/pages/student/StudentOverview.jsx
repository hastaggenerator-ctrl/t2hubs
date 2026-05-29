import React from 'react'
import { useEffect, useState } from 'react';
import { Award, Bell, CalendarCheck, CheckCircle2, TrendingUp } from 'lucide-react';
import api from '../../api/client';
import { StatCard } from '../../components/StatCard';

export default function StudentOverview() {
  const [data, setData] = useState({ registrations: [], certificates: [], progress: [], notifications: [], attendance: [] });
  useEffect(() => { api.get('/student/dashboard').then((res) => setData(res.data)); }, []);
  const progress = data.progress?.[0];
  const present = data.attendance?.filter((x) => x.status === 'Present').length || 0;
  const attendance = data.attendance?.length ? Math.round((present / data.attendance.length) * 100) : 0;
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Enrollments" value={data.registrations?.length || 0} />
        <StatCard label="Certificates" value={data.certificates?.length || 0} tone="amber" />
        <StatCard label="Attendance" value={`${attendance}%`} tone="teal" />
        <StatCard label="Progress" value={`${progress?.percentage || 0}%`} tone="rose" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-black"><TrendingUp /> Internship tracker</h2>
          {data.progress?.length ? data.progress.map((p) => (
            <div key={p._id} className="mb-5 last:mb-0">
              <div className="flex justify-between text-sm font-bold"><span>{p.internship?.title}</span><span>{p.percentage}%</span></div>
              <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"><div className="h-3 rounded-full bg-brand transition-all duration-700" style={{ width: `${p.percentage}%` }} /></div>
              <div className="mt-3 space-y-2">{p.tasks?.map((t) => <div key={t.task?._id} className="flex items-center justify-between rounded-lg bg-slate-50 p-2 text-sm dark:bg-slate-800"><span>{t.task?.title}</span><span className={t.completed ? 'text-emerald-600' : 'text-amber-600'}>{t.completed ? 'Done' : 'Pending'}</span></div>)}</div>
            </div>
          )) : <EmptyState text="No internship progress has been assigned yet." />}
        </div>

        <div className="card">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-black"><Bell /> Notifications</h2>
          {data.notifications?.length ? data.notifications.map((n) => <div className="border-b border-slate-100 py-3 last:border-0 dark:border-slate-800" key={n._id}><div className="font-bold">{n.title}</div><div className="text-sm text-slate-500">{n.message}</div></div>) : <EmptyState text="You are all caught up." />}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-black"><Award /> Certificates</h2>
          {data.certificates?.length ? data.certificates.map((c) => <a key={c._id} className="mb-2 block rounded-lg border border-slate-200 p-3 transition hover:border-blue-300 hover:bg-blue-50 dark:border-slate-700 dark:hover:bg-blue-950" href={`/verify-certificate/${c.certificateId}`}>{c.title}<div className="text-sm text-slate-500">{c.certificateId}</div></a>) : <EmptyState text="Certificates will appear here after completion." />}
        </div>
        <div className="card">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-black"><CalendarCheck /> Attendance history</h2>
          {data.attendance?.length ? data.attendance.map((a) => <div key={a._id} className="flex justify-between border-b border-slate-100 py-2 text-sm last:border-0 dark:border-slate-800"><span>{new Date(a.date).toLocaleDateString('en-IN')}</span><span>{a.status}</span></div>) : <EmptyState text="Mark your first attendance from the Attendance tab." />}
        </div>
      </div>
    </div>
  );
}

function EmptyState({ text }) {
  return <div className="rounded-lg border border-dashed border-slate-300 p-5 text-sm text-slate-500 dark:border-slate-700"><CheckCircle2 className="mb-2 text-brand" size={18} />{text}</div>;
}
