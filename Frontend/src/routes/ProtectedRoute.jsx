
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useToast } from "@chakra-ui/react";
import { getUserRole, isAuthenticated } from '../utils/auth';
// import jwt_decode from 'jwt-decode';


const ProtectedRoute = ({ children, requiredRole }) => {
  const navigate = useNavigate(); // Initialize the navigate hook
  const toast = useToast(); // Initialize the toast hook

  useEffect(() => {
    if (!isAuthenticated()) {
      toast({
        title: "Login First to Access This Page!",
        position: "bottom-right",
        duration: 2000,
        status: "warning",
        isClosable: true,
      });

      // Redirect to login page after showing the toast
      return navigate('/login');
    }
  }, [navigate, toast]);


  if (requiredRole && getUserRole() !== requiredRole) {
    toast({
      title: "Access Denied",
      description: "You do not have permission to access this page.",
      status: "error",
      duration: 6000,
      isClosable: true,
      position: "top",
    });
    return navigate('/login');
  }

  // While waiting for the timeout and redirection, return null or a loading indicator
  return children;
};

export default ProtectedRoute;
