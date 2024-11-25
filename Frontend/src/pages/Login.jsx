// Login.jsx
import React, { useState, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importing eye icons
import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  useToast,
  useColorModeValue,
  useBreakpointValue,
  Icon,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";

import { AuthContext } from '../contexts/AuthContext';
import apiClient from "../api/axiosInstance";

const Login = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const { login } = useContext(AuthContext); // Access login function from context

  const [showPass, setShowPass] = useState(false); // State to toggle password visibility

  const handleClick = () => setShowPass(!showPass); // Toggle function

  // State variables
  const [buttonLoading, setButtonLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  // Form submission handler
  const submitHandler = async () => {
    // Basic validation
    if (!email || !password) {
      toast({
        title: `All fields are required`,
        position: "bottom-left",
        duration: 3000,
        status: "error",
        isClosable: true,
      });
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: `Please enter a valid email address`,
        position: "bottom-left",
        duration: 3000,
        status: "error",
        isClosable: true,
      });
      return;
    }


    setButtonLoading(true);

    try {
      // TODO: Replace with your actual API call
      // Example using fetch:

      // const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/users/login`, {
      const response = await apiClient.post('/api/users/login',
        { email, password }, // Request body (data) for POST
        {
          withCredentials: true, // Include credentials like cookies
          headers: {
            "Content-Type": "application/json",
          },
        }
      );


      const result = await response.data;
      // console.log('result', result);


      if (result.statusCode === 200) {
        // Assuming the backend sends user data in the response
        login(result.data.user, result.data.accessToken); // Update auth context

        toast({
          title: `Login successful!`,
          position: "top",
          duration: 1000,
          status: "success",
          isClosable: true,
        });
        // Navigate to dashboard or another protected route
        // console.log('usenavigate');
        navigate("/");
      } else {
        throw new Error(result.message || "Login failed!");
      }

    } catch (error) {
      // Handle errors
      // console.log(error);
      toast({
        title: `Login failed!`,
        description: error?.response?.data?.message ,
        // description: `Pls. Check your email and password!`,
        position: "top",
        duration: 2000,
        status: "error",
        isClosable: true,
      });
    } finally {
      setButtonLoading(false);
    }
  };


  return (

    <Stack
      minH={{ base: '80vh', md: '90vh' }}
      direction={{ base: 'column', md: 'row' }}
      textColor={useColorModeValue('black.800', 'black.900')}
      maxWidth="1100px"
      mx="auto"
      mt={{ base: '19', md: '0' }}
    >
      <Flex p={5} flex={1} align={'center'} justify={'center'} >
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}

          >Sign in to your account</Heading>
          <FormControl id="email">
            <FormLabel>Email Address</FormLabel>
            <Input
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              border="1px solid"
              borderColor="gray.200"
              _hover={{
                borderColor: "teal.500",
              }}
              focusBorderColor="teal.500"
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <InputGroup size="md">
              <Input
                placeholder="Enter your Password"
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                border="1px solid"
                borderColor="gray.200"
                _hover={{
                  borderColor: "teal.500",
                }}
                focusBorderColor="teal.500"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {showPass ? <FaEyeSlash /> : <FaEye />} {/* Button to toggle */}
                </Button>
              </InputRightElement>

            </InputGroup>
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}>
              <Checkbox>Remember me</Checkbox>
              <Text color={'blue.500'}>Forgot password?</Text>
            </Stack>
            <Button isLoading={buttonLoading} colorScheme={'blue'} variant={'solid'} onClick={submitHandler}>
              Sign in
            </Button>
          </Stack>

          {/* Link to Signup Page */}
          <Stack align="center" justify="center" mt={4}>
            <Text fontSize="sm">
              Don't have an account?{" "}
            </Text>
            <Button
              variant="link"
              colorScheme="teal"
              textDecoration={'underline'}
              onClick={() => navigate("/register")}
              ml={1}
            >
              Register a new account
            </Button>
          </Stack>

        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          display={{ base: 'none', md: 'flex' }}
          alt={'Login Image'}
          objectFit={'cover'}
          borderRadius="15px"
          maxWidth={'550'}
          h={'auto'}
          w={'auto'}
          boxShadow={'lg'}
          margin={'auto'}

          src={
            'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
          }
        />
      </Flex>
      {expensiveDiv}
      {/* <Blur position={'absolute'} top={-10} left={-10} style={{ filter: 'blur(70px)' }} /> */}
    </Stack>

  );
};

export default Login;
