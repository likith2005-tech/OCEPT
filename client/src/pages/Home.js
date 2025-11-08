import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h2>Explore. Learn. Grow.</h2>
          <p>Join 10,000+ learners and gain skills for your future career.</p>
          <Link to="/courses" className="btn">Browse Courses</Link>
        </div>
        <img src="https://knowledgeone.ca/wp-content/uploads/2023/02/Shutterstock_2162389145.png" alt="Learning" className="hero-img" />
      </section>

      {/* Features Section */}
      <section id="about" className="about">
        <h2>Why Choose Us?</h2>
        <div className="features">
          <div className="feature">
            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png" alt="Expert" />
            <h3>Expert Mentors</h3>
            <p>Industry professionals with hands-on experience.</p>
          </div>
          <div className="feature">
            <img src="https://cdn-icons-png.flaticon.com/512/1055/1055687.png" alt="Flexible" />
            <h3>Anytime Learning</h3>
            <p>Access from anywhere on any device.</p>
          </div>
          <div className="feature">
            <img src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png" alt="Certificate" />
            <h3>Career Boost</h3>
            <p>Get certified and showcase your skills.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>Student Testimonials</h2>
        <div className="testimonial-grid">
          <div className="testimonial">
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Student" />
            <p>"Great platform! Courses are clear and practical. Helped me land a job!"</p>
            <strong>- Priya, Developer</strong>
          </div>
          <div className="testimonial">
            <img src="https://randomuser.me/api/portraits/men/46.jpg" alt="Student" />
            <p>"Flexible schedule and amazing content. I recommend it to everyone."</p>
            <strong>- Rahul, Analyst</strong>
          </div>
        </div>
      </section>

      <footer id="contact">
        <p>&copy; 2025 Online Course Hub. All rights reserved.</p>
        <p>Email: support@onlinecoursehub.com | 📞 +91-9876543210</p>
      </footer>
    </div>
  );
};

export default Home;