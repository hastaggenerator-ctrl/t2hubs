import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { LockKeyhole, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Auth({ mode = 'login' }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', college: '' });
  const { login, register, loading } = useAuth();
  const navigate = useNavigate();
  async function submit(e) {
    e.preventDefault();
    try {
      const user = mode === 'register' ? await register(form) : await login(form.email, form.password);
      navigate(user.role === 'admin' ? '/admin' : '/student');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Authentication failed');
    }
  }
  return (
    <main className="container-pad grid min-h-[calc(100vh-64px)] place-items-center py-10">
      <form onSubmit={submit} className="card w-full max-w-md animate-fade-up">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-brand dark:bg-blue-950">{mode === 'register' ? <UserPlus /> : <LockKeyhole />}</div>
        <p className="font-semibold text-brand">{mode === 'register' ? 'STUDENT REGISTRATION' : 'LOGIN'}</p>
        <h1 className="mt-2 text-3xl font-black">{mode === 'register' ? 'Create your account' : 'Access your dashboard'}</h1>
        {mode === 'register' && <><input className="input mt-5" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /><input className="input mt-3" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /><input className="input mt-3" placeholder="College" value={form.college} onChange={(e) => setForm({ ...form, college: e.target.value })} /></>}
        <input className={`input ${mode === 'login' ? 'mt-5' : 'mt-3'}`} placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input className="input mt-3" placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <button className="btn-primary mt-5 w-full" disabled={loading}>{loading ? 'Please wait...' : <><LogIn size={18} />{mode === 'register' ? 'Register' : 'Login'}</>}</button>
        <div className="mt-4 flex justify-between text-sm"><Link to={mode === 'register' ? '/login' : '/register'} className="text-brand">{mode === 'register' ? 'Already registered?' : 'Create student account'}</Link><Link to="/forgot-password" className="text-slate-500">Forgot password?</Link></div>
        <p className="mt-5 rounded-lg bg-slate-100 p-3 text-xs dark:bg-slate-800">Demo: admin@t2hubs.com / Admin@123 or student@t2hubs.com / Student@123 after seeding.</p>
      </form>
    </main>
  );
}
