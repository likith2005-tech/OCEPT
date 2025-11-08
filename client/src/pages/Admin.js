import React, { useState, useEffect } from 'react';
import './Admin.css';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [activeTab, setActiveTab] = useState('users');

  useEffect(() => {
    // Load data from localStorage
    const savedUsers = JSON.parse(localStorage.getItem('courseHubUsers') || '[]');
    const savedContacts = JSON.parse(localStorage.getItem('courseHubContacts') || '[]');
    
    setUsers(savedUsers);
    setContacts(savedContacts);
  }, []);

  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear all data?')) {
      localStorage.removeItem('courseHubUsers');
      localStorage.removeItem('courseHubContacts');
      setUsers([]);
      setContacts([]);
      alert('All data cleared!');
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-container">
        <h1>Admin Dashboard</h1>
        <p className="admin-subtitle">View all registrations and contact messages</p>

        <div className="admin-stats">
          <div className="stat-card">
            <h3>{users.length}</h3>
            <p>Total Registrations</p>
          </div>
          <div className="stat-card">
            <h3>{contacts.length}</h3>
            <p>Contact Messages</p>
          </div>
          <div className="stat-card">
            <h3>{new Set(users.map(u => u.course)).size}</h3>
            <p>Courses with Enrollments</p>
          </div>
        </div>

        <div className="admin-tabs">
          <button 
            className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            Registrations ({users.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'contacts' ? 'active' : ''}`}
            onClick={() => setActiveTab('contacts')}
          >
            Messages ({contacts.length})
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'users' && (
            <div className="users-table">
              <h3>Course Registrations</h3>
              {users.length === 0 ? (
                <p className="no-data">No registrations yet.</p>
              ) : (
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Course</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(user => (
                        <tr key={user.id}>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.course}</td>
                          <td>{new Date(user.registeredAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'contacts' && (
            <div className="contacts-table">
              <h3>Contact Messages</h3>
              {contacts.length === 0 ? (
                <p className="no-data">No messages yet.</p>
              ) : (
                <div className="messages-list">
                  {contacts.map(contact => (
                    <div key={contact.id} className="message-card">
                      <div className="message-header">
                        <strong>{contact.name}</strong>
                        <span className="message-date">
                          {new Date(contact.submittedAt).toLocaleString()}
                        </span>
                      </div>
                      <div className="message-subject">{contact.subject}</div>
                      <div className="message-body">{contact.message}</div>
                      <div className="message-email">📧 {contact.email}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="admin-actions">
          <button onClick={clearAllData} className="clear-btn">
            Clear All Data
          </button>
        </div>

        <div className="back-home">
          <p><a href="/">← Back to Home</a></p>
        </div>
      </div>
    </div>
  );
};

export default Admin;