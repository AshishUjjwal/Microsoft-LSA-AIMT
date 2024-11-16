// ProtectedRoute.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useToast } from "@chakra-ui/react";
import { getUserRole, isAuthenticated } from '../utils/auth.jsx';
import LoadingPage from '../pages/LoadingPage';

const ProtectedRoute = ({ children, requiredRole }) => {
  const navigate = useNavigate(); // Initialize the navigate hook
  const toast = useToast(); // Initialize the toast hook
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = () => {
      if (!isAuthenticated()) {
        toast({
          title: "Login First to Access This Page!",
          position: "bottom-right",
          duration: 2000,
          status: "warning",
          isClosable: true,
        });

        // Redirect to login page after showing the toast
        navigate('/login', { replace: true });
      }
      setLoading(false);
    };

    checkAuthentication();
  }, [navigate, toast]);

  useEffect(() => {
    const checkAuthorization = () => {
      if (requiredRole && getUserRole() !== requiredRole) {
        toast({
          title: "Access Denied",
          description: "You don't have permission. Sign in with an Admin account!",
          status: "error",
          duration: 6000,
          isClosable: true,
          position: "top",
        });

        // Redirect to unauthorized page or login
        // navigate('/login', { replace: true });
      }
    };

    checkAuthorization();
  }, [navigate, toast, requiredRole]);

  if (loading) {
    // Optionally, render a loading indicator while verifying
    return <LoadingPage/>;
  }

  return children;
};

export default ProtectedRoute;
