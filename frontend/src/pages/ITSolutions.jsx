import React from 'react';

const features = [
  {
    title: 'Web Development',
    desc: 'Modern responsive websites and single-page applications using React, Tailwind and serverless backends. SEO-friendly and accessible.',
    img: '/assets/t2hubs-logo.jpeg'
  },
  {
    title: 'Mobile App Development',
    desc: 'Cross-platform apps with React Native or Flutter, connected to scalable APIs and CI/CD pipelines for fast releases.',
    img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder'
  },
  {
    title: 'Cloud Solutions',
    desc: 'Design and operate reliable cloud infrastructure on AWS/GCP/Azure — infra as code, cost optimisation, and monitoring.',
    img: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder'
  },
  {
    title: 'Power BI Dashboards',
    desc: 'Turn raw data into actionable dashboards, scheduled reports, and KPIs with Power BI and data pipelines.',
    img: 'https://learn.microsoft.com/en-us/power-bi/create-reports/media/service-dashboards/power-bi-dashboard2.png'
  }
];

export default function ITSolutions() {
  return (
    <div className="space-y-8">
      <section className="card flex flex-col gap-4 md:flex-row md:items-center">
        <div className="md:w-1/2">
          <h1 className="text-3xl font-black">IT Solutions for Startups & Students</h1>
          <p className="mt-3 text-sm text-slate-600">We help teams and learners ship software that users love — from discovery and prototypes to production-ready systems, dashboards and apps.</p>
          <ul className="mt-4 grid gap-2">
            <li className="flex items-start gap-3"><strong>Discovery & Strategy:</strong> Product workshops and roadmap planning.</li>
            <li className="flex items-start gap-3"><strong>Design & UX:</strong> User-centred interfaces and accessibility reviews.</li>
            <li className="flex items-start gap-3"><strong>Delivery:</strong> Engineering sprints, testing, and deployment.</li>
          </ul>
          <div className="mt-4 flex gap-3">
            <a className="btn-primary" href="/contact">Get a Quote</a>
            <a className="btn-ghost" href="/internships">Explore Internships</a>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img src="https://otrs.com/wp-content/uploads/it_solutions_featured-1024x683.jpg" alt="IT Solutions" className="h-40 w-40 rounded-md object-contain" />
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {features.map((f) => (
          <article key={f.title} className="card flex gap-4">
            <div className="w-28 flex-shrink-0 overflow-hidden rounded-lg">
              <img src={f.img} alt="" className="h-28 w-full object-cover" />
            </div>
            <div>
              <h3 className="text-lg font-bold">{f.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{f.desc}</p>
              <ul className="mt-3 text-sm text-slate-500">
                <li>• Project scoping and estimation</li>
                <li>• Dedicated engineering or mentorship</li>
                <li>• Deployment and monitoring</li>
              </ul>
            </div>
          </article>
        ))}
      </section>

      <section className="card">
        <h2 className="text-2xl font-black">Use cases</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div className="rounded-lg border p-4">
            <h4 className="font-bold">MVP for a startup</h4>
            <p className="mt-2 text-sm text-slate-600">Build a lean prototype, validate with users, and iterate quickly to product-market fit.</p>
          </div>
          <div className="rounded-lg border p-4">
            <h4 className="font-bold">Internal dashboards</h4>
            <p className="mt-2 text-sm text-slate-600">Power BI and custom dashboards to monitor KPIs, sales, and operations.</p>
          </div>
          <div className="rounded-lg border p-4">
            <h4 className="font-bold">Student projects & mentorship</h4>
            <p className="mt-2 text-sm text-slate-600">Capstone guidance, code reviews and support to build production-ready portfolios.</p>
          </div>
        </div>
      </section>

      <section className="card">
        <h2 className="text-2xl font-black">Frequently asked</h2>
        <div className="mt-4 grid gap-3">
          <details className="rounded-lg border p-4"><summary className="font-semibold">How long does a typical project take?</summary><p className="mt-2 text-sm text-slate-600">Small projects: 2–6 weeks. Medium: 6–12 weeks. Longer engagements are quoted per scope.</p></details>
          <details className="rounded-lg border p-4"><summary className="font-semibold">Do you provide hosting and maintenance?</summary><p className="mt-2 text-sm text-slate-600">Yes — we can manage hosting, backups and monitoring as a managed service.</p></details>
        </div>
      </section>
    </div>
  );
}
