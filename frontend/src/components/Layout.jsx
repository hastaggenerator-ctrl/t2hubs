import React from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Link, NavLink, useLocation, useNavigate, useOutlet } from 'react-router-dom';
import { BarChart3, CalendarCheck, Home, LogOut, Menu, Moon, ShieldCheck, Sun, UserRound, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { socialLinks } from '../data/static';

const nav = [
  ['/', 'Home'],
  ['/it-solutions', 'IT Solutions'],
  ['/internships', 'Internships'],
  ['/seminar', 'Seminar'],
  ['/verify-certificate', 'Verify'],
  ['/contact', 'Contact']
];

const studentNav = [
  ['/student', 'Overview', Home],
  ['/student/profile', 'Profile', UserRound],
  ['/student/attendance', 'Attendance', CalendarCheck]
];

const adminNav = [
  ['/admin', 'Analytics', BarChart3],
  ['/admin/students', 'Students', UserRound],
  ['/admin/attendance', 'Attendance', CalendarCheck],
  ['/admin/certificates', 'Certificates', ShieldCheck]
];

export function Layout() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const outlet = useOutlet();
  const reduceMotion = useReducedMotion();
  const [dark, setDark] = useState(() => localStorage.theme === 'dark');
  const [open, setOpen] = useState(false);
  const activeNav = user ? (isAdmin ? adminNav : studentNav) : nav.map(([to, label]) => [to, label, null]);
  const homePath = user ? (isAdmin ? '/admin' : '/student') : '/';

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.theme = dark ? 'dark' : 'light';
  }, [dark]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const frame = requestAnimationFrame(() => {
      const elements = document.querySelectorAll('main section, main .card, main .interactive-card, main form, main table');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('is-visible', entry.isIntersecting);
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

      elements.forEach((element, index) => {
        element.classList.add('scroll-reveal');
        element.style.setProperty('--reveal-delay', `${Math.min(index % 6, 5) * 45}ms`);
        observer.observe(element);
      });

      window.__t2hubsScrollObserver = observer;
    });

    return () => {
      cancelAnimationFrame(frame);
      window.__t2hubsScrollObserver?.disconnect();
      window.__t2hubsScrollObserver = null;
    };
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-slate-50 dark:bg-slate-950">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
        <div className="container-pad flex h-16 items-center justify-between">
          <Link to={homePath} className="flex items-center gap-2 text-xl font-black">
            <img src="/assets/t2hubs-logo.jpeg" alt="T2Hubs" className="h-10 w-10 rounded-lg object-contain ring-1 ring-slate-200 dark:ring-slate-800" />
            <span>T2Hubs</span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {activeNav.map(([to, label, Icon]) => (
              <NavLink key={to} end={to === '/student' || to === '/admin'} to={to} className={({ isActive }) => `inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition ${isActive ? 'bg-blue-50 text-brand dark:bg-blue-950' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'}`}>
                {Icon ? <Icon size={16} /> : null}{label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button className="btn-ghost px-3" onClick={() => setDark((v) => !v)} aria-label="Toggle theme">{dark ? <Sun size={18} /> : <Moon size={18} />}</button>
            {user ? (
              <>
                <button className="hidden btn-primary sm:inline-flex" onClick={() => navigate(isAdmin ? '/admin' : '/student')}>{isAdmin ? 'Admin Portal' : 'Student Portal'}</button>
                <button className="btn-ghost px-3" onClick={logout} aria-label="Logout"><LogOut size={18} /></button>
              </>
            ) : <Link className="btn-primary" to="/login">Login</Link>}
            <button className="btn-ghost px-3 md:hidden" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu">{open ? <X size={18} /> : <Menu size={18} />}</button>
          </div>
        </div>
        {open && (
          <nav className="container-pad grid gap-2 border-t border-slate-200 py-3 md:hidden dark:border-slate-800">
            {activeNav.map(([to, label, Icon]) => (
              <NavLink key={to} end={to === '/student' || to === '/admin'} to={to} onClick={() => setOpen(false)} className={({ isActive }) => `flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-semibold ${isActive ? 'bg-blue-50 text-brand dark:bg-blue-950' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                {Icon ? <Icon size={16} /> : null}{label}
              </NavLink>
            ))}
          </nav>
        )}
      </header>
      <div className="flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={reduceMotion ? false : { opacity: 0, x: 36, filter: 'blur(2px)' }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -28, filter: 'blur(2px)' }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {outlet}
          </motion.div>
        </AnimatePresence>
      </div>
      <footer className="mt-auto border-t border-slate-200 bg-white py-10 dark:border-slate-800 dark:bg-slate-950">
        <div className="container-pad grid gap-6 md:grid-cols-3">
          <div><div className="flex items-center gap-2 text-lg font-black"><img src="/assets/t2hubs-logo.jpeg" alt="T2Hubs" className="h-9 w-9 rounded-lg object-contain ring-1 ring-slate-200 dark:ring-slate-800" /> T2Hubs</div><p className="mt-3 text-sm text-slate-600 dark:text-slate-400">Premium internship, training, seminar, and certificate platform for career-ready students.</p></div>
          <div className="text-sm"><h3 className="font-bold">{user ? 'Portal' : 'Explore'}</h3><div className="mt-3 grid gap-2">{activeNav.slice(user ? 0 : 1).map(([to, label]) => <Link key={to} to={to} className="text-slate-600 hover:text-brand dark:text-slate-400">{label}</Link>)}</div></div>
          <div className="text-sm"><h3 className="font-bold">Social</h3><div className="mt-3 flex flex-wrap gap-2">{socialLinks.map((item) => <span key={item} className="rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700">{item}</span>)}</div></div>
        </div>
      </footer>
    </div>
  );
}
