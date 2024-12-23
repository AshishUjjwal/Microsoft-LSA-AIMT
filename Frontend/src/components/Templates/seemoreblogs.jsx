import React from 'react';
import { Flex, Button, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const SeeMoreBlogsButton = () => {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode(); // For toggling between light and dark modes

  // Dynamic styles based on color mode
  const bgColor = useColorModeValue('transparent', 'gray.800'); // Transparent for light, dark gray for dark mode
  const textColor = useColorModeValue('black', 'white'); // Black text for light mode, white for dark mode
  const hoverBgColor = useColorModeValue('black', 'white'); // Hover black in light, white in dark
  const hoverTextColor = useColorModeValue('white', 'black'); // Hover white in light, black in dark

  // Function to handle navigation
  const handleNavigate = () => {
    navigate('/blog'); // Replace '/blog' with your target route
  };

  return (
    <Flex justifyContent="center" alignItems="center">
      <Button
        maxW="75vw"
        width="100%"
        mx="auto"
        backgroundColor={bgColor}
        border="1px solid gray"
        color={textColor}
        fontWeight="bold"
        fontFamily="'Alice', serif"
        _hover={{
          backgroundColor: hoverBgColor,
          color: hoverTextColor,
        }}
        onClick={handleNavigate} // Calls the navigation function on click
      >
        See More Blogs
      </Button>
    </Flex>
  );
};

export default SeeMoreBlogsButton;
