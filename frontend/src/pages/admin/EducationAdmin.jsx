import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BACKEND_URL from '../../config';

export default function EducationAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [cgpa, setCgpa] = useState('');
  const [period, setPeriod] = useState('');

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/education`);
      setItems(data);
    } catch (err) {
      console.error('Failed to fetch education', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { title, subtitle, cgpa, period };
    try {
      if (editingId) {
        await axios.put(`${BACKEND_URL}/api/education/${editingId}`, payload);
        alert('Education updated!');
      } else {
        await axios.post(`${BACKEND_URL}/api/education`, payload);
        alert('Education added!');
      }
      resetForm();
      fetchItems();
    } catch (err) {
      console.error('Failed to save education', err);
      alert('Failed to save.');
    }
  };

  const handleEdit = (edu) => {
    setEditingId(edu._id);
    setTitle(edu.title);
    setSubtitle(edu.subtitle);
    setCgpa(edu.cgpa);
    setPeriod(edu.period);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this entry?')) return;
    try {
      await axios.delete(`${BACKEND_URL}/api/education/${id}`);
      fetchItems();
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle(''); setSubtitle(''); setCgpa(''); setPeriod('');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="admin-header">
        <h1>Education</h1>
      </div>

      {/* Form */}
      <div className="admin-card" style={{ marginBottom: '2rem' }}>
        <h2>{editingId ? 'Edit Education' : 'Add Education'}</h2>
        <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
          <div className="form-group">
            <label>Institution / Degree Title</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="e.g. B.Tech Computer Science"
            />
          </div>

          <div className="form-group">
            <label>Subtitle (School / University Name)</label>
            <input
              type="text"
              className="form-control"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              required
              placeholder="e.g. ABC University"
            />
          </div>

          <div className="form-group">
            <label>CGPA / Grade</label>
            <input
              type="text"
              className="form-control"
              value={cgpa}
              onChange={(e) => setCgpa(e.target.value)}
              required
              placeholder="e.g. 8.5 / 10"
            />
          </div>

          <div className="form-group">
            <label>Timeline (Period)</label>
            <input
              type="text"
              className="form-control"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              required
              placeholder="e.g. 2020 - 2024"
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button type="submit" className="admin-btn">
              {editingId ? 'Update' : 'Add Education'}
            </button>
            {editingId && (
              <button type="button" className="admin-btn" style={{ background: '#333' }} onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* List */}
      <div className="admin-card">
        <h2>Existing Education</h2>
        {items.length === 0 ? (
          <p style={{ marginTop: '1rem', color: '#999' }}>No education entries yet.</p>
        ) : (
          <table className="admin-table" style={{ marginTop: '1rem' }}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Subtitle</th>
                <th>CGPA</th>
                <th>Period</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((edu) => (
                <tr key={edu._id}>
                  <td>{edu.title}</td>
                  <td>{edu.subtitle}</td>
                  <td>{edu.cgpa}</td>
                  <td>{edu.period}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(edu)}
                      style={{ marginRight: '8px', padding: '4px 10px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >Edit</button>
                    <button
                      onClick={() => handleDelete(edu._id)}
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
