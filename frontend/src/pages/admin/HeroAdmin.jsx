import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import BACKEND_URL from '../../config';

export default function HeroAdmin() {
  const [loading, setLoading] = useState(true);
  const [headline, setHeadline] = useState('');
  const [subHeadline, setSubHeadline] = useState('');
  const [avatarVideoFile, setAvatarVideoFile] = useState(null);
  const [bgImageFile, setBgImageFile] = useState(null);
  
  const videoInputRef = useRef(null);
  const bgInputRef = useRef(null);

  useEffect(() => {
    fetchHero();
  }, []);

  const fetchHero = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/hero`);
      if (data) {
        setHeadline(data.headline || '');
        setSubHeadline(data.subHeadline || '');
      }
    } catch (error) {
      console.error('Failed to fetch hero data', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('headline', headline);
    formData.append('subHeadline', subHeadline);
    
    if (avatarVideoFile) {
      formData.append('avatarVideo', avatarVideoFile);
    }
    
    if (bgImageFile) {
      formData.append('backgroundImage', bgImageFile);
    }

    try {
      await axios.post(`${BACKEND_URL}/api/hero`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Hero updated successfully!');
      if (videoInputRef.current) videoInputRef.current.value = '';
      if (bgInputRef.current) bgInputRef.current.value = '';
      setAvatarVideoFile(null);
      setBgImageFile(null);
      fetchHero();
    } catch (error) {
      console.error('Failed to update hero', error);
      alert('Failed to update hero.');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="admin-header">
        <h1>Hero Section</h1>
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
            <label>Sub Headline</label>
            <textarea 
              className="form-control" 
              rows="4" 
              value={subHeadline} 
              onChange={(e) => setSubHeadline(e.target.value)} 
              required 
            ></textarea>
          </div>
          
          <div className="form-group">
            <label>Avatar Video Upload (Leave empty to keep current)</label>
            <input 
              type="file" 
              className="form-control" 
              accept="video/webm, video/mp4" 
              onChange={(e) => setAvatarVideoFile(e.target.files[0])} 
              ref={videoInputRef} 
            />
          </div>

          <div className="form-group">
            <label>Background Image Upload (Leave empty to keep current)</label>
            <input 
              type="file" 
              className="form-control" 
              accept="image/*" 
              onChange={(e) => setBgImageFile(e.target.files[0])} 
              ref={bgInputRef} 
            />
          </div>
          
          <button type="submit" className="admin-btn">Save Hero Content</button>
        </form>
      </div>
    </div>
  );
}
