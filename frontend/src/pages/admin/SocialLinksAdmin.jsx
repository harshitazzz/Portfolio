import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BACKEND_URL from '../../config';

export default function SocialLinksAdmin() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [order, setOrder] = useState('0');

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/social-links`);
      setLinks(data);
    } catch (err) {
      console.error('Failed to fetch social links', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title,
      url,
      order: parseInt(order) || 0
    };

    try {
      if (editingId) {
        await axios.put(`${BACKEND_URL}/api/social-links/${editingId}`, payload);
        alert('Social link updated!');
      } else {
        await axios.post(`${BACKEND_URL}/api/social-links`, payload);
        alert('Social link added!');
      }
      resetForm();
      fetchLinks();
    } catch (err) {
      console.error('Failed to save social link', err);
      alert('Failed to save social link.');
    }
  };

  const handleEdit = (link) => {
    setEditingId(link._id);
    setTitle(link.title);
    setUrl(link.url);
    setOrder(link.order.toString());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this social link?')) return;
    try {
      await axios.delete(`${BACKEND_URL}/api/social-links/${id}`);
      fetchLinks();
    } catch (err) {
      console.error('Failed to delete social link', err);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setUrl('');
    setOrder('0');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="admin-header">
        <h1>Social Links Management</h1>
      </div>

      <div className="admin-card" style={{ marginBottom: '2rem' }}>
        <h2>{editingId ? 'Edit Social Link' : 'Add Social Link'}</h2>
        <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
          <div className="form-group">
            <label>Social Media Name / Title</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="e.g. GitHub, LinkedIn, LeetCode, CodeChef, Instagram"
            />
            <small style={{ color: 'rgba(255,255,255,0.4)', marginTop: '0.25rem', display: 'block' }}>
              Tip: The UI matches icons for GitHub, LinkedIn, LeetCode, CodeChef, Instagram, Dribbble, and YouTube. Matches are case-insensitive.
            </small>
          </div>

          <div className="form-group">
            <label>Profile Link / URL</label>
            <input
              type="url"
              className="form-control"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              placeholder="e.g. https://github.com/username"
            />
          </div>

          <div className="form-group">
            <label>Display Order (Lower values show first)</label>
            <input
              type="number"
              className="form-control"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              placeholder="e.g. 0"
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button type="submit" className="admin-btn">
              {editingId ? 'Update Social Link' : 'Add Social Link'}
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

      <div className="admin-card">
        <h2>Existing Social Links</h2>
        {links.length === 0 ? (
          <p style={{ marginTop: '1rem', color: '#999' }}>No social links added yet. Add one above!</p>
        ) : (
          <table className="admin-table" style={{ marginTop: '1rem' }}>
            <thead>
              <tr>
                <th>Order</th>
                <th>Platform</th>
                <th>URL</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {links.map((link) => (
                <tr key={link._id}>
                  <td style={{ width: '80px' }}>{link.order}</td>
                  <td style={{ fontWeight: 600 }}>{link.title}</td>
                  <td>
                    <a href={link.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-cyan)' }}>
                      {link.url}
                    </a>
                  </td>
                  <td>
                    <button
                      onClick={() => handleEdit(link)}
                      style={{ marginRight: '8px', padding: '4px 10px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >Edit</button>
                    <button
                      onClick={() => handleDelete(link._id)}
                      style={{ padding: '4px 10px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
