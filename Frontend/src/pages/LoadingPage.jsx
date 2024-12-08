// src/components/LoadingPage.jsx
import React, { useContext } from 'react';
import { Box, Text, Flex, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import logo from '../Images/loading1.svg'
import { AuthContext } from '../contexts/AuthContext';

const MotionFlex = motion(Flex);
const MotionBox = motion(Box);
const MotionText = motion(Text);

const LoadingPage = () => {
  const { auth } = useContext(AuthContext);  // Access user from AuthContext
  const user = auth?.user;

  return (
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
        color={user ? "blue.500" : "green.500"}
        fontWeight="bold"
        mt={4}
        // animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}  // Adds smooth scaling and opacity change
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: 'easeInOut',
          repeatType: "reverse", // Smooth back and forth animation
        }}
        whileHover={{ scale: 1.0, color: "red.500" }}  // Interactive hover effect
      >
        {!user ? 'Please Login To Access This Page' : 'Loading, please wait...'}
      </MotionText>
    </MotionFlex>
  );
};

export default LoadingPage;
