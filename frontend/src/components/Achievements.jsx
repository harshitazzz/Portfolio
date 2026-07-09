import React from 'react';
import BACKEND_URL from '../config';

export default function Achievements({ achievements }) {
  const items = achievements || [];

  return (
    <section id="achievements" style={{
      backgroundColor: 'var(--bg-obsidian-void)',
      borderTop: '1px solid rgba(255, 255, 255, 0.02)',
    }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: '4rem' }}>
          <span className="section-tag">Milestones</span>
          <h2 className="section-title">Achievements</h2>
          <p className="section-subtitle">
            Recognitions, certifications, and milestones from my journey.
          </p>
        </div>

        {items.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            color: 'var(--text-secondary)',
          }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '1rem',
              opacity: 0.3,
            }}>🏆</div>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: 400,
              letterSpacing: '0.05em',
              color: 'var(--text-secondary)',
            }}>
              Achievements to be added soon...
            </h3>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '2rem',
          }}>
            {items.map((achievement, idx) => {
              const imgUrl = achievement.image && achievement.image.startsWith('/uploads')
                ? `${BACKEND_URL}${achievement.image}`
                : achievement.image;

              return (
                <div
                  key={achievement.id || idx}
                  className="achievement-card glass-card"
                  style={{
                    borderRadius: '16px',
                    overflow: 'hidden',
                    transition: 'var(--transition-smooth)',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {/* Certificate / Image */}
                  {imgUrl && (
                    <div style={{
                      width: '100%',
                      aspectRatio: '16/9',
                      overflow: 'hidden',
                      backgroundColor: 'rgba(0,0,0,0.3)',
                    }}>
                      <img
                        src={imgUrl}
                        alt={achievement.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                          transition: 'transform 0.5s ease',
                        }}
                        className="achievement-img"
                      />
                    </div>
                  )}

                  {/* Text Content */}
                  <div style={{ padding: '1.5rem', flex: 1 }}>
                    {/* Award icon + title */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.75rem' }}>
                      <span style={{
                        fontSize: '1.25rem',
                        lineHeight: 1,
                        marginTop: '2px',
                        flexShrink: 0,
                      }}>🏆</span>
                      <h3 style={{
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        lineHeight: 1.3,
                      }}>
                        {achievement.title}
                      </h3>
                    </div>

                    <p style={{
                      color: 'var(--text-secondary)',
                      fontSize: '0.9rem',
                      lineHeight: 1.65,
                      fontWeight: 350,
                    }}>
                      {achievement.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        .achievement-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px -10px rgba(0, 240, 255, 0.12), 0 0 0 1px rgba(0, 240, 255, 0.08) !important;
          border-color: rgba(0, 240, 255, 0.15) !important;
        }
        .achievement-card:hover .achievement-img {
          transform: scale(1.05);
        }
      `}</style>
    </section>
  );
}
