import React, { useState } from 'react';
import axios from 'axios';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Send data to backend API
      const response = await axios.post('http://localhost:5000/api/contact', formData);
      
      setMessage('✅ Thank you! Your message has been sent. We will get back to you within 24 hours.');
      setFormData({ name: '', email: '', message: '' });
      
    } catch (error) {
      setMessage('❌ Error sending message. Please try again.');
    }
  };

  return (
    <div className="contact-page">
      <div className="container">
        <h2>Contact Us</h2>
        <p className="contact-subtitle">Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        
        {message && <div className="message">{message}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email address"
              />
            </div>
          </div>

          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            name="message"
            rows="6"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Please describe your inquiry in detail..."
          ></textarea>

          <button type="submit" className="submit-btn">Send Message</button>
        </form>

        <div className="contact-info">
          <h3>Other Ways to Reach Us</h3>
          <div className="contact-methods">
            <div className="contact-method">
              <span className="contact-icon">📧</span>
              <div>
                <strong>Email</strong>
                <p>support@onlinecoursehub.com</p>
              </div>
            </div>
            <div className="contact-method">
              <span className="contact-icon">📞</span>
              <div>
                <strong>Phone</strong>
                <p>+91-9876543210</p>
              </div>
            </div>
            <div className="contact-method">
              <span className="contact-icon">🕒</span>
              <div>
                <strong>Response Time</strong>
                <p>Within 24 hours</p>
              </div>
            </div>
          </div>
        </div>

        <div className="back-home">
          <p><a href="/">← Back to Home</a></p>
        </div>
      </div>
    </div>
  );
};

export default Contact;