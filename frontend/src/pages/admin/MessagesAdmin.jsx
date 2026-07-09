import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BACKEND_URL from '../../config';

export default function MessagesAdmin() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/messages`);
      setMessages(data);
    } catch (err) {
      console.error('Failed to fetch messages', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    try {
      await axios.delete(`${BACKEND_URL}/api/messages/${id}`);
      fetchMessages();
    } catch (err) {
      console.error('Failed to delete message', err);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="admin-header">
        <h1>Inbox</h1>
      </div>

      <div className="admin-card">
        <h2>Messages Received</h2>
        {messages.length === 0 ? (
          <p style={{ marginTop: '1rem', color: '#6b7280' }}>No messages in your inbox yet.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1.5rem' }}>
            {messages.map((msg) => (
              <div
                key={msg._id}
                style={{
                  padding: '1.5rem',
                  background: '#f9fafb',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.75rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#111827', margin: '0 0 0.25rem 0' }}>
                      {msg.name}
                    </h3>
                    <a
                      href={`mailto:${msg.email}`}
                      style={{ fontSize: '0.9rem', color: '#2563eb', textDecoration: 'none' }}
                    >
                      {msg.email}
                    </a>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
                    {new Date(msg.createdAt).toLocaleString()}
                  </span>
                </div>

                <p style={{
                  color: '#374151',
                  fontSize: '0.95rem',
                  lineHeight: '1.6',
                  whiteSpace: 'pre-wrap',
                  margin: '0 0 1rem 0',
                  borderTop: '1px solid #e5e7eb',
                  paddingTop: '0.75rem'
                }}>
                  {msg.message}
                </p>

                <button
                  onClick={() => handleDelete(msg._id)}
                  style={{
                    padding: '6px 14px',
                    background: '#ef4444',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: 500
                  }}
                >
                  Delete Message
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
