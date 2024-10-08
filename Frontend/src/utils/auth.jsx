// src/utils/auth.js
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

export const isAuthenticated = () => {
  const token = Cookies.get('accessToken');
  if (!token) return false;
  return true;

//   try {
//     const decoded = jwt_decode(token);
//     return decoded.exp * 1000 > Date.now(); // Check if token is not expired
//   } catch (error) {
//     console.error('Invalid token:', error);
//     return false;
//   }
};

export const getUserRole = () => {
  const token = Cookies.get('accessToken');
  if (!token) return null;

  try {
    const decoded = jwt_decode(token);
    return decoded.role;
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};
