import React, { useState } from 'react';
import BACKEND_URL from '../config';

export default function Contact({ personal }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', text: 'All fields are required.' });
      return;
    }

    setLoading(true);
    setStatus({ type: '', text: '' });

    try {
      const response = await fetch(`${BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (response.ok) {
        setStatus({ type: 'success', text: data.message || 'Message sent successfully!' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({ type: 'error', text: data.error || 'Failed to send message.' });
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setStatus({ type: 'error', text: 'Server connection error. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  const email = personal?.email || "harshita@example.com";

  return (
    <section id="contact" style={{
      backgroundColor: '#0a0a0c',
      borderTop: '1px solid rgba(255, 255, 255, 0.02)',
      paddingBottom: '6rem'
    }}>
      <div className="container grid-2">
        {/* Left Side: Contact Information */}
        <div>
          <span className="section-tag">Let's Connect</span>
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle" style={{ marginBottom: '2.5rem' }}>
            Have an exciting project, job opportunity, or just want to chat about tech aesthetics? Drop a message!
          </p>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'rgba(0, 240, 255, 0.05)',
                border: '1px solid rgba(0, 240, 255, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Email Address</span>
                <a href={`mailto:${email}`} style={{ color: '#fff', textDecoration: 'none', fontWeight: 500 }}>
                  {email}
                </a>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'rgba(139, 92, 246, 0.05)',
                border: '1px solid rgba(139, 92, 246, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-purple)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Location</span>
                <span style={{ color: '#fff', fontWeight: 500 }}>{personal?.location || "San Francisco Bay Area, CA"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div>
          <form 
            onSubmit={handleSubmit} 
            className="glass-card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              width: '100%',
              maxWidth: '500px',
              margin: '0 auto'
            }}
          >
            {status.text && (
              <div style={{
                padding: '1rem',
                borderRadius: '8px',
                fontSize: '0.9rem',
                border: '1px solid',
                backgroundColor: status.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                borderColor: status.type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)',
                color: status.type === 'success' ? '#10b981' : '#ef4444'
              }}>
                {status.text}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="name" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange}
                placeholder="Your name"
                required
                className="form-input"
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="email" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange}
                placeholder="your.email@example.com"
                required
                className="form-input"
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="message" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Message</label>
              <textarea 
                id="message" 
                name="message" 
                rows="5"
                value={formData.message} 
                onChange={handleChange}
                placeholder="Type your message here..."
                required
                className="form-input"
                style={{ resize: 'none' }}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="btn-primary" 
              style={{
                width: '100%',
                padding: '1rem',
                opacity: loading ? 0.7 : 1,
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Sending Message...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        .form-input {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          padding: 0.85rem 1rem;
          color: #ffffff;
          font-family: var(--font-body);
          font-size: 0.95rem;
          transition: var(--transition-smooth);
          outline: none;
        }
        .form-input:focus {
          border-color: var(--accent-cyan);
          box-shadow: 0 0 10px rgba(0, 240, 255, 0.15);
          background: rgba(255, 255, 255, 0.04);
        }
      `}</style>
    </section>
  );
}
