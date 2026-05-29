import React from 'react'
import { useEffect, useState } from 'react';
import { Activity, Inbox, ShieldCheck } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import api from '../../api/client';
import { StatCard } from '../../components/StatCard';

export default function AdminOverview() {
  const [data, setData] = useState({ totals: {}, monthlyRegistrations: [] });
  useEffect(() => { api.get('/admin/analytics').then((res) => setData(res.data)); }, []);
  const t = data.totals || {};
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Students" value={t.students || 0} />
        <StatCard label="Internships" value={t.internships || 0} tone="teal" />
        <StatCard label="Certificates" value={t.certificates || 0} tone="amber" />
        <StatCard label="New Messages" value={t.messages || 0} tone="rose" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="card">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 text-xl font-black"><Activity /> Registration analytics</h2>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-brand dark:bg-blue-950">{data.attendancePercentage || 0}% attendance</span>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.monthlyRegistrations}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#2563eb" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="interactive-card">
            <Inbox className="text-rose-600" />
            <h3 className="mt-3 text-lg font-black">Messages waiting</h3>
            <p className="mt-2 text-sm text-slate-500">Review new contact messages and update their status from the Messages section.</p>
          </div>
          <div className="interactive-card">
            <ShieldCheck className="text-emerald-600" />
            <h3 className="mt-3 text-lg font-black">Certificate control</h3>
            <p className="mt-2 text-sm text-slate-500">Generate, verify, and manage student certificates from a dedicated admin workflow.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
