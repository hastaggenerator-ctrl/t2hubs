import React from 'react'
import { NavLink, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export function DashboardShell({ links }) {
  const { user } = useAuth();
  return (
    <main className="container-pad py-8">
      <div className="mb-6 overflow-hidden rounded-lg border border-slate-200 bg-white p-5 shadow-sm panel-grid dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-brand">{user?.role?.toUpperCase()} PORTAL</p>
            <h1 className="mt-1 text-3xl font-black">Welcome, {user?.name}</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-400">{user?.role === 'admin' ? 'Manage students, resources, attendance, certificates, and incoming requests from one focused workspace.' : 'Track attendance, profile details, certificates, and internship progress without leaving your dashboard.'}</p>
          </div>
          <div className="rounded-lg bg-slate-950 px-4 py-3 text-sm font-bold text-white shadow-soft dark:bg-white dark:text-slate-950">{new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' })}</div>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <aside className="card sticky top-24 h-fit p-2">
          {links.map(([to, label]) => <NavLink key={to} end to={to} className={({ isActive }) => `mb-1 block rounded-lg px-3 py-2 text-sm font-semibold transition last:mb-0 ${isActive ? 'bg-brand text-white shadow-sm shadow-blue-500/20' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}>{label}</NavLink>)}
        </aside>
        <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
          <Outlet />
        </motion.section>
      </div>
    </main>
  );
}
