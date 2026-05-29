import React from 'react'
import { useState } from 'react';
import toast from 'react-hot-toast';
import api from '../../api/client';
import { useAuth } from '../../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();
  const [form, setForm] = useState(user || {});
  async function submit(e) {
    e.preventDefault();
    await api.patch('/student/profile', form);
    toast.success('Profile updated');
  }
  return <form onSubmit={submit} className="card max-w-2xl"><h2 className="text-2xl font-black">Profile management</h2><div className="mt-5 grid gap-3 sm:grid-cols-2"><input className="input" placeholder="Name" value={form.name || ''} onChange={(e) => setForm({ ...form, name: e.target.value })} /><input className="input" placeholder="Phone" value={form.phone || ''} onChange={(e) => setForm({ ...form, phone: e.target.value })} /><input className="input sm:col-span-2" placeholder="College" value={form.college || ''} onChange={(e) => setForm({ ...form, college: e.target.value })} /><textarea className="input min-h-28 sm:col-span-2" placeholder="Bio" value={form.bio || ''} onChange={(e) => setForm({ ...form, bio: e.target.value })} /></div><button className="btn-primary mt-5">Save profile</button></form>;
}

