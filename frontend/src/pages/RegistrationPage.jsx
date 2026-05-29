import React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ArrowLeft, Briefcase, CheckCircle2 } from 'lucide-react';
import api from '../api/client';

const benefits = ['Weekly project tasks', 'Mentor feedback', 'Completion certificate', 'Portfolio-ready work'];

export default function RegistrationPage() {
  const [params] = useSearchParams();
  const selectedId = params.get('internship');
  const titleFromQuery = params.get('title');
  const [selectedItem, setSelectedItem] = useState(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    currentYear: '',
    preferredTrack: titleFromQuery || '',
    availability: '',
    experience: '',
    portfolio: '',
    goal: '',
    consent: false
  });

  useEffect(() => {
    if (!selectedId) return;
    api.get(`/public/internships/${selectedId}`).then((res) => {
      const item = res.data.item || res.data;
      setSelectedItem(item);
      setForm((current) => ({ ...current, preferredTrack: item.title || current.preferredTrack }));
    }).catch(() => {});
  }, [selectedId]);

  const payload = useMemo(() => ({
    ...form,
    type: 'internship',
    internship: selectedId || undefined,
    source: 'website-registration-page'
  }), [form, selectedId]);

  async function submit(e) {
    e.preventDefault();
    if (!form.consent) {
      toast.error('Please confirm your details before submitting');
      return;
    }
    await api.post('/public/register-interest', payload);
    toast.success('Internship application submitted');
    setForm({ name: '', email: '', phone: '', college: '', currentYear: '', preferredTrack: titleFromQuery || '', availability: '', experience: '', portfolio: '', goal: '', consent: false });
  }

  return (
    <main className="bg-white dark:bg-slate-950">
      <section className="container-pad py-10">
        <Link to="/internships" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-brand"><ArrowLeft size={16} /> Back</Link>
        <div className="grid overflow-hidden rounded-lg border border-slate-200 bg-slate-950 shadow-soft lg:grid-cols-[.9fr_1.1fr] dark:border-slate-800">
          <div className="relative min-h-[360px]">
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80" alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-slate-950/45" />
            <div className="relative flex h-full flex-col justify-end p-7 text-white">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white/15 backdrop-blur"><Briefcase /></div>
              <p className="text-sm font-bold tracking-wide">VIRTUAL INTERNSHIP</p>
              <h1 className="mt-2 max-w-xl text-4xl font-black">Apply for a guided internship</h1>
              <p className="mt-3 max-w-xl text-sm text-slate-200">{selectedItem?.description || 'Share your details and the T2Hubs team will review your application, confirm eligibility, and guide you through the next steps.'}</p>
            </div>
          </div>

          <form onSubmit={submit} className="bg-white p-6 dark:bg-slate-900">
            <div className="mb-5 rounded-lg bg-blue-50 p-4 text-sm text-blue-900 dark:bg-blue-950 dark:text-blue-100">
              <div className="font-black">{selectedItem?.title || form.preferredTrack || 'Internship Application'}</div>
              <div className="mt-1">{selectedItem?.duration || 'Flexible schedule'} - {selectedItem?.location || 'Online'}</div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <input className="input" placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              <input className="input" placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              <input className="input" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
              <input className="input" placeholder="College / organization" value={form.college} onChange={(e) => setForm({ ...form, college: e.target.value })} required />
              <select className="input" value={form.currentYear} onChange={(e) => setForm({ ...form, currentYear: e.target.value })} required>
                <option value="">Current year</option>
                <option>1st Year</option>
                <option>2nd Year</option>
                <option>3rd Year</option>
                <option>Final Year</option>
                <option>Graduate</option>
              </select>
              <input className="input" placeholder="Preferred internship track" value={form.preferredTrack} onChange={(e) => setForm({ ...form, preferredTrack: e.target.value })} required />
              <select className="input" value={form.availability} onChange={(e) => setForm({ ...form, availability: e.target.value })} required>
                <option value="">Availability</option>
                <option>Weekdays</option>
                <option>Weekends</option>
                <option>Evenings</option>
                <option>Flexible</option>
              </select>
              <input className="input" placeholder="Portfolio / LinkedIn URL" value={form.portfolio} onChange={(e) => setForm({ ...form, portfolio: e.target.value })} />
            </div>
            <textarea className="input mt-3 min-h-24" placeholder="Previous experience or skills" value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} />
            <textarea className="input mt-3 min-h-24" placeholder="What do you want to achieve?" value={form.goal} onChange={(e) => setForm({ ...form, goal: e.target.value })} required />
            <label className="mt-4 flex items-start gap-3 rounded-lg bg-slate-50 p-3 text-sm dark:bg-slate-800">
              <input type="checkbox" className="mt-1" checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} />
              <span>I confirm these details are correct and agree to be contacted by T2Hubs for admission and schedule updates.</span>
            </label>
            <button className="btn-primary mt-5 w-full">Submit application</button>
          </form>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {benefits.map((benefit) => <div className="interactive-card" key={benefit}><CheckCircle2 className="mb-3 text-mint" /><div className="font-bold">{benefit}</div></div>)}
        </div>
      </section>

      <section className="container-pad pb-12">
        <div className="grid gap-5 rounded-lg border border-slate-200 bg-slate-50 p-5 md:grid-cols-3 dark:border-slate-800 dark:bg-slate-900">
          {['Eligibility review', 'Counsellor confirmation', 'Internship onboarding'].map((step, index) => <div key={step} className="flex gap-3"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand font-black text-white">{index + 1}</div><div><h3 className="font-black">{step}</h3><p className="mt-1 text-sm text-slate-500">The team checks your form and shares the next step by email or phone.</p></div></div>)}
        </div>
      </section>
    </main>
  );
}
