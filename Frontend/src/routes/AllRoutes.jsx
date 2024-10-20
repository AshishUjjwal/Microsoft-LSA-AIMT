// src/routes/AllRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import Page Components
import Home from '../pages/Home.jsx';
import Register from '../pages/Register.jsx';
import Login from '../pages/Login.jsx';
import EventPage from '../pages/EventPage.jsx';
import NotFound from '../pages/NotFound.jsx';
import AboutPage from '../pages/AboutPage.jsx';
import BlogSection from '../components/BlogSection/Blog.jsx';
import BlogDetail from '../components/BlogSection/BlogDetail.jsx';   // Detail page for individual blog

import ProtectedRoute from './ProtectedRoute.jsx'; // A component to protect routes
import AdminPanel from '../pages/AdminPage.jsx';
import LoadingPage from '../pages/LoadingPage.jsx';


const AllRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={
        // <ProtectedRoute>
          <Home />
        // </ProtectedRoute>
      }
      />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/blog" element={<BlogSection />} />
      <Route path="/blog/:slug" element={<BlogDetail />} />
      <Route path="/events" element={<EventPage />} />
      <Route path="/loading" element={<LoadingPage />} />

      <Route path="/admin"
        element={
          // <ProtectedRoute requiredRole={'admin'}>
            <AdminPanel />
          // </ProtectedRoute>
        }
      />

      {/* Catch-All Route for 404 Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AllRoutes;
