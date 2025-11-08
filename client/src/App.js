import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import Header from './components/Header';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Registration from './pages/Registration';
import Contact from './pages/Contact';
import UserDashboard from './pages/UserDashboard';
import CourseLearning from './pages/CourseLearning';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/learn/:courseId" element={<CourseLearning />} />
            <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;