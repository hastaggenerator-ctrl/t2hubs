import Internship from '../models/Internship.js';
import Seminar from '../models/Seminar.js';
import ContactMessage from '../models/ContactMessage.js';
import Registration from '../models/Registration.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const homeData = asyncHandler(async (req, res) => {
  const [internships, seminars] = await Promise.all([
    Internship.find({ status: 'Open' }).sort('-createdAt').limit(8),
    Seminar.find({ status: 'Upcoming' }).sort('scheduledAt').limit(4)
  ]);
  res.json({
    internships,
    seminars,
    testimonials: [
      { name: 'Priya Sharma', role: 'Data Analytics Intern', quote: 'The mentoring and weekly reviews helped me become job-ready.' },
      { name: 'Arjun Mehta', role: 'Frontend Trainee', quote: 'A polished learning experience with real projects and certificates.' },
      { name: 'Nisha Rao', role: 'Seminar Attendee', quote: 'The career seminar gave me a clear roadmap for placements.' }
    ],
    faqs: [
      ['Are internships virtual?', 'Most internships are remote-first with live mentoring and weekly tasks.'],
      ['Can certificates be verified?', 'Yes. Every certificate has a unique ID, QR code, and verification page.'],
      ['Do you provide placement guidance?', 'Career guidance, resume reviews, interview prep, and portfolio feedback are covered in seminars and internship reviews.']
    ]
  });
});

export const contact = asyncHandler(async (req, res) => {
  const message = await ContactMessage.create(req.body);
  res.status(201).json({ message: 'Message received', data: message });
});

export const registerInterest = asyncHandler(async (req, res) => {
  const registration = await Registration.create(req.body);
  res.status(201).json({ message: 'Registration submitted', data: registration });
});
