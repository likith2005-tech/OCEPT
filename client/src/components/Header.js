import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = () => {
      const userData = localStorage.getItem('currentUser');
      if (userData) setUser(JSON.parse(userData));
      else setUser(null);
    };

    // Initial load
    loadUser();

    // Listen for auth changes triggered by login/logout in the app
    const handler = () => loadUser();
    window.addEventListener('authChanged', handler);
    // Also listen to storage events (in case user logs in from another tab)
    window.addEventListener('storage', handler);

    return () => {
      window.removeEventListener('authChanged', handler);
      window.removeEventListener('storage', handler);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    navigate('/');
    alert('You have been logged out');
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-icon">🎓</span>
          <span className="logo-text">CourseHub</span>
        </Link>

        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/courses" className="nav-link">Courses</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          
          {user ? (
            <div className="user-menu">
              <span className="user-greeting">Hi, {user.name || user.email}</span>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="login-btn">Login</Link>
              <Link to="/signup" className="register-btn">Sign Up</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;