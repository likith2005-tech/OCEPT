import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Courses.css';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Comprehensive course data with 60+ courses
  const courseData = [
    // Web Development (10 courses)
    {
      _id: '1',
      title: "Web Development Bootcamp",
      description: "Complete full-stack web development with HTML, CSS, JavaScript, Node.js, and React. Build real-world projects.",
      category: "Web Development",
      duration: "12 weeks",
      level: "Beginner",
      price: 199,
      rating: 4.8,
      students: 3200,
      icon: "💻"
    },
    {
      _id: '2',
      title: "Advanced JavaScript",
      description: "Master modern JavaScript ES6+, async programming, closures, and advanced patterns. Deep dive into JS fundamentals.",
      category: "Web Development",
      duration: "8 weeks",
      level: "Intermediate",
      price: 149,
      rating: 4.7,
      students: 1800,
      icon: "⚡"
    },
    {
      _id: '3',
      title: "React Masterclass 2024",
      description: "Build modern web applications with React, Redux, React Router, and advanced hooks. Includes Next.js.",
      category: "Web Development",
      duration: "10 weeks",
      level: "Intermediate",
      price: 179,
      rating: 4.9,
      students: 2500,
      icon: "⚛️"
    },
    {
      _id: '4',
      title: "Node.js Backend Development",
      description: "Create scalable server-side applications with Node.js, Express, MongoDB, and RESTful APIs.",
      category: "Web Development",
      duration: "9 weeks",
      level: "Intermediate",
      price: 169,
      rating: 4.6,
      students: 1900,
      icon: "🚀"
    },
    {
      _id: '5',
      title: "Vue.js Framework",
      description: "Learn Vue.js for building interactive web interfaces. Vuex, Vue Router, and composition API.",
      category: "Web Development",
      duration: "7 weeks",
      level: "Beginner",
      price: 139,
      rating: 4.5,
      students: 1200,
      icon: "🟢"
    },
    {
      _id: '6',
      title: "Angular Complete Guide",
      description: "Comprehensive Angular framework course with TypeScript, RxJS, and Angular Material.",
      category: "Web Development",
      duration: "11 weeks",
      level: "Intermediate",
      price: 189,
      rating: 4.4,
      students: 1400,
      icon: "🅰️"
    },
    {
      _id: '7',
      title: "HTML5 & CSS3 Advanced",
      description: "Master modern HTML5 and CSS3 with animations, Grid, Flexbox, and responsive design.",
      category: "Web Development",
      duration: "6 weeks",
      level: "Beginner",
      price: 99,
      rating: 4.8,
      students: 2800,
      icon: "🎨"
    },
    {
      _id: '8',
      title: "Bootstrap 5 Framework",
      description: "Build responsive websites quickly with Bootstrap 5, custom components, and utilities.",
      category: "Web Development",
      duration: "4 weeks",
      level: "Beginner",
      price: 79,
      rating: 4.3,
      students: 2100,
      icon: "📱"
    },
    {
      _id: '9',
      title: "SASS & SCSS Mastery",
      description: "Advanced CSS preprocessing with SASS, SCSS, mixins, functions, and best practices.",
      category: "Web Development",
      duration: "5 weeks",
      level: "Intermediate",
      price: 119,
      rating: 4.6,
      students: 900,
      icon: "🎯"
    },
    {
      _id: '10',
      title: "Web Performance Optimization",
      description: "Optimize website speed, Core Web Vitals, and performance for better user experience.",
      category: "Web Development",
      duration: "6 weeks",
      level: "Advanced",
      price: 159,
      rating: 4.7,
      students: 750,
      icon: "⚡"
    },

    // Data Science & AI (5 courses)
    {
      _id: '11',
      title: "Python for Data Science",
      description: "Learn Python programming specifically for data analysis, visualization, and scientific computing.",
      category: "Data Science",
      duration: "10 weeks",
      level: "Beginner",
      price: 179,
      rating: 4.8,
      students: 3500,
      icon: "🐍"
    },
    {
      _id: '12',
      title: "Machine Learning Fundamentals",
      description: "Introduction to machine learning algorithms, supervised/unsupervised learning, and model evaluation.",
      category: "Data Science",
      duration: "12 weeks",
      level: "Intermediate",
      price: 229,
      rating: 4.9,
      students: 2800,
      icon: "🤖"
    },
    {
      _id: '13',
      title: "Deep Learning with TensorFlow",
      description: "Build neural networks and deep learning models using TensorFlow, Keras, and advanced architectures.",
      category: "Data Science",
      duration: "14 weeks",
      level: "Advanced",
      price: 299,
      rating: 4.7,
      students: 1600,
      icon: "🧠"
    },
    {
      _id: '14',
      title: "Data Visualization with Tableau",
      description: "Create interactive dashboards, charts, and data visualizations for business intelligence.",
      category: "Data Science",
      duration: "6 weeks",
      level: "Beginner",
      price: 149,
      rating: 4.5,
      students: 1900,
      icon: "📊"
    },
    {
      _id: '15',
      title: "Big Data Analytics",
      description: "Work with large datasets using Hadoop, Spark, and distributed computing frameworks.",
      category: "Data Science",
      duration: "13 weeks",
      level: "Advanced",
      price: 279,
      rating: 4.6,
      students: 1100,
      icon: "📈"
    },

    // Mobile Development (5 courses)
    {
      _id: '16',
      title: "Android App Development",
      description: "Build native Android applications using Java, Kotlin, and modern Android architecture components.",
      category: "Mobile Development",
      duration: "12 weeks",
      level: "Beginner",
      price: 199,
      rating: 4.7,
      students: 1800,
      icon: "🤖"
    },
    {
      _id: '17',
      title: "iOS Development with Swift",
      description: "Create iOS applications using Swift, SwiftUI, and Xcode with Apple's latest frameworks.",
      category: "Mobile Development",
      duration: "11 weeks",
      level: "Beginner",
      price: 189,
      rating: 4.8,
      students: 1600,
      icon: "📱"
    },
    {
      _id: '18',
      title: "React Native Mobile Apps",
      description: "Build cross-platform mobile apps with React Native, Expo, and native modules.",
      category: "Mobile Development",
      duration: "10 weeks",
      level: "Intermediate",
      price: 179,
      rating: 4.6,
      students: 2200,
      icon: "⚛️"
    },
    {
      _id: '19',
      title: "Flutter & Dart",
      description: "Develop beautiful native apps with Flutter framework, widgets, and Dart programming.",
      category: "Mobile Development",
      duration: "9 weeks",
      level: "Intermediate",
      price: 169,
      rating: 4.7,
      students: 1900,
      icon: "💙"
    },
    {
      _id: '20',
      title: "Mobile UI/UX Design",
      description: "Design intuitive and beautiful mobile interfaces with modern design principles.",
      category: "Mobile Development",
      duration: "7 weeks",
      level: "Beginner",
      price: 139,
      rating: 4.4,
      students: 1300,
      icon: "🎨"
    },

    // Cloud Computing (5 courses)
    {
      _id: '21',
      title: "AWS Cloud Practitioner",
      description: "Fundamentals of Amazon Web Services cloud platform, services, and architecture.",
      category: "Cloud Computing",
      duration: "8 weeks",
      level: "Beginner",
      price: 199,
      rating: 4.8,
      students: 2800,
      icon: "☁️"
    },
    {
      _id: '22',
      title: "Microsoft Azure Fundamentals",
      description: "Introduction to Microsoft Azure cloud services, virtual machines, and storage solutions.",
      category: "Cloud Computing",
      duration: "7 weeks",
      level: "Beginner",
      price: 189,
      rating: 4.6,
      students: 1900,
      icon: "🔷"
    },
    {
      _id: '23',
      title: "Google Cloud Platform",
      description: "Comprehensive guide to Google Cloud services, infrastructure, and data solutions.",
      category: "Cloud Computing",
      duration: "9 weeks",
      level: "Intermediate",
      price: 209,
      rating: 4.7,
      students: 1600,
      icon: "🔵"
    },
    {
      _id: '24',
      title: "Docker & Containerization",
      description: "Containerize applications using Docker, Docker Compose, and container orchestration basics.",
      category: "Cloud Computing",
      duration: "6 weeks",
      level: "Intermediate",
      price: 169,
      rating: 4.8,
      students: 2200,
      icon: "🐳"
    },
    {
      _id: '25',
      title: "Kubernetes Mastery",
      description: "Orchestrate containers at scale with Kubernetes, Helm, and cluster management.",
      category: "Cloud Computing",
      duration: "10 weeks",
      level: "Advanced",
      price: 249,
      rating: 4.9,
      students: 1400,
      icon: "⚓"
    },

    // Cybersecurity (5 courses)
    {
      _id: '26',
      title: "Ethical Hacking",
      description: "Learn penetration testing, vulnerability assessment, and ethical hacking techniques.",
      category: "Cybersecurity",
      duration: "14 weeks",
      level: "Advanced",
      price: 299,
      rating: 4.8,
      students: 1800,
      icon: "🔒"
    },
    {
      _id: '27',
      title: "Network Security",
      description: "Secure network infrastructure, firewalls, intrusion detection, and prevent cyber attacks.",
      category: "Cybersecurity",
      duration: "10 weeks",
      level: "Intermediate",
      price: 229,
      rating: 4.7,
      students: 1200,
      icon: "🛡️"
    },
    {
      _id: '28',
      title: "Cryptography Fundamentals",
      description: "Understand encryption algorithms, cryptographic protocols, and security mathematics.",
      category: "Cybersecurity",
      duration: "8 weeks",
      level: "Intermediate",
      price: 199,
      rating: 4.6,
      students: 900,
      icon: "🔐"
    },
    {
      _id: '29',
      title: "Web Application Security",
      description: "Secure web applications against common vulnerabilities like XSS, CSRF, and SQL injection.",
      category: "Cybersecurity",
      duration: "9 weeks",
      level: "Intermediate",
      price: 189,
      rating: 4.7,
      students: 1100,
      icon: "🌐"
    },
    {
      _id: '30',
      title: "Incident Response",
      description: "Respond to and recover from cybersecurity incidents with proper protocols and tools.",
      category: "Cybersecurity",
      duration: "7 weeks",
      level: "Advanced",
      price: 219,
      rating: 4.5,
      students: 700,
      icon: "🚨"
    },

    // Additional Courses (30 courses to make 60 total)
    {
      _id: '31',
      title: "DevOps Engineering",
      description: "Master DevOps practices, CI/CD pipelines, infrastructure as code, and automation tools.",
      category: "DevOps",
      duration: "12 weeks",
      level: "Intermediate",
      price: 229,
      rating: 4.7,
      students: 1500,
      icon: "⚙️"
    },
    {
      _id: '32',
      title: "Digital Marketing Strategy",
      description: "Comprehensive digital marketing course covering SEO, social media, email marketing, and analytics.",
      category: "Marketing",
      duration: "8 weeks",
      level: "Beginner",
      price: 149,
      rating: 4.5,
      students: 2200,
      icon: "📱"
    },
    {
      _id: '33',
      title: "UI/UX Design Principles",
      description: "Learn user-centered design, prototyping, usability testing, and design thinking methodologies.",
      category: "Design",
      duration: "10 weeks",
      level: "Beginner",
      price: 179,
      rating: 4.6,
      students: 1800,
      icon: "🎨"
    },
    {
      _id: '34',
      title: "Artificial Intelligence",
      description: "Comprehensive AI course covering machine learning, neural networks, and AI applications.",
      category: "AI & ML",
      duration: "14 weeks",
      level: "Advanced",
      price: 299,
      rating: 4.8,
      students: 1200,
      icon: "🧠"
    },
    {
      _id: '35',
      title: "Blockchain Technology",
      description: "Learn blockchain fundamentals, smart contracts, cryptocurrencies, and decentralized applications.",
      category: "Blockchain",
      duration: "11 weeks",
      level: "Intermediate",
      price: 249,
      rating: 4.7,
      students: 900,
      icon: "⛓️"
    },
    {
      _id: '36',
      title: "Internet of Things (IoT)",
      description: "Build IoT systems with sensors, microcontrollers, cloud platforms, and data analytics.",
      category: "IoT",
      duration: "10 weeks",
      level: "Intermediate",
      price: 199,
      rating: 4.4,
      students: 800,
      icon: "📡"
    },
    {
      _id: '37',
      title: "Quantum Computing Basics",
      description: "Introduction to quantum computing principles, algorithms, and quantum programming.",
      category: "Quantum Computing",
      duration: "8 weeks",
      level: "Advanced",
      price: 349,
      rating: 4.9,
      students: 400,
      icon: "⚛️"
    },
    {
      _id: '38',
      title: "Game Development with Unity",
      description: "Create 2D and 3D games using Unity engine, C# programming, and game design principles.",
      category: "Game Development",
      duration: "12 weeks",
      level: "Beginner",
      price: 189,
      rating: 4.6,
      students: 1300,
      icon: "🎮"
    },
    {
      _id: '39',
      title: "Python Automation",
      description: "Automate tasks, web scraping, data processing, and system administration with Python.",
      category: "Programming",
      duration: "6 weeks",
      level: "Intermediate",
      price: 139,
      rating: 4.5,
      students: 1600,
      icon: "🤖"
    },
    {
      _id: '40',
      title: "Data Structures & Algorithms",
      description: "Master fundamental data structures, algorithms, and problem-solving techniques.",
      category: "Computer Science",
      duration: "10 weeks",
      level: "Intermediate",
      price: 179,
      rating: 4.8,
      students: 2500,
      icon: "📊"
    },
    {
      _id: '41',
      title: "System Design",
      description: "Learn to design scalable, reliable, and maintainable software systems and architectures.",
      category: "Software Engineering",
      duration: "9 weeks",
      level: "Advanced",
      price: 229,
      rating: 4.7,
      students: 1100,
      icon: "🏗️"
    },
    {
      _id: '42',
      title: "Microservices Architecture",
      description: "Design and implement microservices-based applications with Docker and Kubernetes.",
      category: "Software Architecture",
      duration: "8 weeks",
      level: "Advanced",
      price: 199,
      rating: 4.6,
      students: 900,
      icon: "🔧"
    },
    {
      _id: '43',
      title: "API Development",
      description: "Build RESTful and GraphQL APIs with best practices, authentication, and documentation.",
      category: "Backend Development",
      duration: "7 weeks",
      level: "Intermediate",
      price: 159,
      rating: 4.5,
      students: 1400,
      icon: "🔗"
    },
    {
      _id: '44',
      title: "GraphQL Fundamentals",
      description: "Learn GraphQL query language, schema design, and building efficient APIs.",
      category: "Backend Development",
      duration: "5 weeks",
      level: "Intermediate",
      price: 139,
      rating: 4.4,
      students: 800,
      icon: "📈"
    },
    {
      _id: '45',
      title: "TypeScript Mastery",
      description: "Master TypeScript for large-scale JavaScript applications with type safety and OOP.",
      category: "Web Development",
      duration: "6 weeks",
      level: "Intermediate",
      price: 149,
      rating: 4.7,
      students: 1200,
      icon: "📘"
    },
    {
      _id: '46',
      title: "Next.js Framework",
      description: "Build server-rendered React applications with Next.js, SSR, and static site generation.",
      category: "Web Development",
      duration: "7 weeks",
      level: "Intermediate",
      price: 169,
      rating: 4.6,
      students: 1000,
      icon: "⚡"
    },
    {
      _id: '47',
      title: "Nuxt.js Development",
      description: "Create Vue.js applications with Nuxt.js framework and universal app capabilities.",
      category: "Web Development",
      duration: "6 weeks",
      level: "Intermediate",
      price: 159,
      rating: 4.5,
      students: 700,
      icon: "🟢"
    },
    {
      _id: '48',
      title: "Svelte Framework",
      description: "Learn Svelte compiler-based framework for building fast, reactive web applications.",
      category: "Web Development",
      duration: "5 weeks",
      level: "Intermediate",
      price: 139,
      rating: 4.6,
      students: 600,
      icon: "✨"
    },
    {
      _id: '49',
      title: "Three.js 3D Graphics",
      description: "Create 3D graphics and animations in the browser using Three.js and WebGL.",
      category: "Web Development",
      duration: "8 weeks",
      level: "Advanced",
      price: 189,
      rating: 4.4,
      students: 500,
      icon: "🎯"
    },
    {
      _id: '50',
      title: "Computer Vision",
      description: "Learn image processing, object detection, and computer vision algorithms with Python.",
      category: "AI & ML",
      duration: "11 weeks",
      level: "Advanced",
      price: 279,
      rating: 4.7,
      students: 600,
      icon: "👁️"
    },
    {
      _id: '51',
      title: "Natural Language Processing",
      description: "Build NLP applications for text classification, sentiment analysis, and language generation.",
      category: "AI & ML",
      duration: "10 weeks",
      level: "Advanced",
      price: 269,
      rating: 4.6,
      students: 700,
      icon: "💬"
    },
    {
      _id: '52',
      title: "Reinforcement Learning",
      description: "Master reinforcement learning algorithms, Q-learning, and deep reinforcement learning.",
      category: "AI & ML",
      duration: "12 weeks",
      level: "Advanced",
      price: 299,
      rating: 4.8,
      students: 400,
      icon: "🎯"
    },
    {
      _id: '53',
      title: "Time Series Analysis",
      description: "Analyze and forecast time series data using statistical methods and machine learning.",
      category: "Data Science",
      duration: "8 weeks",
      level: "Intermediate",
      price: 199,
      rating: 4.5,
      students: 800,
      icon: "📅"
    },
    {
      _id: '54',
      title: "SQL & Database Design",
      description: "Master SQL queries, database design, normalization, and performance optimization.",
      category: "Database",
      duration: "7 weeks",
      level: "Beginner",
      price: 149,
      rating: 4.7,
      students: 2200,
      icon: "🗄️"
    },
    {
      _id: '55',
      title: "NoSQL Databases",
      description: "Learn MongoDB, Cassandra, and other NoSQL databases for modern applications.",
      category: "Database",
      duration: "6 weeks",
      level: "Intermediate",
      price: 169,
      rating: 4.6,
      students: 1100,
      icon: "📂"
    },
    {
      _id: '56',
      title: "Data Engineering",
      description: "Build data pipelines, ETL processes, and data warehouses for big data applications.",
      category: "Data Engineering",
      duration: "11 weeks",
      level: "Advanced",
      price: 249,
      rating: 4.7,
      students: 900,
      icon: "🔧"
    },
    {
      _id: '57',
      title: "Business Intelligence",
      description: "Create BI dashboards, reports, and data visualization for business decision making.",
      category: "Business",
      duration: "8 weeks",
      level: "Intermediate",
      price: 189,
      rating: 4.5,
      students: 1200,
      icon: "📊"
    },
    {
      _id: '58',
      title: "Agile & Scrum Methodology",
      description: "Learn Agile principles, Scrum framework, and project management best practices.",
      category: "Project Management",
      duration: "4 weeks",
      level: "Beginner",
      price: 99,
      rating: 4.4,
      students: 1800,
      icon: "🔄"
    },
    {
      _id: '59',
      title: "Project Management",
      description: "Master project planning, execution, risk management, and team leadership skills.",
      category: "Project Management",
      duration: "9 weeks",
      level: "Intermediate",
      price: 179,
      rating: 4.6,
      students: 1500,
      icon: "📋"
    },
    {
      _id: '60',
      title: "Technical Interview Prep",
      description: "Prepare for coding interviews with data structures, algorithms, and system design practice.",
      category: "Career Development",
      duration: "6 weeks",
      level: "Intermediate",
      price: 159,
      rating: 4.8,
      students: 2000,
      icon: "💼"
    }
  ];

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      setCourses(courseData);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Get unique categories
  const categories = ['All', ...new Set(courseData.map(course => course.category))];

  // Filter courses based on category and search term
  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="courses-loading">
        <div className="loading-spinner"></div>
        <p>Loading amazing courses...</p>
      </div>
    );
  }

  return (
    <div className="courses-page">
      {/* Hero Section */}
      <section className="courses-hero">
        <div className="hero-content">
          <h1>Unlock Your Potential</h1>
          <p>Discover 60+ professional courses designed to advance your career</p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">60+</span>
              <span className="stat-label">Courses</span>
            </div>
            <div className="stat">
              <span className="stat-number">75K+</span>
              <span className="stat-label">Students</span>
            </div>
            <div className="stat">
              <span className="stat-number">4.7</span>
              <span className="stat-label">Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="courses-filter">
        <div className="filter-container">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
          
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="courses-main">
        <div className="courses-header">
          <h2>{selectedCategory} Courses</h2>
          <span className="courses-count">{filteredCourses.length} courses found</span>
        </div>

        <div className="courses-grid">
          {filteredCourses.map((course) => (
            <div key={course._id} className="course-card">
              <div className="course-header">
                <span className="course-icon">{course.icon}</span>
                <div className="course-badge">{course.level}</div>
              </div>
              
              <div className="course-content">
                <h3 className="course-title">{course.title}</h3>
                <p className="course-description">{course.description}</p>
                
                <div className="course-meta">
                  <span className="course-duration">⏱️ {course.duration}</span>
                  <span className="course-rating">⭐ {course.rating}</span>
                  <span className="course-students">👥 {course.students.toLocaleString()}</span>
                </div>
                
                <div className="course-category">
                  <span className="category-tag">{course.category}</span>
                </div>
              </div>
              
              <div className="course-footer">
                <div className="course-price">Free</div>
                <Link
                  to={`/register?course=${encodeURIComponent(course.title)}`}
                  className="register-btn"
                >
                  Enroll Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="no-courses">
            <h3>No courses found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Courses;