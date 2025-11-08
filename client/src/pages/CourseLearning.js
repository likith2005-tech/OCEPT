import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CourseLearning.css';

const CourseLearning = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      const user = JSON.parse(userData);
      const enrolledCourse = user.enrolledCourses?.find(
        course => course.id === courseId || course.courseName?.toLowerCase().replace(/\s+/g, '-') === courseId
      );
      
      if (enrolledCourse) {
        setCourse(enrolledCourse);
      } else {
        navigate('/dashboard');
      }
    }
    setLoading(false);
  }, [courseId, navigate]);

  // Comprehensive course content for all 60+ courses
  const courseContent = {
    // Web Development Courses
    'web-development-bootcamp': [
      {
        type: 'video',
        title: 'Complete Web Development Roadmap 2024',
        content: 'https://www.youtube.com/embed/ysEN5RaKOlA',
        duration: '18:25'
      },
      {
        type: 'text',
        title: 'Full-Stack Development Fundamentals',
        content: `## Web Development Bootcamp - Complete Guide

### What You'll Learn:
- Frontend: HTML5, CSS3, JavaScript, React
- Backend: Node.js, Express, MongoDB
- Tools: Git, GitHub, Deployment

### Project-Based Learning:
1. Portfolio Website
2. E-commerce Application
3. Social Media App
4. Real-time Chat Application

### Career Path:
- Frontend Developer
- Backend Developer  
- Full Stack Developer
- Web Application Developer`
      }
    ],

    'advanced-javascript': [
      {
        type: 'video',
        title: 'Advanced JavaScript Concepts',
        content: 'https://www.youtube.com/embed/NCwa_xi0Uuc',
        duration: '32:15'
      },
      {
        type: 'text',
        title: 'Mastering Modern JavaScript',
        content: `## Advanced JavaScript Topics Covered:

### Functional Programming
- Pure Functions
- Higher-Order Functions
- Function Composition
- Immutability

### Asynchronous JavaScript
- Promises Deep Dive
- Async/Await Patterns
- Error Handling Strategies
- Concurrent Operations`
      }
    ],

    'react-masterclass-2024': [
      {
        type: 'video',
        title: 'React 18 New Features & Best Practices',
        content: 'https://www.youtube.com/embed/w7ejDZ8SWv8',
        duration: '28:45'
      },
      {
        type: 'text',
        title: 'Advanced React Patterns 2024',
        content: `## React Masterclass Curriculum

### Advanced Hooks
- useReducer for Complex State
- Custom Hooks Development
- useMemo & useCallback Optimization

### State Management
- Context API Advanced Usage
- Redux Toolkit Modern Approach
- React Query for Server State`
      }
    ],

    'node-js-backend-development': [
      {
        type: 'video',
        title: 'Node.js Architecture & Event Loop',
        content: 'https://www.youtube.com/embed/TlB_eWDSMt4',
        duration: '35:20'
      },
      {
        type: 'text',
        title: 'Building Scalable Backend Systems',
        content: `## Node.js Backend Development

### Core Concepts:
- Event-Driven Architecture
- Non-Blocking I/O Operations
- Module System & NPM

### Database Integration:
- MongoDB with Mongoose
- PostgreSQL with Sequelize
- Redis for Caching`
      }
    ],

    'vue-js-framework': [
      {
        type: 'video',
        title: 'Vue 3 Composition API Introduction',
        content: 'https://www.youtube.com/embed/2KBHvaAWJOM',
        duration: '25:30'
      },
      {
        type: 'text',
        title: 'Vue.js Progressive Framework',
        content: `## Vue.js Framework Mastery

### Vue 3 Features:
- Composition API vs Options API
- Reactivity System
- Teleport & Suspense

### Ecosystem Integration:
- Vue Router for SPA
- Vuex/Pinia State Management
- Vite Build Tool`
      }
    ],

    'angular-complete-guide': [
      {
        type: 'video',
        title: 'Angular Framework Architecture',
        content: 'https://www.youtube.com/embed/Ata9cSC2WpM',
        duration: '38:45'
      },
      {
        type: 'text',
        title: 'Enterprise Angular Development',
        content: `## Angular Complete Guide

### Core Concepts:
- Components & Modules
- Services & Dependency Injection
- Directives & Pipes

### Advanced Topics:
- RxJS & Observables
- NgRx State Management
- Angular Universal (SSR)`
      }
    ],

    'html5-css3-advanced': [
      {
        type: 'video',
        title: 'Modern HTML5 & CSS3 Techniques',
        content: 'https://www.youtube.com/embed/qz0aGYrrlhU',
        duration: '28:30'
      },
      {
        type: 'text',
        title: 'Advanced CSS Layouts & Animations',
        content: `## HTML5 & CSS3 Advanced

### Modern Layout Systems:
- CSS Grid for Complex Layouts
- Flexbox for Component Alignment
- CSS Subgrid Advanced Features

### Advanced Animations:
- CSS Transitions & Keyframes
- 3D Transformations
- Animation Performance Optimization

### Responsive Design:
- Mobile-First Approach
- CSS Custom Properties
- Container Queries`
      }
    ],

    'bootstrap-5-framework': [
      {
        type: 'video',
        title: 'Bootstrap 5 Complete Guide',
        content: 'https://www.youtube.com/embed/-qfEOE4vtxE',
        duration: '22:15'
      },
      {
        type: 'text',
        title: 'Rapid Web Development with Bootstrap',
        content: `## Bootstrap 5 Framework

### Core Features:
- New Utility API
- Improved Grid System
- Custom CSS Variables
- Enhanced Forms

### Components Deep Dive:
- Navigation Components
- Card Layouts
- Modal Systems
- Custom Components

### Best Practices:
- Theming & Customization
- Performance Optimization
- Accessibility Features`
      }
    ],

    'sass-scss-mastery': [
      {
        type: 'video',
        title: 'SASS & SCSS Fundamentals',
        content: 'https://www.youtube.com/embed/Zz6eOVaaelI',
        duration: '20:45'
      },
      {
        type: 'text',
        title: 'Advanced CSS Preprocessing',
        content: `## SASS & SCSS Mastery

### Core Concepts:
- Variables & Data Types
- Nesting & Parent Selector
- Mixins & Functions

### Advanced Features:
- Control Directives
- Each & For Loops
- Map Data Structures
- Color Manipulation

### Architecture:
- 7-1 Pattern
- Component-Based Structure
- Maintainable Code Organization`
      }
    ],

    'web-performance-optimization': [
      {
        type: 'video',
        title: 'Web Performance Fundamentals',
        content: 'https://www.youtube.com/embed/XO77XtSItAQ',
        duration: '25:20'
      },
      {
        type: 'text',
        title: 'Optimizing Website Speed',
        content: `## Web Performance Optimization

### Core Web Vitals:
- Largest Contentful Paint (LCP)
- First Input Delay (FID)
- Cumulative Layout Shift (CLS)

### Optimization Techniques:
- Image Optimization
- Code Splitting
- Caching Strategies
- CDN Implementation

### Performance Monitoring:
- Lighthouse Audits
- Real User Monitoring
- Performance Budgets`
      }
    ],

    // Data Science Courses
    'python-for-data-science': [
      {
        type: 'video',
        title: 'Python Data Science Ecosystem',
        content: 'https://www.youtube.com/embed/LHBE6Q9XlzI',
        duration: '42:10'
      },
      {
        type: 'text',
        title: 'Data Analysis with Python',
        content: `## Python for Data Science

### Core Libraries:
- NumPy: Numerical Computing
- Pandas: Data Manipulation
- Matplotlib: Data Visualization
- Scikit-learn: Machine Learning

### Data Analysis Workflow:
1. Data Collection & Cleaning
2. Exploratory Data Analysis (EDA)
3. Data Visualization
4. Statistical Analysis`
      }
    ],

    'machine-learning-fundamentals': [
      {
        type: 'video',
        title: 'Machine Learning Mathematics Foundation',
        content: 'https://www.youtube.com/embed/KaylvsSHmtQ',
        duration: '38:45'
      },
      {
        type: 'text',
        title: 'ML Algorithms & Mathematics',
        content: `## Machine Learning Fundamentals

### Mathematical Foundation:
- Linear Algebra for ML
- Calculus & Optimization
- Probability & Statistics

### Core Algorithms:
- Linear & Logistic Regression
- Decision Trees & Random Forests
- Support Vector Machines (SVM)
- K-Means Clustering`
      }
    ],

    'deep-learning-with-tensorflow': [
      {
        type: 'video',
        title: 'Neural Networks & Deep Learning',
        content: 'https://www.youtube.com/embed/tPYj3fFJGjk',
        duration: '45:20'
      },
      {
        type: 'text',
        title: 'TensorFlow & Neural Networks',
        content: `## Deep Learning with TensorFlow

### Neural Network Architecture:
- Perceptrons & Multi-layer Networks
- Activation Functions
- Backpropagation Algorithm

### Advanced Architectures:
- Convolutional Neural Networks (CNN)
- Recurrent Neural Networks (RNN)
- Long Short-Term Memory (LSTM)`
      }
    ],

    'data-visualization-with-tableau': [
      {
        type: 'video',
        title: 'Tableau for Data Visualization',
        content: 'https://www.youtube.com/embed/6mBtTNggkUk',
        duration: '32:10'
      },
      {
        type: 'text',
        title: 'Creating Interactive Dashboards',
        content: `## Data Visualization with Tableau

### Core Concepts:
- Data Connection & Preparation
- Basic Chart Types
- Interactive Filters
- Dashboard Design

### Advanced Features:
- Calculated Fields
- Parameters & Sets
- Level of Detail Expressions
- Story Points

### Best Practices:
- Color Theory
- Dashboard Layout
- User Experience Design`
      }
    ],

    'big-data-analytics': [
      {
        type: 'video',
        title: 'Big Data Fundamentals',
        content: 'https://www.youtube.com/embed/5erYHy0bQwk',
        duration: '35:15'
      },
      {
        type: 'text',
        title: 'Processing Large Datasets',
        content: `## Big Data Analytics

### Big Data Technologies:
- Hadoop Ecosystem
- Spark Processing Engine
- NoSQL Databases
- Distributed Computing

### Data Processing:
- MapReduce Patterns
- Spark RDDs & DataFrames
- Stream Processing
- Batch Processing

### Use Cases:
- Real-time Analytics
- Recommendation Systems
- Fraud Detection
- IoT Data Processing`
      }
    ],

    // Mobile Development
    'android-app-development': [
      {
        type: 'video',
        title: 'Android Studio & Kotlin Setup',
        content: 'https://www.youtube.com/embed/fis26HvvDII',
        duration: '25:30'
      },
      {
        type: 'text',
        title: 'Modern Android Development',
        content: `## Android App Development

### Kotlin Programming:
- Kotlin Syntax & Features
- Object-Oriented Programming
- Functional Programming in Kotlin

### Android Architecture:
- Activity & Fragment Lifecycle
- ViewModel & LiveData
- Room Database`
      }
    ],

    'ios-development-with-swift': [
      {
        type: 'video',
        title: 'Swift Programming Language',
        content: 'https://www.youtube.com/embed/comQ1-x2a1Q',
        duration: '32:15'
      },
      {
        type: 'text',
        title: 'iOS App Development with SwiftUI',
        content: `## iOS Development with Swift

### Swift Programming:
- Swift Syntax & Type System
- Optionals & Error Handling
- Protocol-Oriented Programming

### iOS Frameworks:
- SwiftUI Declarative UI
- UIKit Integration
- Core Data for Persistence`
      }
    ],

    'react-native-mobile-apps': [
      {
        type: 'video',
        title: 'React Native Cross-Platform Development',
        content: 'https://www.youtube.com/embed/0-S5a0eXPoc',
        duration: '22:15'
      },
      {
        type: 'text',
        title: 'Building Native Mobile Apps with JavaScript',
        content: `## React Native Mobile Development

### Cross-Platform Development:
- iOS & Android Compatibility
- Native Module Integration
- Platform-Specific Code

### Navigation & State:
- React Navigation
- Redux for State Management
- Context API Usage`
      }
    ],

    'flutter-dart': [
      {
        type: 'video',
        title: 'Flutter & Dart Introduction',
        content: 'https://www.youtube.com/embed/1gDhl4leEzA',
        duration: '28:40'
      },
      {
        type: 'text',
        title: 'Cross-Platform Development with Flutter',
        content: `## Flutter & Dart

### Dart Programming:
- Dart Syntax & Features
- Asynchronous Programming
- Object-Oriented Concepts

### Flutter Framework:
- Widget Tree Architecture
- State Management
- Material & Cupertino Widgets

### Platform Features:
- Native API Integration
- Package Ecosystem
- Hot Reload Development`
      }
    ],

    'mobile-ui-ux-design': [
      {
        type: 'video',
        title: 'Mobile Design Principles',
        content: 'https://www.youtube.com/embed/c9Wg6Cb_YlU',
        duration: '24:20'
      },
      {
        type: 'text',
        title: 'Designing for Mobile Interfaces',
        content: `## Mobile UI/UX Design

### Design Principles:
- Mobile-First Approach
- Touch Interface Design
- Gesture-Based Interactions

### UI Components:
- Navigation Patterns
- Form Design
- Feedback & Animation
- Accessibility Considerations

### Design Tools:
- Figma for Mobile Design
- Prototyping Techniques
- Design System Creation`
      }
    ],

    // Cloud Computing
    'aws-cloud-practitioner': [
      {
        type: 'video',
        title: 'AWS Cloud Concepts & Services',
        content: 'https://www.youtube.com/embed/3hLmDS179YE',
        duration: '29:40'
      },
      {
        type: 'text',
        title: 'AWS Fundamentals & Architecture',
        content: `## AWS Cloud Practitioner

### Cloud Concepts:
- Cloud Economics & Billing
- Global Infrastructure
- Security & Compliance

### Core Services:
- EC2: Elastic Compute Cloud
- S3: Simple Storage Service
- RDS: Relational Database Service`
      }
    ],

    'microsoft-azure-fundamentals': [
      {
        type: 'video',
        title: 'Azure Cloud Platform Overview',
        content: 'https://www.youtube.com/embed/NPEsD6n9A_I',
        duration: '26:35'
      },
      {
        type: 'text',
        title: 'Microsoft Azure Services',
        content: `## Microsoft Azure Fundamentals

### Core Services:
- Virtual Machines
- Azure Storage
- App Services
- SQL Database

### Management Tools:
- Azure Portal
- PowerShell & CLI
- Resource Manager
- Monitoring & Security`
      }
    ],

    'google-cloud-platform': [
      {
        type: 'video',
        title: 'Google Cloud Services Introduction',
        content: 'https://www.youtube.com/embed/2D-nm-8azWM',
        duration: '31:20'
      },
      {
        type: 'text',
        title: 'GCP Infrastructure & Services',
        content: `## Google Cloud Platform

### Compute Services:
- Compute Engine
- Kubernetes Engine
- App Engine
- Cloud Functions

### Data Services:
- BigQuery Analytics
- Cloud Storage
- Cloud SQL
- Firestore Database`
      }
    ],

    'docker-containerization': [
      {
        type: 'video',
        title: 'Docker Containers & Images',
        content: 'https://www.youtube.com/embed/pTFZF_f4TFo',
        duration: '26:50'
      },
      {
        type: 'text',
        title: 'Containerization with Docker',
        content: `## Docker & Containerization

### Container Fundamentals:
- Container vs Virtual Machine
- Docker Architecture
- Image Management

### Docker Compose:
- Multi-Container Applications
- Service Definition
- Network Configuration`
      }
    ],

    'kubernetes-mastery': [
      {
        type: 'video',
        title: 'Kubernetes Architecture',
        content: 'https://www.youtube.com/embed/X48VuDVv0do',
        duration: '34:15'
      },
      {
        type: 'text',
        title: 'Container Orchestration at Scale',
        content: `## Kubernetes Mastery

### Core Concepts:
- Pods & Services
- Deployments & ReplicaSets
- ConfigMaps & Secrets

### Advanced Features:
- Auto-scaling
- Service Mesh
- Storage Management
- Security Policies`
      }
    ],

    // Cybersecurity
    'ethical-hacking': [
      {
        type: 'video',
        title: 'Ethical Hacking Methodology',
        content: 'https://www.youtube.com/embed/2VSNn7UIXn8',
        duration: '33:25'
      },
      {
        type: 'text',
        title: 'Penetration Testing & Security Assessment',
        content: `## Ethical Hacking & Security

### Reconnaissance Phase:
- Passive Information Gathering
- Active Scanning Techniques
- Network Enumeration

### Exploitation:
- Metasploit Framework
- Social Engineering Attacks
- Web Application Testing`
      }
    ],

    'network-security': [
      {
        type: 'video',
        title: 'Network Security Fundamentals',
        content: 'https://www.youtube.com/embed/bPVaOlJ6ln0',
        duration: '28:35'
      },
      {
        type: 'text',
        title: 'Securing Network Infrastructure',
        content: `## Network Security

### Network Protocols Security:
- TCP/IP Security
- DNS Security (DNSSEC)
- HTTP/HTTPS Security

### Defense Mechanisms:
- Firewalls & ACLs
- Intrusion Detection Systems (IDS)
- Intrusion Prevention Systems (IPS)`
      }
    ],

    'cryptography-fundamentals': [
      {
        type: 'video',
        title: 'Cryptography Basics',
        content: 'https://www.youtube.com/embed/jvD9bylFypI',
        duration: '30:10'
      },
      {
        type: 'text',
        title: 'Encryption & Security Protocols',
        content: `## Cryptography Fundamentals

### Encryption Algorithms:
- Symmetric Cryptography
- Asymmetric Cryptography
- Hash Functions
- Digital Signatures

### Security Protocols:
- SSL/TLS Implementation
- PKI Infrastructure
- Cryptographic Standards`
      }
    ],

    'web-application-security': [
      {
        type: 'video',
        title: 'Web Application Security Threats',
        content: 'https://www.youtube.com/embed/WcM0Gwc4cWQ',
        duration: '27:45'
      },
      {
        type: 'text',
        title: 'Securing Web Applications',
        content: `## Web Application Security

### Common Vulnerabilities:
- Cross-Site Scripting (XSS)
- SQL Injection Attacks
- Cross-Site Request Forgery (CSRF)

### Security Measures:
- Input Validation
- Authentication Systems
- Authorization Controls
- Security Headers`
      }
    ],

    'incident-response': [
      {
        type: 'video',
        title: 'Security Incident Management',
        content: 'https://www.youtube.com/embed/DgwWxY-HsMc',
        duration: '29:20'
      },
      {
        type: 'text',
        title: 'Responding to Security Incidents',
        content: `## Incident Response

### Response Framework:
- Preparation Phase
- Detection & Analysis
- Containment & Eradication
- Recovery & Lessons Learned

### Tools & Techniques:
- Forensic Analysis
- Log Investigation
- Malware Analysis
- Incident Documentation`
      }
    ],

    // Additional Courses (30+ courses)
    'devops-engineering': [
      {
        type: 'video',
        title: 'DevOps Culture & Practices',
        content: 'https://www.youtube.com/embed/_I94-tJlovg',
        duration: '32:25'
      },
      {
        type: 'text',
        title: 'Continuous Integration & Delivery',
        content: `## DevOps Engineering

### CI/CD Pipeline:
- Jenkins Automation
- GitLab CI/CD
- GitHub Actions
- Automated Testing

### Infrastructure as Code:
- Terraform Configuration
- Ansible Automation
- CloudFormation
- Configuration Management`
      }
    ],

    'digital-marketing-strategy': [
      {
        type: 'video',
        title: 'Digital Marketing Fundamentals',
        content: 'https://www.youtube.com/embed/bu1d6_7QRhQ',
        duration: '26:40'
      },
      {
        type: 'text',
        title: 'Comprehensive Marketing Strategy',
        content: `## Digital Marketing Strategy

### Marketing Channels:
- Search Engine Optimization (SEO)
- Social Media Marketing
- Email Marketing
- Content Marketing

### Analytics & Optimization:
- Google Analytics
- Conversion Rate Optimization
- A/B Testing
- ROI Measurement`
      }
    ],

    'ui-ux-design-principles': [
      {
        type: 'video',
        title: 'UI/UX Design Fundamentals',
        content: 'https://www.youtube.com/embed/c9Wg6Cb_YlU',
        duration: '28:15'
      },
      {
        type: 'text',
        title: 'User-Centered Design Approach',
        content: `## UI/UX Design Principles

### Design Process:
- User Research
- Wireframing & Prototyping
- Usability Testing
- Design Systems

### UX Principles:
- Information Architecture
- Interaction Design
- Visual Design
- Accessibility Standards`
      }
    ],

    // Add more courses following the same pattern...
    'artificial-intelligence': [
      {
        type: 'video',
        title: 'AI Fundamentals & Applications',
        content: 'https://www.youtube.com/embed/JMUxmLyrhSk',
        duration: '36:20'
      },
      {
        type: 'text',
        title: 'Artificial Intelligence Concepts',
        content: `## Artificial Intelligence

### AI Concepts:
- Machine Learning vs AI
- Neural Networks
- Natural Language Processing
- Computer Vision

### Applications:
- Chatbots & Virtual Assistants
- Recommendation Systems
- Autonomous Systems
- Predictive Analytics`
      }
    ],

    'blockchain-technology': [
      {
        type: 'video',
        title: 'Blockchain Fundamentals',
        content: 'https://www.youtube.com/embed/SSo_EIwHSd4',
        duration: '29:45'
      },
      {
        type: 'text',
        title: 'Decentralized Systems & Cryptocurrencies',
        content: `## Blockchain Technology

### Core Concepts:
- Distributed Ledger Technology
- Consensus Mechanisms
- Smart Contracts
- Cryptocurrencies

### Applications:
- Financial Services
- Supply Chain Management
- Digital Identity
- Decentralized Applications`
      }
    ]

    // Continue adding all 60+ courses following the same pattern...
  };

  const getCourseContent = () => {
    if (!course) return [];
    const courseKey = course.courseName?.toLowerCase().replace(/\s+/g, '-') || courseId;
    return courseContent[courseKey] || getDefaultContent();
  };

  const getDefaultContent = () => [
    {
      type: 'text',
      title: 'Welcome to Your Course',
      content: `## Course Content Loading

This course is currently being prepared with specialized content. Please check back soon for comprehensive learning materials tailored specifically for "${course?.courseName}".

### What to Expect:
- Expert-curated video lessons
- Hands-on coding exercises
- Real-world projects
- Community support
- Career guidance

Stay tuned for amazing learning content!`
    }
  ];

  const currentContent = getCourseContent();

  const handleNextLesson = () => {
    if (currentLesson < currentContent.length - 1) {
      setCurrentLesson(currentLesson + 1);
    }
  };

  const handlePreviousLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
    }
  };

  if (loading) {
    return <div className="loading">Loading course content...</div>;
  }

  if (!course) {
    return (
      <div className="course-not-found">
        <h2>Course not found</h2>
        <p>You are not enrolled in this course or it doesn't exist.</p>
        <button onClick={() => navigate('/dashboard')} className="btn">
          Back to Dashboard
        </button>
      </div>
    );
  }

  const renderLessonContent = () => {
    const lesson = currentContent[currentLesson];
    if (!lesson) return <div>No lesson content available</div>;
    
    switch (lesson.type) {
      case 'video':
        return (
          <div className="video-lesson">
            <h3>{lesson.title}</h3>
            <div className="video-container">
              <iframe
                width="100%"
                height="500"
                src={lesson.content}
                title={lesson.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="video-info">
              <span className="duration">Duration: {lesson.duration}</span>
              <span className="lesson-number">Lesson {currentLesson + 1} of {currentContent.length}</span>
            </div>
          </div>
        );
      
      case 'text':
        return (
          <div className="text-lesson">
            <h3>{lesson.title}</h3>
            <div className="text-content">
              {lesson.content.split('\n').map((paragraph, index) => {
                if (paragraph.startsWith('## ')) {
                  return <h4 key={index}>{paragraph.replace('## ', '')}</h4>;
                } else if (paragraph.startsWith('### ')) {
                  return <h5 key={index}>{paragraph.replace('### ', '')}</h5>;
                } else if (paragraph.startsWith('1. ') || paragraph.startsWith('- ')) {
                  return <li key={index}>{paragraph.replace(/^[1-9]. |^- /, '')}</li>;
                } else if (paragraph.trim() === '') {
                  return <br key={index} />;
                } else {
                  return <p key={index}>{paragraph}</p>;
                }
              })}
            </div>
          </div>
        );
      
      default:
        return <div>Unsupported lesson type</div>;
    }
  };

  return (
    <div className="course-learning">
      <div className="learning-header">
        <button onClick={() => navigate('/dashboard')} className="back-btn">
          ← Back to Dashboard
        </button>
        <div className="course-title-section">
          <h1>{course.courseName || 'Course Learning'}</h1>
          <p>Master {course.courseName} with expert guidance</p>
        </div>
        <div className="progress-info">
          <span>Progress: {Math.round(((currentLesson + 1) / currentContent.length) * 100)}%</span>
        </div>
      </div>

      <div className="learning-layout">
        <div className="lessons-sidebar">
          <h3>Course Content</h3>
          <div className="lessons-list">
            {currentContent.map((lesson, index) => (
              <div
                key={index}
                className={`lesson-item ${index === currentLesson ? 'active' : ''} ${index < currentLesson ? 'completed' : ''}`}
                onClick={() => setCurrentLesson(index)}
              >
                <span className="lesson-icon">
                  {lesson.type === 'video' ? '🎬' : '📖'}
                </span>
                <div className="lesson-info">
                  <span className="lesson-title">{lesson.title}</span>
                  <span className="lesson-meta">
                    {lesson.type === 'video' ? 'Video' : 'Reading'} • {lesson.duration}
                  </span>
                </div>
                {index < currentLesson && <span className="checkmark">✓</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="lesson-content">
          {renderLessonContent()}
          
          <div className="navigation-buttons">
            <button 
              onClick={handlePreviousLesson}
              disabled={currentLesson === 0}
              className="nav-btn prev-btn"
            >
              ← Previous Lesson
            </button>
            <button 
              onClick={handleNextLesson}
              disabled={currentLesson === currentContent.length - 1}
              className="nav-btn next-btn"
            >
              Next Lesson →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseLearning;