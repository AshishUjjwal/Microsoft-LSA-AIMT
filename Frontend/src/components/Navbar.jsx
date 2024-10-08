'use client'

import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Link,
  useToast,
  Icon,
  Text
} from '@chakra-ui/react'
import { FaMoon, FaSun, FaInstagram, FaLinkedin, FaTwitter, FaWhatsapp } from 'react-icons/fa'
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const MotionMenuList = motion(MenuList);

const NavLink = ({ href, children }) => (
  <Link
    href={href}
    px={4}
    py={2}
    borderRadius="md"
    color="dark.200"
    _hover={{
      textDecoration: 'none',
      bg: 'orange.100',
      color: 'black',
      transform: 'scale(1.05)',
      transition: '0.2s ease',
    }}
  >
    {children}
  </Link>
);

export default function Navbar() {

  // Get the user info from context
  const { auth, logout } = useContext(AuthContext);
  const user = auth.user;
  // console.log(auth);

  const toast = useToast();
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogout = async () => {
    try {
      // Send a POST request to the server to logout
      const response = await fetch('http://localhost:8000/api/users/logout', {
        method: 'POST',
        credentials: 'include', // This is important if you're using cookies for auth
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseBody = await response.json();

      if (response.ok) {
        logout(); // Clear auth context
        toast({
          title: `Logout successful!`,
          position: "top",
          duration: 6000,
          status: "success",
          isClosable: true,
        });
        // Navigate to dashboard or another protected route
        navigate("/register");
      } else {
        throw new Error(responseBody.message || "Login failed!");
      }
    } catch (error) {
      console.log('An error occurred during logout', error);
    }
  };

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')}  position={"sticky"} maxWidth="100%">
      {/* Main Container with maxWidth */}
      <Flex
        maxWidth="1100px"
        mx="auto" // Centers the content horizontally
        h={20}
        alignItems={'center'}
        justifyContent={'space-between'}
        // zIndex="10000" // High zIndex to ensure it's on top
      // position="fixed" // Fixed at the top
      >
        {/* Logo */}
        <Box
          fontFamily="'Dancing Script', cursive"
          fontWeight="bold"
          fontSize="2xl"
        >
          MLSA AIMT
        </Box>

        {/* Social Media Icons and Profile */}
        <Flex alignItems={'center'}>
          <Stack direction={'row'} spacing={6} align="center">
            {/* Links to other tabs */}
            <NavLink href="/">Home</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/blog">Blog</NavLink>
            <NavLink href="/events">Events</NavLink>
            <NavLink href="/admin">AdminPanel</NavLink>

            {/* Dark/Light Mode Toggle */}
            <Button onClick={toggleColorMode}>
              {colorMode === 'light' ? <FaMoon /> : <FaSun />}
            </Button>

            {/* Profile Menu */}
            <Menu isOpen={isOpen} onClose={onClose}>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
                onClick={onOpen}
              >
                <Avatar
                  size={'sm'}
                  src={'https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png'}
                />
              </MenuButton>

              {/* Profile Menu */}
              <MotionMenuList
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                alignItems={'center'}
                position="absolute"
                zIndex={1500}// High zIndex to ensure it's on top
                left={-200}
                top={25}
              >
                <br />
                <Center>
                  <Avatar
                    size={'2xl'}
                    src={'https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png'}
                  />
                </Center>
                <br />
                <Center>
                  <Text>{auth ? user?.name : 'Guest'}</Text>
                </Center>
                <br />
                <MenuDivider />

                {auth ? (
                  <>
                    <MenuItem>Account Settings</MenuItem>
                    <MenuItem>
                      <Link href="/register" _hover={{ textDecoration: 'none', color: 'teal.500' }}>
                        Register / Login
                      </Link>
                    </MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem>
                      <Link href="/register" _hover={{ textDecoration: 'none', color: 'teal.500' }}>
                        Register / Login
                      </Link>
                    </MenuItem>
                  </>
                )}
                <MenuDivider />
                <MenuItem>
                  <Link Link href="/contact" _hover={{ textDecoration: 'none', color: 'teal.500' }}>
                    Contact
                  </Link>
                </MenuItem>
                <MenuItem>Disclaimer</MenuItem>
                <MenuItem>Privacy Policy</MenuItem>
                <MenuItem>Terms and Conditions</MenuItem>
                <MenuItem>
                  <Link onClick={handleLogout} _hover={{ textDecoration: 'none', color: 'teal.500' }}>
                    Logout
                  </Link>
                </MenuItem>

                <br />
                {/* Social Media Icons */}
                <Center>
                  <Stack direction="row" spacing={4}>
                    <Link href="https://www.instagram.com" isExternal>
                      <Icon as={FaInstagram} boxSize={6} _hover={{ color: 'pink.500' }} />
                    </Link>

                    <Link href="https://www.linkedin.com" isExternal>
                      <Icon as={FaLinkedin} boxSize={6} _hover={{ color: 'linkedin.500' }} />
                    </Link>

                    <Link href="https://twitter.com" isExternal>
                      <Icon as={FaTwitter} boxSize={6} _hover={{ color: 'twitter.500' }} />
                    </Link>

                    <Link href="https://wa.me/1234567890" isExternal>
                      <Icon as={FaWhatsapp} boxSize={6} _hover={{ color: 'whatsapp.500' }} />
                    </Link>
                  </Stack>
                </Center>
              </MotionMenuList>
            </Menu>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  )
}
