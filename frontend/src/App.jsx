import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedWork from './components/FeaturedWork';
import Experience from './components/Experience';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5001/api/resume');
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

  // Display a premium loading animation before UI mounts
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

  // Extract variables with fallbacks
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

  return (
    <div style={{ backgroundColor: 'var(--bg-obsidian-void)', minHeight: '100vh' }}>
      <Header />
      <main>
        <Hero personal={personal} />
        <FeaturedWork projects={projects} />
        <Experience experience={experience} />
        <About about={about} personal={personal} />
        <Contact personal={personal} />
      </main>
      <Footer personal={personal} />
    </div>
  );
}
