import React from 'react';

export default function Hero({ personal }) {
  const { headline, subHeadline } = personal || {
    headline: "Hi, I am Harshita Maheshwari, welcome to my portfolio",
    subHeadline: "I design and develop high-end digital experiences where aesthetics meet technical precision. Creating the future of web with obsidian voids and digital pulses."
  };

  return (
    <section id="home" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      padding: '7rem 0 4rem 0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background radial glow */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '5%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(0, 240, 255, 0.05) 0%, rgba(0,0,0,0) 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }}></div>

      <div className="container grid-2" style={{ position: 'relative', zIndex: 1 }}>
        {/* Left Column - Content */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start'
        }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            lineHeight: 1.05,
            marginBottom: '1.5rem',
            fontWeight: 800,
            letterSpacing: '-0.03em'
          }}>
            Hi, I am <span style={{
              background: 'linear-gradient(135deg, #ffffff 60%, var(--accent-cyan) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Harshita Maheshwari</span>, welcome to my portfolio
          </h1>
          
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
            lineHeight: 1.6,
            marginBottom: '2.5rem',
            maxWidth: '520px',
            fontWeight: 350
          }}>
            {subHeadline}
          </p>

          <div style={{
            display: 'flex',
            gap: '1.25rem',
            flexWrap: 'wrap'
          }}>
            <a href="#work" className="btn-primary">
              View Projects
            </a>
            <a href="#about" className="btn-secondary">
              Read Story
            </a>
          </div>
        </div>

        {/* Right Column - 3D Avatar Image Container */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative'
        }}>
          {/* Neon Pulse Ring */}
          <div className="neon-pulse-ring" style={{
            position: 'absolute',
            width: '85%',
            height: '85%',
            borderRadius: '24px',
            border: '2px dashed rgba(0, 240, 255, 0.2)',
            zIndex: 0,
            animation: 'pulse 4s infinite linear'
          }}></div>

          <div style={{
            position: 'relative',
            width: '90%',
            aspectRatio: '1',
            borderRadius: '24px',
            overflow: 'hidden',
            backgroundColor: '#0e0e12',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 40px rgba(139, 92, 246, 0.1)',
            zIndex: 1,
            transition: 'var(--transition-smooth)'
          }} className="avatar-card">
            <img 
              src="/avatar_hoodie_girl.png" 
              alt="Harshita Maheshwari 3D Avatar" 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                transition: 'var(--transition-smooth)'
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0% { transform: rotate(0deg) scale(0.97); opacity: 0.3; }
          50% { transform: rotate(180deg) scale(1.03); opacity: 0.6; }
          100% { transform: rotate(360deg) scale(0.97); opacity: 0.3; }
        }
        .avatar-card:hover {
          transform: translateY(-8px) scale(1.02);
          border-color: rgba(0, 240, 255, 0.3);
          box-shadow: 0 30px 60px -15px rgba(0, 240, 255, 0.2), 0 0 50px rgba(139, 92, 246, 0.15) !important;
        }
        .avatar-card:hover img {
          transform: scale(1.05);
        }
      `}</style>
    </section>
  );
}
