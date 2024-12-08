// src/components/LoadingPage.jsx
import React, { useContext } from 'react';
import { Box, Text, Flex, Image, Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import logo from '../Images/loading1.svg';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import AdminBlogShimmer from '../components/BlogSection/AdminShimmer';

const MotionFlex = motion(Flex);
const MotionBox = motion(Box);
const MotionText = motion(Text);

const LoadingPage = () => {
  const { auth } = useContext(AuthContext); // Access user from AuthContext
  const user = auth?.user;
  const navigate = useNavigate();

  const clickHandler = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return user ? (
    <AdminBlogShimmer />
  ) : (
    <MotionFlex
      height="90vh"
      align="center"
      justify="center"
      bgGradient="linear(to-r, teal.500, dark.500)"
      direction="column"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <MotionBox
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
        mb={4}
      >
        <Image src={logo} alt="Logo" boxSize="100px" />
      </MotionBox>
      <MotionText
        fontSize="2xl"
        color="green.500"
        fontWeight="bold"
        mt={4}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: 'easeInOut',
          repeatType: 'reverse', // Smooth back-and-forth animation
        }}
        whileHover={{ scale: 1.0, color: 'red.500' }} // Interactive hover effect
      >
        PLEASE LOGIN...!
      </MotionText>
      <Button
        onClick={clickHandler} // Pass the function reference
        colorScheme="teal"
        variant="solid"
        size="lg"
        px={6}
        py={4}
        borderRadius="md"
        fontWeight="bold"
        fontSize="lg"
        bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
        _hover={{
          bgGradient: 'linear(to-r, teal.500, teal.600, teal.700)',
          transform: 'scale(1.05)',
          boxShadow: 'xl',
        }}
        _active={{
          transform: 'scale(0.98)',
          boxShadow: 'sm',
        }}
      >
        Have an Account? Login Now!
      </Button>
    </MotionFlex>
  );
};

export default LoadingPage;
