import React from 'react'
import { useState } from 'react';
import toast from 'react-hot-toast';
import api from '../api/client';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  async function submit(e) {
    e.preventDefault();
    await api.post('/auth/forgot-password', { email });
    toast.success('Reset link sent if the email exists');
  }
  return <main className="container-pad grid min-h-[calc(100vh-64px)] place-items-center"><form onSubmit={submit} className="card w-full max-w-md"><h1 className="text-3xl font-black">Forgot password</h1><input className="input mt-5" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required /><button className="btn-primary mt-4 w-full">Send reset link</button></form></main>;
}

