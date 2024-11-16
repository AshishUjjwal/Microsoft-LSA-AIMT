// src/routes/AllRoutes.js
import React, { useContext } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ScrollToTop from "./ScrollToTop";

// Import Page Components
import Home from '../pages/Home.jsx';
import Register from '../pages/Register.jsx';
import Login from '../pages/Login.jsx';
import EventPage from '../pages/EventPage.jsx';
import GallaryPage from '../pages/GallaryPage.jsx';
import NotFound from '../pages/NotFound.jsx';
import AboutPage from '../pages/AboutPage.jsx';
import BlogSection from '../components/BlogSection/Blog.jsx';
import BlogDetail from '../components/BlogSection/BlogDetail.jsx';   // Detail page for individual blog
import Account from '../components/ProfilePage/AccountPage.jsx'

import ProtectedRoute from './ProtectedRoute.jsx'; // A component to protect routes
import AdminPanel from '../pages/AdminPage.jsx';
import LoadingPage from '../pages/LoadingPage.jsx';
import { AuthContext } from '../contexts/AuthContext.js';
import EventGallery from '../components/GallarySection/EventGallary.jsx';


const AllRoutes = () => {
  const { auth } = useContext(AuthContext);  // Access user from AuthContext
  const user = auth?.user;

  // Replace underscores with spaces
  const displayUsername = user?.name.replace(/_/g, ' ');

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          // <ProtectedRoute>
          <Home />
          // </ProtectedRoute>
        }
        />
        <Route path="/MLSA-AIMT" element={
          // <ProtectedRoute>
          <Home />
          // </ProtectedRoute>
        }
        />
        <Route path="/about" element={<AboutPage />} />
        {!user ?
          <Route path="/register"
            element={

              <Register />

            } />
          : <Route path="*" element={<NotFound />} />
        }
        {!user ?
          <Route path="/login" element={<Login />} />
          : <Route path="*" element={<NotFound />} />
        }
        <Route path="/blog" element={<BlogSection />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/gallary" element={<GallaryPage />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path={`/${user?.role}/${displayUsername}`} element={<Account />} />

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
    </>
  );
};

export default AllRoutes;
