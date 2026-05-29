import PDFDocument from 'pdfkit';
import QRCode from 'qrcode';

export async function buildCertificatePdf(certificate) {
  const doc = new PDFDocument({
    size: 'A4',
    layout: 'landscape',
    margin: 48,
  });

  const chunks = [];
  doc.on('data', (chunk) => chunks.push(chunk));

  const verifyUrl =
    certificate.verificationUrl ||
    `${process.env.CLIENT_URL}/verify-certificate/${certificate.certificateId}`;

  const qrDataUrl = await QRCode.toDataURL(verifyUrl);
  const qr = Buffer.from(qrDataUrl.split(',')[1], 'base64');

  // Transparent PNG signature
  const signaturePath = './assets/signature.png';

  // Optional digital seal/logo
  const sealPath = './assets/digital-seal.png';

  // Border
  doc.rect(24, 24, 794, 547).lineWidth(2).stroke('#0f172a');
  doc.rect(38, 38, 766, 519).lineWidth(1).stroke('#d4af37');

  // Header
  doc
    .fontSize(22)
    .fillColor('#0f172a')
    .text('T2Hubs Internship & Training', {
      align: 'center',
    });

  doc.moveDown(1.2);

  doc
    .fontSize(42)
    .fillColor('#111827')
    .text('Certificate of Completion', {
      align: 'center',
    });

  doc.moveDown(0.8);

  doc
    .fontSize(16)
    .fillColor('#475569')
    .text('This certificate is proudly presented to', {
      align: 'center',
    });

  doc.moveDown(0.4);

  // Student Name
  doc
    .fontSize(34)
    .fillColor('#1d4ed8')
    .text(certificate.studentName, {
      align: 'center',
    });

  doc.moveDown(0.5);

  doc
    .fontSize(16)
    .fillColor('#475569')
    .text('for successfully completing', {
      align: 'center',
    });

  doc.moveDown(0.3);

  // Course Title
  doc
    .fontSize(24)
    .fillColor('#0f172a')
    .text(certificate.title, {
      align: 'center',
    });

  doc.moveDown(1);

  // Certificate details
  doc
    .fontSize(12)
    .fillColor('#334155')
    .text(`Certificate ID: ${certificate.certificateId}`, {
      align: 'center',
    });

  doc.text(
    `Issued: ${new Date(certificate.issueDate).toLocaleDateString('en-IN')}`,
    {
      align: 'center',
    }
  );

  // QR verification
  doc.image(qr, 690, 390, { width: 86 });

  doc
    .fontSize(9)
    .fillColor('#475569')
    .text('Scan to verify', 690, 480, {
      width: 86,
      align: 'center',
    });

  // =========================
  // DIGITAL SIGNATURE SECTION
  // =========================

  // Signature line
  doc.moveTo(90, 470).lineTo(250, 470).stroke('#0f172a');

  // Signature image
  doc.image(signaturePath, 105, 410, {
    width: 120,
  });

  // Optional seal
  // doc.image(sealPath, 230, 405, {
  //   width: 55,
  //   opacity: 0.85,
  //   align: 'center'
  // });
  // Center watermark-style seal with rotation
doc.save();

doc.rotate(-35, {
  origin: [750, 220], // center point of rotation
});

doc.image(sealPath, 345, 215, {
  width: 70,
  opacity: 0.10, // watermark effect
});

doc.restore();

  // Designation
  doc
    .fontSize(11)
    .fillColor('#64748b')
    .text('Director, T2Hubs', 110, 495);

  // Digital signed metadata
  doc
    .fontSize(9)
    .fillColor('#16a34a')
    .text(
      `Digitally Signed on ${new Date().toLocaleString('en-IN')}`,
      110,
      515
    );

  doc.end();

  return new Promise((resolve) => {
    doc.on('end', () => resolve(Buffer.concat(chunks)));
  });
}