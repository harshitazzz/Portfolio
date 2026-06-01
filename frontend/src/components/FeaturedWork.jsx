import React from 'react';

export default function FeaturedWork({ projects }) {
  const defaultProjects = [
    {
      id: "neo-bank",
      title: "Neo-Bank Interface",
      category: "FINTECH PLATFORM",
      description: "A selection of meticulously crafted interfaces and technical architectures. High-performance fintech dashboard with custom charting, real-time analytics, and sleek neon aesthetics.",
      imageName: "neo_bank.png",
      link: "#"
    },
    {
      id: "elite-gear",
      title: "Elite Gear",
      category: "ECOMMERCE",
      description: "Fully immersive gaming gear marketplace featuring interactive 3D product previews, dynamic custom checkout, and premium micro-interactions.",
      imageName: "elite_gear.png",
      link: "#"
    },
    {
      id: "web3-protocol",
      title: "Web3 Protocol",
      category: "BLOCKCHAIN",
      description: "Decentralized liquidity pool analyzer and network node visualizer featuring real-time node map rendering, gas trackers, and sub-second updates.",
      imageName: "web3_protocol.png",
      link: "#"
    },
    {
      id: "visionary-living",
      title: "Visionary Living",
      category: "ARCHITECTURE / UI",
      description: "A high-end residential real estate portal utilizing large-scale imagery, glassmorphic layout elements, and smooth page transition animations.",
      imageName: "visionary_living.png",
      link: "#"
    }
  ];

  const items = projects && projects.length > 0 ? projects : defaultProjects;

  return (
    <section id="work" style={{ backgroundColor: 'var(--bg-obsidian-void)', borderTop: '1px solid rgba(255, 255, 255, 0.02)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '4rem',
          flexWrap: 'wrap',
          gap: '2rem'
        }}>
          <div>
            <span className="section-tag">Portfolio</span>
            <h2 className="section-title" style={{ margin: 0 }}>Featured Work</h2>
          </div>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1rem',
            maxWidth: '320px',
            lineHeight: '1.5',
            textAlign: 'right'
          }} className="work-subtitle">
            A selection of meticulously crafted interfaces and technical architectures.
          </p>
        </div>

        {/* Dynamic Project Grid */}
        <div className="projects-grid">
          {items.map((project, idx) => {
            // Apply asymmetric layout classes based on index
            const gridClass = idx % 4 === 0 
              ? 'card-wide-left' 
              : idx % 4 === 1 
              ? 'card-narrow-right' 
              : idx % 4 === 2 
              ? 'card-narrow-left' 
              : 'card-wide-right';

            return (
              <a 
                href={project.link} 
                key={project.id} 
                className={`project-card ${gridClass}`}
                style={{
                  position: 'relative',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  aspectRatio: idx % 2 === 0 ? '16/10' : '4/3',
                  backgroundColor: '#0a0a0c',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  transition: 'var(--transition-smooth)'
                }}
              >
                {/* Background Image */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  zIndex: 1,
                  overflow: 'hidden'
                }}>
                  <img 
                    src={`/${project.imageName}`} 
                    alt={project.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)'
                    }}
                    className="project-image"
                  />
                  {/* Subtle vignette gradient overlay */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to top, rgba(7, 7, 9, 0.9) 0%, rgba(7, 7, 9, 0.3) 50%, rgba(0, 0, 0, 0) 100%)',
                    zIndex: 2
                  }}></div>
                </div>

                {/* Content Overlay */}
                <div style={{
                  position: 'relative',
                  zIndex: 3,
                  padding: '2.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '0.5rem'
                }}>
                  <span style={{
                    fontSize: '0.65rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: '#fff',
                    backgroundColor: 'rgba(139, 92, 246, 0.4)',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '4px',
                    fontWeight: 600,
                    backdropFilter: 'blur(4px)',
                    border: '1px solid rgba(139, 92, 246, 0.2)'
                  }}>
                    {project.category}
                  </span>
                  <h3 style={{
                    fontSize: '1.8rem',
                    fontWeight: '700',
                    color: '#ffffff',
                    marginTop: '0.5rem'
                  }}>
                    {project.title}
                  </h3>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      <style>{`
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 2.5rem;
        }

        .card-wide-left {
          grid-column: span 7;
        }
        .card-narrow-right {
          grid-column: span 5;
        }
        .card-narrow-left {
          grid-column: span 5;
        }
        .card-wide-right {
          grid-column: span 7;
        }

        .project-card:hover {
          border-color: rgba(0, 240, 255, 0.45);
          box-shadow: 0 20px 40px -15px var(--accent-cyan-glow), 0 0 30px rgba(0, 240, 255, 0.1);
          transform: translateY(-4px);
        }

        .project-card:hover .project-image {
          transform: scale(1.04);
        }

        @media (max-width: 991px) {
          .card-wide-left, .card-narrow-right, .card-narrow-left, .card-wide-right {
            grid-column: span 6;
          }
        }

        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .card-wide-left, .card-narrow-right, .card-narrow-left, .card-wide-right {
            grid-column: span 1;
            aspect-ratio: 4/3;
          }
          .work-subtitle {
            text-align: left !important;
          }
        }
      `}</style>
    </section>
  );
}
