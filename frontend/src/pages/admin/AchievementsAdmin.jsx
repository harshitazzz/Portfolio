import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import BACKEND_URL from '../../config';

export default function AchievementsAdmin() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/achievements`);
      setAchievements(data);
    } catch (err) {
      console.error('Failed to fetch achievements', err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (imageFile) formData.append('image', imageFile);

    try {
      if (editingId) {
        await axios.put(`${BACKEND_URL}/api/achievements/${editingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Achievement updated!');
      } else {
        await axios.post(`${BACKEND_URL}/api/achievements`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Achievement added!');
      }
      resetForm();
      fetchAchievements();
    } catch (err) {
      console.error('Failed to save achievement', err);
      alert('Failed to save achievement.');
    }
  };

  const handleEdit = (a) => {
    setEditingId(a._id);
    setTitle(a.title);
    setDescription(a.description);
    setImagePreview(a.image ? `${BACKEND_URL}${a.image}` : null);
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this achievement?')) return;
    try {
      await axios.delete(`${BACKEND_URL}/api/achievements/${id}`);
      fetchAchievements();
    } catch (err) {
      console.error('Failed to delete', err);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setDescription('');
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="admin-header">
        <h1>Achievements</h1>
      </div>

      {/* Form */}
      <div className="admin-card" style={{ marginBottom: '2rem' }}>
        <h2>{editingId ? 'Edit Achievement' : 'Add New Achievement'}</h2>
        <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="e.g. Best Developer Award 2024"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Brief description of this achievement..."
            ></textarea>
          </div>

          <div className="form-group">
            <label>Certificate / Image (Leave empty to keep current)</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
            />
            {imagePreview && (
              <div style={{ marginTop: '0.75rem' }}>
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{
                    maxWidth: '300px',
                    maxHeight: '200px',
                    borderRadius: '8px',
                    objectFit: 'cover',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                />
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button type="submit" className="admin-btn">
              {editingId ? 'Update Achievement' : 'Add Achievement'}
            </button>
            {editingId && (
              <button
                type="button"
                className="admin-btn"
                style={{ background: '#333' }}
                onClick={resetForm}
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      {/* List */}
      <div className="admin-card">
        <h2>Existing Achievements</h2>
        {achievements.length === 0 ? (
          <p style={{ marginTop: '1rem', color: '#999' }}>No achievements yet. Add one above!</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            {achievements.map((a) => (
              <div
                key={a._id}
                style={{
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'center',
                  padding: '1rem',
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                {a.image && (
                  <img
                    src={`${BACKEND_URL}${a.image}`}
                    alt={a.title}
                    style={{
                      width: '80px',
                      height: '60px',
                      objectFit: 'cover',
                      borderRadius: '6px',
                      flexShrink: 0,
                    }}
                  />
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, marginBottom: '0.25rem', color: '#fff' }}>{a.title}</div>
                  <div style={{ fontSize: '0.85rem', color: '#999', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {a.description}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                  <button
                    onClick={() => handleEdit(a)}
                    style={{ padding: '5px 12px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(a._id)}
                    style={{ padding: '5px 12px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
