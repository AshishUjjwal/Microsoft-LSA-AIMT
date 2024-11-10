// Set up Axios instance with interceptor here

// src/api/axiosInstance.js
import axios from 'axios';
import { getNewAccessToken } from './authService'; // Assume this function refreshes the token

// Create an Axios instance
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL, // Base URL for API
  headers: { 'Content-Type': 'application/json' },
});

// Interceptor for requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor for responses
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 405) {
      originalRequest._retry = true;
      const newAccessToken = await getNewAccessToken();
      console.log(`newAccessToken45`,newAccessToken);
      if (newAccessToken) {
        localStorage.setItem('accessToken', JSON.stringify(newAccessToken));
        // localStorage.setItem('auth', JSON.stringify(auth));
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
