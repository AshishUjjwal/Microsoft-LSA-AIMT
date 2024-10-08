
import React, {  useEffect, useState } from 'react';
import { Box, Flex, Heading, Text, Button, useColorModeValue, Link, VStack } from '@chakra-ui/react';
import { FaLinkedin, FaGithub, FaWhatsapp } from 'react-icons/fa';

// Image array for the background
const images = [
  'https://w0.peakpx.com/wallpaper/435/732/HD-wallpaper-laptop-numbers-dark.jpg',
  'https://t4.ftcdn.net/jpg/06/67/43/77/360_F_667437709_f8fCt8tCHM84H0pTtJ0SdN4UJ15SeC35.jpg', // Replace with actual image URLs
  'https://c1.wallpaperflare.com/preview/427/745/192/notebook-natural-laptop-macbook.jpg',
];

const FrontPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      textColor={useColorModeValue('gray.100', 'black.900')}
      h="89vh" // Full-screen height for proper centering
      p={4}
      position="relative"
      overflow="hidden"
      zIndex={-1} // Behind the content
    >
      {/* Background Image */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        backgroundImage={`url(${images[currentImageIndex]})`}
        backgroundSize="cover"
        backgroundPosition="center"
        transition="background-image 1s ease-in-out" // Smooth transition
        zIndex={-1} // Behind the content
      />

      <VStack spacing={6} align="center" maxWidth="1170px" zIndex={1}> {/* Ensures the content is above the background */}
        <Heading as="h1" size="xl" fontSize={'40px'}>
          Empowering students to code their future, master AI, and shape tomorrow's tech culture.
        </Heading>

        <Text fontSize="lg" maxW="600px">
          Join our community to learn, innovate, and thrive in the tech world together.
        </Text>

        <Flex justify="center" align="center"> {/* Flexbox to center the buttons */}
          <Link href="https://www.linkedin.com/in/your-profile" isExternal>
            <Button leftIcon={<FaLinkedin />} variant="outline" m={2} bg="grey">
              LinkedIn
            </Button>
          </Link>
          <Link href="https://github.com/your-profile" isExternal>
            <Button leftIcon={<FaGithub />} variant="outline" m={2} bg="grey">
              GitHub
            </Button>
          </Link>
        </Flex>

        <Link href="https://wa.me/1234567890" isExternal>
          <Button
            leftIcon={<FaWhatsapp />}
            colorScheme="whatsapp"
            size="lg"
            mt={4}
          >
            Join WhatsApp
          </Button>
        </Link>
      </VStack>
    </Flex>
  );
};

export default FrontPage;
