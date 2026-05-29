import React from 'react'
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Plus, Search, Trash2 } from 'lucide-react';
import api from '../../api/client';

const configs = {
  students: { title: 'Students', endpoint: '/admin/students', fields: ['name', 'email', 'phone', 'college'] },
  internships: { title: 'Internships', endpoint: '/admin/internships', fields: ['title', 'department', 'duration', 'status'] },
  seminars: { title: 'Seminars', endpoint: '/admin/seminars', fields: ['title', 'speaker', 'topic', 'meetingLink'] },
  certificates: { title: 'Certificates', endpoint: '/admin/certificates', fields: ['certificateId', 'studentName', 'title', 'grade'] },
  messages: { title: 'Contact Messages', endpoint: '/admin/messages', fields: ['name', 'email', 'subject', 'status'] },
  content: { title: 'Website Content', endpoint: '/admin/content', fields: ['key', 'title', 'body'] }
};

export default function ResourceManager({ type }) {
  const config = configs[type];
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({});
  const [query, setQuery] = useState('');
  const load = () => api.get(config.endpoint).then((res) => setItems(res.data.items));
  useEffect(() => { setForm({}); load(); }, [type]);
  async function save(e) {
    e.preventDefault();
    await api.post(config.endpoint, form);
    toast.success(`${config.title} saved`);
    setForm({});
    load();
  }
  async function remove(id) {
    await api.delete(`${config.endpoint}/${id}`);
    toast.success('Deleted');
    load();
  }
  const filtered = items.filter((item) => config.fields.some((field) => String(item[field] || item[field]?.title || '').toLowerCase().includes(query.toLowerCase())));
  return (
    <div className="space-y-6">
      <form onSubmit={save} className="card">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-brand">ADMIN RESOURCE</p>
            <h2 className="text-2xl font-black">Manage {config.title}</h2>
          </div>
          <button className="btn-primary"><Plus size={18} /> Add record</button>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-3">{config.fields.filter((f) => f !== 'certificateId').map((field) => <input key={field} className="input" placeholder={field} value={form[field] || ''} onChange={(e) => setForm({ ...form, [field]: e.target.value })} />)}</div>
      </form>

      <div className="card overflow-x-auto">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg font-black">{filtered.length} records</h3>
          <label className="relative w-full sm:w-72">
            <Search className="pointer-events-none absolute left-3 top-2.5 text-slate-400" size={18} />
            <input className="input pl-10" placeholder="Search records" value={query} onChange={(e) => setQuery(e.target.value)} />
          </label>
        </div>
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead><tr>{config.fields.map((f) => <th className="border-b border-slate-200 p-3 font-black dark:border-slate-800" key={f}>{f}</th>)}<th className="border-b border-slate-200 p-3 font-black dark:border-slate-800">Action</th></tr></thead>
          <tbody>{filtered.map((item) => <tr key={item._id} className="transition hover:bg-slate-50 dark:hover:bg-slate-800/60">{config.fields.map((f) => <td className="border-b border-slate-100 p-3 dark:border-slate-800" key={f}>{String(item[f] || item[f]?.title || '')}</td>)}<td className="border-b border-slate-100 p-3 dark:border-slate-800"><button className="btn-ghost py-1" onClick={() => remove(item._id)}><Trash2 size={16} /> Delete</button></td></tr>)}</tbody>
        </table>
        {!filtered.length && <p className="py-8 text-center text-sm text-slate-500">No records found.</p>}
      </div>
    </div>
  );
}
