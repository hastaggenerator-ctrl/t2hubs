import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { DashboardShell } from './components/DashboardShell';
import { LiveChat } from './components/LiveChat';
import Home from './pages/Home';
import ITSolutions from './pages/ITSolutions';
import Internships from './pages/Internships';
import Seminar from './pages/Seminar';
import Contact from './pages/Contact';
import Auth from './pages/Auth';
import ForgotPassword from './pages/ForgotPassword';
import VerifyCertificate from './pages/VerifyCertificate';
import RegistrationPage from './pages/RegistrationPage';
import StudentOverview from './pages/student/StudentOverview';
import Profile from './pages/student/Profile';
import Attendance from './pages/student/Attendance';
import AdminOverview from './pages/admin/AdminOverview';
import ResourceManager from './pages/admin/ResourceManager';
import CertificateAdmin from './pages/admin/CertificateAdmin';
import AttendanceAdmin from './pages/admin/AttendanceAdmin';

const studentLinks = [['/student', 'Overview'], ['/student/profile', 'Profile'], ['/student/attendance', 'Attendance']];
const adminLinks = [
  ['/admin', 'Analytics'],
  ['/admin/students', 'Students'],
  ['/admin/internships', 'Internships'],
  ['/admin/seminars', 'Seminars'],
  ['/admin/certificates', 'Certificates'],
  ['/admin/attendance', 'Attendance'],
  ['/admin/messages', 'Messages'],
  ['/admin/content', 'Website Content']
];

function RoleRedirect() {
  const { user, isAdmin } = useAuth();
  if (!user) return <Home />;
  return <Navigate to={isAdmin ? '/admin' : '/student'} replace />;
}

function GuestOnly({ children }) {
  const { user, isAdmin } = useAuth();
  if (user) return <Navigate to={isAdmin ? '/admin' : '/student'} replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<RoleRedirect />} />
            <Route path="internships" element={<GuestOnly><Internships /></GuestOnly>} />
            <Route path="it-solutions" element={<GuestOnly><ITSolutions /></GuestOnly>} />
            <Route path="seminar" element={<GuestOnly><Seminar /></GuestOnly>} />
            <Route path="contact" element={<GuestOnly><Contact /></GuestOnly>} />
            <Route path="verify-certificate" element={<VerifyCertificate />} />
            <Route path="verify-certificate/:id" element={<VerifyCertificate />} />
            <Route path="register/internship" element={<RegistrationPage kind="internship" />} />
            <Route path="login" element={<GuestOnly><Auth /></GuestOnly>} />
            <Route path="register" element={<GuestOnly><Auth mode="register" /></GuestOnly>} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="student" element={<ProtectedRoute role="student"><DashboardShell links={studentLinks} /></ProtectedRoute>}>
              <Route index element={<StudentOverview />} />
              <Route path="profile" element={<Profile />} />
              <Route path="attendance" element={<Attendance />} />
            </Route>
            <Route path="admin" element={<ProtectedRoute role="admin"><DashboardShell links={adminLinks} /></ProtectedRoute>}>
              <Route index element={<AdminOverview />} />
              <Route path="students" element={<ResourceManager type="students" />} />
              <Route path="internships" element={<ResourceManager type="internships" />} />
              <Route path="seminars" element={<ResourceManager type="seminars" />} />
              <Route path="certificates" element={<CertificateAdmin />} />
              <Route path="attendance" element={<AttendanceAdmin />} />
              <Route path="messages" element={<ResourceManager type="messages" />} />
              <Route path="content" element={<ResourceManager type="content" />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
        <LiveChat />
      </BrowserRouter>
    </AuthProvider>
  );
}
