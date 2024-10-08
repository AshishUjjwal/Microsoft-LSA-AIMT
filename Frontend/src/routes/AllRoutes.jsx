// src/routes/AllRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import Page Components
import Home from '../pages/Home';
import Register from '../pages/Register';
import Login from '../pages/Login';
import EventPage from '../pages/EventPage.jsx';
import NotFound from '../pages/NotFound';
import AboutPage from '../pages/AboutPage.jsx';
import ContactSection from '../components/contact.jsx';
import BlogSection from '../components/Blog.jsx';

import ProtectedRoute from './ProtectedRoute.jsx'; // A component to protect routes
import AdminPanel from '../pages/AdminPage.jsx';


const AllRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      }
      />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/blog" element={<BlogSection />} />
      <Route path="/contact" element={<ContactSection />} />
      <Route path="/events" element={<EventPage />} />
      <Route path="/admin"
        element={
          <ProtectedRoute requiredRole={'admin'}>
            <AdminPanel />
          </ProtectedRoute>
        }
      />

      {/* Catch-All Route for 404 Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AllRoutes;
