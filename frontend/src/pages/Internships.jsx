import React from 'react'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Clock, MapPin, Search } from 'lucide-react';
import api from '../api/client';

export default function Internships() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  useEffect(() => { api.get(`/public/internships?search=${search}`).then((res) => setItems(res.data.items)); }, [search]);
  return (
    <main className="bg-white dark:bg-slate-950">
      <section className="container-pad grid gap-8 py-10 lg:grid-cols-[1fr_420px]">
        <div>
          <p className="font-semibold text-brand">OPEN ROLES</p>
          <h1 className="mt-2 text-4xl font-black">Virtual internships with real project outcomes</h1>
          <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-300">Apply with your profile, skills, availability, and career goals. Shortlisted students receive onboarding, weekly tasks, mentoring, and verified completion records.</p>
        </div>
        <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80" alt="" className="h-72 w-full rounded-lg object-cover shadow-soft" />
      </section>

      <section className="container-pad pb-12">
        <label className="relative mb-7 block max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-2.5 text-slate-400" size={18} />
          <input className="input pl-10" placeholder="Search internships" value={search} onChange={(e) => setSearch(e.target.value)} />
        </label>
        <div className="grid gap-5 lg:grid-cols-2">
          {items.map((item) => (
            <div className="interactive-card" key={item._id}>
              <div className="flex flex-wrap justify-between gap-3">
                <div><h2 className="text-2xl font-black">{item.title}</h2><p className="font-semibold text-brand">{item.department}</p></div>
                <span className="h-fit rounded bg-green-50 px-3 py-1 text-sm font-bold text-green-700 dark:bg-green-950">{item.status}</span>
              </div>
              <p className="mt-3 text-slate-600 dark:text-slate-400">{item.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">{item.skills?.map((s) => <span key={s} className="rounded-lg border border-slate-200 px-2 py-1 text-xs dark:border-slate-700">{s}</span>)}</div>
              <div className="mt-5 grid gap-2 text-sm sm:grid-cols-3"><span className="flex items-center gap-2"><Clock size={16} />{item.duration}</span><span className="flex items-center gap-2"><Briefcase size={16} />{item.stipend}</span><span className="flex items-center gap-2"><MapPin size={16} />{item.location || 'Remote'}</span></div>
              <Link className="btn-primary mt-5" to={`/register/internship?internship=${item._id}&title=${encodeURIComponent(item.title)}`}>Apply Now</Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
