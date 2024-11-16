// src/utils/auth.js

import jwt_decode from 'jwt-decode';

export const isAuthenticated = () => {
  const token = localStorage.getItem('accessToken');
  if (!token) return false;
  return true;
};

export const getUserRole = () => {
  
  const token = localStorage.getItem('accessToken');
  if (!token) return null;

  try {
    const decoded = jwt_decode(token);
    return decoded.role;
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};
