import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './UserDashboard.css';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user data from localStorage or session
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="loading">Loading your dashboard...</div>;
  }

  if (!user) {
    return (
      <div className="no-user">
        <h2>Welcome to Online Course Hub</h2>
        <p>Please register for a course to see your dashboard.</p>
        <Link to="/courses" className="btn">Browse Courses</Link>
      </div>
    );
  }

  return (
    <div className="user-dashboard">
      <div className="dashboard-header">
        <h1>Welcome, {user.name}! 👋</h1>
        <p>Here's your learning dashboard</p>
      </div>

      <div className="dashboard-content">
        <div className="user-info-card">
          <h2>Your Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <label>Full Name:</label>
              <span>{user.name}</span>
            </div>
            <div className="info-item">
              <label>Email:</label>
              <span>{user.email}</span>
            </div>
            <div className="info-item">
              <label>User ID:</label>
              <span>{user.id}</span>
            </div>
            <div className="info-item">
              <label>Registration Date:</label>
              <span>{new Date(user.registeredAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div className="courses-card">
          <h2>Your Enrolled Courses</h2>
          {user.enrolledCourses && user.enrolledCourses.length > 0 ? (
            <div className="enrolled-courses">
              {user.enrolledCourses.map((course, index) => (
                <div key={index} className="course-item">
                  <div className="course-icon">📚</div>
                  <div className="course-details">
                    <h3>{course.courseName}</h3>
                    <p>Enrolled on: {new Date(course.enrolledAt).toLocaleDateString()}</p>
                    <span className="status-badge">Active</span>
                  </div>
                  <div className="course-actions">
                    <Link 
                      to={`/learn/${course.id || course.courseName.toLowerCase().replace(/\s+/g, '-')}`} 
                      className="start-learning-btn"
                    >
                      Start Learning
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-courses">
              <p>You haven't enrolled in any courses yet.</p>
              <Link to="/courses" className="btn">Explore Courses</Link>
            </div>
          )}
        </div>

        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <Link to="/courses" className="action-btn">
              <span className="action-icon">🔍</span>
              <span>Browse More Courses</span>
            </Link>
            <Link to="/contact" className="action-btn">
              <span className="action-icon">💬</span>
              <span>Get Support</span>
            </Link>
            <button className="action-btn" onClick={() => {
              localStorage.removeItem('currentUser');
              setUser(null);
              alert('You have been logged out');
            }}>
              <span className="action-icon">🚪</span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;