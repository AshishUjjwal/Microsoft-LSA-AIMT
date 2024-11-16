import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  useColorModeValue,
  Link,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react';
import { FaLinkedin, FaGithub, FaWhatsapp } from 'react-icons/fa';

const images = [
  'https://png.pngtree.com/thumb_back/fh260/background/20231010/pngtree-online-marketing-website-displayed-on-laptop-in-a-modern-workplace-3d-image_13595570.png',
  'https://png.pngtree.com/thumb_back/fw800/background/20230722/pngtree-d-rendering-of-a-home-office-with-a-responsive-digital-marketing-image_3870151.jpg',
  'https://w0.peakpx.com/wallpaper/435/732/HD-wallpaper-laptop-numbers-dark.jpg',
  'https://c1.wallpaperflare.com/preview/427/745/192/notebook-natural-laptop-macbook.jpg',
  // 'https://c1.wallpaperflare.com/preview/427/745/192/notebook-natural-laptop-macbook.jpg'
];

const FrontPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Change the image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Responsive font sizes and padding for different screen sizes
  const headingFontSize = useBreakpointValue({ base: '30px', md: '40px', lg: '50px' });
  const textFontSize = useBreakpointValue({ base: '15px', md: '18px', lg: '20px' });
  const buttonSize = useBreakpointValue({ base: 'md', md: 'md', lg: 'lg' });

  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      h="90vh"
      p={4}
      position="relative"
      overflow="hidden"
      zIndex={-1}
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
        transition="background-image 1s ease-in-out"
        zIndex={-1}
        filter="brightness(60%)" // Darken background for text readability
      />

      <VStack spacing={6} align="center" zIndex={1} maxW="1000px">
        <Heading
          as="h1"
          fontSize={headingFontSize}
          fontWeight="bold"
          color={useColorModeValue('gray.100', 'whiteAlpha.900')}
          transition="color 0.3s ease"
        >
          Empowering students to code their future, master AI and shape tomorrow's Tech Culture.
        </Heading>

        <Text
          fontSize={textFontSize}
          color={useColorModeValue('gray.200', 'gray.300')}
          maxW="700px"
          lineHeight="1.6"
          transition="color 0.3s ease"
        >
          Join our community to learn, innovate, and thrive in the tech world together.
        </Text>

        <Flex justify="center" align="center">
          <Link href="https://www.linkedin.com/in/your-profile" isExternal>
            <Button
              leftIcon={<FaLinkedin />}
              variant="solid"
              size={buttonSize}
              m={2}
              colorScheme="blue"
              _hover={{ transform: 'scale(1.05)', boxShadow: 'lg' }} // Hover animation
              transition="all 0.3s ease"
            >
              LinkedIn
            </Button>
          </Link>
          <Link href="https://github.com/your-profile" isExternal>
            <Button
              leftIcon={<FaGithub />}
              variant="solid"
              size={buttonSize}
              m={2}
              bg={useColorModeValue('gray.700', 'gray.600')}
              color="white"
              _hover={{ transform: 'scale(1.05)', boxShadow: 'lg' }}
              transition="all 0.3s ease"
            >
              GitHub
            </Button>
          </Link>
        </Flex>

        <Link href="https://wa.me/1234567890" isExternal>
          <Button
            leftIcon={<FaWhatsapp />}
            colorScheme="green"
            size={buttonSize}
            _hover={{ transform: 'scale(1.05)', boxShadow: 'lg' }}
            transition="all 0.3s ease"
          >
            Join WhatsApp
          </Button>
        </Link>
      </VStack>
    </Flex>
  );
};

export default FrontPage;
