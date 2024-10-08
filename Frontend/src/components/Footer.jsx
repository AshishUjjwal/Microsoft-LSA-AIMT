'use client'

import {
  Box,
  chakra,
  Container,
  SimpleGrid,
  Stack,
  Text,
  VisuallyHidden,
  useColorModeValue,
  Divider,
} from '@chakra-ui/react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import Subscribe from './Subscribe.jsx';

// Social Media Button with Hover Animation
const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={10}
      h={10}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'all 0.3s ease'}
      _hover={{
        transform: 'scale(1.2)',
        bg: useColorModeValue('orange.400', 'orange.600'),
        color: 'white',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', // Adds subtle shadow effect
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      py={16} // Increased padding for a more spacious design
    >
      <Container as={Stack}>
        {/* Upper Section */}
        <SimpleGrid columns={{ base: 1, sm: 2, md: 2 }}>
          <Subscribe />
        </SimpleGrid>

        {/* Divider */}
        <Divider borderColor={useColorModeValue('gray.300', 'gray.700')} />

        {/* Social Media Icons */}
        <Stack direction="row" spacing={6} justify="center" py={4}>
          <SocialButton label="Instagram" href="https://www.instagram.com">
            <FaInstagram />
          </SocialButton>
          <SocialButton label="Twitter" href="https://www.twitter.com">
            <FaTwitter />
          </SocialButton>
          <SocialButton label="YouTube" href="https://www.youtube.com">
            <FaYoutube />
          </SocialButton>
        </Stack>

        {/* Bottom Slogan */}
        <Text textAlign="center" fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
          <b><i>Empowering students to learn, grow, and achieve excellence.</i></b>
        </Text>
        <Text textAlign="center" fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
          <b>© 2024 Made By Ashish Ujjwal. All rights reserved.</b>
        </Text>
      </Container>
    </Box>
  );
}
