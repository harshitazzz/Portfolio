import React from 'react';

export default function About({ about, personal }) {
  const defaultAbout = {
    philosophy: "I am a full-stack designer and creative technologist specializing in premium digital presence. My philosophy is rooted in \"Neon-Noir Minimalism\"—where quiet, sophisticated architecture meets high-energy digital pulses.",
    subPhilosophy: "With over 5 years of experience in product design and frontend engineering, I bridge the gap between creative vision and technical execution. I believe that every pixel should serve a purpose and every interaction should feel like magic.",
    skills: ["UI/UX Design", "3D Modelling", "Tailwind CSS", "Motion Graphics", "React/Next.js", "Node.js", "Express.js"]
  };

  const info = about || defaultAbout;
  const expText = personal?.yearsOfExperience || "05+";

  return (
    <section id="about" style={{
      backgroundColor: 'var(--bg-obsidian-void)',
      borderTop: '1px solid rgba(255, 255, 255, 0.02)'
    }}>
      <div className="container grid-2">
        {/* Left Column - Copy & Tags */}
        <div>
          <span className="section-tag">The Creator</span>
          <h2 className="section-title" style={{
            lineHeight: 1.1,
            marginBottom: '2rem',
            maxWidth: '500px'
          }}>
            Crafting experiences at the edge of tomorrow.
          </h2>

          <p style={{
            color: 'var(--text-primary)',
            fontSize: '1rem',
            lineHeight: '1.7',
            marginBottom: '1.5rem',
            fontWeight: 400
          }}>
            {info.philosophy}
          </p>

          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '0.95rem',
            lineHeight: '1.7',
            marginBottom: '2.5rem',
            fontWeight: 350
          }}>
            {info.subPhilosophy}
          </p>

          {/* Skills Badges */}
          <div style={{
            display: 'flex',
            gap: '0.75rem',
            flexWrap: 'wrap'
          }}>
            {info.skills.map((skill, index) => (
              <span 
                key={index}
                style={{
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  color: 'rgba(255, 255, 255, 0.75)',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  padding: '0.45rem 1rem',
                  borderRadius: '100px',
                  transition: 'var(--transition-smooth)'
                }}
                className="skill-badge"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Right Column - Workstation & Badge */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative'
        }}>
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '480px',
            transform: 'rotate(2deg)',
            transition: 'var(--transition-smooth)',
            borderRadius: '20px',
            boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.8)'
          }} className="workspace-card">
            {/* Dark border framing */}
            <div style={{
              borderRadius: '20px',
              overflow: 'hidden',
              border: '1px solid rgba(255, 255, 255, 0.06)'
            }}>
              <img 
                src="/neon_noir_workspace.png" 
                alt="Harshita Maheshwari Workspace Setup" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </div>

            {/* Floating Experience Badge */}
            <div style={{
              position: 'absolute',
              bottom: '-25px',
              left: '-20px',
              background: 'var(--accent-cyan)',
              color: '#000000',
              padding: '1rem 1.5rem',
              borderRadius: '12px',
              boxShadow: '0 10px 30px rgba(0, 240, 255, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 5,
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }} className="exp-badge">
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.75rem',
                fontWeight: '800',
                lineHeight: 1
              }}>
                {expText}
              </span>
              <span style={{
                fontSize: '0.65rem',
                fontWeight: '700',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                marginTop: '0.2rem'
              }}>
                Years Exp.
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .skill-badge:hover {
          border-color: var(--accent-cyan) !important;
          color: var(--accent-cyan) !important;
          background: rgba(0, 240, 255, 0.02) !important;
          transform: scale(1.05);
        }
        .workspace-card:hover {
          transform: rotate(0deg) scale(1.02) !important;
          box-shadow: 0 40px 80px -20px rgba(0, 0, 0, 0.9) !important;
        }
        .workspace-card:hover .exp-badge {
          animation: float 2s ease-in-out infinite;
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }
        @media (max-width: 576px) {
          .exp-badge {
            left: 10px !important;
            bottom: -20px !important;
          }
        }
      `}</style>
    </section>
  );
}
