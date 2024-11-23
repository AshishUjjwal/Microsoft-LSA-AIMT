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
  useColorMode,
  Center,
  Link,
  useToast,
  Icon,
  Text,
  IconButton,
  HStack,
} from '@chakra-ui/react'
import {
  FaMoon,
  FaSun,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaWhatsapp,
} from 'react-icons/fa'
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Link as RouterLink } from 'react-router-dom'; // Import the Link from react-router-dom
import logo from '../Images/01MLSAAIMT.png'
import apiClient from '../api/axiosInstance';

const MotionMenuList = motion(MenuList);

// Custom NavLink with hover animation

const NavLink = ({ to, children, onClick }) => (
  <Link
    as={RouterLink}
    to={to}
    px={1}
    py={1}
    borderRadius="md"
    color="dark.900"
    _hover={{
      textDecoration: 'none',
      color: 'blue.500',
      transform: 'scale(1.05)',
      transition: '0.2s ease',
    }}
    onClick={onClick}
  >
    {children}
  </Link>
);

export default function Navbar() {
  const { auth, logout } = useContext(AuthContext);
  const user = auth?.user;
  // Replace underscores with spaces
  const displayUsername = user?.name.replace(/_/g, ' ');

  const toast = useToast();
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure(); // For the menu

  const handleLogout = async () => {
    try {
      // const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/users/logout`, {
      const response = await apiClient.post(
        `/api/users/logout`,
        {}, // Pass an empty object for the request body if there is none
        {
          withCredentials: true, // Include credentials like cookies
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);

      if (response.status === 200) {
        logout();
        toast({
          title: `Logout successful!`,
          position: "top",
          duration: 2000,
          status: "success",
          isClosable: true,
        });
        navigate("/login");
      }
    } catch (error) {
      console.log('An error occurred during logout', error);
    }
  };

  return (
    <Box
      bgGradient={useColorModeValue(
        "linear(to-r, teal.400, green.500)",
        "linear(to-r, teal.800, green.900)"
      )}
      position="sticky"
      top={0}
      zIndex={1000} // Ensure it stays above all other elements
      shadow="md"
      fontFamily="'Alice', serif"  // Apply Alice font here
    >
      {/* Main Container */}
      <Flex
        maxWidth="1200px"
        mx="auto"
        h={{ base: '28', md: '32' }}
        alignItems={'center'}
        justifyContent={'space-between'}
        px={{ base: '8px', md: '0' }} // Add padding for mobile
      >
        {/* Logo */}
        <Box
          fontFamily="'Dancing Script'"
          fontWeight="bold"
          fontSize={{ base: '4xl', md: '4xl' }}
          color="white"
          ml={{ base: '10px', md: '' }}
          w={{ base: '90px', md: '100px' }}
        >
          {/* MLSA AIMT */}
          <RouterLink to="/">
            <img
              src={logo}
              alt="Logo"
              style={{ height: 'auto', cursor: 'pointer' }}
            />
          </RouterLink>
        </Box>

        {/* Dark/Light Mode Toggle */}
        <Flex display={{ base: 'flex', md: 'none' }} mr={-40} mt={3} >
          <Button onClick={toggleColorMode} variant="ghost">
            {colorMode === 'light' ? <FaMoon color="yellow.400" /> : <FaSun color="yellow.300" />}
          </Button>
        </Flex>


        {/* Profile Menu Button for Mobile */}
        <Menu isOpen={isOpen}>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={
              <Avatar
                size={'md'}
                src={
                  'https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png'
                }
              />
            }
            variant="ghost"
            onClick={isOpen ? onClose : onOpen} // Toggle menu
            display={{ base: 'block', md: 'none' }}
          />
          <MenuList
            display={{ base: 'block', md: 'none' }} // Show on mobile only
            bg={useColorModeValue('gray.200', 'gray.900')}
            zIndex={1500}
            fontFamily="'Alice', serif"  // Apply Alice font here
          >
            <Center>
              <Avatar
                size={'xl'}
                m={2}
                src={
                  'https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png'
                }
              />
            </Center>
            <Center>
              <Text my={3}>{auth?.user === null ? 'Guest' : user?.name.toUpperCase()}</Text>
            </Center>
            <MenuDivider />
            <MenuItem><NavLink to={`/${user?.role}/${displayUsername}`}>View Yr Account</NavLink></MenuItem>
            <MenuDivider />
            <MenuItem>
              <NavLink to="/">Home</NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to="/about">About</NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to="/blog">Blogs</NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to="/events">Events</NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to="/gallary">Gallery</NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to="/admin">Admin Panel</NavLink>
            </MenuItem>
            {user ? '' :
              <MenuItem>
                <NavLink to="/login">Register / Login</NavLink>
              </MenuItem>
            }
            <MenuDivider />

            {user ?
              <MenuItem onClick={handleLogout}><NavLink to="/login">Logout</NavLink></MenuItem>
              : ''
            }

            {/* Social Media Icons Mobile*/}
            <Center mt={5}>
              <HStack spacing={4}>
                <Link to="https://www.instagram.com" isExternal>
                  <Icon
                    as={FaInstagram}
                    boxSize={6}
                    _hover={{ color: 'pink.500', transform: 'scale(1.2)' }}
                  />
                </Link>
                <Link to="https://www.linkedin.com/company/mlsa-aimt/" isExternal>
                  <Icon
                    as={FaLinkedin}
                    boxSize={6}
                    _hover={{ color: 'linkedin.500', transform: 'scale(1.2)' }}
                  />
                </Link>
                <Link to="https://twitter.com" isExternal>
                  <Icon
                    as={FaTwitter}
                    boxSize={6}
                    _hover={{ color: 'twitter.500', transform: 'scale(1.2)' }}
                  />
                </Link>
                <Link to="https://chat.whatsapp.com/LpoQfKYpS9M3eS5GXojKoj" isExternal>
                  <Icon
                    as={FaWhatsapp}
                    boxSize={6}
                    _hover={{ color: 'whatsapp.500', transform: 'scale(1.2)' }}
                  />
                </Link>
              </HStack>
            </Center>
          </MenuList>
        </Menu>


        {/*larger screens */}
        <Flex display={{ base: 'none', md: 'flex' }} alignItems={'center'}>
          <HStack spacing={6}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/blog">Blog</NavLink>
            <NavLink to="/events">Events</NavLink>
            <NavLink to="/gallary">Gallery</NavLink>
            <NavLink to="/admin">AdminPanel</NavLink>

            {/* Dark/Light Mode Toggle */}
            <Button onClick={toggleColorMode} variant="ghost">
              {colorMode === 'light' ? <FaMoon color="yellow.400" /> : <FaSun color="yellow.300" />}
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
                  size={'md'}
                  src={'https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png'}
                />
              </MenuButton>

              <MotionMenuList
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                alignItems={'center'}
                position="absolute"
                zIndex={1500}
                left={-200}
                top={25}
                px={5}
              >
                <Center>
                  <Avatar
                    size={'2xl'}
                    src={'https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png'}
                  />
                </Center>
                <Center>
                  {/* {console.log(auth)} */}
                  <Text my={5}>{auth?.user === null ? 'Guest' : user?.name.toUpperCase()}</Text>
                </Center>
                <MenuDivider />
                <MenuItem><NavLink to={`/${user?.role}/${displayUsername}`}>View Yr Account</NavLink></MenuItem>
                {user ? '' :
                  <MenuItem>
                    <NavLink to="/login">Register / Login</NavLink>
                  </MenuItem>
                }
                <MenuDivider />
                <MenuItem><NavLink to="/contact">Contact</NavLink></MenuItem>
                <MenuItem><NavLink to="/policy">Privacy Policy</NavLink></MenuItem>
                <MenuItem><NavLink to="/terms">Terms & Conditions</NavLink></MenuItem>
                {user ?
                  <MenuItem>
                    <NavLink onClick={handleLogout}>Logout</NavLink>
                  </MenuItem>
                  : ''
                }
                <Center mt={5}>
                  <HStack spacing={4}>
                    <Link to="https://www.instagram.com" isExternal>
                      <Icon as={FaInstagram} boxSize={6} _hover={{ color: 'pink.500', transform: 'scale(1.2)' }} />
                    </Link>
                    <Link to="https://www.linkedin.com/company/mlsa-aimt/" isExternal>
                      <Icon as={FaLinkedin} boxSize={6} _hover={{ color: 'linkedin.500', transform: 'scale(1.2)' }} />
                    </Link>
                    <Link to="https://twitter.com" isExternal>
                      <Icon as={FaTwitter} boxSize={6} _hover={{ color: 'twitter.500', transform: 'scale(1.2)' }} />
                    </Link>
                    <Link to="https://chat.whatsapp.com/LpoQfKYpS9M3eS5GXojKoj" isExternal>
                      <Icon as={FaWhatsapp} boxSize={6} _hover={{ color: 'whatsapp.500', transform: 'scale(1.2)' }} />
                    </Link>
                  </HStack>
                </Center>
              </MotionMenuList>
            </Menu>
          </HStack>
        </Flex>
      </Flex>
    </Box>
  )
}
