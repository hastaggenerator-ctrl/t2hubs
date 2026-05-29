import React from 'react'
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../../api/client';

export default function AttendanceAdmin() {
  const [records, setRecords] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const load = async () => {
    const [attendance, leave] = await Promise.all([api.get('/admin/attendance/reports'), api.get('/admin/leave-requests')]);
    setRecords(attendance.data);
    setLeaves(leave.data.items);
  };
  useEffect(() => { load(); }, []);
  async function review(id, status) {
    await api.patch(`/admin/leave/${id}`, { status });
    toast.success(`Leave ${status}`);
    load();
  }
  function exportCsv() {
    const csv = ['Student,Date,Status', ...records.map((r) => `${r.student?.name || ''},${new Date(r.date).toLocaleDateString()},${r.status}`)].join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    Object.assign(document.createElement('a'), { href: url, download: 'attendance.csv' }).click();
  }
  return <div className="space-y-6"><div className="card"><div className="flex justify-between gap-3"><h2 className="text-2xl font-black">Attendance reports</h2><button className="btn-primary" onClick={exportCsv}>Export CSV</button></div><div className="mt-4 overflow-x-auto"><table className="w-full min-w-[560px] text-left text-sm"><tbody>{records.map((r) => <tr key={r._id}><td className="border-b border-slate-100 p-3 dark:border-slate-800">{r.student?.name}</td><td className="border-b border-slate-100 p-3 dark:border-slate-800">{new Date(r.date).toLocaleDateString()}</td><td className="border-b border-slate-100 p-3 dark:border-slate-800">{r.status}</td></tr>)}</tbody></table></div></div><div className="card"><h2 className="text-2xl font-black">Leave approvals</h2>{leaves.map((l) => <div key={l._id} className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-slate-50 p-3 dark:bg-slate-800"><div><b>{l.student?.name}</b><div className="text-sm text-slate-500">{l.reason}</div></div><div className="flex gap-2"><button className="btn-ghost py-1" onClick={() => review(l._id, 'Rejected')}>Reject</button><button className="btn-primary py-1" onClick={() => review(l._id, 'Approved')}>Approve</button></div></div>)}</div></div>;
}
