const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB Atlas
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Import models
const User = require('./models/User');
const Contact = require('./models/Contact');
// Mount routes
const coursesRoute = require('./routes/courses');
const authRoute = require('./routes/auth');

// Simple route to check if server is running
app.get('/', (req, res) => {
  res.json({ message: 'Online Course Hub API is running!' });
});

// Route to handle user registration (same as your frontend expects)
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, course } = req.body;

    console.log('📝 Registration attempt:', { name, email, course });

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Create new user in MongoDB
    const user = await User.create({
      name,
      email,
      password,
      enrolledCourses: course ? [{ courseName: course, enrolledAt: new Date() }] : []
    });

    console.log('✅ User saved to MongoDB:', user.email);

    res.status(201).json({
      success: true,
      message: `Registration Successful! Welcome ${name}, you have enrolled in ${course}.`,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      }
    });

  } catch (error) {
    console.error('❌ Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed. Please try again.'
    });
  }
});

// Route to handle contact form submissions
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    console.log('📧 Contact form submission:', { name, email });

    // Save contact message to MongoDB
    const contact = await Contact.create({
      name,
      email,
      message
    });

    console.log('✅ Contact message saved to MongoDB');

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been sent.',
      data: contact
    });

  } catch (error) {
    console.error('❌ Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Error sending message. Please try again.'
    });
  }
});

// Route to get all users (for admin viewing)
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    
    res.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    console.error('❌ Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching users'
    });
  }
});

// Route to get all contact messages
app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    console.error('❌ Error fetching contacts:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching contacts'
    });
  }
});

// Mount courses routes
app.use('/api/courses', coursesRoute);
// Mount auth routes (login, register, etc.)
app.use('/api/auth', authRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌐 MongoDB Atlas: Ready to store data`);
});
