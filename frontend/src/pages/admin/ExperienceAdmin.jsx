import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BACKEND_URL from '../../config';

export default function ExperienceAdmin() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [editingId, setEditingId] = useState(null);
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [period, setPeriod] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/experience`);
      setExperiences(data);
    } catch (error) {
      console.error('Failed to fetch experiences', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const payload = { role, company, period, description };

    try {
      if (editingId) {
        await axios.put(`${BACKEND_URL}/api/experience/${editingId}`, payload);
        alert('Experience updated successfully!');
      } else {
        await axios.post(`${BACKEND_URL}/api/experience`, payload);
        alert('Experience added successfully!');
      }
      
      resetForm();
      fetchExperiences();
    } catch (error) {
      console.error('Failed to save experience', error);
      alert('Failed to save experience.');
    }
  };

  const handleEdit = (exp) => {
    setEditingId(exp._id);
    setRole(exp.role);
    setCompany(exp.company);
    setPeriod(exp.period);
    setDescription(exp.description);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      try {
        await axios.delete(`${BACKEND_URL}/api/experience/${id}`);
        fetchExperiences();
      } catch (error) {
        console.error('Failed to delete experience', error);
      }
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setRole('');
    setCompany('');
    setPeriod('');
    setDescription('');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="admin-header">
        <h1>Work Experience</h1>
      </div>

      <div className="admin-card" style={{ marginBottom: '2rem' }}>
        <h2>{editingId ? 'Edit Experience' : 'Add New Experience'}</h2>
        <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
          <div className="form-group">
            <label>Role</label>
            <input 
              type="text" 
              className="form-control" 
              value={role} 
              onChange={(e) => setRole(e.target.value)} 
              required 
              placeholder="e.g. Senior Frontend Engineer"
            />
          </div>

          <div className="form-group">
            <label>Company</label>
            <input 
              type="text" 
              className="form-control" 
              value={company} 
              onChange={(e) => setCompany(e.target.value)} 
              required 
              placeholder="e.g. CyberPulse Studios"
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
              placeholder="e.g. 2021 - PRESENT"
            />
          </div>
          
          <div className="form-group">
            <label>Description</label>
            <textarea 
              className="form-control" 
              rows="4" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              required 
            ></textarea>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button type="submit" className="admin-btn">
              {editingId ? 'Update Experience' : 'Add Experience'}
            </button>
            {editingId && (
              <button type="button" className="admin-btn" style={{ background: '#333' }} onClick={resetForm}>
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="admin-card">
        <h2>Existing Experiences</h2>
        {experiences.length === 0 ? (
          <p style={{ marginTop: '1rem' }}>No experiences found.</p>
        ) : (
          <table className="admin-table" style={{ marginTop: '1rem' }}>
            <thead>
              <tr>
                <th>Role</th>
                <th>Company</th>
                <th>Period</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {experiences.map(exp => (
                <tr key={exp._id}>
                  <td>{exp.role}</td>
                  <td>{exp.company}</td>
                  <td>{exp.period}</td>
                  <td>
                    <button 
                      onClick={() => handleEdit(exp)}
                      style={{ marginRight: '10px', padding: '5px 10px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(exp._id)}
                      style={{ padding: '5px 10px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      Delete
                    </button>
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
