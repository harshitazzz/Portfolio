import React from 'react';

export default function Footer({ personal }) {
  const currentYear = new Date().getFullYear();
  const name = personal?.name || "Harshita Maheshwari";
  const github = personal?.github || "#";
  const linkedin = personal?.linkedin || "#";
  const dribbble = personal?.dribbble || "#";

  return (
    <footer style={{
      backgroundColor: 'var(--bg-obsidian-void)',
      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      padding: '3rem 0',
      color: 'var(--text-secondary)'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '2rem'
      }}>
        {/* Left: Brand Name */}
        <a href="#home" style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1.1rem',
          fontWeight: '700',
          color: '#ffffff',
          textDecoration: 'none',
          letterSpacing: '-0.02em'
        }}>
          {name}
        </a>

        {/* Center: Social Links */}
        <div style={{
          display: 'flex',
          gap: '2rem',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <a href={linkedin} className="social-link" target="_blank" rel="noopener noreferrer">LINKEDIN</a>
          <a href={github} className="social-link" target="_blank" rel="noopener noreferrer">GITHUB</a>
          <a href={dribbble} className="social-link" target="_blank" rel="noopener noreferrer">DRIBBBLE</a>
        </div>

        {/* Right: Copyright */}
        <span style={{
          fontSize: '0.85rem',
          color: 'var(--text-muted)'
        }}>
          &copy; {currentYear} {name}. Crafted for the future.
        </span>
      </div>

      <style>{`
        .social-link {
          color: var(--text-secondary);
          text-decoration: none;
          font-family: var(--font-heading);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          transition: var(--transition-smooth);
          position: relative;
          padding: 0.2rem 0;
        }
        .social-link:hover {
          color: var(--text-primary);
        }
        .social-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0%;
          height: 1px;
          background: var(--accent-cyan);
          transition: var(--transition-smooth);
        }
        .social-link:hover::after {
          width: 100%;
        }
      `}</style>
    </footer>
  );
}
