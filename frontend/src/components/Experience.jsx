import React from 'react';

export default function Experience({ experience }) {
  const defaultExperience = [
    {
      id: "exp-1",
      role: "Lead Frontend Architect & Creative Technologist",
      company: "CyberPulse Studios",
      period: "2023 - PRESENT",
      description: "Design and develop high-end web applications with Next.js/React. Standardized 'Neon-Noir' custom UI framework, achieving visual premium quality and reducing frontend render times by 35%. Direct cross-functional team of 6 engineers."
    },
    {
      id: "exp-2",
      role: "Senior UI/UX Engineer",
      company: "Obsidian Tech",
      period: "2021 - 2023",
      description: "Architected custom dashboards and high-speed charting features for a Web3 analytics suite. Collaborated closely with the product team to turn high-fidelity Figma mockups into reactive, pixel-perfect layouts."
    },
    {
      id: "exp-3",
      role: "Creative Developer",
      company: "Digital Alchemy",
      period: "2019 - 2021",
      description: "Built responsive marketing landing pages, interactive product finders, and custom 3D web visualizations using Three.js and CSS Grid/Flexbox layouts."
    }
  ];

  // Use passed experience if defined (even if empty), otherwise fallback to default
  const items = experience !== undefined ? experience : defaultExperience;

  return (
    <section id="experience" style={{
      backgroundColor: '#0a0a0c',
      borderTop: '1px solid rgba(255, 255, 255, 0.02)'
    }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: '4rem' }}>
          <span className="section-tag">Career Roadmap</span>
          <h2 className="section-title">Work History</h2>
          <p className="section-subtitle">
            A chronological timeline of my professional experience designing and engineering elite digital solutions.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="timeline-container" style={{
          position: 'relative',
          maxWidth: '850px',
          margin: '0 auto'
        }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 400, letterSpacing: '0.05em' }}>Experience to be added soon...</h3>
            </div>
          ) : (
            <>
              {/* Vertical Track Line */}
              <div className="timeline-line" style={{
                position: 'absolute',
                left: '20px',
                top: '8px',
                bottom: '24px',
                width: '2px',
                background: 'linear-gradient(to bottom, var(--accent-cyan) 0%, rgba(139, 92, 246, 0.5) 50%, rgba(255, 255, 255, 0.05) 100%)'
              }}></div>

              {items.map((exp, idx) => (
            <div 
              key={exp.id} 
              className="timeline-item"
              style={{
                position: 'relative',
                paddingLeft: '60px',
                marginBottom: '3.5rem'
              }}
            >
              {/* Indicator Dot */}
              <div 
                className="timeline-dot"
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '6px',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-obsidian-void)',
                  border: '3px solid var(--accent-cyan)',
                  boxShadow: '0 0 10px var(--accent-cyan)',
                  zIndex: 2,
                  transition: 'var(--transition-smooth)'
                }}
              ></div>

              {/* Card content */}
              <div 
                className="glass-card"
                style={{
                  padding: '2rem',
                  borderRadius: '16px',
                  transition: 'var(--transition-smooth)'
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  <div>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: '700',
                      color: 'var(--text-primary)'
                    }}>
                      {exp.role}
                    </h3>
                    <span style={{
                      color: 'var(--accent-cyan)',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      marginTop: '0.2rem',
                      display: 'inline-block'
                    }}>
                      {exp.company}
                    </span>
                  </div>
                  <span style={{
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    letterSpacing: '0.05em',
                    color: 'var(--text-muted)',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '100px',
                    border: '1px solid rgba(255, 255, 255, 0.05)'
                  }}>
                    {exp.period}
                  </span>
                </div>

                <p style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.95rem',
                  lineHeight: '1.6',
                  fontWeight: 350
                }}>
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
          </>
          )}
        </div>
      </div>

      <style>{`
        .timeline-item:hover .timeline-dot {
          background-color: var(--accent-cyan) !important;
          box-shadow: 0 0 20px var(--accent-cyan) !important;
          transform: scale(1.2);
        }
        @media (max-width: 576px) {
          .timeline-line {
            left: 10px !important;
          }
          .timeline-dot {
            left: 2px !important;
          }
          .timeline-item {
            padding-left: 35px !important;
          }
        }
      `}</style>
    </section>
  );
}
