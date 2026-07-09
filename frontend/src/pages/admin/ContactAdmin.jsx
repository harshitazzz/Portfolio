import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BACKEND_URL from '../../config';

export default function ContactAdmin() {
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/contact-info`);
      setEmail(data.email || '');
      setLocation(data.location || '');
    } catch (err) {
      console.error('Failed to fetch contact info', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BACKEND_URL}/api/contact-info`, { email, location });
      alert('Contact information updated successfully!');
    } catch (err) {
      console.error('Failed to save contact info', err);
      alert('Failed to update contact info.');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="admin-header">
        <h1>Contact Settings</h1>
      </div>

      <div className="admin-card">
        <h2>Update Email & Location</h2>
        <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem' }}>
          <div className="form-group">
            <label>Public Email Address</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="e.g. yourname@example.com"
            />
          </div>

          <div className="form-group">
            <label>Public Location</label>
            <input
              type="text"
              className="form-control"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              placeholder="e.g. San Francisco Bay Area, CA"
            />
          </div>

          <button type="submit" className="admin-btn">
            Save Contact Settings
          </button>
        </form>
      </div>
    </div>
  );
}
