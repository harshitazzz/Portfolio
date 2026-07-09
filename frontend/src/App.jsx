import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedWork from './components/FeaturedWork';
import Experience from './components/Experience';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Achievements from './components/Achievements';
import Education from './components/Education';
import BACKEND_URL from './config';

// Admin Components
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/admin/Dashboard';
import ProjectsAdmin from './pages/admin/ProjectsAdmin';
import HeroAdmin from './pages/admin/HeroAdmin';
import AboutAdmin from './pages/admin/AboutAdmin';
import ExperienceAdmin from './pages/admin/ExperienceAdmin';
import AchievementsAdmin from './pages/admin/AchievementsAdmin';
import EducationAdmin from './pages/admin/EducationAdmin';
import SocialLinksAdmin from './pages/admin/SocialLinksAdmin';
import ContactAdmin from './pages/admin/ContactAdmin';
import MessagesAdmin from './pages/admin/MessagesAdmin';

// A wrapper for the existing portfolio view
function Portfolio() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BACKEND_URL}/api/resume`);
        if (!response.ok) {
          throw new Error('Failed to fetch data from server');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        console.warn('API connection failed. Using fallback static resume data.', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{
        backgroundColor: '#070709',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1.5rem'
      }}>
        <div className="spinner" style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          border: '3px solid rgba(0, 240, 255, 0.1)',
          borderTopColor: 'var(--accent-cyan)',
          animation: 'spin 1s ease-in-out infinite'
        }}></div>
        <span style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: '0.85rem',
          letterSpacing: '0.15em',
          color: 'var(--text-secondary)',
          textTransform: 'uppercase'
        }}>Loading digital pulses...</span>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  const personal = data?.personal || {
    name: "Harshita Maheshwari",
    title: "Full-Stack Designer & Creative Technologist",
    headline: "Hi, I am Harshita Maheshwari, welcome to my portfolio",
    subHeadline: "I design and develop high-end digital experiences where aesthetics meet technical precision. Creating the future of web with obsidian voids and digital pulses.",
    yearsOfExperience: "05+",
    email: "harshita@example.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    dribbble: "https://dribbble.com"
  };

  const projects = data?.projects || [];
  const experience = data?.experience || [];
  const about = data?.about || null;
  const achievements = data?.achievements || [];
  const education = data?.education || [];
  const socialLinks = data?.socialLinks || [];

  return (
    <div style={{ backgroundColor: 'var(--bg-obsidian-void)', minHeight: '100vh' }}>
      <Header />
      <main>
        <Hero personal={personal} />
        <About about={about} personal={personal} />
        <FeaturedWork projects={projects} />
        <Achievements achievements={achievements} />
        <Education education={education} />
        <Experience experience={experience} />
        <Contact personal={personal} />
      </main>
      <Footer personal={personal} socialLinks={socialLinks} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />

        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="projects" element={<ProjectsAdmin />} />
          <Route path="hero" element={<HeroAdmin />} />
          <Route path="contact" element={<ContactAdmin />} />
          <Route path="contacts" element={<ContactAdmin />} />
          <Route path="messages" element={<MessagesAdmin />} />
          <Route path="about" element={<AboutAdmin />} />
          <Route path="experience" element={<ExperienceAdmin />} />
          <Route path="achievements" element={<AchievementsAdmin />} />
          <Route path="education" element={<EducationAdmin />} />
          <Route path="social" element={<SocialLinksAdmin />} />
          {/* Add more admin routes here as we build them */}
          <Route path="*" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
