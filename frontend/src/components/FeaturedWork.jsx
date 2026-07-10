import React from 'react';
import BACKEND_URL from '../config';

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
              <div 
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
                {/* Background/Top Image */}
                <div style={{
                  position: 'relative',
                  width: '100%',
                  flex: 1,
                  minHeight: '250px',
                  backgroundColor: '#0a0a0c', // Dark background behind contain image
                  overflow: 'hidden'
                }}>
                  <img 
                    src={
  project.imageName && project.imageName.startsWith('http')
    ? project.imageName
    : project.imageName && project.imageName.startsWith('/uploads')
    ? `${BACKEND_URL}${project.imageName}`
    : `/${project.imageName}`
}
                    alt={project.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      transition: 'transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)'
                    }}
                    className="project-image"
                  />
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to top, rgba(10, 10, 12, 1) 0%, rgba(10, 10, 12, 0) 20%)',
                    zIndex: 2,
                    pointerEvents: 'none'
                  }}></div>
                </div>

                {/* Content Overlay */}
                <div style={{
                  position: 'relative',
                  zIndex: 3,
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  backgroundColor: '#0a0a0c'
                }}>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: '#ffffff',
                    margin: 0
                  }}>
                    {project.title}
                  </h3>
                  
                  <p style={{
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.5',
                    margin: 0
                  }}>
                    {project.description}
                  </p>

                  <div style={{
                    display: 'flex',
                    gap: '1rem',
                    marginTop: 'auto',
                    paddingTop: '1rem'
                  }}>
                    {project.link && project.link !== '#' && (
                      <a href={project.link} target="_blank" rel="noreferrer" style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        color: '#fff',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        textDecoration: 'none',
                        border: '1px solid rgba(255,255,255,0.2)',
                        transition: 'all 0.2s'
                      }} className="btn-hover">
                        GitHub
                      </a>
                    )}
                    {project.liveLink && project.liveLink !== '#' && (
                      <a href={project.liveLink} target="_blank" rel="noreferrer" style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: 'var(--accent-cyan)',
                        color: '#000',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        textDecoration: 'none',
                        transition: 'all 0.2s'
                      }} className="btn-hover-solid">
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
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
