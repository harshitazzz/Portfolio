import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import BACKEND_URL from '../../config';

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [techStack, setTechStack] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [liveDemoLink, setLiveDemoLink] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/projects`);
      setProjects(data);
    } catch (error) {
      console.error('Failed to fetch projects', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setCurrentProject(null);
    setTitle('');
    setDescription('');
    setTechStack('');
    setGithubLink('');
    setLiveDemoLink('');
    setImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setIsEditing(true);
  };

  const handleEdit = (project) => {
    setCurrentProject(project);
    setTitle(project.title);
    setDescription(project.description);
    setTechStack(project.techStack.join(', '));
    setGithubLink(project.githubLink || '');
    setLiveDemoLink(project.liveDemoLink || '');
    setImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`${BACKEND_URL}/api/projects/${id}`);
        fetchProjects();
      } catch (error) {
        console.error('Failed to delete project', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('techStack', techStack);
    formData.append('githubLink', githubLink);
    formData.append('liveDemoLink', liveDemoLink);
    
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      if (currentProject) {
        await axios.put(`${BACKEND_URL}/api/projects/${currentProject._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        if (!imageFile) {
          alert('Image is required for new projects');
          return;
        }
        await axios.post(`${BACKEND_URL}/api/projects`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      setIsEditing(false);
      fetchProjects();
    } catch (error) {
      console.error('Failed to save project', error);
      alert('Failed to save project. Ensure all required fields are filled.');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="admin-header">
        <h1>Projects</h1>
        {!isEditing && (
          <button className="admin-btn" onClick={handleAddNew}>
            <Plus size={16} /> Add Project
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="admin-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2>{currentProject ? 'Edit Project' : 'New Project'}</h2>
            <button className="admin-btn admin-btn-secondary" onClick={() => setIsEditing(false)}>
              <X size={16} /> Cancel
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Short Description</label>
              <textarea className="form-control" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
            </div>
            <div className="form-group">
              <label>Tech Stack (comma separated)</label>
              <input type="text" className="form-control" value={techStack} onChange={(e) => setTechStack(e.target.value)} required placeholder="e.g. React, Node.js, MongoDB" />
            </div>
            <div className="form-group">
              <label>GitHub Link</label>
              <input type="text" className="form-control" value={githubLink} onChange={(e) => setGithubLink(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Live Demo Link</label>
              <input type="text" className="form-control" value={liveDemoLink} onChange={(e) => setLiveDemoLink(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Project Image {currentProject && '(Leave empty to keep current)'}</label>
              <input 
                type="file" 
                className="form-control" 
                accept="image/*" 
                onChange={(e) => setImageFile(e.target.files[0])} 
                ref={fileInputRef} 
                required={!currentProject}
              />
            </div>
            <button type="submit" className="admin-btn">Save Project</button>
          </form>
        </div>
      ) : (
        <div className="admin-card">
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <th style={{ padding: '0.75rem', color: '#6b7280', fontWeight: '500' }}>Image</th>
                <th style={{ padding: '0.75rem', color: '#6b7280', fontWeight: '500' }}>Title</th>
                <th style={{ padding: '0.75rem', color: '#6b7280', fontWeight: '500' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project._id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '0.75rem' }}>
                    <img src={project.image && project.image.startsWith('http') ? project.image : `${BACKEND_URL}${project.image}`} alt={project.title} style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                  </td>
                  <td style={{ padding: '0.75rem', fontWeight: '500' }}>{project.title}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <button className="admin-btn admin-btn-secondary" style={{ marginRight: '0.5rem', padding: '0.25rem 0.5rem' }} onClick={() => handleEdit(project)}>
                      <Edit2 size={14} />
                    </button>
                    <button className="admin-btn admin-btn-danger" style={{ padding: '0.25rem 0.5rem' }} onClick={() => handleDelete(project._id)}>
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td colSpan="3" style={{ padding: '1rem', textAlign: 'center', color: '#6b7280' }}>No projects found. Add one!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
