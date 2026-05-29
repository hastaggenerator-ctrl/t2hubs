import React from 'react'
import { useState } from 'react';
import toast from 'react-hot-toast';
import api from '../api/client';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  async function submit(e) {
    e.preventDefault();
    await api.post('/public/contact', form);
    toast.success('Message sent');
    setForm({ name: '', email: '', subject: '', message: '' });
  }
  return <main className="container-pad py-10"><div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr]"><div><p className="font-semibold text-brand">CONTACT</p><h1 className="mt-2 text-4xl font-black">Talk to the T2Hubs team</h1><p className="mt-4 text-slate-600 dark:text-slate-400">For internships, seminars, certificate verification, and partnership queries.</p></div><form onSubmit={submit} className="card"><div className="grid gap-3 sm:grid-cols-2"><input className="input" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /><input className="input" placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></div><input className="input mt-3" placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} /><textarea className="input mt-3 min-h-36" placeholder="Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required /><button className="btn-primary mt-4">Send Message</button></form></div></main>;
}
