import React, { useState, useEffect } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 100,
      transition: 'var(--transition-smooth)',
      backgroundColor: scrolled ? 'rgba(7, 7, 9, 0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid transparent'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '80px'
      }}>
        {/* Logo */}
        <a href="#home" style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1.25rem',
          fontWeight: '700',
          color: 'var(--text-primary)',
          textDecoration: 'none',
          letterSpacing: '-0.02em'
        }}>
          Harshita Maheshwari
        </a>

        {/* Desktop Nav */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2.5rem'
        }} className="desktop-nav">
          <a href="#home" className="nav-link">Home</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#work" className="nav-link">Work</a>
          <a href="#achievements" className="nav-link">Achievements</a>
          <a href="#experience" className="nav-link">Experience</a>
        </nav>

        {/* CTA Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a href="#contact" className="btn-hire" style={{
            background: 'var(--accent-cyan)',
            color: '#000000',
            fontFamily: 'var(--font-heading)',
            fontSize: '0.85rem',
            fontWeight: '600',
            padding: '0.5rem 1.2rem',
            borderRadius: '100px',
            border: 'none',
            cursor: 'pointer',
            textDecoration: 'none',
            transition: 'var(--transition-smooth)',
            boxShadow: '0 0 15px rgba(0, 240, 255, 0.15)'
          }}>
            Hire Me
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="hamburger-btn"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              display: 'none',
              flexDirection: 'column',
              gap: '6px',
              padding: '0.5rem'
            }}
          >
            <span style={{
              width: '24px',
              height: '2px',
              backgroundColor: '#fff',
              transform: isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
              transition: 'var(--transition-smooth)'
            }}></span>
            <span style={{
              width: '24px',
              height: '2px',
              backgroundColor: '#fff',
              opacity: isOpen ? 0 : 1,
              transition: 'var(--transition-smooth)'
            }}></span>
            <span style={{
              width: '24px',
              height: '2px',
              backgroundColor: '#fff',
              transform: isOpen ? 'rotate(-45deg) translate(6px, -7px)' : 'none',
              transition: 'var(--transition-smooth)'
            }}></span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          top: '80px',
          left: 0,
          width: '100%',
          height: 'calc(100vh - 80px)',
          backgroundColor: 'var(--bg-obsidian-void)',
          zIndex: 99,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: '3rem',
          gap: '2.5rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
          <a href="#home" onClick={() => setIsOpen(false)} style={{ fontSize: '1.25rem', color: '#fff', textDecoration: 'none' }}>Home</a>
          <a href="#about" onClick={() => setIsOpen(false)} style={{ fontSize: '1.25rem', color: '#fff', textDecoration: 'none' }}>About</a>
          <a href="#work" onClick={() => setIsOpen(false)} style={{ fontSize: '1.25rem', color: '#fff', textDecoration: 'none' }}>Work</a>
          <a href="#achievements" onClick={() => setIsOpen(false)} style={{ fontSize: '1.25rem', color: '#fff', textDecoration: 'none' }}>Achievements</a>
          <a href="#experience" onClick={() => setIsOpen(false)} style={{ fontSize: '1.25rem', color: '#fff', textDecoration: 'none' }}>Experience</a>
          <a href="#contact" onClick={() => setIsOpen(false)} style={{ fontSize: '1.25rem', color: '#fff', textDecoration: 'none' }}>Contact</a>
        </div>
      )}

      {/* CSS Rules to inject */}
      <style>{`
        .nav-link {
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 500;
          transition: var(--transition-smooth);
          position: relative;
          padding: 0.25rem 0;
        }
        .nav-link:hover {
          color: var(--text-primary);
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0%;
          height: 1px;
          background: var(--accent-cyan);
          transition: var(--transition-smooth);
        }
        .nav-link:hover::after {
          width: 100%;
        }
        .btn-hire:hover {
          background: #ffffff !important;
          box-shadow: 0 0 25px rgba(0, 240, 255, 0.5) !important;
          transform: translateY(-1px);
        }
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .hamburger-btn {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
}
