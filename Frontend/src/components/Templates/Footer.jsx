// src/components/Footer.js
import React, { useState } from "react";
import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Link,
  VisuallyHidden,
  HStack,
  VStack,
  Input,
  Button,
  IconButton,
  useColorMode,
  useColorModeValue,
  useToast,
  FormControl,
  FormErrorMessage,
  Divider,
} from "@chakra-ui/react";
import {
  FaInstagram,
  FaTwitter,
  FaGithub,
  FaLinkedin,
  FaMoon,
  FaSun,
  FaHeart,
} from "react-icons/fa";

// Social Media Button Component
const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue("gray.100", "gray.700")}
      rounded="full"
      w={10}
      h={10}
      cursor="pointer"
      as="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      transition="background 0.3s ease, transform 0.3s ease"
      _hover={{
        bg: useColorModeValue("gray.200", "gray.600"),
        transform: "scale(1.1)",
      }}
      aria-label={label}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

// Theme Toggle Button
const ThemeToggleButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      aria-label="Toggle Theme"
      icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
      onClick={toggleColorMode}
      variant="ghost"
      size="lg"
      isRound
      _hover={{ bg: useColorModeValue("gray.200", "gray.600") }}
      transition="background 0.3s ease"
    />
  );
};

// Newsletter Subscription Component
const NewsletterSubscription = () => {
  const [email, setEmail] = useState("");
  const [isError, setIsError] = useState(false);
  const toast = useToast();

  const handleSubscribe = () => {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setIsError(true);
      return;
    }

    // TODO: Integrate with your backend or email service provider
    console.log(`Subscribed with email: ${email}`);
    toast({
      title: "Subscription Successful",
      description: "You've been subscribed to our newsletter.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    setEmail("");
    setIsError(false);
  };

  return (
    <Box width={{ base: '', md: '600px' }} >
      <Text fontSize="lg" mb={{base: '3', md: '10'}} fontWeight="500">
        Subscribe to our <br /> Newsletter
      </Text>
      <FormControl isInvalid={isError}>
        <HStack>
          <Input
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            bg={useColorModeValue("white", "gray.800")}
            borderColor={isError ? "red.500" : "gray.600"}
          />
          <Button
            colorScheme="teal"
            onClick={handleSubscribe}
            px={6}
            _hover={{ bg: "teal.500" }}
          >
            Subscribe
          </Button>
        </HStack>
        {isError && (
          <FormErrorMessage>Invalid email address.</FormErrorMessage>
        )}
      </FormControl>
    </Box>
  );
};

// Footer Links Component
const FooterLinks = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("teal.600", "teal.200");

  const links = {
    Company: ["About Us", "Careers", "Blog"],
    Support: ["Contact Us", "FAQs", "Live Chat"],
    Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  };

  return (
    <Stack
      direction={{ base: "column", md: "row" }}
      spacing={8}
      justify="space-between"
      w="100%"
      ml={{ base: '', md: '4' }}
    >
      {Object.keys(links).map((section) => (
        <VStack key={section} align="flex-start">
          <Text fontWeight="500" fontSize="lg" mb={2}>
            {section}
          </Text>
          {links[section].map((link) => (
            <Link
              key={link}
              href="#"
              color={linkColor}
              _hover={{ color: linkHoverColor, textDecoration: "underline" }}
              transition="color 0.3s ease"
            >
              {link}
            </Link>
          ))}
        </VStack>
      ))}
    </Stack>
  );
};

// Footer Branding Component
const FooterBranding = () => {
  return (
    <VStack align="flex-start" spacing={4} width={{ base: '', md: '400px' }}>
      <Box justify={'center'} align={'center'}>
        {/* Replace with your company logo */}
        {/* If using an image logo, replace the above Text component with the Image component as shown below */}

        {/* <Image src={logo} alt="MLSA - AIMT" boxSize="80px" /> */}
        <Text fontSize="2xl" fontWeight="bold">
          MLSA - AIMT
        </Text>

      </Box>
      <Text fontSize="sm" maxW="sm">
        Empowering students to code their future, master AI and shape tomorrow's tech culture.
      </Text>
      {/* Social Media Icons */}
      <HStack spacing={4}>
        <SocialButton
          label="Twitter"
          href="https://twitter.com/yourprofile"
        >
          <FaTwitter />
        </SocialButton>
        <SocialButton
          label="Github"
          href="https://github.com/yourprofile"
        >
          <FaGithub />
        </SocialButton>
        <SocialButton
          label="LinkedIn"
          _hover={{ color: 'linkedin.500', transform: 'scale(1.2)' }}
          href="https://linkedin.com/in/yourprofile"
        >
          <FaLinkedin />
        </SocialButton>
        <SocialButton
          label="Instagram"
          href="https://instagram.com/yourprofile"
        >
          <FaInstagram />
        </SocialButton>
      </HStack>
    </VStack>
  );
};

// Made with Love Component
const MadeWithLove = () => {
  return (
    <HStack align="center" mt={-2} justify="center">
      <Text fontSize="sm">
        Made With
      </Text>
      <FaHeart color="red" />
      <Text fontSize="sm">
        by Ashish Ujjwal.
      </Text>
    </HStack>
  );
};

// Main Footer Component
const Footer = () => {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
      py={10}
      px={5}
      position="relative"
      bottom="0"
      width="100%"
    >
      <Container maxW="5xl">
        <Stack spacing={10}>
          {/* Top Section: Branding, Links, Newsletter */}
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={10}
            justify="space-between"
          >
            {/* Branding and Description */}
            <FooterBranding />

            {/* Navigation Links */}
            <FooterLinks />

            {/* Newsletter Subscription */}
            <NewsletterSubscription />
          </Stack>

          <Divider />

          {/* Bottom Section: Copyright, Theme Toggle */}
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={4}
            justify="space-between"
            align="center"
          >
            <Text>
              © {new Date().getFullYear()} Microsoft Learn Student Ambassadors  - AIMT.
            </Text>
            <ThemeToggleButton />
          </Stack>

          {/* Made with Love */}
          <MadeWithLove />
          
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
