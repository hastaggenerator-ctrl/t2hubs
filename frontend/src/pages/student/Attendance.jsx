import React from 'react'
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { CalendarCheck, Clock, Send, ShieldCheck } from 'lucide-react';
import api from '../../api/client';

export default function Attendance() {
  const [data, setData] = useState({ records: [], percentage: 0, canMarkToday: true, todayRecord: null });
  const [marking, setMarking] = useState(false);
  const load = () => api.get('/attendance/student/me').then((res) => setData(res.data));
  useEffect(() => { load(); }, []);
  async function mark() {
    setMarking(true);
    try {
      await api.post('/attendance/mark', { status: 'Present', note: 'Marked from student dashboard' });
      toast.success('Attendance marked for today');
      load();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not mark attendance');
      load();
    } finally {
      setMarking(false);
    }
  }
  async function leave(e) {
    e.preventDefault();
    try {
      await api.post('/student/leave', Object.fromEntries(new FormData(e.currentTarget)));
      toast.success('Leave request submitted');
      e.currentTarget.reset();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not submit leave request');
    }
  }
  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
      <div className="card overflow-hidden">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold text-brand"><CalendarCheck size={16} /> Daily check-in</p>
            <h2 className="mt-2 text-2xl font-black">Attendance</h2>
          </div>
          <div className="rounded-lg bg-blue-50 px-4 py-3 text-right text-blue-700 dark:bg-blue-950">
            <div className="text-3xl font-black">{data.percentage}%</div>
            <div className="text-xs font-semibold">overall</div>
          </div>
        </div>

        <div className={`mt-5 rounded-lg border p-4 ${data.canMarkToday ? 'border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-100' : 'border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-100'}`}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 font-black">{data.canMarkToday ? <Clock size={18} /> : <ShieldCheck size={18} />}{data.canMarkToday ? 'Ready to mark today' : 'Already marked today'}</div>
              <p className="mt-1 text-sm opacity-80">{data.canMarkToday ? 'One attendance entry is allowed per student per day.' : `Status: ${data.todayRecord?.status || 'Present'}`}</p>
            </div>
            <button className="btn-primary" disabled={!data.canMarkToday || marking} onClick={mark}>{marking ? 'Marking...' : 'Mark present'}</button>
          </div>
        </div>

        <div className="mt-5 divide-y divide-slate-100 dark:divide-slate-800">
          {data.records.length ? data.records.map((r) => (
            <div key={r._id} className="flex items-center justify-between py-3 text-sm">
              <span>{new Date(r.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold dark:bg-slate-800">{r.status}</span>
            </div>
          )) : <p className="py-6 text-sm text-slate-500">No attendance records yet.</p>}
        </div>
      </div>

      <form onSubmit={leave} className="card">
        <p className="flex items-center gap-2 text-sm font-semibold text-brand"><Send size={16} /> Request time off</p>
        <h2 className="mt-2 text-2xl font-black">Leave request</h2>
        <input name="from" className="input mt-4" type="date" required />
        <input name="to" className="input mt-3" type="date" required />
        <textarea name="reason" className="input mt-3 min-h-28" placeholder="Reason" required />
        <button className="btn-primary mt-4 w-full">Submit leave</button>
      </form>
    </div>
  );
}
