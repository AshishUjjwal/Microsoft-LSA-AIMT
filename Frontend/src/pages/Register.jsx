// Signup.jsx
import React, { useState, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Icon,
  Flex,
  Text,
  Input,
  Stack,
  Avatar,
  Button,
  Heading,
  useToast,
  Container,
  SimpleGrid,
  AvatarGroup,
  useColorModeValue,
  useBreakpointValue,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { AiOutlineMail } from "react-icons/ai";
import { AuthContext } from "../contexts/AuthContext";
import apiClient from "../api/axiosInstance.js";
import axios from "axios";

const Signup = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const { auth } = useContext(AuthContext);  // Access user from AuthContext
  const user = auth?.user;

  // State variables
  // const [buttonLoading, setButtonLoading] = useState(false);
  const [allRight, setAllRight] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const Blur = (props) => {
    return (
      <Icon
        width={useBreakpointValue({ base: '100%', md: '40vw', lg: '30vw' })}
        zIndex={useBreakpointValue({ base: -1, md: -1, lg: -1 })}
        height="560px"
        viewBox="0 0 528 560"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}>
        <circle cx="71" cy="61" r="111" fill="#F56565" />
        <circle cx="244" cy="106" r="139" fill="#ED64A6" />
        <circle cy="291" r="139" fill="#ED64A6" />
        <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
        <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
        <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
        <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
      </Icon>
    )
  }

  const expensiveDiv = useMemo(() => {
    return <Blur position={'absolute'} top={-10} left={-10} style={{ filter: 'blur(70px)' }} />
  }, []); // It will only re-render if 'someProp' changes


  // Effect to handle navigation after successful signup
  React.useEffect(() => {
    if (allRight) {
      navigate("/verify", { replace: true });
    }
  }, [allRight, navigate]);


  // Form submission handler
  const submitHandler = async () => {
    // Basic validation
    // console.log(name);
    // console.log(email);
    // console.log(password);
    if (!name || !email || !password || !cpassword) {
      toast({
        title: `All fields are required`,
        position: "bottom-left",
        duration: 3000,
        status: "error",
        isClosable: true,
      });
      return;
    }

    if (password !== cpassword) {
      toast({
        title: `Passwords do not match`,
        position: "bottom-left",
        duration: 3000,
        status: "error",
        isClosable: true,
      });
      return;
    }
    if (password.length <= 5) {
      toast({
        title: `Password must be at least 6 characters`,
        position: "bottom-left",
        duration: 3000,
        status: "error",
        isClosable: true,
      });
      return;
    }

    try {
      // TODO: Replace with your API call
      // Example using fetch:

      const response = await apiClient.post(`/api/users/register`,
        { name, email, password }, // Request body (data) for POST
        {
          withCredentials: true, // Include credentials like cookies
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(`Response :`,response);

      if (response?.status === 201) {
        toast({
          title: `Registration successful!`,
          description: `Verify Your Email. See Your MailBOX`,
          position: "top",
          duration: 6000,
          status: "success",
          isClosable: true,
        });
        setAllRight(true);
        navigate('/login')
      } else {
        throw new Error(response?.message || "Registration failed!");
      }

    } catch (error) {
      // Handle errors
      // console.log(`error`,error);
      toast({
        title: `Registration failed!`,
        description: error?.response?.data?.message || "An unexpected error occurred.",
        position: "top",
        duration: 6000,
        status: "error",
        isClosable: true,
      });
    }
  };


  const avatars = [
    {
      name: 'Ryan Florence',
      url: 'https://bit.ly/ryan-florence',
    },
    {
      name: 'Segun Adebayo',
      url: 'https://bit.ly/sage-adebayo',
    },
    {
      name: 'Kent Dodds',
      url: 'https://bit.ly/kent-c-dodds',
    },
    {
      name: 'Prosper Otemuyiwa',
      url: 'https://bit.ly/prosper-baba',
    },
    {
      name: 'Christian Nwamba',
      url: 'https://bit.ly/code-beast',
    },
  ]


  return (

    <Box position={'relative'} >
      <Container
        as={SimpleGrid}
        maxW={'7xl'}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 20 }}
        py={{ base: 10, sm: 20, lg: 10 }}
        maxWidth={'1120'}
      >
        <Stack spacing={{ base: 10, md: 20 }}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}>
            Senior web designers{' '}
            <Text as={'span'} bgGradient="linear(to-r, red.400,pink.400)" bgClip="text">
              &
            </Text>{' '}
            Full-Stack Developers
          </Heading>
          <Stack direction={'row'} spacing={4} align={'center'}>
            <AvatarGroup>
              {avatars.map((avatar) => (
                <Avatar
                  key={avatar.name}
                  name={avatar.name}
                  src={avatar.url}
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  size={useBreakpointValue({ base: 'md', md: 'lg' })}
                  position={'relative'}
                  zIndex={2}
                  _before={{
                    content: '""',
                    width: 'full',
                    height: 'full',
                    rounded: 'full',
                    transform: 'scale(1.125)',
                    bgGradient: 'linear(to-bl, red.400,pink.400)',
                    position: 'absolute',
                    zIndex: -1,
                    top: 0,
                    left: 0,
                  }}
                />
              ))}
            </AvatarGroup>
            <Text fontFamily={'heading'} fontSize={{ base: '4xl', md: '6xl' }}>
              +
            </Text>
            <Flex
              align={'center'}
              justify={'center'}
              fontFamily={'heading'}
              fontSize={{ base: 'sm', md: 'lg' }}
              bg={'gray.800'}
              color={'white'}
              rounded={'full'}
              minWidth={useBreakpointValue({ base: '44px', md: '60px' })}
              minHeight={useBreakpointValue({ base: '44px', md: '60px' })}
              position={'relative'}
              _before={{
                content: '""',
                width: 'full',
                height: 'full',
                rounded: 'full',
                transform: 'scale(1.125)',
                bgGradient: 'linear(to-bl, orange.400,yellow.400)',
                position: 'absolute',
                zIndex: -1,
                top: 0,
                left: 0,
              }}>
              YOU
            </Flex>
          </Stack>
        </Stack>
        <Stack
          bg={useColorModeValue('gray.200', 'whiteAlpha.100')}
          textColor={useColorModeValue('black.800', 'white.900')}
          borderColor={useColorModeValue('black.300', 'gray.700')}
          // rounded={'xl'}
          p={{ base: 4, sm: 6, md: 8 }}
          // spacing={{ base: 8 }}
          maxW={{ lg: 'lg' }}
        >
          <Stack >
            <Heading
              lineHeight={1.1}
              fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
              Join our team
              <Text as={'span'} bgGradient="linear(to-r, red.400,pink.400)" bgClip="text">
                !
              </Text>
            </Heading>
            {/* <Text fontSize={{ base: 'sm', sm: 'md' }}>
              We’re looking for amazing engineers just like you! Become a part of our
              rockstar engineering team and skyrocket your career!
            </Text> */}
          </Stack>
          <Box as={'form'} >
            <Stack spacing={4}>
              <FormControl id="name" isRequired>
                <FormLabel fontSize="sm" >
                  Name
                </FormLabel>
                <Input
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  border="1px solid"

                  _hover={{
                    borderColor: "teal.500",
                  }}
                  focusBorderColor="teal.500"
                />
              </FormControl >
              {/* Email Field */}
              <FormControl id="email" isRequired>
                <FormLabel fontSize="sm" >
                  Email
                </FormLabel>
                <InputGroup>
                  <Input
                    placeholder="Enter your Email"
                    isRequired
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    border="1px solid"

                    _hover={{
                      borderColor: "teal.500",
                    }}
                    focusBorderColor="teal.500"
                  />
                  <InputRightElement>
                    <Icon as={AiOutlineMail} />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              {/* Password Field */}
              <FormControl id="password" isRequired>
                <FormLabel fontSize="sm">
                  Password
                </FormLabel>
                <InputGroup>
                  <Input
                    placeholder="Enter your Password"
                    value={password}
                    isRequired
                    type={showPass ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                    border="1px solid"

                    _hover={{
                      borderColor: "teal.500",
                    }}
                    focusBorderColor="teal.500"
                  />
                  <InputRightElement>
                    <Button
                      variant="ghost"
                      onClick={() => setShowPass(!showPass)}
                      h="1.75rem"
                      size="sm"
                    >
                      {showPass ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              {/* Confirm Password Field */}
              <FormControl id="cpassword" isRequired>
                <FormLabel fontSize="sm" >
                  Confirm Password
                </FormLabel>
                <Input
                  placeholder="Enter your Confirm password"
                  isRequired
                  type="password"
                  value={cpassword}
                  onChange={(e) => setCpassword(e.target.value)}
                  border="1px solid"

                  _hover={{
                    borderColor: "teal.500",
                  }}
                  focusBorderColor="teal.500"
                />
              </FormControl>

            </Stack>
            <Button
              fontFamily={'heading'}
              mt={8}
              w={'full'}
              bgGradient="linear(to-r, green.400,pink.400)"
              _hover={{
                bgGradient: 'linear(to-r, blue.400, green.400)',
                boxShadow: 'xl',
              }}
              onClick={submitHandler}
            >
              Submit
            </Button>
          </Box>
          <Flex align="center" mt={1} >
            <Text fontSize="sm" >
              Already have an account?{"  "}
            </Text>
            <Button
              variant="link"
              colorScheme="teal"
              onClick={() => navigate("/login")}
              ml={1}
            >
              Login Now!!
            </Button>
          </Flex>
        </Stack>
      </Container>
      {expensiveDiv}
    </Box>
  );
};


export default Signup;
