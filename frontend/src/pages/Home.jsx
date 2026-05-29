import React from 'react'
import { motion } from 'framer-motion';
import { ArrowRight, Award, Briefcase, CheckCircle2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../api/client';
import { features, stats } from '../data/static';

export default function Home() {
  const [data, setData] = useState({ internships: [], testimonials: [], faqs: [] });
  useEffect(() => { api.get('/public/home').then((res) => setData(res.data)).catch(() => {}); }, []);
  return (
    <main>
      <section className="overflow-hidden bg-white dark:bg-slate-950">
        <div className="container-pad grid min-h-[calc(100vh-64px)] items-center gap-10 py-14 lg:grid-cols-[1.1fr_.9fr]">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-semibold text-brand dark:border-blue-900 dark:bg-blue-950"><Sparkles size={16} /> Internships + Seminars + Certificates</div>
            <h1 className="max-w-3xl text-5xl font-black leading-tight sm:text-6xl">Build skills, finish real internships, and verify every certificate.</h1>
            <p className="mt-5 max-w-2xl text-lg text-slate-600 dark:text-slate-300">T2Hubs helps students move from career confusion to portfolio-ready confidence with guided seminars, virtual internships, attendance, progress tracking, and QR-verifiable certificates.</p>
            <div className="mt-7 flex flex-wrap gap-3"><Link className="btn-primary" to="/internships">Explore Internships <ArrowRight size={18} /></Link><Link className="btn-ghost" to="/verify-certificate">Verify Certificate</Link></div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} className="animate-float-soft rounded-lg border border-slate-200 bg-slate-950 p-4 text-white shadow-soft dark:border-slate-800">
            <div className="grid gap-3 sm:grid-cols-2">
              {features.map((item) => <div key={item} className="rounded-lg bg-white/10 p-4 transition hover:-translate-y-1 hover:bg-white/15"><CheckCircle2 className="mb-4 text-mint" /><div className="font-bold">{item}</div><p className="mt-2 text-sm text-slate-300">Mentor-led, outcome-focused, and dashboard tracked.</p></div>)}
            </div>
          </motion.div>
        </div>
      </section>
      <section className="container-pad py-12"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{stats.map(([value, label]) => <div key={label} className="card"><div className="text-3xl font-black text-brand">{value}</div><div className="text-sm text-slate-600 dark:text-slate-400">{label}</div></div>)}</div></section>
      <section className="container-pad py-12"><div className="mb-8 flex items-end justify-between gap-4"><div><p className="font-semibold text-brand">INTERNSHIPS</p><h2 className="text-3xl font-black">Career-ready internship tracks</h2></div><Link className="btn-ghost" to="/internships">View all</Link></div><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">{data.internships?.map((item) => <InternshipCard key={item._id} item={item} />)}</div></section>
      <section className="container-pad py-12"><div className="grid gap-6 lg:grid-cols-2"><div className="card"><Briefcase className="text-brand" /><h2 className="mt-4 text-2xl font-black">Internship completion tracker</h2><p className="mt-3 text-slate-600 dark:text-slate-400">Weekly assignment timelines, task completion, progress bars, mentor feedback, final status, and automatic certificate workflows.</p></div><div className="card"><Award className="text-gold" /><h2 className="mt-4 text-2xl font-black">Certificate verification</h2><p className="mt-3 text-slate-600 dark:text-slate-400">Each certificate has a unique ID, downloadable PDF, QR verification URL, and optional email delivery to students.</p></div></div></section>
      <section className="container-pad py-12"><h2 className="mb-6 text-3xl font-black">Testimonials</h2><div className="grid gap-5 md:grid-cols-3">{data.testimonials?.map((t) => <div className="card" key={t.name}><p className="text-slate-600 dark:text-slate-300">"{t.quote}"</p><div className="mt-4 font-bold">{t.name}</div><div className="text-sm text-slate-500">{t.role}</div></div>)}</div></section>
      <section className="container-pad py-12"><h2 className="mb-6 text-3xl font-black">FAQ</h2><div className="grid gap-4 md:grid-cols-3">{data.faqs?.map(([q, a]) => <div className="card" key={q}><h3 className="font-bold">{q}</h3><p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{a}</p></div>)}</div></section>
    </main>
  );
}

function InternshipCard({ item }) {
  return <div className="interactive-card flex flex-col"><div className="text-sm font-semibold text-brand">{item.department}</div><h3 className="mt-2 text-xl font-black">{item.title}</h3><p className="mt-3 flex-1 text-sm text-slate-600 dark:text-slate-400">{item.description}</p><div className="mt-4 flex items-center justify-between text-sm"><span>{item.duration}</span><span className="font-bold">{item.location || 'Remote'}</span></div></div>;
}
