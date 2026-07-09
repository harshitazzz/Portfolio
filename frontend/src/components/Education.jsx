import React from 'react';

export default function Education({ education }) {
  const items = education || [];

  return (
    <section id="education" style={{
      backgroundColor: '#0a0a0c',
      borderTop: '1px solid rgba(255, 255, 255, 0.02)',
    }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: '4rem' }}>
          <span className="section-tag">Academic Background</span>
          <h2 className="section-title">Education</h2>
          <p className="section-subtitle">
            My academic journey and qualifications.
          </p>
        </div>

        {/* Timeline */}
        <div style={{
          position: 'relative',
          maxWidth: '850px',
          margin: '0 auto',
        }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 400, letterSpacing: '0.05em' }}>
                Education to be added soon...
              </h3>
            </div>
          ) : (
            <>
              {/* Vertical Track Line */}
              <div style={{
                position: 'absolute',
                left: '20px',
                top: '8px',
                bottom: '24px',
                width: '2px',
                background: 'linear-gradient(to bottom, rgba(139, 92, 246, 1) 0%, var(--accent-cyan) 60%, rgba(255, 255, 255, 0.05) 100%)',
              }}></div>

              {items.map((edu, idx) => (
                <div
                  key={edu.id || idx}
                  className="edu-timeline-item"
                  style={{
                    position: 'relative',
                    paddingLeft: '60px',
                    marginBottom: '3.5rem',
                  }}
                >
                  {/* Indicator Dot */}
                  <div
                    className="edu-dot"
                    style={{
                      position: 'absolute',
                      left: '12px',
                      top: '6px',
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--bg-obsidian-void)',
                      border: '3px solid rgba(139, 92, 246, 1)',
                      boxShadow: '0 0 10px rgba(139, 92, 246, 0.6)',
                      zIndex: 2,
                      transition: 'var(--transition-smooth)',
                    }}
                  ></div>

                  {/* Card */}
                  <div
                    className="glass-card"
                    style={{ padding: '2rem', borderRadius: '16px', transition: 'var(--transition-smooth)' }}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      flexWrap: 'wrap',
                      gap: '1rem',
                      marginBottom: '0.5rem',
                    }}>
                      <div>
                        <h3 style={{
                          fontSize: '1.25rem',
                          fontWeight: 700,
                          color: 'var(--text-primary)',
                          marginBottom: '0.25rem',
                        }}>
                          {edu.title}
                        </h3>
                        <span style={{
                          color: 'rgba(139, 92, 246, 1)',
                          fontSize: '0.9rem',
                          fontWeight: 500,
                          display: 'inline-block',
                        }}>
                          {edu.subtitle}
                        </span>
                      </div>

                      {/* Period pill */}
                      <span style={{
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        letterSpacing: '0.05em',
                        color: 'var(--text-muted)',
                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                        padding: '0.35rem 0.75rem',
                        borderRadius: '100px',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        whiteSpace: 'nowrap',
                      }}>
                        {edu.period}
                      </span>
                    </div>

                    {/* CGPA badge */}
                    {edu.cgpa && (
                      <div style={{ marginTop: '0.75rem' }}>
                        <span style={{
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          color: 'var(--accent-cyan)',
                          backgroundColor: 'rgba(0, 240, 255, 0.07)',
                          border: '1px solid rgba(0, 240, 255, 0.2)',
                          padding: '0.3rem 0.8rem',
                          borderRadius: '100px',
                          letterSpacing: '0.04em',
                        }}>
                          CGPA: {edu.cgpa}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      <style>{`
        .edu-timeline-item:hover .edu-dot {
          background-color: rgba(139, 92, 246, 1) !important;
          box-shadow: 0 0 20px rgba(139, 92, 246, 0.8) !important;
          transform: scale(1.2);
        }
      `}</style>
    </section>
  );
}
