import nodemailer from 'nodemailer';
import { buildCertificatePdf } from './certificateService.js';

function getTransporter() {
  if (!process.env.SMTP_HOST) return null;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined
  });
}

export async function sendMail({ to, subject, html, attachments = [] }) {
  const transporter = getTransporter();
  if (!transporter) {
    console.log('Email skipped. Configure SMTP_* variables to send:', subject, to);
    return { skipped: true };
  }
  return transporter.sendMail({
    from: process.env.MAIL_FROM || 'T2Hubs <no-reply@t2hubs.com>',
    to,
    subject,
    html,
    attachments
  });
}

export async function sendCertificateEmail(certificate) {
  const pdf = await buildCertificatePdf(certificate);
  const verifyUrl = certificate.verificationUrl || `${process.env.CLIENT_URL}/verify-certificate/${certificate.certificateId}`;
  return sendMail({
    to: certificate.student.email,
    subject: `Your T2Hubs certificate ${certificate.certificateId}`,
    html: `<p>Hi ${certificate.studentName},</p><p>Your certificate is ready. Verify it here: <a href="${verifyUrl}">${verifyUrl}</a></p>`,
    attachments: [{ filename: `${certificate.certificateId}.pdf`, content: pdf }]
  });
}

