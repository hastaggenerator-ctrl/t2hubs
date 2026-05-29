import React from 'react'
import { useState } from 'react';
import toast from 'react-hot-toast';
import api from '../api/client';

export default function Seminar() {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  async function submit(e) {
    e.preventDefault();
    await api.post('/public/register-interest', { ...form, type: 'seminar' });
    toast.success('Seminar registration submitted');
    setForm({ name: '', email: '', phone: '' });
  }
  return <main className="container-pad py-10"><div className="grid gap-8 lg:grid-cols-[1fr_420px]"><section><div className="mb-8 grid min-h-72 place-items-center rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900"><img src="/assets/t2hubs-logo.jpeg" alt="T2Hubs seminar" className="max-h-60 w-full object-contain" /></div><p className="font-semibold text-brand">CAREER GUIDANCE SEMINAR</p><h1 className="mt-2 text-5xl font-black">Crack your first internship with a clear roadmap.</h1><p className="mt-5 text-lg text-slate-600 dark:text-slate-300">Join a mentor-led seminar covering career direction, resume improvements, LinkedIn, interview preparation, portfolio building, and internship strategy.</p><div className="mt-8 grid gap-4 sm:grid-cols-3">{['Live mentor Q&A', 'Resume checklist', 'Certificate of participation'].map((x) => <div className="interactive-card" key={x}>{x}</div>)}</div></section><form onSubmit={submit} className="card h-fit"><h2 className="text-2xl font-black">Register now</h2><input className="input mt-4" placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /><input className="input mt-3" placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /><input className="input mt-3" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /><button className="btn-primary mt-5 w-full">Submit Registration</button></form></div></main>;
}
