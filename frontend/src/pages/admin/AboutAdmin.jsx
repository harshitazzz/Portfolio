import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BACKEND_URL from '../../config';

export default function AboutAdmin() {
  const [loading, setLoading] = useState(true);
  const [headline, setHeadline] = useState('');
  const [subHeadline, setSubHeadline] = useState('');
  const [techStack, setTechStack] = useState('');

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/about`);
      if (data && data._id) {
        setHeadline(data.headline || '');
        setSubHeadline(data.subHeadline || '');
        setTechStack(data.techStack ? data.techStack.join(', ') : '');
      }
    } catch (error) {
      console.error('Failed to fetch about data', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post(`${BACKEND_URL}/api/about`, {
        headline,
        subHeadline,
        techStack
      });
      alert('About section updated successfully!');
      fetchAbout();
    } catch (error) {
      console.error('Failed to update about section', error);
      alert('Failed to update about section.');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="admin-header">
        <h1>About Section</h1>
      </div>

      <div className="admin-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Headline</label>
            <input 
              type="text" 
              className="form-control" 
              value={headline} 
              onChange={(e) => setHeadline(e.target.value)} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label>About Me (Sub Headline)</label>
            <textarea 
              className="form-control" 
              rows="6" 
              value={subHeadline} 
              onChange={(e) => setSubHeadline(e.target.value)} 
              required 
            ></textarea>
          </div>
          
          <div className="form-group">
            <label>Tech Stack (Comma Separated)</label>
            <textarea 
              className="form-control" 
              rows="3" 
              value={techStack} 
              onChange={(e) => setTechStack(e.target.value)} 
              required 
              placeholder="e.g. React, Node.js, Next.js, Express, MongoDB"
            ></textarea>
          </div>

          <button type="submit" className="admin-btn">Save About Content</button>
        </form>
      </div>
    </div>
  );
}
