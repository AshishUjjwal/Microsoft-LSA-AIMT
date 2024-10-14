// 'use client'

// import {
//   Box,
//   Flex,
//   Avatar,
//   Button,
//   Menu,
//   MenuButton,
//   MenuList,
//   MenuItem,
//   MenuDivider,
//   useDisclosure,
//   useColorModeValue,
//   Stack,
//   useColorMode,
//   Center,
//   Link,
//   useToast,
//   Icon,
//   Text
// } from '@chakra-ui/react'
// import { FaMoon, FaSun, FaInstagram, FaLinkedin, FaTwitter, FaWhatsapp } from 'react-icons/fa'
// import { motion } from 'framer-motion';
// import { useNavigate } from "react-router-dom";
// import { useContext } from 'react';
// import { AuthContext } from '../contexts/AuthContext';

// const MotionMenuList = motion(MenuList);

// const NavLink = ({ to, children }) => (
//   <Link
//     to={to}
//     px={4}
//     py={2}
//     borderRadius="md"
//     color="dark.200"
//     _hover={{
//       textDecoration: 'none',
//       bg: 'orange.100',
//       color: 'black',
//       transform: 'scale(1.05)',
//       transition: '0.2s ease',
//     }}
//   >
//     {children}
//   </Link>
// );

// export default function Navbar() {

//   // Get the user info from context
//   const { auth, logout } = useContext(AuthContext);
//   const user = auth.user;
//   // console.log(auth);

//   const toast = useToast();
//   const navigate = useNavigate();
//   const { colorMode, toggleColorMode } = useColorMode();
//   const { isOpen, onOpen, onClose } = useDisclosure();

//   const handleLogout = async () => {
//     try {
//       // Send a POST request to the server to logout
//       const response = await fetch('http://localhost:8000/api/users/logout', {
//         method: 'POST',
//         credentials: 'include', // This is important if you're using cookies for auth
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       const responseBody = await response.json();

//       if (response.ok) {
//         logout(); // Clear auth context
//         toast({
//           title: `Logout successful!`,
//           position: "top",
//           duration: 6000,
//           status: "success",
//           isClosable: true,
//         });
//         // Navigate to dashboard or another protected route
//         navigate("/register");
//       } else {
//         throw new Error(responseBody.message || "Login failed!");
//       }
//     } catch (error) {
//       console.log('An error occurred during logout', error);
//     }
//   };

//   return (
//     <Box bg={useColorModeValue('gray.100', 'gray.900')}  position={"sticky"} maxWidth="100%">
//       {/* Main Container with maxWidth */}
//       <Flex
//         maxWidth="1100px"
//         mx="auto" // Centers the content horizontally
//         h={20}
//         alignItems={'center'}
//         justifyContent={'space-between'}
//       >
//         {/* Logo */}
//         <Box
//           fontFamily="'Dancing Script', cursive"
//           fontWeight="bold"
//           fontSize="2xl"
//         >
//           MLSA AIMT
//         </Box>

//         {/* Social Media Icons and Profile */}
//         <Flex alignItems={'center'}>
//           <Stack direction={'row'} spacing={6} align="center">
//             {/* Links to other tabs */}
//             <NavLink to="/">Home</NavLink>
//             <NavLink to="/about">About</NavLink>
//             <NavLink to="/blog">Blog</NavLink>
//             <NavLink to="/events">Events</NavLink>
//             <NavLink to="/admin">AdminPanel</NavLink>

//             {/* Dark/Light Mode Toggle */}
//             <Button onClick={toggleColorMode}>
//               {colorMode === 'light' ? <FaMoon /> : <FaSun />}
//             </Button>

//             {/* Profile Menu */}
//             <Menu isOpen={isOpen} onClose={onClose}>
//               <MenuButton
//                 as={Button}
//                 rounded={'full'}
//                 variant={'link'}
//                 cursor={'pointer'}
//                 minW={0}
//                 onClick={onOpen}
//               >
//                 <Avatar
//                   size={'sm'}
//                   src={'https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png'}
//                 />
//               </MenuButton>

//               {/* Profile Menu */}
//               <MotionMenuList
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3 }}
//                 alignItems={'center'}
//                 position="absolute"
//                 zIndex={1500}// High zIndex to ensure it's on top
//                 left={-200}
//                 top={25}
//               >
//                 <br />
//                 <Center>
//                   <Avatar
//                     size={'2xl'}
//                     src={'https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png'}
//                   />
//                 </Center>
//                 <br />
//                 <Center>
//                   <Text>{auth ? user?.name : 'Guest'}</Text>
//                 </Center>
//                 <br />
//                 <MenuDivider />

//                 {auth ? (
//                   <>
//                     <MenuItem>Account Settings</MenuItem>
//                     <MenuItem>
//                       <Link to="/register" _hover={{ textDecoration: 'none', color: 'teal.500' }}>
//                         Register / Login
//                       </Link>
//                     </MenuItem>
//                   </>
//                 ) : (
//                   <>
//                     <MenuItem>
//                       <Link to="/register" _hover={{ textDecoration: 'none', color: 'teal.500' }}>
//                         Register / Login
//                       </Link>
//                     </MenuItem>
//                   </>
//                 )}
//                 <MenuDivider />
//                 <MenuItem>
//                   <Link Link to="/contact" _hover={{ textDecoration: 'none', color: 'teal.500' }}>
//                     Contact
//                   </Link>
//                 </MenuItem>
//                 <MenuItem>Disclaimer</MenuItem>
//                 <MenuItem>Privacy Policy</MenuItem>
//                 <MenuItem>Terms and Conditions</MenuItem>
//                 <MenuItem>
//                   <Link onClick={handleLogout} _hover={{ textDecoration: 'none', color: 'teal.500' }}>
//                     Logout
//                   </Link>
//                 </MenuItem>

//                 <br />
//                 {/* Social Media Icons */}
//                 <Center>
//                   <Stack direction="row" spacing={4}>
//                     <Link to="https://www.instagram.com" isExternal>
//                       <Icon as={FaInstagram} boxSize={6} _hover={{ color: 'pink.500' }} />
//                     </Link>

//                     <Link to="https://www.linkedin.com" isExternal>
//                       <Icon as={FaLinkedin} boxSize={6} _hover={{ color: 'linkedin.500' }} />
//                     </Link>

//                     <Link to="https://twitter.com" isExternal>
//                       <Icon as={FaTwitter} boxSize={6} _hover={{ color: 'twitter.500' }} />
//                     </Link>

//                     <Link to="https://wa.me/1234567890" isExternal>
//                       <Icon as={FaWhatsapp} boxSize={6} _hover={{ color: 'whatsapp.500' }} />
//                     </Link>
//                   </Stack>
//                 </Center>
//               </MotionMenuList>
//             </Menu>
//           </Stack>
//         </Flex>
//       </Flex>
//     </Box>
//   )
// }


// 'use client'

// import {
//   Box,
//   Flex,
//   Avatar,
//   Button,
//   Menu,
//   MenuButton,
//   MenuList,
//   MenuItem,
//   MenuDivider,
//   useDisclosure,
//   useColorModeValue,
//   Stack,
//   useColorMode,
//   Center,
//   Link,
//   useToast,
//   Icon,
//   Text,
//   IconButton
// } from '@chakra-ui/react'
// import { FaMoon, FaSun, FaInstagram, FaLinkedin, FaTwitter, FaWhatsapp, FaBars, FaTimes } from 'react-icons/fa'
// import { motion } from 'framer-motion';
// import { useNavigate } from "react-router-dom";
// import { useContext } from 'react';
// import { AuthContext } from '../contexts/AuthContext';

// const MotionMenuList = motion(MenuList);

// const NavLink = ({ to, children, onClick }) => (
//   <Link
//     to={to}
//     px={4}
//     py={2}
//     borderRadius="md"
//     color="dark.200"
//     _hover={{
//       textDecoration: 'none',
//       bg: 'orange.100',
//       color: 'black',
//       transform: 'scale(1.05)',
//       transition: '0.2s ease',
//     }}
//     onClick={onClick} // Handle closing the menu in mobile
//   >
//     {children}
//   </Link>
// );

// export default function Navbar() {
//   // Get the user info from context
//   const { auth, logout } = useContext(AuthContext);
//   const user = auth.user;

//   const toast = useToast();
//   const navigate = useNavigate();
//   const { colorMode, toggleColorMode } = useColorMode();
//   const { isOpen, onOpen, onClose } = useDisclosure(); // For the menu
//   const { isOpen: isMobileMenuOpen, onToggle: toggleMobileMenu } = useDisclosure(); // For mobile menu

//   const handleLogout = async () => {
//     try {
//       const response = await fetch('http://localhost:8000/api/users/logout', {
//         method: 'POST',
//         credentials: 'include',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       const responseBody = await response.json();

//       if (response.ok) {
//         logout(); 
//         toast({
//           title: `Logout successful!`,
//           position: "top",
//           duration: 6000,
//           status: "success",
//           isClosable: true,
//         });
//         navigate("/register");
//       } else {
//         throw new Error(responseBody.message || "Logout failed!");
//       }
//     } catch (error) {
//       console.log('An error occurred during logout', error);
//     }
//   };

//   return (
//     <Box bg={useColorModeValue('gray.100', 'gray.900')}  maxWidth="100%" zIndex={10}>
//       {/* Main Container with maxWidth */}
//       <Flex
//         maxWidth="1100px"
//         mx="auto" // Centers the content horizontally
//         h={20}
//         alignItems={'center'}
//         justifyContent={'space-between'}
//         px={{base: '8px', md:'0'}} // Add padding for mobile
//       >
//         {/* Logo */}
//         <Box
//           fontFamily="'Dancing Script'"
//           fontWeight="bold"
//           fontSize={{ base: 'lg', md: '2xl' }} // Adjust font size for mobile
//         >
//           MLSA AIMT
//         </Box>

//         {/* Hamburger Menu Button for Mobile */}
//         <IconButton
//           display={{ base: 'block', md: 'none' }}
//           aria-label="Toggle Navigation"
//           icon={isMobileMenuOpen ? <FaTimes /> : <FaBars />}
//           onClick={toggleMobileMenu}
//         />

//         {/* Social Media Icons and Profile */}
//         <Flex display={{ base: 'none', md: 'flex' }} alignItems={'center'}>
//           <Stack direction={'row'} spacing={6} align="center">
//             <NavLink to="/">Home</NavLink>
//             <NavLink to="/about">About</NavLink>
//             <NavLink to="/blog">Blog</NavLink>
//             <NavLink to="/events">Events</NavLink>
//             <NavLink to="/admin">AdminPanel</NavLink>

//             <Button onClick={toggleColorMode}>
//               {colorMode === 'light' ? <FaMoon /> : <FaSun />}
//             </Button>

//             {/* Profile Menu */}
//             <Menu isOpen={isOpen} onClose={onClose}>
//               <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0} onClick={onOpen}>
//                 <Avatar size={'sm'} src={'https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png'} />
//               </MenuButton>

//               <MotionMenuList
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3 }}
//                 alignItems={'center'}
//                 position="absolute"
//                 zIndex={1500}
//                 left={-200}
//                 top={25}
//               >
//                 <Center>
//                   <Avatar size={'2xl'} src={'https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png'} />
//                 </Center>
//                 <Center>
//                   <Text>{auth ? user?.name : 'Guest'}</Text>
//                 </Center>
//                 <MenuDivider />
//                 {auth ? (
//                   <>
//                     <MenuItem>Account Settings</MenuItem>
//                     <MenuItem>
//                       <Link to="/register" _hover={{ textDecoration: 'none', color: 'teal.500' }}>
//                         Register / Login
//                       </Link>
//                     </MenuItem>
//                   </>
//                 ) : (
//                   <>
//                     <MenuItem>
//                       <Link to="/register" _hover={{ textDecoration: 'none', color: 'teal.500' }}>
//                         Register / Login
//                       </Link>
//                     </MenuItem>
//                   </>
//                 )}
//                 <MenuDivider />
//                 <MenuItem>Contact</MenuItem>
//                 <MenuItem>Privacy Policy</MenuItem>
//                 <MenuItem>Terms and Conditions</MenuItem>
//                 <MenuItem>
//                   <Link onClick={handleLogout} _hover={{ textDecoration: 'none', color: 'teal.500' }}>
//                     Logout
//                   </Link>
//                 </MenuItem>

//                 <Center>
//                   <Stack direction="row" spacing={4}>
//                     <Link to="https://www.instagram.com" isExternal>
//                       <Icon as={FaInstagram} boxSize={6} _hover={{ color: 'pink.500' }} />
//                     </Link>
//                     <Link to="https://www.linkedin.com" isExternal>
//                       <Icon as={FaLinkedin} boxSize={6} _hover={{ color: 'linkedin.500' }} />
//                     </Link>
//                     <Link to="https://twitter.com" isExternal>
//                       <Icon as={FaTwitter} boxSize={6} _hover={{ color: 'twitter.500' }} />
//                     </Link>
//                     <Link to="https://wa.me/1234567890" isExternal>
//                       <Icon as={FaWhatsapp} boxSize={6} _hover={{ color: 'whatsapp.500' }} />
//                     </Link>
//                   </Stack>
//                 </Center>
//               </MotionMenuList>
//             </Menu>
//           </Stack>
//         </Flex>

//         {/* Mobile Menu */}
//         {isMobileMenuOpen && (
//           <Flex direction="column" display={{ base: 'flex', md: 'none' }} mt={100}>
//             <NavLink to="/" onClick={toggleMobileMenu}>Home</NavLink>
//             <NavLink to="/about" onClick={toggleMobileMenu}>About</NavLink>
//             <NavLink to="/blog" onClick={toggleMobileMenu}>Blog</NavLink>
//             <NavLink to="/events" onClick={toggleMobileMenu}>Events</NavLink>
//             <NavLink to="/admin" onClick={toggleMobileMenu}>AdminPanel</NavLink>

//             <Button mt={0} onClick={toggleColorMode}>
//               {colorMode === 'light' ? <FaSun /> : <FaMoon /> }
//             </Button>
//           </Flex>
//         )}
//       </Flex>
//     </Box>
//   )
// }




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
  Text,
  IconButton,
  HStack,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody
} from '@chakra-ui/react'
import {
  FaMoon,
  FaSun,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaWhatsapp,
  FaBars,
  FaTimes
} from 'react-icons/fa'
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Link as RouterLink } from 'react-router-dom'; // Import the Link from react-router-dom

const MotionMenuList = motion(MenuList);

// Custom NavLink with hover animation

const NavLink = ({ to, children, onClick }) => (
  <Link
    as={RouterLink}
    to={to}
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
    onClick={onClick}
  >
    {children}
  </Link>
);

export default function Navbar() {
  const { auth, logout } = useContext(AuthContext);
  const user = auth?.user;

  const toast = useToast();
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure(); // For the menu
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  // const { isOpen: isMobileMenuOpen, onToggle: toggleMobileMenu } = useDisclosure(); // For mobile menu

  // Function to toggle the mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/users/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseBody = await response.json();

      if (response.ok) {
        logout();
        toast({
          title: `Logout successful!`,
          position: "top",
          duration: 6000,
          status: "success",
          isClosable: true,
        });
        navigate("/register");
      } else {
        throw new Error(responseBody.message || "Logout failed!");
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
      zIndex={10}
      shadow="md"
    >
      {/* Main Container */}
      <Flex
        maxWidth="1100px"
        mx="auto"
        h={20}
        alignItems={'center'}
        justifyContent={'space-between'}
        px={{ base: '8px', md: '0' }} // Add padding for mobile
      >
        {/* Logo */}
        <Box
          fontFamily="'Dancing Script'"
          fontWeight="bold"
          fontSize={{ base: 'lg', md: '2xl' }}
          color="white"
          ml={{ base: '4px', md: '0' }}
        >
          MLSA AIMT
        </Box>

        {/* Hamburger Menu Button for Mobile */}
        {/* <IconButton
          display={{ base: 'block', md: 'none' }}
          aria-label="Toggle Navigation"
          icon={isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          onClick={toggleMobileMenu}
          variant="ghost"
          color="Dark"
        /> */}


        {/* Profile Menu Button for Mobile */}
        

        {/* Profile Menu Button for Mobile */}
        <Menu isOpen={isOpen}>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={
              <Avatar
                size={'sm'}
                src={
                  'https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png'
                }
              />
            }
            variant="ghost"
            onClick={isOpen ? onClose : onOpen} // Toggle menu
            display={{ base: 'block', md: 'none' }}
            color="Dark"
          />
          <MenuList
            display={{ base: 'block', md: 'none' }} // Show on mobile only
            bg="black"
            color="white"
            zIndex={1500}
          >
            <Center>
              <Avatar
                size={'2xl'}
                src={
                  'https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png'
                }
              />
            </Center>
            <Center>
              <Text my={3}>{auth ? user?.name?.toUpperCase() : 'Guest'}Ashish</Text>
            </Center>
            <MenuDivider />
            <MenuItem>Account Settings</MenuItem>
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
              <NavLink to="/admin">Admin Panel</NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to="/register">Register / Login</NavLink>
            </MenuItem>
            <MenuDivider />
            <MenuItem>Contact</MenuItem>
            <MenuItem>Privacy Policy</MenuItem>
            <MenuItem>Terms and Conditions</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>

            {/* Social Media Icons */}
            <Center mt={5}>
              <HStack spacing={4}>
                <Link to="https://www.instagram.com" isExternal>
                  <Icon
                    as={FaInstagram}
                    boxSize={6}
                    _hover={{ color: 'pink.500', transform: 'scale(1.2)' }}
                  />
                </Link>
                <Link to="https://www.linkedin.com" isExternal>
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
                <Link to="https://wa.me/1234567890" isExternal>
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


        {/* Social Media Icons and Profile for larger screens */}
        <Flex display={{ base: 'none', md: 'flex' }} alignItems={'center'}>
          <HStack spacing={6}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/blog">Blog</NavLink>
            <NavLink to="/events">Events</NavLink>
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
                  size={'sm'}
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
                  <Text my={5}>{auth ? user?.name.toUpperCase() : 'Guest'}</Text>
                </Center>
                <MenuDivider />
                <MenuItem>Account Settings</MenuItem>
                <MenuItem>
                  <Link to="/register">Register / Login</Link>
                </MenuItem>
                <MenuDivider />
                <MenuItem>Contact</MenuItem>
                <MenuItem>Privacy Policy</MenuItem>
                <MenuItem>Terms and Conditions</MenuItem>
                <MenuItem>
                  <Link onClick={handleLogout}>Logout</Link>
                </MenuItem>
                <Center mt={5}>
                  <HStack spacing={4}>
                    <Link to="https://www.instagram.com" isExternal>
                      <Icon as={FaInstagram} boxSize={6} _hover={{ color: 'pink.500', transform: 'scale(1.2)' }} />
                    </Link>
                    <Link to="https://www.linkedin.com" isExternal>
                      <Icon as={FaLinkedin} boxSize={6} _hover={{ color: 'linkedin.500', transform: 'scale(1.2)' }} />
                    </Link>
                    <Link to="https://twitter.com" isExternal>
                      <Icon as={FaTwitter} boxSize={6} _hover={{ color: 'twitter.500', transform: 'scale(1.2)' }} />
                    </Link>
                    <Link to="https://wa.me/1234567890" isExternal>
                      <Icon as={FaWhatsapp} boxSize={6} _hover={{ color: 'whatsapp.500', transform: 'scale(1.2)' }} />
                    </Link>
                  </HStack>
                </Center>
              </MotionMenuList>
            </Menu>
          </HStack>
        </Flex>

        {/* Mobile Menu */}
        {/* // Usage of NavLink in the mobile menu */}
        {/* {isMobileMenuOpen && (
          <Flex
            direction="column"
            display={{ base: 'flex', md: 'none' }}
            mt={300}
            bgColor={'black'}
            color={'white'}
            fontFamily="'Dancing Script'"
            fontWeight="bold"
            isOpen={isOpen} onClose={onClose}
          >
            <NavLink to="/" onClick={toggleMobileMenu}>Home</NavLink>
            <NavLink to="/about" onClick={toggleMobileMenu}>About</NavLink>
            <NavLink to="/blog" onClick={toggleMobileMenu}>Blog</NavLink>
            <NavLink to="/events" onClick={toggleMobileMenu}>Events</NavLink>
            <NavLink to="/admin" onClick={toggleMobileMenu}>AdminPanel</NavLink>

            <Button mt={4} onClick={toggleColorMode} bgColor={'grey'}>
              {colorMode === 'light' ? <FaMoon /> : <FaSun />}
            </Button>
          </Flex>
        )} */}

      </Flex>
    </Box>
  )
}
