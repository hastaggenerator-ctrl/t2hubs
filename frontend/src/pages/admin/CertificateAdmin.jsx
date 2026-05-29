import React from 'react'
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../../api/client';

export default function CertificateAdmin() {
  const [students, setStudents] = useState([]);
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ student: '', studentName: '', title: '', grade: 'A', certificateId: '' });
  const [file, setFile] = useState(null);
  const load = async () => {
    const [users, certs] = await Promise.all([api.get('/admin/students'), api.get('/admin/certificates')]);
    setStudents(users.data.items.filter((u) => u.role === 'student'));
    setItems(certs.data.items);
  };
  useEffect(() => { load(); }, []);
  async function create(e) {
    e.preventDefault();
    if (!form.certificateId) return toast.error('Please provide Certificate ID');
    if (!file) return toast.error('Please select a certificate PDF to upload');
    const fd = new FormData();
    fd.append('student', form.student);
    fd.append('studentName', form.studentName);
    fd.append('title', form.title);
    fd.append('grade', form.grade);
    fd.append('certificateId', form.certificateId);
    fd.append('pdf', file);
    await api.post('/certificate', fd);
    toast.success('Certificate uploaded');
    setForm({ student: '', studentName: '', title: '', grade: 'A', certificateId: '' });
    setFile(null);
    load();
  }
  async function email(id) {
    await api.post('/certificate/send-email', { certificateId: id });
    toast.success('Certificate email sent or queued');
  }
  return <div className="space-y-6"><form onSubmit={create} className="card"><h2 className="text-2xl font-black">Upload certificate</h2><div className="mt-5 grid gap-3 md:grid-cols-4"><select className="input" value={form.student} onChange={(e) => { const s = students.find((x) => x._id === e.target.value); setForm({ ...form, student: e.target.value, studentName: s?.name || '' }); }} required><option value="">Select student</option>{students.map((s) => <option value={s._id} key={s._id}>{s.name}</option>)}</select><input className="input" placeholder="Student name" value={form.studentName} onChange={(e) => setForm({ ...form, studentName: e.target.value })} required /><input className="input" placeholder="Certificate title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /><input className="input" placeholder="Grade" value={form.grade} onChange={(e) => setForm({ ...form, grade: e.target.value })} /></div>
    <div className="mt-4 grid gap-3 md:grid-cols-2"><input className="input" placeholder="Certificate ID (as provided by admin)" value={form.certificateId} onChange={(e) => setForm({ ...form, certificateId: e.target.value })} required /><input className="input" type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} /></div>
    <button className="btn-primary mt-4">Upload certificate</button></form><div className="grid gap-4 md:grid-cols-2">{items.map((c) => <div className="card" key={c._id}><div className="text-sm text-slate-500">{c.certificateId}</div><h3 className="text-xl font-black">{c.studentName}</h3><p>{c.title}</p><div className="mt-4 flex gap-2"><a className="btn-ghost" href={`/verify-certificate/${c.certificateId}`}>Verify</a><a className="btn-primary" href={`/api/certificate/download/${c.certificateId}`}>Download PDF</a><button className="btn-ghost" onClick={() => email(c._id)}>Email PDF</button></div></div>)}</div></div>;
}
