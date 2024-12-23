import React from 'react';
import { Heading, useColorModeValue } from '@chakra-ui/react';

const AdminBlogHeading = () => {
  // Dynamic colors for light and dark modes
  const textColor = useColorModeValue('black', 'white');
  const bgColor = useColorModeValue('transparent', 'gray.800');

  return (
    <Heading
      as="h1"
      fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
      textAlign="center"
      color={textColor} // Color changes based on the mode
      fontWeight="extrabold"
      fontFamily="'Alice', serif"
      mb={5}
      backgroundColor={bgColor} // Background color for dark mode
    >
      LATEST ADMIN BLOG...<span role="img" aria-label="laptop">👨🏻‍💻</span>
    </Heading>
  );
};

export default AdminBlogHeading;
