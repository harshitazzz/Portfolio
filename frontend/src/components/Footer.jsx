import React from 'react';

// A dictionary of SVG icons for matching social media networks
const getSocialIcon = (title) => {
  const normalized = title.toLowerCase().trim();
  
  if (normalized.includes('github')) {
    return (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1.25em" width="1.25em">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
      </svg>
    );
  }
  if (normalized.includes('linkedin')) {
    return (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1.25em" width="1.25em">
        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"></path>
      </svg>
    );
  }
  if (normalized.includes('leetcode')) {
    return (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1.25em" width="1.25em">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.414l-9.777 9.778a3.758 3.758 0 0 0 .002 5.3L7.54 20.29a3.753 3.753 0 0 0 5.302-.002l9.778-9.777a1.375 1.375 0 0 0-1.945-1.945l-9.777 9.777a1.003 1.003 0 0 1-1.414 0l-4.793-4.796a1.003 1.003 0 0 1 0-1.414l9.778-9.778A1.374 1.374 0 0 0 13.483 0zm4.243 4.243a1.375 1.375 0 0 0 0 1.945l4.793 4.793a1.003 1.003 0 0 1 0 1.414l-9.778 9.778a1.375 1.375 0 1 0 1.945 1.945l9.777-9.777a3.758 3.758 0 0 0 0-5.302l-4.793-4.797a1.375 1.375 0 0 0-1.944 0z"></path>
      </svg>
    );
  }
  if (normalized.includes('codechef')) {
    return (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="2" viewBox="0 0 24 24" height="1.25em" width="1.25em" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    );
  }
  if (normalized.includes('instagram')) {
    return (
      <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1.25em" width="1.25em">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    );
  }
  if (normalized.includes('dribbble')) {
    return (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1.25em" width="1.25em">
        <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 4.42 3.58 8 8 8 4.42 0 8-3.58 8-8 0-4.42-3.58-8-8-8zm4.82 4.43c.18.3.36.63.53.98-1.51.52-3.05.78-4.63.78-.1 0-.21 0-.31-.01.21-.57.45-1.15.71-1.74 1.34.42 2.6.75 3.7 1.25zM7.34 2.1c-.26.54-.5 1.1-.71 1.67-1.56-.47-3.08-1.02-4.57-1.66C3.12 1.32 5.46 1 8 1c1.23 0 2.41.22 3.5.63-1.06-.48-2.27-.8-3.51-1.13h-.65zm-5.46 3.1c1.45.62 2.94 1.16 4.47 1.62-.23.57-.43 1.17-.61 1.8-1.6-.29-3.32-.44-5.15-.44a7.1 7.1 0 0 1 1.29-2.98zm-.95 3.96c1.76.01 3.42.16 4.97.43-.13.52-.22 1.06-.29 1.62a32 32 0 0 1-3.66.7 7.02 7.02 0 0 1-1.02-2.75zm1.75 3.86a33.5 33.5 0 0 0 3.39-.65c.18.57.4 1.12.65 1.66a7 7 0 0 1-4.04-1.01zm5.02.82c-.22-.51-.42-1.03-.58-1.57 1.5-.2 2.94-.52 4.3-.98A7.03 7.03 0 0 1 7.7 13.84zm5.07-2.31c-1.31.43-2.69.73-4.12.91.07-.51.15-1.01.26-1.5 1.63-.03 3.23-.21 4.79-.54.04.38.07.76.07 1.13zm.18-2.12c-1.51.31-3.07.48-4.66.5-.11-.47-.19-.94-.25-1.4 1.54 0 3.05-.24 4.53-.73.18.52.31 1.07.38 1.63z" clipRule="evenodd"></path>
      </svg>
    );
  }
  if (normalized.includes('youtube')) {
    return (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1.25em" width="1.25em">
        <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.104 1.981l-.03.26-.013.104a7.947 7.947 0 0 1-.223 1.402 2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.109-1.921l.006-.104.03-.26.013-.104c.047-.517.118-1.02.222-1.402A2.007 2.007 0 0 1 1.79 1.999c1.117-.3 5.51-.33 6.11-.335h.089h.016zm-.12 8.358L11.664 8 7.931 5.64v4.718z"></path>
      </svg>
    );
  }
  
  // Generic Link icon fallback
  return (
    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1.25em" width="1.25em">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
      <polyline points="15 3 21 3 21 9"></polyline>
      <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>
  );
};

export default function Footer({ personal, socialLinks }) {
  const currentYear = new Date().getFullYear();
  const name = personal?.name || "Harshita Maheshwari";
  const links = socialLinks && socialLinks.length > 0 ? socialLinks : [
    { title: 'LinkedIn', url: personal?.linkedin || '#' },
    { title: 'GitHub', url: personal?.github || '#' },
    { title: 'Dribbble', url: personal?.dribbble || '#' }
  ];

  return (
    <footer style={{
      backgroundColor: '#070709',
      borderTop: '1px solid rgba(255, 255, 255, 0.03)',
      padding: '3.5rem 0',
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
          fontSize: '1.2rem',
          fontWeight: '700',
          color: '#ffffff',
          textDecoration: 'none',
          letterSpacing: '-0.02em',
          transition: 'color 0.3s ease'
        }} className="footer-brand">
          {name}
        </a>

        {/* Center: Social Links */}
        <div style={{
          display: 'flex',
          gap: '1.25rem',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          {links.map((link, idx) => (
            <a 
              key={link.id || idx} 
              href={link.url} 
              className="social-icon-btn" 
              target="_blank" 
              rel="noopener noreferrer"
              title={link.title}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                color: 'var(--text-secondary)',
                transition: 'var(--transition-smooth)',
                position: 'relative'
              }}
            >
              {getSocialIcon(link.title)}
            </a>
          ))}
        </div>

        {/* Right: Copyright */}
        <span style={{
          fontSize: '0.85rem',
          color: 'var(--text-muted)'
        }}>
          &copy; {currentYear} {name}. Crafted with precision.
        </span>
      </div>

      <style>{`
        .footer-brand:hover {
          color: var(--accent-cyan) !important;
        }
        .social-icon-btn:hover {
          color: #ffffff !important;
          background-color: rgba(0, 240, 255, 0.08) !important;
          border-color: rgba(0, 240, 255, 0.3) !important;
          transform: translateY(-3px);
          box-shadow: 0 0 15px rgba(0, 240, 255, 0.25) !important;
        }
      `}</style>
    </footer>
  );
}

