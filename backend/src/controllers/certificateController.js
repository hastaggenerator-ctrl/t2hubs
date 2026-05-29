import Certificate from '../models/Certificate.js';
import Notification from '../models/Notification.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { buildCertificatePdf } from '../services/certificateService.js';
import { sendCertificateEmail, sendMail } from '../services/emailService.js';
import fs from 'fs';
import path from 'path';

export const createCertificate = asyncHandler(async (req, res) => {
  // Expect admin to provide certificateId and upload PDF as 'pdf'
  if (!req.body.certificateId) {
    res.status(400);
    throw new Error('certificateId is required');
  }
  if (!req.file) {
    res.status(400);
    throw new Error('Certificate PDF upload is required');
  }

  const pdfPath = `/uploads/certificates/${req.file.filename}`;
  const certificate = await Certificate.create({
    ...req.body,
    pdfUrl: pdfPath,
    verificationUrl: `${process.env.CLIENT_URL}/verify-certificate/${req.body.certificateId}`
  });

  await Notification.create({ user: certificate.student, title: 'Certificate uploaded', message: certificate.title, type: 'certificate' });
  res.status(201).json(certificate);
});

export const verifyCertificate = asyncHandler(async (req, res) => {
  const certificate = await Certificate.findOne({ certificateId: req.params.certificateId }).populate('student internship');
  if (!certificate || certificate.isRevoked) {
    res.status(404);
    throw new Error('Certificate not found or revoked');
  }
  res.json(certificate);
});

export const downloadCertificate = asyncHandler(async (req, res) => {
  const certificate = await Certificate.findOne({ certificateId: req.params.certificateId }).populate('student internship');
  if (!certificate || certificate.isRevoked) {
    res.status(404);
    throw new Error('Certificate not found or revoked');
  }
  if (certificate.pdfUrl) {
    const rel = certificate.pdfUrl.startsWith('/') ? certificate.pdfUrl.slice(1) : certificate.pdfUrl;
    const filePath = path.join(process.cwd(), rel);
    if (!fs.existsSync(filePath)) {
      res.status(404);
      throw new Error('Certificate file not found');
    }
    return res.download(filePath, `${certificate.certificateId}.pdf`);
  }

  const pdf = await buildCertificatePdf(certificate);
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="${certificate.certificateId}.pdf"`);
  res.send(pdf);
});

export const emailCertificate = asyncHandler(async (req, res) => {
  const certificate = await Certificate.findById(req.body.certificateId).populate('student internship');
  if (!certificate) {
    res.status(404);
    throw new Error('Certificate not found');
  }

  // If admin uploaded a PDF, attach it directly; otherwise build PDF
  if (certificate.pdfUrl) {
    const rel = certificate.pdfUrl.startsWith('/') ? certificate.pdfUrl.slice(1) : certificate.pdfUrl;
    const filePath = path.join(process.cwd(), rel);
    if (!fs.existsSync(filePath)) {
      res.status(404);
      throw new Error('Certificate file not found');
    }
    const buffer = fs.readFileSync(filePath);
    const verifyUrl = certificate.verificationUrl || `${process.env.CLIENT_URL}/verify-certificate/${certificate.certificateId}`;
    await sendMail({
      to: certificate.student.email,
      subject: `Your T2Hubs certificate ${certificate.certificateId}`,
      html: `<p>Hi ${certificate.studentName},</p><p>Your certificate is ready. Verify it here: <a href="${verifyUrl}">${verifyUrl}</a></p>`,
      attachments: [{ filename: `${certificate.certificateId}.pdf`, content: buffer }]
    });
    return res.json({ message: 'Certificate email queued/sent' });
  }

  await sendCertificateEmail(certificate);
  res.json({ message: 'Certificate email queued/sent' });
});
