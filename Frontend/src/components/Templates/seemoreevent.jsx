import React from 'react';
import { Flex, Button, useColorModeValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const SeeMoreEventsButton = () => {
  const navigate = useNavigate();

  // Dynamic styles based on color mode
  const bgColor = useColorModeValue('transparent', 'gray.800'); // Transparent for light, dark gray for dark mode
  const textColor = useColorModeValue('black', 'white'); // Black text for light mode, white for dark mode
  const hoverBgColor = useColorModeValue('black', 'white'); // Hover black in light, white in dark
  const hoverTextColor = useColorModeValue('white', 'black'); // Hover white in light, black in dark

  // Function to handle navigation
  const handleNavigate = () => {
    navigate('/events'); // Replace '/events' with your target route
  };

  return (
    <Flex justifyContent="center" alignItems="center" mt={8} >
      <Button
        maxW={{ base: '90vw', md: '1100px' }}
        width="100%"
        mx="auto"
        mt={2}
        backgroundColor={bgColor}
        border="1px solid gray"
        color={textColor}
        fontWeight="bold"
        // bgGradient="linear(to-r, green.400,pink.400)"
        fontFamily="'Alice', serif"
        _hover={{
          backgroundColor: hoverBgColor,
          color: hoverTextColor,
          // bgGradient: 'linear(to-r, blue.400, green.400)'
        }}
        onClick={handleNavigate} // Calls the navigation function on click
      >
        ---See More Events---
      </Button>
    </Flex>
  );
};

export default SeeMoreEventsButton;
