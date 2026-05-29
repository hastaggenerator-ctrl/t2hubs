import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import api, { API_URL } from '../api/client';

export default function VerifyCertificate() {
  const params = useParams();
  const [id, setId] = useState(params.id || '');
  const [certificate, setCertificate] = useState(null);
  async function verify(e) {
    e?.preventDefault();
    try {
      const { data } = await api.get(`/certificate/verify/${id}`);
      setCertificate(data);
    } catch (error) {
      setCertificate(null);
      toast.error(error.response?.data?.message || 'Certificate not found');
    }
  }
  useEffect(() => { if (params.id) verify(); }, [params.id]);
  return <main className="container-pad py-10"><div className="mx-auto max-w-3xl"><p className="font-semibold text-brand">CERTIFICATE VERIFICATION</p><h1 className="mt-2 text-4xl font-black">Verify a T2Hubs certificate</h1><form onSubmit={verify} className="mt-6 flex gap-3"><input className="input" placeholder="Enter certificate number" value={id} onChange={(e) => setId(e.target.value)} required /><button className="btn-primary">Verify</button></form>{certificate && <div className="card mt-6"><div className="rounded-lg bg-green-50 p-4 text-green-800 dark:bg-green-950 dark:text-green-200">Valid certificate</div><dl className="mt-5 grid gap-4 sm:grid-cols-2"><Info label="Certificate ID" value={certificate.certificateId} /><Info label="Student" value={certificate.studentName} /><Info label="Title" value={certificate.title} /><Info label="Issued" value={new Date(certificate.issueDate).toLocaleDateString()} /></dl><a className="btn-primary mt-6" href={`${API_URL}/certificate/download/${certificate.certificateId}`}>Download PDF</a></div>}</div></main>;
}

function Info({ label, value }) { return <div><dt className="text-sm text-slate-500">{label}</dt><dd className="font-bold">{value}</dd></div>; }
