// Optional: For auth-specific API calls
// src/api/authService.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_BASE_URL; // Base URL for API

// Function to get a new access token using the refresh token
export const getNewAccessToken = async () => {
  try {
    // Make a request to the refresh endpoint
    const response = await axios.post(`${API_URL}/api/users/refresh-token`, {}, {
      withCredentials: true, // Allows sending cookies if the refresh token is stored as an HTTP-only cookie
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // console.log(`Responsejkbkj`,response.data.data.accessToken);

    const accessToken = response.data.data.accessToken; // Assuming response includes the new access token in `accessToken`
    // console.log(`NewAccessToken1`,accessToken);

    return accessToken;
  } catch (error) {
    console.error('Failed to refresh access token:', error);
    return null; // Return null if the refresh fails (e.g., if the refresh token has expired)
  }
};
