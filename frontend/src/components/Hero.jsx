import React from 'react';
import BACKEND_URL from '../config';

export default function Hero({ personal }) {
  const { headline, subHeadline, backgroundImage, avatarVideo } = personal || {
    headline: "Hi, I am Harshita Maheshwari, welcome to my portfolio",
    subHeadline:
      "I design and develop high-end digital experiences where aesthetics meet technical precision. Creating the future of web with obsidian voids and digital pulses."
  };

  const bgImageUrl = backgroundImage
    ? (backgroundImage.startsWith('http') ? backgroundImage : `${BACKEND_URL}${backgroundImage}`)
    : "url('/hero-bg.png')";
  const videoUrl = avatarVideo
    ? (avatarVideo.startsWith('http') ? avatarVideo : `${BACKEND_URL}${avatarVideo}`)
    : "/avatar_hoodie_girl.webm";

  // If bgImageUrl is already a URL string from DB, we format it as CSS URL if it's not "url(...)"
  const bgImageStyle = bgImageUrl.startsWith('url') ? bgImageUrl : `url('${bgImageUrl}')`;

  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '7rem 0 4rem 0',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Hero Background Image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: bgImageStyle,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.45,
          filter: 'blur(4px)',
          transform: 'scale(1)',
          zIndex: 0
        }}
      />

      {/* Dark Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.65)',
          zIndex: 1
        }}
      />

      <div
        className="container grid-2"
        style={{
          position: 'relative',
          zIndex: 2
        }}
      >
        {/* Left Column */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'
          }}
        >
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              lineHeight: 1.05,
              marginBottom: '1.5rem',
              fontWeight: 800,
              letterSpacing: '-0.03em'
            }}
          >
            {headline || "Hi, I am Harshita Maheshwari, welcome to my portfolio"}
          </h1>

          <p
            style={{
              color: 'var(--text-secondary)',
              fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
              lineHeight: 1.6,
              marginBottom: '2.5rem',
              maxWidth: '520px',
              fontWeight: 350
            }}
          >
            {subHeadline}
          </p>

          <div
            style={{
              display: 'flex',
              gap: '1.25rem',
              flexWrap: 'wrap'
            }}
          >
            <a href="#work" className="btn-primary">
              View Projects
            </a>

            <a href="#about" className="btn-secondary">
              Read Story
            </a>
          </div>
        </div>

        {/* Right Column */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative'
          }}
        >
          {/* Neon Ring */}
          <div
            className="neon-pulse-ring"
            style={{
              position: 'absolute',
              width: '85%',
              height: '85%',
              borderRadius: '24px',
              border: '2px dashed rgba(0,240,255,0.2)',
              zIndex: 0,
              animation: 'pulse 4s infinite linear'
            }}
          />

          {/* Avatar Card */}
          <div
            className="avatar-card"
            style={{
              position: 'relative',
              width: '90%',
              aspectRatio: '1',
              borderRadius: '24px',
              overflow: 'hidden',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.05)',
              boxShadow:
                '0 25px 50px -12px rgba(0,0,0,0.7), 0 0 40px rgba(139,92,246,0.1)',
              zIndex: 1,
              transition: 'var(--transition-smooth)'
            }}
          >
            <video
              key={videoUrl}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              style={{
                width: '140%',
                height: '140%',
                objectFit: 'contain',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%) scale(1.35)',
                display: 'block',
                background: 'transparent',
                transition: 'var(--transition-smooth)'
              }}
            >
              <source src={videoUrl} type="video/webm" />
              <source src={videoUrl} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0% {
            transform: rotate(0deg) scale(0.97);
            opacity: 0.3;
          }
          50% {
            transform: rotate(180deg) scale(1.03);
            opacity: 0.6;
          }
          100% {
            transform: rotate(360deg) scale(0.97);
            opacity: 0.3;
          }
        }

        .avatar-card:hover {
          transform: translateY(-8px) scale(1.02);
          border-color: rgba(0,240,255,0.3);
          box-shadow:
            0 30px 60px -15px rgba(0,240,255,0.2),
            0 0 50px rgba(139,92,246,0.15) !important;
        }

        .avatar-card:hover video {
          transform: scale(1.05);
        }

        video {
          pointer-events: none;
        }

        @media (max-width: 768px) {
          .avatar-card {
            width: 100%;
            margin-top: 2rem;
          }
        }
      `}</style>
    </section>
  );
}
