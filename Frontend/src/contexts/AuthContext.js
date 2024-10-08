// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

// Create the AuthContext with default value
export const AuthContext = createContext(null);

// Create a provider component
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null, // User information
        token: null, // JWT token
    });

    // Load auth data from localStorage on initial render
    useEffect(() => {
        const storedAuth = localStorage.getItem('auth');
        if (storedAuth) {
            setAuth(JSON.parse(storedAuth));
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
