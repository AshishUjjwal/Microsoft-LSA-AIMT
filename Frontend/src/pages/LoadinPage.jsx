// src/components/LoadingPage.jsx
import React from 'react';
import { Box, Spinner, Text, VStack, Flex, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import logo from '../Images/loading1.svg'

const MotionFlex = motion(Flex);
const MotionBox = motion(Box);
const MotionText = motion(Text);

const LoadingPage = () => {
  return (
    <MotionFlex
      height="100vh"
      align="center"
      justify="center"
      bgGradient="linear(to-r, teal.500, green.500)"
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
        color="white"
        fontWeight="bold"
        mt={4}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      >
        Loading, please wait...
      </MotionText>
    </MotionFlex>
  );
};

export default LoadingPage;
