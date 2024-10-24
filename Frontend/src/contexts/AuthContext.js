// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';  // Using js-cookie to handle token in cookies

// Create the AuthContext with default value
export const AuthContext = createContext(null);

// Create a provider component
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null, // User information
        token: null, // JWT token
    });

    // Load auth data from localStorage (if any) on initial render
    useEffect(() => {
        const token = Cookies.get('accessToken');  // Fetch the token from cookies
        const storedAuth = localStorage.getItem('auth');

        if (token && storedAuth) {
            // Parse stored auth only if token exists
            const parsedAuth = JSON.parse(storedAuth);
            setAuth({
                user: parsedAuth.user,
                token: token, // Keep token from cookies
            });
        } else {
            // If no token exists, clear any leftover auth from localStorage
            localStorage.removeItem('auth');
        }
    }, []);

    // Update localStorage whenever auth changes
    useEffect(() => {
        if (auth.user || auth.token) {
            localStorage.setItem('auth', JSON.stringify(auth));
        } else {
            localStorage.removeItem('auth');
        }
    }, [auth]);

    // Function to handle login
    const login = (userData, token) => {
        setAuth({
            user: userData,
            token: token,
        });
    };

    // Function to handle logout
    const logout = () => {
        setAuth({
            user: null,
            token: null,
        });
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
