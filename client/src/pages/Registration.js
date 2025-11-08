import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Registration.css';

const Registration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    course: '',
    agree: false
  });
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState('');
  const [isExistingUser, setIsExistingUser] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Get course from URL parameters
    const urlParams = new URLSearchParams(location.search);
    const courseName = urlParams.get('course');
    if (courseName) {
      setFormData(prev => ({ ...prev, course: courseName }));
    }

    // ALL COURSES from your courses file
    const allCourses = [
      // Web Development (15 courses)
      { _id: '1', title: 'Web Development Bootcamp' },
      { _id: '2', title: 'Advanced JavaScript' },
      { _id: '3', title: 'React Masterclass 2024' },
      { _id: '4', title: 'Node.js Backend Development' },
      { _id: '5', title: 'Vue.js Framework' },
      { _id: '6', title: 'Angular Complete Guide' },
      { _id: '7', title: 'HTML5 & CSS3 Advanced' },
      { _id: '8', title: 'Bootstrap 5 Framework' },
      { _id: '9', title: 'SASS & SCSS Mastery' },
      { _id: '10', title: 'Web Performance Optimization' },

      // Data Science & AI (15 courses)
      { _id: '11', title: 'Python for Data Science' },
      { _id: '12', title: 'Machine Learning Fundamentals' },
      { _id: '13', title: 'Deep Learning with TensorFlow' },
      { _id: '14', title: 'Data Visualization with Tableau' },
      { _id: '15', title: 'Big Data Analytics' },

      // Mobile Development (10 courses)
      { _id: '16', title: 'Android App Development' },
      { _id: '17', title: 'iOS Development with Swift' },
      { _id: '18', title: 'React Native Mobile Apps' },
      { _id: '19', title: 'Flutter & Dart' },
      { _id: '20', title: 'Mobile UI/UX Design' },

      // Cloud Computing (10 courses)
      { _id: '21', title: 'AWS Cloud Practitioner' },
      { _id: '22', title: 'Microsoft Azure Fundamentals' },
      { _id: '23', title: 'Google Cloud Platform' },
      { _id: '24', title: 'Docker & Containerization' },
      { _id: '25', title: 'Kubernetes Mastery' },

      // Cybersecurity (10 courses)
      { _id: '26', title: 'Ethical Hacking' },
      { _id: '27', title: 'Network Security' },
      { _id: '28', title: 'Cryptography Fundamentals' },
      { _id: '29', title: 'Web Application Security' },
      { _id: '30', title: 'Incident Response' },

      // Additional courses to make 60 total
      { _id: '31', title: 'DevOps Engineering' },
      { _id: '32', title: 'Digital Marketing Strategy' },
      { _id: '33', title: 'UI/UX Design Principles' },
      { _id: '34', title: 'Artificial Intelligence' },
      { _id: '35', title: 'Blockchain Technology' },
      { _id: '36', title: 'Internet of Things (IoT)' },
      { _id: '37', title: 'Quantum Computing Basics' },
      { _id: '38', title: 'Game Development with Unity' },
      { _id: '39', title: 'Python Automation' },
      { _id: '40', title: 'Data Structures & Algorithms' },
      { _id: '41', title: 'System Design' },
      { _id: '42', title: 'Microservices Architecture' },
      { _id: '43', title: 'API Development' },
      { _id: '44', title: 'GraphQL Fundamentals' },
      { _id: '45', title: 'TypeScript Mastery' },
      { _id: '46', title: 'Next.js Framework' },
      { _id: '47', title: 'Nuxt.js Development' },
      { _id: '48', title: 'Svelte Framework' },
      { _id: '49', title: 'Three.js 3D Graphics' },
      { _id: '50', title: 'Computer Vision' },
      { _id: '51', title: 'Natural Language Processing' },
      { _id: '52', title: 'Reinforcement Learning' },
      { _id: '53', title: 'Time Series Analysis' },
      { _id: '54', title: 'SQL & Database Design' },
      { _id: '55', title: 'NoSQL Databases' },
      { _id: '56', title: 'Data Engineering' },
      { _id: '57', title: 'Business Intelligence' },
      { _id: '58', title: 'Agile & Scrum Methodology' },
      { _id: '59', title: 'Project Management' },
      { _id: '60', title: 'Technical Interview Prep' }
    ];
    
    setCourses(allCourses);
  }, [location]);

  // Check if user already exists when email changes
  useEffect(() => {
    const checkExistingUser = () => {
      if (formData.email) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const existingUser = users.find(user => user.email === formData.email);
        
        if (existingUser) {
          setIsExistingUser(true);
          setFormData(prev => ({ 
            ...prev, 
            name: existingUser.name,
            password: '' // Don't pre-fill password for security
          }));
        } else {
          setIsExistingUser(false);
        }
      }
    };

    const timeoutId = setTimeout(checkExistingUser, 500);
    return () => clearTimeout(timeoutId);
  }, [formData.email]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.agree) {
      setMessage('Please agree to the terms and conditions');
      return;
    }

    if (!formData.course) {
      setMessage('Please select a course');
      return;
    }

    try {
      let userData;
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const existingUser = users.find(user => user.email === formData.email);

      if (existingUser) {
        // Existing user - just add the new course
        const isAlreadyEnrolled = existingUser.enrolledCourses?.some(
          course => course.courseName === formData.course
        );

        if (isAlreadyEnrolled) {
          setMessage(`You are already enrolled in "${formData.course}"`);
          return;
        }

        // Add new course to existing user
        const newCourse = {
          courseName: formData.course,
          enrolledAt: new Date().toISOString(),
          id: Date.now().toString() // Add unique ID for the enrollment
        };

        existingUser.enrolledCourses.push(newCourse);

        // Update users array
        const updatedUsers = users.map(user => 
          user.email === formData.email ? existingUser : user
        );
        localStorage.setItem('users', JSON.stringify(updatedUsers));

        userData = {
          id: existingUser.id,
          name: existingUser.name,
          email: existingUser.email,
          enrolledCourses: existingUser.enrolledCourses,
          registeredAt: existingUser.registeredAt
        };

        setMessage(`✅ Successfully enrolled in "${formData.course}"! Redirecting to dashboard...`);
      } else {
        // New user - create account and enroll in course
        if (!formData.name || !formData.password) {
          setMessage('Please fill in all required fields for new registration');
          return;
        }

        if (formData.password.length < 6) {
          setMessage('Password must be at least 6 characters long');
          return;
        }

        const newUser = {
          id: Date.now().toString(),
          name: formData.name,
          email: formData.email,
          password: formData.password,
          registeredAt: new Date().toISOString(),
          enrolledCourses: [{
            courseName: formData.course,
            enrolledAt: new Date().toISOString(),
            id: Date.now().toString()
          }]
        };

        // Add new user to users array
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        userData = {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          enrolledCourses: newUser.enrolledCourses,
          registeredAt: newUser.registeredAt
        };

        setMessage(`🎉 Registration successful! You are now enrolled in "${formData.course}". Redirecting to dashboard...`);
      }

      // Save current user to localStorage (without password)
      localStorage.setItem('currentUser', JSON.stringify(userData));

      // Reset form
      setFormData({
        name: '',
        email: '',
        password: '',
        course: '',
        agree: false
      });

      // Redirect to user dashboard after 2 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);

    } catch (error) {
      setMessage('❌ Registration failed. Please try again.');
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="registration-page">
      <div className="container">
        <h2>Course Registration</h2>
        
        {isExistingUser && (
          <div className="existing-user-notice">
            <span>👋 Welcome back! We found your existing account.</span>
            <p>Just select a new course to enroll.</p>
          </div>
        )}

        {message && (
          <div className={`message ${message.includes('✅') || message.includes('🎉') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email address"
          />

          {!isExistingUser && (
            <>
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
              />

              <label htmlFor="password">Password *</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="6"
                placeholder="Create a password (min. 6 characters)"
              />
            </>
          )}

          <label htmlFor="course">Select Course *</label>
          <select
            id="course"
            name="course"
            value={formData.course}
            onChange={handleChange}
            required
          >
            <option value="">-- Choose a course --</option>
            
            {/* Web Development */}
            <optgroup label="Web Development">
              {courses.filter(course => course._id <= '10').map(course => (
                <option key={course._id} value={course.title}>
                  {course.title}
                </option>
              ))}
            </optgroup>
            
            {/* Data Science & AI */}
            <optgroup label="Data Science & AI">
              {courses.filter(course => course._id > '10' && course._id <= '15').map(course => (
                <option key={course._id} value={course.title}>
                  {course.title}
                </option>
              ))}
            </optgroup>
            
            {/* Mobile Development */}
            <optgroup label="Mobile Development">
              {courses.filter(course => course._id > '15' && course._id <= '20').map(course => (
                <option key={course._id} value={course.title}>
                  {course.title}
                </option>
              ))}
            </optgroup>
            
            {/* Cloud Computing */}
            <optgroup label="Cloud Computing">
              {courses.filter(course => course._id > '20' && course._id <= '25').map(course => (
                <option key={course._id} value={course.title}>
                  {course.title}
                </option>
              ))}
            </optgroup>
            
            {/* Cybersecurity */}
            <optgroup label="Cybersecurity">
              {courses.filter(course => course._id > '25' && course._id <= '30').map(course => (
                <option key={course._id} value={course.title}>
                  {course.title}
                </option>
              ))}
            </optgroup>
            
            {/* Other Courses */}
            <optgroup label="Other Courses">
              {courses.filter(course => course._id > '30').map(course => (
                <option key={course._id} value={course.title}>
                  {course.title}
                </option>
              ))}
            </optgroup>
          </select>

          <label className="checkbox-label">
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
              required
            />
            I agree to the terms & conditions and privacy policy
          </label>

          <button type="submit" className="submit-btn">
            {isExistingUser ? 'Enroll in Course' : 'Register & Enroll'}
          </button>
        </form>

        <div className="back-home">
          <p><a href="/">← Back to Home</a></p>
          <p><a href="/courses">Browse All Courses</a></p>
        </div>
      </div>
    </div>
  );
};

export default Registration;