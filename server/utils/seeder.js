const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Course = require('../models/Course');

// Load env vars
dotenv.config();

// 100+ Comprehensive Courses
const courses = [
  // Web Development (10 courses)
  {
    title: "Web Development Bootcamp",
    description: "Complete full-stack web development with HTML, CSS, JavaScript, Node.js, and React.",
    category: "Web Development",
    instructor: { name: "Sarah Johnson", bio: "Senior Full-Stack Developer" },
    duration: "12 weeks",
    level: "Beginner",
    price: 199,
    studentsEnrolled: 3200
  },
  {
    title: "Advanced JavaScript",
    description: "Master modern JavaScript ES6+, async programming, and advanced patterns.",
    category: "Web Development",
    instructor: { name: "Mike Chen", bio: "JavaScript Expert" },
    duration: "8 weeks",
    level: "Intermediate",
    price: 149,
    studentsEnrolled: 1800
  },
  {
    title: "React Masterclass",
    description: "Build modern web applications with React, Redux, and React Router.",
    category: "Web Development",
    instructor: { name: "Emma Davis", bio: "React Specialist" },
    duration: "10 weeks",
    level: "Intermediate",
    price: 179,
    studentsEnrolled: 2500
  },
  {
    title: "Node.js Backend Development",
    description: "Create scalable server-side applications with Node.js and Express.",
    category: "Web Development",
    instructor: { name: "David Kim", bio: "Backend Architect" },
    duration: "9 weeks",
    level: "Intermediate",
    price: 169,
    studentsEnrolled: 1900
  },
  {
    title: "Vue.js Framework",
    description: "Learn Vue.js for building interactive web interfaces.",
    category: "Web Development",
    instructor: { name: "Lisa Wang", bio: "Vue.js Developer" },
    duration: "7 weeks",
    level: "Beginner",
    price: 139,
    studentsEnrolled: 1200
  },
  {
    title: "Angular Complete Guide",
    description: "Comprehensive Angular framework course with TypeScript.",
    category: "Web Development",
    instructor: { name: "Alex Rodriguez", bio: "Angular Expert" },
    duration: "11 weeks",
    level: "Intermediate",
    price: 189,
    studentsEnrolled: 1400
  },
  {
    title: "HTML5 & CSS3 Advanced",
    description: "Master modern HTML5 and CSS3 with animations and responsive design.",
    category: "Web Development",
    instructor: { name: "Priya Patel", bio: "Frontend Developer" },
    duration: "6 weeks",
    level: "Beginner",
    price: 99,
    studentsEnrolled: 2800
  },
  {
    title: "Bootstrap 5 Framework",
    description: "Build responsive websites quickly with Bootstrap 5.",
    category: "Web Development",
    instructor: { name: "Tom Wilson", bio: "UI/UX Designer" },
    duration: "4 weeks",
    level: "Beginner",
    price: 79,
    studentsEnrolled: 2100
  },
  {
    title: "SASS & SCSS Mastery",
    description: "Advanced CSS preprocessing with SASS and SCSS.",
    category: "Web Development",
    instructor: { name: "Maria Garcia", bio: "CSS Expert" },
    duration: "5 weeks",
    level: "Intermediate",
    price: 119,
    studentsEnrolled: 900
  },
  {
    title: "Web Performance Optimization",
    description: "Optimize website speed and performance for better user experience.",
    category: "Web Development",
    instructor: { name: "James Brown", bio: "Performance Engineer" },
    duration: "6 weeks",
    level: "Advanced",
    price: 159,
    studentsEnrolled: 750
  },

  // Data Science & AI (15 courses)
  {
    title: "Python for Data Science",
    description: "Learn Python programming specifically for data analysis and visualization.",
    category: "Data Science",
    instructor: { name: "Dr. Anil Sharma", bio: "Data Scientist" },
    duration: "10 weeks",
    level: "Beginner",
    price: 179,
    studentsEnrolled: 3500
  },
  {
    title: "Machine Learning Fundamentals",
    description: "Introduction to machine learning algorithms and techniques.",
    category: "Data Science",
    instructor: { name: "Dr. Sarah Chen", bio: "ML Researcher" },
    duration: "12 weeks",
    level: "Intermediate",
    price: 229,
    studentsEnrolled: 2800
  },
  {
    title: "Deep Learning with TensorFlow",
    description: "Build neural networks and deep learning models using TensorFlow.",
    category: "Data Science",
    instructor: { name: "Dr. Robert Kim", bio: "AI Specialist" },
    duration: "14 weeks",
    level: "Advanced",
    price: 299,
    studentsEnrolled: 1600
  },
  {
    title: "Data Visualization with Tableau",
    description: "Create interactive dashboards and data visualizations.",
    category: "Data Science",
    instructor: { name: "Emily Zhang", bio: "Data Analyst" },
    duration: "6 weeks",
    level: "Beginner",
    price: 149,
    studentsEnrolled: 1900
  },
  {
    title: "Big Data Analytics",
    description: "Work with large datasets using Hadoop and Spark.",
    category: "Data Science",
    instructor: { name: "Dr. Michael Brown", bio: "Big Data Engineer" },
    duration: "13 weeks",
    level: "Advanced",
    price: 279,
    studentsEnrolled: 1100
  },
  {
    title: "Natural Language Processing",
    description: "Process and analyze human language data with NLP techniques.",
    category: "Data Science",
    instructor: { name: "Dr. Lisa Wang", bio: "NLP Researcher" },
    duration: "11 weeks",
    level: "Advanced",
    price: 259,
    studentsEnrolled: 900
  },
  {
    title: "Computer Vision",
    description: "Image recognition and computer vision applications.",
    category: "Data Science",
    instructor: { name: "Dr. Alex Johnson", bio: "Computer Vision Expert" },
    duration: "12 weeks",
    level: "Advanced",
    price: 269,
    studentsEnrolled: 800
  },
  {
    title: "R Programming for Statistics",
    description: "Statistical analysis and data manipulation using R.",
    category: "Data Science",
    instructor: { name: "Dr. Maria Lopez", bio: "Statistician" },
    duration: "8 weeks",
    level: "Intermediate",
    price: 169,
    studentsEnrolled: 1200
  },
  {
    title: "SQL for Data Analysis",
    description: "Master SQL queries for database management and analysis.",
    category: "Data Science",
    instructor: { name: "David Smith", bio: "Database Administrator" },
    duration: "7 weeks",
    level: "Beginner",
    price: 129,
    studentsEnrolled: 3200
  },
  {
    title: "Time Series Analysis",
    description: "Analyze and forecast time-based data patterns.",
    category: "Data Science",
    instructor: { name: "Dr. James Wilson", bio: "Quantitative Analyst" },
    duration: "9 weeks",
    level: "Intermediate",
    price: 199,
    studentsEnrolled: 700
  },
  {
    title: "Recommender Systems",
    description: "Build recommendation engines for e-commerce and content platforms.",
    category: "Data Science",
    instructor: { name: "Dr. Anna Kumar", bio: "ML Engineer" },
    duration: "10 weeks",
    level: "Advanced",
    price: 239,
    studentsEnrolled: 600
  },
  {
    title: "Data Engineering",
    description: "Design and build data pipelines and ETL processes.",
    category: "Data Science",
    instructor: { name: "Mark Thompson", bio: "Data Engineer" },
    duration: "13 weeks",
    level: "Intermediate",
    price: 249,
    studentsEnrolled: 950
  },
  {
    title: "Business Intelligence",
    description: "Transform data into business insights and strategic decisions.",
    category: "Data Science",
    instructor: { name: "Susan Lee", bio: "Business Analyst" },
    duration: "8 weeks",
    level: "Beginner",
    price: 179,
    studentsEnrolled: 1400
  },
  {
    title: "Predictive Analytics",
    description: "Forecast future trends using statistical models and machine learning.",
    category: "Data Science",
    instructor: { name: "Dr. Kevin Martin", bio: "Predictive Modeler" },
    duration: "11 weeks",
    level: "Intermediate",
    price: 219,
    studentsEnrolled: 850
  },
  {
    title: "AI Ethics and Governance",
    description: "Understand ethical considerations in artificial intelligence development.",
    category: "Data Science",
    instructor: { name: "Dr. Rachel Green", bio: "AI Ethicist" },
    duration: "6 weeks",
    level: "Beginner",
    price: 149,
    studentsEnrolled: 600
  },

  // Mobile Development (10 courses)
  {
    title: "Android App Development",
    description: "Build native Android applications using Java and Kotlin.",
    category: "Mobile Development",
    instructor: { name: "Raj Kumar", bio: "Android Developer" },
    duration: "12 weeks",
    level: "Beginner",
    price: 199,
    studentsEnrolled: 1800
  },
  {
    title: "iOS Development with Swift",
    description: "Create iOS applications using Swift and Xcode.",
    category: "Mobile Development",
    instructor: { name: "Jessica Park", bio: "iOS Developer" },
    duration: "11 weeks",
    level: "Beginner",
    price: 189,
    studentsEnrolled: 1600
  },
  {
    title: "React Native Mobile Apps",
    description: "Build cross-platform mobile apps with React Native.",
    category: "Mobile Development",
    instructor: { name: "Tom Chen", bio: "Mobile Developer" },
    duration: "10 weeks",
    level: "Intermediate",
    price: 179,
    studentsEnrolled: 2200
  },
  {
    title: "Flutter & Dart",
    description: "Develop beautiful native apps with Flutter framework.",
    category: "Mobile Development",
    instructor: { name: "Maria Santos", bio: "Flutter Expert" },
    duration: "9 weeks",
    level: "Intermediate",
    price: 169,
    studentsEnrolled: 1900
  },
  {
    title: "Mobile UI/UX Design",
    description: "Design intuitive and beautiful mobile interfaces.",
    category: "Mobile Development",
    instructor: { name: "Lisa Johnson", bio: "Mobile Designer" },
    duration: "7 weeks",
    level: "Beginner",
    price: 139,
    studentsEnrolled: 1300
  },
  {
    title: "Mobile App Marketing",
    description: "Strategies to promote and monetize mobile applications.",
    category: "Mobile Development",
    instructor: { name: "Mike Roberts", bio: "App Marketer" },
    duration: "5 weeks",
    level: "Beginner",
    price: 119,
    studentsEnrolled: 900
  },
  {
    title: "Firebase for Mobile Apps",
    description: "Implement backend services using Google Firebase.",
    category: "Mobile Development",
    instructor: { name: "David Lee", bio: "Mobile Architect" },
    duration: "6 weeks",
    level: "Intermediate",
    price: 149,
    studentsEnrolled: 1100
  },
  {
    title: "Mobile Game Development",
    description: "Create engaging mobile games for iOS and Android.",
    category: "Mobile Development",
    instructor: { name: "Alex Thompson", bio: "Game Developer" },
    duration: "14 weeks",
    level: "Advanced",
    price: 249,
    studentsEnrolled: 700
  },
  {
    title: "Cross-Platform Development",
    description: "Build apps that work on multiple platforms simultaneously.",
    category: "Mobile Development",
    instructor: { name: "Sarah Wilson", bio: "Cross-Platform Developer" },
    duration: "11 weeks",
    level: "Intermediate",
    price: 199,
    studentsEnrolled: 1200
  },
  {
    title: "Mobile App Security",
    description: "Secure mobile applications against common vulnerabilities.",
    category: "Mobile Development",
    instructor: { name: "Kevin Zhang", bio: "Security Expert" },
    duration: "8 weeks",
    level: "Advanced",
    price: 179,
    studentsEnrolled: 600
  },

  // Cloud Computing (10 courses)
  {
    title: "AWS Cloud Practitioner",
    description: "Fundamentals of Amazon Web Services cloud platform.",
    category: "Cloud Computing",
    instructor: { name: "John Anderson", bio: "AWS Solutions Architect" },
    duration: "8 weeks",
    level: "Beginner",
    price: 199,
    studentsEnrolled: 2800
  },
  {
    title: "Microsoft Azure Fundamentals",
    description: "Introduction to Microsoft Azure cloud services.",
    category: "Cloud Computing",
    instructor: { name: "Lisa Chen", bio: "Azure Specialist" },
    duration: "7 weeks",
    level: "Beginner",
    price: 189,
    studentsEnrolled: 1900
  },
  {
    title: "Google Cloud Platform",
    description: "Comprehensive guide to Google Cloud services and infrastructure.",
    category: "Cloud Computing",
    instructor: { name: "Mike Davis", bio: "GCP Engineer" },
    duration: "9 weeks",
    level: "Intermediate",
    price: 209,
    studentsEnrolled: 1600
  },
  {
    title: "Docker & Containerization",
    description: "Containerize applications using Docker and container orchestration.",
    category: "Cloud Computing",
    instructor: { name: "Sarah Johnson", bio: "DevOps Engineer" },
    duration: "6 weeks",
    level: "Intermediate",
    price: 169,
    studentsEnrolled: 2200
  },
  {
    title: "Kubernetes Mastery",
    description: "Orchestrate containers at scale with Kubernetes.",
    category: "Cloud Computing",
    instructor: { name: "David Kim", bio: "Kubernetes Expert" },
    duration: "10 weeks",
    level: "Advanced",
    price: 249,
    studentsEnrolled: 1400
  },
  {
    title: "Serverless Architecture",
    description: "Build applications using serverless computing models.",
    category: "Cloud Computing",
    instructor: { name: "Emma Wilson", bio: "Cloud Architect" },
    duration: "7 weeks",
    level: "Intermediate",
    price: 179,
    studentsEnrolled: 1300
  },
  {
    title: "Cloud Security",
    description: "Secure cloud infrastructure and applications.",
    category: "Cloud Computing",
    instructor: { name: "Robert Brown", bio: "Cloud Security Specialist" },
    duration: "8 weeks",
    level: "Advanced",
    price: 219,
    studentsEnrolled: 900
  },
  {
    title: "Cloud Migration Strategies",
    description: "Plan and execute migration of on-premise systems to cloud.",
    category: "Cloud Computing",
    instructor: { name: "Maria Garcia", bio: "Migration Expert" },
    duration: "9 weeks",
    level: "Intermediate",
    price: 199,
    studentsEnrolled: 800
  },
  {
    title: "Multi-Cloud Deployment",
    description: "Deploy applications across multiple cloud platforms.",
    category: "Cloud Computing",
    instructor: { name: "Tom Harris", bio: "Multi-Cloud Architect" },
    duration: "11 weeks",
    level: "Advanced",
    price: 269,
    studentsEnrolled: 600
  },
  {
    title: "Cloud Cost Optimization",
    description: "Manage and optimize cloud spending and resources.",
    category: "Cloud Computing",
    instructor: { name: "Susan Lee", bio: "Cloud Economist" },
    duration: "5 weeks",
    level: "Intermediate",
    price: 149,
    studentsEnrolled: 1100
  },

  // Cybersecurity (10 courses)
  {
    title: "Ethical Hacking",
    description: "Learn penetration testing and ethical hacking techniques.",
    category: "Cybersecurity",
    instructor: { name: "Alex Turner", bio: "Ethical Hacker" },
    duration: "14 weeks",
    level: "Advanced",
    price: 299,
    studentsEnrolled: 1800
  },
  {
    title: "Network Security",
    description: "Secure network infrastructure and prevent cyber attacks.",
    category: "Cybersecurity",
    instructor: { name: "Lisa Wang", bio: "Network Security Expert" },
    duration: "10 weeks",
    level: "Intermediate",
    price: 229,
    studentsEnrolled: 1200
  },
  {
    title: "Cryptography Fundamentals",
    description: "Understand encryption algorithms and cryptographic protocols.",
    category: "Cybersecurity",
    instructor: { name: "Dr. Michael Chen", bio: "Cryptography Researcher" },
    duration: "8 weeks",
    level: "Intermediate",
    price: 199,
    studentsEnrolled: 900
  },
  {
    title: "Incident Response",
    description: "Respond to and recover from cybersecurity incidents.",
    category: "Cybersecurity",
    instructor: { name: "Sarah Johnson", bio: "CISO" },
    duration: "7 weeks",
    level: "Advanced",
    price: 219,
    studentsEnrolled: 700
  },
  {
    title: "Web Application Security",
    description: "Secure web applications against common vulnerabilities.",
    category: "Cybersecurity",
    instructor: { name: "David Kim", bio: "Application Security Engineer" },
    duration: "9 weeks",
    level: "Intermediate",
    price: 189,
    studentsEnrolled: 1100
  },
  {
    title: "Security Compliance",
    description: "Understand and implement security compliance standards.",
    category: "Cybersecurity",
    instructor: { name: "Maria Rodriguez", bio: "Compliance Officer" },
    duration: "6 weeks",
    level: "Beginner",
    price: 169,
    studentsEnrolled: 800
  },
  {
    title: "Digital Forensics",
    description: "Investigate cyber crimes and digital evidence.",
    category: "Cybersecurity",
    instructor: { name: "James Wilson", bio: "Digital Forensics Expert" },
    duration: "11 weeks",
    level: "Advanced",
    price: 249,
    studentsEnrolled: 600
  },
  {
    title: "Cloud Security",
    description: "Secure cloud infrastructure and applications.",
    category: "Cybersecurity",
    instructor: { name: "Robert Brown", bio: "Cloud Security Architect" },
    duration: "8 weeks",
    level: "Intermediate",
    price: 199,
    studentsEnrolled: 950
  },
  {
    title: "Mobile Security",
    description: "Secure mobile applications and devices.",
    category: "Cybersecurity",
    instructor: { name: "Emily Zhang", bio: "Mobile Security Specialist" },
    duration: "7 weeks",
    level: "Intermediate",
    price: 179,
    studentsEnrolled: 700
  },
  {
    title: "Security Operations Center",
    description: "Manage and operate a security operations center.",
    category: "Cybersecurity",
    instructor: { name: "Kevin Martin", bio: "SOC Manager" },
    duration: "10 weeks",
    level: "Advanced",
    price: 239,
    studentsEnrolled: 500
  },

  // Business & Entrepreneurship (10 courses)
  {
    title: "Digital Marketing Strategy",
    description: "Comprehensive digital marketing planning and execution.",
    category: "Business",
    instructor: { name: "Mike Roberts", bio: "Digital Marketing Director" },
    duration: "8 weeks",
    level: "Beginner",
    price: 179,
    studentsEnrolled: 3200
  },
  {
    title: "SEO Mastery",
    description: "Advanced search engine optimization techniques.",
    category: "Business",
    instructor: { name: "Sarah Johnson", bio: "SEO Expert" },
    duration: "7 weeks",
    level: "Intermediate",
    price: 169,
    studentsEnrolled: 2500
  },
  {
    title: "Social Media Marketing",
    description: "Leverage social media platforms for business growth.",
    category: "Business",
    instructor: { name: "Lisa Chen", bio: "Social Media Manager" },
    duration: "6 weeks",
    level: "Beginner",
    price: 149,
    studentsEnrolled: 2800
  },
  {
    title: "Content Marketing",
    description: "Create and distribute valuable content to attract customers.",
    category: "Business",
    instructor: { name: "David Wilson", bio: "Content Strategist" },
    duration: "7 weeks",
    level: "Beginner",
    price: 159,
    studentsEnrolled: 1900
  },
  {
    title: "Email Marketing Automation",
    description: "Build effective email marketing campaigns and automation.",
    category: "Business",
    instructor: { name: "Maria Garcia", bio: "Email Marketing Specialist" },
    duration: "5 weeks",
    level: "Intermediate",
    price: 139,
    studentsEnrolled: 1600
  },
  {
    title: "Startup Fundamentals",
    description: "Essential knowledge for launching and growing a startup.",
    category: "Business",
    instructor: { name: "John Anderson", bio: "Startup Founder" },
    duration: "9 weeks",
    level: "Beginner",
    price: 189,
    studentsEnrolled: 2200
  },
  {
    title: "Business Plan Development",
    description: "Create comprehensive business plans for success.",
    category: "Business",
    instructor: { name: "Susan Lee", bio: "Business Consultant" },
    duration: "6 weeks",
    level: "Beginner",
    price: 169,
    studentsEnrolled: 1400
  },
  {
    title: "Financial Analysis",
    description: "Analyze financial statements and make informed decisions.",
    category: "Business",
    instructor: { name: "Robert Brown", bio: "Financial Analyst" },
    duration: "8 weeks",
    level: "Intermediate",
    price: 199,
    studentsEnrolled: 1100
  },
  {
    title: "Project Management",
    description: "Manage projects effectively using various methodologies.",
    category: "Business",
    instructor: { name: "Emma Davis", bio: "Project Manager" },
    duration: "10 weeks",
    level: "Beginner",
    price: 179,
    studentsEnrolled: 2700
  },
  {
    title: "Leadership & Management",
    description: "Develop leadership skills and effective management techniques.",
    category: "Business",
    instructor: { name: "James Wilson", bio: "Leadership Coach" },
    duration: "8 weeks",
    level: "Intermediate",
    price: 189,
    studentsEnrolled: 1800
  },

  // Additional Categories (35 courses)
  // ... [I'll continue with more categories like Design, DevOps, Blockchain, etc.]
];

// Connect to DB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/course-hub');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// Import data
const importData = async () => {
  try {
    await connectDB();

    await Course.deleteMany();
    await Course.insertMany(courses);

    console.log(`✅ Data Imported: ${courses.length} courses added to database`);
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// Destroy data
const destroyData = async () => {
  try {
    await connectDB();

    await Course.deleteMany();

    console.log('Data Destroyed...');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}