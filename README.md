# T2Hubs MERN Internship & Training Platform

Production-shaped MERN platform for career seminars, foundational training, virtual internships, workshops, dashboards, attendance, live chat, analytics, and QR-verifiable PDF certificates.

## Stack

- Frontend: React, React Router, Tailwind CSS, Framer Motion, Axios, Recharts, Socket.io client
- Backend: Node.js, Express, MongoDB Atlas, Mongoose, JWT, bcrypt, Socket.io, Nodemailer, PDFKit, QRCode
- Deployment: Vercel frontend, Render backend

## Folder Structure

```text
backend/
  src/config          MongoDB Atlas connection
  src/controllers     API controllers
  src/middleware      auth, validation, errors
  src/models          User, Admin role, Program, Internship, Seminar, Certificate, Registration, ContactMessage, Attendance, ChatMessage, InternshipProgress, Task, Notification, LeaveRequest
  src/routes          REST route modules
  src/services        email and certificate PDF services
  src/seed            dummy data generator
frontend/
  src/api             Axios client
  src/components      layout, protected routes, chat, dashboard shell
  src/context         auth provider
  src/pages           public, student, and admin pages
```

## Local Setup

1. Install dependencies:

```bash
npm run install:all
```

2. Create backend env:

```bash
cp backend/.env.example backend/.env
```

3. Add your MongoDB Atlas URI and secrets in `backend/.env`.

4. Create frontend env:

```bash
cp frontend/.env.example frontend/.env
```

5. Seed dummy data:

```bash
npm run seed
```

6. Run both apps:

```bash
npm run dev
```

Frontend: `http://localhost:5173`  
Backend: `http://localhost:5000/api/health`

## Demo Accounts

Seed script creates:

- Admin: `admin@t2hubs.com` / `Admin@123`
- Student: `student@t2hubs.com` / `Student@123`

## Environment Variables

Backend:

```env
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:5173
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/t2hubs?retryWrites=true&w=majority
JWT_SECRET=replace-with-a-long-random-secret
JWT_EXPIRES_IN=7d
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASS=your-app-password
MAIL_FROM="T2Hubs <your-email@example.com>"
```

Frontend:

```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

## Core API Routes

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/forgot-password`
- `GET /api/public/home`
- `GET /api/public/programs`
- `GET /api/public/internships`
- `POST /api/public/register-interest`
- `POST /api/public/contact`
- `GET /api/student/dashboard`
- `PATCH /api/student/profile`
- `POST /api/chat/send`
- `GET /api/chat/messages`
- `POST /api/attendance/mark`
- `GET /api/attendance/student/:id`
- `POST /api/progress/update`
- `GET /api/progress/:studentId`
- `POST /api/certificate`
- `GET /api/certificate/verify/:certificateId`
- `GET /api/certificate/download/:certificateId`
- `POST /api/certificate/send-email`
- `GET /api/admin/analytics`
- `GET|POST|PATCH|DELETE /api/admin/:resource`

## Certificate System

Admins can generate certificates from the admin panel. The backend automatically creates a unique certificate ID like `T2H-2026-ABC123`, builds a PDF certificate with PDFKit, adds a QR code verification URL, and can email the PDF to the student using SMTP.

## Deployment

### Backend on Render

1. Create a new Render Web Service from `backend`.
2. Build command: `npm install`
3. Start command: `npm start`
4. Add `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`, and SMTP variables.
5. Set `NODE_ENV=production`.

### Frontend on Vercel

1. Import the `frontend` folder as the Vercel project.
2. Build command: `npm run build`
3. Output directory: `dist`
4. Add:

```env
VITE_API_URL=https://your-render-api.onrender.com/api
VITE_SOCKET_URL=https://your-render-api.onrender.com
```

## Notes

- MongoDB Atlas is required; local MongoDB is not used.
- Email sending works after SMTP variables are configured.
- Live chat uses Socket.io rooms and stores chat history in MongoDB.
- Admin CRUD pages are generic and can manage students, internships, seminars, programs, certificates, messages, and website content.
